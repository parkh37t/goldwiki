# QA·보안팀 (QA & Security Team) — 역할 카탈로그

> 이 문서는 **사람이 읽는 팀 역할 카탈로그**다. 실행 정본은
> [`../.claude/agents/qa-engineer.md`](../.claude/agents/qa-engineer.md) ·
> [`../.claude/agents/security-engineer.md`](../.claude/agents/security-engineer.md) ·
> [`../.claude/agents/accessibility-specialist.md`](../.claude/agents/accessibility-specialist.md)에 있으며,
> 지식의 단일 진실 공급원(SSOT)은 언제나 **GoldWiki(골드위키)**다.
> 모든 역할은 의사결정·산출 전에 골드위키를 먼저 참조하고, 결과를
> [의사결정 로그](../GoldWiki/32_DECISION_LOG.md) · [프로젝트 메모리](../GoldWiki/35_PROJECT_MEMORY.md) ·
> [베스트 프랙티스](../GoldWiki/37_BEST_PRACTICES.md)에 환류한다.

## 팀 개요

QA·보안팀은 **출시 가능 품질을 객관적 증거로 보증하고, 방어적 보안을 SDLC 전반에 내재화**한다. 기능·성능·보안·접근성을 독립적으로 검증하여 품질 게이트를 판정하며, 리스크를 출시 전에 식별·차단한다. (공격 도구 제작이 아닌 방어적 보안에 한정한다.)

- **핵심 미션:** 근거 기반 검증으로 품질 게이트를 판정하고 보안 리스크를 차단한다.
- **핵심 골드위키:** [29 품질 체크리스트](../GoldWiki/29_QUALITY_CHECKLIST.md) · [30 테스트 전략](../GoldWiki/30_TEST_STRATEGY.md) · [24 보안 가이드](../GoldWiki/24_SECURITY_GUIDE.md) · [16 접근성](../GoldWiki/16_ACCESSIBILITY.md)
- **관련 토픽 폴더:** [QA/](../GoldWiki/QA/) · [Backend/](../GoldWiki/Backend/) · [Frontend/](../GoldWiki/Frontend/)
- **인계:** 전 빌드팀(프론트·백엔드·퍼블리싱·AI) → QA·보안팀 → 릴리스 매니저([PMODelivery.md](PMODelivery.md))
- **거버넌스:** 품질 게이트 통과·실패 판정은 골드위키 기준으로 하고, 결함·리스크는 의사결정 로그에 기록한다.

---

## QA 리드 (QA Lead)

- **미션:** 품질 전략·게이트·결함 거버넌스를 총괄하고 출시 판정을 주도한다.
- **주요 책임:** 테스트 전략·테스트 계획 수립 / 품질 게이트·인수 기준 정의 / 결함 트리아지·우선순위 / 릴리스 품질 판정(go/no-go) / 품질 지표·리포트 운영
- **입력:** [29 품질 체크리스트](../GoldWiki/29_QUALITY_CHECKLIST.md), 요구사항·인수 기준, 리스크 등록부
- **출력:** 테스트 계획, 품질 게이트 기준, 출시 판정 리포트
- **협업 대상:** PMO·릴리스 매니저([PMODelivery.md](PMODelivery.md)), 전 빌드 리드, 보안 엔지니어
- **품질 기준:** Critical/High 결함 0건 출시, 인수 기준 100% 검증, 판정 근거 문서화

## 자동화 테스터 (Automation Tester)

- **미션:** 회귀를 자동으로 방지하는 테스트 자동화 체계를 구축·운영한다.
- **주요 책임:** E2E·통합·API 자동화 스위트 / CI 파이프라인 통합 / 테스트 데이터·환경 관리 / 플래키 테스트 안정화 / 자동화 커버리지·리포트
- **입력:** [30 테스트 전략](../GoldWiki/30_TEST_STRATEGY.md), 시나리오·인수 기준, API 계약
- **출력:** 자동화 테스트 스위트, CI 게이트, 회귀 리포트
- **협업 대상:** 프론트엔드 테스트 개발자([Frontend.md](Frontend.md)), API 개발자([Backend.md](Backend.md)), QA 리드
- **품질 기준:** 핵심 경로 자동화, CI 그린 유지, 플래키율 < 1%, 회귀 누락 0건

## 성능 테스터 (Performance Tester)

- **미션:** 부하·스트레스·내구 테스트로 성능·확장성·안정성을 검증한다.
- **주요 책임:** 성능 시나리오·부하 모델 설계 / 부하·스트레스·스파이크·내구 테스트 / 병목·자원 한계 분석 / SLO/SLA 검증 / 용량 산정 권고
- **입력:** 성능 목표(SLO), 트래픽 가정, 시스템 아키텍처
- **출력:** 성능 테스트 리포트, 병목 분석, 용량 권고
- **협업 대상:** 성능 엔지니어([Frontend.md](Frontend.md)), 백엔드 리드·DevOps([Backend.md](Backend.md)), QA 리드
- **품질 기준:** 목표 부하 SLO 충족, 병목 식별·재현, 한계 용량 명시

## 보안 엔지니어 (Security Engineer)

- **미션:** OWASP 기준의 방어적 보안을 SDLC 전반에 내재화한다.(공격 도구 생성 금지)
- **주요 책임:** 위협 모델링·보안 요구 정의 / SAST/DAST/SCA·시크릿 스캔 / 보안 코드 리뷰·취약점 트리아지 / 보안 설정·하드닝 검토 / 컴플라이언스(개인정보·규제) 점검
- **입력:** [24 보안 가이드](../GoldWiki/24_SECURITY_GUIDE.md), 아키텍처·코드, 규제 요건
- **출력:** 위협 모델, 취약점 리포트·수정 권고, 보안 게이트 판정
- **협업 대상:** 인증/인가 개발자([Backend.md](Backend.md)), DevOps, 리스크 관리자([PMODelivery.md](PMODelivery.md))
- **품질 기준:** OWASP Top 10 점검, Critical 취약점 0건 출시, 시크릿 노출 0건, 감사 추적 확보

## 접근성 테스터 (Accessibility Tester)

- **미션:** WCAG 2.2 AA 준수를 독립 검증하고 동등 접근성을 보증한다.
- **주요 책임:** 자동(axe/Lighthouse)·수동 검사 / 스크린리더·키보드 시나리오 테스트 / 명도 대비·포커스·대체텍스트 검수 / 접근성 결함 리포트·재검증 / 접근성 적합성 성명 작성
- **입력:** [16 접근성](../GoldWiki/16_ACCESSIBILITY.md), 마크업·UI 산출물, 인터랙션 명세
- **출력:** 접근성 검수 리포트, 결함 목록, 적합성 성명
- **협업 대상:** 접근성 퍼블리셔([Publishing.md](Publishing.md)), 컴포넌트 개발자([Frontend.md](Frontend.md)), QA 리드
- **품질 기준:** WCAG 2.2 AA 100%, 자동·수동 이중 검증, 결함 재검증 완료

## 릴리스 품질 게이트키퍼 (Release Quality Gatekeeper)

- **미션:** 릴리스 전 모든 품질·보안·접근성 증거를 통합 검토해 최종 게이트를 판정한다.
- **주요 책임:** 품질·보안·성능·접근성 증거 통합 / 출시 체크리스트·DoD 검증 / 잔여 리스크·예외 승인 관리 / 롤백·핫픽스 기준 정의 / 출시 후 품질 모니터링
- **입력:** 각 검증 리포트, [31 릴리스 프로세스](../GoldWiki/31_RELEASE_PROCESS.md), 리스크 등록부
- **출력:** 통합 품질 리포트, 최종 게이트 판정, 잔여 리스크 등록
- **협업 대상:** QA 리드, 보안 엔지니어, 릴리스 매니저·PMO([PMODelivery.md](PMODelivery.md))
- **품질 기준:** 전 게이트 증거 완비, 예외는 명시·승인, 출시 판정 추적 가능

---

## 인계 흐름

```mermaid
flowchart LR
    BUILD["빌드팀(FE·BE·퍼블리싱·AI)"] --> QAS["QA · 보안팀<br/>기능 · 성능 · 보안 · 접근성"]
    QAS --> GATE["릴리스 품질 게이트"]
    GATE --> REL["릴리스 매니저"]
```

관련 문서: [README.md](README.md) · [ESCALATION_POLICY.md](ESCALATION_POLICY.md) · [Frontend.md](Frontend.md) · [Backend.md](Backend.md) · [PMODelivery.md](PMODelivery.md)
