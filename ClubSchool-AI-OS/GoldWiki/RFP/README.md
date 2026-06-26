# RFP — RFP 분석 토픽

## 폴더 목적

RFP(제안요청서)를 접수하여 윈 전략과 비즈니스 분석으로 인계하기까지의 **분석 표준·방법·템플릿**을 보관한다. ClubSchool AI OS 21단계 파이프라인의 전반부(1~9단계)를 책임지는 토픽이며, 여기서 만든 산출물이 [Proposal](../Proposal/README.md) 토픽의 입력이 된다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [RFPAnalysisFramework.md](RFPAnalysisFramework.md) | RFP 분석 프레임워크(접수~9단계, 분류, 게이트 G1·G2) |
| [RequirementExtraction.md](RequirementExtraction.md) | 요구사항 추출 방법·8개 분류·추적성(RTM)·템플릿·예시 |
| [EvaluationCriteriaAnalysis.md](EvaluationCriteriaAnalysis.md) | 평가기준 분석·배점 매핑·대응 전략·배점-분량 배분 |

## 관련 GoldWiki 토픽 / 번호 문서

- [03 RFP 대응 프레임워크](../03_RFP_FRAMEWORK.md) — 정본 상위 프레임워크.
- [04 RFP 심층 분석](../04_RFP_ANALYSIS.md) — 분석 플레이북 정본.
- [Proposal](../Proposal/README.md) — 9단계 인계 대상 토픽.
- [Business](../Business/README.md) — 요구 정교화·WBS.
- [Industry](../Industry/README.md) — 발주처 업종 특성·숨은 기대 해석.
- [27 자동화 워크플로우](../27_AUTOMATION_WORKFLOW.md) — 21단계 파이프라인 정본.

## 담당 에이전트

- **Owner**: rfp-strategy-lead
- **협업**: business-analysis-lead, proposal-lead, industry-research-lead, pmo-director, security-risk-lead, cto-reviewer

## 워크플로우 / 커맨드 연계

- 슬래시 커맨드 `/analyze-rfp`로 1~9단계를 구동한다.
- 게이트 G1(Bid/No-Bid)·G2(분석 완결성)를 통과해야 제안 전략으로 진행한다.

> **거버넌스:** 본 토픽의 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다. 지식 중복 금지 — 정본은 링크한다.
