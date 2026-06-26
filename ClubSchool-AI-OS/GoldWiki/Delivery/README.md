# Delivery — 납품·인수 토픽

## 폴더 목적

ClubSchool AI OS 프로젝트의 **최종 납품(handover)** 기준을 정의한다. 납품물이 계약·RFP 요건을 빠짐없이 충족하고, 품질·문서·인수 절차가 완비되어 클라이언트가 독립 운영·유지보수할 수 있는 상태로 인계되도록 보장한다. GoldWiki SSOT의 납품 게이트 정본 토픽이다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [FinalDeliveryChecklist.md](FinalDeliveryChecklist.md) | 최종 납품 체크리스트(산출물·품질·문서·인수 4영역)와 납품 판정 기준 |

## 관련 GoldWiki 토픽 / 번호 문서

- [../31_RELEASE_PROCESS.md](../31_RELEASE_PROCESS.md) — 릴리스 프로세스
- [../30_TEST_STRATEGY.md](../30_TEST_STRATEGY.md) — 테스트 전략
- [../QA/QualityReviewChecklist.md](../QA/QualityReviewChecklist.md) — 품질 검증 10단계(납품 전제)
- [../PMO/WBSGuide.md](../PMO/WBSGuide.md) — 산출물 정의·WBS 추적
- [../../Templates/Release_Notes.md](../../Templates/Release_Notes.md) — 릴리스 노트 템플릿
- [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md) — 교훈 누적
- [../DecisionLog/](../DecisionLog/) — 납품 판정·이슈 기록

## 담당 에이전트

- **주담당:** `pmo-director` (납품·인수 총괄)
- **협업:** `qa-lead`(품질 증빙), `documentation-lead`(문서·매뉴얼), `executive-director`(납품 확정 승인), `backend-lead`/`frontend-lead`(기술 이관)

## 거버넌스

납품은 산출물·품질·문서·인수 4개 영역 전 항목 충족 시에만 확정한다(인수확인서 서명). 치명 결함·핵심 산출물 누락이 있으면 보류한다. 납품 결과·교훈은 [ProjectMemory](../35_PROJECT_MEMORY.md)·[DecisionLog](../DecisionLog/)에 기록한다.
