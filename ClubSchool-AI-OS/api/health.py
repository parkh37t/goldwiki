"""Vercel 서버리스 함수 — /api/health. 콘솔이 서버 모드(프록시 사용 가능) 여부를 감지한다."""
import json
import os
from http.server import BaseHTTPRequestHandler

DEFAULT_MODEL = os.environ.get("CS_MODEL", "claude-opus-4-8")
ALLOWED_MODELS = ["claude-opus-4-8", "claude-sonnet-4-6", "claude-haiku-4-5-20251001"]


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = json.dumps({
            "ok": True,
            "service": "clubschool-ai-os-console",
            "platform": "vercel",
            "hasKey": bool(os.environ.get("ANTHROPIC_API_KEY", "").strip()),
            "model": DEFAULT_MODEL,
            "models": ALLOWED_MODELS,
        }, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)
