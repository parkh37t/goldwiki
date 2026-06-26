# 03 · RFP 대응 프레임워크

| 항목 | 내용 |
| --- | --- |
| **목적** | RFP 접수부터 납품·운영 이관까지를 재사용 가능한 21단계 파이프라인으로 표준화한다. 각 단계의 담당 에이전트, 산출 아티팩트, 갱신 골드위키 문서, 게이트 기준을 정의한다. |
| **대상 독자** | Project Director, Sales Director, Proposal Strategist, 전 본부 에이전트 |
| **담당(Owner) 에이전트** | Project Director |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [비즈니스 목표](02_BUSINESS_GOALS.md) |
| **연계(하위 문서)** | [RFP 심층 분석](04_RFP_ANALYSIS.md), [제안 전략](05_PROPOSAL_STRATEGY.md), [비즈니스 분석](06_BUSINESS_ANALYSIS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 접수 체크리스트

RFP가 도착하면 Sales Director가 다음 항목을 먼저 확인한다.

- [ ] RFP 원문·첨부·붙임 서류를 모두 확보했는가
- [ ] 발주처·사업명·예산 범위·계약 형태를 식별했는가
- [ ] 제출 마감일·질의응답 기한·설명회 일정을 캘린더에 등록했는가
- [ ] 자격 요건(실적·인증·재무)을 충족하는가
- [ ] 평가 방식(기술/가격 배점)을 파악했는가
- [ ] 필수 제출 서식·분량 제한·제출 채널을 확인했는가
- [ ] 명백한 결격·이해상충 사유가 없는가
- [ ] [클라이언트 지식](34_CLIENT_KNOWLEDGE.md)에 기존 고객 이력이 있는가

---

## 2. 분류 체계 (Taxonomy)

| 분류축 | 값 |
| --- | --- |
| **산업** | 공공 / 금융 / 대기업 / 성장기업 |
| **유형** | 신규 구축 / 고도화 / 운영 유지 / 컨설팅 |
| **범위** | RFP·제안 단독 / 디자인 / 풀스택 / QA / 통합 풀스펙트럼 |
| **규모** | S(< 1억) / M(1–5억) / L(5–20억) / XL(> 20억) |
| **난이도** | 1(표준) ~ 5(고복잡·고규제) |
| **우선순위** | P1(전략) / P2(표준) / P3(기회주의) |

분류 결과는 라우팅과 자원 배정의 근거가 된다.

---

## 3. 21단계 파이프라인

각 단계는 **담당 에이전트 · 산출 아티팩트 · 갱신 골드위키 문서 · 게이트**로 정의된다.

| # | 단계 | 담당 에이전트 | 산출 아티팩트 | 갱신 문서 |
| --- | --- | --- | --- | --- |
| 1 | RFP 접수·자격 판단 | Sales Director | 접수 체크리스트, Go/No-Go 메모 | [34](34_CLIENT_KNOWLEDGE.md), [32](32_DECISION_LOG.md) |
| 2 | 분류·라우팅 | Project Director | 분류표, 자원 배정안 | [35](35_PROJECT_MEMORY.md) |
| 3 | RFP 심층 분석 | Business Analyst | 요구사항 분해표, 평가기준 매핑 | [04](04_RFP_ANALYSIS.md) |
| 4 | 리스크 평가 | Project Director | 리스크 레지스터 | [32](32_DECISION_LOG.md), [39](39_COMMON_ERRORS.md) |
| 5 | 경쟁·시장 분석 | Proposal Strategist | 경쟁 포지셔닝 맵 | [36](36_REFERENCE_LIBRARY.md) |
| 6 | 윈 전략 수립 | Proposal Strategist | 윈 테마, 가치제안 캔버스 | [05](05_PROPOSAL_STRATEGY.md) |
| 7 | 비즈니스 분석 | Business Analyst | as-is/to-be, 추적성 매트릭스 | [06](06_BUSINESS_ANALYSIS.md) |
| 8 | 제품·서비스 기획 | Product Owner, Service Planner | 기능 명세, 우선순위 백로그 | [35](35_PROJECT_MEMORY.md) |
| 9 | UX 리서치 | UX Researcher | 페르소나, 여정 지도 | [13](13_USER_JOURNEY.md) |
| 10 | 정보구조·플로우 | UX Researcher | 사이트맵, 사용자 플로우 | [11](11_INFORMATION_ARCHITECTURE.md), [12](12_USER_FLOW.md) |
| 11 | UI 디자인 | UI Designer | 화면 디자인, 토큰 적용본 | [08](08_UI_GUIDELINES.md), [15](15_DESIGN_TOKEN.md) |
| 12 | 디자인 시스템·접근성 | BX/Interaction/Accessibility | 컴포넌트, WCAG 검증 결과 | [09](09_DESIGN_SYSTEM.md), [16](16_ACCESSIBILITY.md) |
| 13 | 프로토타이핑 | Publishing/Frontend Engineer | HTML 프로토타입 | [17](17_HTML_GUIDE.md), [20](20_FRONTEND_GUIDE.md) |
| 14 | 아키텍처 설계 | Backend/API/Database Architect | 아키텍처·데이터 모델 문서 | [21](21_BACKEND_GUIDE.md), [22](22_API_STANDARD.md), [23](23_DATABASE_GUIDE.md) |
| 15 | 구현 | Frontend/Backend Engineer | 소스 코드, 단위 테스트 | [19](19_JS_GUIDE.md), [21](21_BACKEND_GUIDE.md) |
| 16 | 보안 검토 | Security Engineer | 보안 점검 보고서 | [24](24_SECURITY_GUIDE.md) |
| 17 | QA·테스트 | QA Engineer | 테스트 케이스·결과, 결함 리포트 | [29](29_QUALITY_CHECKLIST.md), [30](30_TEST_STRATEGY.md) |
| 18 | 제안서 작성·레드팀 | Proposal Strategist | 최종 제안서, 레드팀 의견서 | [05](05_PROPOSAL_STRATEGY.md) |
| 19 | 제출·발표 | Sales Director | 제출본, 발표 자료 | [33](33_MEETING_NOTE.md) |
| 20 | 계약·킥오프 | Project Director | 계약서, 킥오프 자료 | [34](34_CLIENT_KNOWLEDGE.md) |
| 21 | 납품·운영 이관 | DevOps/Documentation Specialist | 릴리스 노트, 회고 | [31](31_RELEASE_PROCESS.md), [35](35_PROJECT_MEMORY.md), [37](37_BEST_PRACTICES.md) |

> 비고: 제안 단독 사업은 1–6, 18–19단계로 축약하고, 풀스펙트럼 사업은 전 단계를 수행한다.

---

## 4. RACI 매트릭스

R=실행, A=책임, C=자문, I=통보.

| 활동 | Sales Director | Proposal Strategist | Business Analyst | Project Director | 본부 에이전트 | CEO |
| --- | --- | --- | --- | --- | --- | --- |
| Go/No-Go 판정 | R | C | C | A | I | I |
| RFP 분석 | I | C | R/A | C | C | I |
| 윈 전략 | C | R/A | C | C | I | C |
| 설계·구현 | I | I | C | A | R | I |
| 품질 게이트 | I | I | I | A | R(QA) | I |
| 제안 제출 | R/A | C | I | C | I | I |
| 대형(XL) 입찰 승인 | C | C | I | C | I | R/A |

---

## 5. SLA (단계별 표준 처리 시간)

| 단계 군 | 표준 SLA | 비고 |
| --- | --- | --- |
| 접수·자격 판단(1–2) | 1 영업일 | 마감 임박 시 즉시 처리 |
| 분석·전략(3–6) | 3 영업일 | 난이도 4–5는 +2일 |
| 비즈니스·기획(7–8) | 3 영업일 | — |
| 디자인(9–12) | 5 영업일/주요 화면셋 | 처리량 KPI 연동 |
| 구현·보안·QA(13–17) | 사업별 산정 | [05](05_PROPOSAL_STRATEGY.md) 공수 산정 |
| 제안 마무리(18–19) | 2 영업일 | 레드팀 포함 |

SLA 초과 위험은 즉시 Project Director에게 에스컬레이션한다.

---

## 6. 단계 간 게이트 기준

각 게이트는 통과 조건을 충족해야 다음 단계로 진행한다. 상세 체크리스트는 [품질 체크리스트](29_QUALITY_CHECKLIST.md)를 따른다.

| 게이트 | 위치 | 통과 조건 |
| --- | --- | --- |
| **G1 입찰 진입** | 2→3 | Go 판정, 자격 충족, 자원 확보 |
| **G2 분석 완료** | 6→7 | 요구사항 분해 100%, 윈 테마 승인 |
| **G3 설계 승인** | 12→13 | IA·플로우·접근성 검증 통과 |
| **G4 구현 준비** | 14→15 | 아키텍처·데이터 모델 리뷰 통과 |
| **G5 품질 통과** | 17→18 | 결함 유출 기준 충족, 보안 통과 |
| **G6 제출 승인** | 18→19 | 레드팀 통과, 컴플라이언스 매트릭스 100% |
| **G7 인수 완료** | 20→21 | 인수기준 충족, 운영 이관 준비 완료 |

---

## 7. 골드위키 우선 원칙

모든 에이전트는 각 단계 진입 시 (1) 자신의 단계 행에서 읽어야 할 골드위키 문서를 확인하고, (2) 산출물은 [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md)의 템플릿으로 작성하며, (3) 결정·학습을 거버넌스 푸터 4개 문서에 환류한다.

---

## 관련 골드위키 문서
- [RFP 심층 분석](04_RFP_ANALYSIS.md) — 3단계 분석 플레이북.
- [제안 전략](05_PROPOSAL_STRATEGY.md) — 6·18단계 윈 전략.
- [비즈니스 분석](06_BUSINESS_ANALYSIS.md) — 7단계 BA 방법론.
- [품질 체크리스트](29_QUALITY_CHECKLIST.md) — 게이트 상세 기준.
- [자동화 워크플로](27_AUTOMATION_WORKFLOW.md) — 파이프라인 자동화.
- [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) — 단계별 산출물 템플릿.
- [클라이언트 지식](34_CLIENT_KNOWLEDGE.md) — 고객 이력 참조.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
