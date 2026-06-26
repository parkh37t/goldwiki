# UI 가이드라인 (UI Guidelines)

Goldwiki Digital(골드위키 디지털)의 화면 단위 UI 설계 규칙. **그리드·타이포그래피·색상·상태·반응형**을 표준화하여 모든 화면이 일관·접근 가능·구현 가능하도록 한다.

> 이 문서를 쓰는 에이전트는 [08_UI_GUIDELINES](../08_UI_GUIDELINES.md), [07_UX_PRINCIPLES](../07_UX_PRINCIPLES.md), [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md)을 먼저 참조한다. 모든 수치는 디자인 토큰을 단일 출처로 사용한다.

---

## 목적

- 레이아웃·타이포·색·상태·반응형의 일관된 시각 규칙을 정의한다.
- 디자인 토큰([../DesignSystem/DesignSystemGuide](../DesignSystem/DesignSystemGuide.md))을 화면에 적용하는 규칙을 규정한다.
- 접근성([16_ACCESSIBILITY](../16_ACCESSIBILITY.md)) 기준을 시각 규칙에 내재화한다.

## 언제 사용하는가

| 시점 | 사용 목적 |
| --- | --- |
| 와이어프레임→UI | 시각 규칙 적용 |
| 컴포넌트 설계 | 상태·간격·타이포 정의 |
| 디자인 리뷰 | 일관성·접근성 점검 |
| 핸드오프 | 퍼블리싱/프런트 명세 |

## 입력 정보

- 유저 플로우·화면 목록: [../UX/UserFlowGuide](../UX/UserFlowGuide.md)
- 디자인 토큰: [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md)
- 브랜드 비주얼 아이덴티티: [../Brand/BXGuidelines](../Brand/BXGuidelines.md)
- 접근성 기준(WCAG 2.2 AA): [16_ACCESSIBILITY](../16_ACCESSIBILITY.md)

## 처리 방식

### 그리드 & 레이아웃
| 브레이크포인트 | 컬럼 | 거터 | 마진 |
| --- | --- | --- | --- |
| Mobile (<768px) | 4 | 16px | 16px |
| Tablet (768–1023) | 8 | 24px | 24px |
| Desktop (≥1024) | 12 | 24px | 자동(컨테이너 max 1200) |

- 간격은 4px 베이스 스케일(4/8/12/16/24/32/48/64) 토큰만 사용
- 시각적 위계: 8pt 리듬 유지, 요소 그룹 간 간격 > 그룹 내 간격

### 타이포그래피
| 토큰 | 용도 | 크기/행간 | 굵기 |
| --- | --- | --- | --- |
| `display` | 히어로 | 40/48 | 700 |
| `h1` | 페이지 제목 | 32/40 | 700 |
| `h2` | 섹션 | 24/32 | 600 |
| `body` | 본문 | 16/24 | 400 |
| `caption` | 보조 | 13/18 | 400 |

- 본문 최소 16px, 한 줄 45~75자
- 폰트는 브랜드 지정 서체만, 위계는 크기·굵기·색으로 표현

### 색상
- 시맨틱 토큰 사용: `color-primary`, `color-danger`, `color-success`, `color-surface`, `color-text`
- 명도 대비: 본문 ≥ 4.5:1, 큰 텍스트/UI ≥ 3:1 (WCAG 2.2 AA)
- 색만으로 의미 전달 금지(아이콘/텍스트 병행)

### 상태(State)
모든 인터랙티브 요소는 6개 상태를 정의한다.

| 상태 | 정의 |
| --- | --- |
| Default | 기본 |
| Hover | 마우스 오버 |
| Focus | 키보드 포커스(가시 링 필수) |
| Active/Pressed | 눌림 |
| Disabled | 비활성(대비 완화, 커서 not-allowed) |
| Loading | 처리 중(스피너/스켈레톤) |

추가 화면 상태: Empty(빈), Error(오류), Success(성공).

### 반응형
- 모바일 퍼스트로 설계, 우선순위 콘텐츠 먼저
- 터치 타깃 최소 44×44px
- 콘텐츠 리플로우: 320px 폭에서 가로 스크롤 없이 동작(WCAG 1.4.10)

## 출력 산출물

| 산출물 | 형식 |
| --- | --- |
| UI 컨셉/스타일 정의 | 문서 ([Templates/UI_Concept_Brief](../../Templates/UI_Concept_Brief.md)) |
| 화면 디자인 | Figma ([10_FIGMA_GUIDE](../10_FIGMA_GUIDE.md)) |
| 상태 명세표 | 표 |
| 반응형 사양 | 표 + 브레이크포인트 |
| 핸드오프 노트 | 문서 → [../Publishing/README](../Publishing/README.md) |

## 품질 기준 (Do / Don't)

| Do | Don't |
| --- | --- |
| 4px 베이스 토큰 간격 사용 | 임의 px(예: 13px, 7px) 직접 입력 |
| 시맨틱 색 토큰 참조 | HEX 하드코딩 |
| 모든 상태(6+3) 정의 | Default만 디자인 |
| 포커스 링 명시 | 포커스 아웃라인 제거 |
| 대비 4.5:1 검증 | 연한 회색 본문 |
| 색+아이콘 병행 | 색만으로 의미 전달 |

## 체크리스트

- [ ] 모든 간격이 토큰 스케일을 따르는가
- [ ] 타이포 위계가 토큰으로 정의되었는가
- [ ] 색 대비가 WCAG 2.2 AA를 충족하는가
- [ ] 인터랙티브 요소의 6개 상태가 있는가
- [ ] Empty/Error/Loading 화면 상태가 있는가
- [ ] 터치 타깃 ≥ 44px, 320px 리플로우 OK
- [ ] [08_UI_GUIDELINES](../08_UI_GUIDELINES.md)·토큰과 정합하는가

## 예시 프롬프트

```
역할: ui-design-lead. GoldWiki/UI/UIGuidelines.md를 따른다.
입력: 화면 목록(대시보드/설정), 디자인 토큰, 브랜드 컬러.
작업: 대시보드 화면 UI 사양 작성 — 12컬럼 그리드, 타이포 토큰, 시맨틱 색,
      모든 컴포넌트의 6개 상태 + Empty/Error/Loading.
출력: 상태 명세표, 반응형 사양, Do/Don't 점검. 대비 4.5:1 검증 포함.
```
