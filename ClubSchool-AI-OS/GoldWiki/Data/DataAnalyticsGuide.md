# 데이터 분석 가이드 — 데이터 모델링·지표 정의·대시보드

> 이 문서는 GoldWiki(SSOT)에 속한다. 데이터·지표 작업 전, 모든 에이전트는 이 문서와 [데이터베이스 가이드(번호형)](../23_DATABASE_GUIDE.md)·[백엔드 가이드](../Backend/BackendGuide.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `data-analytics-lead` |
| **협업 에이전트** | `backend-lead`, `product-strategy-lead`, `business-analysis-lead`, `ai-automation-lead`, `security-risk-lead` |
| **상위 참조** | [데이터베이스 가이드(번호형)](../23_DATABASE_GUIDE.md), [비즈니스 분석(번호형)](../06_BUSINESS_ANALYSIS.md), [비즈니스 목표(번호형)](../02_BUSINESS_GOALS.md) |
| **연계** | [백엔드 가이드](../Backend/BackendGuide.md), [AI 자동화 가이드](../AI/AIAutomationGuide.md), [품질 체크리스트(번호형)](../29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

신뢰할 수 있는 데이터 모델, 일관된 지표 정의(metric definition), 의사결정에 쓰이는 대시보드를 만들기 위한 표준을 정의한다. "지표는 한 번 정의하고 한 곳에서 관리한다"는 단일 지표 정의 원칙을 적용한다.

## 언제 사용하는가

- 제품·운영 지표를 정의하고 측정 체계를 설계할 때.
- 분석용 데이터 모델(스타 스키마/마트)을 설계할 때.
- 경영진·클라이언트용 대시보드를 구축할 때.
- A/B 테스트·코호트 분석 등 분석 파이프라인을 설계할 때.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 비즈니스 목표·KPI | [비즈니스 목표(번호형)](../02_BUSINESS_GOALS.md), [비즈니스 분석(번호형)](../06_BUSINESS_ANALYSIS.md) |
| 운영 DB 스키마 | [데이터베이스 가이드(번호형)](../23_DATABASE_GUIDE.md), [백엔드 가이드](../Backend/BackendGuide.md) |
| 이벤트 트래킹 명세 | 프론트엔드·제품 기획 |
| 거버넌스·PII 정책 | [보안 가이드(번호형)](../24_SECURITY_GUIDE.md) |

## 처리 방식

### 1) 데이터 모델링 — 메달리온 + 차원 모델

```
Bronze(원천 적재) → Silver(정제·표준화) → Gold(분석 마트: 팩트/차원)
```

- **팩트 테이블**: 측정 가능한 이벤트(예: `fact_proposal_event`) — 외래키 + 지표값.
- **차원 테이블**: 맥락(`dim_client`, `dim_date`, `dim_agent`).
- 스타 스키마 우선, 변경 추적이 필요한 차원은 SCD Type 2.

```sql
-- Gold: 제안 전환 팩트
CREATE TABLE fact_proposal_event (
  event_id      BIGINT PRIMARY KEY,
  date_key      INT  REFERENCES dim_date(date_key),
  client_key    INT  REFERENCES dim_client(client_key),
  stage         TEXT,            -- rfp / draft / submitted / won / lost
  amount_krw    NUMERIC(14,0),
  created_at    TIMESTAMPTZ
);
```

### 2) 지표 정의 (단일 정의 · 메트릭 레이어)

지표는 코드/문서로 한 곳에 정의하고 대시보드·리포트가 공유한다.

| 지표 | 정의 | 분모/분자 | 소유 |
| --- | --- | --- | --- |
| 수주 전환율 | 제출 대비 수주 비율 | `won / submitted` | data-analytics-lead |
| 제안 리드타임 | RFP 접수→제출 평균 일수 | `avg(submitted_at - rfp_at)` | pmo-director |
| 산출물 1차 통과율 | 품질 게이트 1회 통과 비율 | `pass_first / total` | qa-lead |
| 에이전트 재작업률 | 반려 후 재작업 비율 | `rework / total_tasks` | coo-operator |

```sql
-- 수주 전환율 (단일 정의 예시)
SELECT
  d.year, d.month,
  COUNT(*) FILTER (WHERE stage = 'won')::float
    / NULLIF(COUNT(*) FILTER (WHERE stage = 'submitted'), 0) AS win_rate
FROM fact_proposal_event f JOIN dim_date d ON f.date_key = d.date_key
GROUP BY d.year, d.month ORDER BY d.year, d.month;
```

원칙: 같은 지표가 두 가지 숫자를 내면 안 된다. 정의 변경은 [의사결정 로그](../DecisionLog/README.md)에 기록한다.

### 3) 분석 파이프라인

```
수집(이벤트/CDC) → 적재(Bronze) → 변환(dbt 등, Silver/Gold)
→ 테스트(스키마·신선도·유일성) → 서빙(BI/대시보드) → 모니터링
```

- 멱등 적재, 증분 처리, 데이터 신선도 SLA 정의.
- 데이터 테스트(not null/unique/관계/허용값)를 CI에 통합.
- 계보(lineage) 문서화로 영향 분석 가능하게.

### 4) 대시보드

- **북극성 지표(NSM)** 상단, 그 아래 입력 지표(드라이버) 배치.
- 청중별 뷰: 경영진(요약·추세), 운영(드릴다운), 클라이언트(성과 보고).
- 필터(기간·세그먼트), 비교(전기 대비), 주석(이벤트 표시).
- 접근성·대비는 [접근성(번호형)](../16_ACCESSIBILITY.md) 준수, 단일 색에 의존하지 않음.

### 5) 거버넌스

PII 최소 수집·마스킹, 접근 권한(RBAC), 보존·삭제 정책, 익명화 분석. 상세는 [보안 가이드](../24_SECURITY_GUIDE.md).

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| 데이터 모델 | ERD, 팩트/차원 정의 |
| 지표 사전 | 정의·계산식·소유자 |
| 변환 코드 | dbt/SQL + 데이터 테스트 |
| 대시보드 | 청중별 뷰 |
| 분석 리포트 | 코호트·A/B·추세 |

## 품질 기준

- [ ] 모든 지표가 단일 정의(중복·불일치 0).
- [ ] 데이터 테스트 통과(신선도·유일성·관계).
- [ ] 대시보드 수치가 원천과 대사(reconcile) 일치.
- [ ] PII 마스킹·접근 권한 적용.
- [ ] 지표 정의 변경 이력이 [의사결정 로그](../DecisionLog/README.md)에 기록.

## 체크리스트

- [ ] 지표 사전에 정의·계산식·소유자 명시.
- [ ] 팩트/차원 키 정합, 신선도 SLA 설정.
- [ ] 대시보드 청중·NSM·드라이버 정의.
- [ ] 데이터 계보 문서화.
- [ ] 분석 결과를 [프로젝트 메모리](../ProjectMemory/README.md)에 반영.

## 예시 프롬프트

```
역할: data-analytics-lead. GoldWiki Data/DataAnalyticsGuide.md, 23_DATABASE_GUIDE.md, 02_BUSINESS_GOALS.md를 먼저 읽어라.
작업: 제안 파이프라인 지표(전환율·리드타임·재작업률)를 정의하고 경영진 대시보드를 설계.
출력: 지표 사전, 팩트/차원 모델, 핵심 SQL, 대시보드 와이어, 데이터 테스트 목록.
완료 후 지표 정의를 DecisionLog에, 결과 인사이트를 ProjectMemory에 기록하라.
```

---

### 관련 문서
[Data README](README.md) · [백엔드 가이드](../Backend/BackendGuide.md) · [AI 자동화 가이드](../AI/AIAutomationGuide.md) · [23_DATABASE_GUIDE](../23_DATABASE_GUIDE.md) · [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md) · [06_BUSINESS_ANALYSIS](../06_BUSINESS_ANALYSIS.md)
