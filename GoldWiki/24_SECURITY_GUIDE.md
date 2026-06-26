# 24 · 보안 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | OWASP Top 10 기반의 방어적 보안 통제, 인증·인가, 입력 검증, 시크릿·데이터 보호, 시큐어 SDLC, 공급망 보안 표준을 정의한다. |
| **대상 독자** | 보안 엔지니어, 백엔드 엔지니어, API 엔지니어, 데브옵스 엔지니어, 프론트엔드 엔지니어 |
| **담당(Owner) 에이전트** | Security Engineer |
| **참조(상위 문서)** | [백엔드 가이드](21_BACKEND_GUIDE.md), [API 표준](22_API_STANDARD.md), [데이터베이스 가이드](23_DATABASE_GUIDE.md) |
| **연계(하위 문서)** | [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 보안 원칙 (방어적 관점)

본 가이드는 전적으로 **방어(defense)** 관점에서 작성된다. 모든 통제는 시스템과 사용자를 보호하기 위함이다.

1. **다층 방어(Defense in Depth):** 단일 통제에 의존하지 않고 계층적으로 방어한다.
2. **최소 권한(Least Privilege):** 필요한 최소 권한만 부여한다.
3. **기본 안전(Secure by Default):** 안전한 설정을 기본값으로 한다.
4. **신뢰하지 말고 검증(Zero Trust):** 모든 입력·요청을 의심하고 검증한다.
5. **심층 투명성:** 보안 사건을 기록·탐지·대응할 수 있게 한다.

---

## 2. OWASP Top 10 통제 (2021)

| 위험 | 통제 |
| --- | --- |
| A01 접근 통제 실패 | 서버측 인가 강제, 객체 수준 권한 검사, 기본 거부 |
| A02 암호화 실패 | 전송·저장 암호화(TLS, AES-256), 약한 알고리즘 금지 |
| A03 인젝션 | 파라미터 바인딩, 입력 검증, 출력 인코딩 |
| A04 안전하지 않은 설계 | 위협 모델링, 보안 요구사항 사전 정의 |
| A05 보안 설정 오류 | 하드닝, 불필요 기능 비활성, 기본 비밀번호 제거 |
| A06 취약 컴포넌트 | 의존성 스캔·업데이트, SBOM 관리 |
| A07 인증·식별 실패 | MFA, 안전한 세션, 무차별 대입 방어 |
| A08 무결성 실패 | 서명 검증, CI/CD 무결성, 신뢰 출처만 사용 |
| A09 로깅·모니터링 실패 | 보안 이벤트 로깅, 알림, 보존 |
| A10 SSRF | 아웃바운드 요청 화이트리스트, 메타데이터 차단 |

---

## 3. 인증과 인가

```ts
// 비밀번호 해싱 — Argon2id (또는 bcrypt) 사용, 평문 저장 금지
import { hash, verify } from "@node-rs/argon2";
const pwHash = await hash(password, { memoryCost: 19456, timeCost: 2 });
const ok = await verify(pwHash, candidate);
```

| 통제 | 표준 |
| --- | --- |
| 비밀번호 저장 | Argon2id/bcrypt, 솔트 자동, 평문·MD5/SHA1 금지 |
| 다중 인증(MFA) | 민감 계정·관리자 필수 |
| 세션/토큰 | 단기 JWT + 리프레시 회전, 안전 쿠키 |
| 무차별 대입 방어 | 레이트리밋, 계정 잠금, CAPTCHA |
| 인가 | 서버측 강제, 객체 수준(IDOR 방지) |

```ts
// 객체 수준 인가 — 소유권 확인 (IDOR 방지)
const project = await repo.findById(id);
if (project.ownerId !== req.user.id && req.user.role !== "admin") {
  throw new AppError("FORBIDDEN", 403, "권한 없음");
}
```

쿠키·토큰 전송 표준:

```
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900
```

인증 흐름은 [API 표준 §인증](22_API_STANDARD.md), 미들웨어 구현은 [백엔드 가이드](21_BACKEND_GUIDE.md)를 따른다.

---

## 4. 입력 검증과 인젝션 방어

```ts
// 스키마 기반 입력 검증 (허용 목록 방식)
const schema = z.object({
  title: z.string().min(2).max(120),
  status: z.enum(["draft", "active", "done"]),
});
const input = schema.parse(req.body); // 실패 시 422
```

```sql
-- SQL 인젝션 방어: 파라미터 바인딩 (문자열 연결 금지)
-- 안전: 매개변수화 쿼리
SELECT * FROM users WHERE email = $1;
-- 위험: 절대 금지
-- "SELECT * FROM users WHERE email = '" + input + "'"
```

| 공격 | 방어 |
| --- | --- |
| SQL 인젝션 | 파라미터 바인딩, ORM, 최소 권한 DB 계정 |
| XSS | 출력 인코딩, CSP, 프레임워크 자동 이스케이프, `innerHTML` 지양 |
| CSRF | SameSite 쿠키, CSRF 토큰, 상태 변경은 POST |
| 명령 주입 | 셸 호출 회피, 인자 배열 전달, 입력 검증 |
| 경로 탐색 | 경로 정규화, 허용 디렉터리 제한 |

```html
<!-- 콘텐츠 보안 정책(CSP) — XSS 영향 최소화 -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'">
```

검증은 신뢰 경계(서버)에서 항상 수행한다. 클라이언트 검증은 UX 보조일 뿐이다.

---

## 5. 시크릿 관리

| 규칙 | 내용 |
| --- | --- |
| 코드에 비밀 금지 | `.env` 미커밋, `.env.example`만 공유 |
| 비밀 저장소 사용 | Vault/KMS/Secrets Manager |
| 회전(rotation) | 정기·사건 시 즉시 교체 |
| 최소 노출 | 런타임 주입, 로그·에러에 미노출 |
| 스캐닝 | 커밋·CI에서 시크릿 검출(gitleaks 등) |

```bash
# CI: 커밋된 시크릿 검사 (예시)
gitleaks detect --source . --redact
```

키·인증서 등은 [백엔드 가이드 §설정과 시크릿](21_BACKEND_GUIDE.md)의 환경 검증과 연계한다.

---

## 6. 데이터 보호 / 암호화

| 상태 | 통제 |
| --- | --- |
| 전송 중(in transit) | TLS 1.2+ 강제, HSTS, 약한 암호군 비활성 |
| 저장 시(at rest) | AES-256, 디스크/DB 암호화 |
| 사용 중(in use) | 메모리 내 민감 데이터 최소화·즉시 폐기 |

원칙:

- 개인정보(PII)는 최소 수집·최소 보존(데이터 최소화).
- 민감 식별자는 토큰화/마스킹하고, 필요 시 컬럼 단위 암호화([데이터베이스 가이드](23_DATABASE_GUIDE.md)).
- 비밀번호는 암호화가 아니라 **해싱**한다(복호화 불가).
- 데이터 분류(공개/내부/기밀/제한)에 따라 통제 수준을 차등 적용한다.

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

---

## 7. 시큐어 SDLC

| 단계 | 보안 활동 |
| --- | --- |
| 설계 | 위협 모델링(STRIDE), 보안 요구사항 |
| 개발 | 시큐어 코딩, 시크릿 스캔, SAST |
| 빌드 | 의존성 스캔(SCA), SBOM 생성 |
| 테스트 | DAST, 인증·인가 테스트([테스트 전략](30_TEST_STRATEGY.md)) |
| 배포 | 서명·무결성 검증, 최소 권한 런타임 |
| 운영 | 모니터링, 패치, 사고 대응 |

보안 검토는 [품질 체크리스트](29_QUALITY_CHECKLIST.md)의 게이트이며, 릴리스 전 [릴리스 프로세스](31_RELEASE_PROCESS.md)에서 확인한다.

---

## 8. 의존성 / 공급망 보안

| 통제 | 내용 |
| --- | --- |
| 의존성 스캔 | `npm audit`, Snyk/Dependabot로 알려진 취약점 탐지 |
| 버전 고정 | 락파일 커밋, 재현 가능한 빌드 |
| 무결성 검증 | 락파일 해시, 서명된 패키지 |
| SBOM | 소프트웨어 구성 명세 관리 |
| 최소 의존 | 불필요 패키지 제거, 신뢰 출처만 |

```yaml
# CI 공급망 검사 (예시)
- run: npm ci                  # 락파일 기반 재현 설치
- run: npm audit --audit-level=high
- run: npx @cyclonedx/cyclonedx-npm --output-file sbom.json
```

---

## 9. 로깅과 모니터링 (방어적 탐지)

```ts
// 보안 이벤트 로깅 (민감정보 제외)
securityLog.warn("auth.failed", {
  ip: req.ip, userId: maskId(attemptId), reason: "invalid_password",
});
```

- 인증 실패, 권한 거부, 비정상 트래픽, 설정 변경을 기록한다.
- 로그에 비밀번호·토큰·전체 PII를 남기지 않는다(마스킹).
- 이상 징후(다발 로그인 실패, 권한 상승 시도)에 실시간 알림을 건다.
- 로그는 변조 방지 저장소에 보존하고 보존 기간을 정한다.
- 관측성 기반은 [백엔드 가이드 §로깅과 관측성](21_BACKEND_GUIDE.md)을 따른다.

---

## 10. 보안 체크리스트

**인증/인가**
- [ ] 비밀번호 Argon2id/bcrypt 해싱, 평문 저장 없음
- [ ] 관리자·민감 작업 MFA
- [ ] 서버측 인가, 객체 수준 권한 검사(IDOR 방지)
- [ ] 안전 쿠키(HttpOnly/Secure/SameSite), 단기 토큰

**입력/출력**
- [ ] 모든 입력 서버측 스키마 검증(허용 목록)
- [ ] 파라미터 바인딩으로 SQL 인젝션 방어
- [ ] 출력 인코딩 + CSP로 XSS 방어
- [ ] CSRF 방어(SameSite/토큰)

**데이터/시크릿**
- [ ] TLS 1.2+ 강제, HSTS 적용
- [ ] 저장 데이터 암호화, PII 최소화·마스킹
- [ ] 시크릿 비밀 저장소 관리, 코드 미포함, 회전

**공급망/운영**
- [ ] 의존성 스캔·SBOM, 락파일 고정
- [ ] 보안 이벤트 로깅·알림, 로그에 비밀 미노출
- [ ] 위협 모델링·보안 검토 수행

---

## 11. 사고 대응 개요

| 단계 | 활동 |
| --- | --- |
| 탐지 | 알림·로그 분석으로 사건 식별 |
| 격리 | 영향 범위 차단, 자격증명 회전 |
| 근절 | 취약점 제거, 패치 |
| 복구 | 안전 확인 후 서비스 정상화 |
| 사후 | 원인 분석, [의사결정 로그](32_DECISION_LOG.md)·[공통 오류](39_COMMON_ERRORS.md) 갱신 |

---

## 관련 골드위키 문서

- [21 · 백엔드 가이드](21_BACKEND_GUIDE.md) — 인증 미들웨어·로깅·설정 보안.
- [22 · API 표준](22_API_STANDARD.md) — 인증 흐름·레이트리밋·웹훅 서명.
- [23 · 데이터베이스 가이드](23_DATABASE_GUIDE.md) — 암호화·최소 권한·접근 통제.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — CSP·클라이언트 비밀 미노출.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) — 보안 품질 게이트.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 무결성·서명 검증.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
