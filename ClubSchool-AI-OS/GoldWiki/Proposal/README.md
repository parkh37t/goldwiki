# Proposal — 제안 전략 토픽

## 폴더 목적

RFP 분석 결과를 **수주로 전환하는 제안 전략·경영 요약·시뮬레이션 도구**를 보관한다. 윈 테마와 스토리라인을 정의하고, AI 평가위원·고객·경쟁사 시뮬레이션으로 제출 전 품질을 결정적으로 끌어올린다. 21단계 파이프라인의 6·18단계(제안 전략·레드팀)를 책임진다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [ProposalStrategy.md](ProposalStrategy.md) | 윈 테마·가치제안·포지셔닝·스토리라인 |
| [ExecutiveSummaryTemplate.md](ExecutiveSummaryTemplate.md) | 경영 요약 작성 가이드 + 재사용 템플릿 |
| [AIEvaluationBoard.md](AIEvaluationBoard.md) | AI 평가위원: 7축 100점 채점·보완 처방·수주 가능성 예측 |
| [AIClientSimulation.md](AIClientSimulation.md) | AI 고객 시뮬레이션: 4관점 예상 질문·답변 강화 |
| [AICompetitorSimulation.md](AICompetitorSimulation.md) | AI 경쟁사 시뮬레이션: 경쟁 제안 예측·차별화·5축 비교 |

## 관련 GoldWiki 토픽 / 번호 문서

- [05 제안 전략](../05_PROPOSAL_STRATEGY.md) — 정본 상위 문서.
- [RFP](../RFP/README.md) — 제안 전략의 입력 토픽.
- [29 품질 체크리스트](../29_QUALITY_CHECKLIST.md) — G6 제출 게이트.
- [34 고객 지식](../34_CLIENT_KNOWLEDGE.md) — 고객 시뮬레이션 입력.
- [38 템플릿 라이브러리](../38_TEMPLATE_LIBRARY.md) — 제안서 템플릿.

## 담당 에이전트

- **Owner**: proposal-lead
- **시뮬레이션 Owner**: client-simulation-lead
- **협업**: rfp-strategy-lead, executive-director, cto-reviewer, pmo-director, documentation-lead

## 워크플로우 / 커맨드 연계

- `/generate-proposal`로 전략·경영 요약을 생성한다.
- 제출 전 AIEvaluationBoard·AIClientSimulation·AICompetitorSimulation 3종을 순차 실행해 레드팀 게이트를 통과시킨다.

> **거버넌스:** 본 토픽의 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다. 지식 중복 금지 — 정본은 링크한다.
