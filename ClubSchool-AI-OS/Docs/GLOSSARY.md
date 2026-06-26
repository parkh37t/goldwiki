# GLOSSARY — ClubSchool AI OS 용어집

ClubSchool AI OS v1.0 운영에 필요한 핵심 용어를 한국어로 정의한다. 각 항목은 관련 정본 문서(GoldWiki) 또는 Docs 문서로 연결된다. 가나다·약어 혼합 순으로, 영문 표준명은 그대로 유지한다.

## 시스템·거버넌스

**SSOT (Single Source of Truth, 단일 진실 공급원)**
조직의 모든 표준·결정·지식이 한 곳에 모이고 그곳만이 정본이 되는 원칙. ClubSchool AI OS에서는 GoldWiki가 SSOT다. 같은 지식의 복제를 금지하고 항상 정본을 링크한다. → [`GOVERNANCE.md`](./GOVERNANCE.md), [`ARCHITECTURE.md`](./ARCHITECTURE.md)

**GoldWiki (골드위키)**
41개 한국어 지식 문서(`00_`~`40_`)로 구성된 조직의 두뇌이자 SSOT. RFP부터 릴리스, 기록·기억까지 전 영역을 망라한다. → [`../GoldWiki/00_START_HERE.md`](../GoldWiki/00_START_HERE.md)

**ClubSchool AI OS**
Claude Code 위에서 동작하는 "AI 디지털 컨설팅 회사 운영체제". RFP 분석→제안→UX/UI→디자인→퍼블리싱→개발→QA→납품을 수행한다. → 루트 `README.md`

**서브에이전트 (Subagent)**
특정 직무를 수행하는 전문 AI 실행 주체. 22개가 정의되어 있으며 정의 파일은 `.claude/agents/<kebab>.md`. 공통 행동강령은 GoldWiki 28번. → [`../GoldWiki/28_SUBAGENT_RULES.md`](../GoldWiki/28_SUBAGENT_RULES.md)

**오케스트레이션 (Orchestration)**
복수 에이전트의 작업을 순서·의존성에 맞춰 조율하는 활동. 주로 Project Director가 수행한다. → [`ARCHITECTURE.md`](./ARCHITECTURE.md) §3

**커맨드 (Command, 슬래시 커맨드)**
작업 진입점이 되는 `.claude/commands/<name>.md` 파일. frontmatter(`description`, `argument-hint`)와 프롬프트 본문으로 구성된다. → [`CONTRIBUTING.md`](./CONTRIBUTING.md)

**워크플로우 (Workflow)**
다단계 작업의 절차·입출력·책임을 정의한 것. 정의는 `.claude/workflows/`, 런북은 `Workflows/`. → [`../GoldWiki/27_AUTOMATION_WORKFLOW.md`](../GoldWiki/27_AUTOMATION_WORKFLOW.md)

**파이프라인 (Pipeline)**
RFP→납품의 21단계 표준 공정. 읽기부터 경영 요약까지를 표준화한다. → [`../GoldWiki/27_AUTOMATION_WORKFLOW.md`](../GoldWiki/27_AUTOMATION_WORKFLOW.md)

**템플릿 (Template)**
재사용 가능한 산출물 양식. 기계용은 `.claude/templates/`, 사람용 사본은 `Templates/`. → [`../GoldWiki/38_TEMPLATE_LIBRARY.md`](../GoldWiki/38_TEMPLATE_LIBRARY.md)

**RAG (Retrieval-Augmented Generation, 검색증강생성)**
정본 지식을 먼저 검색해 그 맥락 위에서 산출물을 생성하는 방식. 본 시스템은 파일·번호 인덱스·상호링크 기반 경량 RAG를 쓴다. → [`ARCHITECTURE.md`](./ARCHITECTURE.md) §4

**중복금지 (DRY, Don't Repeat Yourself)**
같은 지식을 두 곳에 두지 않는 원칙. 사본 대신 정본 링크를 둔다. → [`GOVERNANCE.md`](./GOVERNANCE.md)

**품질 게이트 (Quality Gate)**
산출물이 통과해야 하는 점검 기준. 통과 전에는 다음 단계로 넘기지 않는다. → [`../GoldWiki/29_QUALITY_CHECKLIST.md`](../GoldWiki/29_QUALITY_CHECKLIST.md)

**의사결정 4문서 갱신 규칙**
의미 있는 결정 시 의사결정 로그(32)·프로젝트 메모리(35)·베스트 프랙티스(37)·레퍼런스 라이브러리(36)를 함께 갱신하는 운영 규칙. → [`GOVERNANCE.md`](./GOVERNANCE.md)

## 비즈니스·제안

**RFP (Request for Proposal, 제안요청서)**
발주처가 과업·요구사항·평가기준을 담아 제안을 요청하는 문서. 파이프라인의 입력. → [`../GoldWiki/03_RFP_FRAMEWORK.md`](../GoldWiki/03_RFP_FRAMEWORK.md)

**RFP 분석**
RFP에서 요구사항·평가기준·숨은 기대·리스크를 추출하는 작업. → [`../GoldWiki/04_RFP_ANALYSIS.md`](../GoldWiki/04_RFP_ANALYSIS.md)

**제안 전략 (Proposal Strategy)**
경쟁 우위를 확보하기 위한 수주 전략과 차별화 메시지. → [`../GoldWiki/05_PROPOSAL_STRATEGY.md`](../GoldWiki/05_PROPOSAL_STRATEGY.md)

**평가기준 (Evaluation Criteria)**
발주처가 제안을 채점하는 항목·배점. 제안 우선순위 결정의 근거. → [`../GoldWiki/04_RFP_ANALYSIS.md`](../GoldWiki/04_RFP_ANALYSIS.md)

**숨은 기대 (Hidden Expectation)**
RFP 문면에 명시되지 않았으나 발주처가 실제로 기대하는 요구. → [`../GoldWiki/04_RFP_ANALYSIS.md`](../GoldWiki/04_RFP_ANALYSIS.md)

**WBS (Work Breakdown Structure, 작업분해구조)**
프로젝트 산출물을 위계적 작업 단위로 분해한 구조. 일정·책임 산정의 토대. → [`../GoldWiki/06_BUSINESS_ANALYSIS.md`](../GoldWiki/06_BUSINESS_ANALYSIS.md)

**RACI**
작업별 책임을 Responsible(실행)·Accountable(승인)·Consulted(자문)·Informed(통보)로 나눈 책임 배분 모델. → [`../GoldWiki/06_BUSINESS_ANALYSIS.md`](../GoldWiki/06_BUSINESS_ANALYSIS.md)

**벤치마크 (Benchmark)**
경쟁사·글로벌 베스트프랙티스와 비교해 기준선을 세우는 분석. → [`../GoldWiki/36_REFERENCE_LIBRARY.md`](../GoldWiki/36_REFERENCE_LIBRARY.md)

## UX·UI·디자인

**UX (User Experience, 사용자 경험)**
사용자가 제품과 상호작용하며 갖는 총체적 경험. → [`../GoldWiki/07_UX_PRINCIPLES.md`](../GoldWiki/07_UX_PRINCIPLES.md)

**UI (User Interface, 사용자 인터페이스)**
사용자가 직접 보고 조작하는 화면 요소와 그 가이드라인. → [`../GoldWiki/08_UI_GUIDELINES.md`](../GoldWiki/08_UI_GUIDELINES.md)

**BX (Brand Experience, 브랜드 경험)**
브랜드 정체성이 제품·접점 전반에서 전달되는 경험 설계. → [`../GoldWiki/09_DESIGN_SYSTEM.md`](../GoldWiki/09_DESIGN_SYSTEM.md)

**IA (Information Architecture, 정보구조)**
콘텐츠·기능을 사용자가 찾기 쉽게 구조화·분류·네비게이션 설계하는 작업. → [`../GoldWiki/11_INFORMATION_ARCHITECTURE.md`](../GoldWiki/11_INFORMATION_ARCHITECTURE.md)

**유저 플로우 (User Flow)**
목표 달성까지 사용자가 거치는 화면·동작의 경로. → [`../GoldWiki/12_USER_FLOW.md`](../GoldWiki/12_USER_FLOW.md)

**유저 저니 (User Journey)**
접점·감정·페인포인트를 포함한 사용자 여정 전체. → [`../GoldWiki/13_USER_JOURNEY.md`](../GoldWiki/13_USER_JOURNEY.md)

**디자인 시스템 (Design System)**
원칙·컴포넌트·토큰·가이드를 통합한 디자인 표준 체계. → [`../GoldWiki/09_DESIGN_SYSTEM.md`](../GoldWiki/09_DESIGN_SYSTEM.md)

**디자인 토큰 (Design Token)**
색·타이포·간격 등 디자인 속성을 이름 붙인 최소 변수 단위. 일관성과 멀티플랫폼 재사용의 기반. → [`../GoldWiki/15_DESIGN_TOKEN.md`](../GoldWiki/15_DESIGN_TOKEN.md)

**컴포넌트 라이브러리 (Component Library)**
재사용 가능한 UI 컴포넌트의 집합과 사용 규칙. → [`../GoldWiki/14_COMPONENT_LIBRARY.md`](../GoldWiki/14_COMPONENT_LIBRARY.md)

**접근성 (Accessibility, a11y) / WCAG**
장애 유무와 관계없이 모두가 이용 가능하도록 보장하는 설계 기준. WCAG는 그 국제 표준. → [`../GoldWiki/16_ACCESSIBILITY.md`](../GoldWiki/16_ACCESSIBILITY.md)

## 개발·운영

**퍼블리싱 (Publishing)**
디자인을 HTML/CSS 마크업으로 구현하는 작업. → [`../GoldWiki/17_HTML_GUIDE.md`](../GoldWiki/17_HTML_GUIDE.md)

**프론트엔드 (Frontend)**
사용자 화면단의 동작·상태를 구현하는 개발 영역. → [`../GoldWiki/20_FRONTEND_GUIDE.md`](../GoldWiki/20_FRONTEND_GUIDE.md)

**백엔드 (Backend)**
서버·비즈니스 로직·데이터 처리를 담당하는 개발 영역. → [`../GoldWiki/21_BACKEND_GUIDE.md`](../GoldWiki/21_BACKEND_GUIDE.md)

**API / REST**
시스템 간 통신 규약. REST는 자원 중심의 표준 API 스타일. → [`../GoldWiki/22_API_STANDARD.md`](../GoldWiki/22_API_STANDARD.md)

**OWASP**
웹 보안 위협과 대응을 정리한 사실상의 표준(예: OWASP Top 10). 보안 점검 기준으로 쓴다. → [`../GoldWiki/24_SECURITY_GUIDE.md`](../GoldWiki/24_SECURITY_GUIDE.md)

**프롬프트 엔지니어링 (Prompt Engineering)**
LLM이 원하는 산출을 내도록 지시를 설계하는 기법. → [`../GoldWiki/26_PROMPT_ENGINEERING.md`](../GoldWiki/26_PROMPT_ENGINEERING.md)

**ADR (Architecture Decision Record, 의사결정 기록)**
중요한 결정의 배경·대안·결론을 남기는 기록. 본 시스템에선 의사결정 로그(32)가 이 역할을 한다. → [`../GoldWiki/32_DECISION_LOG.md`](../GoldWiki/32_DECISION_LOG.md)

**프로젝트 메모리 (Project Memory)**
프로젝트 진행 중 축적되는 맥락·합의·상태 기록. → [`../GoldWiki/35_PROJECT_MEMORY.md`](../GoldWiki/35_PROJECT_MEMORY.md)

**베스트 프랙티스 (Best Practices)**
검증된 모범 사례 모음. 재사용 가능한 노하우의 정본. → [`../GoldWiki/37_BEST_PRACTICES.md`](../GoldWiki/37_BEST_PRACTICES.md)

**레퍼런스 라이브러리 (Reference Library)**
외부 사례·표준·자료의 정리된 참조 모음. → [`../GoldWiki/36_REFERENCE_LIBRARY.md`](../GoldWiki/36_REFERENCE_LIBRARY.md)

**테스트 전략 (Test Strategy) / QA**
품질을 보증하기 위한 테스트 범위·유형·기준. QA는 품질보증 활동. → [`../GoldWiki/30_TEST_STRATEGY.md`](../GoldWiki/30_TEST_STRATEGY.md)

**릴리스 프로세스 (Release Process) / SemVer**
배포 절차와 버전 표기 규칙. SemVer는 `MAJOR.MINOR.PATCH` 의미 기반 버전 체계. → [`../GoldWiki/31_RELEASE_PROCESS.md`](../GoldWiki/31_RELEASE_PROCESS.md)

**공통 오류 (Common Errors)**
반복되는 실수·함정과 해결책 모음. 디버깅의 1차 참조처. → [`../GoldWiki/39_COMMON_ERRORS.md`](../GoldWiki/39_COMMON_ERRORS.md)

## 관련 문서

- 시스템 구조: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 운영 원칙: [`GOVERNANCE.md`](./GOVERNANCE.md)
- 자주 묻는 질문: [`FAQ.md`](./FAQ.md)
