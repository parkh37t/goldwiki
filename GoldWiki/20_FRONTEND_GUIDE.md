# 20 · 프론트엔드 엔지니어링 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 프론트엔드 스택, 프로젝트 구조, 컴포넌트 아키텍처, 성능 예산, CI 표준을 정의하여 일관되고 고품질인 사용자 인터페이스를 구현한다. |
| **대상 독자** | 프론트엔드 엔지니어, 퍼블리싱 엔지니어, 데브옵스 엔지니어, UI 디자이너 |
| **담당(Owner) 에이전트** | Frontend Engineer |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [HTML 가이드](17_HTML_GUIDE.md), [CSS 가이드](18_CSS_GUIDE.md), [JS 가이드](19_JS_GUIDE.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [API 표준](22_API_STANDARD.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 권장 스택과 근거

| 영역 | 표준 선택 | 근거 |
| --- | --- | --- |
| 프레임워크 | React + TypeScript (또는 Next.js) | 생태계 성숙도, 채용 용이, SSR/RSC 지원 |
| 빌드 도구 | Vite (SPA), Next.js(풀스택) | 빠른 HMR, 최적화된 번들 |
| 스타일 | CSS 모듈 + 디자인 토큰 변수 | [CSS 가이드](18_CSS_GUIDE.md)와 일관, 런타임 비용 없음 |
| 라우팅 | 파일 기반(Next) / TanStack Router | 타입 안전 라우팅 |
| 서버 상태 | TanStack Query | 캐싱·재검증·중복 제거 |
| 클라이언트 상태 | Zustand / Context(소규모) | 경량, 보일러플레이트 최소 |
| 폼 | React Hook Form + Zod | 성능·스키마 검증 일원화 |
| 테스트 | Vitest + Testing Library + Playwright | [테스트 전략](30_TEST_STRATEGY.md) 정합 |

> 스택 변경은 [의사결정 로그](32_DECISION_LOG.md)에 ADR로 기록한다. 프로토타입 단계는 [HTML 가이드](17_HTML_GUIDE.md)의 시맨틱 HTML을 출발점으로 한다.

---

## 2. 프로젝트 구조 (기능 기반)

```
src/
├── app/                  # 라우트·레이아웃·진입점
├── features/             # 기능 단위 (도메인별 응집)
│   └── projects/
│       ├── components/
│       ├── api/          # 데이터 패칭 훅
│       ├── hooks/
│       ├── types.ts
│       └── index.ts      # 공개 API (배럴)
├── components/           # 공용 UI (디자인 시스템 구현)
│   └── ui/               # Button, Card, Modal …
├── lib/                  # 프레임워크 무관 유틸 (19_JS_GUIDE)
├── styles/               # 토큰·전역 CSS (18_CSS_GUIDE)
├── hooks/                # 공용 훅
└── test/                 # 테스트 셋업
```

원칙: 기능(feature) 내부는 자유롭게, 기능 간에는 공개 `index.ts`를 통해서만 의존한다. 횡단 관심사는 `lib`/`components/ui`로 올린다.

---

## 3. 컴포넌트 아키텍처

```tsx
// 프레젠테이션 컴포넌트 — 순수, props만 의존
interface CardProps {
  title: string;
  children: React.ReactNode;
  featured?: boolean;
}
export function Card({ title, children, featured = false }: CardProps) {
  return (
    <article className={`card ${featured ? "card--featured" : ""}`}
             aria-label={title}>
      <h3 className="card__title">{title}</h3>
      <div className="card__body">{children}</div>
    </article>
  );
}

// 컨테이너 컴포넌트 — 데이터·상태 담당
export function ProjectCard({ id }: { id: string }) {
  const { data, isLoading, error } = useProject(id);
  if (isLoading) return <CardSkeleton />;
  if (error) return <ErrorState onRetry={() => location.reload()} />;
  return <Card title={data.title} featured={data.status === "active"}>{data.summary}</Card>;
}
```

| 원칙 | 설명 |
| --- | --- |
| 표현/컨테이너 분리 | 재사용성·테스트 용이 |
| 합성(Composition) 우선 | 상속 대신 children·슬롯 |
| 단일 책임 | 한 컴포넌트는 한 일 |
| 접근성 내장 | [접근성](16_ACCESSIBILITY.md) 준수 — role/aria/포커스 |
| 디자인 토큰 사용 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)·[디자인 토큰](15_DESIGN_TOKEN.md) |

---

## 4. 라우팅 / 상태 / 데이터 패칭

```tsx
// 서버 상태: TanStack Query — 캐싱·재시도·재검증
function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => api.getProject(id),       // 22_API_STANDARD 규약
    staleTime: 60_000,
    retry: 2,
  });
}

// 변경(뮤테이션) + 낙관적 업데이트
function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.updateProject,
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: ["project", vars.id] }),
  });
}
```

| 상태 유형 | 도구 | 메모 |
| --- | --- | --- |
| 서버 상태 | TanStack Query | 단일 출처, 캐시 키 일관 |
| 전역 UI 상태 | Zustand | 테마·모달 등 |
| 지역 상태 | `useState`/`useReducer` | 컴포넌트 내부 |
| URL 상태 | 라우터 검색 파라미터 | 공유·북마크 가능 |

---

## 5. 디자인 시스템 통합

```tsx
// 토큰을 CSS 변수로 참조 — 하드코딩 금지 (18_CSS_GUIDE)
// components/ui/Button.tsx
import styles from "./Button.module.css";

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return <button className={`${styles.btn} ${styles[variant]}`} {...props} />;
}
```

- [컴포넌트 라이브러리(14)](14_COMPONENT_LIBRARY.md)의 명세 = 구현 계약. 컴포넌트는 라이브러리 문서와 1:1 대응한다.
- [디자인 토큰(15)](15_DESIGN_TOKEN.md)은 빌드 시 CSS 변수 + TS 상수로 동시 생성하여 디자인-개발 드리프트를 막는다.
- 컴포넌트 변경은 Storybook 스토리와 시각 회귀 테스트로 검증한다.

---

## 6. 성능 예산 (Core Web Vitals)

| 지표 | 목표(양호) | 한계 |
| --- | --- | --- |
| LCP (최대 콘텐츠 페인트) | < 2.5s | 4.0s |
| INP (다음 페인트까지 상호작용) | < 200ms | 500ms |
| CLS (누적 레이아웃 시프트) | < 0.1 | 0.25 |
| TTFB | < 0.8s | 1.8s |
| JS 초기 번들 (gzip) | < 170KB | 250KB |

성능 기법:

- 코드 분할(라우트·컴포넌트 단위 `lazy`/dynamic import)
- LCP 이미지 `preload` + `fetchpriority="high"` ([HTML 가이드](17_HTML_GUIDE.md))
- 폰트 `font-display: swap`, 서브셋, `woff2`
- 이미지 `srcset`/`sizes`, AVIF/WebP, 화면 밖 lazy
- 서버 컴포넌트/스트리밍으로 클라이언트 JS 최소화
- 메모이제이션은 측정 후 적용(과용 금지)

```tsx
// 라우트 단위 코드 분할
const ReportPage = lazy(() => import("@/features/report/ReportPage"));
```

번들 예산은 CI에서 `size-limit`으로 강제한다.

---

## 7. 빌드 단계 접근성

- 컴포넌트 개발 시 `eslint-plugin-jsx-a11y`로 정적 검사.
- 자동화 검사: `axe-core`(단위/E2E), Lighthouse(접근성 점수 ≥ 95).
- 수동 검사: 키보드 전용 탐색, 스크린리더(NVDA/VoiceOver), 200% 확대.
- 모든 검사는 [접근성(16)](16_ACCESSIBILITY.md) WCAG 2.2 AA 기준과 [품질 체크리스트(29)](29_QUALITY_CHECKLIST.md)를 따른다.

```ts
// 컴포넌트 접근성 테스트 (Vitest + jest-axe)
import { axe } from "vitest-axe";
it("접근성 위반이 없다", async () => {
  const { container } = render(<Button>저장</Button>);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 8. CI 체크

```yaml
# .github/workflows/frontend.yml (요약)
jobs:
  verify:
    steps:
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck     # tsc --noEmit
      - run: pnpm lint          # ESLint + jsx-a11y
      - run: pnpm test          # Vitest (커버리지)
      - run: pnpm build         # 프로덕션 빌드
      - run: pnpm size          # size-limit (번들 예산)
      - run: pnpm e2e           # Playwright (스모크)
      - run: pnpm lhci          # Lighthouse CI (성능·접근성)
```

| 게이트 | 도구 | 통과 기준 |
| --- | --- | --- |
| 타입 | `tsc` | 오류 0 |
| 린트 | ESLint | 오류 0 |
| 단위 테스트 | Vitest | 커버리지 ≥ 80% |
| 번들 크기 | size-limit | 예산 내 |
| 접근성/성능 | Lighthouse CI | 접근성 ≥ 95, 성능 ≥ 90 |
| E2E | Playwright | 핵심 시나리오 통과 |

릴리스 절차는 [릴리스 프로세스(31)](31_RELEASE_PROCESS.md)를 따른다.

---

## 9. 환경 변수 / 설정

```ts
// 타입 안전 환경 변수 검증 (Zod)
import { z } from "zod";
const env = z.object({
  VITE_API_BASE: z.string().url(),
  VITE_ENV: z.enum(["dev", "staging", "prod"]),
}).parse(import.meta.env);
```

- 비밀값을 클라이언트 번들에 포함하지 않는다(공개 키만). 시크릿 관리는 [보안 가이드](24_SECURITY_GUIDE.md).
- 환경별 설정은 빌드 타임에 검증해 잘못된 배포를 차단한다.

---

## 10. 코드 리뷰 체크리스트

- [ ] 기능 기반 구조 준수, 기능 간 공개 API로만 의존
- [ ] 컴포넌트가 [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) 명세와 일치
- [ ] 디자인 토큰 사용, 하드코딩 없음
- [ ] 서버/클라이언트 상태 분리, 캐시 키 일관
- [ ] 성능 예산 충족(번들·CWV)
- [ ] 접근성 검사 통과(axe·키보드)
- [ ] CI 게이트 전부 통과
- [ ] 비밀값 노출 없음

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — UI 일관성의 기반.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 구현 계약이 되는 컴포넌트 명세.
- [17 · HTML 가이드](17_HTML_GUIDE.md) / [18 · CSS 가이드](18_CSS_GUIDE.md) / [19 · JS 가이드](19_JS_GUIDE.md) — 기반 언어 표준.
- [22 · API 표준](22_API_STANDARD.md) — 데이터 패칭 계약.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) / [30 · 테스트 전략](30_TEST_STRATEGY.md) — 품질 게이트.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 배포 절차.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
