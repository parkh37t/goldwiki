# RACI — 21단계 파이프라인 × 22 에이전트 (ClubSchool AI OS v1.0)

> [27 자동화 워크플로우](../GoldWiki/27_AUTOMATION_WORKFLOW.md)의 21단계 RFP→납품 파이프라인에 대해
> 각 단계의 책임을 RACI로 명시한다. 단계의 담당 에이전트 정본은 27번 문서이며,
> 본 문서는 그 위에 책임 배분을 더한다.

## 표기

| 기호 | 의미 | 정의 |
|------|------|------|
| **R** | Responsible(실무 담당) | 작업을 직접 수행한다. 단계마다 1인 이상. |
| **A** | Accountable(최종 책임) | 산출물·게이트 통과를 최종 책임진다. 단계마다 **정확히 1인**. |
| **C** | Consulted(자문) | 양방향 협의 대상. 의견을 반영한다. |
| **I** | Informed(통보) | 결과를 통보받는다. |

> Documentation Specialist는 전 단계에서 골드위키 갱신·중복 점검을 수행하므로
> 별도 표기 없이 **모든 단계에 상시 C/I로 참여**한다(매트릭스 가독성을 위해 마지막 절에 별도 명시).

---

## 에이전트 약어

| 약어 | 에이전트 | 약어 | 에이전트 |
|------|----------|------|----------|
| CEO | CEO | PUB | Publishing Engineer |
| PD | Project Director | FE | Frontend Engineer |
| SD | Sales Director | BE | Backend Engineer |
| PS | Proposal Strategist | API | API Engineer |
| BA | Business Analyst | DB | Database Architect |
| PO | Product Owner | SEC | Security Engineer |
| SP | Service Planner | AIE | AI Engineer |
| UXR | UX Researcher | QA | QA Engineer |
| UID | UI Designer | OPS | DevOps Engineer |
| BX | BX Designer | DOC | Documentation Specialist |
| IXD | Interaction Designer | | |
| A11Y | Accessibility Specialist | | |

---

## 1. 제안 단계(단계 1–10, 게이트 A)

| # | 단계 | R(실무) | A(최종 책임) | C(자문) | I(통보) |
|---|------|---------|--------------|---------|---------|
| 1 | RFP 읽기 | BA | SD | PS | PD, PO |
| 2 | 분석 | BA, PS | PS | SD | PD, PO |
| 3 | 요약 | BA | PS | PS, SD | PD, PO, SD |
| 4 | 요구사항 추출 | BA, PO | BA | PS, SP | PD, UXR |
| 5 | 평가기준 도출 | PS | PS | BA, SD | PD |
| 6 | 숨은기대 식별 | PS, BA | PS | SD, UXR | PD, PO |
| 7 | 리스크 분석 | PD, BA | PD | SEC, SD | CEO, PS |
| 8 | 경쟁사 벤치마크 | BA, SP | PS | SD, UXR | PD |
| 9 | 글로벌 베스트프랙티스 벤치마크 | SP, UXR | SP | BA, UID | PD, PS |
| 10 | 제안 전략 | PS, SD | SD | BA, PD, CEO | CEO, PO |
| **게이트 A** | **전략 승인** | — | **PD** | SD, PS | CEO |

> **게이트 A(전략 승인)**: Sales Director·Project Director 승인 필수([27 §4](../GoldWiki/27_AUTOMATION_WORKFLOW.md),
> 휴먼인더루프 [25 §9](../GoldWiki/25_AI_GUIDE.md)). 미통과 시 단계 5–10 재작업.

---

## 2. 설계·디자인 단계(단계 11–17, 게이트 B)

| # | 단계 | R(실무) | A(최종 책임) | C(자문) | I(통보) |
|---|------|---------|--------------|---------|---------|
| 11 | WBS(작업분해구조) | PD | PD | BA, PO | 전 단계 리드 |
| 12 | 정보구조(IA) | UXR, SP | SP | UID, PO | PD |
| 13 | 유저 플로우 | UXR, IXD | SP | UID, BA | PD |
| 14 | 화면 목록 | SP, UID | SP | UXR, FE | PD, QA |
| 15 | UX 전략 | UXR | PO | SP, UID | PD |
| 16 | UI 컨셉 | UID, BX | UID | IXD, A11Y | PD |
| 17 | 디자인 시스템 | UID, IXD, A11Y | UID | BX, FE | PD, PUB |
| **게이트 B** | **디자인 승인** | — | **PD** | UID(리드), A11Y | QA, PUB |

> **게이트 B(디자인 승인)**: 접근성(WCAG 2.2 AA)·디자인 일관성 검수 필수.
> [29 품질 체크리스트](../GoldWiki/29_QUALITY_CHECKLIST.md)의 UX·UI·디자인시스템·접근성 항목 적용.

---

## 3. 빌드·품질 단계(단계 18–21, 게이트 C·최종)

| # | 단계 | R(실무) | A(최종 책임) | C(자문) | I(통보) |
|---|------|---------|--------------|---------|---------|
| 18 | HTML 프로토타입 계획 | PUB, FE | FE | UID, A11Y | PD, QA |
| 19 | 개발 계획 | FE, BE, API, DB | FE | SEC, OPS, AIE | PD, QA |
| 20 | QA 계획 | QA, SEC | QA | A11Y, FE, OPS | PD |
| **게이트 C** | **품질 검수** | — | **PD** | QA, SEC | CEO, OPS |
| 21 | 경영 요약 | PD, CEO | CEO | PS, QA, 전 리드 | 전 에이전트 |
| **최종** | **납품 승인** | PD | **PD(+CEO)** | QA, SD | CEO, 전 에이전트 |

> **게이트 C(품질 검수)**: [30 테스트 전략](../GoldWiki/30_TEST_STRATEGY.md) 종료기준 충족 +
> [29 품질 체크리스트](../GoldWiki/29_QUALITY_CHECKLIST.md) DoD 통과. 미통과 시 직전 관련 단계로 롤백.

---

## 4. 단계별 R/A 요약(빠른 참조)

| # | 단계 | A(단일 책임) | 게이트 |
|---|------|--------------|--------|
| 1 | RFP 읽기 | SD | — |
| 2 | 분석 | PS | — |
| 3 | 요약 | PS | — |
| 4 | 요구사항 추출 | BA | — |
| 5 | 평가기준 도출 | PS | — |
| 6 | 숨은기대 식별 | PS | — |
| 7 | 리스크 분석 | PD | — |
| 8 | 경쟁사 벤치마크 | PS | — |
| 9 | 글로벌 BP 벤치마크 | SP | — |
| 10 | 제안 전략 | SD | **게이트 A → PD** |
| 11 | WBS | PD | — |
| 12 | IA | SP | — |
| 13 | 유저 플로우 | SP | — |
| 14 | 화면 목록 | SP | — |
| 15 | UX 전략 | PO | — |
| 16 | UI 컨셉 | UID | — |
| 17 | 디자인 시스템 | UID | **게이트 B → PD** |
| 18 | HTML 프로토타입 계획 | FE | — |
| 19 | 개발 계획 | FE | — |
| 20 | QA 계획 | QA | **게이트 C → PD** |
| 21 | 경영 요약 | CEO | **최종 → PD(+CEO)** |

---

## 5. 전 단계 상시 참여(Documentation Specialist)

DOC(Documentation Specialist)는 모든 단계에서 다음 책임을 상시 수행한다.

| 책임 | RACI | 대상 골드위키 |
|------|------|----------------|
| 골드위키 갱신 동기화 | R(자기 영역) / C(타 단계) | [32](../GoldWiki/32_DECISION_LOG.md) [35](../GoldWiki/35_PROJECT_MEMORY.md) [37](../GoldWiki/37_BEST_PRACTICES.md) [36](../GoldWiki/36_REFERENCE_LIBRARY.md) |
| 중복·모순·링크 단절 점검 | A(거버넌스) | 전체 |
| 거버넌스(골드위키 먼저·중복 금지) 강제 | A | [28](../GoldWiki/28_SUBAGENT_RULES.md) |
| 결정의 환류 누락 통보 | I→C | [32](../GoldWiki/32_DECISION_LOG.md) |

AIE(AI Engineer)는 에이전트 오케스트레이션·RAG·프롬프트 품질에 대해 전 단계 **C**로 참여한다.
