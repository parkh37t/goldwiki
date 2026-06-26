# 15 · 디자인 토큰

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 디자인 토큰(Design Token) 분류·네이밍·전체 토큰셋·테마·빌드 파이프라인을 정의한다. |
| **대상 독자** | UI 디자이너, 프런트엔드 엔지니어, 퍼블리싱 엔지니어 |
| **담당(Owner) 에이전트** | UI Designer (협업: Frontend Engineer) |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [Figma 가이드](10_FIGMA_GUIDE.md), [CSS 가이드](18_CSS_GUIDE.md), [접근성](16_ACCESSIBILITY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 디자인 토큰이란

디자인 토큰은 시각 디자인 결정을 **이름이 부여된 값**으로 추상화한 단위다. 골드위키의 모든 시각 값은 토큰에서 파생하며, 토큰은 디자인([Figma](10_FIGMA_GUIDE.md))과 코드([CSS](18_CSS_GUIDE.md)) 양쪽의 단일 출처다.

---

## 2. 토큰 분류(3계층)

```
글로벌(Global/Primitive)  → 원시 값. 의미 없음.  예) --blue-600: #2563eb
        ↓ 참조
별칭(Alias/Semantic)      → 의미 부여.          예) --color-primary: var(--blue-600)
        ↓ 참조
컴포넌트(Component)        → 컴포넌트 전용.      예) --button-bg: var(--color-primary)
```

| 계층 | 변경 빈도 | 직접 사용 |
| --- | --- | --- |
| 글로벌 | 매우 낮음 | 금지(별칭 통해 사용) |
| 별칭 | 낮음 | 권장 |
| 컴포넌트 | 중간 | 컴포넌트 내부 |

---

## 3. 네이밍 규칙

```
[카테고리]-[속성]-[변형]-[상태]
예) color-text-primary, color-bg-danger-hover, space-4, radius-md
```

- 소문자, 하이픈 구분(kebab-case).
- Figma 변수는 슬래시 표기(`color/text/primary`), CSS는 하이픈(`--color-text-primary`)으로 1:1 대응한다. ([Figma §4.2](10_FIGMA_GUIDE.md))

---

## 4. 전체 예시 토큰셋

### 4.1 JSON (W3C 토큰 형식, Style Dictionary 입력)

```json
{
  "color": {
    "blue":   { "400": { "value": "#60a5fa" }, "600": { "value": "#2563eb" }, "700": { "value": "#1d4ed8" } },
    "gray":   { "50": { "value": "#f9fafb" }, "500": { "value": "#6b7280" }, "900": { "value": "#111827" } },
    "red":    { "600": { "value": "#dc2626" } },
    "green":  { "600": { "value": "#16a34a" } },
    "primary":   { "value": "{color.blue.600}" },
    "danger":    { "value": "{color.red.600}" },
    "success":   { "value": "{color.green.600}" },
    "text":      { "value": "{color.gray.900}" },
    "bg":        { "value": "{color.gray.50}" }
  },
  "space":  { "1": { "value": "4px" }, "2": { "value": "8px" }, "4": { "value": "16px" }, "6": { "value": "24px" }, "8": { "value": "32px" } },
  "radius": { "sm": { "value": "4px" }, "md": { "value": "8px" }, "lg": { "value": "16px" }, "full": { "value": "9999px" } },
  "font":   {
    "family": { "base": { "value": "Pretendard, system-ui, sans-serif" } },
    "size":   { "body": { "value": "16px" }, "h2": { "value": "24px" }, "h1": { "value": "32px" } },
    "weight": { "regular": { "value": "400" }, "semibold": { "value": "600" }, "bold": { "value": "700" } }
  },
  "shadow": {
    "sm": { "value": "0 1px 2px rgba(0,0,0,0.06)" },
    "md": { "value": "0 4px 12px rgba(0,0,0,0.10)" }
  },
  "motion": {
    "duration": { "fast": { "value": "150ms" }, "base": { "value": "250ms" } },
    "easing":   { "standard": { "value": "cubic-bezier(0.2, 0, 0, 1)" } }
  }
}
```

### 4.2 CSS 커스텀 프로퍼티 (Style Dictionary 출력)

```css
:root {
  /* 글로벌 */
  --blue-400: #60a5fa; --blue-600: #2563eb; --blue-700: #1d4ed8;
  --gray-50: #f9fafb; --gray-500: #6b7280; --gray-900: #111827;
  --red-600: #dc2626; --green-600: #16a34a;

  /* 별칭(Semantic) */
  --color-primary: var(--blue-600);
  --color-danger:  var(--red-600);
  --color-success: var(--green-600);
  --color-text:    var(--gray-900);
  --color-bg:      var(--gray-50);
  --color-focus:   var(--blue-600);

  /* 간격 / 반경 */
  --space-1: 4px; --space-2: 8px; --space-4: 16px; --space-6: 24px; --space-8: 32px;
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-full: 9999px;

  /* 타이포 */
  --font-family-base: Pretendard, system-ui, sans-serif;
  --font-size-body: 16px; --font-size-h2: 24px; --font-size-h1: 32px;
  --font-weight-regular: 400; --font-weight-semibold: 600; --font-weight-bold: 700;

  /* 그림자 / 모션 */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10);
  --motion-fast: 150ms; --motion-base: 250ms;
  --motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);

  /* 컴포넌트 토큰 예시 */
  --button-bg: var(--color-primary);
  --button-radius: var(--radius-md);
  --button-padding: var(--space-2) var(--space-4);
}
```

---

## 5. 테마 / 다크모드

별칭 토큰만 재정의하여 컴포넌트 변경 없이 테마를 전환한다.

```css
[data-theme="dark"] {
  --color-bg:   var(--gray-900);
  --color-text: var(--gray-50);
  --color-primary: var(--blue-400); /* 다크 배경 대비 보정 */
  --shadow-md: 0 4px 12px rgba(0,0,0,0.40);
}
```

| 규칙 | 내용 |
| --- | --- |
| 재정의 범위 | 별칭 계층만 (글로벌·컴포넌트 직접 수정 금지) |
| 대비 재검증 | 다크 테마는 [WCAG AA](16_ACCESSIBILITY.md) 대비를 별도 검증 |
| 시스템 연동 | `prefers-color-scheme`로 기본값 결정 가능 |
| 브랜드 테마 | 클라이언트별 별칭 오버라이드(화이트라벨) |

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* 다크 별칭 적용 */ }
}
```

---

## 6. 빌드 / 싱크 파이프라인 (Style Dictionary)

```
Figma 변수  ──export──▶  tokens.json  ──Style Dictionary──▶  ├─ CSS 커스텀 프로퍼티
                                                              ├─ SCSS 변수
                                                              ├─ JS/TS 상수
                                                              └─ iOS/Android 리소스
```

### 6.1 Style Dictionary 설정 예시

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/css/",
      "files": [{ "destination": "tokens.css", "format": "css/variables" }]
    },
    "js": {
      "transformGroup": "js",
      "buildPath": "dist/js/",
      "files": [{ "destination": "tokens.js", "format": "javascript/es6" }]
    }
  }
}
```

### 6.2 동기화 규칙
- 토큰 변경은 Figma 변수 → `tokens.json` → 빌드 순서로만 흐른다(단방향).
- 빌드 산출물은 버전 태그를 달고 [릴리스 프로세스](31_RELEASE_PROCESS.md)를 따른다.
- 토큰 변경(특히 글로벌)은 [SemVer](09_DESIGN_SYSTEM.md) MAJOR/MINOR로 분류한다.

---

## 7. 토큰 사용 규칙(Do/Don't)

| Do | Don't |
| --- | --- |
| `color: var(--color-text)` | `color: #111827` |
| `padding: var(--space-4)` | `padding: 16px` (직접 값) |
| 별칭 토큰 사용 | 글로벌 토큰 직접 사용 |
| 컴포넌트 토큰으로 변형 | 컴포넌트마다 임의 값 |

---

## 8. 검수 체크리스트

- [ ] 3계층 분류를 준수했는가
- [ ] 네이밍 규칙(카테고리-속성-변형-상태)을 따랐는가
- [ ] Figma 변수와 CSS 토큰명이 1:1 대응하는가
- [ ] 다크/브랜드 테마가 별칭만 재정의하는가
- [ ] 다크 테마 대비를 재검증했는가([16](16_ACCESSIBILITY.md))
- [ ] 빌드 파이프라인이 단방향인가

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 토큰 계층의 거버넌스·버전.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 토큰을 사용하는 시각 규칙.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 컴포넌트 토큰 소비처.
- [10 · Figma 가이드](10_FIGMA_GUIDE.md) — Figma 변수와의 동기화.
- [18 · CSS 가이드](18_CSS_GUIDE.md) — CSS 커스텀 프로퍼티 적용 표준.
- [16 · 접근성](16_ACCESSIBILITY.md) — 색상 대비 검증 기준.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
