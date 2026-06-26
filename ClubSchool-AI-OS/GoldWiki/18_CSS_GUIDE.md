# 18 · CSS 아키텍처 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 확장 가능하고 예측 가능한 CSS 아키텍처를 정의하여, 디자인 토큰 기반의 일관된 스타일링과 반응형·성능 표준을 보장한다. |
| **대상 독자** | 퍼블리싱 엔지니어(Publishing Engineer), 프론트엔드 엔지니어, UI 디자이너 |
| **담당(Owner) 에이전트** | Publishing Engineer |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [디자인 토큰](15_DESIGN_TOKEN.md), [HTML 가이드](17_HTML_GUIDE.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [접근성](16_ACCESSIBILITY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 아키텍처 원칙

1. **토큰 우선(Token First):** 모든 색상·간격·타이포·반경 값은 [디자인 토큰](15_DESIGN_TOKEN.md)에서 파생된 CSS 커스텀 프로퍼티로만 사용한다. 하드코딩된 매직 넘버를 금지한다.
2. **유틸리티 + 컴포넌트 하이브리드:** 자주 쓰는 단일 속성은 유틸리티 클래스로, 복합·재사용 단위는 컴포넌트 클래스로 작성한다.
3. **낮은 특이성(Low Specificity):** `@layer`로 캐스케이드를 통제하고, `!important`와 ID 선택자를 피한다.
4. **관심사 분리:** 마크업([HTML](17_HTML_GUIDE.md))과 동작([JS](19_JS_GUIDE.md))에서 스타일을 분리한다.
5. **반응형 기본(Responsive by Default):** 모바일 퍼스트 + 컨테이너 쿼리로 구성요소 단위 적응을 구현한다.

---

## 2. 캐스케이드 레이어(`@layer`)

특이성 전쟁을 방지하기 위해 레이어 순서를 명시적으로 선언한다. 뒤에 선언된 레이어가 우선한다.

```css
@layer reset, tokens, base, layout, components, utilities, overrides;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
  body { -webkit-font-smoothing: antialiased; }
  img, picture, svg { display: block; max-width: 100%; }
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--color-text);
    background: var(--color-bg);
    line-height: var(--leading-normal);
  }
}
```

| 레이어 | 책임 |
| --- | --- |
| `reset` | 브라우저 기본값 정규화 |
| `tokens` | 커스텀 프로퍼티 정의 |
| `base` | 요소 기본 스타일(타이포 등) |
| `layout` | 페이지/그리드 레이아웃 |
| `components` | 재사용 컴포넌트 |
| `utilities` | 단일 속성 헬퍼 |
| `overrides` | 예외적 최종 보정(최소화) |

> 유틸리티가 컴포넌트보다 뒤에 있으므로 특이성이 같아도 유틸리티가 항상 이긴다 — 의도된 동작이다.

---

## 3. 디자인 토큰 → CSS 커스텀 프로퍼티

[디자인 토큰(15)](15_DESIGN_TOKEN.md)을 단일 진실 공급원으로 삼아 CSS 변수로 매핑한다.

```css
@layer tokens {
  :root {
    /* 색상 — 시맨틱 토큰 */
    --color-brand: #c8911a;
    --color-brand-strong: #a4760f;
    --color-text: #1a1a1a;
    --color-text-muted: #5b5b5b;
    --color-bg: #ffffff;
    --color-surface: #f6f6f4;
    --color-border: #e0e0dc;
    --color-danger: #c0392b;
    --color-success: #1e8449;

    /* 간격 — 4px 베이스 스케일 */
    --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
    --space-4: 1rem;    --space-6: 1.5rem; --space-8: 2rem;
    --space-12: 3rem;   --space-16: 4rem;

    /* 타이포 */
    --font-sans: "Pretendard", system-ui, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, monospace;
    --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.25rem;
    --text-xl: 1.5rem;   --text-2xl: 2rem;  --text-3xl: 2.5rem;
    --leading-tight: 1.25; --leading-normal: 1.6;

    /* 반경·그림자·전환 */
    --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px;
    --shadow-1: 0 1px 2px rgba(0,0,0,.06);
    --shadow-2: 0 4px 12px rgba(0,0,0,.10);
    --transition: 160ms cubic-bezier(.2,.0,.2,1);
  }
}
```

### 3.1 다크 모드 — 토큰 재정의

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f2f2f0;
    --color-bg: #131312;
    --color-surface: #1e1e1c;
    --color-border: #34342f;
  }
}
/* 사용자 수동 토글 지원 */
[data-theme="dark"] { /* 위와 동일 재정의 */ }
```

테마는 토큰만 교체하므로 컴포넌트 CSS는 수정할 필요가 없다.

---

## 4. 네이밍 규칙

### 4.1 컴포넌트 — BEM (필요한 복합 컴포넌트에 한해)

```css
@layer components {
  /* Block__Element--Modifier */
  .card { padding: var(--space-6); border-radius: var(--radius-md); }
  .card__title { font-size: var(--text-lg); font-weight: 600; }
  .card__body { color: var(--color-text-muted); }
  .card--featured { border: 2px solid var(--color-brand); }
}
```

### 4.2 유틸리티 — 약어 + 토큰 스케일

```css
@layer utilities {
  .mt-4 { margin-top: var(--space-4); }
  .p-6  { padding: var(--space-6); }
  .flex { display: flex; }
  .gap-4 { gap: var(--space-4); }
  .text-muted { color: var(--color-text-muted); }
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }
}
```

| 종류 | 패턴 | 예시 |
| --- | --- | --- |
| 블록 | `.소문자-케밥` | `.card`, `.site-header` |
| 엘리먼트 | `.block__element` | `.card__title` |
| 모디파이어 | `.block--modifier` | `.card--featured` |
| 상태 | `.is-*`, `.has-*` | `.is-open`, `.is-active` |
| 유틸리티 | `.속성-값` | `.mt-4`, `.flex` |

`.sr-only`(스크린리더 전용)는 [접근성](16_ACCESSIBILITY.md)의 필수 유틸리티다.

---

## 5. 현대 레이아웃

### 5.1 Flexbox — 1차원 정렬

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
```

### 5.2 Grid — 2차원 레이아웃 / 자동 반응형

```css
/* 미디어 쿼리 없이 반응형 카드 그리드 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: var(--space-6);
}

/* 페이지 레이아웃 — 사이드바 + 본문 */
.layout {
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-areas: "sidebar main";
  gap: var(--space-8);
}
.layout__sidebar { grid-area: sidebar; }
.layout__main { grid-area: main; }

@media (max-width: 48rem) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas: "main";
  }
  .layout__sidebar { display: none; }
}
```

### 5.3 컨테이너 쿼리 — 구성요소 단위 적응

뷰포트가 아닌 **부모 컨테이너** 크기에 반응하므로 진정한 재사용 컴포넌트를 만든다.

```css
.card-container { container-type: inline-size; container-name: card; }

.card { display: block; }

@container card (min-width: 24rem) {
  .card { display: grid; grid-template-columns: 8rem 1fr; gap: var(--space-4); }
}
```

---

## 6. 반응형 전략

| 원칙 | 설명 |
| --- | --- |
| 모바일 퍼스트 | 기본 스타일은 모바일, `min-width`로 확장 |
| 콘텐츠 기반 브레이크포인트 | 디바이스가 아닌 레이아웃 깨짐 기준 |
| 상대 단위 | `rem`(레이아웃), `ch`(가독 폭), `%`/`fr`(유연 폭) |
| `clamp()` 유동 타이포 | 뷰포트에 따라 부드럽게 스케일 |

```css
/* 표준 브레이크포인트 (rem 기준) */
/* sm 36rem / md 48rem / lg 64rem / xl 80rem */

h1 {
  /* 최소 1.75rem, 선호 5vw, 최대 3rem */
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
}

.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

`margin-inline`, `padding-block` 등 **논리 속성(Logical Properties)**을 사용하여 다국어/RTL에 대비한다.

---

## 7. 컴포넌트 작성 예시

```css
@layer components {
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    font: inherit;
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background var(--transition), box-shadow var(--transition);
  }
  .btn:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
  .btn--primary {
    background: var(--color-brand);
    color: #fff;
  }
  .btn--primary:hover { background: var(--color-brand-strong); }
  .btn--ghost {
    background: transparent;
    border-color: var(--color-border);
    color: var(--color-text);
  }
  .btn[disabled] { opacity: .5; cursor: not-allowed; }
}
```

`:focus-visible`로 키보드 포커스 링을 보장하는 것은 [접근성](16_ACCESSIBILITY.md) 필수 요건이다.

---

## 8. 접근성·사용자 선호 반영

```css
/* 모션 최소화 선호 존중 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 명도 대비 — 최소 텍스트 대비 4.5:1 (토큰 단계에서 검증) */
/* 터치 타깃 최소 크기 보장 */
.btn, a.nav-link { min-height: 44px; }
```

---

## 9. 성능 가이드

| 기법 | 설명 |
| --- | --- |
| 셀렉터 단순화 | 깊은 중첩·자식 결합 최소화 |
| `content-visibility` | 화면 밖 섹션 렌더 비용 절감 |
| `will-change` 신중 사용 | 합성 레이어 남발 금지 |
| 크리티컬 CSS 인라인 | 첫 화면 스타일만 `<head>`에 인라인 |
| 미사용 CSS 제거 | 빌드 시 PurgeCSS/Lightning CSS |
| `@import` 지양 | 직렬 다운로드 유발, `<link>` 사용 |

```css
.long-article section {
  content-visibility: auto;
  contain-intrinsic-size: 0 600px; /* 스크롤바 점프 방지 */
}
```

빌드 파이프라인과 번들 예산은 [프론트엔드 가이드](20_FRONTEND_GUIDE.md)를 따른다.

---

## 10. 파일 구조

```
assets/css/
├── main.css            # @layer 선언 + import 진입점
├── reset.css
├── tokens.css          # 15_DESIGN_TOKEN 동기화
├── base.css
├── layout/
│   ├── grid.css
│   └── container.css
├── components/
│   ├── button.css
│   ├── card.css
│   └── form.css
└── utilities.css
```

```css
/* main.css */
@layer reset, tokens, base, layout, components, utilities, overrides;
@import "reset.css"      layer(reset);
@import "tokens.css"     layer(tokens);
@import "base.css"       layer(base);
@import "layout/grid.css" layer(layout);
@import "components/button.css" layer(components);
@import "utilities.css"  layer(utilities);
```

> 운영 빌드에서는 `@import` 대신 번들러로 결합하여 직렬 다운로드를 방지한다.

---

## 11. 코드 리뷰 체크리스트

- [ ] 모든 값이 토큰(커스텀 프로퍼티)에서 유래 (하드코딩 없음)
- [ ] `@layer`로 캐스케이드 통제, `!important` 미사용
- [ ] ID 선택자·과도한 특이성 없음
- [ ] 네이밍 규칙(BEM/유틸리티) 준수
- [ ] 모바일 퍼스트, 논리 속성 사용
- [ ] `:focus-visible` 포커스 스타일 존재
- [ ] `prefers-reduced-motion` 대응
- [ ] 미사용 CSS 없음, 셀렉터 단순

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 스타일이 구현하는 디자인 원칙.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — CSS로 스타일링할 컴포넌트 명세.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — CSS 커스텀 프로퍼티의 원천.
- [16 · 접근성](16_ACCESSIBILITY.md) — 포커스·대비·모션 요건.
- [17 · HTML 가이드](17_HTML_GUIDE.md) — 스타일을 적용할 시맨틱 마크업.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 빌드·성능 예산·CSS-in-JS 정책.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
