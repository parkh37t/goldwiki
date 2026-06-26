# 01 · 회사 컨텍스트 (Goldwiki Digital 회사 소개)

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 정체성·서비스·운영 모델·조직 구조를 정의한다. 모든 에이전트가 회사 맥락 위에서 일관되게 의사결정하도록 한다. |
| **대상 독자** | 전 구성원, 클라이언트, 파트너, 22개 서브에이전트 |
| **담당(Owner) 에이전트** | CEO |
| **참조(상위 문서)** | [여기서 시작하세요](00_START_HERE.md) |
| **연계(하위 문서)** | [비즈니스 목표](02_BUSINESS_GOALS.md), [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 회사 개요

Goldwiki Digital(골드위키 디지털)은 **엔터프라이즈 디지털 프로덕트 컨설팅 회사**이다. 공공·금융·대기업 고객을 대상으로 RFP 분석에서 제안, UX/UI 전략과 디자인 시스템, HTML 프로토타이핑과 풀스택 구현, 그리고 QA까지 디지털 프로덕트의 전 생애주기를 단일 팀으로 제공한다.

차별점은 운영 모델에 있다. 회사는 **AI 증강(AI-augmented) 멀티 에이전트** 방식으로 동작하며, 22개의 전문 AI 서브에이전트가 실무를 수행하고 **골드위키(Gold Wiki)** 가 단일 진실 공급원(SSOT)으로 모든 지식을 통제한다. 이는 속도(빠른 사이클타임), 일관성(표준 준수), 추적성(의사결정 기록)을 동시에 달성한다.

---

## 2. 미션 · 비전 · 가치

### 미션
"엔터프라이즈 고객이 더 빠르고 더 정확하게 탁월한 디지털 프로덕트를 출시하도록, AI 증강 방법론으로 RFP부터 운영까지 전 과정을 통합 제공한다."

### 비전
"디지털 프로덕트 컨설팅의 표준을 재정의하는, 지식 기반 AI 증강 컨설팅의 선도 기업이 된다."

### 핵심 가치(Values)
| 가치 | 의미 | 실천 방식 |
| --- | --- | --- |
| **단일 진실(Single Source of Truth)** | 지식은 한 곳에 모은다. | 골드위키 우선 참조 원칙 준수. |
| **증거 기반(Evidence-Based)** | 추측이 아닌 데이터·표준으로 결정한다. | [의사결정 로그](32_DECISION_LOG.md) 기록. |
| **재사용(Reusability)** | 한 번 만든 자산은 계속 활용한다. | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) 운영. |
| **추적성(Traceability)** | 모든 산출물은 출처로 거슬러 갈 수 있다. | 추적성 매트릭스([06](06_BUSINESS_ANALYSIS.md)). |
| **고객 가치(Client Value)** | 산출물이 아니라 성과를 판다. | 가치제안 중심 제안([05](05_PROPOSAL_STRATEGY.md)). |
| **지속 학습(Continuous Learning)** | 매 프로젝트에서 배우고 환류한다. | [프로젝트 메모리](35_PROJECT_MEMORY.md). |

---

## 3. 서비스 라인

| 서비스 라인 | 범위 | 주 산출물 | 주 담당 에이전트 | 관련 문서 |
| --- | --- | --- | --- | --- |
| **RFP 분석 & 제안 전략** | RFP 독해, 요구사항 분석, 윈 전략, 제안서 작성 | 제안서, 컴플라이언스 매트릭스 | Proposal Strategist, Sales Director, Business Analyst | [03](03_RFP_FRAMEWORK.md), [04](04_RFP_ANALYSIS.md), [05](05_PROPOSAL_STRATEGY.md) |
| **UX/UI 전략** | 리서치, IA, 플로우, 여정, 화면 설계 | 페르소나, IA, 와이어프레임 | UX Researcher, UI Designer, Service Planner | [07](07_UX_PRINCIPLES.md), [11](11_INFORMATION_ARCHITECTURE.md), [13](13_USER_JOURNEY.md) |
| **디자인 시스템** | 토큰, 컴포넌트, 가이드라인, 접근성 | 디자인 시스템, 컴포넌트 라이브러리 | BX/UI/Interaction/Accessibility | [09](09_DESIGN_SYSTEM.md), [14](14_COMPONENT_LIBRARY.md), [15](15_DESIGN_TOKEN.md) |
| **프로토타이핑 & 풀스택 개발** | HTML 프로토타입, 프런트·백엔드, API, DB | 동작 프로토타입, 소스 코드 | Publishing/Frontend/Backend/API/DB | [17](17_HTML_GUIDE.md), [20](20_FRONTEND_GUIDE.md), [21](21_BACKEND_GUIDE.md), [22](22_API_STANDARD.md) |
| **QA** | 테스트 전략, 자동화, 결함 관리, 릴리스 | 테스트 결과, 릴리스 노트 | QA Engineer, DevOps Engineer | [29](29_QUALITY_CHECKLIST.md), [30](30_TEST_STRATEGY.md), [31](31_RELEASE_PROCESS.md) |

---

## 4. 타겟 시장

| 세그먼트 | 특성 | 핵심 니즈 |
| --- | --- | --- |
| **공공부문(Public Sector)** | 조달 규정 엄격, 접근성·보안 필수 | 컴플라이언스, WCAG, 정보보안 |
| **금융(Financial Services)** | 규제 준수, 신뢰성, 보안 최우선 | 안정성, 감사 추적, 보안 인증 |
| **대기업(Enterprise)** | 복잡한 이해관계자, 레거시 통합 | 통합, 확장성, 변화 관리 |
| **성장 기업(Scale-up)** | 빠른 출시, 비용 효율 | 속도, 재사용, 디자인 시스템 |

---

## 5. 차별점 (Why Goldwiki Digital)

1. **AI 증강 처리량.** 22개 전문 에이전트가 병렬로 작업하여 제안 사이클타임과 디자인 처리량을 획기적으로 단축한다.
2. **단일 진실 공급원.** 모든 표준·결정이 골드위키에 집중되어 산출물 품질의 변동성이 낮다.
3. **풀 스펙트럼 단일 팀.** RFP에서 운영까지 하나의 통합 파이프라인([03](03_RFP_FRAMEWORK.md))으로 인계 누락을 제거한다.
4. **추적 가능한 품질.** 게이트 기반 품질 통제([29](29_QUALITY_CHECKLIST.md))로 결함 유출을 억제한다.
5. **누적 학습 자산.** 매 프로젝트가 [베스트 프랙티스](37_BEST_PRACTICES.md)와 [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md)를 강화한다.

---

## 6. AI 증강 운영 모델

```
            ┌──────────────────────────────┐
            │   골드위키 (단일 진실 공급원)   │
            │   표준·결정·템플릿·기억         │
            └──────────────┬───────────────┘
                  읽기 ↑  ↓ 갱신
   ┌───────────┬───────────┼───────────┬───────────┐
 영업/제안   비즈니스 분석   디자인    엔지니어링    QA/운영
 에이전트군    에이전트군    에이전트군   에이전트군   에이전트군
```

운영 원칙:
- **골드위키 우선(GoldWiki-First).** 모든 에이전트는 작업 전 관련 문서를 읽는다.
- **단방향 권위.** 표준은 골드위키에만 존재한다. 산출물은 표준을 인용한다.
- **자동 환류.** 결정·학습은 거버넌스 푸터의 4개 문서로 환류된다.
- **오케스트레이션.** 에이전트 간 인계는 [자동화 워크플로](27_AUTOMATION_WORKFLOW.md)와 [서브에이전트 규칙](28_SUBAGENT_RULES.md)을 따른다.

---

## 7. 22개 AI 에이전트 조직도

```
CEO
├── Project Director (프로젝트 총괄)
│   ├── Sales Director ── Proposal Strategist
│   ├── Business Analyst ── Product Owner ── Service Planner
│   ├── [디자인 본부]
│   │   ├── UX Researcher
│   │   ├── UI Designer
│   │   ├── BX Designer
│   │   ├── Interaction Designer
│   │   └── Accessibility Specialist
│   ├── [엔지니어링 본부]
│   │   ├── Publishing Engineer
│   │   ├── Frontend Engineer
│   │   ├── Backend Engineer
│   │   ├── API Engineer
│   │   ├── Database Architect
│   │   └── Security Engineer
│   ├── [지능·품질 본부]
│   │   ├── AI Engineer
│   │   ├── QA Engineer
│   │   └── DevOps Engineer
│   └── Documentation Specialist (골드위키 관리)
```

각 에이전트의 책임·입출력·협업 규칙은 `/home/user/goldwiki/.claude/agents/`의 정의 파일과 [서브에이전트 규칙](28_SUBAGENT_RULES.md)에 명시된다.

---

## 8. 계약 · 수행 모델

| 모델 | 설명 | 적합 상황 |
| --- | --- | --- |
| **고정가(Fixed-Price)** | 범위·일정·금액 확정 | 명확한 RFP, 공공 조달 |
| **시간·자재(T&M)** | 투입 공수 기반 정산 | 범위 불확실, 탐색적 과제 |
| **마일스톤 기반** | 단계 게이트별 정산 | 장기 풀스택 프로젝트 |
| **리테이너(Retainer)** | 월 단위 지속 지원 | 디자인 시스템·운영 유지 |

공수 산정 접근법은 [제안 전략](05_PROPOSAL_STRATEGY.md)을, 단계 게이트는 [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md)를 따른다.

---

## 9. 의사결정 방식

- **권한 위임.** 일상적 실무 결정은 담당 에이전트가 자율 수행한다.
- **에스컬레이션.** 범위·예산·리스크 영향이 큰 결정은 Project Director를 거쳐 CEO로 에스컬레이션한다.
- **기록 의무.** 모든 중대한 결정은 [의사결정 로그](32_DECISION_LOG.md)에 ADR 형식(맥락·대안·결정·결과)으로 남긴다.
- **합의 기준.** 표준 변경은 관련 본부 에이전트의 검토를 거쳐 Documentation Specialist가 골드위키에 반영한다.

---

## 관련 골드위키 문서
- [여기서 시작하세요](00_START_HERE.md) — 전체 워크스페이스 인덱스.
- [비즈니스 목표](02_BUSINESS_GOALS.md) — 회사 전략 목표와 지표.
- [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) — 수행 파이프라인.
- [서브에이전트 규칙](28_SUBAGENT_RULES.md) — 에이전트 운영 규칙.
- [자동화 워크플로](27_AUTOMATION_WORKFLOW.md) — 에이전트 오케스트레이션.
- [베스트 프랙티스](37_BEST_PRACTICES.md) — 검증된 모범 사례.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
