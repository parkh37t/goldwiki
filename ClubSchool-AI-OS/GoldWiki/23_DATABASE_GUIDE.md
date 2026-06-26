# 23 · 데이터베이스 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 데이터 모델링·네이밍·인덱싱·마이그레이션·트랜잭션·성능·백업 표준을 정의하여 정확하고 확장 가능한 데이터 계층을 보장한다. |
| **대상 독자** | 데이터베이스 아키텍트, 백엔드 엔지니어, API 엔지니어, 데브옵스 엔지니어 |
| **담당(Owner) 에이전트** | Database Architect |
| **참조(상위 문서)** | [백엔드 가이드](21_BACKEND_GUIDE.md), [API 표준](22_API_STANDARD.md), [보안 가이드](24_SECURITY_GUIDE.md) |
| **연계(하위 문서)** | [테스트 전략](30_TEST_STRATEGY.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 기본 원칙

1. **데이터 정합성 우선:** 제약조건(constraint)을 DB 수준에서 강제하여 무결성을 보장한다.
2. **명시적 스키마:** 스키마는 마이그레이션으로 버전 관리하며, 수동 변경을 금지한다.
3. **정규화 후 의도적 비정규화:** 기본은 3NF, 성능상 필요할 때만 측정 기반으로 비정규화한다.
4. **성능은 측정으로:** 인덱스·쿼리는 실행 계획(EXPLAIN)으로 검증한다.
5. **보안 내재:** 최소 권한, 민감 데이터 암호화([보안 가이드](24_SECURITY_GUIDE.md)).

---

## 2. 데이터 모델링과 정규화

| 정규형 | 규칙 | 효과 |
| --- | --- | --- |
| 1NF | 원자값, 반복 그룹 제거 | 셀에 단일 값 |
| 2NF | 부분 함수 종속 제거 | 복합키 의존 정리 |
| 3NF | 이행 함수 종속 제거 | 갱신 이상 방지 |

- 기본은 3NF를 목표로 하고, 읽기 성능을 위한 비정규화는 [의사결정 로그](32_DECISION_LOG.md)에 근거를 남긴다.
- 관계는 외래키로 명시한다. 다대다는 연결 테이블(join table)로 표현한다.
- 열거형(상태 등)은 `CHECK` 제약 또는 참조 테이블로 강제한다.

---

## 3. 네이밍 규칙

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 테이블 | 복수 `snake_case` | `projects`, `project_tasks` |
| 컬럼 | 단수 `snake_case` | `created_at`, `owner_id` |
| 기본키 | `id` | `id` |
| 외래키 | `<단수테이블>_id` | `project_id` |
| 인덱스 | `idx_<테이블>_<컬럼>` | `idx_tasks_project_id` |
| 유니크 | `uq_<테이블>_<컬럼>` | `uq_users_email` |
| 제약조건 | `chk_`, `fk_` 접두 | `chk_projects_status` |
| 불리언 | `is_`/`has_` 접두 | `is_active` |
| 타임스탬프 | `_at` 접미(UTC) | `deleted_at` |

---

## 4. 예시 스키마 (PostgreSQL DDL)

```sql
-- 사용자
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       CITEXT NOT NULL,
  full_name   TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'member'
              CHECK (role IN ('admin', 'manager', 'member')),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_users_email UNIQUE (email)
);

-- 프로젝트
CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL CHECK (char_length(title) >= 2),
  status      TEXT NOT NULL DEFAULT 'draft'
              CHECK (status IN ('draft', 'active', 'done')),
  owner_id    UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at  TIMESTAMPTZ                       -- 소프트 삭제
);

-- 태스크 (프로젝트 1:N)
CREATE TABLE project_tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  done        BOOLEAN NOT NULL DEFAULT FALSE,
  due_date    DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 태그 다대다 (연결 테이블)
CREATE TABLE project_tags (
  project_id  UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag         TEXT NOT NULL,
  PRIMARY KEY (project_id, tag)
);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

설계 포인트: UUID 기본키(분산 친화), `TIMESTAMPTZ`로 UTC 저장, `CHECK`로 상태값 강제, 소프트 삭제(`deleted_at`)로 감사 추적 보존.

---

## 5. 인덱싱

```sql
-- 외래키·조회 컬럼 인덱스
CREATE INDEX idx_projects_owner_id ON projects(owner_id);
CREATE INDEX idx_tasks_project_id  ON project_tasks(project_id);

-- 복합 인덱스 (선택도 높은 컬럼 우선, 정렬 순서 고려)
CREATE INDEX idx_projects_status_created
  ON projects(status, created_at DESC);

-- 부분 인덱스 (활성 행만)
CREATE INDEX idx_projects_active
  ON projects(created_at DESC) WHERE deleted_at IS NULL;

-- 텍스트 검색 (트라이그램)
CREATE INDEX idx_projects_title_trgm
  ON projects USING gin (title gin_trgm_ops);
```

| 지침 | 설명 |
| --- | --- |
| 모든 외래키에 인덱스 | 조인·삭제 성능 |
| 복합 인덱스 컬럼 순서 | 등치 조건 → 범위 → 정렬 |
| 부분 인덱스 활용 | 활성 행만 인덱싱하여 크기 절감 |
| 과인덱싱 경계 | 쓰기 비용·저장 공간 증가 |
| 커버링 인덱스 | `INCLUDE`로 인덱스만으로 응답 |

---

## 6. 마이그레이션

| 규칙 | 내용 |
| --- | --- |
| 버전 관리 | 모든 변경은 번호/타임스탬프 마이그레이션 파일 |
| 전진 전용 + 롤백 | `up`/`down` 또는 보상 마이그레이션 제공 |
| 무중단(Zero-downtime) | 확장-수축(expand-contract) 패턴 |
| 가산적 변경 | 컬럼 추가는 nullable/기본값으로 |
| 대용량 작업 분리 | 인덱스 생성은 `CONCURRENTLY` |

```sql
-- 무중단 컬럼 추가 (확장 단계)
ALTER TABLE projects ADD COLUMN priority INT;          -- nullable
-- 백필 (배치로 부하 분산)
UPDATE projects SET priority = 3 WHERE priority IS NULL;
-- 수축 단계 (모든 코드가 새 컬럼 사용 후)
ALTER TABLE projects ALTER COLUMN priority SET DEFAULT 3;
ALTER TABLE projects ALTER COLUMN priority SET NOT NULL;

-- 운영 중 인덱스 생성 (락 최소화)
CREATE INDEX CONCURRENTLY idx_projects_priority ON projects(priority);
```

마이그레이션은 [릴리스 프로세스](31_RELEASE_PROCESS.md)와 연동해 배포 전 자동 적용한다.

---

## 7. 트랜잭션

```sql
BEGIN;
  INSERT INTO projects (id, title, owner_id)
    VALUES (gen_random_uuid(), 'RFP 분석', :owner) RETURNING id;
  INSERT INTO project_tasks (project_id, title)
    VALUES (:pid, '요구사항 정리');
COMMIT;
```

| 격리 수준 | 사용 | 주의 |
| --- | --- | --- |
| Read Committed | 기본 | 비반복 읽기 가능 |
| Repeatable Read | 일관 스냅샷 필요 시 | 직렬화 실패 재시도 |
| Serializable | 강한 정합 필요 시 | 충돌 시 재시도 로직 |

원칙: 트랜잭션은 짧게(외부 호출 금지), 애플리케이션 트랜잭션 경계는 유스케이스 단위([백엔드 가이드](21_BACKEND_GUIDE.md)). 낙관적 락(버전 컬럼)으로 동시 수정 충돌을 감지한다.

---

## 8. 샘플 쿼리

```sql
-- 활성 프로젝트 + 미완료 태스크 수 (페이지네이션)
SELECT p.id, p.title,
       COUNT(t.id) FILTER (WHERE NOT t.done) AS open_tasks
FROM projects p
LEFT JOIN project_tasks t ON t.project_id = p.id
WHERE p.deleted_at IS NULL AND p.status = 'active'
GROUP BY p.id
ORDER BY p.created_at DESC
LIMIT 20;

-- 커서 페이지네이션 (22_API_STANDARD 정합)
SELECT id, title, created_at
FROM projects
WHERE deleted_at IS NULL AND created_at < :cursor_ts
ORDER BY created_at DESC
LIMIT 20;

-- 실행 계획 확인 (성능 검증)
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM projects WHERE owner_id = :owner AND status = 'active';
```

---

## 9. 성능

| 기법 | 설명 |
| --- | --- |
| EXPLAIN ANALYZE | 실제 실행 계획·시간 확인 |
| N+1 제거 | 조인/배치 로딩으로 일괄 조회 |
| 연결 풀링 | PgBouncer 등으로 커넥션 재사용 |
| 읽기 복제본 | 조회 트래픽 분산 |
| 파티셔닝 | 대용량 시계열 테이블 분할 |
| 구체화 뷰 | 무거운 집계 사전 계산 |

원칙: 추측하지 말고 측정한다. 느린 쿼리 로그를 켜고 상위 비용 쿼리를 주기적으로 점검한다.

---

## 10. 백업과 복구

| 항목 | 표준 |
| --- | --- |
| 전체 백업 | 일 1회 자동 |
| 증분/WAL 보관 | 지속적(PITR 지원) |
| 복구 목표 | RPO ≤ 15분, RTO ≤ 1시간 |
| 복구 훈련 | 분기 1회 실제 복원 테스트 |
| 보관 정책 | 일별 30일 / 월별 12개월 |
| 암호화 | 저장·전송 시 암호화([보안 가이드](24_SECURITY_GUIDE.md)) |

> 검증되지 않은 백업은 백업이 아니다. 복원 테스트를 정례화한다.

---

## 11. 데이터 리뷰 체크리스트

- [ ] 네이밍 규칙 준수, 제약조건으로 무결성 강제
- [ ] 적절한 정규화, 비정규화는 근거 기록
- [ ] 외래키·조회 컬럼 인덱스 존재, EXPLAIN 검증
- [ ] 마이그레이션 버전 관리, 무중단 패턴
- [ ] 트랜잭션 짧고 경계 명확
- [ ] 민감 데이터 암호화·최소 권한
- [ ] 백업·복구 정책 적용 및 복원 테스트
- [ ] N+1·느린 쿼리 점검

---

## 관련 골드위키 문서

- [21 · 백엔드 가이드](21_BACKEND_GUIDE.md) — 리포지토리·트랜잭션 경계.
- [22 · API 표준](22_API_STANDARD.md) — 페이지네이션·리소스 계약.
- [24 · 보안 가이드](24_SECURITY_GUIDE.md) — 암호화·접근 통제.
- [30 · 테스트 전략](30_TEST_STRATEGY.md) — DB 통합 테스트·픽스처.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 마이그레이션 배포.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
