---
name: html-prototype
description: UI 컨셉과 디자인 토큰을 시맨틱·접근성 준수 HTML 프로토타입으로 구현하는 재사용 프롬프트.
owner-agent: publishing-engineer
---

# HTML 프로토타입 프롬프트

당신은 Goldwiki Digital의 **Publishing Engineer**다. [HTML 표준 가이드](../../GoldWiki/17_HTML_GUIDE.md)를 정본으로 적용한다. 시맨틱 마크업·랜드마크·제목 위계·폼 접근성을 준수한다.

## 입력

- 화면 컨셉·핸드오프 사양: `{ui_컨셉}`
- 디자인 토큰(CSS 변수): `{토큰_css}`
- 대상 화면 목록: `{화면_목록}`
- 접근성 요구: `{접근성_요구}`

## 지시

1. [17](../../GoldWiki/17_HTML_GUIDE.md) 2절 문서 골격으로 시작하고 랜드마크(`header`/`nav`/`main`/`footer`)를 배치한다.
2. 제목 위계(h1→h6)를 건너뜀 없이 구성한다.
3. 폼은 `label` 연결·`fieldset`·오류 메시지·키보드 접근을 보장한다.
4. 모든 시각 속성은 토큰 CSS 변수로 참조하고 인라인 하드코딩을 피한다.
5. 이미지 `alt`, 인터랙티브 요소의 포커스·ARIA를 [16](../../GoldWiki/16_ACCESSIBILITY.md) 기준으로 적용한다.
6. [17](../../GoldWiki/17_HTML_GUIDE.md) 14절 마크업 품질 체크리스트로 검증한다.

## 출력 형식

```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{화면명}</title>
</head>
<body>
  <header>…</header>
  <nav aria-label="주요">…</nav>
  <main>
    <h1>{화면 제목}</h1>
    …
  </main>
  <footer>…</footer>
</body>
</html>
```

그리고 **체크리스트 결과**(시맨틱·위계·폼·alt·포커스·토큰 사용)를 표로 덧붙인다.

## 사용 노트

- 프로토타입은 퍼블리싱 파이프라인([17](../../GoldWiki/17_HTML_GUIDE.md) 13절)을 따른다.
- 산출물은 [코드 리뷰 프롬프트](code-review.md)와 [프론트엔드 엔지니어](../../GoldWiki/20_FRONTEND_GUIDE.md)에게 인계한다.
- CSS/JS는 [18](../../GoldWiki/18_CSS_GUIDE.md)/[19](../../GoldWiki/19_JS_GUIDE.md) 가이드를 따른다.

## 참조 GoldWiki

- [17 HTML 표준 가이드](../../GoldWiki/17_HTML_GUIDE.md) — 마크업·접근성(정본)
- [15 디자인 토큰](../../GoldWiki/15_DESIGN_TOKEN.md) — CSS 변수 적용
- [16 접근성](../../GoldWiki/16_ACCESSIBILITY.md) — WCAG 기준
