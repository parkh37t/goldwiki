# 17 · HTML 표준 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 시맨틱(Semantic) HTML 작성 표준을 정의하여, HTML 프로토타입과 실제 산출물의 접근성·SEO·성능·유지보수성을 일관되게 보장한다. |
| **대상 독자** | 퍼블리싱 엔지니어(Publishing Engineer), 프론트엔드 엔지니어, UI 디자이너, 접근성 전문가 |
| **담당(Owner) 에이전트** | Publishing Engineer |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [접근성](16_ACCESSIBILITY.md) |
| **연계(하위 문서)** | [CSS 가이드](18_CSS_GUIDE.md), [JS 가이드](19_JS_GUIDE.md), [프론트엔드 가이드](20_FRONTEND_GUIDE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 기본 원칙

골드위키 디지털의 모든 마크업은 다음 원칙을 따른다.

1. **시맨틱 우선(Semantics First):** 의미를 가진 요소를 먼저 선택하고, 의미가 없을 때만 `<div>`·`<span>`을 쓴다.
2. **접근성 내장(Accessibility by Default):** 마크업 단계에서 [접근성](16_ACCESSIBILITY.md) WCAG 2.2 AA를 충족한다. ARIA는 네이티브 요소로 표현 불가능할 때만 보조 수단으로 쓴다.
3. **콘텐츠와 표현의 분리:** 시각 스타일은 [CSS 가이드](18_CSS_GUIDE.md), 동작은 [JS 가이드](19_JS_GUIDE.md)로 분리한다. 인라인 스타일·인라인 핸들러를 금지한다.
4. **점진적 향상(Progressive Enhancement):** JavaScript 없이도 핵심 콘텐츠와 내비게이션이 동작해야 한다.
5. **검증 가능성:** 모든 페이지는 W3C 마크업 검사기와 [품질 체크리스트](29_QUALITY_CHECKLIST.md)를 통과한다.

> **핵심 규칙:** "`<div>`를 쓰기 전에, 이 콘텐츠의 의미를 가진 요소가 존재하는가?"를 항상 자문한다.

---

## 2. 문서 구조(Document Skeleton)

모든 HTML 문서는 아래 골격을 기준으로 한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>제품 소개 · Goldwiki Digital</title>
    <meta name="description" content="골드위키 디지털의 엔터프라이즈 디지털 프로덕트 컨설팅 소개." />
    <link rel="canonical" href="https://example.com/products" />
    <link rel="stylesheet" href="/assets/css/main.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">본문 바로가기</a>

    <header class="site-header">
      <nav aria-label="주요 메뉴"><!-- 글로벌 내비게이션 --></nav>
    </header>

    <main id="main">
      <h1>엔터프라이즈 디지털 프로덕트 컨설팅</h1>
      <!-- 페이지 고유 콘텐츠 -->
    </main>

    <footer class="site-footer"><!-- 저작권, 보조 링크 --></footer>

    <script type="module" src="/assets/js/app.js"></script>
  </body>
</html>
```

핵심 규칙:

- `<html lang="ko">`를 항상 명시한다. 다국어 페이지는 언어별로 `lang` 값을 조정한다.
- `<meta charset>`는 `<head>`의 첫 요소여야 한다(인코딩 스니핑 방지).
- 스크립트는 `<body>` 종료 직전에 두거나 `defer`/`type="module"`을 사용해 렌더링을 막지 않는다.
- "본문 바로가기(skip link)"는 키보드 사용자를 위한 필수 요소다([접근성](16_ACCESSIBILITY.md) 참조).

---

## 3. 랜드마크와 시맨틱 요소

### 3.1 페이지 랜드마크

랜드마크는 보조기술 사용자가 페이지 구조를 빠르게 탐색하는 기준점이다.

| 요소 | 역할(role) | 용도 | 페이지당 개수 |
| --- | --- | --- | --- |
| `<header>` | banner | 사이트 헤더(로고, 글로벌 메뉴) | 1 (최상위 1개) |
| `<nav>` | navigation | 내비게이션 그룹 | 여러 개 가능(라벨 필수) |
| `<main>` | main | 페이지 고유 핵심 콘텐츠 | 정확히 1개 |
| `<aside>` | complementary | 보조 콘텐츠(관련 링크, 광고) | 여러 개 가능 |
| `<footer>` | contentinfo | 사이트 푸터 | 1 (최상위 1개) |
| `<section>` | region(라벨 시) | 주제 단위 묶음 | 여러 개 |
| `<article>` | article | 독립적으로 배포 가능한 콘텐츠 단위 | 여러 개 |

`<nav>`가 여러 개라면 반드시 구분 라벨을 붙인다.

```html
<nav aria-label="주요 메뉴">…</nav>
<nav aria-label="푸터 메뉴">…</nav>
<nav aria-label="브레드크럼"><ol>…</ol></nav>
```

### 3.2 `<section>` vs `<article>` vs `<div>`

| 상황 | 선택 |
| --- | --- |
| 독립 배포·재사용 가능한 단위(블로그 글, 상품 카드, 댓글) | `<article>` |
| 제목을 가진 주제 단위 묶음 | `<section>` (가급적 `aria-labelledby`로 제목 연결) |
| 순수 스타일링·레이아웃 목적, 의미 없음 | `<div>` |

```html
<article aria-labelledby="card-1-title">
  <h3 id="card-1-title">RFP 분석 자동화</h3>
  <p>AI 에이전트가 제안요청서를 구조화하여 핵심 요구사항을 추출한다.</p>
  <a href="/services/rfp">자세히 보기</a>
</article>
```

---

## 4. 제목 위계(Heading Hierarchy)

- 페이지당 `<h1>`은 하나만 둔다(페이지 핵심 주제).
- 제목 레벨을 건너뛰지 않는다(`<h2>` 다음에 `<h4>` 금지).
- 제목은 시각적 크기가 아니라 **문서 개요(outline)** 기준으로 선택한다. 크기는 [CSS](18_CSS_GUIDE.md)로 조정한다.

```html
<h1>서비스 개요</h1>
  <h2>UX/UI 전략</h2>
    <h3>디자인 시스템 구축</h3>
    <h3>접근성 검수</h3>
  <h2>프론트엔드 구현</h2>
```

좋지 않은 예와 개선:

```html
<!-- 나쁨: 스타일 목적의 제목 오용 -->
<h4 class="big">대형 배너 문구</h4>

<!-- 좋음: 의미는 단락, 시각 강조는 클래스로 -->
<p class="display-text">대형 배너 문구</p>
```

---

## 5. 텍스트·콘텐츠 시맨틱

| 의미 | 요소 | 비권장 대체 |
| --- | --- | --- |
| 강한 중요도 | `<strong>` | `<b>` (의미 없음) |
| 강조(어조 변화) | `<em>` | `<i>` (의미 없음) |
| 인용 블록 | `<blockquote cite>` | `<div class="quote">` |
| 짧은 인용 | `<q>` | 따옴표 직접 입력 |
| 코드 | `<code>`, `<pre>` | `<span class="code">` |
| 약어 | `<abbr title>` | 일반 텍스트 |
| 시간/날짜 | `<time datetime>` | `<span>` |
| 정의 목록 | `<dl><dt><dd>` | 표 또는 단락 |

```html
<p>
  <strong>중요:</strong> 모든 에이전트는 의사결정 전
  <abbr title="제안요청서">RFP</abbr> 요구사항을 확인한다.
</p>
<p>게시일: <time datetime="2026-06-26">2026년 6월 26일</time></p>
```

---

## 6. 이미지와 미디어

```html
<!-- 정보성 이미지: 의미 있는 대체 텍스트 -->
<img src="/img/dashboard.webp" alt="프로젝트 진척 대시보드, 완료율 78% 표시"
     width="1200" height="675" loading="lazy" decoding="async" />

<!-- 장식용 이미지: 빈 alt로 보조기술에서 숨김 -->
<img src="/img/divider.svg" alt="" role="presentation" />

<!-- 반응형 이미지 -->
<picture>
  <source type="image/avif" srcset="/img/hero.avif" />
  <source type="image/webp" srcset="/img/hero.webp" />
  <img src="/img/hero.jpg" alt="컨설팅 협업 장면" width="1600" height="900" />
</picture>

<!-- 캡션이 있는 그림 -->
<figure>
  <img src="/img/architecture.png" alt="멀티 에이전트 아키텍처 구성도" />
  <figcaption>그림 1. 골드위키 중심의 멀티 에이전트 아키텍처</figcaption>
</figure>
```

규칙:

- `width`/`height`(또는 `aspect-ratio`)를 항상 지정해 레이아웃 시프트(CLS)를 방지한다.
- 스크롤 하단 이미지는 `loading="lazy"`, 첫 화면(LCP) 이미지는 lazy를 쓰지 않는다.
- `alt`는 이미지의 **목적**을 기술한다. "이미지", "사진" 같은 단어는 넣지 않는다.

---

## 7. 폼(Forms)

폼은 접근성과 검증이 가장 자주 누락되는 영역이다. 다음을 표준으로 한다.

```html
<form action="/contact" method="post" novalidate>
  <fieldset>
    <legend>문의 정보</legend>

    <div class="field">
      <label for="name">이름 <span aria-hidden="true">*</span></label>
      <input id="name" name="name" type="text" autocomplete="name"
             required aria-required="true" />
    </div>

    <div class="field">
      <label for="email">이메일</label>
      <input id="email" name="email" type="email" inputmode="email"
             autocomplete="email" required
             aria-describedby="email-hint email-error" />
      <p id="email-hint" class="hint">답변 받을 이메일을 입력한다.</p>
      <p id="email-error" class="error" role="alert" hidden>
        올바른 이메일 형식이 아니다.
      </p>
    </div>

    <fieldset>
      <legend>관심 서비스</legend>
      <label><input type="radio" name="service" value="rfp" /> RFP 분석</label>
      <label><input type="radio" name="service" value="ux" /> UX/UI 전략</label>
      <label><input type="radio" name="service" value="dev" /> 개발 구현</label>
    </fieldset>

    <button type="submit">문의 보내기</button>
  </fieldset>
</form>
```

폼 규칙:

| 규칙 | 이유 |
| --- | --- |
| 모든 입력에 `<label for>` 연결 | 스크린리더·클릭 영역 확대 |
| 적절한 `type`/`inputmode` 사용 | 모바일 키보드 최적화 |
| `autocomplete` 토큰 지정 | 입력 부담 감소, 접근성 향상 |
| 그룹은 `<fieldset>`+`<legend>` | 관계 명확화 |
| 오류는 `aria-describedby`로 연결, `role="alert"` | 동적 오류 안내 |
| 색상만으로 필수 표시 금지 | 색약 사용자 고려 |

자세한 검증 로직과 오류 처리 패턴은 [JS 가이드 §에러 처리](19_JS_GUIDE.md)를 따른다.

---

## 8. 테이블(Tables)

데이터 테이블에만 `<table>`을 쓰고, 레이아웃 목적으로는 절대 쓰지 않는다(레이아웃은 [CSS Grid](18_CSS_GUIDE.md)).

```html
<table>
  <caption>2026년 분기별 프로젝트 현황</caption>
  <thead>
    <tr>
      <th scope="col">분기</th>
      <th scope="col">신규 계약</th>
      <th scope="col">완료</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1분기</th>
      <td>12</td>
      <td>9</td>
    </tr>
    <tr>
      <th scope="row">2분기</th>
      <td>15</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
```

- `<caption>`으로 표 제목을 제공한다.
- 헤더 셀은 `<th scope="col|row">`로 방향을 명시한다.

---

## 9. 인터랙티브 요소

| 동작 | 올바른 요소 | 금지 |
| --- | --- | --- |
| 페이지 이동 | `<a href>` | `<div onclick>`로 이동 |
| 동작 실행(제출/토글) | `<button type>` | `<a href="#">`로 동작 |
| 펼침/접힘 | `<details><summary>` | 수동 JS 토글(필요시에만) |
| 모달/대화상자 | `<dialog>` | `<div role="dialog">` 직접 구현 |

```html
<details>
  <summary>FAQ: 골드위키란 무엇인가?</summary>
  <p>모든 AI 에이전트가 참조하는 단일 진실 공급원(SSOT) 지식베이스다.</p>
</details>

<dialog id="confirm">
  <form method="dialog">
    <p>제출하시겠는가?</p>
    <button value="cancel">취소</button>
    <button value="ok">확인</button>
  </form>
</dialog>
```

`<button>`은 기본 `type`이 `submit`이므로, 폼 내부의 일반 버튼은 반드시 `type="button"`을 지정한다.

---

## 10. 메타데이터와 SEO

```html
<head>
  <title>RFP 분석 자동화 | Goldwiki Digital</title>
  <meta name="description" content="AI 에이전트 기반 RFP 분석으로 제안 적중률을 높인다. 60자 내외 요약." />
  <link rel="canonical" href="https://example.com/services/rfp" />

  <!-- Open Graph (소셜 공유) -->
  <meta property="og:title" content="RFP 분석 자동화" />
  <meta property="og:description" content="AI 에이전트 기반 RFP 분석." />
  <meta property="og:image" content="https://example.com/og/rfp.png" />
  <meta property="og:type" content="website" />

  <!-- 구조화 데이터 (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Goldwiki Digital",
    "url": "https://example.com",
    "description": "엔터프라이즈 디지털 프로덕트 컨설팅"
  }
  </script>
</head>
```

SEO 체크리스트:

- [ ] 고유하고 서술적인 `<title>` (50–60자)
- [ ] `<meta name="description">` (120–160자)
- [ ] 정규 URL `<link rel="canonical">` 지정
- [ ] 의미 있는 제목 위계(`<h1>` 1개)
- [ ] 이미지 `alt` 텍스트 완비
- [ ] Open Graph / 구조화 데이터(JSON-LD) 제공
- [ ] 깨끗한 URL과 `sitemap.xml`, `robots.txt`

---

## 11. 성능 최적화 마크업

```html
<head>
  <!-- 핵심 폰트·LCP 이미지 사전 로드 -->
  <link rel="preload" href="/fonts/pretendard.woff2" as="font"
        type="font/woff2" crossorigin />
  <link rel="preload" href="/img/hero.webp" as="image" fetchpriority="high" />

  <!-- 외부 출처 사전 연결 -->
  <link rel="preconnect" href="https://api.example.com" crossorigin />
  <link rel="dns-prefetch" href="https://cdn.example.com" />
</head>
```

| 기법 | 목적 | 적용 위치 |
| --- | --- | --- |
| `rel="preload"` | 핵심 자원 우선 로드 | 폰트, LCP 이미지 |
| `rel="preconnect"` | 연결 핸드셰이크 선처리 | API·CDN 도메인 |
| `loading="lazy"` | 지연 로딩 | 화면 밖 이미지/iframe |
| `fetchpriority="high"` | 우선순위 상향 | LCP 이미지 |
| `defer` / `type="module"` | 비차단 스크립트 | 모든 스크립트 |
| `width`/`height` 명시 | CLS 방지 | 모든 미디어 |

성능 예산과 Core Web Vitals 목표는 [프론트엔드 가이드 §성능 예산](20_FRONTEND_GUIDE.md)에 정의한다.

---

## 12. 깔끔한 예시 페이지

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>서비스 소개 | Goldwiki Digital</title>
  <meta name="description" content="골드위키 디지털의 4대 핵심 서비스 안내." />
  <link rel="stylesheet" href="/assets/css/main.css" />
</head>
<body>
  <a class="skip-link" href="#main">본문 바로가기</a>
  <header class="site-header">
    <a href="/" class="logo">Goldwiki Digital</a>
    <nav aria-label="주요 메뉴">
      <ul>
        <li><a href="/services" aria-current="page">서비스</a></li>
        <li><a href="/work">사례</a></li>
        <li><a href="/contact">문의</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <h1>4대 핵심 서비스</h1>
    <section aria-labelledby="svc-heading">
      <h2 id="svc-heading">제공 서비스</h2>
      <ul class="card-grid">
        <li>
          <article aria-labelledby="s1">
            <h3 id="s1">RFP 분석 &amp; 제안 전략</h3>
            <p>요구사항 구조화와 적중 전략 수립을 자동화한다.</p>
          </article>
        </li>
        <li>
          <article aria-labelledby="s2">
            <h3 id="s2">UX/UI 전략 &amp; 디자인 시스템</h3>
            <p>일관된 경험과 재사용 가능한 디자인 자산을 구축한다.</p>
          </article>
        </li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Goldwiki Digital</p>
  </footer>
  <script type="module" src="/assets/js/app.js"></script>
</body>
</html>
```

---

## 13. HTML 프로토타입 퍼블리싱 파이프라인

골드위키 디지털의 프로토타입은 HTML로 작성하여 디자인-개발 간 인수인계의 기준 산출물로 삼는다.

| 단계 | 활동 | 담당 | 산출물 |
| --- | --- | --- | --- |
| 1. 토큰 동기화 | [디자인 토큰](15_DESIGN_TOKEN.md)을 CSS 변수로 반영 | Publishing Engineer | `tokens.css` |
| 2. 컴포넌트 마크업 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)를 시맨틱 HTML로 구현 | Publishing Engineer | 컴포넌트 HTML |
| 3. 접근성 검수 | WCAG 2.2 AA, 키보드/스크린리더 테스트 | Accessibility Specialist | 검수 리포트 |
| 4. 성능 점검 | Lighthouse, CWV 측정 | Frontend Engineer | 성능 리포트 |
| 5. 핸드오프 | 프론트엔드 프레임워크로 전환 | Frontend Engineer | 컴포넌트 코드 |

각 단계는 [품질 체크리스트](29_QUALITY_CHECKLIST.md)와 [테스트 전략](30_TEST_STRATEGY.md)을 통과해야 다음 단계로 넘어간다.

---

## 14. 마크업 품질 체크리스트

- [ ] `<!DOCTYPE html>`과 `<html lang>` 명시
- [ ] 랜드마크(`header`/`nav`/`main`/`footer`) 1회씩, `<main>`은 정확히 1개
- [ ] 제목 위계 정상(`<h1>` 1개, 건너뜀 없음)
- [ ] 모든 이미지에 적절한 `alt`
- [ ] 모든 폼 입력에 `<label>` 연결
- [ ] 인터랙티브 요소는 네이티브 요소 사용(`<a>`/`<button>`)
- [ ] 메타 태그(title/description/canonical/OG) 완비
- [ ] 성능 힌트(preload/lazy/width·height) 적용
- [ ] 인라인 스타일·인라인 이벤트 핸들러 없음
- [ ] W3C 마크업 검사기 통과

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 마크업이 따라야 할 디자인 원칙과 토큰 체계.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 시맨틱 HTML로 구현할 컴포넌트 명세.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — HTML/CSS에 주입되는 토큰 정의.
- [16 · 접근성](16_ACCESSIBILITY.md) — WCAG 기준과 ARIA 사용 규칙.
- [18 · CSS 가이드](18_CSS_GUIDE.md) — 마크업과 분리되는 스타일 아키텍처.
- [19 · JS 가이드](19_JS_GUIDE.md) — DOM 동작과 폼 검증 패턴.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 프로토타입의 프레임워크 전환과 성능 예산.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) — 퍼블리싱 품질 게이트.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
