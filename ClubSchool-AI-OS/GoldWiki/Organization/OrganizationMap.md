# 조직 지도 (Organization Map)

> Goldwiki Digital(ClubSchool AI OS)의 24개 활성 AI 에이전트와 이를 둘러싼 80명 전문 역할의 조직도·계층·보고선을 정의한다. 사람(80 역할)과 AI(24 에이전트)가 동일 구조 위에서 협업한다.

## 목적

조직의 책임 구조를 단일 그림으로 제시하여, 누가 무엇을 결정하고 누구에게 보고하며 어떤 에이전트가 어떤 역할군을 대표하는지 명확히 한다. 24개 활성 서브에이전트(실행 주체)와 80명 역할(전문 직능)의 매핑·계층·보고선·에스컬레이션 경로를 정의한다. 협업·인계의 세부 규칙은 [에이전트 운영 규칙](AgentOperatingRules.md)을 따른다.

## 언제 사용하는가

- 어떤 작업을 어떤 에이전트/역할에 할당할지 결정할 때
- 의사결정 권한과 에스컬레이션 경로를 확인할 때
- 본부 간 협업·인계 라인을 식별할 때
- 신규 역할·에이전트를 조직에 편입할 때
- 클라이언트에게 수행 조직 구조를 제시할 때

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 24개 활성 에이전트 정의 | `../../.claude/agents/` |
| 회사 컨텍스트·조직 개요 | [번호형 01](../../GoldWiki/01_COMPANY_CONTEXT.md) |
| 운영 규칙 | [에이전트 운영 규칙](AgentOperatingRules.md) |
| RACI·협업 맵 | `../../Agents/RACI.md`, `../../Agents/COLLABORATION_MAP.md` |

## 처리 방식

### 거버넌스 계층 (4계층)

1. **경영(Executive)** — 전략·최종 승인·거버넌스
2. **운영·검토(Operations & Review)** — 운영 총괄·기술 검토·PMO
3. **본부 리드(Domain Leads)** — 각 직능 본부의 책임 에이전트
4. **전문 역할(Specialist Roles)** — 본부 산하 80명 전문 직능

### 전체 조직도

```mermaid
graph TD
  ED[executive-director<br/>총괄·전략·최종승인]
  COO[coo-operator<br/>운영총괄]
  CTO[cto-reviewer<br/>기술검토]
  PMO[pmo-director<br/>PMO·일정·리스크]

  ED --> COO
  ED --> CTO
  COO --> PMO

  subgraph 비즈니스본부
    RFP[rfp-strategy-lead]
    PROP[proposal-lead]
    BA[business-analysis-lead]
    IND[industry-research-lead]
    PROD[product-strategy-lead]
    SVC[service-planning-lead]
  end

  subgraph 디자인본부
    UXR[ux-research-lead]
    IA[information-architecture-lead]
    UI[ui-design-lead]
    DS[design-system-lead]
    BX[bx-design-lead]
    PUB[publishing-lead]
  end

  subgraph 엔지니어링본부
    FE[frontend-lead]
    BE[backend-lead]
    AIA[ai-automation-lead]
    DAT[data-analytics-lead]
  end

  subgraph 품질·지식본부
    QA[qa-lead]
    SEC[security-risk-lead]
    DOC[documentation-lead]
    SIM[client-simulation-lead]
  end

  COO --> RFP & PROP & BA & IND & PROD & SVC
  COO --> UXR & IA & UI & DS & BX & PUB
  CTO --> FE & BE & AIA & DAT
  CTO --> QA & SEC
  PMO --> DOC
  ED --> SIM
```

### 24개 활성 에이전트 · 계층 · 보고선

| # | 에이전트 | 계층 | 보고선(상위) | 대표 역할군 |
| --- | --- | --- | --- | --- |
| 1 | executive-director | 경영 | — | 경영진 |
| 2 | coo-operator | 운영 | executive-director | 운영 총괄 |
| 3 | cto-reviewer | 운영 | executive-director | 기술 검토 |
| 4 | pmo-director | 운영 | coo-operator | PMO |
| 5 | rfp-strategy-lead | 본부 리드 | coo-operator | RFP 전략 |
| 6 | proposal-lead | 본부 리드 | coo-operator | 제안 |
| 7 | business-analysis-lead | 본부 리드 | coo-operator | 비즈니스 분석 |
| 8 | industry-research-lead | 본부 리드 | coo-operator | 업종 리서치 |
| 9 | product-strategy-lead | 본부 리드 | coo-operator | 프로덕트 전략 |
| 10 | service-planning-lead | 본부 리드 | coo-operator | 서비스 기획 |
| 11 | ux-research-lead | 본부 리드 | coo-operator | UX 리서치 |
| 12 | information-architecture-lead | 본부 리드 | coo-operator | IA |
| 13 | ui-design-lead | 본부 리드 | coo-operator | UI |
| 14 | design-system-lead | 본부 리드 | coo-operator | 디자인 시스템 |
| 15 | bx-design-lead | 본부 리드 | coo-operator | 브랜드 경험 |
| 16 | publishing-lead | 본부 리드 | coo-operator | 퍼블리싱 |
| 17 | frontend-lead | 본부 리드 | cto-reviewer | 프론트엔드 |
| 18 | backend-lead | 본부 리드 | cto-reviewer | 백엔드 |
| 19 | ai-automation-lead | 본부 리드 | cto-reviewer | AI 자동화 |
| 20 | data-analytics-lead | 본부 리드 | cto-reviewer | 데이터 분석 |
| 21 | qa-lead | 본부 리드 | cto-reviewer | QA |
| 22 | security-risk-lead | 본부 리드 | cto-reviewer | 보안·리스크 |
| 23 | documentation-lead | 본부 리드 | pmo-director | 문서·골드위키 |
| 24 | client-simulation-lead | 본부 리드 | executive-director | 고객·평가·경쟁 시뮬레이션 |

### 80명 역할 매핑 (본부별 전문 직능)

각 본부 리드 에이전트는 다수의 전문 역할을 대표한다. 사람용 역할 카탈로그는 `../../Agents/`에 있으며, 본 표는 총량(80) 분포를 보인다.

| 본부 | 대표 리드 | 소속 전문 역할(예) | 역할 수 |
| --- | --- | --- | --- |
| 경영·운영 | executive-director, coo-operator, cto-reviewer, pmo-director | 전략기획, 운영관리, 기술아키텍트, PMO매니저, 리스크매니저, 재무 | 8 |
| 비즈니스 | rfp-strategy-lead, proposal-lead, business-analysis-lead, industry-research-lead, product-strategy-lead, service-planning-lead | RFP분석가, 제안PM, 카피라이터, BA, 도메인리서처, PO, 서비스기획자, 가격전략가 | 16 |
| 디자인 | ux-research-lead, information-architecture-lead, ui-design-lead, design-system-lead, bx-design-lead | UX리서처, 사용성평가, IA, 인터랙션, UI디자이너, 비주얼, 토큰엔지니어, 브랜드, 모션 | 18 |
| 퍼블리싱·프론트 | publishing-lead, frontend-lead | 퍼블리셔, 마크업, 접근성, FE개발, 상태관리, 성능 | 12 |
| 백엔드·데이터·AI | backend-lead, ai-automation-lead, data-analytics-lead | BE개발, API, DBA, DevOps, AI엔지니어, MLOps, 데이터분석, BI | 14 |
| 품질·보안·지식 | qa-lead, security-risk-lead, documentation-lead, client-simulation-lead | QA, 테스트자동화, 보안엔지니어, 컴플라이언스, 테크라이터, 평가위원시뮬, 경쟁사시뮬 | 12 |
| **합계** | **24 에이전트** | — | **80** |

### 보고·승인 흐름
- 일상 실무 결정: 본부 리드 자율.
- 범위·예산·리스크 영향 결정: 리드 → COO/CTO → executive-director.
- 표준 변경: 관련 리드 검토 → documentation-lead가 골드위키 반영.

## 출력 산출물

- 작업별 담당 에이전트·역할 배정
- 에스컬레이션 경로 식별
- 클라이언트 제시용 수행 조직도

## 품질 기준

| 기준 | 충족 조건 |
| --- | --- |
| 완전성 | 24 에이전트·80 역할이 모두 매핑된다 |
| 명확성 | 모든 노드의 보고선이 단일하게 정의된다 |
| 정합성 | `.claude/agents/` 정의와 일치한다 |
| 추적성 | 역할↔에이전트 매핑이 RACI와 일치한다 |

## 체크리스트

- [ ] 작업에 맞는 본부·리드를 식별했는가
- [ ] 결정 권한과 에스컬레이션 경로를 확인했는가
- [ ] 역할↔에이전트 매핑이 RACI와 일치하는가
- [ ] 신규 역할 편입 시 보고선을 단일하게 지정했는가
- [ ] 조직도 변경을 DecisionLog에 기록했는가

## 예시 프롬프트

```
당신은 coo-operator 에이전트다. 신규 금융 RFP가 접수되었다. OrganizationMap을
참조하여 (1) 분석~제안 단계에 투입할 본부 리드를 지정하고, (2) 각 리드가
대표하는 전문 역할을 RACI와 대조해 책임(R)/승인(A)을 배정하라. 보안·접근성
민감도가 높으므로 security-risk-lead의 에스컬레이션 경로를 명시하라.
```

---

## 관련 골드위키 문서
- [에이전트 운영 규칙](AgentOperatingRules.md) — 협업·인계·에스컬레이션
- [번호형 01 · 회사 컨텍스트](../../GoldWiki/01_COMPANY_CONTEXT.md)
- [번호형 28 · 서브에이전트 규칙](../../GoldWiki/28_SUBAGENT_RULES.md)
- [운영 원칙](../Foundation/OperatingPrinciples.md)
- `../../Agents/RACI.md`, `../../Agents/ORG_CHART.md`, `../../Agents/COLLABORATION_MAP.md`

> **거버넌스:** 본 문서의 모든 의사결정은 [의사결정 로그](../Foundation/DecisionLog.md), [프로젝트 메모리](../Foundation/ProjectMemory.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.
