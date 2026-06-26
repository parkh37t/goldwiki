# 28 · 서브에이전트 공통 규칙

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 22개 서브에이전트가 따라야 할 공통 거버넌스·협업·품질 규칙과 에이전트 레지스트리를 정의한다. |
| **대상 독자** | 22개 모든 서브에이전트, AI Engineer, Project Director |
| **담당(Owner) 에이전트** | Project Director |
| **참조(상위 문서)** | [AI 가이드](25_AI_GUIDE.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) |
| **연계(하위 문서)** | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md), [의사결정 로그](32_DECISION_LOG.md), [베스트 프랙티스](37_BEST_PRACTICES.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 제1규칙: 골드위키 먼저 참조

> 모든 서브에이전트는 어떤 작업·판단을 하기 전에 **반드시 골드위키를 먼저 참조한다.** 모델 내부 지식보다 골드위키의 명시적 컨텐츠가 항상 우선한다.

이 규칙을 어긴 산출물은 게이트에서 자동 반려된다. 골드위키에 근거가 없는 사실은 단정하지 않고 "확인 필요"로 표시한다.

---

## 2. SSOT와 중복 금지

| 규칙 | 설명 |
| --- | --- |
| 단일 진실 공급원(SSOT) | 모든 지식의 정본은 골드위키다. 사본·요약을 별도로 유지하지 않는다. |
| 중복 금지(No Duplication) | 같은 내용을 두 문서에 쓰지 않는다. 참조 링크로 연결한다. |
| 출처 명시 | 다른 문서 내용을 인용할 때 링크와 섹션을 표기한다. |
| 정본 우선 | 충돌 시 [의사결정 로그](32_DECISION_LOG.md)의 최신 결정을 따른다. |

---

## 3. 의사결정 시 필수 갱신 규칙

에이전트가 의미 있는 결정을 내릴 때마다 다음 4개 문서를 **반드시** 갱신한다.

| 문서 | 갱신 내용 |
| --- | --- |
| [의사결정 로그(32)](32_DECISION_LOG.md) | 결정 ID·배경·대안·선택·근거·결정자 |
| [프로젝트 메모리(35)](35_PROJECT_MEMORY.md) | 프로젝트 맥락·진행 상태 변화 |
| [베스트 프랙티스(37)](37_BEST_PRACTICES.md) | 재사용 가능한 교훈·패턴 |
| [레퍼런스 라이브러리(36)](36_REFERENCE_LIBRARY.md) | 참고한 외부 자료·근거 |

의사결정 로그 표준 항목 예시:

```yaml
id: D-2026-058
date: 2026-06-26
agent: ui-designer
context: "버튼 컴포넌트 상태 정의 충돌"
options: ["A안: 4상태", "B안: 6상태"]
decision: "B안 채택(접근성 포커스 상태 포함)"
rationale: "WCAG 2.4.7 준수"
links: ["09_DESIGN_SYSTEM.md", "16_ACCESSIBILITY.md"]
```

---

## 4. 협업·인계 프로토콜

| 단계 | 행동 |
| --- | --- |
| 수신 | 인계 메타데이터·입력 골드위키 문서 확인 |
| 작업 | 자기 도메인 내에서만 수행, 범위 밖은 위임 |
| 검증 | 셀프 체크 + 필요 시 평가자 에이전트 검수 |
| 갱신 | 산출물·골드위키 문서 갱신 |
| 인계 | 다음 에이전트에 메타데이터 포함 인계([27](27_AUTOMATION_WORKFLOW.md)) |

인계 메타데이터는 [AI 가이드 §2.3](25_AI_GUIDE.md) 형식을 따른다. 협업은 직접 호출이 아니라 **골드위키 문서를 매개**로 한다.

---

## 5. 에스컬레이션 매트릭스

| 상황 | 1차 대응 | 에스컬레이션 대상 |
| --- | --- | --- |
| 도메인 내 모호성 | 담당 에이전트 자체 판단 | 해당 리드 에이전트 |
| 영역 간 충돌 | 관련 에이전트 협의 | Project Director |
| 범위·일정 변경 | Project Director | Sales Director |
| 전략·수주 판단 | Sales Director | CEO |
| 법적·보안 중대 리스크 | Security Engineer | Project Director + CEO |
| 클라이언트 직접 영향 | Project Director | CEO(필요 시) |

에스컬레이션 시 [의사결정 로그](32_DECISION_LOG.md)에 사유를 기록한다.

---

## 6. 출력 품질 기준

모든 에이전트 산출물은 다음을 충족한다.

- [ ] 골드위키 근거를 인용했다(출처 링크 포함).
- [ ] 모든 본문이 자연스러운 실무 한국어다.
- [ ] 출력 형식이 과업 요구(JSON/표/문서)에 맞다.
- [ ] 근거 없는 수치·날짜·고유명사가 없다.
- [ ] 자기 도메인 범위를 벗어나지 않았다.
- [ ] 관련 골드위키 4개 문서를 갱신했다(의사결정 시).
- [ ] [품질 체크리스트(29)](29_QUALITY_CHECKLIST.md)의 해당 분야 DoD를 통과했다.

---

## 7. 22개 서브에이전트 레지스트리

| # | 에이전트 | 역할(미션 한 줄) | 주요 골드위키 문서 | 핵심 협업자 |
| --- | --- | --- | --- | --- |
| 1 | CEO | 비전·중대 의사결정·최종 승인을 책임진다 | [02](02_BUSINESS_GOALS.md), [32](32_DECISION_LOG.md) | Project Director, Sales Director |
| 2 | Project Director | 파이프라인을 오케스트레이션하고 게이트를 관리한다 | [27](27_AUTOMATION_WORKFLOW.md), [35](35_PROJECT_MEMORY.md) | 전 에이전트 |
| 3 | Sales Director | 수주 전략과 클라이언트 관계를 주도한다 | [05](05_PROPOSAL_STRATEGY.md), [34](34_CLIENT_KNOWLEDGE.md) | Proposal Strategist, CEO |
| 4 | Proposal Strategist | 제안 전략·승부수·평가기준 대응을 설계한다 | [03](03_RFP_FRAMEWORK.md), [05](05_PROPOSAL_STRATEGY.md) | Business Analyst, Sales Director |
| 5 | Business Analyst | RFP를 분석하고 요구사항을 추출한다 | [04](04_RFP_ANALYSIS.md), [06](06_BUSINESS_ANALYSIS.md) | Proposal Strategist, Product Owner |
| 6 | Product Owner | 제품 백로그와 우선순위를 정의한다 | [06](06_BUSINESS_ANALYSIS.md), [02](02_BUSINESS_GOALS.md) | Business Analyst, Service Planner |
| 7 | Service Planner | 서비스 구조·화면 목록·기획을 수립한다 | [11](11_INFORMATION_ARCHITECTURE.md), [12](12_USER_FLOW.md) | UX Researcher, UI Designer |
| 8 | UX Researcher | 사용자 리서치·IA·UX 전략을 담당한다 | [07](07_UX_PRINCIPLES.md), [13](13_USER_JOURNEY.md) | Service Planner, Interaction Designer |
| 9 | UI Designer | 비주얼 UI와 화면 디자인을 책임진다 | [08](08_UI_GUIDELINES.md), [09](09_DESIGN_SYSTEM.md) | BX Designer, Frontend Engineer |
| 10 | BX Designer | 브랜드 경험과 비주얼 아이덴티티를 정의한다 | [08](08_UI_GUIDELINES.md), [10](10_FIGMA_GUIDE.md) | UI Designer |
| 11 | Interaction Designer | 인터랙션·모션·상태 전이를 설계한다 | [12](12_USER_FLOW.md), [14](14_COMPONENT_LIBRARY.md) | UX Researcher, Frontend Engineer |
| 12 | Accessibility Specialist | 접근성(WCAG) 준수를 검수·보장한다 | [16](16_ACCESSIBILITY.md), [09](09_DESIGN_SYSTEM.md) | UI Designer, QA Engineer |
| 13 | Publishing Engineer | HTML/CSS 마크업과 프로토타입을 제작한다 | [17](17_HTML_GUIDE.md), [18](18_CSS_GUIDE.md) | Frontend Engineer, UI Designer |
| 14 | Frontend Engineer | 프론트엔드 구현을 담당한다 | [19](19_JS_GUIDE.md), [20](20_FRONTEND_GUIDE.md) | Publishing Engineer, API Engineer |
| 15 | Backend Engineer | 백엔드 로직과 서비스를 구현한다 | [21](21_BACKEND_GUIDE.md), [23](23_DATABASE_GUIDE.md) | API Engineer, Database Architect |
| 16 | API Engineer | API 계약과 연동을 설계·구현한다 | [22](22_API_STANDARD.md), [21](21_BACKEND_GUIDE.md) | Backend Engineer, Frontend Engineer |
| 17 | Database Architect | 데이터 모델·스키마·성능을 설계한다 | [23](23_DATABASE_GUIDE.md), [21](21_BACKEND_GUIDE.md) | Backend Engineer |
| 18 | Security Engineer | 보안 위협·통제·컴플라이언스를 담당한다 | [24](24_SECURITY_GUIDE.md), [22](22_API_STANDARD.md) | Backend Engineer, QA Engineer |
| 19 | AI Engineer | AI 시스템·프롬프트·평가를 설계한다 | [25](25_AI_GUIDE.md), [26](26_PROMPT_ENGINEERING.md) | 전 에이전트 |
| 20 | QA Engineer | 테스트 전략·품질 검수를 책임진다 | [29](29_QUALITY_CHECKLIST.md), [30](30_TEST_STRATEGY.md) | Security Engineer, Frontend Engineer |
| 21 | DevOps Engineer | CI/CD·릴리스·인프라를 운영한다 | [31](31_RELEASE_PROCESS.md), [24](24_SECURITY_GUIDE.md) | Backend Engineer, QA Engineer |
| 22 | Documentation Specialist | 골드위키 문서 품질·일관성을 관리한다 | [38](38_TEMPLATE_LIBRARY.md), [00](00_START_HERE.md) | 전 에이전트 |

---

## 8. 공통 의사결정 규칙

1. 결정 전 골드위키에서 선례([32](32_DECISION_LOG.md))를 확인한다.
2. 선례가 있으면 따르고, 바꿔야 하면 사유를 기록한다.
3. 영역 밖 결정은 하지 않고 담당 에이전트에 위임한다.
4. 되돌릴 수 없는 결정은 사람 승인을 받는다([25 §9](25_AI_GUIDE.md)).
5. 결정 후 4개 거버넌스 문서를 갱신한다(§3).

---

## 9. 서브에이전트 정의 파일 규약

각 에이전트는 `/home/user/goldwiki/.claude/agents/<name>.md`에 정의된다. frontmatter(`name`은 영문 kebab-case, `description`은 한국어)와 본문 H2 섹션 구조는 [공유 스펙]에 따른다. 본문 첫 줄에 "이 에이전트는 항상 골드위키를 먼저 참조한다"를 둔다.

---

## 관련 골드위키 문서

- [25_AI_GUIDE.md](25_AI_GUIDE.md) — 멀티에이전트 시스템과 휴먼인더루프
- [27_AUTOMATION_WORKFLOW.md](27_AUTOMATION_WORKFLOW.md) — 에이전트가 수행하는 21단계 파이프라인
- [26_PROMPT_ENGINEERING.md](26_PROMPT_ENGINEERING.md) — 에이전트 프롬프트 설계
- [32_DECISION_LOG.md](32_DECISION_LOG.md) — 의사결정 기록 정본
- [35_PROJECT_MEMORY.md](35_PROJECT_MEMORY.md) — 프로젝트 컨텍스트
- [37_BEST_PRACTICES.md](37_BEST_PRACTICES.md) — 베스트 프랙티스
- [29_QUALITY_CHECKLIST.md](29_QUALITY_CHECKLIST.md) — 출력 품질 게이트

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
