# 09 · 디자인 시스템

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 디자인 시스템(Design System) 아키텍처, 거버넌스, 버전 관리, 기여 모델, 테마 전략을 정의한다. |
| **대상 독자** | UI 디자이너, BX 디자이너, 인터랙션 디자이너, 프런트엔드 엔지니어, 프로덕트 오너 |
| **담당(Owner) 에이전트** | UI Designer (협업: Frontend Engineer, Accessibility Specialist) |
| **참조(상위 문서)** | [UX 원칙](07_UX_PRINCIPLES.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [Figma 가이드](10_FIGMA_GUIDE.md), [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [디자인 토큰](15_DESIGN_TOKEN.md), [접근성](16_ACCESSIBILITY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 디자인 시스템이란

골드위키 디자인 시스템은 **재사용 가능한 표준의 집합 + 이를 운영하는 사람·프로세스·도구**의 총체다. 산출물 일관성을 보장하고, 디자인-개발 간 마찰을 제거하며, 신규 프로젝트의 착수 속도를 높이는 것이 목표다.

### 1.1 단일 출처(Single Source of Truth)
- 시각 토큰의 출처: [디자인 토큰](15_DESIGN_TOKEN.md)
- 컴포넌트 명세의 출처: [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)
- 도구상의 출처: [Figma 가이드](10_FIGMA_GUIDE.md)
- 철학·규칙의 출처: 본 문서와 [UX 원칙](07_UX_PRINCIPLES.md), [UI 가이드라인](08_UI_GUIDELINES.md)

---

## 2. 시스템 원칙

1. **토큰이 진실이다.** 모든 시각 값은 토큰에서 파생한다. 하드코딩 금지.
2. **컴포넌트는 합성한다.** 작은 것에서 큰 것으로 조립한다(원자→분자→유기체).
3. **접근성은 기본값이다.** 모든 컴포넌트는 [WCAG 2.2 AA](16_ACCESSIBILITY.md)를 통과해야 라이브러리에 등재된다.
4. **변경은 추적된다.** 모든 변경은 버전·체인지로그·[의사결정 로그](32_DECISION_LOG.md)에 남는다.
5. **문서 없는 컴포넌트는 존재하지 않는다.** 사용 가이드 없는 자산은 배포하지 않는다.

---

## 3. 아키텍처 — 5계층 모델

골드위키는 아토믹 디자인을 확장한 5계층을 사용한다.

```
파운데이션(Foundation)   ← 원칙, 그리드, 보이스&톤, 접근성 기준
        ↓
토큰(Tokens)            ← color, spacing, radius, typography, shadow, motion
        ↓
컴포넌트(Components)     ← button, input, modal, table … (재사용 단위)
        ↓
패턴(Patterns)          ← 폼 검증, 검색·필터, 빈 상태, 알림 패턴
        ↓
템플릿(Templates)       ← 대시보드, 목록-상세, 결제, 온보딩 레이아웃
```

| 계층 | 정의 | 출처 문서 |
| --- | --- | --- |
| 파운데이션 | 변하지 않는 토대 규칙 | [07](07_UX_PRINCIPLES.md), [08](08_UI_GUIDELINES.md), [16](16_ACCESSIBILITY.md) |
| 토큰 | 명명된 시각 결정 값 | [15 · 디자인 토큰](15_DESIGN_TOKEN.md) |
| 컴포넌트 | 조합 가능한 UI 단위 | [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) |
| 패턴 | 반복되는 문제의 검증된 해법 | 본 문서 §4 |
| 템플릿 | 페이지 단위 조립 | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) |

---

## 4. 패턴 카탈로그(요약)

| 패턴 | 해결 문제 | 구성 컴포넌트 |
| --- | --- | --- |
| 폼 검증 패턴 | 입력 오류 안내 | input + 헬프텍스트 + 에러 |
| 검색·필터 패턴 | 대량 데이터 탐색 | input + select + table + pagination |
| 빈 상태 패턴 | 데이터 부재 안내 | card + 일러스트 + 버튼 |
| 알림 패턴 | 상태 전달 | toast + 배지 |
| 확인 패턴 | 비가역 행동 방지 | modal + 버튼 그룹 |

각 패턴은 [UX 원칙](07_UX_PRINCIPLES.md)의 어떤 원칙을 충족하는지 명시한다(예: 확인 패턴 = 원칙 4 가역성).

---

## 5. 거버넌스 · 버전 관리

### 5.1 운영 체계
- **시스템 오너:** UI Designer 에이전트가 총괄, 변경 승인권 보유.
- **검토 위원회:** UI Designer + Frontend Engineer + Accessibility Specialist 3인.
- **결정 기록:** 모든 채택·폐기는 [의사결정 로그](32_DECISION_LOG.md)에 기록.

### 5.2 버전 관리(SemVer)

| 변경 유형 | 버전 증가 | 예시 |
| --- | --- | --- |
| 파괴적 변경(Breaking) | MAJOR (1.0.0→2.0.0) | 토큰명 변경, props 제거 |
| 기능 추가(Feature) | MINOR (1.0.0→1.1.0) | 신규 컴포넌트·variant |
| 수정(Patch) | PATCH (1.0.0→1.0.1) | 버그·문서 수정 |

### 5.3 폐기(Deprecation) 정책
- 폐기 예정 자산은 1개 MINOR 버전 동안 경고와 함께 유지한다.
- 대체 경로를 체인지로그에 명시한다.

---

## 6. 기여 모델(Contribution Model)

```
제안(Propose) → 검토(Review) → 시범(Prototype) → 채택(Adopt) → 배포(Publish)
```

| 단계 | 활동 | 산출물 |
| --- | --- | --- |
| 제안 | 신규/변경 요청 작성 | 제안서(문제·근거) |
| 검토 | 위원회 평가 | 검토 의견 |
| 시범 | Figma+코드 프로토타입 | 시범 컴포넌트 |
| 채택 | 토큰·문서·접근성 검증 | 명세서 |
| 배포 | 라이브러리 퍼블리시 | 버전 릴리스 |

**등재 기준(Definition of Done)**
- [ ] 토큰만 사용(하드코딩 0)
- [ ] 모든 상태(default/hover/focus/active/disabled/loading/empty/error) 정의
- [ ] [접근성](16_ACCESSIBILITY.md) 통과(키보드·스크린리더·대비)
- [ ] [Figma](10_FIGMA_GUIDE.md) 라이브러리 등재 + 코드 Code Connect 매핑
- [ ] 사용 가이드 문서화([14](14_COMPONENT_LIBRARY.md))

---

## 7. 테마(Theming)

골드위키는 토큰 별칭(alias) 계층으로 다중 테마를 지원한다.

```
글로벌 토큰  → --blue-600: #2563eb
별칭 토큰    → --color-primary: var(--blue-600)
테마 재정의  → [data-theme="dark"] { --color-primary: var(--blue-400); }
```

| 테마 | 용도 | 비고 |
| --- | --- | --- |
| Light(기본) | 일반 환경 | 기준 대비 검증 |
| Dark | 야간·저조도 | 별도 대비 재검증 |
| 클라이언트 브랜드 | 화이트라벨 | 별칭만 교체, 컴포넌트 불변 |

상세 구현은 [디자인 토큰](15_DESIGN_TOKEN.md) §테마/다크모드 참조.

---

## 8. 연관 문서와의 관계도

```
                ┌────────── 09 디자인 시스템 (본 문서: 아키텍처·거버넌스) ──────────┐
                │                                                                  │
        10 Figma 가이드        14 컴포넌트 라이브러리      15 디자인 토큰      16 접근성
        (도구·핸드오프)         (명세·사용 가이드)          (시각 값 출처)     (등재 통과 기준)
```

| 문서 | 본 시스템에서의 역할 |
| --- | --- |
| [10 · Figma 가이드](10_FIGMA_GUIDE.md) | 시스템을 도구 안에서 구현·퍼블리시·핸드오프 |
| [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) | 컴포넌트 계층의 명세·카탈로그 |
| [15 · 디자인 토큰](15_DESIGN_TOKEN.md) | 토큰 계층의 정의·빌드 파이프라인 |
| [16 · 접근성](16_ACCESSIBILITY.md) | 등재 게이트의 합격 기준 |

---

## 9. 성숙도 로드맵

| 분기 | 목표 | 산출물 |
| --- | --- | --- |
| 1단계 | 토큰·핵심 12컴포넌트 확립 | 토큰셋, [14](14_COMPONENT_LIBRARY.md) |
| 2단계 | 패턴·템플릿 라이브러리 | [38](38_TEMPLATE_LIBRARY.md) |
| 3단계 | Code Connect 전면 매핑 | [10](10_FIGMA_GUIDE.md) |
| 4단계 | 다크·브랜드 테마 + 자동 회귀 테스트 | 테마셋, [30](30_TEST_STRATEGY.md) |

---

## 관련 골드위키 문서

- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 파운데이션 계층의 철학.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 파운데이션 계층의 시각 규칙.
- [10 · Figma 가이드](10_FIGMA_GUIDE.md) — 시스템의 도구 구현·핸드오프.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 컴포넌트 계층 명세.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — 토큰 계층 정의·파이프라인.
- [16 · 접근성](16_ACCESSIBILITY.md) — 등재 합격 기준.
- [38 · 템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) — 템플릿 계층.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
