# 19 · JavaScript / TypeScript 표준 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | JavaScript/TypeScript 코딩 표준을 정의하여, 안전하고 읽기 쉬우며 테스트 가능한 클라이언트·프로토타입 코드를 일관되게 작성한다. |
| **대상 독자** | 프론트엔드 엔지니어, 퍼블리싱 엔지니어, API 엔지니어 |
| **담당(Owner) 에이전트** | Frontend Engineer |
| **참조(상위 문서)** | [HTML 가이드](17_HTML_GUIDE.md), [CSS 가이드](18_CSS_GUIDE.md), [디자인 시스템](09_DESIGN_SYSTEM.md) |
| **연계(하위 문서)** | [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [API 표준](22_API_STANDARD.md), [테스트 전략](30_TEST_STRATEGY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 기본 원칙

1. **TypeScript 우선:** 신규 코드는 TypeScript로 작성하고 `strict` 모드를 적용한다. 프로토타입 인라인 스크립트도 JSDoc 타입을 권장한다.
2. **불변성 선호:** `const`를 기본으로 하고, 객체·배열은 가급적 불변으로 다룬다.
3. **순수 함수 지향:** 부수 효과를 경계로 격리하고 입출력이 명확한 함수를 작성한다.
4. **명시적 에러 처리:** 실패를 삼키지 않는다. 모든 비동기 경로에 에러 처리를 둔다.
5. **점진적 향상:** 프로토타입은 JS 없이도 핵심 콘텐츠가 동작하도록 한다([HTML 가이드](17_HTML_GUIDE.md)).

---

## 2. 언어 기능 표준

```ts
// const / let만 사용, var 금지
const MAX_RETRY = 3;
let attempt = 0;

// 구조 분해 + 기본값
function createUser({ name, role = "guest" }: { name: string; role?: string }) {
  return { name, role, createdAt: new Date() };
}

// 옵셔널 체이닝 + 널 병합
const city = user?.address?.city ?? "미지정";

// 템플릿 리터럴
const msg = `${user.name}님, ${user.role} 권한으로 로그인했다.`;

// 전개·나머지 연산자 (불변 갱신)
const next = { ...state, loading: false };
const [first, ...rest] = items;
```

| 권장 | 비권장 |
| --- | --- |
| `const`/`let` | `var` |
| `===` / `!==` | `==` / `!=` |
| 화살표 함수(콜백) | `function`+`bind` 남발 |
| `for...of`, 배열 메서드 | 인덱스 `for` 루프(불필요 시) |
| 옵셔널 체이닝 `?.` | 중첩 `&&` 가드 |
| `Map`/`Set` | 객체를 임의 키맵으로 |

---

## 3. TypeScript 표준

```jsonc
// tsconfig.json (핵심 설정)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true
  }
}
```

```ts
// 도메인 타입: type alias로 명확히
type ProjectStatus = "draft" | "active" | "done";

interface Project {
  readonly id: string;
  title: string;
  status: ProjectStatus;
  ownerId: string;
}

// 제네릭 유틸 — API 응답 래퍼
interface ApiResult<T> {
  data: T;
  meta: { page: number; total: number };
}

// 타입 가드
function isProject(x: unknown): x is Project {
  return typeof x === "object" && x !== null && "status" in x;
}
```

규칙: `any` 금지(불가피하면 `unknown` + 타입 가드), public API에는 명시적 반환 타입, `enum` 대신 유니온 리터럴 + `as const` 선호.

---

## 4. 모듈 구조

```ts
// 명명 내보내기 우선 (트리 셰이킹·자동완성에 유리)
export function formatDate(d: Date): string { /* ... */ }
export function parseQuery(s: string): URLSearchParams { /* ... */ }

// 배럴(barrel) 파일은 신중히 — 순환 참조·번들 비대화 주의
// utils/index.ts
export * from "./date";
export * from "./query";
```

| 규칙 | 내용 |
| --- | --- |
| 모듈 = 하나의 책임 | 파일은 단일 관심사 |
| 명명 내보내기 우선 | 기본 내보내기는 최소화 |
| 절대/별칭 임포트 | `@/utils` 등 경로 별칭 |
| 순환 의존 금지 | 빌드 시 madge 등으로 검출 |

---

## 5. 비동기 패턴

```ts
// async/await 기본. Promise 체인보다 가독성 우선.
async function fetchProject(id: string): Promise<Project> {
  const res = await fetch(`/api/v1/projects/${id}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `프로젝트 조회 실패: ${id}`);
  }
  return res.json() as Promise<Project>;
}

// 병렬 처리 — 독립 작업은 동시에
const [user, projects] = await Promise.all([
  fetchUser(uid),
  fetchProjects(uid),
]);

// 부분 실패 허용
const results = await Promise.allSettled(ids.map(fetchProject));
const ok = results.filter((r) => r.status === "fulfilled");

// 타임아웃·취소 (AbortController)
async function fetchWithTimeout(url: string, ms = 5000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}
```

API 호출 규약(상태 코드, 에러 envelope)은 [API 표준](22_API_STANDARD.md)을 따른다.

---

## 6. 에러 처리

```ts
// 도메인 에러 클래스
class ApiError extends Error {
  constructor(public status: number, message: string, public cause?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

// 호출부: 의미 있는 분기 처리
try {
  const project = await fetchProject(id);
  render(project);
} catch (err) {
  if (err instanceof ApiError && err.status === 404) {
    showNotFound();
  } else {
    reportError(err);          // 관측성 도구로 전송
    showGenericError();
  }
}
```

원칙:

- **빈 `catch` 금지.** 최소한 로깅하거나 재던진다.
- 사용자에게는 친절한 메시지를, 로그에는 상세 컨텍스트를 남긴다.
- 예측 가능한 실패는 결과 타입(`Result<T, E>`)으로, 예외적 실패는 throw로 다룬다.

---

## 7. 프로토타입용 DOM / 이벤트 처리

프로토타입에서 프레임워크 없이 다룰 때의 표준 패턴이다.

```ts
// 안전한 요소 조회 (널 가드)
function $<T extends Element>(sel: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`요소를 찾을 수 없다: ${sel}`);
  return el;
}

// 이벤트 위임 — 동적 목록에 효율적
const list = $<HTMLUListElement>("#todo-list");
list.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-action='delete']");
  if (!btn) return;
  btn.closest("li")?.remove();
});

// 폼 검증 + 동적 오류 표시 (17_HTML_GUIDE의 마크업과 연동)
const form = $<HTMLFormElement>("#contact");
form.addEventListener("submit", (e) => {
  const email = $<HTMLInputElement>("#email", form);
  const err = $<HTMLElement>("#email-error", form);
  if (!email.checkValidity()) {
    e.preventDefault();
    err.hidden = false;
    email.setAttribute("aria-invalid", "true");
    email.focus();
  }
});

// 디바운스 유틸 — 입력·검색에 사용
function debounce<A extends unknown[]>(fn: (...a: A) => void, wait = 250) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
```

접근성을 위해 동적 오류는 `aria-invalid`·`role="alert"`와 함께 노출한다([접근성](16_ACCESSIBILITY.md)).

---

## 8. 상태 관리

| 규모 | 권장 접근 |
| --- | --- |
| 프로토타입 | 단순 모듈 상태 + 이벤트 |
| 소규모 앱 | 신호(signals)·`useState`/`useReducer` |
| 중대형 앱 | 서버 상태(TanStack Query) + 경량 클라이언트 스토어(Zustand) |

```ts
// 프레임워크 독립적 미니 스토어 (관찰 가능 패턴)
function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<(s: T) => void>();
  return {
    get: () => state,
    set: (next: Partial<T>) => {
      state = { ...state, ...next };
      listeners.forEach((fn) => fn(state));
    },
    subscribe: (fn: (s: T) => void) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
```

원칙: 서버 상태와 클라이언트 상태를 분리하고, 파생 상태는 저장하지 말고 계산한다.

---

## 9. 유틸리티 예제 코드

```ts
// 안전한 JSON 파싱
function safeParse<T>(json: string, fallback: T): T {
  try { return JSON.parse(json) as T; } catch { return fallback; }
}

// 통화 포맷 (한국 원화)
const krw = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" });
krw.format(1250000); // "₩1,250,000"

// 상대 시간 포맷
const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
rtf.format(-3, "day"); // "3일 전"

// 배열 그룹화
function groupBy<T, K extends string>(arr: T[], key: (t: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    (acc[key(item)] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
```

---

## 10. 테스트

테스트 전략 전반은 [테스트 전략](30_TEST_STRATEGY.md)을 따른다. 단위 테스트 예시(Vitest)는 다음과 같다.

```ts
import { describe, it, expect } from "vitest";
import { groupBy } from "@/utils/array";

describe("groupBy", () => {
  it("키 함수 기준으로 묶는다", () => {
    const data = [{ t: "a" }, { t: "b" }, { t: "a" }];
    const result = groupBy(data, (x) => x.t);
    expect(result.a).toHaveLength(2);
    expect(result.b).toHaveLength(1);
  });
});
```

| 계층 | 도구 | 대상 |
| --- | --- | --- |
| 단위 | Vitest/Jest | 순수 함수, 유틸 |
| 컴포넌트 | Testing Library | DOM·상호작용 |
| E2E | Playwright | 사용자 시나리오 |

테스트는 구현 세부가 아닌 **동작**을 검증한다(`getByRole` 등 접근성 기반 쿼리 사용).

---

## 11. 린팅 / 포매팅

```jsonc
// eslint (flat config 요약)
// - eslint:recommended + @typescript-eslint/strict-type-checked
// - eslint-plugin-import, jsx-a11y(React 시)
// 핵심 규칙
{
  "no-console": "warn",
  "eqeqeq": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "import/no-cycle": "error"
}
```

- 포매팅은 Prettier로 자동화하고 린트와 역할을 분리한다.
- 커밋 전 `lint-staged` + `husky`로 검사한다.
- CI에서 `tsc --noEmit`, ESLint, 테스트를 게이트로 실행한다([프론트엔드 가이드 §CI](20_FRONTEND_GUIDE.md)).

---

## 12. 코드 리뷰 체크리스트

- [ ] TypeScript `strict` 통과, `any` 없음
- [ ] 모든 비동기 경로에 에러 처리(빈 catch 없음)
- [ ] 부동 Promise(`no-floating-promises`) 없음
- [ ] 불변 갱신·`const` 기본
- [ ] DOM 접근 시 널 가드, 접근성 속성 반영
- [ ] 순환 의존 없음, 명명 내보내기 사용
- [ ] 핵심 로직 단위 테스트 존재
- [ ] ESLint/Prettier/`tsc` 통과

---

## 관련 골드위키 문서

- [17 · HTML 가이드](17_HTML_GUIDE.md) — JS가 제어하는 시맨틱 마크업.
- [18 · CSS 가이드](18_CSS_GUIDE.md) — 스타일/동작 분리 원칙.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 프레임워크·빌드·상태·CI.
- [22 · API 표준](22_API_STANDARD.md) — 클라이언트가 호출하는 API 규약.
- [16 · 접근성](16_ACCESSIBILITY.md) — DOM 동작의 접근성 요건.
- [30 · 테스트 전략](30_TEST_STRATEGY.md) — 테스트 계층과 커버리지 기준.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
