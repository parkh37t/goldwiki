---
name: delivery-qa
description: 개발 계획 확정 이후 구현·테스트·릴리스까지를 수행하는 납품 워크플로우. GoldWiki 30(테스트 전략)과 31(릴리스 프로세스)을 정본으로, rfp-to-delivery의 S19~S21을 구현 실행 관점으로 확장하고 게이트 C와 릴리스 게이트를 포함한다.
---

# 워크플로우: delivery-qa

> 상위 파이프라인: [rfp-to-delivery](rfp-to-delivery.md)
> 정본: [GoldWiki 30 테스트 전략](../../GoldWiki/30_TEST_STRATEGY.md), [GoldWiki 31 릴리스 프로세스](../../GoldWiki/31_RELEASE_PROCESS.md)
> 오케스트레이터: Project Director(공동: QA Engineer, DevOps Engineer)

## 적용 시점

디자인·개발 계획이 확정된 상태에서 실제 구현·QA·릴리스를 수행할 때 실행한다. [design-sprint](design-sprint.md) 또는 [rfp-to-delivery](rfp-to-delivery.md) S18 통과 후 이어 실행한다.

## 실행 규약

1. 모든 단계는 작업 전 `읽는 문서`의 GoldWiki를 먼저 참조한다.
2. 보안·접근성·성능은 게이트 C의 필수 통과 조건이다.
3. 게이트 C(품질 검수)·게이트 R(릴리스 승인)은 승인 없이 통과 불가.
4. 결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md)·[프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md)에 기록하고, 발견 결함은 [39](../../GoldWiki/39_COMMON_ERRORS.md)에 누적한다.

## 변수

| 변수 | 의미 |
| --- | --- |
| `$DEV_PLAN` | 확정 개발 계획(아키텍처·API 계약·데이터 모델) |
| `$ENV` | 배포 대상 환경(staging/production) |
| `$WORKDIR` | 산출 아티팩트 디렉터리 |

## 단계 정의

### Q01 · 개발 계획 확정

| 항목 | 값 |
| --- | --- |
| ID | `Q01` |
| 트리거 | 프로토타입 계획 통과 |
| 담당 에이전트 | Frontend Engineer, Backend Engineer, API Engineer, Database Architect |
| 입력 | 요구사항, 프로토타입 계획 |
| 산출 아티팩트 | `$WORKDIR/q01-dev-plan.md`(아키텍처·API 계약·데이터 모델·개발 일정) |
| 읽는 문서 | [20](../../GoldWiki/20_FRONTEND_GUIDE.md), [21](../../GoldWiki/21_BACKEND_GUIDE.md), [22](../../GoldWiki/22_API_STANDARD.md), [23](../../GoldWiki/23_DATABASE_GUIDE.md), [24](../../GoldWiki/24_SECURITY_GUIDE.md) |
| 갱신 문서 | [32](../../GoldWiki/32_DECISION_LOG.md) |
| 게이트 | 없음 |
| 다음 단계 | Q02 |

### Q02 · 구현(개발)

| 항목 | 값 |
| --- | --- |
| ID | `Q02` |
| 트리거 | 개발 계획 확정 |
| 담당 에이전트 | Publishing Engineer, Frontend Engineer, Backend Engineer, API Engineer, Database Architect |
| 입력 | 개발 계획, 디자인 시스템, API 계약 |
| 산출 아티팩트 | 프로덕션 코드, `$WORKDIR/q02-build-notes.md`(구현 노트·디자인 diff·토큰 갱신 제안) |
| 읽는 문서 | [17](../../GoldWiki/17_HTML_GUIDE.md), [18](../../GoldWiki/18_CSS_GUIDE.md), [19](../../GoldWiki/19_JS_GUIDE.md), [14](../../GoldWiki/14_COMPONENT_LIBRARY.md), [15](../../GoldWiki/15_DESIGN_TOKEN.md) |
| 갱신 문서 | [14](../../GoldWiki/14_COMPONENT_LIBRARY.md), [38](../../GoldWiki/38_TEMPLATE_LIBRARY.md) |
| 게이트 | 없음 |
| 다음 단계 | Q03 |

### Q03 · QA 계획 수립

| 항목 | 값 |
| --- | --- |
| ID | `Q03` |
| 트리거 | 구현 착수(테스트는 구현과 병행) |
| 담당 에이전트 | QA Engineer, Security Engineer |
| 입력 | 요구사항, 개발 계획 |
| 산출 아티팩트 | `$WORKDIR/q03-qa-plan.md`(테스트 전략·케이스·종료기준·테스트 데이터) |
| 읽는 문서 | [29](../../GoldWiki/29_QUALITY_CHECKLIST.md), [30](../../GoldWiki/30_TEST_STRATEGY.md), [24](../../GoldWiki/24_SECURITY_GUIDE.md) |
| 갱신 문서 | [30](../../GoldWiki/30_TEST_STRATEGY.md) |
| 게이트 | 없음 |
| 다음 단계 | Q04 |

### Q04 · 테스트 실행

| 항목 | 값 |
| --- | --- |
| ID | `Q04` |
| 트리거 | QA 계획 확정 + 구현 산출물 확보 |
| 담당 에이전트 | QA Engineer |
| 입력 | 구현 코드, 테스트 케이스 |
| 산출 아티팩트 | `$WORKDIR/q04-test-report.md`(단위/통합/E2E·접근성·결함 목록·종료기준 충족 여부) |
| 읽는 문서 | [30](../../GoldWiki/30_TEST_STRATEGY.md), [29](../../GoldWiki/29_QUALITY_CHECKLIST.md), [16](../../GoldWiki/16_ACCESSIBILITY.md) |
| 갱신 문서 | [39](../../GoldWiki/39_COMMON_ERRORS.md) |
| 게이트 | 없음 |
| 다음 단계 | Q05 |

### Q05 · 보안 점검

| 항목 | 값 |
| --- | --- |
| ID | `Q05` |
| 트리거 | 테스트 실행 진행 |
| 담당 에이전트 | Security Engineer |
| 입력 | 구현 코드, API 계약 |
| 산출 아티팩트 | `$WORKDIR/q05-security-report.md`(OWASP 점검·취약점·조치) |
| 읽는 문서 | [24](../../GoldWiki/24_SECURITY_GUIDE.md), [22](../../GoldWiki/22_API_STANDARD.md) |
| 갱신 문서 | [39](../../GoldWiki/39_COMMON_ERRORS.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 게이트 | **게이트 C** |
| 다음 단계 | (게이트 C 통과 시) Q06 |

> **게이트 C — 품질 검수.** 승인자: QA + Project Director. 통과 조건: [30](../../GoldWiki/30_TEST_STRATEGY.md) 종료기준 + [29](../../GoldWiki/29_QUALITY_CHECKLIST.md) DoD + 보안 무결성(차단 등급 취약점 0). 미통과 시 Q02(구현)로 회귀.

### Q06 · 릴리스 준비

| 항목 | 값 |
| --- | --- |
| ID | `Q06` |
| 트리거 | 게이트 C 통과 |
| 담당 에이전트 | DevOps Engineer, Backend Engineer |
| 입력 | 검증된 빌드, `$ENV` |
| 산출 아티팩트 | `$WORKDIR/q06-release-candidate.md`(SemVer 버전·변경 로그·롤백 계획·배포 체크리스트) |
| 읽는 문서 | [31](../../GoldWiki/31_RELEASE_PROCESS.md), [24](../../GoldWiki/24_SECURITY_GUIDE.md) |
| 갱신 문서 | [32](../../GoldWiki/32_DECISION_LOG.md) |
| 게이트 | **게이트 R** |
| 다음 단계 | (게이트 R 통과 시) Q07 |

> **게이트 R — 릴리스 승인.** 승인자: Project Director + DevOps Engineer. 통과 조건: [31](../../GoldWiki/31_RELEASE_PROCESS.md) 릴리스 체크리스트·롤백 계획 확정. 미통과 시 Q06로 회귀.

### Q07 · 배포·릴리스

| 항목 | 값 |
| --- | --- |
| ID | `Q07` |
| 트리거 | 게이트 R 통과 |
| 담당 에이전트 | DevOps Engineer |
| 입력 | 릴리스 후보, 배포 체크리스트 |
| 산출 아티팩트 | `$WORKDIR/q07-release-record.md`(배포 일시·버전·검증 결과·모니터링 링크) |
| 읽는 문서 | [31](../../GoldWiki/31_RELEASE_PROCESS.md) |
| 갱신 문서 | [35](../../GoldWiki/35_PROJECT_MEMORY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md) |
| 게이트 | 없음 |
| 다음 단계 | Q08 |

### Q08 · 릴리스 후 검증·회고

| 항목 | 값 |
| --- | --- |
| ID | `Q08` |
| 트리거 | 배포 완료 |
| 담당 에이전트 | QA Engineer, DevOps Engineer, Project Director |
| 입력 | 운영 모니터링, 사용자 피드백 |
| 산출 아티팩트 | `$WORKDIR/q08-postmortem.md`(스모크 테스트·지표·회고·개선 항목) |
| 읽는 문서 | [31](../../GoldWiki/31_RELEASE_PROCESS.md), [30](../../GoldWiki/30_TEST_STRATEGY.md) |
| 갱신 문서 | [35](../../GoldWiki/35_PROJECT_MEMORY.md), [37](../../GoldWiki/37_BEST_PRACTICES.md), [39](../../GoldWiki/39_COMMON_ERRORS.md) |
| 게이트 | 없음 |
| 다음 단계 | 종료(인계: [rfp-to-delivery](rfp-to-delivery.md) S21 경영 요약) |

## 게이트 요약

| 게이트 | 위치 | 통과 조건 | 승인자 |
| --- | --- | --- | --- |
| C | Q05 후 | 테스트 종료기준·DoD·보안 무결성 | QA/Project Director |
| R | Q06 후 | 릴리스 체크리스트·롤백 계획 | Project Director/DevOps |

## 관련 GoldWiki 문서

- [30_TEST_STRATEGY.md](../../GoldWiki/30_TEST_STRATEGY.md) — 테스트 전략 정본
- [31_RELEASE_PROCESS.md](../../GoldWiki/31_RELEASE_PROCESS.md) — 릴리스 프로세스 정본
- [29_QUALITY_CHECKLIST.md](../../GoldWiki/29_QUALITY_CHECKLIST.md) — DoD·게이트 C 체크리스트
- [24_SECURITY_GUIDE.md](../../GoldWiki/24_SECURITY_GUIDE.md) — 보안 점검 기준

> **거버넌스:** 본 워크플로우 실행 중 발생한 모든 의사결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md), [프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.
