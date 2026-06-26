# ClubSchool AI OS — 콘솔 백엔드 서버

실제 웹에서 콘솔을 구동하는 **의존성 없는**(Python 표준 라이브러리만) 서버입니다.
정적 콘솔과 저장소 문서를 서빙하고, **서버사이드 Anthropic 프록시**(`/api/chat`)로 에이전트
대화를 처리합니다. API 키는 서버 환경변수에만 두므로 브라우저에 노출되지 않고 CORS 문제도 없습니다.

## 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/` | `/Console/` 로 리다이렉트 |
| GET | `/Console/`, `/GoldWiki/...`, `/.claude/...` 등 | 정적 파일 서빙(저장소 루트 기준) |
| GET | `/api/health` | 상태·키 보유 여부·모델 목록 |
| GET | `/api/manifest` | 콘솔 인덱스(manifest.json) |
| POST | `/api/chat` | `{system, messages, model, max_tokens}` → Anthropic 응답 `{text, usage}` |

## 로컬 실행

```bash
cd ClubSchool-AI-OS
export ANTHROPIC_API_KEY=sk-ant-...      # (선택) 없으면 콘솔은 '프롬프트 모드'로 동작
python3 server/app.py                     # http://localhost:8000/Console/
```

콘솔은 부팅 시 `/api/health`를 감지해 자동으로 **서버 연결됨** 모드로 전환합니다(브라우저에 키 입력 불필요).

## Docker

```bash
cd ClubSchool-AI-OS
docker build -t clubschool-ai-os .
docker run -p 8000:8000 -e ANTHROPIC_API_KEY=sk-ant-... clubschool-ai-os
# → http://localhost:8000/Console/
```

## 클라우드 배포

### Render (무료 플랜, 가장 간단)
1. 이 저장소를 GitHub에 푸시(이미 됨).
2. Render → **New → Blueprint** → 저장소 선택 → `render.yaml` 자동 인식(`rootDir: ClubSchool-AI-OS`).
3. 환경변수 `ANTHROPIC_API_KEY` 를 비밀값으로 입력 → Deploy.

### Railway / Fly.io / Heroku 계열
- `Procfile`(`web: python3 server/app.py`)을 인식하는 플랫폼이면 그대로 동작. `PORT`는 플랫폼이 주입.
- Fly.io 는 `Dockerfile` 사용: `fly launch` 후 `fly secrets set ANTHROPIC_API_KEY=...`.

### 정적 전용(백엔드 없이) — GitHub Pages 등
- 백엔드 없이도 콘솔은 동작합니다(문서 열람·검증·**프롬프트 복사 모드**, 또는 사용자가 설정에 개인 키 입력 시 직접 대화).
- 저장소 루트(`ClubSchool-AI-OS/`)를 정적 호스팅하고 `/Console/` 로 접속하세요.
  Pages는 `/`(레포 루트) 또는 `/docs` 만 게시하므로, `ClubSchool-AI-OS`를 별도 Pages 레포로 올리거나
  GitHub Actions 로 해당 폴더를 게시하세요.

## 보안

- `ANTHROPIC_API_KEY`는 이미지/저장소에 굽지 말고 **런타임 환경변수/비밀값**으로 주입.
- 서버는 허용 모델 화이트리스트와 응답 토큰 상한(`CS_MAX_TOKENS_CAP`)을 강제.
- 공개 배포 시 인증(예: 리버스 프록시 Basic Auth, 또는 사내망 제한)을 앞단에 두는 것을 권장.

## 동작 모드 요약

| 모드 | 조건 | 대화 처리 |
|------|------|-----------|
| 서버 연결됨 | 서버에 `ANTHROPIC_API_KEY` 설정 | `/api/chat` 프록시(권장) |
| API 연결됨 | 콘솔 설정에 개인 키 입력 | 브라우저 직접 호출 |
| 프롬프트 모드 | 키 없음 | 실행 프롬프트 클립보드 복사 |
