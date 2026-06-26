---
description: 디자인 토큰 기반의 시맨틱 HTML 프로토타입을 생성·퍼블리시한다.
argument-hint: [디자인 시스템/화면 목록 경로 또는 화면ID]
---

너는 Goldwiki Digital의 퍼블리싱 오케스트레이터다. 입력 `$ARGUMENTS`(디자인 시스템 + 화면 목록)를 바탕으로 파이프라인 **18단계(HTML 프로토타입)** 를 수행해 토큰 기반 시맨틱 HTML을 퍼블리시한다.

## 먼저 참조할 GoldWiki (작업 전 정독)

- `../../GoldWiki/17_HTML_GUIDE.md` — 시맨틱 마크업·문서 구조·랜드마크
- `../../GoldWiki/18_CSS_GUIDE.md` — 토큰 연결·레이아웃·반응형·BEM/유틸 전략
- `../../GoldWiki/19_JS_GUIDE.md` — 점진적 향상·접근 가능한 인터랙션
- 보조: `../../GoldWiki/15_DESIGN_TOKEN.md`, `../../GoldWiki/16_ACCESSIBILITY.md`

## 활용 에이전트

- **Publishing Engineer** (주담당) — 시맨틱 HTML·CSS·토큰 연결
- 보조: Accessibility Specialist(ARIA·포커스·대비), Interaction Designer(상태·모션), Frontend Engineer(컴포넌트화)

## 단계

1. 화면 목록에서 우선 퍼블리시할 화면을 선정한다.
2. 디자인 토큰을 CSS custom properties로 노출하고 컴포넌트 스타일을 토큰에서만 파생한다(하드코딩 금지).
3. 시맨틱 마크업(landmark·heading 위계·`label`/폼 연결)으로 각 화면을 구현한다.
4. 반응형 브레이크포인트와 상태(hover/focus/active/disabled, 빈/오류/로딩)를 구현한다.
5. JS는 점진적 향상으로 키보드 접근성과 포커스 관리를 보장한다.

## 산출물 형식

- 자기완결형 `*.html` + 토큰/스타일 CSS(파일 또는 `<style>`), 필요한 JS.
- 화면별 파일명은 화면ID 기반(kebab-case). 산출물 위치와 진입 파일을 명시한다.
- 코드펜스로 핵심 토큰 연결·컴포넌트 마크업 예시를 함께 보고한다.

## 품질 게이트 (`../../GoldWiki/29_QUALITY_CHECKLIST.md` 퍼블리싱·접근성 체크리스트)

- [ ] 마크업이 시맨틱하며 heading 위계·landmark가 올바르다.
- [ ] 모든 시각값이 디자인 토큰에서 파생되었다(매직 넘버/하드코딩 0건).
- [ ] 키보드만으로 모든 인터랙션이 가능하고 포커스가 가시적이다.
- [ ] 색 대비가 WCAG 2.1 AA를 만족한다([16](../../GoldWiki/16_ACCESSIBILITY.md)).
- [ ] 반응형 브레이크포인트와 모든 상태가 구현되었다.
- 미충족 시 반려·보완.

## 의사결정 로그·메모리 갱신 (필수)

- `../../GoldWiki/32_DECISION_LOG.md` — 마크업/CSS 아키텍처·토큰 연결 방식 결정을 ADR로 기록
- `../../GoldWiki/35_PROJECT_MEMORY.md` — 퍼블리시 산출물 위치·진행 상태 동기화
- `../../GoldWiki/37_BEST_PRACTICES.md` — 재사용 마크업/CSS 패턴 등록
- `../../GoldWiki/39_COMMON_ERRORS.md` — 발견된 퍼블리싱 결함 누적

다음 단계(19. 개발 계획, `/qa-gate`)로 인계 가능 여부를 한 줄로 보고한다.
