# 배포 가이드 — ClubSchool AI OS 콘솔을 실제 웹에서 실행

콘솔을 실제 웹에서 구동하는 방법을 권장순으로 정리한다. 핵심 원칙: **API 키는 서버에만** 두고,
브라우저에는 노출하지 않는다.

## 권장 스택: Vercel + Supabase ⭐

보유 중인 **Vercel**(호스팅·서버리스)과 **Supabase**(DB·인증·벡터)는 이 프로젝트에 최적의 조합이다.

| 레이어 | 담당 | 비고 |
|--------|------|------|
| 정적 콘솔 | Vercel(정적) | `Console/` 자동 서빙 |
| 에이전트 프록시 | Vercel 함수 `api/chat.py` | 서버사이드 Anthropic 호출, 키 비노출 |
| 데이터/인증/벡터 | Supabase | 작업·산출물·의사결정·자동학습([supabase/](../supabase/README.md)) |

### Vercel 배포 (5분)

1. 저장소를 GitHub에 푸시(완료).
2. [vercel.com/new](https://vercel.com/new) → 저장소 Import.
3. **Root Directory** 를 `ClubSchool-AI-OS` 로 지정(중요 — 이 폴더가 웹 루트가 된다).
4. Framework Preset: **Other**(정적) — `vercel.json` 이 함수/리다이렉트를 자동 구성.
5. **Environment Variables** 에 추가:
   - `ANTHROPIC_API_KEY` = `sk-ant-...` (필수)
   - `CS_MODEL` = `claude-opus-4-8` (선택)
6. Deploy → `https://<프로젝트>.vercel.app/` 접속(자동으로 `/Console/` 로 이동).

배포 후 콘솔 상단이 **● 서버 연결됨** 으로 표시되면 키 없이 누구나 에이전트와 대화할 수 있다.
(공개 URL이라면 아래 *인증* 섹션을 적용하라.)

> 동작 원리: Vercel은 `api/*.py` 를 서버리스 함수로 배포한다. 콘솔은 부팅 시 `/api/health` 를 감지해
> 자동으로 서버 프록시 모드로 전환한다. `.claude/` 같은 dot-폴더는 정적으로 서빙되지 않으므로,
> 에이전트/커맨드 본문은 `Console/manifest.json` 에 내장되어 정적 호스트에서도 동작한다.

### Supabase 연결(선택, v2.0로 가는 길)

[supabase/README.md](../supabase/README.md) 참고. 인증·작업 이력·산출물 보관·자동 학습(RAG)을
단계적으로 추가한다.

### 인증(공개 배포 시 필수 권장)

- Supabase Auth(이메일/OAuth)로 콘솔 로그인 게이트를 두거나,
- Vercel의 [Password Protection]/Access(팀 플랜) 또는 리버스 프록시 Basic Auth를 앞단에 둔다.

---

## 대안 A: Render / Railway / Fly (상주 서버)

`server/app.py`(의존성 없는 Python 서버)를 그대로 사용한다.

- **Render**: `render.yaml` 자동 인식(`rootDir: ClubSchool-AI-OS`), `ANTHROPIC_API_KEY` 비밀값 입력.
- **Railway/Heroku**: `Procfile`(`web: python3 server/app.py`) 인식, `PORT` 자동 주입.
- **Fly.io / 자체 서버**: `Dockerfile` 사용 → `fly launch` 후 `fly secrets set ANTHROPIC_API_KEY=...`.

자세한 내용: [server/README.md](../server/README.md).

## 대안 B: 정적 전용 (GitHub Pages 등, 백엔드 없음)

- 백엔드 없이도 콘솔은 동작: 문서 열람·품질 검증·**프롬프트 복사 모드**(또는 사용자가 설정에 개인 키 입력 시 직접 대화).
- `ClubSchool-AI-OS/` 를 정적 호스팅하고 `/Console/` 로 접속. 단 dot-폴더 미서빙 때문에 에이전트/커맨드는
  manifest 내장본을 사용한다(GoldWiki 등 일반 폴더는 정상 서빙).

---

## 로컬 실행(개발)

```bash
cd ClubSchool-AI-OS
python3 Console/build-manifest.py
ANTHROPIC_API_KEY=sk-ant-... python3 server/app.py   # http://localhost:8000/Console/
```

## 배포 전 체크리스트

- [ ] `python3 Console/build-manifest.py` 로 manifest 최신화(문서 추가/변경 시)
- [ ] `ANTHROPIC_API_KEY` 를 플랫폼 비밀값으로 설정(저장소에 커밋 금지)
- [ ] 공개 URL이면 인증 적용
- [ ] `/api/health` 200 및 콘솔 "서버 연결됨" 확인
- [ ] 에이전트 1건 대화·산출물 1건 품질 검증 스모크 테스트
