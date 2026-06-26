# 시맨틱 HTML + 토큰 기반 CSS 퍼블리싱 가이드

> 이 문서는 ClubSchool AI OS의 단일 진실 공급원(SSOT)인 GoldWiki에 속한다. 퍼블리싱 산출물을 만들기 전, 모든 에이전트와 엔지니어는 이 문서와 [디자인 시스템](../DesignSystem/README.md)·[접근성 가이드(번호형)](../16_ACCESSIBILITY.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `publishing-lead` |
| **협업 에이전트** | `frontend-lead`, `ui-design-lead`, `design-system-lead`, `qa-lead` |
| **상위 참조** | [디자인 시스템](../DesignSystem/README.md), [디자인 토큰(번호형)](../15_DESIGN_TOKEN.md), [접근성(번호형)](../16_ACCESSIBILITY.md), [HTML 가이드(번호형)](../17_HTML_GUIDE.md), [CSS 가이드(번호형)](../18_CSS_GUIDE.md) |
| **연계** | [프론트엔드 가이드](../Frontend/FrontendGuide.md), [품질 체크리스트(번호형)](../29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

퍼블리싱 단계(디자인 시안 → 동작하는 마크업)의 표준을 정의한다. 목표는 다음 네 가지를 동시에 보장하는 것이다.

1. **시맨틱(Semantic) HTML** — 의미를 가진 요소를 우선 사용해 접근성·SEO·유지보수성을 내장한다.
2. **토큰 기반 CSS** — 모든 색·간격·타이포는 [디자인 토큰](../15_DESIGN_TOKEN.md)에서 파생된 CSS 커스텀 프로퍼티만 사용한다. 하드코딩 금지.
3. **재사용 가능한 구조** — BEM 또는 데이터 속성 기반 네이밍으로 컴포넌트를 [컴포넌트 라이브러리(번호형)](../14_COMPONENT_LIBRARY.md)와 1:1 매핑한다.
4. **검증 가능성** — W3C 검사, Lighthouse, axe 자동 검사를 통과한다.

## 언제 사용하는가

- UI 디자인 확정(Figma) 후 프로토타입·랜딩·정적 페이지를 마크업할 때.
- 프론트엔드 컴포넌트 구현 전 시맨틱 골격과 토큰 매핑을 먼저 잡을 때.
- 제안서·납품물에 포함될 데모 페이지를 클라이언트 제출 품질로 만들 때.
- 디자인 시스템 변경(토큰 갱신)을 퍼블리싱 산출물에 반영할 때.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 확정 디자인 시안 | [UI 가이드(번호형)](../08_UI_GUIDELINES.md), Figma |
| 디자인 토큰(JSON/CSS 변수) | [디자인 토큰](../15_DESIGN_TOKEN.md), [디자인 시스템](../DesignSystem/README.md) |
| 컴포넌트 명세 | [컴포넌트 라이브러리(번호형)](../14_COMPONENT_LIBRARY.md) |
| 접근성 요구사항 | [접근성(번호형)](../16_ACCESSIBILITY.md) (WCAG 2.2 AA) |
| 콘텐츠/카피 | 서비스 기획 산출물 |

## 처리 방식

### 1) 문서 골격 — 시맨틱 우선

`<div>`를 쓰기 전에 "이 콘텐츠의 의미를 가진 요소가 있는가?"를 항상 자문한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>엔터프라이즈 디지털 컨설팅 · ClubSchool</title>
    <meta name="description" content="RFP부터 납품까지 멀티에이전트로 수행하는 AI 디지털 컨설팅." />
    <link rel="stylesheet" href="/assets/tokens.css" />
    <link rel="stylesheet" href="/assets/main.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">본문으로 건너뛰기</a>
    <header class="site-header">
      <nav aria-label="주요 메뉴"><!-- ... --></nav>
    </header>
    <main id="main">
      <section aria-labelledby="hero-title">
        <h1 id="hero-title">RFP에서 납품까지, AI가 운영하는 디지털 컨설팅</h1>
      </section>
    </main>
    <footer class="site-footer"><!-- ... --></footer>
  </body>
</html>
```

규칙: 페이지당 `<h1>` 1개, 헤딩 레벨 건너뛰기 금지(`h2`→`h4` 금지), 랜드마크(`header`/`nav`/`main`/`footer`) 명시, 의미 없는 래퍼만 `<div>`.

### 2) 토큰 레이어 — `tokens.css`

원시(primitive) → 시맨틱(semantic) 2계층으로 분리한다. 컴포넌트 CSS는 **시맨틱 토큰만** 참조한다.

```css
:root {
  /* primitive */
  --color-blue-600: #2563eb;
  --color-gray-900: #111827;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --radius-md: 8px;
  --font-sans: "Pretendard", system-ui, sans-serif;

  /* semantic (컴포넌트는 이 계층만 사용) */
  --color-bg: #ffffff;
  --color-fg: var(--color-gray-900);
  --color-accent: var(--color-blue-600);
  --color-accent-fg: #ffffff;
  --surface-radius: var(--radius-md);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0b0f19;
    --color-fg: #e5e7eb;
  }
}
```

### 3) 컴포넌트 CSS — BEM + 토큰

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--surface-radius);
  background: var(--color-accent);
  color: var(--color-accent-fg);
  border: 0;
  font: 600 1rem/1.2 var(--font-sans);
}
.btn:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 2px; }
.btn--ghost { background: transparent; color: var(--color-accent); }
```

하드코딩 색·픽셀 금지. 모든 값은 토큰 변수로. 매직 넘버는 PR에서 반려한다.

### 4) 반응형·레이아웃

- 모바일 퍼스트, `min-width` 미디어 쿼리. 브레이크포인트는 토큰화(`--bp-md: 768px`).
- 레이아웃은 Flexbox/Grid 우선. `float`·절대 위치 남용 금지.
- 컨테이너 쿼리(`@container`)로 컴포넌트 단위 반응형을 권장.

### 5) 성능·자산

- 이미지: `loading="lazy"`, `width`/`height` 명시(CLS 방지), 최신 포맷(AVIF/WebP) + fallback.
- 폰트: `font-display: swap`, 서브셋, preload.
- Critical CSS 인라인, 나머지 비동기 로드.

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| `*.html` | 시맨틱 마크업 페이지(검증 통과) |
| `tokens.css` | 토큰 정의(원시+시맨틱) |
| `main.css` / 컴포넌트 CSS | BEM·토큰 기반 스타일 |
| 마크업 명세서 | 컴포넌트↔클래스 매핑 표 |
| 검사 리포트 | W3C·Lighthouse·axe 결과 |

## 품질 기준

- [ ] W3C 마크업 검사 0 오류.
- [ ] 헤딩 위계 정상, 페이지당 `<h1>` 1개.
- [ ] 모든 색·간격·타이포가 토큰 변수 참조(하드코딩 0건).
- [ ] WCAG 2.2 AA: 대비 4.5:1 이상, 포커스 가시성, 키보드 전체 조작.
- [ ] axe 자동 검사 critical 0건.
- [ ] Lighthouse 성능·접근성·SEO 각 90+ (납품 기준).
- [ ] 다크모드·축소 모션(`prefers-reduced-motion`) 대응.

## 체크리스트

- [ ] `lang` 속성, `viewport`, `title`, `meta description` 작성.
- [ ] 랜드마크(`header/nav/main/footer`)와 skip-link 포함.
- [ ] 폼: `<label for>` 연결, 오류 메시지 `aria-describedby`.
- [ ] 이미지 `alt`(장식은 `alt=""`), 아이콘 버튼 `aria-label`.
- [ ] 인라인 스타일·인라인 이벤트 핸들러 0건.
- [ ] 토큰 변경 시 [디자인 토큰](../15_DESIGN_TOKEN.md)·[의사결정 로그](../DecisionLog/README.md) 동기화.

## 예시 프롬프트

```
역할: publishing-lead. GoldWiki Publishing/HTMLCSSGuide.md와 15_DESIGN_TOKEN.md를 먼저 읽어라.
작업: 첨부 Figma '요금제' 섹션을 시맨틱 HTML + 토큰 기반 CSS로 퍼블리싱.
제약: <div> 최소화, BEM, 시맨틱 토큰만 사용, WCAG 2.2 AA, 다크모드 대응.
출력: pricing.html, pricing.css, 컴포넌트↔클래스 매핑 표, axe/Lighthouse 자가검사 결과.
완료 후 frontend-lead에 핸드오프하고 DecisionLog에 토큰 사용 내역을 남겨라.
```

---

### 관련 문서
[Publishing README](README.md) · [프론트엔드 가이드](../Frontend/FrontendGuide.md) · [디자인 시스템](../DesignSystem/README.md) · [17_HTML_GUIDE](../17_HTML_GUIDE.md) · [18_CSS_GUIDE](../18_CSS_GUIDE.md) · [29_QUALITY_CHECKLIST](../29_QUALITY_CHECKLIST.md)
