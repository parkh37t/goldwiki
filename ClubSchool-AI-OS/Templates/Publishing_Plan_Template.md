# 퍼블리싱 계획 템플릿 (Publishing Plan Template)

> **용도**: 화면을 마크업/스타일로 구현하는 범위·표준·반응형·접근성·산출물 일정을 정의한다. 디자인을 코드로 옮기는 실행 계획이다.
> **사용 에이전트**: publishing-lead(주), design-system-lead, frontend-lead.
> **선행 산출물**: [`DesignSystem_Template.md`](DesignSystem_Template.md) · [`ScreenList_Template.md`](ScreenList_Template.md)
> **후속 산출물**: [`Frontend_Plan_Template.md`](Frontend_Plan_Template.md)
> **관련 GoldWiki**: [HTML/CSS 가이드](../GoldWiki/Publishing/HTMLCSSGuide.md) · [17 HTML 가이드](../GoldWiki/17_HTML_GUIDE.md) · [18 CSS 가이드](../GoldWiki/18_CSS_GUIDE.md) · [16 접근성](../GoldWiki/16_ACCESSIBILITY.md)

### 사용 안내
- 모든 마크업은 디자인 토큰·컴포넌트를 참조한다(스타일 하드코딩 금지).
- 시맨틱 마크업과 접근성(WCAG AA)을 기본값으로 한다.
- 화면ID 단위로 산출물·상태를 추적한다.

---

## 1. 개요

| 항목 | 내용 |
|------|------|
| 사업명 | {} |
| 마크업 표준 | HTML5 시맨틱 |
| CSS 전략 | {예: BEM / 유틸리티 / CSS 변수 토큰} |
| 브라우저 지원 | {최신 2버전 + ...} |
| 접근성 기준 | WCAG 2.1 AA |
| 작성자 / 작성일 | {이름} / {YYYY-MM-DD} |

---

## 2. 퍼블리싱 대상 표 (추적)

| 화면ID | 화면명 | 반응형 | 컴포넌트 의존 | 산출물 | 상태 | 담당 |
|--------|--------|--------|----------------|--------|------|------|
| SCR-001 | 홈 | PC/Tab/Mob | Header, Card, Button | index.html | 대기 | {} |
| SCR-010 | 목록 | PC/Tab/Mob | Card, Filter | list.html | 대기 | {} |
| SCR-011 | 상세 | PC/Tab/Mob | Gallery, CTA | detail.html | 대기 | {} |

---

## 3. 반응형 정책

| 브레이크포인트 | 폭 | 레이아웃 |
|----------------|----|----------|
| Mobile | <768 | {1단} |
| Tablet | 768–1023 | {2단} |
| Desktop | ≥1024 | {12 컬럼} |

---

## 4. 코드 표준

- 시맨틱 태그(`header/nav/main/section/article/footer`) 사용.
- 클래스 명명: {BEM 등} 규칙.
- 색/간격/폰트: 디자인 토큰 변수만 사용.
- 이미지: `alt` 필수, lazy 로딩.

---

## 5. 접근성 체크리스트

- [ ] 키보드만으로 모든 기능 사용 가능.
- [ ] 모든 이미지에 의미 있는 `alt`.
- [ ] 폼 요소와 `label` 연결.
- [ ] 색 대비 4.5:1 이상.
- [ ] 포커스 표시(focus ring) 유지.
- [ ] 헤딩 위계(h1→h2→h3) 준수.

---

## 6. 성능 기준

| 지표 | 목표 |
|------|------|
| LCP | {< 2.5s} |
| CLS | {< 0.1} |
| 이미지 최적화 | {WebP/AVIF} |

---

## 7. 산출물 일정

| 산출물 | 대응 화면ID | 기한 | 담당 |
|--------|-------------|------|------|
| 공통 레이아웃/토큰 적용 | 전역 | {} | {} |
| P0 화면 마크업 | SCR-001,010,011 | {} | {} |

---

## 8. 검증 체크리스트

- [ ] 마크업이 토큰/컴포넌트를 참조한다.
- [ ] 반응형 3종이 모두 동작한다.
- [ ] 접근성 체크리스트 통과.
- [ ] 성능 기준 충족.

---

| 작성자 | {이름} | 버전 | v{1.0} | 작성일 | {YYYY-MM-DD} |
|--------|--------|------|--------|--------|---------------|
