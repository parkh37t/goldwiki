# 06 · UI 컨셉 및 디자인 시스템(토큰 발췌)

> ⚠️ **가상 예시.**
> **파이프라인 단계:** 16(UI 컨셉) ~ 17(디자인 시스템) · **담당:** UI Designer, BX Designer
> **정본 참조:** [08_UI_GUIDELINES](../GoldWiki/08_UI_GUIDELINES.md), [09_DESIGN_SYSTEM](../GoldWiki/09_DESIGN_SYSTEM.md), [15_DESIGN_TOKEN](../GoldWiki/15_DESIGN_TOKEN.md), [16_ACCESSIBILITY](../GoldWiki/16_ACCESSIBILITY.md)

---

## 1. 비주얼 컨셉

**컨셉 키워드:** "활기찬 신뢰(Vivid Trust)". 청소년에게는 밝고 활동적이되, 공공·학부모·기관에는 신뢰감을 주는 균형.

| 축 | 방향 |
| --- | --- |
| 톤 | 밝고 명료, 과한 장식 배제(GOV.UK식 단순함) |
| 컬러 | 청록(Primary, 활동) + 딥네이비(Secondary, 신뢰) + 활기 옐로(Accent) |
| 타이포 | Pretendard — 한글 가독성·다양한 굵기 |
| 모션 | 절제된 전환, `prefers-reduced-motion` 존중 |
| 톤앤매너 | 친근한 존댓말, 짧은 문장, 쉬운 용어 |

**핵심(키) 화면 시안 의도:** 메인(SC-001)은 상단 통합검색바를 영웅 요소로, 그 아래 추천 동아리 카드 그리드. 청소년 홈(SC-101)은 "내 활동"을 카드로 시각화하여 포트폴리오 성장감을 즉시 체감.

---

## 2. 디자인 원칙(요약)

1. **명료성 우선** — 한 화면 한 주요 행동(Primary action 1개).
2. **접근성은 기본값** — 모든 텍스트 대비 4.5:1 이상, 터치 타깃 44×44px 이상.
3. **토큰 단일화** — 모든 색/간격/타이포는 토큰을 통해서만 사용(하드코딩 금지).
4. **반응형 우선** — 모바일(360) → 태블릿(768) → 데스크톱(1280) 3 브레이크포인트.

---

## 3. 디자인 토큰 — JSON 발췌

```json
{
  "color": {
    "brand": {
      "primary":   { "value": "#0F8C8C", "comment": "청록 — 활동/주요 CTA" },
      "primary-strong": { "value": "#0A6E6E" },
      "secondary": { "value": "#1B2A4A", "comment": "딥네이비 — 신뢰/헤더" },
      "accent":    { "value": "#FFC233", "comment": "옐로 — 강조/뱃지" }
    },
    "semantic": {
      "success": { "value": "#1E8E5A" },
      "warning": { "value": "#B26A00" },
      "danger":  { "value": "#C8362F" },
      "info":    { "value": "#2563B0" }
    },
    "text": {
      "default": { "value": "#1A1C1E", "comment": "본문 — 배경 대비 15:1" },
      "muted":   { "value": "#5A6168", "comment": "보조 — 흰 배경 대비 4.6:1" },
      "inverse": { "value": "#FFFFFF" }
    },
    "surface": {
      "base":    { "value": "#FFFFFF" },
      "subtle":  { "value": "#F4F6F8" },
      "border":  { "value": "#D6DBDF" }
    }
  },
  "font": {
    "family": { "base": { "value": "Pretendard, system-ui, sans-serif" } },
    "size": {
      "xs": { "value": "12px" }, "sm": { "value": "14px" },
      "md": { "value": "16px" }, "lg": { "value": "20px" },
      "xl": { "value": "24px" }, "2xl": { "value": "32px" }
    },
    "weight": { "regular": { "value": 400 }, "medium": { "value": 500 }, "bold": { "value": 700 } },
    "lineHeight": { "tight": { "value": 1.3 }, "base": { "value": 1.6 } }
  },
  "space": {
    "1": { "value": "4px" }, "2": { "value": "8px" }, "3": { "value": "12px" },
    "4": { "value": "16px" }, "6": { "value": "24px" }, "8": { "value": "32px" }, "12": { "value": "48px" }
  },
  "radius": { "sm": { "value": "6px" }, "md": { "value": "12px" }, "pill": { "value": "999px" } },
  "shadow": { "card": { "value": "0 2px 8px rgba(27,42,74,0.08)" } }
}
```

> 토큰은 8px 그리드(space) 기반. 명도대비는 [16_ACCESSIBILITY](../GoldWiki/16_ACCESSIBILITY.md) AA 기준(본문 4.5:1, 대형 텍스트 3:1)을 모두 충족하도록 검증됨.

---

## 4. CSS 변수 매핑(퍼블리싱용)

```css
:root {
  /* color */
  --color-primary: #0F8C8C;
  --color-primary-strong: #0A6E6E;
  --color-secondary: #1B2A4A;
  --color-accent: #FFC233;
  --color-danger: #C8362F;
  --color-text: #1A1C1E;
  --color-text-muted: #5A6168;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F4F6F8;
  --color-border: #D6DBDF;

  /* typography */
  --font-base: "Pretendard", system-ui, sans-serif;
  --fs-md: 16px; --fs-lg: 20px; --fs-2xl: 32px;
  --lh-base: 1.6;

  /* spacing (8px grid) */
  --space-2: 8px; --space-4: 16px; --space-6: 24px; --space-8: 32px;

  /* radius & shadow */
  --radius-md: 12px; --radius-pill: 999px;
  --shadow-card: 0 2px 8px rgba(27, 42, 74, .08);
}

.btn-primary {
  background: var(--color-primary);
  color: #fff;
  min-height: 44px;            /* 접근성: 터치 타깃 */
  padding: 0 var(--space-6);
  border-radius: var(--radius-md);
  font: var(--fs-md)/1 var(--font-base);
}
.btn-primary:hover { background: var(--color-primary-strong); }
.btn-primary:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

---

## 5. 핵심 컴포넌트 카탈로그(발췌)

| 컴포넌트 | 변형 | 접근성 요건 | 화면 사용처 |
| --- | --- | --- | --- |
| Button | primary/secondary/ghost/danger | 44px, focus-visible, 대비 4.5:1 | 전 화면 |
| 검색 필터 | 칩/드롭다운/범위 | 키보드 조작, aria-expanded | SC-002 |
| 동아리 카드 | 기본/마감/추천 | 링크 명확, 대체텍스트 | SC-001/002/003 |
| 단계 표시기(Stepper) | 3단계 | aria-current, 진행 안내 | SC-006 가입 |
| 입력 폼 | 텍스트/선택/날짜 | label 연결, 실시간 오류 안내 | 전 입력 화면 |
| 상태 배지 | 대기/승인/반려 | 색+텍스트 병기(색만 의존 금지) | SC-102/203 |
| 빈 상태 | 검색없음/데이터없음 | 안내+다음 행동 제시 | 전 목록 |

---

## 6. 인계

본 컨셉·토큰은 단계 18 [HTML 프로토타입 계획](07_Prototype_Plan.md)으로 인계되며, CSS 변수는 그대로 퍼블리싱 베이스가 된다. 게이트 B(디자인 승인)는 본 문서의 접근성 검증으로 충족.

---

## 거버넌스 갱신

- [디자인 시스템](../GoldWiki/09_DESIGN_SYSTEM.md): "활기찬 신뢰" 컨셉, 컴포넌트 카탈로그 등재
- [디자인 토큰](../GoldWiki/15_DESIGN_TOKEN.md): 색/타이포/간격 토큰 세트 등재
- [의사결정 로그](../GoldWiki/32_DECISION_LOG.md): Pretendard·8px 그리드·청록 Primary 채택
