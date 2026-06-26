"""Vercel 서버리스 함수 — /api/config. 콘솔에 Supabase 공개 설정을 노출(anon key는 공개 안전)."""
import json
import os
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = json.dumps({
            "supabaseUrl": os.environ.get("SUPABASE_URL", ""),
            "supabaseAnonKey": os.environ.get("SUPABASE_ANON_KEY", ""),
            "ragEnabled": bool((os.environ.get("OPENAI_API_KEY") or os.environ.get("VOYAGE_API_KEY"))
                               and os.environ.get("SUPABASE_SERVICE_ROLE")),
        }, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)
