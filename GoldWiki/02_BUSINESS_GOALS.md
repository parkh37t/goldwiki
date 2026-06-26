# 02 · 비즈니스 목표 (전략 · 운영 목표)

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital의 북극성 지표, OKR, KPI, 성장 전략을 정의하고, 각 목표를 담당 에이전트·골드위키 문서와 연결한다. |
| **대상 독자** | 경영진, Project Director, Sales Director, 전 본부 리드 에이전트 |
| **담당(Owner) 에이전트** | CEO |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md) |
| **연계(하위 문서)** | [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md), [제안 전략](05_PROPOSAL_STRATEGY.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 북극성 지표 (North Star Metric)

> **북극성 지표: 분기당 성공적으로 납품된 고객 가치 단위(Delivered Client Value Units, DCVU)**

DCVU는 게이트를 모두 통과하여 클라이언트에게 인수된 산출물(제안 수주, 디자인 시스템, 출시된 프로덕트)을 가중 합산한 지표이다. 이 단일 지표는 **속도 × 품질 × 가치**를 동시에 반영하며, 매출보다 선행하는 운영 건강 지표 역할을 한다.

| 구성 요소 | 가중치 | 측정 출처 |
| --- | --- | --- |
| 수주된 제안 | 3.0 | [제안 전략](05_PROPOSAL_STRATEGY.md) |
| 인수된 디자인 시스템 산출물 | 1.5 | [디자인 시스템](09_DESIGN_SYSTEM.md) |
| 출시된 프로덕트(릴리스) | 2.0 | [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| 재사용 자산 등록 | 0.5 | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) |

---

## 2. OKR (목표 및 핵심 결과)

> 측정 주기: 분기. 평가: 핵심 결과(KR) 달성률 0.7 이상을 성공으로 본다.

### Objective 1 — 수주 엔진을 고성능화한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 수주율(Win Rate) | 28% | 40% | Proposal Strategist | [05](05_PROPOSAL_STRATEGY.md) |
| KR2. 제안 사이클타임(중앙값) | 18일 | 10일 | Sales Director | [03](03_RFP_FRAMEWORK.md) |
| KR3. 컴플라이언스 매트릭스 100% 충족 제안 비율 | 70% | 98% | Proposal Strategist | [04](04_RFP_ANALYSIS.md) |

### Objective 2 — 디자인·구현 처리량을 확장한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 주당 디자인 처리량(완료 화면/주) | 12 | 25 | UI Designer | [08](08_UI_GUIDELINES.md) |
| KR2. 컴포넌트 재사용률 | 45% | 75% | BX Designer | [14](14_COMPONENT_LIBRARY.md) |
| KR3. 프로토타입 리드타임(요구→동작) | 9일 | 4일 | Frontend Engineer | [20](20_FRONTEND_GUIDE.md) |

### Objective 3 — 품질을 시스템으로 보증한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 결함 유출률(Defect Escape Rate) | 6.5% | 1.5% | QA Engineer | [30](30_TEST_STRATEGY.md) |
| KR2. WCAG AA 준수율 | 82% | 100% | Accessibility Specialist | [16](16_ACCESSIBILITY.md) |
| KR3. 게이트 1회 통과율(First-Pass Yield) | 64% | 90% | Project Director | [29](29_QUALITY_CHECKLIST.md) |

### Objective 4 — 조직 지식을 복리로 축적한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 의사결정 로그 기록 충실도 | 55% | 95% | Documentation Specialist | [32](32_DECISION_LOG.md) |
| KR2. 신규 등록 재사용 템플릿(분기) | 5 | 20 | Documentation Specialist | [38](38_TEMPLATE_LIBRARY.md) |
| KR3. 베스트 프랙티스 채택률 | 40% | 80% | 전 본부 리드 | [37](37_BEST_PRACTICES.md) |

---

## 3. KPI 대시보드

| KPI | 정의 | 목표 | 주기 | 담당 | 출처 문서 |
| --- | --- | --- | --- | --- | --- |
| 수주율 | 수주 건수 ÷ 제출 건수 | ≥ 40% | 월 | Sales Director | [05](05_PROPOSAL_STRATEGY.md) |
| 제안 사이클타임 | 접수→제출 소요일(중앙값) | ≤ 10일 | 월 | Proposal Strategist | [03](03_RFP_FRAMEWORK.md) |
| 디자인 처리량 | 인수 완료 화면 수/주 | ≥ 25 | 주 | UI Designer | [08](08_UI_GUIDELINES.md) |
| 결함 유출률 | 운영 발견 결함 ÷ 전체 결함 | ≤ 1.5% | 월 | QA Engineer | [30](30_TEST_STRATEGY.md) |
| 게이트 1회 통과율 | 재작업 없이 통과한 게이트 비율 | ≥ 90% | 단계별 | Project Director | [29](29_QUALITY_CHECKLIST.md) |
| 컴포넌트 재사용률 | 재사용 컴포넌트 ÷ 전체 사용 | ≥ 75% | 분기 | BX Designer | [14](14_COMPONENT_LIBRARY.md) |
| 고객 만족도(CSAT) | 프로젝트 종료 설문 | ≥ 4.5/5 | 프로젝트별 | Project Director | [34](34_CLIENT_KNOWLEDGE.md) |
| 매출 성장률 | 전년 동기 대비 | ≥ 35% | 분기 | CEO | — |

---

## 4. 성장 전략

| 축 | 전략 | 핵심 레버 | 연계 |
| --- | --- | --- | --- |
| **수주 확대** | AI 증강 제안으로 사이클타임을 줄여 입찰 빈도를 높인다. | 윈 테마 라이브러리, 컴플라이언스 자동화 | [05](05_PROPOSAL_STRATEGY.md) |
| **단가 상승** | 디자인 시스템·풀스택 통합으로 고부가 패키지를 판매한다. | 가치제안 캔버스 | [09](09_DESIGN_SYSTEM.md) |
| **반복 매출** | 리테이너·운영 유지 계약을 확대한다. | 운영 이관 품질 | [31](31_RELEASE_PROCESS.md) |
| **마진 개선** | 재사용 자산으로 한계비용을 낮춘다. | 템플릿·컴포넌트 재사용 | [38](38_TEMPLATE_LIBRARY.md) |
| **레퍼런스 확보** | 공공·금융 등 규제 산업 레퍼런스를 축적한다. | 접근성·보안 강점 | [16](16_ACCESSIBILITY.md), [24](24_SECURITY_GUIDE.md) |

---

## 5. 목표–에이전트–문서 연결 매트릭스

| 목표(Objective) | 핵심 담당 에이전트 | 주 연계 골드위키 문서 |
| --- | --- | --- |
| O1 수주 엔진 | Sales Director, Proposal Strategist | [03](03_RFP_FRAMEWORK.md), [04](04_RFP_ANALYSIS.md), [05](05_PROPOSAL_STRATEGY.md) |
| O2 처리량 확장 | UI Designer, BX Designer, Frontend Engineer | [09](09_DESIGN_SYSTEM.md), [14](14_COMPONENT_LIBRARY.md), [20](20_FRONTEND_GUIDE.md) |
| O3 품질 보증 | QA Engineer, Accessibility Specialist, Security Engineer | [16](16_ACCESSIBILITY.md), [24](24_SECURITY_GUIDE.md), [30](30_TEST_STRATEGY.md) |
| O4 지식 축적 | Documentation Specialist | [32](32_DECISION_LOG.md), [37](37_BEST_PRACTICES.md), [38](38_TEMPLATE_LIBRARY.md) |

---

## 6. 측정 거버넌스

- **데이터 출처 일원화.** 모든 KPI 원천은 골드위키 또는 연계 시스템 로그로 한정한다.
- **검토 리듬.** 주간(처리량·사이클타임), 월간(KPI 대시보드), 분기(OKR 평가).
- **이상 대응.** KPI가 목표 대비 80% 미만이면 Project Director가 근본 원인 분석을 수행하고 [공통 오류](39_COMMON_ERRORS.md)와 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.

---

## 관련 골드위키 문서
- [회사 컨텍스트](01_COMPANY_CONTEXT.md) — 미션·서비스 라인.
- [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) — 사이클타임·게이트 정의.
- [제안 전략](05_PROPOSAL_STRATEGY.md) — 수주율 전략.
- [품질 체크리스트](29_QUALITY_CHECKLIST.md) — 게이트 통과율 측정.
- [테스트 전략](30_TEST_STRATEGY.md) — 결함 유출률 관리.
- [베스트 프랙티스](37_BEST_PRACTICES.md) — 채택률 측정 대상.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
