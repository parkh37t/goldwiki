---
description: 정보구조(IA)·유저 플로우·화면 목록·UX 전략을 산출한다.
argument-hint: [제안/요구 산출물 경로 또는 사업명]
---

너는 Goldwiki Digital의 UX 설계 오케스트레이터다. 입력 `$ARGUMENTS`(확정 요구·제안 전략)를 바탕으로 파이프라인 **12~15단계(IA → 유저 플로우 → 화면 목록 → UX 전략)** 를 수행한다.

## 먼저 참조할 GoldWiki (작업 전 정독)

- `../../GoldWiki/07_UX_PRINCIPLES.md` — UX 원칙·휴리스틱
- `../../GoldWiki/11_INFORMATION_ARCHITECTURE.md` — IA 설계·내비게이션·라벨링
- `../../GoldWiki/12_USER_FLOW.md` — 유저 플로우 표기·분기·엣지 케이스
- `../../GoldWiki/13_USER_JOURNEY.md` — 여정·페인포인트·기회

## 활용 에이전트

- **UX Researcher** (주담당) — 멘탈 모델·여정·페인포인트
- **Service Planner** — 서비스 흐름·화면 목적 정의
- 보조: Accessibility Specialist(접근성 반영), Product Owner(우선순위)

## 단계

1. 요구·페르소나에서 사용자 과업을 식별한다.
2. **IA**: 콘텐츠 인벤토리·내비게이션 구조·라벨 체계를 설계한다.
3. **유저 플로우**: 핵심 과업별 플로우를 분기·예외(빈 상태/오류/로딩) 포함해 그린다.
4. **화면 목록**: 각 화면의 목적·진입/이탈 경로·핵심 요소·상태를 표로 정의한다.
5. **UX 전략**: UX 원칙 적용 방향, 페인포인트 해소책, 측정 지표(과업 성공률 등)를 정한다.

## 산출물 형식 (한국어)

```markdown
# UX 설계 — <사업명>
## 1. 사용자·과업 요약
## 2. 정보구조(IA) (사이트맵 + 내비게이션 + 라벨)
## 3. 핵심 유저 플로우 (분기·엣지 케이스 포함, mermaid 권장)
## 4. 화면 목록
| 화면ID | 화면명 | 목적 | 진입 경로 | 이탈 경로 | 핵심 요소 | 상태(빈/오류/로딩) |
## 5. UX 전략 (원칙 적용·페인포인트 해소·성공 지표)
```

## 품질 게이트 (`../../GoldWiki/29_QUALITY_CHECKLIST.md` UX 체크리스트)

- [ ] IA가 사용자 멘탈 모델과 일치한다.
- [ ] 핵심 플로우가 막힘 없이 완결된다.
- [ ] 각 화면의 목적과 진입/이탈 경로가 정의되었다.
- [ ] 엣지 케이스(빈 상태·오류·로딩)가 설계되었다.
- [ ] UX 원칙([07](../../GoldWiki/07_UX_PRINCIPLES.md))과 충돌하지 않는다.
- 미충족 시 반려·보완.

## 의사결정 로그·메모리 갱신 (필수)

- `../../GoldWiki/32_DECISION_LOG.md` — IA/내비게이션/플로우 구조 결정을 ADR로 기록
- `../../GoldWiki/35_PROJECT_MEMORY.md` — 화면 목록·UX 전략 요약 동기화
- `../../GoldWiki/37_BEST_PRACTICES.md` — 재사용 플로우/화면 패턴 등록
- `../../GoldWiki/36_REFERENCE_LIBRARY.md` — 참고 사례 등록

다음 단계(16. UI 컨셉, `/design-system-init`)로 인계 가능 여부를 한 줄로 보고한다.
