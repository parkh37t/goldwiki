# 백엔드 엔지니어링 가이드

> 이 문서는 GoldWiki(SSOT)에 속한다. 백엔드를 설계·구현하기 전, 모든 에이전트는 이 문서와 [API 표준(번호형)](../22_API_STANDARD.md)·[보안 가이드(번호형)](../24_SECURITY_GUIDE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `backend-lead` |
| **협업 에이전트** | `frontend-lead`, `security-risk-lead`, `data-analytics-lead`, `ai-automation-lead`, `qa-lead`, `cto-reviewer` |
| **상위 참조** | [백엔드 가이드(번호형)](../21_BACKEND_GUIDE.md), [API 표준(번호형)](../22_API_STANDARD.md), [데이터베이스 가이드(번호형)](../23_DATABASE_GUIDE.md), [보안 가이드(번호형)](../24_SECURITY_GUIDE.md) |
| **연계** | [데이터 분석 가이드](../Data/DataAnalyticsGuide.md), [AI 자동화 가이드](../AI/AIAutomationGuide.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

확장 가능하고 안전하며 관측 가능한 백엔드를 구축하기 위한 아키텍처, API 설계, 데이터 접근, 인증·인가, 관측성(observability), 배포 표준을 정의한다.

## 언제 사용하는가

- 신규 서비스/API의 아키텍처 결정과 스캐폴딩.
- 프론트엔드와의 API 계약 합의.
- 인증·권한·보안 요구가 있는 기능 구현.
- 장애·성능 이슈 진단을 위한 관측성 기준 수립.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 기능·도메인 요구 | [비즈니스 분석(번호형)](../06_BUSINESS_ANALYSIS.md), [RFP 분석(번호형)](../04_RFP_ANALYSIS.md) |
| API 계약 | [API 표준(번호형)](../22_API_STANDARD.md), [프론트엔드 가이드](../Frontend/FrontendGuide.md) |
| 데이터 모델 | [데이터베이스 가이드(번호형)](../23_DATABASE_GUIDE.md), [데이터 분석 가이드](../Data/DataAnalyticsGuide.md) |
| 보안·컴플라이언스 | [보안 가이드(번호형)](../24_SECURITY_GUIDE.md) (OWASP) |

## 처리 방식

### 1) 아키텍처 — 계층형 + 도메인 모듈

```
src/
  modules/
    proposal/
      proposal.controller.ts   # HTTP 경계(검증·직렬화)
      proposal.service.ts      # 비즈니스 로직(순수)
      proposal.repository.ts   # 데이터 접근
      proposal.schema.ts       # Zod DTO
  shared/
    middleware/ auth/ logger/ errors/
  config/  db/  main.ts
```

원칙: 컨트롤러는 얇게, 서비스에 도메인 로직 집중, 레포지토리로 DB 격리. 모듈 간 의존은 서비스 인터페이스로만. 모놀리스로 시작하고 경계가 안정되면 분리한다(아키텍처 변경은 ADR로 [의사결정 로그](../DecisionLog/README.md)에 기록).

### 2) API 설계 (REST 기준)

- 리소스 명사·복수형(`/proposals`, `/proposals/{id}`), 동작은 HTTP 메서드로.
- 입력은 경계에서 Zod로 검증, 실패 시 400 + 표준 오류 바디.
- 페이지네이션(cursor 우선), 필터·정렬 쿼리 규약, 멱등성 키(POST 재시도).

```ts
// 표준 오류 응답
{ "error": { "code": "VALIDATION_ERROR", "message": "title is required",
             "details": [{ "field": "title", "issue": "required" }],
             "traceId": "b1f2…" } }
```

```ts
export const createProposal = async (req, res, next) => {
  try {
    const dto = CreateProposalSchema.parse(req.body);      // 검증
    const result = await proposalService.create(dto, req.user);
    res.status(201).json(result);
  } catch (e) { next(e); }                                  // 중앙 에러 핸들러
};
```

### 3) 데이터 접근

- 마이그레이션 기반 스키마 관리(Prisma/Drizzle 등), 수동 DDL 금지.
- N+1 방지, 인덱스 설계, 트랜잭션 경계 명시. 상세는 [데이터베이스 가이드](../23_DATABASE_GUIDE.md).
- PII는 암호화·마스킹, 보존 정책 준수([데이터 분석 가이드](../Data/DataAnalyticsGuide.md) 거버넌스 연계).

### 4) 인증·인가

- 인증: OIDC/OAuth2, 단명 액세스 토큰 + 리프레시 토큰(httpOnly·Secure 쿠키).
- 인가: RBAC(역할) + 리소스 소유권 검사. 미들웨어에서 1차, 서비스에서 도메인 권한 2차.
- 비밀번호 해시(Argon2/bcrypt), 시크릿은 비밀 관리자(Secrets Manager), 코드/리포 노출 0.

```ts
router.post("/proposals",
  authenticate,                 // 토큰 검증
  authorize("proposal:create"), // 권한
  rateLimit({ window: "1m", max: 60 }),
  createProposal);
```

### 5) 관측성

- **로깅**: 구조화 JSON 로그 + 상관관계 `traceId`. PII 마스킹.
- **메트릭**: RED(Request rate, Errors, Duration) + 리소스 사용량.
- **트레이싱**: OpenTelemetry로 분산 추적, 외부 호출 span.
- **헬스체크**: `/healthz`(liveness), `/readyz`(readiness).
- **알림**: SLO 위반(에러율·p95 지연) 시 알림 → [PMO](../PMO/README.md) 리스크 연계.

### 6) 신뢰성·배포

- 멱등성·재시도·타임아웃·서킷브레이커, 외부 의존 격리.
- 12-factor 설정(환경변수), 무중단 배포, 마이그레이션 선행.
- 백업·복구 리허설, 비밀 회전.

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| API 서비스 코드 | 모듈형, 검증·에러 표준화 |
| OpenAPI 스펙 | 계약 문서(자동 생성) |
| DB 마이그레이션 | 버전 관리 |
| 관측성 설정 | 로그/메트릭/트레이스/알림 |
| 테스트 | 단위·통합·계약 테스트 |

## 품질 기준

- [ ] 모든 입력 경계 검증(Zod), 표준 오류 응답.
- [ ] 인증·인가 누락 엔드포인트 0건.
- [ ] OWASP Top 10 점검 통과([보안 가이드](../24_SECURITY_GUIDE.md)).
- [ ] p95 지연·에러율 SLO 충족, 헬스체크 동작.
- [ ] 마이그레이션 가역, 테스트 커버리지 ≥ 80%.
- [ ] 시크릿·PII 코드 노출 0건.

## 체크리스트

- [ ] OpenAPI 스펙과 구현 일치.
- [ ] 레이트 리밋·멱등성 키 적용(쓰기 API).
- [ ] 구조화 로그 + traceId, PII 마스킹.
- [ ] 트랜잭션 경계·인덱스 검토.
- [ ] 아키텍처/스택 결정 ADR 기록([의사결정 로그](../DecisionLog/README.md)).

## 예시 프롬프트

```
역할: backend-lead. GoldWiki Backend/BackendGuide.md, 22_API_STANDARD.md, 24_SECURITY_GUIDE.md를 먼저 읽어라.
작업: 제안서 생성/조회 API 설계·구현. RBAC, 입력 검증, 표준 오류, OpenAPI 생성.
제약: 계층형 모듈 구조, OWASP 점검, 구조화 로그+traceId, 통합·계약 테스트 포함.
출력: 모듈 코드, OpenAPI, 마이그레이션, 테스트, 관측성 설정. security-risk-lead 검토 요청.
```

---

### 관련 문서
[Backend README](README.md) · [데이터 분석 가이드](../Data/DataAnalyticsGuide.md) · [AI 자동화 가이드](../AI/AIAutomationGuide.md) · [21_BACKEND_GUIDE](../21_BACKEND_GUIDE.md) · [22_API_STANDARD](../22_API_STANDARD.md) · [24_SECURITY_GUIDE](../24_SECURITY_GUIDE.md)
