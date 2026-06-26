#!/usr/bin/env python3
"""ClubSchool AI OS — 콘솔 백엔드 서버 (의존성 없음, Python 표준 라이브러리만 사용).

역할:
  1) 정적 콘솔(/Console/)과 저장소 문서(/GoldWiki, /.claude, /Agents ...)를 서빙
  2) /api/chat   — 서버사이드 Anthropic 프록시 (API 키는 서버 환경변수, 브라우저 노출 없음)
  3) /api/manifest, /api/health — 콘솔이 사용하는 메타 API

실행:
  ANTHROPIC_API_KEY=sk-ant-... python3 server/app.py
  (PORT 환경변수 지원, 기본 8000 / 0.0.0.0 바인딩 → 클라우드 배포 호환)

배포: server/README.md 참조 (Docker / Render / Railway / Fly / GitHub Pages 정적 변형).
"""
import json
import os
import subprocess
import sys
import urllib.request
import urllib.error
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial

# ClubSchool-AI-OS 루트 (이 파일의 상위 디렉터리)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
DEFAULT_MODEL = os.environ.get("CS_MODEL", "claude-opus-4-8")
ALLOWED_MODELS = {
    "claude-opus-4-8", "claude-sonnet-4-6", "claude-haiku-4-5-20251001",
}
MAX_TOKENS_CAP = int(os.environ.get("CS_MAX_TOKENS_CAP", "8192"))


def ensure_manifest():
    """manifest.json 이 없으면 빌드한다."""
    mpath = os.path.join(ROOT, "Console", "manifest.json")
    if not os.path.exists(mpath):
        try:
            subprocess.run([sys.executable, os.path.join(ROOT, "Console", "build-manifest.py")],
                           check=True, cwd=ROOT)
        except Exception as e:  # noqa
            print(f"[warn] manifest 빌드 실패: {e}", file=sys.stderr)


def call_anthropic(payload):
    """서버사이드에서 Anthropic API 호출. (api_key, error) 처리."""
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not key:
        return 503, {"error": "서버에 ANTHROPIC_API_KEY가 설정되지 않았습니다. 환경변수를 설정하거나 콘솔의 프롬프트 모드를 사용하세요."}

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
        ANTHROPIC_URL,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "content-type": "application/json",
            "x-api-key": key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.loads(r.read().decode("utf-8"))
        text = "\n".join(b.get("text", "") for b in data.get("content", [])).strip()
        return 200, {"text": text or "(빈 응답)", "model": model,
                     "usage": data.get("usage", {})}
    except urllib.error.HTTPError as e:
        try:
            detail = json.loads(e.read().decode("utf-8")).get("error", {}).get("message", str(e))
        except Exception:  # noqa
            detail = f"HTTP {e.code}"
        return e.code, {"error": detail}
    except Exception as e:  # noqa
        return 502, {"error": f"업스트림 호출 실패: {e}"}


class Handler(SimpleHTTPRequestHandler):
    """정적 서빙(ROOT 기준) + /api/* 라우팅."""

    def _send_json(self, code, obj):
        payload = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self):
        if self.path.startswith("/api/"):
            return self._api_get()
        # 루트 접속 시 콘솔로 리다이렉트
        if self.path in ("/", ""):
            self.send_response(302)
            self.send_header("Location", "/Console/")
            self.end_headers()
            return
        return super().do_GET()

    def _api_get(self):
        if self.path == "/api/health":
            return self._send_json(200, {
                "ok": True,
                "service": "clubschool-ai-os-console",
                "hasKey": bool(os.environ.get("ANTHROPIC_API_KEY", "").strip()),
                "model": DEFAULT_MODEL,
                "models": sorted(ALLOWED_MODELS),
            })
        if self.path == "/api/manifest":
            mpath = os.path.join(ROOT, "Console", "manifest.json")
            if os.path.exists(mpath):
                with open(mpath, encoding="utf-8") as f:
                    return self._send_json(200, json.load(f))
            return self._send_json(404, {"error": "manifest 없음"})
        return self._send_json(404, {"error": "알 수 없는 API"})

    def do_POST(self):
        if self.path != "/api/chat":
            return self._send_json(404, {"error": "알 수 없는 API"})
        try:
            length = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(length).decode("utf-8")) if length else {}
        except Exception as e:  # noqa
            return self._send_json(400, {"error": f"잘못된 요청 본문: {e}"})
        if not isinstance(payload.get("messages"), list) or not payload["messages"]:
            return self._send_json(400, {"error": "messages 배열이 필요합니다."})
        code, obj = call_anthropic(payload)
        return self._send_json(code, obj)

    def end_headers(self):
        # 정적 자산 보안 헤더(최소)
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def log_message(self, fmt, *args):  # 간결한 로그
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def main():
    ensure_manifest()
    port = int(os.environ.get("PORT", "8000"))
    handler = partial(Handler, directory=ROOT)
    httpd = ThreadingHTTPServer(("0.0.0.0", port), handler)
    has_key = bool(os.environ.get("ANTHROPIC_API_KEY", "").strip())
    print(f"ClubSchool AI OS 콘솔 서버 시작")
    print(f"  • 루트     : {ROOT}")
    print(f"  • 주소     : http://0.0.0.0:{port}/Console/")
    print(f"  • API 키   : {'설정됨(서버 프록시 활성)' if has_key else '미설정(콘솔은 프롬프트 모드로 동작)'}")
    print(f"  • 기본 모델: {DEFAULT_MODEL}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n서버 종료")
        httpd.server_close()


if __name__ == "__main__":
    main()
