---
description: RFP 심층 분석을 바탕으로 평가 배점에 정렬된 제안서 초안을 섹션별로 집필한다.
argument-hint: [RFP 심층 분석 경로 또는 사업명]
---

# /proposal-build

## 목적
`/rfp-analyze` 결과를 입력으로 받아 **평가 배점에 최적화된 제안서 초안**을 생성한다. 윈테마를 전체 서사로 관통시키고, 각 평가항목에 대응하는 섹션을 증빙과 함께 집필한다.

## 실행 조건
- `/rfp-analyze`의 RTM과 Win Theme이 확정되어 있다.
- 제안서 목차/분량 제약(페이지 한도 등)이 식별되어 있다.

## 호출할 Subagent
- **proposal-lead** (주담당) — 제안 서사·목차·집필 총괄
- rfp-strategy-lead — 평가 정렬 검증
- business-analysis-lead — 요구 대응 증빙
- ux-research-lead / ui-design-lead — UX/UI 제안 파트
- pmo-director — 추진 체계·일정 파트
- documentation-lead — 형식·일관성·SSOT 링크 정리

## 참조할 Gold Wiki 문서
- `../../GoldWiki/Proposal/ProposalStrategyPlaybook.md` — 제안 서사·윈테마 구조
- `../../GoldWiki/05_PROPOSAL_STRATEGY.md` — 제안 전략 정본
- `../../GoldWiki/RFP/RFPAnalysisFramework.md` — RTM 연결
- `../../GoldWiki/38_TEMPLATE_LIBRARY.md` — 제안서 템플릿

## 입력값
- `$ARGUMENTS`: RFP 심층 분석 경로 또는 사업명
- 부가: 제안서 목차/분량 제약, 회사 레퍼런스 자산

## 처리 절차
1. **목차 설계** — 평가항목과 1:1 대응하는 제안 목차를 구성한다.
2. **Win Theme 서사화** — 전체를 관통하는 핵심 메시지를 도입부와 각 섹션에 배치한다.
3. **섹션 집필** — 이해/접근방법/추진체계/일정/품질/차별화 섹션을 증빙과 함께 작성한다.
4. **UX/UI·기술 파트 통합** — 디자인·개발·AI 제안 내용을 일관 톤으로 통합한다.
5. **증빙 매핑** — 각 주장에 RTM의 증빙·레퍼런스를 연결한다.
6. **요약(Executive Summary) 작성** — 평가자가 30초에 핵심을 파악하도록 압축한다.
7. **형식 정리** — 분량 제약·표·도식·일관 용어를 점검한다.

## 출력값
```markdown
# 제안서 초안 — <사업명>
## Executive Summary
## 1. 사업 이해 / Win Theme
## 2. 제안 접근방법 (평가항목별)
## 3. UX/UI 및 기술 제안
## 4. 추진 체계 / 일정 (WBS)
## 5. 품질·리스크 관리
## 6. 차별화 / 레퍼런스
[부록] 요구사항 대응표(RTM 링크)
```

## 품질 기준
- [ ] 모든 평가항목에 대응 섹션과 증빙이 존재한다.
- [ ] Win Theme이 전체 서사에 일관되게 반영되었다.
- [ ] 분량/형식 제약을 준수한다.
- [ ] 모든 주장이 근거·레퍼런스에 연결된다.
- [ ] TemplateLibrary·DecisionLog가 갱신되었다.
- 통과 시 `/proposal-review`로 인계한다.
