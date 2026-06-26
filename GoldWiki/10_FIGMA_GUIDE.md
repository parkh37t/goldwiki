# 10 · Figma 작업 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 Figma 작업 표준(파일 구조, 네이밍, variables & styles, 컴포넌트, 오토레이아웃, 퍼블리싱, 핸드오프, 디자인-투-코드)을 정의한다. |
| **대상 독자** | UI 디자이너, BX 디자이너, 인터랙션 디자이너, 프런트엔드 엔지니어, 퍼블리싱 엔지니어 |
| **담당(Owner) 에이전트** | UI Designer (협업: Interaction Designer, Frontend Engineer) |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [디자인 토큰](15_DESIGN_TOKEN.md), [프런트엔드 가이드](20_FRONTEND_GUIDE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 적용 범위

본 표준은 골드위키의 모든 Figma 파일에 적용된다. 목표는 (1) 파일 간 일관성, (2) 디자인-개발 핸드오프 마찰 제거, (3) Figma 변수와 [디자인 토큰](15_DESIGN_TOKEN.md)의 1:1 동기화다.

---

## 2. 파일 · 페이지 구조

### 2.1 파일 분리 전략
| 파일 | 용도 |
| --- | --- |
| `[DS] Goldwiki Foundations` | 변수·스타일·토큰 정의 |
| `[DS] Goldwiki Components` | 컴포넌트 라이브러리(퍼블리시) |
| `[PRJ] <클라이언트>-<프로젝트>` | 프로젝트 작업 파일 |
| `[ARCHIVE] <...>` | 종료 파일 보관 |

### 2.2 표준 페이지 순서(프로젝트 파일)
```
00 · 표지 & 안내(Cover & Readme)
01 · 리서치 & 레퍼런스
02 · 정보구조 & 플로우
03 · 와이어프레임
04 · UI 디자인 (Ready for Dev)
05 · 프로토타입
06 · 폐기/보류(Archive)
```

---

## 3. 네이밍 규칙

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 페이지 | `NN · 이름` | `04 · UI 디자인` |
| 프레임(화면) | `화면ID_화면명` | `LOGIN_로그인` |
| 컴포넌트 | `카테고리/이름` | `Button/Primary` |
| variant 속성 | `속성=값` | `state=hover` |
| 레이어 | 의미 기반 명명 | `card-title` (`Group 12` 금지) |
| 변수 | 토큰명과 동일 | `color/primary` |

> 레이어명은 핸드오프 시 코드 식별자의 단서가 되므로 의미 기반으로 명명한다.

---

## 4. Variables & Styles

### 4.1 변수 컬렉션 구조
| 컬렉션 | 모드 | 내용 |
| --- | --- | --- |
| `Primitives` | 단일 | 원시 값(blue-600 등) |
| `Semantic` | Light / Dark | 별칭(color/primary 등) |
| `Spacing` | 단일 | space-1 ~ space-12 |
| `Radius` | 단일 | radius-sm ~ radius-full |

- 색상은 변수로 관리하고, 텍스트는 텍스트 스타일로 관리한다.
- Semantic 컬렉션의 모드 전환으로 다크모드를 구현한다. ([디자인 토큰](15_DESIGN_TOKEN.md) §테마)

### 4.2 토큰 동기화 규칙
Figma 변수명은 [디자인 토큰](15_DESIGN_TOKEN.md)의 토큰명과 **계층·표기까지 동일**해야 한다(예: `color/primary` ↔ `--color-primary`). 변수 export → Style Dictionary 파이프라인으로 코드 토큰을 생성한다.

---

## 5. 컴포넌트 · Variants

### 5.1 설계 규칙
- 모든 인터랙티브 컴포넌트는 `state` 속성으로 [8개 상태](08_UI_GUIDELINES.md)를 variant로 보유한다.
- Boolean 속성(예: `hasIcon`)과 Instance swap(아이콘 교체)을 활용한다.
- 컴포넌트 설명란에 사용 가이드·접근성 노트를 기재한다.

### 5.2 Button 컴포넌트 변수 예시
| 속성 | 값 |
| --- | --- |
| `variant` | primary / secondary / ghost / danger |
| `size` | sm / md / lg |
| `state` | default / hover / focus / active / disabled / loading |
| `hasIcon` | true / false |

---

## 6. 오토레이아웃(Auto Layout) 규칙

- 모든 컴포넌트·카드·리스트는 오토레이아웃을 사용한다(고정 좌표 배치 금지).
- 간격(gap)·패딩은 [간격 스케일](08_UI_GUIDELINES.md) 토큰 값만 사용한다.
- 리사이징은 의도에 따라 `Hug` / `Fill` / `Fixed`를 명시한다.
- 반응형 동작은 `min/max width` 제약과 함께 정의한다.

| 사용 사례 | 권장 설정 |
| --- | --- |
| 버튼 | 가로 Hug, 패딩 토큰 |
| 카드 | 세로 스택, gap = space-4 |
| 목록 | 세로 Fill, 아이템 Hug |
| 툴바 | 가로 Fill, 양끝 정렬 |

---

## 7. 라이브러리 · 퍼블리싱

```
변경 → 검토(09 거버넌스) → 퍼블리시 → 체인지로그 → 프로젝트 파일 업데이트
```

- 컴포넌트 라이브러리는 `[DS] Goldwiki Components` 파일에서만 퍼블리시한다.
- 퍼블리시 시 변경 설명을 반드시 작성하고 SemVer로 버전을 기록한다. ([09 §5.2](09_DESIGN_SYSTEM.md))
- 프로젝트 파일은 라이브러리 업데이트를 검토 후 수동 수락한다.

---

## 8. 개발 핸드오프

### 8.1 "Ready for Dev" 체크리스트
- [ ] 프레임이 `04 · UI 디자인` 페이지에 정리됨
- [ ] 모든 값이 변수/스타일로 연결됨(분리된 값 0)
- [ ] 상태·반응형·엣지 케이스 프레임 포함
- [ ] 레이어명이 의미 기반으로 정리됨
- [ ] Dev Mode에서 "Ready for dev" 표시
- [ ] 주석으로 인터랙션·검증 규칙 명시

### 8.2 핸드오프 노트 포함 항목
- 인터랙션·애니메이션 사양([모션 토큰](15_DESIGN_TOKEN.md))
- 접근성 노트([16](16_ACCESSIBILITY.md): 포커스 순서, aria-label)
- 반응형 동작 설명

---

## 9. 디자인-투-코드 (Figma MCP)

골드위키는 Figma MCP를 통해 디자인을 코드로 변환한다.

| 단계 | 활동 | 도구 |
| --- | --- | --- |
| 1 | 프레임 선택·컨텍스트 추출 | `get_design_context` |
| 2 | 토큰 매핑 확인 | 변수 ↔ [15](15_DESIGN_TOKEN.md) |
| 3 | 컴포넌트 코드 생성 | Code Connect 매핑 |
| 4 | [프런트엔드 가이드](20_FRONTEND_GUIDE.md) 규약으로 정리 | 리뷰 |

### 9.1 Code Connect 매핑 원칙
Figma 컴포넌트와 코드 컴포넌트를 1:1로 매핑하여, 디자인에서 추출한 코드가 실제 라이브러리 컴포넌트를 참조하도록 한다.

```jsx
// 예시: Button Code Connect 매핑
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "https://figma.com/.../Button", {
  props: {
    variant: figma.enum("variant", {
      primary: "primary",
      secondary: "secondary",
      danger: "danger",
    }),
    size: figma.enum("size", { sm: "sm", md: "md", lg: "lg" }),
    label: figma.string("label"),
  },
  example: ({ variant, size, label }) => (
    <Button variant={variant} size={size}>{label}</Button>
  ),
});
```

---

## 10. 검수 체크리스트

- [ ] 파일·페이지 구조 표준 준수
- [ ] 네이밍 규칙 준수(레이어명 의미 기반)
- [ ] 모든 값이 변수/스타일 연결
- [ ] 오토레이아웃 적용
- [ ] 상태 variant 완비
- [ ] Code Connect 매핑 완료

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — Figma는 시스템의 도구 구현체.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 그리드·간격·상태의 시각 기준.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — Figma 컴포넌트의 코드 짝.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — Figma 변수와 동기화되는 토큰.
- [20 · 프런트엔드 가이드](20_FRONTEND_GUIDE.md) — 디자인-투-코드 산출물의 정리 규약.
- [16 · 접근성](16_ACCESSIBILITY.md) — 핸드오프 접근성 노트 기준.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
