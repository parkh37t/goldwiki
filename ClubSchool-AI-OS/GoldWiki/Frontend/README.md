# Frontend — 프론트엔드 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 프론트엔드 구현 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

일관되고 유지보수 가능하며 성능·접근성을 만족하는 **프론트엔드 구현 표준**을 관리한다. 스택 선택, 프로젝트 구조, 컴포넌트 아키텍처, 성능 예산, 접근성, CI 게이트를 정의해 구현 품질과 회귀 방지를 보장한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [FrontendGuide.md](FrontendGuide.md) | 프론트엔드 가이드(스택·구조·성능·접근성·CI, 8섹션) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [Publishing](../Publishing/HTMLCSSGuide.md), [Backend](../Backend/BackendGuide.md), [UI](../UI/README.md), [DesignSystem](../DesignSystem/README.md)
- 번호형: [19_JS_GUIDE](../19_JS_GUIDE.md), [20_FRONTEND_GUIDE](../20_FRONTEND_GUIDE.md), [22_API_STANDARD](../22_API_STANDARD.md), [30_TEST_STRATEGY](../30_TEST_STRATEGY.md), [31_RELEASE_PROCESS](../31_RELEASE_PROCESS.md)

## 담당 에이전트

- **주담당**: `frontend-lead`
- **협업**: `publishing-lead`, `backend-lead`, `ui-design-lead`, `qa-lead`, `cto-reviewer`

## 사용 흐름

1. [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md) 산출물과 [API 표준](../22_API_STANDARD.md) 계약을 입력으로 받는다.
2. [FrontendGuide.md](FrontendGuide.md)의 스택·구조·성능 기준으로 컴포넌트를 구현한다.
3. lint/type/test/build/perf CI 게이트를 통과하고 `qa-lead`에 핸드오프한다.
4. 의존성·아키텍처 결정을 [의사결정 로그](../DecisionLog/README.md)에 ADR로 기록한다.

## 거버넌스

성능 예산·접근성(axe critical 0)·테스트 커버리지 기준을 충족해야 납품 게이트를 통과하며, 스택·아키텍처 결정은 [의사결정 로그](../DecisionLog/README.md)에 ADR로 남긴다.
