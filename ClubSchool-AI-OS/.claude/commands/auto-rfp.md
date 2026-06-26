---
description: RFP 한 개를 입력하면 여러 전문 에이전트가 자동으로 분석→전략→WBS→IA/플로우→UX/UI→개발계획→QA 산출물을 만들고 교차 검증까지 수행한다(Claude Code 자율 오케스트레이션).
argument-hint: [RFP 파일 경로] (생략 시 Examples/RFP_INPUT_sample.md)
---

# /auto-rfp — 자율 RFP→납품 파이프라인 (Claude Code 오케스트레이션)

너는 ClubSchool AI OS의 **오케스트레이터(coo-operator/pmo-director 관점)**다. 사용자가 RFP를 주면,
GoldWiki를 단일 진실 공급원으로 삼아 여러 전문 에이전트를 순차/병렬로 가동해 **산출물을 자동 생성하고
교차 검증**한다. 추가 API 키 없이 Claude Code 안에서 동작한다.

## 입력
- `$ARGUMENTS` = RFP 파일 경로. 비어 있으면 `Examples/RFP_INPUT_sample.md` 사용.

## 실행 원칙
- 산출물은 `runs/<날짜-라벨>/` 폴더에 번호순 .md로 저장한다(예: `runs/2026-06-26-청소년동아리/`).
- 각 단계는 담당 에이전트 관점으로 GoldWiki 표준을 따른다. 모든 본문 한국어.
- 단계 간 추적성 유지(요구사항 REQ-### ↔ 화면 SCR-### ↔ 플로우 ↔ 테스트 TC-###).
- 마지막에 평가위원(AIEvaluationBoard)·QA(10단계 체계)로 **교차 검증**하고, 미달 항목은 보완 지시를 남긴다.

## 권장 실행: Workflow 도구로 오케스트레이션
가능하면 Workflow 도구로 아래 단계를 자동 실행한다(없으면 Agent 도구를 순차 호출):

1. **분석**(rfp-strategy-lead): RFP 정독 → 요구사항 추출, 평가기준 대응표, 숨은 기대, 리스크 → `01_RFP_Analysis.md`
   - 참조: `../../GoldWiki/RFP/RFPAnalysisFramework.md`, `RequirementExtraction.md`, `EvaluationCriteriaAnalysis.md`
2. **전략**(proposal-lead): 윈테마·차별화·스토리라인 → `02_Proposal_Strategy.md`, 임원 요약 → `03_Executive_Summary.md`
   - 참조: `../../GoldWiki/Proposal/ProposalStrategy.md`, `ExecutiveSummaryTemplate.md`
3. **설계(병렬)**:
   - pmo-director → `04_WBS.md` (참조 `../../GoldWiki/PMO/WBSGuide.md`)
   - information-architecture-lead → `05_IA_UserFlow_ScreenList.md` (참조 `../../GoldWiki/UX/InformationArchitectureGuide.md`, `UserFlowGuide.md`)
   - ui-design-lead → `06_UX_UI_Concept.md` (참조 `../../GoldWiki/UX/UXStrategyFramework.md`, `../../GoldWiki/UI/UIGuidelines.md`)
   - frontend-lead+backend-lead → `07_Dev_Plan.md` (참조 `../../GoldWiki/Frontend/FrontendGuide.md`, `../../GoldWiki/Backend/BackendGuide.md`, `../../GoldWiki/24_SECURITY_GUIDE.md`)
   - qa-lead → `08_QA_Plan.md` (참조 `../../GoldWiki/QA/QualityReviewChecklist.md`, `../../GoldWiki/30_TEST_STRATEGY.md`)
4. **검증(병렬)**:
   - client-simulation-lead(평가위원) → `09_Evaluation_Scorecard.md`: 7축(사업이해·기술·UX/UI·수행계획·인력·가격·리스크) 100점 채점 + 약점 + 보완 전략 + 수주확률. 참조 `../../GoldWiki/Proposal/AIEvaluationBoard.md`
   - qa-lead → `10_QA_Verification.md`: 10단계 품질 검증 체계로 산출물 점검, 미달 항목·보완 지시. 참조 `../../GoldWiki/QA/QualityReviewChecklist.md`
5. **종합**(executive-director): `00_README.md` — 전체 산출물 인덱스 + 한 장 요약 + 다음 단계.

## 출력값
- `runs/<라벨>/00_README.md` ~ `10_QA_Verification.md` (11개 산출물)
- 채팅에는 진행 단계·핵심 결론·검증 점수·다음 단계를 요약 보고한다.

## 품질 기준
경영진 수준·클라이언트 제출 가능·구현 가능·근거 기반. 플레이스홀더 금지. 모든 결정은
[DecisionLog](../../GoldWiki/Foundation/DecisionLog.md)·[ProjectMemory](../../GoldWiki/Foundation/ProjectMemory.md)에 기록 권장.
