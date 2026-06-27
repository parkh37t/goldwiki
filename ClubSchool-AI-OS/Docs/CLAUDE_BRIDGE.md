# 로컬 Claude Code 브리지 — 내 구독으로 콘솔에서 바로 대화

웹 콘솔에서 **내 Claude.ai 구독(Pro/Max)으로 답변을 화면에 바로** 받고 싶을 때 사용합니다.
**종량제 API 키가 필요 없고, API 과금이 0원**입니다. 모든 처리는 내 PC(localhost) 안에서만 일어납니다.

---

## 왜 브리지가 필요한가

Claude.ai 구독은 **웹앱에서 직접 호출할 수 있는 API가 없습니다.** 구독으로 자동 실행하는 유일한
방법은 내 컴퓨터의 **Claude Code**입니다. 이 브리지는 그 사이를 잇는 아주 작은 중계 서버입니다.

```
브라우저(콘솔)  ──localhost:8765──▶  claude-bridge.py  ──실행──▶  claude -p  (내 구독)
        ▲                                                                  │
        └──────────────────── 답변 텍스트를 화면에 표시 ◀───────────────────┘
```

---

## 1) 사전 준비 (1회)

1. **Claude Code 설치**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
   (Node.js 18+ 필요. 공식 설치 가이드를 따라도 됩니다.)

2. **내 구독으로 로그인**
   ```bash
   claude
   ```
   실행 후 안내에 따라 **Claude.ai(Pro/Max) 계정으로 로그인**합니다. (API 키 입력이 아닙니다.)
   한 번 로그인하면 이후에는 자동 사용됩니다.

---

## 2) 브리지 실행

저장소 루트(`ClubSchool-AI-OS/`)에서:

```bash
python3 server/claude-bridge.py
```

다음처럼 떠야 정상입니다:

```
✅ ClubSchool 로컬 Claude Code 브리지 실행 중 → http://localhost:8765
   엔진: claude CLI (내 Claude 구독 사용 · API 과금 없음)
```

> 파이썬 표준 라이브러리만 사용 — 추가 설치가 없습니다. 포트 변경: `BRIDGE_PORT=9000 python3 server/claude-bridge.py`

---

## 3) 콘솔에서 연결

1. 콘솔 → **설정** → **응답 엔진**에서 **"🖥️ 로컬 Claude Code 브리지"** 선택
2. 주소가 `http://localhost:8765` 인지 확인 → **연결 테스트** → ✅ 확인
3. **저장**
4. 이제 에이전트 **전송** 또는 자동 파이프라인 **▶ 지금 브라우저에서 자동 실행**을 누르면
   **내 구독으로 실행된 답변이 화면에 바로** 나타납니다.

연결 상태 표시가 **"● Claude Code 브리지(구독)"** 로 바뀝니다.

---

## 자주 묻는 질문

**Q. 과금되나요?**
아니요. 내 Claude.ai 구독으로 실행되며 종량제 API 과금이 없습니다.

**Q. HTTPS 사이트(Vercel)인데 localhost를 호출해도 되나요?**
네. Chrome은 보안 컨텍스트로 `http://localhost` 호출을 허용합니다(Ollama와 동일).

**Q. "브리지 연결 실패"가 떠요.**
- 내 PC에서 `python3 server/claude-bridge.py` 가 실행 중인지 확인
- 콘솔과 브리지가 **같은 PC**에서 동작해야 합니다(모바일 폰에서는 내 PC의 localhost에 접근 불가)

**Q. "claude 를 찾을 수 없습니다."**
Claude Code가 설치되지 않았거나 PATH에 없습니다. `npm i -g @anthropic-ai/claude-code` 후 다시 시도하세요.
경로가 특수하면 `CLAUDE_BIN=/path/to/claude python3 server/claude-bridge.py`.

**Q. 응답이 느려요 / 시간 초과**
큰 산출물은 시간이 걸립니다. `BRIDGE_TIMEOUT=900 python3 server/claude-bridge.py` 로 늘리거나,
작업을 단계로 나눠 실행하세요.

---

## 보안 메모

- 브리지는 `127.0.0.1`(localhost)에만 바인딩되어 외부에서 접근할 수 없습니다.
- 데이터는 내 PC를 벗어나지 않습니다(브라우저 ↔ 로컬 브리지 ↔ 로컬 claude).
- 신뢰할 수 있는 본인 PC에서만 실행하세요.

관련: [OLLAMA.md](OLLAMA.md) · [DEPLOYMENT.md](DEPLOYMENT.md)
