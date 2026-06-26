# 디자인 시스템 템플릿 (Design System Template)

> **용도**: 디자인 토큰·컴포넌트·패턴·사용 규칙을 단일 소스로 정의해 디자인·퍼블리싱·프론트엔드가 동일 기준을 쓰게 한다.
> **사용 에이전트**: design-system-lead(주), ui-design-lead, publishing-lead, frontend-lead.
> **선행 산출물**: [`UI_Concept_Template.md`](UI_Concept_Template.md)
> **후속 산출물**: [`Publishing_Plan_Template.md`](Publishing_Plan_Template.md) · [`Frontend_Plan_Template.md`](Frontend_Plan_Template.md)
> **관련 GoldWiki**: [09 디자인 시스템](../GoldWiki/09_DESIGN_SYSTEM.md) · [14 컴포넌트 라이브러리](../GoldWiki/14_COMPONENT_LIBRARY.md) · [15 디자인 토큰](../GoldWiki/15_DESIGN_TOKEN.md) · [16 접근성](../GoldWiki/16_ACCESSIBILITY.md)

### 사용 안내
- **토큰이 단일 소스**다. 컴포넌트·코드는 토큰을 참조만 한다(하드코딩 금지).
- 컴포넌트마다 상태(hover/focus/active/disabled)와 접근성 요건을 정의한다.
- 명명 규칙을 먼저 합의하고 일관 적용한다.

---

## 1. 개요

| 항목 | 내용 |
|------|------|
| 시스템명 | {} |
| 버전 | v{1.0} (SemVer) |
| 토큰 단일 소스 | {예: tokens.json} |
| 대상 플랫폼 | Web / Mobile |
| 작성자 / 작성일 | {이름} / {YYYY-MM-DD} |

---

## 2. 디자인 토큰

### 2.1 컬러
| 토큰명 | 값 | 용도 |
|--------|----|------|
| `color.primary.500` | {#______} | {} |
| `color.neutral.900` | {#______} | {텍스트} |
| `color.bg.default` | {#______} | {배경} |

### 2.2 타이포그래피
| 토큰명 | 값 |
|--------|----|
| `font.size.body` | {16px} |
| `font.weight.bold` | {700} |
| `line.height.base` | {1.5} |

### 2.3 간격·반경·그림자
| 토큰명 | 값 |
|--------|----|
| `space.2` | {8px} |
| `radius.md` | {8px} |
| `shadow.1` | {0 1px 2px ...} |

---

## 3. 컴포넌트 카탈로그

| 컴포넌트 | 변형(Variants) | 상태 | 사용 토큰 | 접근성 요건 |
|----------|----------------|------|-----------|-------------|
| Button | primary/secondary/ghost | hover/focus/active/disabled | color.primary, radius.md | 대비 4.5:1, focus ring |
| Input | text/error | default/focus/error/disabled | color.neutral | label 연결, aria-invalid |
| Card | basic/media | default/hover | shadow.1, radius.md | 헤딩 구조 |
| Modal | - | open/closed | shadow.2 | focus trap, ESC 닫기 |

---

## 4. 컴포넌트 상세 (예: Button)

| 속성 | 값 |
|------|----|
| 변형 | primary / secondary / ghost |
| 크기 | sm / md / lg |
| 상태 | default / hover / focus / active / disabled / loading |
| 토큰 | bg=`color.primary.500`, radius=`radius.md` |
| 접근성 | 키보드 포커스 가능, focus 표시, 비활성 시 aria-disabled |

---

## 5. 패턴 & 규칙

| 패턴 | 규칙 |
|------|------|
| 폼 검증 | {실시간 검증, 인라인 오류 메시지} |
| 빈 상태 | {일러스트 + 안내 + 행동 유도} |
| 로딩 | {스켈레톤 우선} |

---

## 6. 명명 & 버전 정책

- 토큰: `{카테고리}.{역할}.{단계}`
- 컴포넌트: PascalCase
- 버전: SemVer(MAJOR.MINOR.PATCH), 파괴적 변경은 MAJOR.

---

## 7. 검증 체크리스트

- [ ] 모든 색상이 토큰에서 파생된다([15](../GoldWiki/15_DESIGN_TOKEN.md)).
- [ ] 컴포넌트가 [14 컴포넌트 라이브러리](../GoldWiki/14_COMPONENT_LIBRARY.md)에 등록된다.
- [ ] 모든 인터랙션 상태가 정의됐다.
- [ ] 접근성 요건([16](../GoldWiki/16_ACCESSIBILITY.md))이 컴포넌트마다 있다.
- [ ] 토큰 하드코딩이 없다.

---

| 작성자 | {이름} | 버전 | v{1.0} | 작성일 | {YYYY-MM-DD} |
|--------|--------|------|--------|--------|---------------|
