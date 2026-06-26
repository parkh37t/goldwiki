# Backend — 백엔드 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 백엔드 설계·구현 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

확장 가능하고 안전하며 관측 가능한 **백엔드 구현 표준**을 관리한다. 아키텍처, API 설계, 데이터 접근, 인증·인가, 관측성, 신뢰성·배포를 정의해 서비스 안정성과 보안을 보장한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [BackendGuide.md](BackendGuide.md) | 백엔드 가이드(아키텍처·API·인증·관측성·예시, 8섹션) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [Frontend](../Frontend/FrontendGuide.md), [Data](../Data/DataAnalyticsGuide.md), [AI](../AI/AIAutomationGuide.md)
- 번호형: [21_BACKEND_GUIDE](../21_BACKEND_GUIDE.md), [22_API_STANDARD](../22_API_STANDARD.md), [23_DATABASE_GUIDE](../23_DATABASE_GUIDE.md), [24_SECURITY_GUIDE](../24_SECURITY_GUIDE.md), [30_TEST_STRATEGY](../30_TEST_STRATEGY.md)

## 담당 에이전트

- **주담당**: `backend-lead`
- **협업**: `frontend-lead`, `security-risk-lead`, `data-analytics-lead`, `ai-automation-lead`, `qa-lead`, `cto-reviewer`

## 사용 흐름

1. 도메인 요구와 [데이터 모델](../Data/DataAnalyticsGuide.md)·[보안 요구](../24_SECURITY_GUIDE.md)를 입력으로 받는다.
2. [BackendGuide.md](BackendGuide.md)의 계층형 모듈·API·인증 표준으로 구현한다.
3. OpenAPI·관측성·테스트를 갖추고 `security-risk-lead` 검토를 받는다.
4. 아키텍처·스택 결정을 [의사결정 로그](../DecisionLog/README.md)에 ADR로 기록한다.

## 거버넌스

모든 엔드포인트는 입력 검증·인증·인가를 갖추고 OWASP Top 10 점검과 SLO(에러율·p95)를 충족해야 하며, 아키텍처·스택 결정은 [의사결정 로그](../DecisionLog/README.md)에 기록한다.
