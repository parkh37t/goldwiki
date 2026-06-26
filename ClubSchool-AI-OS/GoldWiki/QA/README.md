# QA — 품질 보증 토픽

## 폴더 목적

ClubSchool AI OS의 모든 산출물이 클라이언트 제출·임원 보고·최종 납품 전에 충족해야 할 **품질 검증 체계**를 정의한다. 자가 검증과 교차 검증의 단일 기준을 제공하고, 게이트 통과·반려 판정을 표준화해 일관된 품질을 보장한다. GoldWiki SSOT의 품질 게이트 정본 토픽이다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [QualityReviewChecklist.md](QualityReviewChecklist.md) | 10단계 품질 검증 체계(RFP 이해도→최종 제출 적합성)와 단계별 판정 기준 |

## 관련 GoldWiki 토픽 / 번호 문서

- [../29_QUALITY_CHECKLIST.md](../29_QUALITY_CHECKLIST.md) — 마스터 품질 체크리스트(분야별 DoD)
- [../30_TEST_STRATEGY.md](../30_TEST_STRATEGY.md) — 테스트 전략
- [../31_RELEASE_PROCESS.md](../31_RELEASE_PROCESS.md) — 릴리스 프로세스
- [../39_COMMON_ERRORS.md](../39_COMMON_ERRORS.md) — 공통 오류(반복 결함 누적)
- [../37_BEST_PRACTICES.md](../37_BEST_PRACTICES.md) — 베스트프랙티스 근거
- [../PMO/](../PMO/) — 일정/WBS 현실성 검증 연계
- [../Delivery/](../Delivery/) — 최종 납품 게이트 연계
- [../DecisionLog/](../DecisionLog/) — 중대 판정·예외 기록

## 담당 에이전트

- **주담당:** `qa-lead` (품질 검증 총괄·교차 검증)
- **협업:** `security-risk-lead`(보안·리스크 검증), `executive-director`(최종 승인), `pmo-director`(단계 게이트 판정), 모든 산출 에이전트(자가 검증)

## 거버넌스

모든 산출물은 게이트 통과 전 본 토픽의 10단계 검증을 거치며, 한 단계라도 불합격이면 반려된다. 반복 결함은 [공통 오류](../39_COMMON_ERRORS.md)에 누적하고 중대 판정은 [DecisionLog](../DecisionLog/)에 기록한다.
