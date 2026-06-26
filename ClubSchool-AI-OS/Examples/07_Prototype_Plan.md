# 07 · HTML 프로토타입 계획

> ⚠️ **가상 예시.**
> **파이프라인 단계:** 18(HTML 프로토타입 계획) · **담당:** Publishing Engineer, Frontend Engineer
> **정본 참조:** [17_HTML_GUIDE](../GoldWiki/17_HTML_GUIDE.md), [18_CSS_GUIDE](../GoldWiki/18_CSS_GUIDE.md), [20_FRONTEND_GUIDE](../GoldWiki/20_FRONTEND_GUIDE.md)

---

## 1. 목적과 범위

게이트 B(디자인 승인) 통과 후, 핵심 화면을 **정적 HTML/CSS(+최소 JS) 프로토타입**으로 구현하여 (a) 발주처 시연, (b) 사용성·접근성 사전 검증, (c) 개발 착수 시 퍼블리싱 베이스로 재사용한다. 프로토타입은 [06_Design_Concept.md](06_Design_Concept.md)의 CSS 변수를 그대로 사용한다.

**범위:** [05_Screen_List.md](05_Screen_List.md)의 MVP(P1) 13개 화면 중 시연 임팩트가 큰 **핵심 8개**를 우선 제작한다. 나머지는 컴포넌트 재조합으로 빠르게 확장한다.

---

## 2. 화면별 우선순위

| 순위 | 화면 ID | 화면명 | 선정 이유 | 인터랙션 수준 |
| --- | --- | --- | --- | --- |
| 1 | SC-002 | 동아리 통합 검색 | 윈 테마 1(체감 속도) 핵심 | 필터·정렬 동작(JS) |
| 2 | SC-006 | 회원가입 3단계 | "3분 가입" 증명 | Stepper·실시간 검증(JS) |
| 3 | SC-003 | 동아리 상세 | 가입 전환 동선 | 정적 + CTA |
| 4 | SC-101 | 청소년 홈 | 개인화 허브 체감 | 정적 |
| 5 | SC-204 | 활동일지 작성 | 교사 행정 절감 증명 | 자동저장 데모(JS) |
| 6 | SC-203 | 회원·출결 관리 | 일괄 처리 UX | 체크 일괄(JS) |
| 7 | SC-001 | 메인 | 첫인상·진입 동선 | 정적 |
| 8 | SC-503 | 접근성 설정 | 디지털 포용(윈 테마 2) | 글자크기·고대비 토글(JS) |

---

## 3. 디렉터리 구조

```
prototype/
├── index.html                 # SC-001 메인
├── pages/
│   ├── search.html            # SC-002
│   ├── club-detail.html       # SC-003
│   ├── signup.html            # SC-006 (3-step)
│   ├── youth-home.html        # SC-101
│   ├── activity-log.html      # SC-204
│   ├── attendance.html        # SC-203
│   └── a11y-settings.html     # SC-503
├── assets/
│   ├── css/
│   │   ├── tokens.css         # 06 디자인 토큰 → CSS 변수
│   │   ├── base.css           # reset·타이포·레이아웃
│   │   └── components.css     # 버튼·카드·폼·배지·스텝퍼
│   ├── js/
│   │   ├── filter.js          # 검색 필터/정렬
│   │   ├── stepper.js         # 가입 단계 전환·검증
│   │   └── a11y.js            # 글자크기·고대비·모션
│   └── img/                   # 더미 이미지(지연로딩)
└── README.md                  # 실행·시연 시나리오
```

---

## 4. 마크업·CSS·JS 원칙

- **시맨틱 HTML5**: `header/nav/main/section/article/footer`, 폼은 `label`-`input` 연결([17_HTML_GUIDE](../GoldWiki/17_HTML_GUIDE.md)).
- **접근성**: `Skip to content`, 논리적 포커스 순서, 색만으로 정보 전달 금지, 명도대비 AA([16_ACCESSIBILITY](../GoldWiki/16_ACCESSIBILITY.md)).
- **CSS**: 토큰 변수만 사용, BEM 네이밍, 모바일 우선 미디어쿼리(360/768/1280)([18_CSS_GUIDE](../GoldWiki/18_CSS_GUIDE.md)).
- **JS**: 의존성 없는 바닐라, 점진적 향상(JS 없어도 핵심 동작), 200줄 이내 모듈([19_JS_GUIDE](../GoldWiki/19_JS_GUIDE.md)).
- **성능**: 이미지 `loading="lazy"`, 시스템 폰트 폴백, 인라인 SVG 아이콘(윈 테마 2 저대역폭 대응).

---

## 5. 더미 데이터·상태 시연

각 목록 화면은 3종 상태를 토글로 시연한다: **정상 / 빈 상태 / 로딩**. 검색은 12건 더미 동아리(지역·관심사 다양)로 필터 동작을 보인다.

---

## 6. 일정·산출 기준

| 항목 | 기준 |
| --- | --- |
| 제작 기간 | 5영업일(가상), WBS 3.1과 병행 |
| 완료 정의 | 8개 화면 반응형 동작 + 접근성 자동점검(axe) 무오류 |
| 검수 | 게이트 B 산출물 재사용 가능성 + [29_QUALITY_CHECKLIST](../GoldWiki/29_QUALITY_CHECKLIST.md) 퍼블리싱 항목 |
| 인계 | 단계 19 개발 계획의 프론트 베이스로 이관, [38_TEMPLATE_LIBRARY](../GoldWiki/38_TEMPLATE_LIBRARY.md) 등재 |

---

## 7. 시연 시나리오(발주처용)

1. 메인(SC-001)에서 "서울·코딩·중학생" 검색 → 결과(SC-002) 필터링.
2. 동아리 상세(SC-003) → 가입(SC-006) 3단계를 1분 내 완주(만 14세 미만 동의 분기 시연).
3. 교사 화면 전환: 활동일지(SC-204) 자동저장 → 출결 일괄(SC-203).
4. 접근성 설정(SC-503)에서 글자 확대·고대비 적용 후 재탐색(포용 증명).

---

## 거버넌스 갱신

- [템플릿 라이브러리](../GoldWiki/38_TEMPLATE_LIBRARY.md): 프로토타입 구조·CSS 토큰 재사용 자산 등재
- [프로젝트 메모리](../GoldWiki/35_PROJECT_MEMORY.md): 핵심 8화면 프로토타입 범위
