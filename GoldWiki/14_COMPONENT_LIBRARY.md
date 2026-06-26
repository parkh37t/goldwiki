# 14 · 컴포넌트 라이브러리

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 핵심 UI 컴포넌트 카탈로그(해부구조, props/variants/states, 사용 가이드, 접근성 노트, 예시 마크업)를 정의한다. |
| **대상 독자** | UI 디자이너, 프런트엔드 엔지니어, 퍼블리싱 엔지니어, 접근성 전문가 |
| **담당(Owner) 에이전트** | UI Designer (협업: Frontend Engineer, Accessibility Specialist) |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [디자인 토큰](15_DESIGN_TOKEN.md), [접근성](16_ACCESSIBILITY.md), [Figma 가이드](10_FIGMA_GUIDE.md), [HTML 가이드](17_HTML_GUIDE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 카탈로그 사용 규칙

- 모든 컴포넌트는 [디자인 토큰](15_DESIGN_TOKEN.md)만 사용하며 하드코딩을 금지한다.
- 모든 컴포넌트는 [8개 상태](08_UI_GUIDELINES.md)와 [접근성](16_ACCESSIBILITY.md) 기준을 충족해야 등재된다.
- 각 항목은 **해부구조 / props·variants / states / 사용 가이드 / 접근성 노트 / 예시 마크업** 순서로 기술한다.

### 컴포넌트 명세 공통 표기
| 키 | 의미 |
| --- | --- |
| Anatomy | 구성 요소 분해 |
| Props | 설정 가능한 속성 |
| Variants | 시각 변형 |
| States | 상태 |
| A11y | 접근성 노트 |

---

## 2. Button(버튼)

- **Anatomy:** 컨테이너 + (선택)아이콘 + 레이블
- **Props:** `variant`, `size`, `disabled`, `loading`, `iconLeft`, `iconRight`
- **Variants:** primary / secondary / ghost / danger
- **States:** default, hover, focus, active, disabled, loading
- **사용 가이드:** 화면당 primary 1개. 파괴적 행동은 danger + 확인 모달.
- **A11y:** 아이콘 전용은 `aria-label` 필수. `loading` 시 `aria-busy="true"`.

```html
<button class="btn btn--primary" type="button">저장</button>
<button class="btn btn--danger" type="button">삭제</button>
<button class="btn btn--primary" aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span> 저장 중…
</button>
```

---

## 3. Input(입력 필드)

- **Anatomy:** 레이블 + 입력 + 헬프텍스트/에러 + (선택)아이콘
- **Props:** `type`, `label`, `placeholder`, `value`, `error`, `required`, `disabled`
- **States:** default, focus, filled, error, disabled
- **사용 가이드:** placeholder를 레이블 대체로 쓰지 않는다. 에러는 인라인+원인 설명.
- **A11y:** `label[for]` 연결. 에러는 `aria-describedby`로 연결, `aria-invalid="true"`.

```html
<div class="field">
  <label for="email">이메일</label>
  <input id="email" type="email" required
         aria-invalid="true" aria-describedby="email-err" />
  <p id="email-err" class="field__error">이메일 형식이 올바르지 않습니다.</p>
</div>
```

---

## 4. Select(선택)

- **Anatomy:** 레이블 + 트리거 + 옵션 목록
- **Props:** `options`, `value`, `multiple`, `searchable`, `disabled`
- **States:** default, focus, open, selected, disabled
- **사용 가이드:** 옵션 5개 이하면 라디오 고려. 7개 이상이면 검색 제공.
- **A11y:** 네이티브 `<select>` 우선. 커스텀은 `role="listbox"`/`role="option"`, 화살표 키 탐색 지원.

```html
<label for="region">지역</label>
<select id="region" name="region">
  <option value="">선택하세요</option>
  <option value="seoul">서울</option>
  <option value="busan">부산</option>
</select>
```

---

## 5. Modal(모달)

- **Anatomy:** 오버레이 + 컨테이너 + 헤더(제목·닫기) + 본문 + 푸터(행동)
- **Props:** `open`, `title`, `size`, `dismissible`
- **States:** open, closing
- **사용 가이드:** 비가역 행동 확인·집중 과업에 사용. 중첩 모달 금지.
- **A11y:** `role="dialog"` + `aria-modal="true"`, 포커스 트랩, ESC로 닫기, 열릴 때 첫 포커스·닫힐 때 트리거로 복귀.

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <h2 id="m-title">정말 삭제하시겠습니까?</h2>
  <p>이 작업은 되돌릴 수 없습니다.</p>
  <div class="modal__footer">
    <button class="btn btn--ghost">취소</button>
    <button class="btn btn--danger">삭제</button>
  </div>
</div>
```

---

## 6. Table(테이블)

- **Anatomy:** caption + thead + tbody + (선택)정렬·페이지네이션
- **Props:** `columns`, `data`, `sortable`, `selectable`, `stickyHeader`
- **States:** default, loading(스켈레톤), empty, error
- **사용 가이드:** 빈 상태는 빈 상태 패턴 적용. 모바일은 카드형 전환 고려.
- **A11y:** `<th scope="col/row">`, 정렬 상태는 `aria-sort`로 표기.

```html
<table>
  <caption>주문 내역</caption>
  <thead>
    <tr><th scope="col" aria-sort="descending">주문일</th><th scope="col">상태</th></tr>
  </thead>
  <tbody>
    <tr><td>2026-06-20</td><td>배송 완료</td></tr>
  </tbody>
</table>
```

---

## 7. Tabs(탭)

- **Anatomy:** 탭 리스트 + 탭 + 탭 패널
- **Props:** `tabs`, `activeIndex`, `orientation`
- **States:** default, active, focus, disabled
- **사용 가이드:** 동등한 콘텐츠 그룹 전환에 사용. 탭 7개 이하 권장.
- **A11y:** `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, 화살표 키 이동.

```html
<div role="tablist" aria-label="설정">
  <button role="tab" aria-selected="true" id="t1" aria-controls="p1">계정</button>
  <button role="tab" aria-selected="false" id="t2" aria-controls="p2">알림</button>
</div>
<div role="tabpanel" id="p1" aria-labelledby="t1">…</div>
```

---

## 8. Toast(토스트)

- **Anatomy:** 컨테이너 + 아이콘 + 메시지 + (선택)행동/닫기
- **Props:** `variant`, `message`, `duration`, `action`
- **Variants:** success / info / warning / error
- **사용 가이드:** 짧은 비차단 알림에 사용. 중요·비가역 정보는 모달로.
- **A11y:** `role="status"`(정보) 또는 `role="alert"`(오류), 자동 소멸 시 충분한 시간 보장.

```html
<div class="toast toast--success" role="status">
  저장되었습니다. <button class="toast__action">실행 취소</button>
</div>
```

---

## 9. Nav(내비게이션)

- **Anatomy:** 컨테이너 + 로고 + 메뉴 항목 + 보조 영역
- **Props:** `items`, `currentPath`, `variant`(top/side)
- **States:** default, hover, current, disabled
- **사용 가이드:** 현재 위치를 명확히 표시. 모바일은 햄버거+드로어.
- **A11y:** `<nav aria-label>`, 현재 항목 `aria-current="page"`, 키보드 탐색.

```html
<nav aria-label="주요">
  <ul>
    <li><a href="/" aria-current="page">홈</a></li>
    <li><a href="/products">상품</a></li>
  </ul>
</nav>
```

---

## 10. Card(카드)

- **Anatomy:** 컨테이너 + (선택)미디어 + 제목 + 본문 + (선택)행동
- **Props:** `title`, `media`, `actions`, `clickable`
- **States:** default, hover, focus(클릭형)
- **사용 가이드:** 카드 전체를 링크로 만들 때 중첩 인터랙티브 요소 주의.
- **A11y:** 클릭형 카드는 단일 링크로 감싸고 내부 버튼 중복을 피한다.

```html
<article class="card">
  <h3 class="card__title">베이직 요금제</h3>
  <p>월 9,900원으로 핵심 기능을 모두.</p>
  <button class="btn btn--primary">선택</button>
</article>
```

---

## 11. Form(폼)

- **Anatomy:** form + fieldset/legend + 필드 그룹 + 검증 요약 + 제출
- **Props:** `onSubmit`, `validation`, `layout`
- **States:** default, validating, error, submitting, success
- **사용 가이드:** 관련 필드는 fieldset로 묶고, 제출 시 첫 오류로 포커스 이동.
- **A11y:** 검증 요약을 상단에 두고 각 오류로 점프 링크 제공. 필수 표시는 텍스트로도.

```html
<form novalidate>
  <fieldset>
    <legend>배송지</legend>
    <div class="field">
      <label for="addr">주소 <span aria-hidden="true">*</span></label>
      <input id="addr" required aria-required="true" />
    </div>
  </fieldset>
  <button class="btn btn--primary" type="submit">주문하기</button>
</form>
```

---

## 12. Pagination(페이지네이션)

- **Anatomy:** 이전 + 페이지 번호 + 다음 + (선택)전체 개수
- **Props:** `currentPage`, `totalPages`, `onChange`
- **States:** default, current, disabled(양 끝)
- **사용 가이드:** 무한 스크롤 대신 명확한 페이지 제어가 필요할 때 사용.
- **A11y:** `<nav aria-label="페이지">`, 현재 `aria-current="page"`, 비활성 끝 버튼 `disabled`.

```html
<nav aria-label="페이지">
  <a href="?p=1" rel="prev">이전</a>
  <a href="?p=1" aria-current="page">1</a>
  <a href="?p=2">2</a>
  <a href="?p=2" rel="next">다음</a>
</nav>
```

---

## 13. Tooltip(툴팁)

- **Anatomy:** 트리거 + 팝업 내용 + 포인터
- **Props:** `content`, `placement`, `delay`
- **States:** hidden, visible
- **사용 가이드:** 보조 설명 한정. 필수 정보는 본문에 노출(툴팁 의존 금지).
- **A11y:** `aria-describedby`로 연결, 포커스·호버 모두에서 표시, ESC로 닫힘.

```html
<button aria-describedby="tip-1">도움말</button>
<span role="tooltip" id="tip-1">비밀번호는 8자 이상이어야 합니다.</span>
```

---

## 14. 컴포넌트 등재 체크리스트

- [ ] 토큰만 사용(하드코딩 0)
- [ ] 모든 상태 정의
- [ ] [접근성](16_ACCESSIBILITY.md): 키보드·스크린리더·대비 통과
- [ ] [Figma](10_FIGMA_GUIDE.md) variant + Code Connect 매핑
- [ ] 사용 가이드·예시 마크업 문서화
- [ ] [HTML 가이드](17_HTML_GUIDE.md) 시맨틱 규약 준수

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 컴포넌트 계층의 거버넌스.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 상태·시각 규칙.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — 컴포넌트 시각 값의 출처.
- [16 · 접근성](16_ACCESSIBILITY.md) — 컴포넌트별 접근성 기준.
- [10 · Figma 가이드](10_FIGMA_GUIDE.md) — Figma 컴포넌트·Code Connect.
- [17 · HTML 가이드](17_HTML_GUIDE.md) — 시맨틱 마크업 규약.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
