# CLAUDE.md — Goldwiki Digital 워크스페이스 운영 계약서

이 저장소는 **AI 증강 디지털 컨설팅 워크스페이스**입니다. 전문 Claude Code 서브에이전트들이
업무를 수행하는 멀티에이전트 조직으로 운영되며, **Gold Wiki(골드위키, `/GoldWiki`)**가
**단일 진실 공급원(Single Source of Truth) — 조직의 두뇌** 역할을 합니다.

이 파일을 가장 먼저 읽으십시오. 본 문서는 이 저장소에서 일하는 모든 사람과 모든 AI 에이전트를 구속합니다.

---

## 1. 최우선 원칙: 골드위키를 먼저 참조하라

어떤 의사결정·권고·산출물을 만들기 전에, 반드시 관련 [골드위키](GoldWiki/00_START_HERE.md)
문서를 먼저 참조해야 합니다. 골드위키가 권위의 원천입니다. 계획이 골드위키와 충돌한다면
골드위키가 우선합니다 — 단, [의사결정 로그](GoldWiki/32_DECISION_LOG.md)에 이를 대체하는
결정을 먼저 기록한 경우는 예외입니다.

- **단일 진실 공급원(SSOT).** 지식은 흩어진 파일이나 대화가 아닌 골드위키에 존재합니다.
- **지식 중복 금지.** 정본 문서를 링크할 뿐, 복사·붙여넣기 하지 않습니다.
- **모든 결정은 두뇌를 갱신한다.** 사소하지 않은 모든 결정은 동일 작업 단위 내에서 다음을 갱신해야 합니다:
  1. [의사결정 로그](GoldWiki/32_DECISION_LOG.md)
  2. [프로젝트 메모리](GoldWiki/35_PROJECT_MEMORY.md)
  3. [베스트 프랙티스](GoldWiki/37_BEST_PRACTICES.md)
  4. [레퍼런스 라이브러리](GoldWiki/36_REFERENCE_LIBRARY.md)

[문서화 전문가(Documentation Specialist)](.claude/agents/documentation-specialist.md)가 이를 강제합니다.

---

## 2. 저장소 구조

```
/
├── CLAUDE.md                  ← 현재 위치 (운영 계약서)
├── README.md                  ← 사람을 위한 개요
├── GoldWiki/                  ← 지식베이스 (41개 문서, 단일 진실 공급원)
│   ├── 00_START_HERE.md       ← 마스터 인덱스 — 모든 작업은 여기서 시작
│   ├── 01–06  기초            ← 회사, 목표, RFP, 제안, 비즈니스 분석
│   ├── 07–16  디자인          ← UX, UI, 디자인시스템, IA, 플로우, 토큰, 접근성
│   ├── 17–24  엔지니어링      ← HTML/CSS/JS, 프론트, 백엔드, API, DB, 보안
│   ├── 25–31  AI/자동화/QA    ← AI 가이드, 프롬프트, 파이프라인, 규칙, 품질, 테스트, 릴리스
│   └── 32–40  지식            ← 의사결정, 메모리, 레퍼런스, 베스트프랙티스, 프롬프트
└── .claude/
    └── agents/                ← 22개 전문 서브에이전트 정의
```

---

## 3. 22개 전문 에이전트

업무에 미션이 부합하는 에이전트를 호출하십시오. 전체 정의는 `.claude/agents/`에 있습니다.
모든 에이전트의 거버넌스 규칙: [28_SUBAGENT_RULES.md](GoldWiki/28_SUBAGENT_RULES.md).

| 계층 | 에이전트 |
|------|----------|
| 리더십 | CEO, Project Director, Sales Director |
| 비즈니스 | Proposal Strategist, Business Analyst, Product Owner, Service Planner |
| 디자인 | UX Researcher, UI Designer, BX Designer, Interaction Designer, Accessibility Specialist |
| 빌드 | Publishing Engineer, Frontend Engineer, Backend Engineer, API Engineer, Database Architect |
| 플랫폼 | Security Engineer, AI Engineer, QA Engineer, DevOps Engineer |
| 지식 | Documentation Specialist |

---

## 4. RFP → 납품 파이프라인

RFP가 제공되면, [27_AUTOMATION_WORKFLOW.md](GoldWiki/27_AUTOMATION_WORKFLOW.md)에 정의된
자율 21단계 파이프라인을 실행합니다:

> 읽기 → 분석 → 요약 → 요구사항 추출 → 평가기준 식별 → 숨은 기대 식별 → 리스크 탐지 →
> 경쟁사 벤치마크 → 글로벌 베스트프랙티스 벤치마크 → 제안 전략 수립 → WBS → IA →
> 유저 플로우 → 화면 목록 → UX 전략 → UI 컨셉 → 디자인 시스템 → HTML 프로토타입 계획 →
> 개발 계획 → QA 계획 → 경영 요약.

각 단계에는 담당 에이전트, 정의된 아티팩트, 읽고/갱신하는 골드위키 문서가 있습니다.
각 단계(phase)는 품질 게이트([29_QUALITY_CHECKLIST.md](GoldWiki/29_QUALITY_CHECKLIST.md))로 구분됩니다.

---

## 5. 출력 품질 기준

모든 산출물은 다음을 충족해야 합니다: **경영진 수준, 클라이언트 제출 가능, 구현 가능,
재사용 가능, 근거 기반, 전문성.** 일반적인 AI 표현 금지. 플레이스홀더 금지. 모호한 설명 금지.
어떤 산출물도 완료로 선언하기 전 [29_QUALITY_CHECKLIST.md](GoldWiki/29_QUALITY_CHECKLIST.md)의
체크리스트를 사용하십시오.

---

## 6. 모든 작업의 시작 방법

1. [GoldWiki/00_START_HERE.md](GoldWiki/00_START_HERE.md)를 엽니다.
2. 관련 문서와 담당 에이전트를 식별합니다.
3. 해당 문서를 참조하고 표준을 따릅니다.
4. 실행합니다. 품질 기준에 맞는 산출물을 만듭니다.
5. 해당되면 의사결정 로그, 프로젝트 메모리, 베스트 프랙티스, 레퍼런스 라이브러리를 갱신합니다.
6. 품질 체크리스트를 실행하고, 에이전트의 협업 규칙에 따라 인계합니다.
