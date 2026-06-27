#!/usr/bin/env python3
"""ClubSchool AI OS — 로컬 Claude Code 브리지

웹 콘솔(브라우저)이 내 PC의 Claude Code(내 Claude.ai 구독 로그인)를 호출하도록
중계하는 작은 로컬 HTTP 서버입니다. **종량제 API 키가 아니라 내 구독으로 실행**되며,
요청은 모두 localhost 안에서만 처리됩니다(과금 0원).

동작 원리
  브라우저(콘솔)  --localhost:8765-->  이 브리지  --subprocess-->  `claude -p` (구독)
  답변 텍스트를 콘솔 화면에 그대로 표시.

사전 준비
  1) Claude Code 설치:  npm i -g @anthropic-ai/claude-code   (또는 공식 설치 가이드)
  2) 내 구독으로 로그인: 터미널에서  claude  실행 후 안내에 따라 Claude.ai(Pro/Max) 로그인
  3) 이 브리지 실행:     python3 server/claude-bridge.py
  4) 콘솔 → 설정 → 응답 엔진 → "🖥️ 로컬 Claude Code 브리지" 선택 (주소 http://localhost:8765)

주의
  - 의존성 없음(파이썬 표준 라이브러리만). 외부로 데이터가 나가지 않습니다.
  - HTTPS 콘솔(Vercel)에서 http://localhost 호출은 Chrome에서 보안 예외로 허용됩니다.
"""
import json
import os
import shutil
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("BRIDGE_PORT", "8765"))
CLAUDE_BIN = os.environ.get("CLAUDE_BIN", "claude")
DEFAULT_MODEL = os.environ.get("BRIDGE_MODEL", "")  # 비우면 Claude Code 기본 모델
TIMEOUT = int(os.environ.get("BRIDGE_TIMEOUT", "600"))


def _flatten(system, messages):
    """system + 멀티턴 messages 를 단일 프롬프트 텍스트로 평탄화."""
    lines = []
    prior = messages[:-1] if messages else []
    if prior:
        lines.append("[이전 대화 맥락]")
        for m in prior:
            role = "사용자" if m.get("role") == "user" else "어시스턴트"
            lines.append(f"{role}: {m.get('content', '')}")
        lines.append("")
    last = messages[-1]["content"] if messages else ""
    lines.append("[현재 요청]")
    lines.append(last)
    return "\n".join(lines), (system or "")


def run_claude(system, messages, model):
    prompt, sys_prompt = _flatten(system, messages)
    cmd = [CLAUDE_BIN, "-p", "--output-format", "json"]
    if sys_prompt.strip():
        cmd += ["--append-system-prompt", sys_prompt]
    if model:
        cmd += ["--model", model]
    proc = subprocess.run(
        cmd, input=prompt, capture_output=True, text=True, timeout=TIMEOUT
    )
    if proc.returncode != 0:
        err = (proc.stderr or proc.stdout or "").strip()
        raise RuntimeError(err or f"claude 종료 코드 {proc.returncode}")
    out = (proc.stdout or "").strip()
    # --output-format json → {"type":"result","result":"...", ...}
    try:
        data = json.loads(out)
        text = data.get("result") or data.get("text") or ""
        if isinstance(text, list):  # 방어적
            text = "\n".join(str(x) for x in text)
        return (text or "").strip() or "(빈 응답)"
    except json.JSONDecodeError:
        return out or "(빈 응답)"


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *a):  # 조용히
        pass

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "content-type")

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self._cors()
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        if self.path.rstrip("/") in ("/api/health", "/health"):
            ok = shutil.which(CLAUDE_BIN) is not None
            return self._json(200, {
                "ok": ok, "engine": "claude-code-bridge",
                "claude": ok, "model": DEFAULT_MODEL or "default",
                "hint": "" if ok else f"`{CLAUDE_BIN}` 실행 파일을 찾을 수 없습니다. Claude Code를 설치하세요.",
            })
        return self._json(404, {"error": "not found"})

    def do_POST(self):
        if self.path.rstrip("/") not in ("/api/chat", "/chat"):
            return self._json(404, {"error": "not found"})
        try:
            n = int(self.headers.get("Content-Length", "0"))
            payload = json.loads(self.rfile.read(n) or b"{}")
        except (ValueError, json.JSONDecodeError):
            return self._json(400, {"error": "invalid JSON"})
        messages = payload.get("messages") or []
        system = payload.get("system") or ""
        model = payload.get("model") or DEFAULT_MODEL
        if not messages:
            return self._json(400, {"error": "messages 필요"})
        try:
            text = run_claude(system, messages, model)
            return self._json(200, {"text": text})
        except subprocess.TimeoutExpired:
            return self._json(504, {"error": f"시간 초과({TIMEOUT}s). 더 짧게 나눠 실행하세요."})
        except FileNotFoundError:
            return self._json(500, {"error": f"`{CLAUDE_BIN}` 를 찾을 수 없습니다. Claude Code 설치 후 다시 시도하세요."})
        except Exception as e:  # noqa: BLE001
            return self._json(500, {"error": str(e)})


def main():
    if shutil.which(CLAUDE_BIN) is None:
        print(f"⚠️  '{CLAUDE_BIN}' 실행 파일을 찾을 수 없습니다.")
        print("    Claude Code 설치:  npm i -g @anthropic-ai/claude-code")
        print("    설치 후 한 번  claude  를 실행해 Claude.ai 구독으로 로그인하세요.\n")
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"✅ ClubSchool 로컬 Claude Code 브리지 실행 중 → http://localhost:{PORT}")
    print(f"   엔진: claude CLI (내 Claude 구독 사용 · API 과금 없음)")
    print("   콘솔 설정 → 응답 엔진 → '🖥️ 로컬 Claude Code 브리지' 선택")
    print("   중지: Ctrl+C\n")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print("\n브리지를 종료합니다.")
        srv.shutdown()


if __name__ == "__main__":
    sys.exit(main())
