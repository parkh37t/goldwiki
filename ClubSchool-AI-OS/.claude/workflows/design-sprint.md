---
name: design-sprint
description: UX 리서치부터 UI 컨셉·디자인 시스템·HTML 프로토타입까지를 수행하는 디자인 스프린트 워크플로우. rfp-to-delivery의 S12~S18(IA·플로우·화면·UX·UI·디자인시스템·프로토타입 계획)을 디자인 관점으로 독립 실행하며 게이트 B를 포함한다.
---

# 워크플로우: design-sprint

> 상위 파이프라인: [rfp-to-delivery](rfp-to-delivery.md) · 정본: [GoldWiki 27](../../GoldWiki/27_AUTOMATION_WORKFLOW.md)
> 오케스트레이터: UX Researcher → UI Designer(단계별 리드 전환)

## 적용 시점

요구사항이 확정된 상태에서 디자인 산출물(IA·플로우·화면·UX·UI·디자인 시스템·프로토타입)을 빠르게 완성해야 할 때 실행한다. 게이트 B(디자인 승인) 통과 후 [rfp-to-delivery](rfp-to-delivery.md) S19(개발 계획) 또는 [delivery-qa](delivery-qa.md)로 인계한다.

## 실행 규약

1. 모든 단계는 작업 전 `읽는 문서`의 GoldWiki를 먼저 참조한다. 기존 토큰·컴포넌트가 있으면 재사용한다(중복 금지).
2. 산출 아티팩트는 다음 단계 및 프런트엔드 구현의 입력이 되도록 구조화한다.
3. 접근성(WCAG 2.2 AA)은 협상 대상이 아니며 게이트 B의 필수 통과 조건이다.
4. 결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md)·[프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md)에 기록한다.

## 변수

| 변수 | 의미 |
| --- | --- |
| `$REQUIREMENTS` | 확정 요구사항(rfp-to-delivery S04 산출물) |
| `$BRAND` | 브랜드 가이드/자산 |
| `$WORKDIR` | 산출 아티팩트 디렉터리 |

## 단계 정의

### D01 · UX 리서치·정보구조(IA)

| 항목 | 값 |
| --- | --- |
| ID | `D01` |
| 트리거 | 요구사항 확정 |
| 담당 에이전트 | UX Researcher, Service Planner |
| 입력 | 요구사항, 사용자 정의 |
| 산출 아티팩트 | `$WORKDIR/d01-research-ia.md`(사용자 리서치 요약 + 사이트맵·콘텐츠 구조) |
| 읽는 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md), [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md), [13](../../GoldWiki/13_USER_JOURNEY.md) |
| 갱신 문서 | [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md), [13](../../GoldWiki/13_USER_JOURNEY.md) |
| 게이트 | 없음 |
| 다음 단계 | D02 |

### D02 · 유저 플로우

| 항목 | 값 |
| --- | --- |
| ID | `D02` |
| 트리거 | IA 확정 |
| 담당 에이전트 | UX Researcher, Interaction Designer |
| 입력 | IA, 핵심 과업 |
| 산출 아티팩트 | `$WORKDIR/d02-user-flows.md`(주요 사용자 플로우 다이어그램) |
| 읽는 문서 | [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md), [12](../../GoldWiki/12_USER_FLOW.md), [13](../../GoldWiki/13_USER_JOURNEY.md) |
| 갱신 문서 | [12](../../GoldWiki/12_USER_FLOW.md) |
| 게이트 | 없음 |
| 다음 단계 | D03 |

### D03 · 화면 목록

| 항목 | 값 |
| --- | --- |
| ID | `D03` |
| 트리거 | 플로우 확정 |
| 담당 에이전트 | Service Planner, UI Designer |
| 입력 | 플로우, IA |
| 산출 아티팩트 | `$WORKDIR/d03-screen-list.md`(화면 정의서: 화면 ID·명칭·목적·요소) |
| 읽는 문서 | [12](../../GoldWiki/12_USER_FLOW.md), [08](../../GoldWiki/08_UI_GUIDELINES.md) |
| 갱신 문서 | [11](../../GoldWiki/11_INFORMATION_ARCHITECTURE.md) |
| 게이트 | 없음 |
| 다음 단계 | D04 |

### D04 · UX 전략

| 항목 | 값 |
| --- | --- |
| ID | `D04` |
| 트리거 | 화면 목록 확정 |
| 담당 에이전트 | UX Researcher |
| 입력 | 화면 목록, 사용자 여정 |
| 산출 아티팩트 | `$WORKDIR/d04-ux-strategy.md`(UX 원칙·핵심 경험·인터랙션 원칙) |
| 읽는 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md), [13](../../GoldWiki/13_USER_JOURNEY.md) |
| 갱신 문서 | [07](../../GoldWiki/07_UX_PRINCIPLES.md) |
| 게이트 | 없음 |
| 다음 단계 | D05 |

### D05 · UI 컨셉

| 항목 | 값 |
| --- | --- |
| ID | `D05` |
| 트리거 | UX 전략 확정 |
| 담당 에이전트 | UI Designer, BX Designer |
| 입력 | UX 전략, `$BRAND` |
| 산출 아티팩트 | `$WORKDIR/d05-ui-concept.md`(비주얼 컨셉·무드보드·키 스크린 시안) |
| 읽는 문서 | [08](../../GoldWiki/08_UI_GUIDELINES.md), [10](../../GoldWiki/10_FIGMA_GUIDE.md) |
| 갱신 문서 | [08](../../GoldWiki/08_UI_GUIDELINES.md) |
| 게이트 | 없음 |
| 다음 단계 | D06 |

### D06 · 디자인 시스템

| 항목 | 값 |
| --- | --- |
| ID | `D06` |
| 트리거 | UI 컨셉 확정 |
| 담당 에이전트 | UI Designer, Interaction Designer, Accessibility Specialist |
| 입력 | UI 컨셉, 디자인 토큰 |
| 산출 아티팩트 | `$WORKDIR/d06-design-system.md`(컴포넌트·토큰·패턴 + 접근성 명세) |
| 읽는 문서 | [09](../../GoldWiki/09_DESIGN_SYSTEM.md), [14](../../GoldWiki/14_COMPONENT_LIBRARY.md), [15](../../GoldWiki/15_DESIGN_TOKEN.md), [16](../../GoldWiki/16_ACCESSIBILITY.md) |
| 갱신 문서 | [09](../../GoldWiki/09_DESIGN_SYSTEM.md), [14](../../GoldWiki/14_COMPONENT_LIBRARY.md), [15](../../GoldWiki/15_DESIGN_TOKEN.md) |
| 게이트 | **게이트 B** |
| 다음 단계 | (게이트 B 통과 시) D07 |

> **게이트 B — 디자인 승인.** 승인자: UI Lead + Project Director(+Accessibility Specialist 검수). 통과 조건: 디자인 일관성·토큰 정합성·접근성(WCAG 2.2 AA). 근거: [29](../../GoldWiki/29_QUALITY_CHECKLIST.md)의 UX·UI·디자인시스템·접근성 체크리스트. 미통과 시 D04~D06 재작업.

### D07 · HTML 프로토타입 계획

| 항목 | 값 |
| --- | --- |
| ID | `D07` |
| 트리거 | 게이트 B 통과 |
| 담당 에이전트 | Publishing Engineer, Frontend Engineer |
| 입력 | 디자인 시스템, 화면 목록 |
| 산출 아티팩트 | `$WORKDIR/d07-prototype-plan.md`(프로토타입 범위·구조·우선순위·재사용 마크업 패턴) |
| 읽는 문서 | [17](../../GoldWiki/17_HTML_GUIDE.md), [18](../../GoldWiki/18_CSS_GUIDE.md), [20](../../GoldWiki/20_FRONTEND_GUIDE.md) |
| 갱신 문서 | [38](../../GoldWiki/38_TEMPLATE_LIBRARY.md) |
| 게이트 | 없음 |
| 다음 단계 | 종료(인계: [rfp-to-delivery](rfp-to-delivery.md) S19 또는 [delivery-qa](delivery-qa.md)) |

## 게이트 요약

| 게이트 | 위치 | 통과 조건 | 승인자 |
| --- | --- | --- | --- |
| B | D06 후 | 디자인 일관성·토큰 정합성·접근성 | UI Lead/Project Director |

## 관련 GoldWiki 문서

- [07_UX_PRINCIPLES.md](../../GoldWiki/07_UX_PRINCIPLES.md) — UX 원칙
- [09_DESIGN_SYSTEM.md](../../GoldWiki/09_DESIGN_SYSTEM.md) — 디자인 시스템 정본
- [15_DESIGN_TOKEN.md](../../GoldWiki/15_DESIGN_TOKEN.md) — 디자인 토큰 SSOT
- [16_ACCESSIBILITY.md](../../GoldWiki/16_ACCESSIBILITY.md) — 접근성 기준
- [29_QUALITY_CHECKLIST.md](../../GoldWiki/29_QUALITY_CHECKLIST.md) — 게이트 B 체크리스트

> **거버넌스:** 본 워크플로우 실행 중 발생한 모든 의사결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md), [프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.
