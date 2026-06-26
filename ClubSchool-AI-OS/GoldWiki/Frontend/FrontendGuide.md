# 프론트엔드 엔지니어링 가이드

> 이 문서는 GoldWiki(SSOT)에 속한다. 프론트엔드를 구현하기 전, 모든 에이전트는 이 문서와 [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md)·[디자인 시스템](../DesignSystem/README.md)을 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `frontend-lead` |
| **협업 에이전트** | `publishing-lead`, `backend-lead`, `ui-design-lead`, `qa-lead`, `ai-automation-lead` |
| **상위 참조** | [프론트엔드 가이드(번호형)](../20_FRONTEND_GUIDE.md), [JS 가이드(번호형)](../19_JS_GUIDE.md), [디자인 시스템](../DesignSystem/README.md) |
| **연계** | [API 표준(번호형)](../22_API_STANDARD.md), [테스트 전략(번호형)](../30_TEST_STRATEGY.md), [릴리스 프로세스(번호형)](../31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

일관되고 유지보수 가능하며 성능·접근성을 만족하는 프론트엔드를 구현하기 위한 스택, 프로젝트 구조, 컴포넌트 아키텍처, 성능 예산, 접근성, CI 표준을 정의한다.

## 언제 사용하는가

- 신규 웹 앱/SPA/SSR 프로젝트의 기술 결정과 스캐폴딩.
- 퍼블리싱 산출물을 컴포넌트로 전환할 때.
- 성능·접근성 회귀를 방지하는 CI 게이트를 구성할 때.
- 코드 리뷰·아키텍처 검토(`cto-reviewer`)의 기준이 필요할 때.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 시맨틱 마크업·토큰 | [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md) |
| 컴포넌트 명세 | [컴포넌트 라이브러리(번호형)](../14_COMPONENT_LIBRARY.md) |
| API 계약 | [백엔드 가이드](../Backend/BackendGuide.md), [API 표준(번호형)](../22_API_STANDARD.md) |
| 비기능 요구(성능/접근성) | [접근성(번호형)](../16_ACCESSIBILITY.md), 본 문서 성능 예산 |

## 처리 방식

### 1) 권장 스택

| 영역 | 표준 | 근거 |
| --- | --- | --- |
| 프레임워크 | React + TypeScript / Next.js | 생태계·SSR/RSC·채용 용이 |
| 빌드 | Vite(SPA) / Next(풀스택) | 빠른 HMR, 최적 번들 |
| 스타일 | CSS Modules + 디자인 토큰 | [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md)와 정합, 런타임 0 |
| 서버 상태 | TanStack Query | 캐싱·재검증·중복 제거 |
| 클라이언트 상태 | Zustand / Context | 경량 |
| 폼 | React Hook Form + Zod | 검증 일원화 |
| 테스트 | Vitest + Testing Library + Playwright | [테스트 전략](../30_TEST_STRATEGY.md) 정합 |

스택 변경은 [의사결정 로그](../DecisionLog/README.md)에 ADR로 기록한다.

### 2) 프로젝트 구조 (기능 단위 colocation)

```
src/
  app/                 # 라우팅·진입점
  features/
    proposal/
      api/             # 해당 기능 API 훅
      components/
      hooks/
      types.ts
      index.ts
  shared/
    ui/                # 디자인 시스템 컴포넌트
    lib/ hooks/ utils/
  styles/tokens.css
```

기능 간 직접 import 금지(`shared`를 경유). 배럴(`index.ts`)로 공개 표면을 최소화한다.

### 3) 컴포넌트 아키텍처

- **표현/컨테이너 분리**: 데이터 패칭은 훅, UI는 순수 컴포넌트.
- **합성 우선**: 큰 prop 덩어리 대신 children/슬롯 합성.
- **타입 안전**: `any` 금지, props는 명시적 인터페이스, 외부 데이터는 Zod로 파싱.

```tsx
export function ProposalList() {
  const { data, isLoading, error } = useProposals();   // TanStack Query
  if (isLoading) return <Skeleton rows={5} />;
  if (error) return <ErrorState onRetry={refetch} />;
  return (
    <ul aria-label="제안서 목록">
      {data.map((p) => <ProposalCard key={p.id} proposal={p} />)}
    </ul>
  );
}
```

### 4) 성능 예산 (납품 게이트)

| 지표 | 예산 |
| --- | --- |
| LCP | < 2.5s (모바일 4G) |
| INP | < 200ms |
| CLS | < 0.1 |
| 초기 JS(gzip) | < 170KB |
| Lighthouse 성능 | ≥ 90 |

기법: 코드 스플리팅(`React.lazy`/동적 import), 이미지 lazy + 명시 크기, 폰트 preload + `swap`, 메모이제이션은 측정 후 적용.

### 5) 접근성

키보드 전체 조작, 포커스 관리(모달 트랩/복원), `prefers-reduced-motion` 대응, axe-core를 CI에 통합. 상세는 [접근성(번호형)](../16_ACCESSIBILITY.md).

### 6) CI 파이프라인

```yaml
# .github/workflows/frontend.yml (발췌)
jobs:
  ci:
    steps:
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm typecheck
      - run: pnpm test --coverage
      - run: pnpm build
      - run: pnpm exec playwright test
      - run: pnpm exec lhci autorun   # 성능 예산 검사
```

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| 애플리케이션 코드 | 기능 단위 구조, 타입 안전 |
| 컴포넌트 스토리/문서 | Storybook 또는 MDX |
| 테스트 스위트 | 단위·통합·E2E |
| CI 설정 | lint/type/test/build/perf 게이트 |
| 성능·접근성 리포트 | Lighthouse·axe |

## 품질 기준

- [ ] TypeScript strict, `any` 0건.
- [ ] 핵심 경로 테스트 커버리지 ≥ 80%.
- [ ] 성능 예산 전 항목 충족.
- [ ] axe critical 0건, 키보드 전체 조작.
- [ ] API 응답은 Zod로 파싱 후 사용.
- [ ] ESLint/Prettier 통과, 콘솔 에러 0건.

## 체크리스트

- [ ] 디자인 토큰만 사용(하드코딩 0).
- [ ] 로딩/에러/빈 상태 모두 구현.
- [ ] 라우트 단위 코드 스플리팅.
- [ ] 환경변수·시크릿 클라이언트 노출 0건.
- [ ] 의존성 변경 시 [의사결정 로그](../DecisionLog/README.md) 기록.

## 예시 프롬프트

```
역할: frontend-lead. GoldWiki Frontend/FrontendGuide.md, 22_API_STANDARD.md를 먼저 읽어라.
작업: '제안서 대시보드' 페이지를 React+TS로 구현. TanStack Query로 /api/proposals 연동.
제약: 기능 단위 구조, 성능 예산 충족, 로딩/에러/빈 상태 포함, axe critical 0.
출력: 컴포넌트·훅·테스트·Lighthouse 리포트. backend-lead와 API 계약 확인, qa-lead에 핸드오프.
```

---

### 관련 문서
[Frontend README](README.md) · [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md) · [백엔드 가이드](../Backend/BackendGuide.md) · [20_FRONTEND_GUIDE](../20_FRONTEND_GUIDE.md) · [30_TEST_STRATEGY](../30_TEST_STRATEGY.md)
