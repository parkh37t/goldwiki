# CLAUDE.md — ClubSchool AI OS v1.0 운영 계약서

**ClubSchool AI OS**는 Claude Code 위에서 동작하는 "AI 디지털 컨설팅 회사 운영체제"입니다.
RFP 분석 → 제안 → UX/UI → 디자인 시스템 → 퍼블리싱 → 개발 → QA → 납품을 멀티에이전트로
수행하며, **GoldWiki(골드위키, `GoldWiki/`)**가 **단일 진실 공급원(SSOT) — 조직의 두뇌**입니다.

이 파일을 가장 먼저 읽으십시오. 본 문서는 이 OS 안에서 일하는 모든 사람과 AI 에이전트를 구속합니다.

> 작업 디렉터리: 이 OS의 모든 자산은 `ClubSchool-AI-OS/` 아래에 있습니다. 에이전트·커맨드를
> 자동 인식시키려면 이 디렉터리를 작업 루트로 사용하십시오. 설치/실행은 [INSTALL.md](INSTALL.md) 참조.

---

## 1. 최우선 원칙: 골드위키를 먼저 참조하라

어떤 의사결정·산출물을 만들기 전에, 반드시 관련 [GoldWiki](GoldWiki/00_START_HERE.md) 문서를
먼저 참조해야 합니다. 골드위키가 권위의 원천입니다.

- **단일 진실 공급원(SSOT).** 지식은 골드위키에만 존재합니다.
- **지식 중복 금지.** 정본을 링크할 뿐 복사하지 않습니다.
- **모든 결정은 두뇌를 갱신한다.** 사소하지 않은 모든 결정은 동일 작업 단위에서 다음을 갱신합니다:
  [의사결정 로그](GoldWiki/32_DECISION_LOG.md) · [프로젝트 메모리](GoldWiki/35_PROJECT_MEMORY.md) ·
  [베스트 프랙티스](GoldWiki/37_BEST_PRACTICES.md) · [레퍼런스 라이브러리](GoldWiki/36_REFERENCE_LIBRARY.md).

[문서화 전문가(Documentation Specialist)](.claude/agents/documentation-specialist.md)가 이를 강제합니다.

---

## 2. 디렉터리 구조

```
ClubSchool-AI-OS/
├── README.md / CLAUDE.md / INSTALL.md / ROADMAP.md / CHANGELOG.md
├── GoldWiki/            41개 지식 문서 (SSOT, 00–40)
├── .claude/
│   ├── agents/          22개 전문 서브에이전트 (실행 정의)
│   ├── commands/        슬래시 커맨드 (/analyze-rfp, /run-pipeline 등)
│   ├── workflows/       워크플로우 실행 정의
│   ├── prompts/         재사용 프롬프트
│   └── templates/       기계용 구조화 템플릿
├── Agents/             에이전트 조직/레지스트리/RACI (사람용)
├── Workflows/          워크플로우 런북 (사람용)
├── Templates/          산출물 템플릿 (복사 사용)
├── Examples/           완성 산출물 예시 (모범 사례)
└── Docs/               아키텍처/용어집/FAQ/거버넌스/기여 가이드
```

---

## 3. 22개 전문 에이전트

업무에 미션이 맞는 에이전트를 호출하십시오. 실행 정의는 [`.claude/agents/`](.claude/agents/),
사람용 레지스트리·RACI·협업 맵은 [`Agents/`](Agents/README.md), 공통 규칙은
[GoldWiki/28_SUBAGENT_RULES.md](GoldWiki/28_SUBAGENT_RULES.md)에 있습니다.

| 계층 | 에이전트 |
|------|----------|
| 리더십 | CEO, Project Director, Sales Director |
| 비즈니스 | Proposal Strategist, Business Analyst, Product Owner, Service Planner |
| 디자인 | UX Researcher, UI Designer, BX Designer, Interaction Designer, Accessibility Specialist |
| 빌드 | Publishing Engineer, Frontend Engineer, Backend Engineer, API Engineer, Database Architect |
| 플랫폼 | Security Engineer, AI Engineer, QA Engineer, DevOps Engineer |
| 지식 | Documentation Specialist |

---

## 4. 커맨드와 워크플로우

- **슬래시 커맨드**([`.claude/commands/`](.claude/commands/)): `/analyze-rfp`, `/generate-proposal`,
  `/plan-ux`, `/design-system-init`, `/publish-prototype`, `/qa-gate`, `/security-review`,
  `/new-decision`, `/run-pipeline`, `/goldwiki-sync`.
- **RFP → 납품 파이프라인(21단계)**: 정본 [GoldWiki/27_AUTOMATION_WORKFLOW.md](GoldWiki/27_AUTOMATION_WORKFLOW.md),
  실행 정의 [`.claude/workflows/rfp-to-delivery.md`](.claude/workflows/rfp-to-delivery.md),
  런북 [`Workflows/RFP_to_Delivery_Runbook.md`](Workflows/RFP_to_Delivery_Runbook.md).

---

## 5. 출력 품질 기준

모든 산출물은 **경영진 수준 · 클라이언트 제출 가능 · 구현 가능 · 재사용 가능 · 근거 기반**이어야
합니다. 플레이스홀더·모호한 표현·일반적 AI 문구 금지. 완료 선언 전
[GoldWiki/29_QUALITY_CHECKLIST.md](GoldWiki/29_QUALITY_CHECKLIST.md)를 실행하십시오.

---

## 6. 모든 작업의 시작 방법

1. [GoldWiki/00_START_HERE.md](GoldWiki/00_START_HERE.md)를 연다.
2. 관련 문서와 담당 에이전트를 식별한다.
3. 표준을 따라 실행하고 품질 기준에 맞는 산출물을 만든다.
4. 의사결정 로그·프로젝트 메모리·베스트 프랙티스·레퍼런스 라이브러리를 갱신한다.
5. 품질 게이트를 통과시키고 협업 규칙에 따라 인계한다.
