"""Vercel 서버리스 함수 — /api/chat (Anthropic 서버사이드 프록시).

Vercel은 `api/` 하위 *.py 를 @vercel/python 런타임으로 자동 배포한다.
콘솔이 system/messages 를 보내면 서버 환경변수 ANTHROPIC_API_KEY 로 Anthropic을 호출한다.
키는 브라우저에 노출되지 않는다. (정적 콘솔 + 이 함수만으로 '실제 웹앱'이 완성된다.)
"""
import json
import os
import urllib.request
import urllib.error
from http.server import BaseHTTPRequestHandler

ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
DEFAULT_MODEL = os.environ.get("CS_MODEL", "claude-opus-4-8")
ALLOWED_MODELS = {"claude-opus-4-8", "claude-sonnet-4-6", "claude-haiku-4-5-20251001"}
MAX_TOKENS_CAP = int(os.environ.get("CS_MAX_TOKENS_CAP", "8192"))


def call_anthropic(payload):
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not key:
        return 503, {"error": "서버에 ANTHROPIC_API_KEY가 설정되지 않았습니다."}
    model = payload.get("model") or DEFAULT_MODEL
    if model not in ALLOWED_MODELS:
        model = DEFAULT_MODEL
    body = {
        "model": model,
        "max_tokens": min(int(payload.get("max_tokens", 4096)), MAX_TOKENS_CAP),
        "messages": payload.get("messages", []),
    }
    if payload.get("system"):
        body["system"] = payload["system"]
    req = urllib.request.Request(
        ANTHROPIC_URL, data=json.dumps(body).encode("utf-8"),
        headers={"content-type": "application/json", "x-api-key": key,
                 "anthropic-version": "2023-06-01"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            data = json.loads(r.read().decode("utf-8"))
        text = "\n".join(b.get("text", "") for b in data.get("content", [])).strip()
        return 200, {"text": text or "(빈 응답)", "model": model, "usage": data.get("usage", {})}
    except urllib.error.HTTPError as e:
        try:
            detail = json.loads(e.read().decode("utf-8")).get("error", {}).get("message", str(e))
        except Exception:  # noqa
            detail = f"HTTP {e.code}"
        return e.code, {"error": detail}
    except Exception as e:  # noqa
        return 502, {"error": f"업스트림 호출 실패: {e}"}


class handler(BaseHTTPRequestHandler):
    def _json(self, code, obj):
        b = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(b)

    def do_POST(self):
        try:
            n = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(n).decode("utf-8")) if n else {}
        except Exception as e:  # noqa
            return self._json(400, {"error": f"잘못된 요청 본문: {e}"})
        if not isinstance(payload.get("messages"), list) or not payload["messages"]:
            return self._json(400, {"error": "messages 배열이 필요합니다."})
        code, obj = call_anthropic(payload)
        return self._json(code, obj)

    def do_GET(self):
        self._json(405, {"error": "POST만 허용됩니다."})
