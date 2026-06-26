# ROADMAP.md — ClubSchool AI OS

ClubSchool AI OS의 버전별 진화 계획. 모든 마일스톤 결정은
[GoldWiki/32_DECISION_LOG.md](GoldWiki/32_DECISION_LOG.md)에 ADR로 기록한다.

---

## 비전

RFP 업로드 한 번으로 분석부터 납품까지 수행하는 **완전 자율 디지털 컨설팅 조직**을 향한다.
인간은 전략적 판단과 최종 승인에 집중하고, 반복·생산 업무는 에이전트가 수행한다.

---

## v1.0 — Foundation (현재, 2026-06)

> 상태: **출시(Released)**

- ✅ GoldWiki 41개 지식 문서 (SSOT)
- ✅ 22개 전문 서브에이전트
- ✅ RFP→납품 21단계 파이프라인 정의
- ✅ 슬래시 커맨드 10종, 워크플로우 정의, 프롬프트·템플릿 라이브러리
- ✅ 조직/RACI/협업 맵, 런북, 산출물 템플릿, 완성 예시, 시스템 문서
- ✅ 거버넌스: 골드위키 우선 참조 · SSOT · 두뇌 4종 자동 갱신

---

## v1.1 — Automation Hardening (계획, 2026 Q3)

- ⬜ 파이프라인 단계 간 자동 게이트 검증(품질 체크리스트 자동 실행)
- ⬜ 슬래시 커맨드 ↔ 워크플로우 오케스트레이션 강화(`/run-pipeline` 완전 자동화)
- ⬜ GoldWiki 링크 무결성·중복 탐지 자동 점검(`/goldwiki-sync` CI 연동)
- ⬜ 산출물 템플릿 ↔ 예시 일관성 검사
- ⬜ 회귀 방지를 위한 산출물 골든셋(Examples 확장)

---

## v1.2 — Design & Publishing Integration (계획, 2026 Q4)

- ⬜ Figma MCP 연동: 디자인 토큰 → Figma 변수 동기화, 디자인-투-코드
- ⬜ HTML 프로토타입 자동 퍼블리싱 파이프라인(정적 호스팅)
- ⬜ 접근성 자동 감사(axe) 게이트
- ⬜ 디자인 시스템 버전·기여 모델 자동화

---

## v2.0 — "거의 사람 수준의 디지털 조직" (설계 중, 2027 H1)

> 상태: **설계(Design)** — 아키텍처 문서: [Docs/architecture-v2/](Docs/architecture-v2/README.md)

v2.0의 핵심은 v1.0(정적 GoldWiki SSOT + 24개 에이전트) 위에 **4대 능력**을 더해 조직이 스스로 학습·
최신화·검증하고 도구와 동료를 부리게 만드는 것이다. 모든 능력은 **오케스트레이션 런타임**(coo-operator/
pmo-director)에서 실행되고 **웹 콘솔**(`Console/`)에서 사람이 관찰·승인한다. 자동화는 v1.0 수동 경로로
안전하게 폴백한다.

### 4대 능력

- ⬜ **① 자동 학습(Auto Learning)** — 산출물·피드백·의사결정에서 패턴을 추출해 GoldWiki(BP·레퍼런스·
  프로젝트메모리·공통오류)와 벡터 인덱스를 자동 강화. 휴먼 승인 게이트·회귀 방지·지식 버전관리.
  설계: [Docs/architecture-v2/01_AutoLearning.md](Docs/architecture-v2/01_AutoLearning.md)
- ⬜ **② 자동 업데이트(Auto Update)** — 외부 표준·트렌드·규제 변화를 모니터링해 에이전트·커맨드·템플릿·
  GoldWiki 문서를 안전 개정(제안→리뷰→PR→머지). SemVer·변경 로그·롤백, documentation-lead의 SSOT 무결성.
  설계: [Docs/architecture-v2/02_AutoUpdate.md](Docs/architecture-v2/02_AutoUpdate.md)
- ⬜ **③ 자동 품질 검증(QA Loop)** — 생성→자기검증→교차검증→AIEvaluationBoard 채점→미달 시 자동 재작업
  루프→게이트 통과. 10단계 품질 체계 자동화, 임계·반복 한도·에스컬레이션.
  설계: [Docs/architecture-v2/03_QALoop.md](Docs/architecture-v2/03_QALoop.md)
- ⬜ **④ 멀티에이전트 협업(MCP 연동)** — MCP로 Figma·GitHub·검색·데이터·ListeningMind 등 연동, 에이전트
  간 메시지/핸드오프 프로토콜, 작업 큐·상태머신, 권한·보안 경계.
  설계: [Docs/architecture-v2/04_MCP_MultiAgent.md](Docs/architecture-v2/04_MCP_MultiAgent.md)

### 런타임·콘솔과 기존 v2.0 항목

- ⬜ **오케스트레이션 런타임 + 웹 콘솔 연동** — Job 수명주기·실시간 스트리밍·승인 UX·백엔드 API 명세.
  설계: [Docs/architecture-v2/05_Orchestration_and_Console.md](Docs/architecture-v2/05_Orchestration_and_Console.md)
- ⬜ 백엔드/API/DB 스캐폴딩 자동 생성 + 보안 게이트(④ MCP·런타임 위에서 수행)
- ⬜ CI/CD·릴리스 자동화(DevOps 에이전트 주도, ② 자동 업데이트 파이프라인과 통합)
- ⬜ 클라이언트 포털: 진행 현황·산출물·의사결정 가시화(웹 콘솔 확장)
- ⬜ 멀티 프로젝트 동시 운영(프로젝트 메모리·벡터 인덱스 네임스페이스 분리/격리)
- ⬜ 성과 KPI 자동 측정·대시보드([GoldWiki/02_BUSINESS_GOALS.md](GoldWiki/02_BUSINESS_GOALS.md))

### 도입 마일스톤(요약)

| 마일스톤 | 범위 | 능력 |
|----------|------|------|
| M1 관측 가능성 | 콘솔↔런타임 Job 수명주기·상태 스트리밍 | 런타임 |
| M2 QA 루프 | 자기/교차 검증 + Board 채점 자동화 | ③ |
| M3 MCP 연동 | Figma·GitHub·검색·데이터 + 핸드오프 | ④ |
| M4 자동 학습 | 학습 파이프라인 + 벡터 인덱스 + 승인 게이트 | ① |
| M5 자동 업데이트 | 외부 변화 모니터 + 변경 제안 PR | ② |
| M6 자율 운영 | 4대 능력 통합 + 멀티 프로젝트 격리 + KPI | ①②③④ |

---

## 원칙

1. 모든 기능은 GoldWiki 표준에 근거한다. 표준 없는 기능은 먼저 GoldWiki에 정의한다.
2. 자동화는 품질 게이트를 대체하지 않고 강화한다.
3. 하위 호환을 우선하고, 변경은 [CHANGELOG.md](CHANGELOG.md)와 ADR로 추적한다.

> 관련: [GoldWiki/27_AUTOMATION_WORKFLOW.md](GoldWiki/27_AUTOMATION_WORKFLOW.md) ·
> [GoldWiki/31_RELEASE_PROCESS.md](GoldWiki/31_RELEASE_PROCESS.md)
