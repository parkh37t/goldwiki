---
template: adr
title: ADR (아키텍처 의사결정 기록)
description: 단일 의사결정의 맥락·대안·결정·결과를 기록하는 기계 채움용 골격(ADR 표준 형식).
schema:
  - field: ADR번호
    type: string
  - field: 제목
    type: string
  - field: 상태
    type: enum
    values: [제안, 승인, 폐기, 대체됨]
  - field: 대안
    type: table
    columns: [대안, 장점, 단점]
source-of-truth: ../../GoldWiki/32_DECISION_LOG.md
---

# ADR-{번호}: {제목}

| 항목 | 값 |
| --- | --- |
| 상태 | {제안/승인/폐기/대체됨} |
| 결정일 | {결정일} |
| 결정자 | {결정자(에이전트)} |
| 대체 관계 | {대체/피대체 ADR} |

## 1. 맥락(Context)
{문제 상황과 결정이 필요한 이유. 관련 요구·제약.}

## 2. 검토한 대안(Options)

| 대안 | 장점 | 단점 |
| --- | --- | --- |
| {대안 A} | {장점} | {단점} |
| {대안 B} | {장점} | {단점} |

## 3. 결정(Decision)
{선택한 대안과 핵심 근거.}

## 4. 결과(Consequences)
- 긍정: {긍정적 영향}
- 부정/트레이드오프: {감수할 비용}
- 후속 작업: {필요 조치}

## 5. 두뇌 갱신

- [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md): 등재 완료 여부 {예/아니오}
- [프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md): 반영 {예/아니오}
- [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md) / [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md): 해당 시 갱신

> 정본: [32 의사결정 로그](../../GoldWiki/32_DECISION_LOG.md)
