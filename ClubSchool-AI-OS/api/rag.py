"""Vercel 서버리스 — /api/rag. 질의를 임베딩해 Supabase match_knowledge()로 관련 지식 조회.
미설정 시 빈 결과를 반환(콘솔은 조용히 진행). 필요 env: SUPABASE_URL, SUPABASE_SERVICE_ROLE, 임베딩 키.
"""
import json
import os
import urllib.request
from http.server import BaseHTTPRequestHandler

SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SR = os.environ.get("SUPABASE_SERVICE_ROLE", "")


def _post(url, payload, headers, timeout=60):
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8"))


def embed_one(text):
    openai = os.environ.get("OPENAI_API_KEY", "").strip()
    voyage = os.environ.get("VOYAGE_API_KEY", "").strip()
    try:
        if openai:
            d = _post("https://api.openai.com/v1/embeddings",
                      {"input": [text], "model": os.environ.get("CS_EMBED_MODEL", "text-embedding-3-small")},
                      {"content-type": "application/json", "Authorization": "Bearer " + openai})
            return d["data"][0]["embedding"], None
        if voyage:
            d = _post("https://api.voyageai.com/v1/embeddings",
                      {"input": [text], "model": os.environ.get("CS_EMBED_MODEL", "voyage-3")},
                      {"content-type": "application/json", "Authorization": "Bearer " + voyage})
            return d["data"][0]["embedding"], None
        return None, "임베딩 제공자 미설정"
    except Exception as e:  # noqa
        return None, f"임베딩 실패: {e}"


class handler(BaseHTTPRequestHandler):
    def _json(self, code, obj):
        b = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code); self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store"); self.end_headers(); self.wfile.write(b)

    def do_POST(self):
        try:
            n = int(self.headers.get("Content-Length", 0))
            p = json.loads(self.rfile.read(n).decode("utf-8")) if n else {}
        except Exception:  # noqa
            return self._json(200, {"chunks": []})
        query = (p.get("query") or "").strip()
        if not query or not (SUPABASE_URL and SR):
            return self._json(200, {"chunks": []})
        vec, err = embed_one(query)
        if err:
            return self._json(200, {"chunks": [], "note": err})
        try:
            res = _post(f"{SUPABASE_URL}/rest/v1/rpc/match_knowledge",
                        {"query_embedding": vec, "match_count": int(p.get("k", 6))},
                        {"content-type": "application/json", "apikey": SR, "Authorization": "Bearer " + SR})
        except Exception as e:  # noqa
            return self._json(200, {"chunks": [], "note": f"검색 실패: {e}"})
        return self._json(200, {"chunks": res or []})
