# 06 · 비즈니스 분석 (BA 방법론)

| 항목 | 내용 |
| --- | --- |
| **목적** | 요구사항을 정교화하고 추적 가능하게 관리하여, 제품·디자인·구현으로 안전하게 인계한다. 이해관계자 분석, 요구공학, as-is/to-be, 프로세스 모델링, WBS, 인수기준, 추적성을 표준화한다. |
| **대상 독자** | Business Analyst, Product Owner, Service Planner, UX Researcher |
| **담당(Owner) 에이전트** | Business Analyst |
| **참조(상위 문서)** | [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md), [RFP 심층 분석](04_RFP_ANALYSIS.md) |
| **연계(하위 문서)** | [제안 전략](05_PROPOSAL_STRATEGY.md), [정보구조(IA)](11_INFORMATION_ARCHITECTURE.md), [사용자 플로우](12_USER_FLOW.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 이해관계자 분석

| 이해관계자 | 관심사 | 영향력 | 관여 전략 |
| --- | --- | --- | --- |
| 발주처 사업담당 | 적기·예산 내 성공 | 높음 | 정기 보고·게이트 공유 |
| 최종 사용자(국민) | 사용 편의·접근성 | 낮음(직접)/높음(평가) | 여정 지도·사용성 검증([13](13_USER_JOURNEY.md)) |
| 보안·감사 부서 | 규제 준수 | 높음 | 보안 설계 사전 협의([24](24_SECURITY_GUIDE.md)) |
| 운영 부서 | 유지보수성 | 중간 | 운영 이관 자산([31](31_RELEASE_PROCESS.md)) |

권력-관심(Power-Interest) 그리드로 분류하여 "고권력·고관심"은 긴밀 관리, "저권력·저관심"은 통보 수준으로 관여한다.

---

## 2. 요구공학 (Requirements Engineering)

### 기능 요구 (Functional)
사용자가 수행할 수 있어야 하는 동작. 형식: "[사용자]는 [조건]에서 [동작]을 할 수 있다."

| ID | 기능 요구 | 우선순위(MoSCoW) | 출처 |
| --- | --- | --- | --- |
| FR-01 | 사용자는 통합 검색으로 콘텐츠를 찾을 수 있다 | Must | R-001 |
| FR-02 | 사용자는 3클릭 이내에 민원을 신청할 수 있다 | Must | R-007 |
| FR-03 | 사용자는 신청 진행 상태를 조회할 수 있다 | Should | R-009 |

### 비기능 요구 (Non-Functional)
| ID | 범주 | 요구 | 측정 기준 |
| --- | --- | --- | --- |
| NFR-01 | 성능 | 동시접속 5,000, 응답 < 2초 | 부하 테스트([30](30_TEST_STRATEGY.md)) |
| NFR-02 | 접근성 | WCAG 2.1 AA | 자동·수동 점검([16](16_ACCESSIBILITY.md)) |
| NFR-03 | 보안 | 개인정보 암호화 | OWASP 점검([24](24_SECURITY_GUIDE.md)) |
| NFR-04 | 가용성 | 99.9% | 모니터링 |

요구 추출 기법: 문서 분석(RFP), 인터뷰, 워크숍, 관찰, 프로토타이핑. 모호 항목은 질의응답으로 해소하고 [의사결정 로그](32_DECISION_LOG.md)에 결정 근거를 남긴다.

---

## 3. As-Is / To-Be 분석

| 영역 | As-Is (현행) | To-Be (목표) | 변화 동인 |
| --- | --- | --- | --- |
| 검색 | 메뉴 탐색 의존, 실패율 높음 | 통합 검색·자동완성 | FR-01 |
| 민원 신청 | 7단계, 이탈 잦음 | 3클릭 플로우 | FR-02 |
| 접근성 | 부분 준수 | AA 전면 준수 | NFR-02 |
| 인프라 | 단일 서버, 성능 병목 | 캐싱·CDN·확장 구조 | NFR-01 |

To-Be는 [사용자 플로우](12_USER_FLOW.md)와 [정보구조(IA)](11_INFORMATION_ARCHITECTURE.md) 설계의 기준이 된다.

---

## 4. 프로세스 모델링

핵심 업무 흐름을 표준 표기로 모델링한다.

```
[사용자] → 로그인 → 민원 종류 선택 → 정보 입력 → 검증
   → (검증 실패) → 오류 안내 → 재입력
   → (검증 성공) → 제출 → 접수번호 발급 → 상태 조회
```

모델링 산출물: 비즈니스 프로세스 다이어그램, 스윔레인(역할별 책임), 예외 흐름. 인터랙션 세부는 [사용자 플로우](12_USER_FLOW.md)로 인계한다.

---

## 5. WBS (작업 분해 구조)

| WBS ID | 작업 패키지 | 산출물 | 담당 | 연계 |
| --- | --- | --- | --- | --- |
| 1.0 | 분석·기획 | 요구명세, BA 산출물 | Business Analyst | [04](04_RFP_ANALYSIS.md) |
| 2.0 | UX·디자인 | IA, 플로우, 화면 | UX/UI | [11](11_INFORMATION_ARCHITECTURE.md) |
| 3.0 | 프로토타입 | HTML 프로토타입 | Frontend | [20](20_FRONTEND_GUIDE.md) |
| 4.0 | 구현 | 프런트·백엔드·API | Eng. 본부 | [21](21_BACKEND_GUIDE.md) |
| 5.0 | 품질·보안 | 테스트·보안 결과 | QA/Security | [30](30_TEST_STRATEGY.md) |
| 6.0 | 릴리스·이관 | 릴리스, 운영 문서 | DevOps/Doc | [31](31_RELEASE_PROCESS.md) |

WBS는 [제안 전략](05_PROPOSAL_STRATEGY.md)의 공수·가격 산정 기준이 된다.

---

## 6. 인수기준 (Acceptance Criteria)

각 요구는 검증 가능한 인수기준을 가진다. 형식: Given-When-Then.

```
[FR-02 민원 3클릭 신청]
Given 로그인한 사용자가 메인 화면에 있을 때
When 민원 신청 버튼을 누르고 종류 선택 후 제출하면
Then 3번의 클릭 이내에 접수번호가 발급된다
And 모든 단계는 WCAG AA 키보드 접근이 가능하다
```

인수기준은 [테스트 전략](30_TEST_STRATEGY.md)의 테스트 케이스와 [품질 체크리스트](29_QUALITY_CHECKLIST.md)의 게이트 기준으로 직결된다.

---

## 7. 추적성 매트릭스 (Traceability Matrix)

요구가 설계·구현·테스트까지 빠짐없이 연결됨을 보증한다.

| 요구 ID | RFP 출처 | 설계 산출물 | 구현 모듈 | 테스트 케이스 | 상태 |
| --- | --- | --- | --- | --- | --- |
| FR-01 | R-001 | IA, 검색 플로우 | search-service | TC-S-01~05 | 완료 |
| FR-02 | R-007 | 민원 플로우 | apply-service | TC-A-01~04 | 진행 |
| NFR-01 | R-018 | 아키텍처 문서 | infra/cache | TC-P-01(부하) | 계획 |
| NFR-02 | R-012 | 접근성 가이드 | 전 컴포넌트 | TC-X-01~10 | 진행 |

전·후방 추적성을 모두 유지하여 변경 영향 분석을 가능하게 한다.

---

## 8. Product Owner · 디자인으로의 인계

| 인계 대상 | 인계물 | 형식 | 게이트 |
| --- | --- | --- | --- |
| Product Owner | 우선순위 백로그, 인수기준 | 사용자 스토리 | 백로그 리뷰 |
| UX Researcher | 요구·페인 포인트·이해관계자 분석 | 리서치 입력 | — |
| UI Designer | 기능 명세, To-Be 흐름 | 설계 입력 | G3 설계 승인([03](03_RFP_FRAMEWORK.md)) |

인계 시 추적성 매트릭스를 함께 전달하여 다운스트림 산출물이 요구로 추적 가능하도록 한다.

---

## 관련 골드위키 문서
- [RFP 심층 분석](04_RFP_ANALYSIS.md) — BA의 입력이 되는 요구 추출.
- [제안 전략](05_PROPOSAL_STRATEGY.md) — WBS 기반 공수 산정.
- [정보구조(IA)](11_INFORMATION_ARCHITECTURE.md) — To-Be 구조 설계.
- [사용자 플로우](12_USER_FLOW.md) — 프로세스의 화면 흐름화.
- [테스트 전략](30_TEST_STRATEGY.md) — 인수기준 기반 테스트.
- [의사결정 로그](32_DECISION_LOG.md) — 요구 결정 기록.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
