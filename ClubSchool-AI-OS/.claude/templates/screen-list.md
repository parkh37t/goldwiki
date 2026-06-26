---
template: screen-list
title: 화면 목록
description: IA·유저플로우에서 도출한 화면을 ID·상태·컴포넌트·연결 플로우와 함께 정리하는 기계 채움용 골격.
schema:
  - field: 제품명
    type: string
  - field: 화면
    type: table
    columns: [화면ID, 화면명, IA경로, 연결플로우, 주요컴포넌트, 상태, 접근성요구, 담당]
source-of-truth: ../../GoldWiki/12_USER_FLOW.md
---

# 화면 목록 — {제품명}

| 항목 | 값 |
| --- | --- |
| 작성자 | {작성자} |
| 버전 | {버전} |
| 총 화면 수 | {총화면수} |

## 1. 화면 목록

| 화면 ID | 화면명 | IA 경로 | 연결 플로우 | 주요 컴포넌트 | 상태 | 접근성 요구 | 담당 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| SC-001 | {화면명} | {1.1.1} | {플로우ID} | {컴포넌트} | {정상/에러/빈/로딩} | {WCAG요구} | {담당} |

## 2. 상태 매트릭스

| 화면 ID | default | hover/focus | loading | empty | error |
| --- | --- | --- | --- | --- | --- |
| SC-001 | {} | {} | {} | {} | {} |

## 3. 반응형 변형

| 화면 ID | 모바일 | 태블릿 | 데스크톱 |
| --- | --- | --- | --- |
| SC-001 | {} | {} | {} |

> 정본: [12 유저 플로우](../../GoldWiki/12_USER_FLOW.md) 5절 · IA: [11 정보구조](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md) · 상태: [08 UI 가이드라인](../../GoldWiki/08_UI_GUIDELINES.md) 7절
