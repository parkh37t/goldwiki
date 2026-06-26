# 00 · 여기서 시작하세요 (마스터 인덱스 & 운영 매뉴얼)

| 항목 | 내용 |
| --- | --- |
| **목적** | 골드위키(Gold Wiki) 전체 워크스페이스의 단일 진입점이자 운영 매뉴얼. 모든 사람·AI 에이전트가 작업을 시작하기 전 가장 먼저 읽는 문서이다. |
| **대상 독자** | 신규 합류자, 클라이언트, 경영진, 그리고 모든 22개 서브에이전트 |
| **담당(Owner) 에이전트** | CEO, Documentation Specialist |
| **참조(상위 문서)** | 없음 (최상위 루트 문서) |
| **연계(하위 문서)** | 전체 41개 문서 |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 골드위키란 무엇인가

골드위키(Gold Wiki)는 **Goldwiki Digital(골드위키 디지털)의 조직 두뇌(Organizational Brain)** 이자 **단일 진실 공급원(Single Source of Truth, SSOT)** 이다. 회사의 모든 방법론, 표준, 의사결정, 산출물 템플릿, 프로젝트 기억이 이곳 한 곳에 집결된다.

Goldwiki Digital은 AI 증강(AI-augmented) 운영 모델로 동작하는 엔터프라이즈 디지털 프로덕트 컨설팅 회사이다. 22개의 전문 AI 서브에이전트가 실제 업무를 수행하며, 골드위키는 이들이 공유하는 지식의 원천이다. 사람과 AI가 동일한 문서를 참조함으로써 일관성, 추적성, 재사용성을 보장한다.

> **핵심 원칙:** 모든 에이전트는 의사결정을 내리기 전에 반드시 골드위키를 먼저 참조한다. 지식은 중복 저장하지 않는다. 새로 내린 의사결정은 자동으로 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.

---

## 2. SSOT 거버넌스 모델

골드위키는 "한 번 정의하고, 어디서든 참조한다(Define Once, Reference Everywhere)"는 원칙으로 운영된다.

| 거버넌스 요소 | 규칙 |
| --- | --- |
| **권위(Authority)** | 골드위키에 기록된 내용이 공식 표준이다. 구두 합의·개인 메모는 효력이 없다. |
| **단일 출처** | 동일 정보를 두 곳에 적지 않는다. 항상 원본 문서로 링크한다. |
| **변경 관리** | 표준 변경은 [의사결정 로그](32_DECISION_LOG.md)에 근거(맥락·대안·결정·영향)와 함께 기록한다. |
| **추적성** | 모든 산출물은 출처 문서와 담당 에이전트로 추적 가능해야 한다. |
| **자동 환류(Feedback Loop)** | 프로젝트 종료 시 학습 내용은 [프로젝트 메모리](35_PROJECT_MEMORY.md)와 [베스트 프랙티스](37_BEST_PRACTICES.md)로 환류된다. |
| **신선도(Freshness)** | 각 문서는 메타데이터 블록에 최종 수정일과 상태를 유지한다. |

### 문서 생애주기
초안(Draft) → 검토(Review) → 활성(Active) → 개정(Revising) → 보관(Archived). 상태는 각 문서 상단 메타데이터 블록에 표기한다.

---

## 3. 41개 문서 전체 탐색 지도

문서는 다섯 개 분류로 조직된다. 번호는 권장 학습 순서를 따른다.

### 3.1 기초(Foundation) · 00–06
회사·전략·수주 활동의 토대.

| 번호 | 문서 | 한 줄 설명 |
| --- | --- | --- |
| 00 | [여기서 시작하세요](00_START_HERE.md) | 본 문서. 전체 인덱스와 운영 매뉴얼. |
| 01 | [회사 컨텍스트](01_COMPANY_CONTEXT.md) | 미션·비전·서비스 라인·조직·운영 모델. |
| 02 | [비즈니스 목표](02_BUSINESS_GOALS.md) | 북극성 지표·OKR·KPI·성장 전략. |
| 03 | [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) | 접수부터 납품까지 21단계 파이프라인. |
| 04 | [RFP 심층 분석](04_RFP_ANALYSIS.md) | RFP 독해·요구사항 추출·리스크 분석 플레이북. |
| 05 | [제안 전략](05_PROPOSAL_STRATEGY.md) | 윈 테마·가치제안·가격·레드팀 검토. |
| 06 | [비즈니스 분석](06_BUSINESS_ANALYSIS.md) | 요구공학·as-is/to-be·추적성 매트릭스. |

### 3.2 디자인(Design) · 07–16
사용자 경험과 비주얼 시스템.

| 번호 | 문서 | 한 줄 설명 |
| --- | --- | --- |
| 07 | [UX 원칙](07_UX_PRINCIPLES.md) | 사용자 중심 설계 원칙과 휴리스틱. |
| 08 | [UI 가이드라인](08_UI_GUIDELINES.md) | 시각 디자인 규칙과 레이아웃 기준. |
| 09 | [디자인 시스템](09_DESIGN_SYSTEM.md) | 통합 디자인 시스템 운영 체계. |
| 10 | [Figma 가이드](10_FIGMA_GUIDE.md) | Figma 작업 표준과 파일 구조. |
| 11 | [정보구조(IA)](11_INFORMATION_ARCHITECTURE.md) | 사이트맵·내비게이션·콘텐츠 구조. |
| 12 | [사용자 플로우](12_USER_FLOW.md) | 화면 전환과 태스크 플로우 설계. |
| 13 | [사용자 여정(User Journey)](13_USER_JOURNEY.md) | 여정 지도와 페인 포인트 분석. |
| 14 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) | 재사용 UI 컴포넌트 카탈로그. |
| 15 | [디자인 토큰](15_DESIGN_TOKEN.md) | 색·타이포·스페이싱 토큰 정의. |
| 16 | [접근성](16_ACCESSIBILITY.md) | WCAG 준수 기준과 점검 절차. |

### 3.3 엔지니어링(Engineering) · 17–24
구현·아키텍처·보안.

| 번호 | 문서 | 한 줄 설명 |
| --- | --- | --- |
| 17 | [HTML 가이드](17_HTML_GUIDE.md) | 시맨틱 마크업과 마크업 표준. |
| 18 | [CSS 가이드](18_CSS_GUIDE.md) | 스타일 아키텍처와 명명 규칙. |
| 19 | [JS 가이드](19_JS_GUIDE.md) | 자바스크립트 코딩 표준. |
| 20 | [프런트엔드 가이드](20_FRONTEND_GUIDE.md) | 프런트엔드 아키텍처와 빌드 체계. |
| 21 | [백엔드 가이드](21_BACKEND_GUIDE.md) | 서버·서비스 계층 설계 표준. |
| 22 | [API 표준](22_API_STANDARD.md) | REST/OpenAPI 설계 규약. |
| 23 | [데이터베이스 가이드](23_DATABASE_GUIDE.md) | 데이터 모델링·쿼리 표준. |
| 24 | [보안 가이드](24_SECURITY_GUIDE.md) | OWASP 기반 보안 통제. |

### 3.4 AI · 자동화 · QA · 25–31
지능형 운영과 품질.

| 번호 | 문서 | 한 줄 설명 |
| --- | --- | --- |
| 25 | [AI 가이드](25_AI_GUIDE.md) | AI 활용 원칙과 거버넌스. |
| 26 | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md) | 프롬프트 설계 방법론. |
| 27 | [자동화 워크플로](27_AUTOMATION_WORKFLOW.md) | 파이프라인 자동화와 에이전트 오케스트레이션. |
| 28 | [서브에이전트 규칙](28_SUBAGENT_RULES.md) | 에이전트 운영·협업 규칙. |
| 29 | [품질 체크리스트](29_QUALITY_CHECKLIST.md) | 단계별 품질 게이트. |
| 30 | [테스트 전략](30_TEST_STRATEGY.md) | 테스트 레벨과 커버리지 기준. |
| 31 | [릴리스 프로세스](31_RELEASE_PROCESS.md) | 배포·롤백 절차. |

### 3.5 지식(Knowledge) · 32–40
조직 기억과 재사용 자산.

| 번호 | 문서 | 한 줄 설명 |
| --- | --- | --- |
| 32 | [의사결정 로그](32_DECISION_LOG.md) | 모든 주요 의사결정의 기록(ADR). |
| 33 | [회의록](33_MEETING_NOTE.md) | 회의 결정·액션 아이템 보관소. |
| 34 | [클라이언트 지식](34_CLIENT_KNOWLEDGE.md) | 고객별 컨텍스트·이력. |
| 35 | [프로젝트 메모리](35_PROJECT_MEMORY.md) | 프로젝트 학습·회고 누적. |
| 36 | [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md) | 외부 표준·자료 색인. |
| 37 | [베스트 프랙티스](37_BEST_PRACTICES.md) | 검증된 모범 사례 모음. |
| 38 | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) | 재사용 산출물 템플릿. |
| 39 | [공통 오류](39_COMMON_ERRORS.md) | 반복 실수와 회피책. |
| 40 | [프롬프트 라이브러리](40_PROMPT_LIBRARY.md) | 검증된 프롬프트 모음. |

---

## 4. 22개 서브에이전트와 역할

각 에이전트는 `/home/user/goldwiki/.claude/agents/<name>.md`에 정의되며, 운영 규칙은 [서브에이전트 규칙](28_SUBAGENT_RULES.md)을 따른다.

| # | 에이전트 | 역할 한 줄 설명 |
| --- | --- | --- |
| 1 | CEO | 전략 방향과 최종 의사결정, 거버넌스 총괄. |
| 2 | Project Director | 프로젝트 전체 일정·자원·리스크 관리. |
| 3 | Sales Director | 영업 기회 발굴과 수주 전략 총괄. |
| 4 | Proposal Strategist | 윈 테마·제안서 구성과 스토리라인 설계. |
| 5 | Business Analyst | 요구사항 추출·분석·추적성 관리. |
| 6 | Product Owner | 백로그 우선순위와 제품 가치 정의. |
| 7 | Service Planner | 서비스 기획과 기능 명세 작성. |
| 8 | UX Researcher | 사용자 조사와 인사이트 도출. |
| 9 | UI Designer | 시각 디자인과 화면 설계. |
| 10 | BX Designer | 브랜드 경험과 비주얼 아이덴티티. |
| 11 | Interaction Designer | 인터랙션·모션·마이크로 인터랙션. |
| 12 | Accessibility Specialist | WCAG 준수와 접근성 검증. |
| 13 | Publishing Engineer | 시맨틱 마크업과 퍼블리싱. |
| 14 | Frontend Engineer | 프런트엔드 구현과 상태 관리. |
| 15 | Backend Engineer | 서버 로직과 비즈니스 계층 구현. |
| 16 | API Engineer | API 설계·구현·문서화. |
| 17 | Database Architect | 데이터 모델링과 쿼리 최적화. |
| 18 | Security Engineer | 보안 통제와 취약점 관리. |
| 19 | AI Engineer | AI 기능 설계와 모델 통합. |
| 20 | QA Engineer | 테스트 설계와 결함 관리. |
| 21 | DevOps Engineer | CI/CD·인프라·릴리스 자동화. |
| 22 | Documentation Specialist | 골드위키 문서 관리와 추적성 보증. |

상세 조직도는 [회사 컨텍스트](01_COMPANY_CONTEXT.md)를 참조한다.

---

## 5. RFP → 납품 21단계 파이프라인

전체 가치 흐름은 영업 접수에서 운영 이관까지 21단계로 표준화된다. 각 단계의 담당 에이전트·산출물·갱신 문서는 [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md)에 정의된다.

| 단계 | 명칭 | 주 담당 | 핵심 산출물 |
| --- | --- | --- | --- |
| 1 | RFP 접수·자격 판단 | Sales Director | 접수 체크리스트, Go/No-Go 판정 |
| 2 | 분류·라우팅 | Project Director | RFP 분류표 |
| 3 | 심층 분석 | Business Analyst | 요구사항 분해표 ([04](04_RFP_ANALYSIS.md)) |
| 4 | 리스크 평가 | Project Director | 리스크 레지스터 |
| 5 | 경쟁·시장 분석 | Proposal Strategist | 경쟁 포지셔닝 ([05](05_PROPOSAL_STRATEGY.md)) |
| 6 | 윈 전략 수립 | Proposal Strategist | 윈 테마, 가치제안 |
| 7 | 비즈니스 분석 | Business Analyst | as-is/to-be ([06](06_BUSINESS_ANALYSIS.md)) |
| 8 | 제품·서비스 기획 | Product Owner / Service Planner | 기능 명세, 백로그 |
| 9 | UX 리서치 | UX Researcher | 페르소나, 여정 지도 ([13](13_USER_JOURNEY.md)) |
| 10 | 정보구조·플로우 | UX Researcher | IA, 플로우 ([11](11_INFORMATION_ARCHITECTURE.md), [12](12_USER_FLOW.md)) |
| 11 | UI 디자인 | UI Designer | 화면 디자인, 토큰 |
| 12 | 디자인 시스템·접근성 | BX/Interaction/Accessibility | 컴포넌트, WCAG 검증 |
| 13 | 프로토타이핑 | Frontend Engineer | HTML 프로토타입 |
| 14 | 아키텍처 설계 | Backend/API/DB Architect | 아키텍처 문서 |
| 15 | 구현 | Frontend/Backend Engineer | 소스 코드 |
| 16 | 보안 검토 | Security Engineer | 보안 점검 결과 ([24](24_SECURITY_GUIDE.md)) |
| 17 | QA·테스트 | QA Engineer | 테스트 결과 ([30](30_TEST_STRATEGY.md)) |
| 18 | 제안서 작성·레드팀 | Proposal Strategist | 최종 제안서 |
| 19 | 제출·발표 | Sales Director | 제출본, 발표 자료 |
| 20 | 계약·킥오프 | Project Director | 계약서, 킥오프 |
| 21 | 납품·운영 이관 | DevOps / Documentation | 릴리스, 회고 ([31](31_RELEASE_PROCESS.md), [35](35_PROJECT_MEMORY.md)) |

각 단계는 게이트 기준을 통과해야 다음 단계로 진행하며, 게이트 정의는 [품질 체크리스트](29_QUALITY_CHECKLIST.md)에 있다.

---

## 6. 빠른 시작 가이드

### 6.1 사람용 빠른 시작
1. 본 문서(00)로 전체 지형을 파악한다.
2. [회사 컨텍스트](01_COMPANY_CONTEXT.md)와 [비즈니스 목표](02_BUSINESS_GOALS.md)로 방향을 이해한다.
3. 자신의 역할 분류(기초/디자인/엔지니어링/AI·QA/지식)의 해당 문서를 정독한다.
4. 작업 시작 전 관련 표준 문서를 확인하고, 의사결정은 [의사결정 로그](32_DECISION_LOG.md)에 남긴다.

### 6.2 AI 에이전트용 빠른 시작
1. **항상 골드위키를 먼저 읽는다.** 본 문서로 전체 구조를, 자신의 에이전트 정의 파일로 책임 범위를 확인한다.
2. 작업 입력에서 RFP 단계를 식별하고 [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md)에서 자신의 단계를 찾는다.
3. 해당 단계에서 읽어야 할 문서와 갱신해야 할 문서를 확인한다.
4. 산출물은 [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md)의 템플릿을 사용한다.
5. 결정·학습은 거버넌스 푸터의 4개 문서에 환류한다.

---

## 관련 골드위키 문서
- [회사 컨텍스트](01_COMPANY_CONTEXT.md) — 미션·조직·운영 모델 전반.
- [비즈니스 목표](02_BUSINESS_GOALS.md) — 전략 목표와 측정 지표.
- [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) — 21단계 파이프라인 상세.
- [서브에이전트 규칙](28_SUBAGENT_RULES.md) — 에이전트 협업·운영 규칙.
- [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) — 재사용 산출물 템플릿.
- [의사결정 로그](32_DECISION_LOG.md) — 의사결정 기록 체계.
- [프로젝트 메모리](35_PROJECT_MEMORY.md) — 프로젝트 학습 누적.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
