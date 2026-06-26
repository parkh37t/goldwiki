# 16 · 접근성

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 접근성 표준(WCAG 2.2 AA, POUR, 시맨틱 HTML, ARIA, 키보드·포커스, 색대비, 폼·에러, 테스트, 감사 체크리스트)을 정의한다. |
| **대상 독자** | 접근성 전문가, UI 디자이너, 퍼블리싱 엔지니어, 프런트엔드 엔지니어, QA 엔지니어 |
| **담당(Owner) 에이전트** | Accessibility Specialist (협업: Publishing Engineer, QA Engineer) |
| **참조(상위 문서)** | [UX 원칙](07_UX_PRINCIPLES.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [디자인 토큰](15_DESIGN_TOKEN.md), [HTML 가이드](17_HTML_GUIDE.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 목표 수준

골드위키의 모든 산출물은 **WCAG 2.2 레벨 AA**를 기본 목표로 한다. 접근성은 [UX 원칙](07_UX_PRINCIPLES.md) 원칙 6에 따라 선택이 아닌 필수이며, 컴포넌트 등재의 합격 게이트다.

---

## 2. POUR 4대 원칙

| 원칙 | 의미 | 핵심 요구 |
| --- | --- | --- |
| Perceivable(인식) | 정보를 인지 가능하게 | 대체 텍스트, 자막, 대비 |
| Operable(운용) | 조작 가능하게 | 키보드 접근, 충분한 시간 |
| Understandable(이해) | 이해 가능하게 | 명확한 레이블·에러 |
| Robust(견고) | 보조기술 호환 | 유효한 시맨틱·ARIA |

---

## 3. WCAG 2.2 핵심 성공 기준(AA 발췌)

| 기준 | 요구 | 적용 |
| --- | --- | --- |
| 1.4.3 명도 대비 | 본문 4.5:1, 대형 3:1 | [디자인 토큰](15_DESIGN_TOKEN.md) 색 검증 |
| 1.4.11 비텍스트 대비 | UI·그래픽 3:1 | 경계선·아이콘 |
| 2.1.1 키보드 | 모든 기능 키보드 가능 | 포커스 관리 |
| 2.4.7 포커스 가시성 | 포커스 표시 | 포커스 링 유지([08](08_UI_GUIDELINES.md)) |
| 2.4.11 포커스 가려짐 없음(2.2 신규) | 포커스 요소 비가림 | 고정 헤더 주의 |
| 2.5.8 타깃 크기(2.2 신규) | 최소 24×24px | 터치 44px 권장 |
| 3.3.7 중복 입력 방지(2.2 신규) | 이전 입력 재요구 금지 | 자동 채움 |
| 4.1.2 이름·역할·값 | 보조기술에 전달 | 적절한 ARIA |

---

## 4. 시맨틱 HTML 우선

ARIA보다 **네이티브 시맨틱 요소를 우선**한다("No ARIA is better than bad ARIA").

```html
<!-- 권장 -->
<button>저장</button>
<nav aria-label="주요">…</nav>
<main>…</main>

<!-- 지양 -->
<div role="button" tabindex="0" onclick="…">저장</div>
```

| 용도 | 권장 요소 |
| --- | --- |
| 행동 | `<button>` |
| 이동 | `<a href>` |
| 구조 | `<header><nav><main><footer>` |
| 목록 | `<ul><ol><dl>` |
| 표 | `<table><th scope>` |

---

## 5. ARIA 규칙

1. 네이티브 요소로 가능하면 ARIA를 쓰지 않는다.
2. 네이티브 시맨틱을 ARIA로 덮어쓰지 않는다.
3. 모든 인터랙티브 ARIA 요소는 키보드 조작이 가능해야 한다.
4. 포커스 가능한 요소를 `aria-hidden="true"`로 숨기지 않는다.
5. 모든 ARIA 위젯에 접근 가능한 이름을 부여한다.

| 패턴 | 핵심 ARIA |
| --- | --- |
| 모달 | `role="dialog"` `aria-modal` `aria-labelledby` |
| 탭 | `role="tablist/tab/tabpanel"` `aria-selected` |
| 토스트 | `role="status"` / `role="alert"` |
| 라이브 영역 | `aria-live="polite/assertive"` |

---

## 6. 키보드 · 포커스 관리

| 키 | 동작 |
| --- | --- |
| Tab / Shift+Tab | 다음/이전 포커스 |
| Enter / Space | 활성화 |
| Esc | 닫기·취소 |
| 화살표 | 그룹 내 이동(탭·메뉴·라디오) |

**포커스 관리 규칙**
- 논리적 포커스 순서(DOM 순서 = 시각 순서).
- 모달은 포커스 트랩, 닫힐 때 트리거로 복귀.
- 페이지 상단에 "본문 바로가기(Skip to content)" 링크 제공.
- `tabindex` 양수 값 사용 금지(0과 -1만).

```html
<a class="skip-link" href="#main">본문 바로가기</a>
```

---

## 7. 색상 대비

- 색상만으로 정보를 전달하지 않는다(아이콘·텍스트·패턴 병기). ([UI §5](08_UI_GUIDELINES.md))
- 대비 검증은 토큰 색 조합 단위로 수행한다.

| 조합 | 요구 대비 |
| --- | --- |
| 본문 텍스트/배경 | ≥ 4.5:1 |
| 대형 텍스트(18.66px Bold/24px) | ≥ 3:1 |
| UI 컴포넌트·아이콘 | ≥ 3:1 |
| 포커스 표시 | ≥ 3:1 |

---

## 8. 폼 · 에러 접근성

- 모든 입력에 `<label for>` 연결(placeholder 대체 금지).
- 오류는 `aria-invalid="true"` + `aria-describedby`로 메시지 연결.
- 제출 시 오류 요약을 상단에 두고 첫 오류로 포커스 이동.
- 필수 표시는 색·기호만이 아니라 텍스트로도 안내.

```html
<label for="pw">비밀번호 (필수)</label>
<input id="pw" type="password" required aria-invalid="true" aria-describedby="pw-err" />
<p id="pw-err" role="alert">8자 이상, 특수문자를 1개 이상 포함해 주세요.</p>
```

---

## 9. 테스트

### 9.1 도구·기법 매트릭스
| 방법 | 도구/대상 | 커버리지 |
| --- | --- | --- |
| 자동 검사 | axe, Lighthouse | 약 30–40%(기계 검출 가능 항목) |
| 키보드 테스트 | Tab만으로 전 과업 | 운용성 |
| 스크린리더 | NVDA, VoiceOver | 인식·이름·역할 |
| 확대 | 200%·400% 줌 | 리플로우 |
| 색각 시뮬 | 색맹 필터 | 색 의존성 |

> 자동 검사만으로는 충분하지 않다. 수동 키보드·스크린리더 테스트를 반드시 병행한다.

### 9.2 axe 검사 예시 (CI 연동)
```js
import { axe } from "jest-axe";
test("페이지에 접근성 위반이 없어야 한다", async () => {
  const { container } = render(<Page />);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 10. 접근성 감사 체크리스트

| 영역 | 체크 항목 |
| --- | --- |
| 구조 | [ ] 시맨틱 랜드마크(`header/nav/main/footer`) |
| 이미지 | [ ] 의미 이미지 `alt`, 장식 `alt=""` |
| 대비 | [ ] 본문 4.5:1, UI 3:1 |
| 키보드 | [ ] 모든 기능 키보드 가능, 포커스 가시 |
| 포커스 | [ ] 트랩·복귀·논리적 순서·Skip 링크 |
| 폼 | [ ] 레이블 연결, 에러 연결, 오류 요약 |
| 동적 | [ ] 라이브 영역으로 변경 알림 |
| 미디어 | [ ] 자막·대본 제공 |
| 모션 | [ ] `prefers-reduced-motion` 존중 |
| 언어 | [ ] `<html lang="ko">` |

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 11. 컴포넌트별 접근성은 어디에

각 컴포넌트의 구체 접근성 노트는 [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)의 각 항목 A11y 섹션에 있다. 본 문서는 전사 표준을, [14](14_COMPONENT_LIBRARY.md)는 컴포넌트 단위 적용을 담당한다.

---

## 관련 골드위키 문서

- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 접근성 내재화 원칙(원칙 6).
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 대비·포커스·터치 타깃 시각 규칙.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 컴포넌트별 접근성 노트.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — 색 대비 검증 대상.
- [17 · HTML 가이드](17_HTML_GUIDE.md) — 시맨틱 마크업 규약.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) — 출시 전 접근성 게이트.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
