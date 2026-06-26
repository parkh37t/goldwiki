# CHANGELOG — ClubSchool AI OS

본 프로젝트의 모든 주목할 변경을 기록한다. 형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를,
버전은 [SemVer](https://semver.org/lang/ko/)를 따른다. 변경 결정의 근거는
[GoldWiki/32_DECISION_LOG.md](GoldWiki/32_DECISION_LOG.md)의 ADR과 연결된다.

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
