# CHANGELOG — ClubSchool AI OS

본 프로젝트의 모든 주목할 변경을 기록한다. 형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를,
버전은 [SemVer](https://semver.org/lang/ko/)를 따른다. 변경 결정의 근거는
[GoldWiki/32_DECISION_LOG.md](GoldWiki/32_DECISION_LOG.md)의 ADR과 연결된다.

---

## [2.0.0-design] — 2026-06-26

> Gold Wiki v2.0 아키텍처 **설계(Design)** 단계. 구현 전 설계 문서만 추가되며, v1.0 자산·동작은 변경 없음.

### Added (추가)
- **v2.0 아키텍처 설계 문서 세트** (`Docs/architecture-v2/`): v1.0(정적 GoldWiki SSOT + 24개 에이전트)
  위에 4대 능력을 더해 "거의 사람 수준의 디지털 조직"을 만드는 설계.
  - `README.md` — v2.0 비전, 4대 능력 요약, 전체 시스템 아키텍처(mermaid), v1.0→v2.0 차이표, 문서 인덱스,
    전사 KPI, 도입 마일스톤(M1–M6).
  - `01_AutoLearning.md` — 자동 학습: 수집→정제→임베딩/색인→승인 게이트→GoldWiki 반영 파이프라인,
    하이브리드 RAG·임베딩 인덱스 설계, 휴먼 인 더 루프 승인, 회귀 방지, 지식 버전관리. (이벤트/후보/승인 스키마 JSON)
  - `02_AutoUpdate.md` — 자동 업데이트: 외부 표준·트렌드·규제 모니터링, 영향 분석, 변경 제안→리뷰→PR→머지,
    SemVer·변경 로그·롤백, documentation-lead의 SSOT 무결성 강제. (변경 제안·머지 스키마 JSON)
  - `03_QALoop.md` — 자동 품질 검증 루프: 생성→자기검증→교차검증→AIEvaluationBoard 채점→자동 재작업→게이트,
    10단계 품질 체계 매핑, 점수 임계·최대 반복·에스컬레이션. (평가 결과·게이트 스키마 JSON)
  - `04_MCP_MultiAgent.md` — MCP 멀티에이전트 협업: Figma·GitHub·검색·데이터·ListeningMind 연동,
    권한 게이트웨이(프록시), 에이전트 메시지/핸드오프 프로토콜, 작업 큐·상태머신, 권한·보안 경계.
    (메시지·핸드오프·도구 호출 스키마 JSON, 호출/핸드오프 흐름 mermaid)
  - `05_Orchestration_and_Console.md` — 오케스트레이션 런타임 + 웹 콘솔 연동: Job 수명주기(상태머신),
    실시간 상태/스트리밍(SSE), 산출물 검증·승인 UX, 백엔드 API 엔드포인트 명세표.

### Changed (변경)
- **ROADMAP.md** — v2.0 섹션을 4대 능력(자동 학습·자동 업데이트·QA 루프·MCP 협업) + 오케스트레이션
  런타임/웹 콘솔 기준으로 구체화하고 설계 문서 링크·도입 마일스톤(M1–M6) 표를 추가(기존 항목 보존·연계).

### Notes (비고)
- 본 항목은 설계 산출물 추가 기록이다. 실제 구현·기능 동작은 후속 정식 버전(2.0.0)에서 반영한다.

---

## [1.7.0] — 2026-06-27 · 로컬 Claude Code 브리지(내 구독으로 화면 내 대화)

### Added (추가)
- **로컬 Claude Code 브리지** (`server/claude-bridge.py`) — 내 PC에서 실행하는 의존성 없는 작은 HTTP
  서버. 콘솔(브라우저)이 localhost로 호출하면 `claude -p`(내 Claude.ai 구독 로그인)를 실행해 답변을
  **콘솔 화면 안에 바로** 표시. **종량제 API 미사용 · 과금 0원**, 데이터는 localhost를 벗어나지 않음.
  - 콘솔: 응답 엔진에 `🖥️ 로컬 Claude Code 브리지` 추가, 주소/모델 설정 + 연결 테스트, 연결 라벨
    `Claude Code 브리지(구독)`. 에이전트 대화·자동 파이프라인 모두 지원(`callBridge`).
  - 가이드: `Docs/CLAUDE_BRIDGE.md` (Claude Code 설치 → 구독 로그인 → 브리지 실행 → 콘솔 연결).
- 엔진별 안내 문구에 브리지/Ollama 케이스 보강, 에이전트 인트로의 `undefined` 표기 버그 수정.

---

## [1.6.1] — 2026-06-27 · 구독(프롬프트) 모드 기본화

### Changed (변경)
- **Claude.ai 구독으로 실행을 기본·권장으로** — 종량제 API가 아니라 사용자의 Claude 구독(Pro/Max)을
  쓰도록, 기본 엔진을 `프롬프트 복사 → Claude Code`로 변경. 복사 후 안내 메시지를 "내 구독으로 실행
  (API 과금 0원)"으로 명확화하고 [Claude Code](https://claude.ai/code)·claude.ai 링크 제공.
- **API 키 입력란을 "고급"으로 강등** — 종량제 API는 구독과 별개로 과금됨을 명시. 설정에 구독≠API 설명 추가.
- 연결 상태 라벨 `구독 모드(프롬프트)`, 자산 캐시 `?v=154`.

### Notes (비고)
- Claude.ai 구독 토큰은 웹앱에서 API로 직접 호출할 수 없음(엔드포인트 부재). 구독으로 자동 실행하는
  유일한 경로는 Claude Code이며, 콘솔의 프롬프트 복사가 이를 매개한다.

---

## [1.6.0] — 2026-06-27 · 파일 업로드 · 다크/라이트 테마

### Added (추가)
- **RFP/파일 업로드** — 자동 파이프라인과 에이전트 대화에서 `📎 파일` 버튼 또는 **드래그&드롭**으로
  문서를 첨부하면 텍스트를 추출해 입력에 채웁니다. 지원: PDF(브라우저에서 pdf.js 지연 로드)·DOCX(mammoth)·
  TXT·MD·CSV·JSON·HTML 등. 여러 개 첨부 가능, 첨부 칩으로 표시. (DOC/HWP는 PDF 변환 안내)
  추출은 사용자 브라우저에서 수행되어 서버·API를 쓰지 않습니다.
- **다크/라이트 테마 토글** — 상단바 🌙/☀️ 버튼으로 전환, 선택은 브라우저에 저장(`cs.theme`),
  로드 시 깜빡임 없이 적용. 라이트 테마 팔레트 추가(`[data-theme="light"]`).

### Changed (변경)
- 입력창 placeholder·힌트에 파일 첨부 안내 추가, 자산 캐시 버전 `?v=153`.

### Changed (변경)
- **내 Anthropic API 키(내 토큰)로 바로 대화** — 응답 엔진 기본값을 `🔑 내 API 키(direct)`로 변경.
  설정 상단에 API 키 입력란을 눈에 띄게 배치(모델·최대 토큰 포함). 키 입력 시 브라우저에서 Claude를
  직접 호출해 **사용자 본인 크레딧에서 소진**(배포 서버 키 미사용). `auto` 모드도 내 키를 서버 키보다 우선.
- **다크 테마 정합** — 설정의 Ollama/키 입력 박스를 다크 톤으로 통일, 자산 캐시 버전 `?v=152`.

---

## [1.5.2] — 2026-06-26 · 무API 기본화 · 캐시 무효화

### Changed (변경)
- **무API를 기본 동작으로** — 서버에 API 키가 있어도 자동으로 호출하지 않습니다. 응답 엔진 기본값을
  `🆓 무API · 프롬프트 복사`로 변경(`chatMode()` 우선순위 재정의). API 자동 호출은 설정에서 `☁️ 서버/내 API
  자동`을 **명시 선택**할 때만 동작. 연결 상태 라벨 `무API 모드` 표기.
- **에러 안내 개선** — `invalid x-api-key`·사용량 한도 오류 시, 과금 없는 무API 모드로 전환하라고 안내.

### Fixed (수정)
- **정적 자산 캐시 문제** — 배포 후에도 폰/브라우저가 이전 CSS/JS를 보던 문제 해결. 자산에 버전 쿼리
  (`?v=151`) 부여 + `vercel.json`에 HTML `no-cache` 헤더 추가.

---

## [1.5.1] — 2026-06-26 · 모바일 반응형 수정

### Fixed (수정)
- **모바일 UI/UX** — 좁은 화면에서 사이드바 라벨이 세로로 쪼개지고 3열 그리드가 뭉개지던 문제 해결.
  사이드바를 햄버거(☰) 오프캔버스 드로어로 전환(전체 라벨 표시·스크림·ESC/바깥탭/항목선택 시 닫힘),
  작업 패널은 모바일에서 전체화면 오버레이로, 카드·KPI·스플릿 레이아웃을 1열로 정렬.
  나브 라벨을 `.nav-label` 스팬으로 감싸 숨김 규칙 신뢰성 확보(`Console/index.html`·`styles.css`·`app.js`).

---

## [1.5.0] — 2026-06-26 · 웹 콘솔 · 무API 자동화 · 디자인 산출물

### Added (추가)
- **웹 콘솔(`Console/`)** — 프리미엄 다크 UI. 에이전트 대화·커맨드·워크플로우·Gold Wiki 탐색·
  내 산출물·10단계 품질 검증·🚀 자동 파이프라인. Vercel(서버리스 `api/*.py`) 배포.
- **무API 실행(로컬 Ollama)** — 설정에서 엔진 전환, 브라우저에서 버튼 하나로 RFP 자동 실행.
  `Docs/OLLAMA.md`. 채팅·파이프라인 공용 디스패처(`llmComplete`).
- **품질 보완 루프** — 자동 실행 후 qa-lead 품질 게이트(JSON 채점) → 미흡 단계 자동 재작성(최대 2회) → 재검증.
- **산출물 내보내기** — PPTX·XLSX·DOCX·PDF·**DESIGN(.html)**·HTML·MD (클라이언트, 무료). `export.js`.
- **Supabase 연동** — 로그인(GoTrue)·작업/대화/산출물 영속화(PostgREST+RLS)·자동학습 RAG(pgvector,
  `/api/embed`·`/api/rag`). `supabase/schema.sql`.
- **Figma/클로드디자인 연결** — `.claude/commands/to-design.md`. 실제 시연: Figma 6화면 모바일 플로우
  (프로토타입 연결 26개·시작점 지정) + Adobe Express 1페이지 임포트.
- **Figma 디자인 시스템** — 컬러 변수 10·수치 변수 9·텍스트 스타일 7·컴포넌트 4, 6개 화면 색상
  토큰 바인딩(채움 182·테두리 22).

### Changed (변경)
- `CLAUDE.md`/`README.md` ClubSchool AI OS 브랜딩, `vercel.json`·`Dockerfile`·`render.yaml` 배포 설정.

---

## [1.0.0] — 2026-06-26

### Added (추가)
- **GoldWiki 41개 지식 문서** (`GoldWiki/00_`~`40_`): 기초(00–06), 디자인(07–16),
  엔지니어링(17–24), AI/자동화/QA(25–31), 지식/메모리(32–40). 단일 진실 공급원(SSOT).
- **22개 전문 서브에이전트** (`.claude/agents/`): CEO, Project Director, Sales Director,
  Proposal Strategist, Business Analyst, Product Owner, Service Planner, UX Researcher,
  UI Designer, BX Designer, Interaction Designer, Accessibility Specialist, Publishing
  Engineer, Frontend/Backend/API Engineer, Database Architect, Security Engineer,
  AI Engineer, QA Engineer, DevOps Engineer, Documentation Specialist.
- **슬래시 커맨드 10종** (`.claude/commands/`): `/analyze-rfp`, `/generate-proposal`,
  `/plan-ux`, `/design-system-init`, `/publish-prototype`, `/qa-gate`, `/security-review`,
  `/new-decision`, `/run-pipeline`, `/goldwiki-sync`.
- **워크플로우 정의/런북** (`.claude/workflows/`, `Workflows/`): RFP→납품 21단계,
  제안 스프린트, 디자인 스프린트, 납품·QA.
- **재사용 프롬프트·템플릿** (`.claude/prompts/`, `.claude/templates/`, `Templates/`).
- **조직 자산** (`Agents/`): 레지스트리, 조직도, RACI, 협업 맵, 에스컬레이션 정책.
- **완성 예시** (`Examples/`): 가상 "청소년 동아리 통합 플랫폼" RFP 대응 전 산출물.
- **시스템 문서** (`Docs/`): 아키텍처, 용어집, FAQ, 거버넌스, 기여 가이드, 온보딩.
- **운영 문서**: `README.md`, `CLAUDE.md`, `INSTALL.md`, `ROADMAP.md`, `CHANGELOG.md`.

### Governance (거버넌스)
- "골드위키 먼저 참조" 원칙, SSOT·지식 중복 금지, 모든 결정 시 의사결정 로그·프로젝트
  메모리·베스트 프랙티스·레퍼런스 라이브러리 자동 갱신 규칙 확립.

### Notes (비고)
- 모든 콘텐츠 한국어 작성. 표준명·코드·식별자·파일명만 영문 유지.

[1.0.0]: 최초 릴리스 — ClubSchool AI OS Foundation.
