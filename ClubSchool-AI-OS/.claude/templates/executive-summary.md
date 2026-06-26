---
template: executive-summary
title: 경영 요약
description: 윈 테마·정량 성과·근거를 한 페이지로 압축하는 기계 채움용 골격.
schema:
  - field: 사업명
    type: string
  - field: 핵심메시지
    type: list
    count: 3
  - field: 본문
    type: text
  - field: 정량성과
    type: table
    columns: [성과, 수치, 근거]
source-of-truth: ../../GoldWiki/05_PROPOSAL_STRATEGY.md
---

# 경영 요약 — {사업명}

| 항목 | 값 |
| --- | --- |
| 발주처 | {발주처} |
| 작성자 | {작성자} |
| 작성일 | {작성일} |

## 핵심 메시지 (3줄)

- {윈 테마 1}
- {윈 테마 2}
- {윈 테마 3}

## 본문

```
{발주처}께서 추진하시는 {사업명}의 핵심은 {고객 동인}입니다.
Goldwiki Digital은 {차별점 1}, {차별점 2}, {차별점 3}을 통해 {정량 성과}를 약속드립니다.
당사는 {레퍼런스/실적}을 보유하고 있으며, 검증된 {방법론/표준}으로 {리스크}를 사전에 통제합니다.
그 결과 {발주처}는 {기대효과}를 얻으실 것입니다.
```

## 정량 성과 · 근거

| 성과 | 수치 | 근거(레퍼런스/KPI) |
| --- | --- | --- |
| {성과} | {수치} | {근거} |

> 정본: [05 제안 전략](../../GoldWiki/05_PROPOSAL_STRATEGY.md) 6절 · KPI: [02 비즈니스 목표](../../GoldWiki/02_BUSINESS_GOALS.md) · 레드팀 1순위 기준 충족 필요.
