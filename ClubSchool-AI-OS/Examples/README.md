# Examples — 워크스루 예시: 전국 청소년 동아리 통합 플랫폼

> ⚠️ **본 예시는 전부 가상(fictional)이다.** 발주처 "한국청소년활동진흥원", 사업명, 예산, 경쟁사, 인용 통계는 ClubSchool AI OS의 산출물 형식을 보여주기 위해 작성된 것이며, 실제 기관·사업·입찰과 무관하다.

이 디렉터리는 ClubSchool AI OS v1.0의 **21단계 RFP→납품 파이프라인**([../GoldWiki/27_AUTOMATION_WORKFLOW.md](../GoldWiki/27_AUTOMATION_WORKFLOW.md))이 하나의 시나리오를 끝까지 관통했을 때 실제로 어떤 산출물이 나오는지를 보여주는 **완성 모범 예시**다. 빈 템플릿이 아니라 실제 내용으로 채워져 있다. 템플릿(빈 양식)을 찾는다면 [../Templates/](../Templates/)를 참고한다.

---

## 1. 시나리오 개요

| 항목 | 내용(가상) |
| --- | --- |
| 발주처 | 한국청소년활동진흥원(가상) |
| 사업명 | 전국 청소년 동아리(ClubSchool) 통합 플랫폼 구축 사업 |
| 사업 목적 | 전국 시·도 단위로 흩어진 청소년 동아리 모집·활동·실적 관리 시스템을 하나의 플랫폼으로 통합 |
| 추정 예산 | 24억 원(부가세 포함) |
| 사업 기간 | 11개월(설계 3개월 + 구축 6개월 + 안정화/이관 2개월) |
| 평가 배점 | 기술 80 / 가격 20 |
| 주 사용자 | 청소년 회원(만 9~24세), 동아리 지도교사, 기관 담당자, 학부모 |
| 대응 주체 | ClubSchool 디지털(자사, AI 증강 컨설팅 조직) |

**한 줄 미션:** "전국 어디서나, 어떤 기기에서나, 장애 여부와 무관하게 청소년이 3분 안에 동아리를 찾아 가입하고, 지도교사가 클릭 몇 번으로 활동 실적을 증빙할 수 있는 단일 플랫폼"을 제안·설계한다.

---

## 2. 산출물 인덱스 — 파이프라인 단계 매핑

각 파일이 21단계 파이프라인의 어느 단계 산출물인지, 어떤 에이전트가 만들고, 어느 GoldWiki 정본을 참조했는지 매핑한다.

| 파일 | 파이프라인 단계 | 담당 에이전트 | 정본 GoldWiki |
| --- | --- | --- | --- |
| [01_RFP_Analysis.md](01_RFP_Analysis.md) | 1~9 (읽기·분석·요약·요구추출·평가기준·숨은기대·리스크·경쟁사/글로벌 벤치마크) | Business Analyst, Proposal Strategist | [04_RFP_ANALYSIS](../GoldWiki/04_RFP_ANALYSIS.md), [03_RFP_FRAMEWORK](../GoldWiki/03_RFP_FRAMEWORK.md) |
| [02_Proposal_Executive_Summary.md](02_Proposal_Executive_Summary.md) | 10 (제안 전략) + 21 일부(경영 요약) | Proposal Strategist, Sales Director | [05_PROPOSAL_STRATEGY](../GoldWiki/05_PROPOSAL_STRATEGY.md) |
| [03_WBS.md](03_WBS.md) | 11 (WBS) | Project Director | [02_BUSINESS_GOALS](../GoldWiki/02_BUSINESS_GOALS.md), [35_PROJECT_MEMORY](../GoldWiki/35_PROJECT_MEMORY.md) |
| [04_IA_and_User_Flow.md](04_IA_and_User_Flow.md) | 12~13 (IA·유저 플로우) | UX Researcher, Interaction Designer | [11_INFORMATION_ARCHITECTURE](../GoldWiki/11_INFORMATION_ARCHITECTURE.md), [12_USER_FLOW](../GoldWiki/12_USER_FLOW.md) |
| [05_Screen_List.md](05_Screen_List.md) | 14 (화면 목록) | Service Planner, UI Designer | [05_Screen_List 참조: 08_UI_GUIDELINES](../GoldWiki/08_UI_GUIDELINES.md) |
| [06_Design_Concept.md](06_Design_Concept.md) | 16~17 (UI 컨셉·디자인 시스템) | UI Designer, BX Designer | [09_DESIGN_SYSTEM](../GoldWiki/09_DESIGN_SYSTEM.md), [15_DESIGN_TOKEN](../GoldWiki/15_DESIGN_TOKEN.md) |
| [07_Prototype_Plan.md](07_Prototype_Plan.md) | 18 (HTML 프로토타입 계획) | Publishing Engineer, Frontend Engineer | [17_HTML_GUIDE](../GoldWiki/17_HTML_GUIDE.md), [20_FRONTEND_GUIDE](../GoldWiki/20_FRONTEND_GUIDE.md) |
| [08_QA_Plan.md](08_QA_Plan.md) | 20 (QA 계획) | QA Engineer, Security Engineer | [30_TEST_STRATEGY](../GoldWiki/30_TEST_STRATEGY.md), [29_QUALITY_CHECKLIST](../GoldWiki/29_QUALITY_CHECKLIST.md) |

> 단계 15(UX 전략)·19(개발 계획)는 본 예시 묶음에서 별도 파일로 분리하지 않고, UX 전략은 [04_IA_and_User_Flow.md](04_IA_and_User_Flow.md)와 [06_Design_Concept.md](06_Design_Concept.md)에, 개발 계획 요점은 [03_WBS.md](03_WBS.md)와 [08_QA_Plan.md](08_QA_Plan.md)에 통합 반영되어 있다.

---

## 3. 읽는 순서(권장)

1. **01** RFP 분석으로 "무엇을, 왜, 어떻게 채점되는가"를 먼저 잡는다.
2. **02** 경영 요약으로 윈 전략과 핵심 메시지를 본다.
3. **03** WBS로 일정·공수의 현실성을 확인한다.
4. **04 → 05 → 06**으로 IA·화면·디자인이 어떻게 구체화되는지 따라간다.
5. **07 → 08**로 구현·검증 계획을 확인한다.

각 문서는 게이트(A: 전략 / B: 디자인 / C: 품질)를 통과한 상태의 산출물로 간주한다([../GoldWiki/27_AUTOMATION_WORKFLOW.md](../GoldWiki/27_AUTOMATION_WORKFLOW.md) §4).

---

## 4. 거버넌스 메모

본 예시에서 도출된 주요 결정(예: MVP 범위, 디자인 토큰 채택, 성능 목표)은 정상 운영 시 [의사결정 로그](../GoldWiki/32_DECISION_LOG.md)·[프로젝트 메모리](../GoldWiki/35_PROJECT_MEMORY.md)·[베스트 프랙티스](../GoldWiki/37_BEST_PRACTICES.md)·[레퍼런스 라이브러리](../GoldWiki/36_REFERENCE_LIBRARY.md)에 동시 기록된다. 예시 문서 각각의 말미에 해당 거버넌스 갱신 항목을 표기했다.
