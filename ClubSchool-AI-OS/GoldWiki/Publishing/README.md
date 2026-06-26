# Publishing — 퍼블리싱 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 퍼블리싱 작업 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

디자인 시안을 시맨틱 HTML과 토큰 기반 CSS로 전환하는 **퍼블리싱 표준**을 관리한다. 접근성·성능·재사용성을 마크업 단계에서 내장해, 프론트엔드 구현과 클라이언트 납품물의 품질을 일관되게 보장한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [HTMLCSSGuide.md](HTMLCSSGuide.md) | 시맨틱 HTML + 토큰 기반 CSS 퍼블리싱 가이드(8섹션, 코드 예제 포함) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [DesignSystem](../DesignSystem/README.md), [Frontend](../Frontend/FrontendGuide.md), [UI](../UI/README.md)
- 번호형: [14_COMPONENT_LIBRARY](../14_COMPONENT_LIBRARY.md), [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md), [16_ACCESSIBILITY](../16_ACCESSIBILITY.md), [17_HTML_GUIDE](../17_HTML_GUIDE.md), [18_CSS_GUIDE](../18_CSS_GUIDE.md), [29_QUALITY_CHECKLIST](../29_QUALITY_CHECKLIST.md)

## 담당 에이전트

- **주담당**: `publishing-lead`
- **협업**: `frontend-lead`, `ui-design-lead`, `design-system-lead`, `qa-lead`

## 사용 흐름

1. UI 확정 시안과 [디자인 토큰](../15_DESIGN_TOKEN.md)을 입력으로 받는다.
2. [HTMLCSSGuide.md](HTMLCSSGuide.md)의 8섹션 절차로 시맨틱 마크업·토큰 CSS를 작성한다.
3. W3C·axe·Lighthouse 자가검사 후 `frontend-lead`에 핸드오프한다.
4. 결과·토큰 사용 내역을 [의사결정 로그](../DecisionLog/README.md)에 갱신한다.

## 거버넌스

모든 퍼블리싱 산출물은 토큰 변수만 사용하고 WCAG 2.2 AA·성능 예산을 충족해야 하며, 토큰·구조 변경은 [의사결정 로그](../DecisionLog/README.md)에 기록한다.
