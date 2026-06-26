---
name: rfp-to-delivery
description: RFP 수령부터 경영 요약·클라이언트 납품까지 21단계 자율 파이프라인. 정본은 GoldWiki 27이며, 각 단계의 트리거·담당 에이전트·입력·산출 아티팩트·읽고/갱신하는 GoldWiki 문서·게이트·다음 단계를 기계가 따라 실행할 수 있도록 정의한다.
---

# 워크플로우: rfp-to-delivery

> 정본 출처: [GoldWiki 27 자동화 워크플로우](../../GoldWiki/27_AUTOMATION_WORKFLOW.md)
> 오케스트레이터: Project Director · 거버넌스: [GoldWiki 28 서브에이전트 규칙](../../GoldWiki/28_SUBAGENT_RULES.md)

## 실행 규약

1. 모든 단계는 작업 시작 전 `읽는 문서` 컬럼의 GoldWiki를 먼저 참조한다(중복 지식 생성 금지).
2. 각 단계는 `산출 아티팩트`를 다음 단계의 입력으로 구조화하여 생성한다.
3. 각 단계 종료 시 `갱신 문서` 컬럼의 GoldWiki를 갱신한다.
4. 게이트(A/B/C/최종)는 승인 없이 통과 불가하며, 미통과 시 `롤백 대상` 단계로 회귀한다.
5. 사소하지 않은 모든 결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md)·[프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md)를 갱신한다.

## 변수

| 변수 | 의미 |
| --- | --- |
| `$RFP_PATH` | 원본 RFP 문서 경로(PDF/문서) |
| `$PROJECT_ID` | 프로젝트 식별자(프로젝트 메모리 키) |
| `$WORKDIR` | 산출 아티팩트 저장 작업 디렉터리 |

## 단계 정의

### S01 · RFP 읽기

| 항목 | 값 |
| --- | --- |
| ID | `S01` |
| 트리거 | 신규 RFP 수령(`$RFP_PATH` 설정) |
| 담당 에이전트 | Business Analyst |
| 입력 | 원본 RFP, 클라이언트 배경 |
| 산출 아티팩트 | `$WORKDIR/01-rfp-normalized.md`(정규화 텍스트 + 메타데이터: 발주처·예산·기한) |
| 읽는 문서 | [03](../../GoldWiki/03_RFP_FRAMEWORK.md), [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md) |
| 갱신 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md), [35](../../GoldWiki/35_PROJECT_MEMORY.md) |
| 게이트 | 없음 |
| 다음 단계 | S02 |

### S02 · 분석

| 항목 | 값 |
| --- | --- |
| ID | `S02` |
| 트리거 | `01-rfp-normalized.md` 확보 |
| 담당 에이전트 | Business Analyst, Proposal Strategist |
| 입력 | 정규화 RFP |
| 산출 아티팩트 | `$WORKDIR/02-structural-analysis.md`(범위·목표·제약·이해관계자) |
| 읽는 문서 | [03](../../GoldWiki/03_RFP_FRAMEWORK.md), [06](../../GoldWiki/06_BUSINESS_ANALYSIS.md) |
| 갱신 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md) |
| 게이트 | 없음 |
| 다음 단계 | S03 |

### S03 · 요약

| 항목 | 값 |
| --- | --- |
| ID | `S03` |
| 트리거 | 구조 분석 완료 |
| 담당 에이전트 | Business Analyst |
| 입력 | 구조 분석 |
| 산출 아티팩트 | `$WORKDIR/03-one-page-summary.md`(목적·범위·기대효과 1페이지) |
| 읽는 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md) |
| 갱신 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md), [35](../../GoldWiki/35_PROJECT_MEMORY.md) |
| 게이트 | 없음 |
| 다음 단계 | S04 |

### S04 · 요구사항 추출

| 항목 | 값 |
| --- | --- |
| ID | `S04` |
| 트리거 | 요약 확정 |
| 담당 에이전트 | Business Analyst, Product Owner |
| 입력 | 분석·요약 |
| 산출 아티팩트 | `$WORKDIR/04-requirements.json`(ID·기능/비기능·우선순위·출처) |
| 읽는 문서 | [03](../../GoldWiki/03_RFP_FRAMEWORK.md), [06](../../GoldWiki/06_BUSINESS_ANALYSIS.md) |
| 갱신 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md) |
| 게이트 | 없음 |
| 다음 단계 | S05 |

산출 형식:

```json
{"id":"R-012","type":"기능","text":"SSO 로그인 지원","priority":"필수","source":"RFP §3.2"}
```

### S05 · 평가기준 도출

| 항목 | 값 |
| --- | --- |
| ID | `S05` |
| 트리거 | 요구사항 확보 |
| 담당 에이전트 | Proposal Strategist |
| 입력 | RFP 평가 항목, 요구사항 |
| 산출 아티팩트 | `$WORKDIR/05-eval-matrix.md`(평가기준·배점·우리 강점 매핑) |
| 읽는 문서 | [03](../../GoldWiki/03_RFP_FRAMEWORK.md), [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md) |
| 갱신 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md), [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md) |
| 게이트 | 없음 |
| 다음 단계 | S06 |

### S06 · 숨은기대 식별

| 항목 | 값 |
| --- | --- |
| ID | `S06` |
| 트리거 | 평가기준 확보 |
| 담당 에이전트 | Proposal Strategist, Business Analyst |
| 입력 | RFP 전문, 클라이언트 지식 |
| 산출 아티팩트 | `$WORKDIR/06-latent-expectations.md`(명시되지 않은 기대·동기·정치적 맥락) |
| 읽는 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md), [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md) |
| 갱신 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md) |
| 게이트 | 없음 |
| 다음 단계 | S07 |
| 비고 | CoT 추론 권장([26](../../GoldWiki/26_PROMPT_ENGINEERING.md)) |

### S07 · 리스크 분석

| 항목 | 값 |
| --- | --- |
| ID | `S07` |
| 트리거 | 숨은기대 확보 |
| 담당 에이전트 | Project Director, Business Analyst |
| 입력 | 요구사항·기대·제약 |
| 산출 아티팩트 | `$WORKDIR/07-risk-register.md`(발생가능성·영향·대응) |
| 읽는 문서 | [06](../../GoldWiki/06_BUSINESS_ANALYSIS.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 갱신 문서 | [35](../../GoldWiki/35_PROJECT_MEMORY.md), [39](../../GoldWiki/39_COMMON_ERRORS.md) |
| 게이트 | 없음 |
| 다음 단계 | S08, S09 (병렬 분기) |

### S08 · 경쟁사 벤치마크

| 항목 | 값 |
| --- | --- |
| ID | `S08` |
| 트리거 | 리스크 분석 완료 |
| 담당 에이전트 | Business Analyst, Service Planner |
| 입력 | 도메인·경쟁 환경 |
| 산출 아티팩트 | `$WORKDIR/08-competitor-benchmark.md`(비교표·차별화 포인트) |
| 읽는 문서 | [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md), [36](../../GoldWiki/36_REFERENCE_LIBRARY.md) |
| 갱신 문서 | [36](../../GoldWiki/36_REFERENCE_LIBRARY.md) |
| 게이트 | 없음 |
| 다음 단계 | S10 |

### S09 · 글로벌 베스트프랙티스 벤치마크

| 항목 | 값 |
| --- | --- |
| ID | `S09` |
| 트리거 | 리스크 분석 완료(S08과 병렬) |
| 담당 에이전트 | Service Planner, UX Researcher |
| 입력 | 도메인, 글로벌 표준 |
| 산출 아티팩트 | `$WORKDIR/09-global-benchmark.md`(우수 사례·표준: WCAG·업계 패턴) |
| 읽는 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md), [16](../../GoldWiki/16_ACCESSIBILITY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 갱신 문서 | [36](../../GoldWiki/36_REFERENCE_LIBRARY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 게이트 | 없음 |
| 다음 단계 | S10 |

### S10 · 제안 전략

| 항목 | 값 |
| --- | --- |
| ID | `S10` |
| 트리거 | 벤치마크 2종(S08·S09) 취합 |
| 담당 에이전트 | Proposal Strategist, Sales Director |
| 입력 | 평가기준·숨은기대·벤치마크 |
| 산출 아티팩트 | `$WORKDIR/10-win-strategy.md`(수주 전략·핵심 메시지·win theme) |
| 읽는 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [02](../../GoldWiki/02_BUSINESS_GOALS.md) |
| 갱신 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [32](../../GoldWiki/32_DECISION_LOG.md) |
| 게이트 | **게이트 A** |
| 다음 단계 | (게이트 A 통과 시) S11 |

> **게이트 A — 전략 승인.** 승인자: Sales Director + Project Director. 통과 조건: 전략 정합성·수주 가능성. 근거: [25 휴먼인더루프](../../GoldWiki/25_AI_GUIDE.md), [29](../../GoldWiki/29_QUALITY_CHECKLIST.md). 롤백 대상: S05~S10. 롤백 사유는 [39](../../GoldWiki/39_COMMON_ERRORS.md)에 기록.

### S11 · WBS(작업분해구조)

| 항목 | 값 |
| --- | --- |
| ID | `S11` |
| 트리거 | 게이트 A 통과 |
| 담당 에이전트 | Project Director |
| 입력 | 제안 전략, 범위 |
| 산출 아티팩트 | `$WORKDIR/11-wbs.md`(WBS·일정·담당 매핑) |
| 읽는 문서 | [02](../../GoldWiki/02_BUSINESS_GOALS.md), [35](../../GoldWiki/35_PROJECT_MEMORY.md) |
| 갱신 문서 | [35](../../GoldWiki/35_PROJECT_MEMORY.md) |
| 게이트 | 없음 |
| 다음 단계 | S12 |

### S12 · 정보구조(IA)

| 항목 | 값 |
| --- | --- |
| ID | `S12` |
| 트리거 | WBS 확정 |
| 담당 에이전트 | UX Researcher, Service Planner |
| 입력 | 요구사항, 사용자 정의 |
| 산출 아티팩트 | `$WORKDIR/12-ia-sitemap.md`(사이트맵·콘텐츠 구조) |
| 읽는 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md), [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md) |
| 갱신 문서 | [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md) |
| 게이트 | 없음 |
| 다음 단계 | S13 |

### S13 · 유저 플로우

| 항목 | 값 |
| --- | --- |
| ID | `S13` |
| 트리거 | IA 확정 |
| 담당 에이전트 | UX Researcher, Interaction Designer |
| 입력 | IA, 핵심 과업 |
| 산출 아티팩트 | `$WORKDIR/13-user-flows.md`(주요 사용자 플로우 다이어그램) |
| 읽는 문서 | [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md), [12](../../GoldWiki/12_USER_FLOW.md), [13](../../GoldWiki/13_USER_JOURNEY.md) |
| 갱신 문서 | [12](../../GoldWiki/12_USER_FLOW.md) |
| 게이트 | 없음 |
| 다음 단계 | S14 |

### S14 · 화면 목록

| 항목 | 값 |
| --- | --- |
| ID | `S14` |
| 트리거 | 플로우 확정 |
| 담당 에이전트 | Service Planner, UI Designer |
| 입력 | 플로우, IA |
| 산출 아티팩트 | `$WORKDIR/14-screen-list.md`(화면 정의서: 화면 ID·명칭·목적·요소) |
| 읽는 문서 | [12](../../GoldWiki/12_USER_FLOW.md), [08](../../GoldWiki/08_UI_GUIDELINES.md) |
| 갱신 문서 | [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md) |
| 게이트 | 없음 |
| 다음 단계 | S15 |

### S15 · UX 전략

| 항목 | 값 |
| --- | --- |
| ID | `S15` |
| 트리거 | 화면 목록 확정 |
| 담당 에이전트 | UX Researcher |
| 입력 | 화면 목록, 사용자 여정 |
| 산출 아티팩트 | `$WORKDIR/15-ux-strategy.md`(UX 원칙·핵심 경험 정의) |
| 읽는 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md), [13](../../GoldWiki/13_USER_JOURNEY.md) |
| 갱신 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md) |
| 게이트 | 없음 |
| 다음 단계 | S16 |

### S16 · UI 컨셉

| 항목 | 값 |
| --- | --- |
| ID | `S16` |
| 트리거 | UX 전략 확정 |
| 담당 에이전트 | UI Designer, BX Designer |
| 입력 | UX 전략, 브랜드 |
| 산출 아티팩트 | `$WORKDIR/16-ui-concept.md`(비주얼 컨셉·무드·키 스크린 시안) |
| 읽는 문서 | [08](../../GoldWiki/08_UI_GUIDELINES.md), [10](../../GoldWiki/10_FIGMA_GUIDE.md) |
| 갱신 문서 | [08](../../GoldWiki/08_UI_GUIDELINES.md) |
| 게이트 | 없음 |
| 다음 단계 | S17 |

### S17 · 디자인 시스템

| 항목 | 값 |
| --- | --- |
| ID | `S17` |
| 트리거 | UI 컨셉 확정 |
| 담당 에이전트 | UI Designer, Interaction Designer, Accessibility Specialist |
| 입력 | UI 컨셉, 디자인 토큰 |
| 산출 아티팩트 | `$WORKDIR/17-design-system.md`(컴포넌트·토큰·패턴 정의) |
| 읽는 문서 | [09](../../GoldWiki/09_DESIGN_SYSTEM.md), [14](../../GoldWiki/14_COMPONENT_LIBRARY.md), [15](../../GoldWiki/15_DESIGN_TOKEN.md), [16](../../GoldWiki/16_ACCESSIBILITY.md) |
| 갱신 문서 | [09](../../GoldWiki/09_DESIGN_SYSTEM.md), [14](../../GoldWiki/14_COMPONENT_LIBRARY.md), [15](../../GoldWiki/15_DESIGN_TOKEN.md) |
| 게이트 | **게이트 B** |
| 다음 단계 | (게이트 B 통과 시) S18 |

> **게이트 B — 디자인 승인.** 승인자: UI Lead + Project Director. 통과 조건: 디자인 일관성·접근성(WCAG 2.2 AA). 근거: [29](../../GoldWiki/29_QUALITY_CHECKLIST.md)의 UX·UI·디자인시스템·접근성 체크리스트. 롤백 대상: S15~S17.

### S18 · HTML 프로토타입 계획

| 항목 | 값 |
| --- | --- |
| ID | `S18` |
| 트리거 | 게이트 B 통과 |
| 담당 에이전트 | Publishing Engineer, Frontend Engineer |
| 입력 | 디자인 시스템, 화면 목록 |
| 산출 아티팩트 | `$WORKDIR/18-prototype-plan.md`(범위·구조·우선순위) |
| 읽는 문서 | [17](../../GoldWiki/17_HTML_GUIDE.md), [18](../../GoldWiki/18_CSS_GUIDE.md), [20](../../GoldWiki/20_FRONTEND_GUIDE.md) |
| 갱신 문서 | [38](../../GoldWiki/38_TEMPLATE_LIBRARY.md) |
| 게이트 | 없음 |
| 다음 단계 | S19 |

### S19 · 개발 계획

| 항목 | 값 |
| --- | --- |
| ID | `S19` |
| 트리거 | 프로토타입 계획 확정 |
| 담당 에이전트 | Frontend Engineer, Backend Engineer, API Engineer, Database Architect |
| 입력 | 요구사항, 프로토타입 계획 |
| 산출 아티팩트 | `$WORKDIR/19-dev-plan.md`(아키텍처·API 계약·데이터 모델·개발 일정) |
| 읽는 문서 | [20](../../GoldWiki/20_FRONTEND_GUIDE.md), [21](../../GoldWiki/21_BACKEND_GUIDE.md), [22](../../GoldWiki/22_API_STANDARD.md), [23](../../GoldWiki/23_DATABASE_GUIDE.md), [24](../../GoldWiki/24_SECURITY_GUIDE.md) |
| 갱신 문서 | [32](../../GoldWiki/32_DECISION_LOG.md) |
| 게이트 | 없음 |
| 다음 단계 | S20 |

### S20 · QA 계획

| 항목 | 값 |
| --- | --- |
| ID | `S20` |
| 트리거 | 개발 계획 확정 |
| 담당 에이전트 | QA Engineer, Security Engineer |
| 입력 | 요구사항, 개발 계획 |
| 산출 아티팩트 | `$WORKDIR/20-qa-plan.md`(테스트 전략·케이스·종료기준) |
| 읽는 문서 | [29](../../GoldWiki/29_QUALITY_CHECKLIST.md), [30](../../GoldWiki/30_TEST_STRATEGY.md), [24](../../GoldWiki/24_SECURITY_GUIDE.md) |
| 갱신 문서 | [30](../../GoldWiki/30_TEST_STRATEGY.md) |
| 게이트 | **게이트 C** |
| 다음 단계 | (게이트 C 통과 시) S21 |

> **게이트 C — 품질 검수.** 승인자: QA + Project Director. 통과 조건: [30](../../GoldWiki/30_TEST_STRATEGY.md) 종료기준 + [29](../../GoldWiki/29_QUALITY_CHECKLIST.md) DoD. 롤백 대상: S18~S20(필요 시 S19 개발 단계).

### S21 · 경영 요약

| 항목 | 값 |
| --- | --- |
| ID | `S21` |
| 트리거 | 게이트 C 통과 |
| 담당 에이전트 | Project Director, CEO |
| 입력 | 전 단계 산출물 |
| 산출 아티팩트 | `$WORKDIR/21-executive-summary.md`(경영진·클라이언트용 1~2페이지) |
| 읽는 문서 | 전 단계 GoldWiki 산출물 |
| 갱신 문서 | [35](../../GoldWiki/35_PROJECT_MEMORY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 게이트 | **최종 게이트**(경영 승인·클라이언트 준비) |
| 다음 단계 | 클라이언트 납품(종료) |

## 게이트 요약

| 게이트 | 위치 | 통과 조건 | 승인자 | 롤백 대상 |
| --- | --- | --- | --- | --- |
| A | S10 후 | 전략 정합성·수주 가능성 | Sales/Project Director | S05~S10 |
| B | S17 후 | 디자인 일관성·접근성 | UI Lead/Project Director | S15~S17 |
| C | S20 후 | 테스트 종료기준·DoD | QA/Project Director | S18~S20 |
| 최종 | S21 후 | 경영 승인·클라이언트 준비 | Project Director(+CEO) | — |

## 관련 GoldWiki 문서

- [27_AUTOMATION_WORKFLOW.md](../../GoldWiki/27_AUTOMATION_WORKFLOW.md) — 본 워크플로우의 정본
- [25_AI_GUIDE.md](../../GoldWiki/25_AI_GUIDE.md) — 오케스트레이션·게이트·휴먼인더루프
- [28_SUBAGENT_RULES.md](../../GoldWiki/28_SUBAGENT_RULES.md) — 단계별 담당 에이전트 규칙
- [29_QUALITY_CHECKLIST.md](../../GoldWiki/29_QUALITY_CHECKLIST.md) — 게이트 품질 기준

> **거버넌스:** 본 워크플로우 실행 중 발생한 모든 의사결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md), [프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.
