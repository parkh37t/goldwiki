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

## v2.0 — Full Delivery Autonomy (계획, 2027 H1)

- ⬜ 백엔드/API/DB 스캐폴딩 자동 생성 + 보안 게이트
- ⬜ CI/CD·릴리스 자동화(DevOps 에이전트 주도)
- ⬜ 클라이언트 포털: 진행 현황·산출물·의사결정 가시화
- ⬜ 멀티 프로젝트 동시 운영(프로젝트 메모리 분리/격리)
- ⬜ 성과 KPI 자동 측정·대시보드([GoldWiki/02_BUSINESS_GOALS.md](GoldWiki/02_BUSINESS_GOALS.md))

---

## 원칙

1. 모든 기능은 GoldWiki 표준에 근거한다. 표준 없는 기능은 먼저 GoldWiki에 정의한다.
2. 자동화는 품질 게이트를 대체하지 않고 강화한다.
3. 하위 호환을 우선하고, 변경은 [CHANGELOG.md](CHANGELOG.md)와 ADR로 추적한다.

> 관련: [GoldWiki/27_AUTOMATION_WORKFLOW.md](GoldWiki/27_AUTOMATION_WORKFLOW.md) ·
> [GoldWiki/31_RELEASE_PROCESS.md](GoldWiki/31_RELEASE_PROCESS.md)
