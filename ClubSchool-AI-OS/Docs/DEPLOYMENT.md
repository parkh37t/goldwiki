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
   - `ANTHROPIC_API_KEY` = `sk-ant-...` (필수 — 에이전트 대화)
   - `CS_MODEL` = `claude-opus-4-8` (선택)
   - (인증·저장) `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE`
   - (자동 학습 RAG) `OPENAI_API_KEY` 또는 `VOYAGE_API_KEY`
6. Deploy → `https://<프로젝트>.vercel.app/` 접속(자동으로 `/Console/` 로 이동).

배포 후 콘솔 상단이 **● 서버 연결됨** 으로 표시되면 키 없이 누구나 에이전트와 대화할 수 있다.
(공개 URL이라면 아래 *인증* 섹션을 적용하라.)

> 동작 원리: Vercel은 `api/*.py` 를 서버리스 함수로 배포한다. 콘솔은 부팅 시 `/api/health` 를 감지해
> 자동으로 서버 프록시 모드로 전환한다. `.claude/` 같은 dot-폴더는 정적으로 서빙되지 않으므로,
> 에이전트/커맨드 본문은 `Console/manifest.json` 에 내장되어 정적 호스트에서도 동작한다.

### Supabase 연결 — 인증 + 영속화 + 자동 학습(구현됨)

1. [supabase.com](https://supabase.com) 프로젝트 생성 → SQL Editor 에 [`supabase/schema.sql`](../supabase/schema.sql) 실행(pgvector + RLS 포함).
2. Vercel 환경변수에 `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE` 추가.
3. 재배포 후 콘솔 접속 시 **로그인 게이트**가 나타난다(회원가입/로그인). 로그인하면:
   - 대화가 `jobs`·`chat_messages` 에 저장된다.
   - 응답 하단 **🗂️ 산출물로 저장** → `deliverables`(좌측 *내 산출물* 뷰에서 조회).
   - 응답 하단 **🧠 지식으로 학습** → 임베딩 후 `knowledge_chunks`(승인 대기) 적재.
4. **자동 학습 RAG**: `OPENAI_API_KEY`(또는 `VOYAGE_API_KEY`)를 추가하면, 대화 시 *관련 GoldWiki 참조 주입*
   체크 상태에서 승인된 지식을 임베딩 검색해 컨텍스트로 주입한다(서버 `/api/rag`).
   - 임베딩 차원은 schema 기본 1536(OpenAI text-embedding-3-small). Voyage 사용 시 차원을 맞춰라.
   - 적재된 지식은 기본 `approved=false`. 운영에서는 검토 후 `approved=true`로 승격(휴먼 인 더 루프).

자세한 데이터 모델·단계: [supabase/README.md](../supabase/README.md).

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
