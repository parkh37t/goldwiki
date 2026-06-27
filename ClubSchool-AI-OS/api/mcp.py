"""Vercel 서버리스 — /api/mcp : goldwiki를 원격 MCP 서버로 노출(읽기 전용).

claude.ai → 설정 → Connectors → Add custom connector 에 이 URL을 넣으면,
구독 상태의 claude.ai/Claude Code/커서 등 어떤 클라이언트든 goldwiki(SSOT)를
'세컨드 브레인'처럼 검색·열람할 수 있다. (영상의 Relay.md + MCP 패턴)

전송: MCP Streamable HTTP (JSON-RPC 2.0 over POST). 단일 엔드포인트.
도구:
  - search_goldwiki(query)        : 에이전트/커맨드/문서/예시 메타+본문 검색
  - read_document(path)           : 문서 원문(markdown) 읽기
  - list_documents(type?)         : 문서 목록(agents/commands/workflows/templates/examples/goldwiki)

콘텐츠는 같은 배포의 정적 파일을 HTTP로 읽는다(manifest.json + 문서). 비밀/쓰기 없음.
"""
import json
import os
import re
import urllib.request
from http.server import BaseHTTPRequestHandler

PROTOCOL = "2025-06-18"
SERVER_INFO = {"name": "goldwiki", "version": "1.0.0"}
_CACHE = {}


def _base(headers):
    if os.environ.get("CS_BASE"):
        return os.environ["CS_BASE"].rstrip("/")
    host = headers.get("x-forwarded-host") or headers.get("host") or "localhost"
    proto = headers.get("x-forwarded-proto") or ("http" if host.startswith("localhost") else "https")
    return f"{proto}://{host}"


def _get(url, timeout=10):
    req = urllib.request.Request(url, headers={"User-Agent": "goldwiki-mcp"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")


def _manifest(base):
    if "m" not in _CACHE:
        _CACHE["m"] = json.loads(_get(base + "/Console/manifest.json"))
    return _CACHE["m"]


def _entries(m):
    """검색 대상 평탄화: [{type,title,path,text}]"""
    out = []
    for a in m.get("agents", []):
        out.append({"type": "agent", "title": a.get("name", ""), "path": a.get("path", ""),
                    "text": (a.get("role", "") + " " + (a.get("systemPrompt", "")[:1500]))})
    for c in m.get("commands", []):
        out.append({"type": "command", "title": c.get("name", ""), "path": c.get("path", ""),
                    "text": (c.get("body", "") or "")[:1500]})
    for key in ("workflows", "templates", "examples"):
        for d in m.get(key, []):
            out.append({"type": key[:-1], "title": d.get("title", ""), "path": d.get("path", ""), "text": d.get("title", "")})
    gw = m.get("goldwiki", {})
    docs = []
    if isinstance(gw, dict):
        docs = gw.get("docs") or gw.get("numbered") or []
        topics = gw.get("topics") or {}
        if isinstance(topics, dict):
            for arr in topics.values():
                if isinstance(arr, list):
                    docs = docs + arr
        elif isinstance(topics, list):
            docs = docs + topics
    for d in docs:
        if isinstance(d, dict):
            out.append({"type": "goldwiki", "title": d.get("title", d.get("path", "")), "path": d.get("path", ""), "text": d.get("title", "")})
    return [e for e in out if e.get("path")]


# ---------- 도구 구현 ----------
def tool_search(base, args):
    q = (args.get("query") or "").strip().lower()
    if not q:
        return "query가 필요합니다."
    terms = [t for t in re.split(r"\s+", q) if t]
    res = []
    for e in _entries(_manifest(base)):
        hay = (e["title"] + " " + e["path"] + " " + e["text"]).lower()
        score = sum(hay.count(t) for t in terms)
        if score:
            res.append((score, e))
    res.sort(key=lambda x: -x[0])
    res = res[:15]
    if not res:
        return f"'{args.get('query')}'에 대한 결과가 없습니다."
    lines = [f"### 검색 결과: {args.get('query')} ({len(res)}건)"]
    for _, e in res:
        lines.append(f"- **[{e['type']}] {e['title']}** — `{e['path']}`")
    lines.append("\n원문은 read_document(path)로 읽으세요.")
    return "\n".join(lines)


def tool_read(base, args):
    path = (args.get("path") or "").strip().lstrip("/")
    if not path or ".." in path:
        return "유효한 path가 필요합니다."
    try:
        txt = _get(base + "/" + path)
    except Exception as e:  # noqa: BLE001
        return f"문서를 읽지 못했습니다({path}): {e}"
    return txt[:60000]


def tool_list(base, args):
    t = (args.get("type") or "").strip().lower()
    entries = _entries(_manifest(base))
    if t:
        entries = [e for e in entries if e["type"] == t.rstrip("s")]
    by = {}
    for e in entries:
        by.setdefault(e["type"], []).append(e)
    lines = []
    for typ, arr in by.items():
        lines.append(f"### {typ} ({len(arr)})")
        for e in arr[:60]:
            lines.append(f"- {e['title']} — `{e['path']}`")
    return "\n".join(lines) or "항목 없음."


TOOLS = [
    {"name": "search_goldwiki", "description": "goldwiki(에이전트·커맨드·문서·예시)에서 키워드로 검색. 단일 진실 공급원(SSOT) 탐색.",
     "inputSchema": {"type": "object", "properties": {"query": {"type": "string", "description": "검색어"}}, "required": ["query"]}},
    {"name": "read_document", "description": "goldwiki 문서/에이전트/예시의 원문(markdown)을 경로로 읽기. 예: GoldWiki/00_START_HERE.md",
     "inputSchema": {"type": "object", "properties": {"path": {"type": "string", "description": "리포 기준 상대 경로"}}, "required": ["path"]}},
    {"name": "list_documents", "description": "문서 목록 나열. type 생략 시 전체. type: agent|command|workflow|template|example|goldwiki",
     "inputSchema": {"type": "object", "properties": {"type": {"type": "string"}}}},
]
DISPATCH = {"search_goldwiki": tool_search, "read_document": tool_read, "list_documents": tool_list}


def handle_rpc(msg, base):
    mid = msg.get("id")
    method = msg.get("method")
    if method == "initialize":
        ver = (msg.get("params") or {}).get("protocolVersion") or PROTOCOL
        return {"jsonrpc": "2.0", "id": mid, "result": {
            "protocolVersion": ver, "capabilities": {"tools": {}}, "serverInfo": SERVER_INFO,
            "instructions": "goldwiki는 ClubSchool AI OS의 단일 진실 공급원입니다. search_goldwiki로 찾고 read_document로 읽으세요."}}
    if method in ("notifications/initialized", "notifications/cancelled"):
        return None  # 알림: 응답 없음
    if method == "ping":
        return {"jsonrpc": "2.0", "id": mid, "result": {}}
    if method == "tools/list":
        return {"jsonrpc": "2.0", "id": mid, "result": {"tools": TOOLS}}
    if method == "tools/call":
        p = msg.get("params") or {}
        name = p.get("name")
        fn = DISPATCH.get(name)
        if not fn:
            return {"jsonrpc": "2.0", "id": mid, "error": {"code": -32601, "message": f"unknown tool {name}"}}
        try:
            text = fn(base, p.get("arguments") or {})
            return {"jsonrpc": "2.0", "id": mid, "result": {"content": [{"type": "text", "text": text}], "isError": False}}
        except Exception as e:  # noqa: BLE001
            return {"jsonrpc": "2.0", "id": mid, "result": {"content": [{"type": "text", "text": "오류: " + str(e)}], "isError": True}}
    return {"jsonrpc": "2.0", "id": mid, "error": {"code": -32601, "message": f"unknown method {method}"}}


class handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "content-type, mcp-protocol-version, mcp-session-id, authorization")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        # 스트리밍(SSE) GET은 미지원 — 클라이언트는 POST(JSON-RPC)만 사용
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._cors()
        self.end_headers()
        self.wfile.write(json.dumps({"ok": True, "server": SERVER_INFO, "transport": "streamable-http (POST JSON-RPC)"}).encode())

    def do_POST(self):
        try:
            n = int(self.headers.get("Content-Length", "0"))
            raw = self.rfile.read(n) or b"{}"
            msg = json.loads(raw)
        except (ValueError, json.JSONDecodeError):
            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"jsonrpc":"2.0","error":{"code":-32700,"message":"parse error"}}')
            return
        base = _base(self.headers)
        # 배치 또는 단일
        if isinstance(msg, list):
            out = [r for r in (handle_rpc(x, base) for x in msg) if r is not None]
            body = json.dumps(out, ensure_ascii=False).encode("utf-8")
        else:
            resp = handle_rpc(msg, base)
            if resp is None:
                self.send_response(202)
                self._cors()
                self.end_headers()
                return
            body = json.dumps(resp, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self._cors()
        self.end_headers()
        self.wfile.write(body)
