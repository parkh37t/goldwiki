"""Vercel 서버리스 — /api/embed. 텍스트를 임베딩해 Supabase knowledge_chunks(승인 대기)에 적재.
필요 env: SUPABASE_URL, SUPABASE_SERVICE_ROLE, (OPENAI_API_KEY | VOYAGE_API_KEY).
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


def embed_texts(texts):
    openai = os.environ.get("OPENAI_API_KEY", "").strip()
    voyage = os.environ.get("VOYAGE_API_KEY", "").strip()
    try:
        if openai:
            d = _post("https://api.openai.com/v1/embeddings",
                      {"input": texts, "model": os.environ.get("CS_EMBED_MODEL", "text-embedding-3-small")},
                      {"content-type": "application/json", "Authorization": "Bearer " + openai})
            return [x["embedding"] for x in d["data"]], None
        if voyage:
            d = _post("https://api.voyageai.com/v1/embeddings",
                      {"input": texts, "model": os.environ.get("CS_EMBED_MODEL", "voyage-3")},
                      {"content-type": "application/json", "Authorization": "Bearer " + voyage})
            return [x["embedding"] for x in d["data"]], None
        return None, "임베딩 제공자 미설정 (OPENAI_API_KEY 또는 VOYAGE_API_KEY 필요)"
    except Exception as e:  # noqa
        return None, f"임베딩 호출 실패: {e}"


class handler(BaseHTTPRequestHandler):
    def _json(self, code, obj):
        b = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code); self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store"); self.end_headers(); self.wfile.write(b)

    def do_POST(self):
        try:
            n = int(self.headers.get("Content-Length", 0))
            p = json.loads(self.rfile.read(n).decode("utf-8")) if n else {}
        except Exception as e:  # noqa
            return self._json(400, {"error": f"잘못된 본문: {e}"})
        text = (p.get("text") or "").strip()
        if not text:
            return self._json(400, {"error": "text가 필요합니다."})
        if not (SUPABASE_URL and SR):
            return self._json(503, {"error": "Supabase 미설정 (SUPABASE_URL / SUPABASE_SERVICE_ROLE)"})
        chunks = [text[i:i + 1500] for i in range(0, len(text), 1500)] or [text]
        vecs, err = embed_texts(chunks)
        if err:
            return self._json(503, {"error": err})
        rows = [{"source_path": p.get("source_path"), "topic": p.get("topic"),
                 "content": c, "embedding": v, "approved": False} for c, v in zip(chunks, vecs)]
        try:
            _post(f"{SUPABASE_URL}/rest/v1/knowledge_chunks", rows,
                  {"content-type": "application/json", "apikey": SR,
                   "Authorization": "Bearer " + SR, "Prefer": "return=minimal"})
        except Exception as e:  # noqa
            return self._json(503, {"error": f"Supabase 적재 실패: {e}"})
        return self._json(200, {"ok": True, "chunks": len(rows)})
