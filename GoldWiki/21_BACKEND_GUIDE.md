# 21 · 백엔드 엔지니어링 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 백엔드 서비스의 아키텍처, 설정·시크릿, 관측성, 에러 처리, 인증·캐싱·백그라운드 잡 표준을 정의하여 견고하고 유지보수 가능한 서버를 구축한다. |
| **대상 독자** | 백엔드 엔지니어, API 엔지니어, 데이터베이스 아키텍트, 데브옵스 엔지니어, 보안 엔지니어 |
| **담당(Owner) 에이전트** | Backend Engineer |
| **참조(상위 문서)** | [API 표준](22_API_STANDARD.md), [데이터베이스 가이드](23_DATABASE_GUIDE.md), [보안 가이드](24_SECURITY_GUIDE.md) |
| **연계(하위 문서)** | [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [테스트 전략](30_TEST_STRATEGY.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 기본 원칙

1. **명확한 경계:** 도메인·애플리케이션·인프라를 분리한다(헥사고날/포트-어댑터).
2. **무상태(Stateless) 서비스:** 수평 확장을 위해 상태는 외부 저장소(DB/캐시)에 둔다.
3. **명시적 계약:** API는 [API 표준](22_API_STANDARD.md), 데이터는 [데이터베이스 가이드](23_DATABASE_GUIDE.md)를 따른다.
4. **관측 가능성 기본:** 모든 요청은 추적·로깅·메트릭으로 가시화한다.
5. **보안 내재화:** 입력 검증·인증·시크릿 관리를 설계 단계에서 반영한다([보안 가이드](24_SECURITY_GUIDE.md)).

---

## 2. 아키텍처: 레이어드 / 헥사고날

```
┌──────────────────────────────────────────────┐
│  인터페이스 어댑터 (HTTP 컨트롤러, 메시지 소비자)  │  ← 입력 포트
├──────────────────────────────────────────────┤
│  애플리케이션 계층 (유스케이스/서비스, 트랜잭션 경계)│
├──────────────────────────────────────────────┤
│  도메인 계층 (엔티티, 값 객체, 도메인 규칙)        │  ← 외부 의존 0
├──────────────────────────────────────────────┤
│  인프라 어댑터 (DB 리포지토리, 캐시, 외부 API)     │  ← 출력 포트
└──────────────────────────────────────────────┘
```

| 계층 | 책임 | 의존 방향 |
| --- | --- | --- |
| 인터페이스 | 프로토콜 변환(HTTP↔도메인), 검증 | 애플리케이션 |
| 애플리케이션 | 유스케이스 오케스트레이션, 트랜잭션 | 도메인(포트) |
| 도메인 | 비즈니스 규칙, 불변식 | 없음(순수) |
| 인프라 | 영속성·외부연동 구현 | 도메인 포트 구현 |

**의존성 규칙:** 모든 의존은 안쪽(도메인)을 향한다. 도메인은 프레임워크·DB를 알지 못한다.

---

## 3. 예시 서비스 구조

```
src/
├── interfaces/
│   └── http/
│       ├── routes/projects.controller.ts
│       └── middleware/auth.ts
├── application/
│   ├── projects/create-project.usecase.ts
│   └── ports/project.repository.ts        # 인터페이스(포트)
├── domain/
│   └── projects/
│       ├── project.entity.ts
│       └── project.errors.ts
├── infrastructure/
│   ├── db/project.repository.pg.ts         # 포트 구현(어댑터)
│   ├── cache/redis.client.ts
│   └── config/env.ts
└── shared/
    ├── logger.ts
    └── errors.ts
```

```ts
// domain/projects/project.entity.ts — 순수 도메인
export class Project {
  private constructor(
    readonly id: string,
    private _title: string,
    private _status: "draft" | "active" | "done",
  ) {}

  static create(title: string): Project {
    if (title.trim().length < 2) {
      throw new DomainError("제목은 2자 이상이어야 한다.");
    }
    return new Project(crypto.randomUUID(), title, "draft");
  }

  activate() {
    if (this._status !== "draft") throw new DomainError("초안만 활성화할 수 있다.");
    this._status = "active";
  }
}

// application/ports/project.repository.ts — 포트
export interface ProjectRepository {
  save(p: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
}

// application/projects/create-project.usecase.ts
export class CreateProjectUseCase {
  constructor(private readonly repo: ProjectRepository, private readonly log: Logger) {}
  async execute(input: { title: string }): Promise<{ id: string }> {
    const project = Project.create(input.title);
    await this.repo.save(project);
    this.log.info("project.created", { id: project.id });
    return { id: project.id };
  }
}
```

서비스 경계 원칙: 유스케이스 하나당 한 트랜잭션, 도메인 객체는 포트를 통해서만 영속화한다.

---

## 4. 설정과 시크릿

```ts
// infrastructure/config/env.ts — 시작 시 검증, 실패 시 즉시 종료
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export const env = schema.parse(process.env);
```

| 규칙 | 내용 |
| --- | --- |
| 설정은 환경 변수로 | 12-Factor 원칙, 코드와 분리 |
| 시작 시 검증 | 잘못된 설정으로 기동 금지 |
| 시크릿은 비밀 저장소 | Vault/KMS/Secrets Manager ([보안 가이드](24_SECURITY_GUIDE.md)) |
| 환경별 분리 | dev/staging/prod 격리, 운영 비밀은 운영에만 |
| 절대 커밋 금지 | `.env`는 `.gitignore`, 예시는 `.env.example` |

---

## 5. 로깅과 관측성

```ts
// 구조화 로깅 (JSON) + 상관관계 ID
logger.info("request.completed", {
  requestId: ctx.requestId,    // 추적 상관관계
  method: "POST",
  path: "/v1/projects",
  status: 201,
  durationMs: 42,
  userId: ctx.userId,
});
```

세 기둥(3 Pillars):

| 기둥 | 도구 예 | 용도 |
| --- | --- | --- |
| 로그(Logs) | 구조화 JSON, Loki/ELK | 사건 기록, 디버깅 |
| 메트릭(Metrics) | Prometheus | 처리량·지연·에러율(RED) |
| 추적(Traces) | OpenTelemetry | 분산 요청 경로 |

원칙:

- 모든 요청에 상관관계 ID(`X-Request-Id`)를 부여·전파한다.
- 로그에 비밀번호·토큰·개인정보(PII)를 남기지 않는다([보안 가이드](24_SECURITY_GUIDE.md)).
- 헬스체크(`/healthz`)와 준비성(`/readyz`) 엔드포인트를 제공한다.
- 골든 시그널(지연·트래픽·오류·포화도)에 알림을 건다.

---

## 6. 에러 처리

```ts
// shared/errors.ts — 도메인 에러 계층
export class AppError extends Error {
  constructor(readonly code: string, readonly status: number, message: string) {
    super(message);
  }
}
export class DomainError extends AppError {
  constructor(message: string) { super("DOMAIN_RULE", 422, message); }
}
export class NotFoundError extends AppError {
  constructor(resource: string) { super("NOT_FOUND", 404, `${resource}을(를) 찾을 수 없다.`); }
}

// 전역 에러 핸들러 — API 표준 envelope로 변환
function errorHandler(err: unknown, req, res) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, requestId: req.id },
    });
  }
  logger.error("unhandled", { err, requestId: req.id });
  return res.status(500).json({
    error: { code: "INTERNAL", message: "내부 서버 오류", requestId: req.id },
  });
}
```

- 에러 응답 형식은 [API 표준 §에러 envelope](22_API_STANDARD.md)와 일치시킨다.
- 예상 가능한 실패는 명시적 에러로, 예기치 못한 실패는 500 + 알림으로 처리한다.
- 내부 스택트레이스를 클라이언트에 노출하지 않는다.

---

## 7. 인증·인가 패턴

```ts
// JWT 검증 미들웨어 (24_SECURITY_GUIDE 참조)
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) throw new AppError("UNAUTHENTICATED", 401, "인증 필요");
  try {
    req.user = verifyJwt(token, env.JWT_SECRET); // 만료·서명 검증
    next();
  } catch {
    throw new AppError("UNAUTHENTICATED", 401, "유효하지 않은 토큰");
  }
}

// 역할 기반 인가(RBAC)
const requireRole = (...roles: string[]) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError("FORBIDDEN", 403, "권한 없음");
  }
  next();
};
```

| 관심사 | 표준 |
| --- | --- |
| 인증(Authn) | OAuth2 / OIDC, 단기 JWT 액세스 토큰 + 리프레시 |
| 인가(Authz) | RBAC(역할) 또는 ABAC(속성), 최소 권한 |
| 세션 | 무상태 토큰 우선, 서버 세션 시 안전 쿠키 |
| 토큰 저장 | `HttpOnly`+`Secure`+`SameSite` 쿠키 권장 |

상세 위협 모델과 통제는 [보안 가이드](24_SECURITY_GUIDE.md), 토큰 발급 흐름은 [API 표준](22_API_STANDARD.md)을 따른다.

---

## 8. 캐싱

| 계층 | 도구 | 무효화 전략 |
| --- | --- | --- |
| 애플리케이션 캐시 | Redis | TTL + 키 기반 무효화 |
| HTTP 캐시 | `Cache-Control`, `ETag` | 조건부 요청(304) |
| 쿼리/리드 모델 | 구체화 뷰/캐시 | 이벤트 기반 갱신 |

```ts
// cache-aside 패턴
async function getProject(id: string): Promise<Project> {
  const key = `project:${id}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const project = await repo.findById(id);
  if (!project) throw new NotFoundError("프로젝트");
  await redis.set(key, JSON.stringify(project), "EX", 300); // 5분 TTL
  return project;
}
// 쓰기 시 무효화
async function updateProject(p: Project) {
  await repo.save(p);
  await redis.del(`project:${p.id}`);
}
```

원칙: 캐시는 정확성 다음의 최적화다. 무효화 전략을 먼저 정하고 캐시를 도입한다.

---

## 9. 백그라운드 잡 / 비동기 처리

```ts
// 큐 기반 잡 (예: BullMQ) — HTTP 요청에서 무거운 작업 분리
await emailQueue.add("send-proposal", { projectId, to }, {
  attempts: 3,
  backoff: { type: "exponential", delay: 2000 },
  removeOnComplete: 1000,
});

// 워커
emailQueue.process("send-proposal", async (job) => {
  await mailer.send(job.data);   // 멱등하게 작성 (중복 실행 대비)
});
```

| 유형 | 도구 예 | 용도 |
| --- | --- | --- |
| 작업 큐 | BullMQ/SQS | 이메일, 리포트 생성 |
| 스케줄러 | cron/잡 스케줄러 | 정기 배치 |
| 이벤트 스트림 | Kafka/Redis Stream | 비동기 도메인 이벤트 |

규칙: 잡은 멱등하게, 재시도·백오프·데드레터 큐(DLQ)를 갖춘다. 장기 작업은 동기 요청에서 분리한다.

---

## 10. 코드 리뷰 체크리스트

- [ ] 계층 경계 준수(도메인이 인프라에 의존하지 않음)
- [ ] 유스케이스당 단일 트랜잭션 경계
- [ ] 설정·시크릿이 코드에 하드코딩되지 않음, 시작 시 검증
- [ ] 구조화 로깅 + 상관관계 ID, PII 미노출
- [ ] 에러가 [API 표준](22_API_STANDARD.md) envelope로 변환됨
- [ ] 인증/인가 적용, 최소 권한
- [ ] 캐시 무효화 전략 명시
- [ ] 백그라운드 잡 멱등·재시도 처리
- [ ] 단위·통합 테스트 존재([테스트 전략](30_TEST_STRATEGY.md))

---

## 관련 골드위키 문서

- [22 · API 표준](22_API_STANDARD.md) — HTTP 계약·에러 형식·인증 흐름.
- [23 · 데이터베이스 가이드](23_DATABASE_GUIDE.md) — 영속성·트랜잭션·마이그레이션.
- [24 · 보안 가이드](24_SECURITY_GUIDE.md) — 인증·시크릿·데이터 보호.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 클라이언트 통합 지점.
- [30 · 테스트 전략](30_TEST_STRATEGY.md) — 단위·통합·계약 테스트.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 배포·롤백 절차.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
