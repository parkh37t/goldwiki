# 로컬 Ollama로 무료 자동 실행 (API 과금 0)

콘솔(웹)에서 에이전트 대화와 자동 파이프라인을 **내 PC의 무료 모델**로 구동하는 방법입니다.
Anthropic/OpenAI 같은 유료 API 키가 전혀 필요 없습니다.

## 1. Ollama 설치 & 모델 받기
1. https://ollama.com 에서 설치 (Windows/macOS/Linux).
2. 터미널에서 모델 다운로드(택1):
   ```bash
   ollama pull llama3.1      # 범용(권장 시작점)
   ollama pull qwen2.5       # 한국어 품질 우수
   ollama pull gemma2        # 가벼움
   ```

## 2. 브라우저에서 접근 가능하게 켜기 (중요)
브라우저(웹 콘솔)가 로컬 Ollama를 호출하려면 **CORS 허용**이 필요합니다. `OLLAMA_ORIGINS`로 켜세요.

- **macOS/Linux**
  ```bash
  OLLAMA_ORIGINS=* ollama serve
  ```
- **Windows (PowerShell)**
  ```powershell
  $env:OLLAMA_ORIGINS="*"; ollama serve
  ```
  (또는 시스템 환경변수에 `OLLAMA_ORIGINS=*` 등록 후 Ollama 재시작)

> 보안을 높이려면 `*` 대신 `OLLAMA_ORIGINS=https://goldwiki.vercel.app` 처럼 특정 출처만 허용하세요.

### HTTPS 사이트 ↔ http://localhost 관련
- `goldwiki.vercel.app`(HTTPS)에서 `http://localhost:11434` 호출은 **Chrome/Edge에서 허용**됩니다
  (localhost는 "신뢰 가능한 출처"로 간주). Firefox 일부 버전은 막을 수 있습니다.
- 막히면: 콘솔을 로컬에서 띄워 사용하세요 — `python3 server/app.py` 후 `http://localhost:8000/Console/`.

## 3. 콘솔 설정
1. 콘솔 → **⚙️ 설정** → **응답 엔진**을 **🟢 로컬 Ollama**로 변경.
2. **Ollama 주소**: `http://localhost:11434` (기본값).
3. **모델**: 받은 모델명(예: `llama3.1`).
4. **연결 테스트** 클릭 → "✅ 연결됨. 설치된 모델: …" 확인 → **저장**.
5. 좌측 상단 상태가 **● 로컬 Ollama**로 바뀌면 준비 완료.

## 4. 사용
- **에이전트 대화**: 에이전트 선택 → 대화 (Ollama가 응답, 과금 0).
- **자동 파이프라인**: 🚀 자동 파이프라인 → ▶ 내 RFP로 실행 → RFP 붙여넣기 →
  **▶ 지금 브라우저에서 자동 실행** → 단계별 산출물이 자동 생성됩니다.
  로그인 상태면 산출물이 Supabase에 자동 저장됩니다.

## 5. 품질 팁
- 로컬 모델은 클라우드 최상위 모델보다 품질이 낮을 수 있습니다. 한국어/표 품질은 `qwen2.5`가 좋은 편.
- 더 큰 모델(`llama3.1:70b` 등)은 품질↑·속도↓. PC 사양(RAM/VRAM)에 맞춰 선택하세요.
- 품질이 중요한 최종 산출물은 Claude Code(`/auto-rfp`)로 한 번 더 돌리는 하이브리드를 권장합니다.

## 문제 해결
| 증상 | 해결 |
|------|------|
| 연결 실패 | `OLLAMA_ORIGINS=*`로 ollama 재시작, 주소/포트 확인 |
| 모델 없음 | `ollama pull <모델>` |
| HTTPS에서 차단 | Chrome 사용 또는 콘솔 로컬 실행 |
| 너무 느림 | 더 작은 모델 사용, 동시 실행 줄이기 |
