---
name: proposal-sprint
description: RFP 분석부터 제안서 제출까지를 수행하는 단기 스프린트 워크플로우. rfp-to-delivery의 S01~S10(전략 수립·게이트 A)을 압축하고 제안서 작성·검수·제출 단계를 추가하여, 제안 단계만 독립 실행할 수 있도록 정의한다.
---

# 워크플로우: proposal-sprint

> 상위 파이프라인: [rfp-to-delivery](rfp-to-delivery.md) · 정본: [GoldWiki 27](../../GoldWiki/27_AUTOMATION_WORKFLOW.md)
> 오케스트레이터: Proposal Strategist(공동 책임: Sales Director, Project Director)

## 적용 시점

RFP는 수령했으나 수주 여부가 확정되지 않은 상태에서, 제안서 제출까지를 빠르게 끝내야 할 때 실행한다. 게이트 A 통과 후 본 워크플로우는 종료되며, 수주 시 [rfp-to-delivery](rfp-to-delivery.md)의 S11(WBS)부터 이어 실행한다.

## 실행 규약

1. 모든 단계는 작업 전 `읽는 문서`의 GoldWiki를 먼저 참조한다.
2. 산출 아티팩트는 제안서 빌드의 입력이 되도록 구조화한다.
3. 게이트 A(전략 승인)·게이트 P(제안서 제출 승인)는 승인 없이 통과 불가.
4. 결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md)·[프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md)에 기록한다.

## 변수

| 변수 | 의미 |
| --- | --- |
| `$RFP_PATH` | 원본 RFP 경로 |
| `$DUE_DATE` | 제안서 제출 마감 |
| `$WORKDIR` | 산출 아티팩트 디렉터리 |

## 단계 정의

### P01 · RFP 분석 (rfp-to-delivery S01~S03 압축)

| 항목 | 값 |
| --- | --- |
| ID | `P01` |
| 트리거 | 신규 RFP 수령 |
| 담당 에이전트 | Business Analyst |
| 입력 | 원본 RFP, 클라이언트 배경 |
| 산출 아티팩트 | `$WORKDIR/p01-analysis.md`(정규화·구조 분석·1페이지 요약 통합) |
| 읽는 문서 | [03](../../GoldWiki/03_RFP_FRAMEWORK.md), [04](../../GoldWiki/04_RFP_ANALYSIS.md), [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md) |
| 갱신 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md), [35](../../GoldWiki/35_PROJECT_MEMORY.md) |
| 게이트 | 없음 |
| 다음 단계 | P02 |

### P02 · 요구사항·평가기준

| 항목 | 값 |
| --- | --- |
| ID | `P02` |
| 트리거 | 분석 완료 |
| 담당 에이전트 | Business Analyst, Product Owner, Proposal Strategist |
| 입력 | RFP 분석 |
| 산출 아티팩트 | `$WORKDIR/p02-requirements.json`, `$WORKDIR/p02-eval-matrix.md`(평가기준·배점·강점 매핑) |
| 읽는 문서 | [03](../../GoldWiki/03_RFP_FRAMEWORK.md), [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [06](../../GoldWiki/06_BUSINESS_ANALYSIS.md) |
| 갱신 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md), [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md) |
| 게이트 | 없음 |
| 다음 단계 | P03 |

### P03 · 숨은기대·리스크

| 항목 | 값 |
| --- | --- |
| ID | `P03` |
| 트리거 | 평가기준 확보 |
| 담당 에이전트 | Proposal Strategist, Project Director |
| 입력 | RFP 전문, 클라이언트 지식, 요구사항 |
| 산출 아티팩트 | `$WORKDIR/p03-latent-and-risk.md`(숨은기대 + 리스크 레지스터) |
| 읽는 문서 | [04](../../GoldWiki/04_RFP_ANALYSIS.md), [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 갱신 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md), [39](../../GoldWiki/39_COMMON_ERRORS.md) |
| 게이트 | 없음 |
| 다음 단계 | P04, P05 (병렬) |
| 비고 | CoT 추론 권장([26](../../GoldWiki/26_PROMPT_ENGINEERING.md)) |

### P04 · 경쟁사 벤치마크

| 항목 | 값 |
| --- | --- |
| ID | `P04` |
| 트리거 | P03 완료 |
| 담당 에이전트 | Business Analyst, Service Planner |
| 입력 | 도메인·경쟁 환경 |
| 산출 아티팩트 | `$WORKDIR/p04-competitor.md`(비교표·차별화) |
| 읽는 문서 | [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md), [36](../../GoldWiki/36_REFERENCE_LIBRARY.md) |
| 갱신 문서 | [36](../../GoldWiki/36_REFERENCE_LIBRARY.md) |
| 게이트 | 없음 |
| 다음 단계 | P06 |

### P05 · 글로벌 베스트프랙티스 벤치마크

| 항목 | 값 |
| --- | --- |
| ID | `P05` |
| 트리거 | P03 완료(P04와 병렬) |
| 담당 에이전트 | Service Planner, UX Researcher |
| 입력 | 도메인, 글로벌 표준 |
| 산출 아티팩트 | `$WORKDIR/p05-global.md`(우수 사례·표준 요약) |
| 읽는 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md), [16](../../GoldWiki/16_ACCESSIBILITY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 갱신 문서 | [36](../../GoldWiki/36_REFERENCE_LIBRARY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 게이트 | 없음 |
| 다음 단계 | P06 |

### P06 · 제안 전략 수립

| 항목 | 값 |
| --- | --- |
| ID | `P06` |
| 트리거 | 벤치마크 2종(P04·P05) 취합 |
| 담당 에이전트 | Proposal Strategist, Sales Director |
| 입력 | 평가기준·숨은기대·벤치마크 |
| 산출 아티팩트 | `$WORKDIR/p06-win-strategy.md`(수주 전략·핵심 메시지·win theme·가격 포지셔닝) |
| 읽는 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [02](../../GoldWiki/02_BUSINESS_GOALS.md) |
| 갱신 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [32](../../GoldWiki/32_DECISION_LOG.md) |
| 게이트 | **게이트 A** |
| 다음 단계 | (게이트 A 통과 시) P07 |

> **게이트 A — 전략 승인.** 승인자: Sales Director + Project Director. 통과 조건: 전략 정합성·수주 가능성·수익성. 미통과 시 P02~P06 재작업.

### P07 · 제안서 작성

| 항목 | 값 |
| --- | --- |
| ID | `P07` |
| 트리거 | 게이트 A 통과 |
| 담당 에이전트 | Proposal Strategist, Service Planner, Documentation Specialist |
| 입력 | 승인된 전략, 요구사항, 벤치마크 |
| 산출 아티팩트 | `$WORKDIR/p07-proposal-draft.md`(요약·이해도·수행방안·일정·조직·가격) |
| 읽는 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [38](../../GoldWiki/38_TEMPLATE_LIBRARY.md), [40](../../GoldWiki/40_PROMPT_LIBRARY.md) |
| 갱신 문서 | [38](../../GoldWiki/38_TEMPLATE_LIBRARY.md) |
| 게이트 | 없음 |
| 다음 단계 | P08 |

### P08 · 제안서 검수

| 항목 | 값 |
| --- | --- |
| ID | `P08` |
| 트리거 | 초안 완성 |
| 담당 에이전트 | Project Director, Sales Director, Documentation Specialist |
| 입력 | 제안서 초안, 평가기준 매트릭스 |
| 산출 아티팩트 | `$WORKDIR/p08-review-report.md`(평가기준 대비 충족도·수정 지시) |
| 읽는 문서 | [29](../../GoldWiki/29_QUALITY_CHECKLIST.md), [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md) |
| 갱신 문서 | [39](../../GoldWiki/39_COMMON_ERRORS.md) |
| 게이트 | **게이트 P** |
| 다음 단계 | (게이트 P 통과 시) P09 |

> **게이트 P — 제안서 제출 승인.** 승인자: Sales Director + Project Director(+CEO). 통과 조건: 평가기준 전 항목 대응·오탈자/일관성·가격 승인. 미통과 시 P07로 회귀.

### P09 · 제안서 제출

| 항목 | 값 |
| --- | --- |
| ID | `P09` |
| 트리거 | 게이트 P 통과 |
| 담당 에이전트 | Sales Director |
| 입력 | 최종 제안서, `$DUE_DATE` |
| 산출 아티팩트 | `$WORKDIR/p09-submission-record.md`(제출 채널·일시·접수 확인) |
| 읽는 문서 | [05](../../GoldWiki/05_PROPOSAL_STRATEGY.md), [34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md) |
| 갱신 문서 | [35](../../GoldWiki/35_PROJECT_MEMORY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 게이트 | 없음 |
| 다음 단계 | 종료(수주 시 [rfp-to-delivery](rfp-to-delivery.md) S11부터 이어 실행) |

## 게이트 요약

| 게이트 | 위치 | 통과 조건 | 승인자 |
| --- | --- | --- | --- |
| A | P06 후 | 전략 정합성·수주 가능성·수익성 | Sales/Project Director |
| P | P08 후 | 평가기준 충족·일관성·가격 승인 | Sales/Project Director(+CEO) |

## 관련 GoldWiki 문서

- [03_RFP_FRAMEWORK.md](../../GoldWiki/03_RFP_FRAMEWORK.md) — RFP 분석 프레임워크
- [05_PROPOSAL_STRATEGY.md](../../GoldWiki/05_PROPOSAL_STRATEGY.md) — 제안 전략 정본
- [27_AUTOMATION_WORKFLOW.md](../../GoldWiki/27_AUTOMATION_WORKFLOW.md) — 전체 파이프라인
- [29_QUALITY_CHECKLIST.md](../../GoldWiki/29_QUALITY_CHECKLIST.md) — 제출 게이트 기준

> **거버넌스:** 본 워크플로우 실행 중 발생한 모든 의사결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md), [프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.
