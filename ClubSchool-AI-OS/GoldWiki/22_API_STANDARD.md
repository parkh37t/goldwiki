# 22 · API 표준

| 항목 | 내용 |
| --- | --- |
| **목적** | REST API의 설계·네이밍·버저닝·에러·인증·페이지네이션·웹훅 표준을 정의하여 일관되고 예측 가능한 인터페이스 계약을 보장한다. |
| **대상 독자** | API 엔지니어, 백엔드 엔지니어, 프론트엔드 엔지니어, QA 엔지니어 |
| **담당(Owner) 에이전트** | API Engineer |
| **참조(상위 문서)** | [백엔드 가이드](21_BACKEND_GUIDE.md), [보안 가이드](24_SECURITY_GUIDE.md), [데이터베이스 가이드](23_DATABASE_GUIDE.md) |
| **연계(하위 문서)** | [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [테스트 전략](30_TEST_STRATEGY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 설계 원칙

1. **리소스 중심:** URL은 명사(리소스)로, 동작은 HTTP 메서드로 표현한다.
2. **계약 우선(Contract First):** OpenAPI 3.1 명세를 단일 진실로 삼고 코드·문서·목(mock)을 생성한다.
3. **일관성:** 네이밍·에러·페이지네이션 규약을 모든 엔드포인트에 동일 적용한다.
4. **하위 호환:** 변경은 가산적으로. 파괴적 변경은 버전을 올린다.
5. **안전 기본:** 인증·레이트리밋·입력 검증을 표준으로 한다([보안 가이드](24_SECURITY_GUIDE.md)).

---

## 2. 리소스 설계와 네이밍

| 규칙 | 좋은 예 | 나쁜 예 |
| --- | --- | --- |
| 복수 명사, 소문자, 케밥/단일어 | `/projects` | `/getProject` |
| 계층은 중첩으로 | `/projects/{id}/tasks` | `/projectTasks?pid=` |
| 동사 금지(메서드로 표현) | `POST /projects` | `/createProject` |
| 필드는 `snake_case`(혹은 일관된 한 가지) | `created_at` | 혼용 |

```
GET    /v1/projects             # 목록
POST   /v1/projects             # 생성
GET    /v1/projects/{id}        # 단건 조회
PATCH  /v1/projects/{id}        # 부분 수정
PUT    /v1/projects/{id}        # 전체 교체
DELETE /v1/projects/{id}        # 삭제
GET    /v1/projects/{id}/tasks  # 하위 리소스
```

복잡한 동작은 하위 리소스/액션으로: `POST /v1/projects/{id}/activate`.

---

## 3. HTTP 메서드와 상태 코드

| 메서드 | 멱등성 | 의미 | 성공 코드 |
| --- | --- | --- | --- |
| GET | O | 조회 | 200 |
| POST | X | 생성/액션 | 201(생성), 200/202 |
| PUT | O | 전체 교체 | 200 / 204 |
| PATCH | △ | 부분 수정 | 200 |
| DELETE | O | 삭제 | 204 |

| 코드 | 의미 | 사용 시점 |
| --- | --- | --- |
| 200 | 성공 | 조회·수정 |
| 201 | 생성됨 | POST 생성, `Location` 헤더 포함 |
| 202 | 접수됨 | 비동기 처리 시작 |
| 204 | 내용 없음 | 삭제·교체 성공 |
| 400 | 잘못된 요청 | 형식 오류 |
| 401 | 미인증 | 토큰 없음/무효 |
| 403 | 권한 없음 | 인가 실패 |
| 404 | 없음 | 리소스 부재 |
| 409 | 충돌 | 중복·상태 충돌 |
| 422 | 처리 불가 | 검증 실패(의미적) |
| 429 | 요청 과다 | 레이트리밋 |
| 500 | 서버 오류 | 예기치 못한 실패 |

---

## 4. 버저닝

| 전략 | 표기 | 채택 |
| --- | --- | --- |
| URL 경로 버전 | `/v1/projects` | **표준 채택** — 명확·캐시 친화 |
| 헤더 버전 | `Accept: application/vnd.gw.v1+json` | 보조 |

- 메이저 버전만 URL에 노출(`v1`, `v2`). 마이너 변경은 가산적이며 버전 불변.
- 폐기(deprecation)는 `Deprecation`/`Sunset` 헤더와 문서로 최소 6개월 사전 고지한다.
- 호환성 정책과 변경 절차는 [릴리스 프로세스](31_RELEASE_PROCESS.md) 및 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.

---

## 5. 페이지네이션 · 필터 · 정렬

```
GET /v1/projects?status=active&sort=-created_at&page[size]=20&page[cursor]=eyJpZCI6...
```

- **커서 기반(cursor) 권장**: 대용량·실시간 데이터에 안정적. 오프셋은 소규모 목록에만.
- 필터: `?field=value`, 범위는 `?created_at[gte]=2026-01-01`.
- 정렬: `?sort=field`(오름차), `?sort=-field`(내림차), 다중은 콤마.

```jsonc
// 목록 응답 — 메타 + 링크
{
  "data": [ { "id": "p_1", "title": "RFP 분석" } ],
  "meta": { "count": 20, "has_more": true },
  "links": { "next": "/v1/projects?page[cursor]=eyJpZCI6..." }
}
```

---

## 6. 에러 Envelope

모든 에러는 동일 구조로 반환한다([백엔드 가이드 §에러 처리](21_BACKEND_GUIDE.md)와 정합).

```jsonc
{
  "error": {
    "code": "VALIDATION_FAILED",     // 기계 판독용 안정 코드
    "message": "요청을 처리할 수 없다.", // 사람용 메시지(한국어)
    "request_id": "req_01H...",        // 추적 상관관계
    "details": [
      { "field": "title", "issue": "최소 2자 이상이어야 한다." }
    ]
  }
}
```

| 필드 | 설명 |
| --- | --- |
| `code` | 버전 간 안정적인 식별자(대문자 스네이크) |
| `message` | 사용자 표시용 한국어 메시지 |
| `request_id` | 로그·추적 연계용 |
| `details` | 필드 단위 검증 오류(선택) |

---

## 7. 멱등성(Idempotency)

```
POST /v1/payments
Idempotency-Key: 5f3c2b1a-...

# 같은 키로 재요청 시 동일 결과 반환(중복 생성 방지)
```

- 생성·결제 등 비멱등 POST에는 `Idempotency-Key` 헤더를 지원한다.
- 키-응답 매핑을 일정 기간(예: 24h) 저장하여 재시도 시 캐시된 결과를 반환한다.
- 네트워크 재시도가 안전하도록 클라이언트는 동일 키를 재사용한다.

---

## 8. 인증 (OAuth2 / JWT)

```
# 액세스 토큰으로 호출
GET /v1/projects
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

| 흐름 | 용도 |
| --- | --- |
| Authorization Code + PKCE | 웹/모바일 사용자 로그인 |
| Client Credentials | 서버 간(M2M) 통신 |
| Refresh Token | 단기 액세스 토큰 갱신 |

원칙:

- 액세스 토큰은 단기(예: 15분), 리프레시 토큰은 회전(rotation)한다.
- 스코프(`projects:read`, `projects:write`)로 최소 권한을 부여한다.
- 토큰 검증·저장·전송 표준은 [보안 가이드](24_SECURITY_GUIDE.md)를 따른다.

---

## 9. 레이트리밋(Rate Limiting)

```
HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 1000
RateLimit-Remaining: 0
RateLimit-Reset: 35
Retry-After: 35
```

- 표준 헤더(`RateLimit-*`, `Retry-After`)로 한도와 회복 시간을 알린다.
- 키 단위(사용자/클라이언트/IP)로 한도를 설정하고, 한도 초과는 429로 응답한다.
- 클라이언트는 `Retry-After`를 존중하여 지수 백오프로 재시도한다.

---

## 10. OpenAPI 계약 예시

```yaml
openapi: 3.1.0
info:
  title: Goldwiki Project API
  version: 1.0.0
paths:
  /v1/projects:
    post:
      summary: 프로젝트 생성
      security: [{ bearerAuth: ["projects:write"] }]
      parameters:
        - in: header
          name: Idempotency-Key
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/ProjectCreate" }
      responses:
        "201":
          description: 생성됨
          headers:
            Location: { schema: { type: string } }
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Project" }
        "422":
          description: 검증 실패
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Error" }
components:
  securitySchemes:
    bearerAuth: { type: http, scheme: bearer, bearerFormat: JWT }
  schemas:
    ProjectCreate:
      type: object
      required: [title]
      properties:
        title: { type: string, minLength: 2, maxLength: 120 }
    Project:
      type: object
      properties:
        id: { type: string }
        title: { type: string }
        status: { type: string, enum: [draft, active, done] }
        created_at: { type: string, format: date-time }
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code: { type: string }
            message: { type: string }
            request_id: { type: string }
```

OpenAPI 명세는 계약 테스트의 기준이 된다([테스트 전략](30_TEST_STRATEGY.md)).

---

## 11. 웹훅(Webhooks)

```jsonc
// 발신 이벤트 페이로드
POST https://client.example.com/hooks
X-GW-Event: project.activated
X-GW-Signature: sha256=...      // HMAC 서명으로 위변조 방지
X-GW-Delivery: dlv_01H...
{
  "id": "evt_01H...",
  "type": "project.activated",
  "created_at": "2026-06-26T10:00:00Z",
  "data": { "project_id": "p_1" }
}
```

| 규칙 | 내용 |
| --- | --- |
| 서명 검증 | HMAC-SHA256 시그니처 필수 |
| 멱등 처리 | 수신 측은 `id`로 중복 무시 |
| 재시도 | 2xx 외 응답 시 지수 백오프 재시도 |
| 빠른 응답 | 수신 즉시 2xx, 처리는 비동기(큐) |

---

## 12. API 리뷰 체크리스트

- [ ] 리소스 중심 URL, 동사 미사용
- [ ] 올바른 메서드·상태 코드
- [ ] 일관된 페이지네이션·필터·정렬
- [ ] 표준 에러 envelope + `request_id`
- [ ] 비멱등 생성에 `Idempotency-Key` 지원
- [ ] 인증·스코프·레이트리밋 적용
- [ ] OpenAPI 명세 최신화 및 계약 테스트 통과
- [ ] 웹훅 서명·재시도·멱등 처리

---

## 관련 골드위키 문서

- [21 · 백엔드 가이드](21_BACKEND_GUIDE.md) — API를 구현하는 서비스 아키텍처.
- [23 · 데이터베이스 가이드](23_DATABASE_GUIDE.md) — 리소스의 영속 모델.
- [24 · 보안 가이드](24_SECURITY_GUIDE.md) — 인증·서명·입력 검증.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — API를 소비하는 클라이언트.
- [30 · 테스트 전략](30_TEST_STRATEGY.md) — 계약·통합 테스트.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 버전 폐기·배포 절차.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
