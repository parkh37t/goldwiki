# DesignSystem 토픽 — GoldWiki

디자인 시스템(토큰·컴포넌트·패턴)과 거버넌스의 단일 진실 공급원(SSOT). 디자인-개발 일관성과 재사용성을 운영하는 표준을 모은다.

## 폴더 목적

- 토큰 → 컴포넌트 → 패턴의 3계층 아키텍처 정의
- Figma ↔ 코드 동기화 및 단일 출처 운영
- 버전(SemVer)·기여·폐기·접근성 거버넌스 관리

## 포함 문서

| 문서 | 내용 |
| --- | --- |
| [DesignSystemGuide.md](DesignSystemGuide.md) | 디자인 시스템 가이드(토큰→컴포넌트→패턴, 거버넌스) |

## 관련 GoldWiki 문서

- [09_DESIGN_SYSTEM](../09_DESIGN_SYSTEM.md) — 디자인 시스템 번호형 문서
- [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md) — 디자인 토큰
- [14_COMPONENT_LIBRARY](../14_COMPONENT_LIBRARY.md) — 컴포넌트 라이브러리
- [10_FIGMA_GUIDE](../10_FIGMA_GUIDE.md) — Figma 가이드
- [16_ACCESSIBILITY](../16_ACCESSIBILITY.md) — 접근성

## 관련 토픽 폴더

- [../UI/README.md](../UI/README.md) · [../UX/README.md](../UX/README.md) · [../Brand/README.md](../Brand/README.md) · [../Frontend/README.md](../Frontend/README.md)

## 담당 에이전트

- 주관: `design-system-lead`
- 협업: `ui-design-lead`, `frontend-lead`, `bx-design-lead`

## 거버넌스

화면은 시맨틱 토큰만 참조한다(원시 토큰 직접 사용 금지). 컴포넌트 추가/변경은 제안→리뷰(디자인+개발)→승인→문서화→릴리스 절차를 따르고, 접근성 게이트를 통과해야 한다. 변경은 SemVer로 버전업하고 [32_DECISION_LOG](../32_DECISION_LOG.md)·CHANGELOG에 기록한다.
