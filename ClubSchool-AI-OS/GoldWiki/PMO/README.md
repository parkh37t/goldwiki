# PMO — 프로젝트 관리 토픽

## 폴더 목적

ClubSchool AI OS 프로젝트의 **일정·범위·자원·리스크 통제** 기준을 정의한다. 작업분해구조(WBS)를 일관된 원칙으로 작성해 과업을 누락 없이 분해하고, 공수·의존성·임계경로를 현실적으로 산정하며, 마일스톤·게이트로 진척을 통제한다. GoldWiki SSOT의 일정 관리 정본 토픽이다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [WBSGuide.md](WBSGuide.md) | WBS 작성 가이드(분해 원칙·공수 산정·의존성·일정화·예시 표) |

## 관련 GoldWiki 토픽 / 번호 문서

- [../27_AUTOMATION_WORKFLOW.md](../27_AUTOMATION_WORKFLOW.md) — RFP→납품 표준 단계 모델
- [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md) — 과거 공수 실적·교훈
- [../32_DECISION_LOG.md](../32_DECISION_LOG.md) — 의사결정 기록
- [../../Templates/WBS.md](../../Templates/WBS.md) — WBS 산출물 템플릿
- [../QA/QualityReviewChecklist.md](../QA/QualityReviewChecklist.md) — 일정/WBS 현실성 검증(6단계)
- [../Delivery/](../Delivery/) — 납품 단계 연계
- [../Organization/](../Organization/) — 가용 인력·역할

## 담당 에이전트

- **주담당:** `pmo-director` (PMO·일정·리스크 총괄)
- **협업:** `coo-operator`(운영 총괄), `executive-director`(승인), 각 단계 리드(`rfp-strategy-lead`, `proposal-lead`, `ux-research-lead`, `backend-lead`, `qa-lead` 등 공수·일정 입력)

## 거버넌스

WBS는 100% 규칙·MECE·8/80 규칙을 준수해 작성하고, [품질 검증 6단계](../QA/QualityReviewChecklist.md)로 현실성을 검증한다. 일정·범위 변경은 [DecisionLog](../DecisionLog/)에 기록하고 실적은 [ProjectMemory](../35_PROJECT_MEMORY.md)에 누적한다.
