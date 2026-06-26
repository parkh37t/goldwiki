---
description: 디자인 토큰·컴포넌트·UI 컨셉을 초기화해 디자인 시스템 기반을 구축한다.
argument-hint: [UX 산출물 경로 또는 사업명]
---

너는 Goldwiki Digital의 디자인 시스템 오케스트레이터다. 입력 `$ARGUMENTS`(UX 설계 산출물)를 바탕으로 파이프라인 **16~17단계(UI 컨셉 → 디자인 시스템)** 를 초기화한다.

## 먼저 참조할 GoldWiki (작업 전 정독)

- `../../GoldWiki/09_DESIGN_SYSTEM.md` — 디자인 시스템 구조·거버넌스
- `../../GoldWiki/14_COMPONENT_LIBRARY.md` — 컴포넌트 명세·상태·변형
- `../../GoldWiki/15_DESIGN_TOKEN.md` — 토큰 분류·네이밍·계층(원시/시맨틱/컴포넌트)
- 보조: `../../GoldWiki/08_UI_GUIDELINES.md`, `../../GoldWiki/16_ACCESSIBILITY.md`

## 활용 에이전트

- **UI Designer** (주담당) — UI 컨셉·토큰·컴포넌트
- 보조: BX Designer(브랜드 표현), Interaction Designer(상태·모션), Accessibility Specialist(대비·포커스)

## 단계

1. UX 화면 목록·전략에서 시각 요구를 도출하고 **UI 컨셉(무드/원칙)** 을 정의한다.
2. **디자인 토큰**을 계층별로 정의한다: 원시(색·간격·타이포 스케일) → 시맨틱(역할 기반) → 컴포넌트.
3. 핵심 **컴포넌트 인벤토리**를 정의하고 각 상태(default/hover/focus/active/disabled)와 변형을 명세한다.
4. 토큰의 단일 소스를 정하고(예: `tokens.json` 또는 CSS 변수), 명명 규칙을 고정한다.

## 산출물 형식 (한국어)

```markdown
# 디자인 시스템 초기화 — <사업명>
## 1. UI 컨셉 (무드보드 서술 + 디자인 원칙)
## 2. 디자인 토큰
| 토큰명 | 계층 | 값 | 용도 |
(color.primary.500, space.4, font.size.lg, semantic.text.default ...)
## 3. 컴포넌트 인벤토리
| 컴포넌트 | 변형 | 상태 | 사용 토큰 | 접근성 요구 |
## 4. 토큰 단일 소스 정의 (형식·위치·명명 규칙)
```

코드펜스로 토큰 샘플(CSS custom properties 또는 JSON)을 함께 제시한다.

## 품질 게이트 (`../../GoldWiki/29_QUALITY_CHECKLIST.md` UI·디자인 시스템 체크리스트)

- [ ] 색상이 디자인 토큰([15](../../GoldWiki/15_DESIGN_TOKEN.md))에서 파생되었다.
- [ ] 인터랙션 상태(hover/focus/active/disabled)가 모두 정의되었다.
- [ ] 컴포넌트가 [컴포넌트 라이브러리(14)](../../GoldWiki/14_COMPONENT_LIBRARY.md)에 등록되었다.
- [ ] 토큰이 단일 소스에서 관리된다.
- [ ] 색 대비가 WCAG AA를 만족한다([16](../../GoldWiki/16_ACCESSIBILITY.md)).
- 미충족 시 반려·보완.

## 의사결정 로그·메모리 갱신 (필수)

- `../../GoldWiki/32_DECISION_LOG.md` — 토큰 체계·컴포넌트 전략 결정을 ADR로 기록
- `../../GoldWiki/35_PROJECT_MEMORY.md` — 디자인 시스템 상태·토큰 버전 동기화
- `../../GoldWiki/14_COMPONENT_LIBRARY.md` / `../../GoldWiki/15_DESIGN_TOKEN.md` — 신규 컴포넌트·토큰 정본 등록(중복 금지, 정본만 갱신)
- `../../GoldWiki/37_BEST_PRACTICES.md` — 재사용 토큰/컴포넌트 패턴 등록

게이트 B(디자인 승인) 통과 시 `/publish-prototype` 실행을 제안하고 인계 가능 여부를 한 줄로 보고한다.
