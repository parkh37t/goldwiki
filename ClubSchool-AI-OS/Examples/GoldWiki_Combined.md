# ClubSchool AI OS — GoldWiki 통합본 (단일 진실 공급원 SSOT)

> 이 문서는 goldwiki 전체 지식을 NotebookLM 소스용으로 하나로 합친 것입니다.
> 원본: https://goldwiki.vercel.app/ · 각 섹션 머리말의 경로가 원본 파일입니다.

---



===== 파일: README.md =====

# ClubSchool AI OS v1.0

> Claude Code를 **RFP 분석부터 납품까지 수행하는 AI 디지털 컨설팅 회사**로 전환하는 운영체제.
> **GoldWiki(골드위키)**를 조직의 두뇌(단일 진실 공급원)로, **22개 전문 서브에이전트**가
> 업무를 실행합니다.

[![version](https://img.shields.io/badge/version-1.0.0-gold)](CHANGELOG.md)
[![knowledge](https://img.shields.io/badge/GoldWiki-41_docs-blue)](GoldWiki/00_START_HERE.md)
[![agents](https://img.shields.io/badge/agents-22-green)](Agents/README.md)

---

## ClubSchool AI OS란

ClubSchool AI OS는 단순 코드 저장소가 아니라 **자율적으로 운영되는 디지털 컨설팅 조직**입니다.
RFP를 업로드하면 분석 → 제안 → UX/UI 기획 → 디자인 시스템 → HTML 프로토타입 → 개발 지원 →
QA → 납품까지의 전 과정을 멀티에이전트 파이프라인으로 수행합니다.

| 구성요소 | 설명 |
|----------|------|
| 🧠 **GoldWiki** | 41개 지식 문서. 방법론·표준·디자인시스템·엔지니어링·AI·QA·조직기억의 단일 진실 공급원 |
| 🤖 **22개 에이전트** | CEO부터 Documentation Specialist까지. 각자 미션·규칙·프롬프트·예시 보유 |
| ⚙️ **21단계 파이프라인** | RFP 업로드 → 경영 요약까지 자율 실행 |
| 🧩 **커맨드/워크플로우/프롬프트/템플릿** | 즉시 실행 가능한 운영 자산 |
| 📦 **Examples** | 가상 시나리오 기반 완성 산출물 모범 예시 |

---

## 빠른 시작

```bash
# 1) 이 OS 디렉터리를 작업 루트로 사용
cd ClubSchool-AI-OS

# 2) 운영 계약서와 마스터 인덱스 정독
#    CLAUDE.md  →  GoldWiki/00_START_HERE.md

# 3) RFP 대응 시작 (Claude Code에서)
/analyze-rfp [RFP 파일 경로]
/run-pipeline [RFP 파일 경로]
```

설치·환경 설정은 [INSTALL.md](INSTALL.md)를 참조하십시오.

---

## 디렉터리 안내

| 경로 | 내용 |
|------|------|
| [`GoldWiki/`](GoldWiki/00_START_HERE.md) | 41개 지식 문서 (SSOT) |
| [`.claude/agents/`](.claude/agents/) | 22개 서브에이전트 실행 정의 |
| [`.claude/commands/`](.claude/commands/) | 슬래시 커맨드 |
| [`.claude/workflows/`](.claude/workflows/) | 워크플로우 실행 정의 |
| [`.claude/prompts/`](.claude/prompts/) · [`.claude/templates/`](.claude/templates/) | 재사용 프롬프트·기계용 템플릿 |
| [`Agents/`](Agents/README.md) | 조직도·RACI·협업 맵 |
| [`Workflows/`](Workflows/README.md) | 워크플로우 런북 |
| [`Templates/`](Templates/README.md) | 복사용 산출물 템플릿 |
| [`Examples/`](Examples/README.md) | 완성 산출물 예시 |
| [`Docs/`](Docs/README.md) | 아키텍처·용어집·FAQ·거버넌스 |

---

## 거버넌스 (한 줄)

모든 에이전트는 결정 전 GoldWiki를 참조하고, 골드위키가 단일 진실 공급원이며, 지식 중복을
금지하고, 모든 결정은 의사결정 로그·프로젝트 메모리·베스트 프랙티스·레퍼런스 라이브러리를
갱신합니다. 상세: [CLAUDE.md](CLAUDE.md) · [Docs/GOVERNANCE.md](Docs/GOVERNANCE.md).

---

## 더 보기

- 로드맵: [ROADMAP.md](ROADMAP.md) · 변경 이력: [CHANGELOG.md](CHANGELOG.md)
- 기여 방법: [Docs/CONTRIBUTING.md](Docs/CONTRIBUTING.md) · 온보딩: [Docs/ONBOARDING.md](Docs/ONBOARDING.md)




===== 파일: CLAUDE.md =====

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




===== 파일: GoldWiki/00_START_HERE.md =====

# 00 · 여기서 시작하세요 (통합 마스터 인덱스 & 운영 매뉴얼)

| 항목 | 내용 |
| --- | --- |
| **목적** | ClubSchool AI OS · 골드위키(Gold Wiki) 전체 워크스페이스의 단일 진입점이자 운영 매뉴얼. 모든 사람·AI 에이전트가 작업 전 가장 먼저 읽는 문서. |
| **대상 독자** | 신규 합류자, 클라이언트, 경영진, 24개 활성 에이전트, 80명 전문 역할 |
| **담당(Owner) 에이전트** | executive-director, documentation-lead |
| **참조(상위 문서)** | 없음 (최상위 루트 문서) |
| **연계(하위 문서)** | 토픽 폴더 24개 · 번호형 41개 · 에이전트 24개 · 커맨드 · 워크플로우 |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 골드위키란 무엇인가

골드위키(Gold Wiki)는 **Goldwiki Digital(ClubSchool AI OS)의 조직 두뇌(Organizational Brain)** 이자 **단일 진실 공급원(Single Source of Truth, SSOT)** 이다. 회사의 모든 방법론·표준·의사결정·산출물 템플릿·프로젝트 기억이 이곳 한 곳에 집결된다.

회사는 AI 증강(AI-augmented) 멀티에이전트 운영 모델로 동작한다. **24개 활성 AI 서브에이전트**와 **80명 전문 역할**이 실무를 수행하며, 골드위키가 이들이 공유하는 지식의 원천이다. 사람과 AI가 동일 문서를 참조함으로써 일관성·추적성·재사용성을 보장한다.

> **핵심 원칙(5대):** 골드위키 우선 · SSOT · 지식 중복 금지 · 두뇌 갱신 · 품질 기준. 전문은 [운영 원칙](Foundation/OperatingPrinciples.md). 모든 에이전트는 의사결정 전 골드위키를 먼저 참조하고, 새 결정은 자동으로 [의사결정 로그](Foundation/DecisionLog.md)·[프로젝트 메모리](Foundation/ProjectMemory.md)·[베스트 프랙티스](37_BEST_PRACTICES.md)·[레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.

---

## 2. 골드위키 구조: 토픽 폴더 + 번호형 문서

골드위키는 두 축으로 조직된다.
- **토픽 폴더(24개):** 직능·도메인별 심화 지식. 각 폴더에 `README.md`와 핵심 문서.
- **번호형 문서(41개, 00–40):** 권장 학습 순서를 따르는 기반 지식 백본.

두 축은 상호 링크로 연결된다. 토픽 폴더는 번호형 정본을 인용하고, 번호형 문서는 토픽 폴더로 심화 링크한다.

---

## 3. 토픽 폴더 24개 탐색 지도

각 폴더의 `README.md`가 폴더 목적·문서 목록·담당 에이전트를 안내한다.

### 3.1 기반·조직 (거버넌스)
| 폴더 | 목적 | 담당 |
| --- | --- | --- |
| [Foundation](Foundation/README.md) | 운영 원칙·ADR·프로젝트 메모리·품질 기준 | documentation-lead |
| [Company](Company/README.md) | 회사 개요(정본 [01](01_COMPANY_CONTEXT.md) 링크) | executive-director |
| [Organization](Organization/README.md) | 24 에이전트·80 역할 조직도·운영 규칙 | coo-operator |
| [DecisionLog](DecisionLog/README.md) | 의사결정(ADR) 운영 진입점 | documentation-lead |
| [ProjectMemory](ProjectMemory/README.md) | 프로젝트 기억 운영 진입점 | pmo-director |

### 3.2 수주·비즈니스
| 폴더 | 목적 | 담당 |
| --- | --- | --- |
| [RFP](RFP/README.md) | RFP 분석·전략 | rfp-strategy-lead |
| [Proposal](Proposal/README.md) | 제안 전략·작성 | proposal-lead |
| [Business](Business/README.md) | 비즈니스 분석·요구공학 | business-analysis-lead |
| [Research](Research/README.md) | 업종·시장 리서치 | industry-research-lead |
| [Industry](Industry/README.md) | 업종별 플레이북 | industry-research-lead |

### 3.3 디자인·브랜드
| 폴더 | 목적 | 담당 |
| --- | --- | --- |
| [UX](UX/README.md) | UX 리서치·IA·플로우·여정 | ux-research-lead |
| [UI](UI/README.md) | UI 디자인·화면 설계 | ui-design-lead |
| [DesignSystem](DesignSystem/README.md) | 토큰·컴포넌트·접근성 | design-system-lead |
| [Brand](Brand/README.md) | 브랜드 경험(BX) | bx-design-lead |
| [Publishing](Publishing/README.md) | 시맨틱 마크업·퍼블리싱 | publishing-lead |

### 3.4 엔지니어링·AI·데이터
| 폴더 | 목적 | 담당 |
| --- | --- | --- |
| [Frontend](Frontend/README.md) | 프론트엔드 구현 | frontend-lead |
| [Backend](Backend/README.md) | 백엔드·API·DB | backend-lead |
| [AI](AI/README.md) | AI 자동화·프롬프트 | ai-automation-lead |
| [Data](Data/README.md) | 데이터 분석·BI | data-analytics-lead |

### 3.5 품질·운영·자산
| 폴더 | 목적 | 담당 |
| --- | --- | --- |
| [QA](QA/README.md) | 테스트·품질 게이트 | qa-lead |
| [PMO](PMO/README.md) | 일정·리스크·거버넌스 | pmo-director |
| [Delivery](Delivery/README.md) | 납품·릴리스·이관 | pmo-director |
| [Templates](Templates/README.md) | 재사용 산출물 템플릿 | documentation-lead |
| [PromptLibrary](PromptLibrary/README.md) | 검증된 프롬프트 | ai-automation-lead |

> 참고: 일부 토픽 폴더 README는 점진적으로 채워진다. 정본 백본은 아래 번호형 41개 문서이며, 토픽 폴더는 그 위의 심화 레이어이다.

---

## 4. 번호형 문서 41개 전체 지도

번호는 권장 학습 순서를 따른다.

### 4.1 기초(Foundation) · 00–06
| 번호 | 문서 | 한 줄 설명 | 토픽 |
| --- | --- | --- | --- |
| 00 | [여기서 시작하세요](00_START_HERE.md) | 본 문서. 통합 마스터 인덱스. | Foundation |
| 01 | [회사 컨텍스트](01_COMPANY_CONTEXT.md) | 미션·서비스·운영 모델. | [Company](Company/README.md) |
| 02 | [비즈니스 목표](02_BUSINESS_GOALS.md) | 북극성·OKR·KPI. | [Business](Business/README.md) |
| 03 | [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) | 21단계 파이프라인. | [RFP](RFP/README.md) |
| 04 | [RFP 심층 분석](04_RFP_ANALYSIS.md) | 요구사항 추출·리스크. | [RFP](RFP/README.md) |
| 05 | [제안 전략](05_PROPOSAL_STRATEGY.md) | 윈 테마·가격·레드팀. | [Proposal](Proposal/README.md) |
| 06 | [비즈니스 분석](06_BUSINESS_ANALYSIS.md) | 요구공학·추적성. | [Business](Business/README.md) |

### 4.2 디자인 · 07–16
| 번호 | 문서 | 한 줄 설명 | 토픽 |
| --- | --- | --- | --- |
| 07 | [UX 원칙](07_UX_PRINCIPLES.md) | 사용자 중심 설계 원칙. | [UX](UX/README.md) |
| 08 | [UI 가이드라인](08_UI_GUIDELINES.md) | 시각 디자인 규칙. | [UI](UI/README.md) |
| 09 | [디자인 시스템](09_DESIGN_SYSTEM.md) | 디자인 시스템 운영. | [DesignSystem](DesignSystem/README.md) |
| 10 | [Figma 가이드](10_FIGMA_GUIDE.md) | Figma 작업 표준. | [UI](UI/README.md) |
| 11 | [정보구조(IA)](11_INFORMATION_ARCHITECTURE.md) | 사이트맵·내비게이션. | [UX](UX/README.md) |
| 12 | [사용자 플로우](12_USER_FLOW.md) | 태스크 플로우. | [UX](UX/README.md) |
| 13 | [사용자 여정](13_USER_JOURNEY.md) | 여정 지도·페인포인트. | [UX](UX/README.md) |
| 14 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) | UI 컴포넌트 카탈로그. | [DesignSystem](DesignSystem/README.md) |
| 15 | [디자인 토큰](15_DESIGN_TOKEN.md) | 색·타이포·스페이싱 토큰. | [DesignSystem](DesignSystem/README.md) |
| 16 | [접근성](16_ACCESSIBILITY.md) | WCAG 준수 기준. | [DesignSystem](DesignSystem/README.md) |

### 4.3 엔지니어링 · 17–24
| 번호 | 문서 | 한 줄 설명 | 토픽 |
| --- | --- | --- | --- |
| 17 | [HTML 가이드](17_HTML_GUIDE.md) | 시맨틱 마크업. | [Publishing](Publishing/README.md) |
| 18 | [CSS 가이드](18_CSS_GUIDE.md) | 스타일 아키텍처. | [Publishing](Publishing/README.md) |
| 19 | [JS 가이드](19_JS_GUIDE.md) | 자바스크립트 표준. | [Frontend](Frontend/README.md) |
| 20 | [프런트엔드 가이드](20_FRONTEND_GUIDE.md) | FE 아키텍처. | [Frontend](Frontend/README.md) |
| 21 | [백엔드 가이드](21_BACKEND_GUIDE.md) | 서버 계층 설계. | [Backend](Backend/README.md) |
| 22 | [API 표준](22_API_STANDARD.md) | REST/OpenAPI 규약. | [Backend](Backend/README.md) |
| 23 | [데이터베이스 가이드](23_DATABASE_GUIDE.md) | 데이터 모델링. | [Backend](Backend/README.md) |
| 24 | [보안 가이드](24_SECURITY_GUIDE.md) | OWASP 보안 통제. | [QA](QA/README.md) |

### 4.4 AI · 자동화 · QA · 25–31
| 번호 | 문서 | 한 줄 설명 | 토픽 |
| --- | --- | --- | --- |
| 25 | [AI 가이드](25_AI_GUIDE.md) | AI 활용·거버넌스. | [AI](AI/README.md) |
| 26 | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md) | 프롬프트 설계. | [AI](AI/README.md) |
| 27 | [자동화 워크플로](27_AUTOMATION_WORKFLOW.md) | 파이프라인·오케스트레이션. | [PMO](PMO/README.md) |
| 28 | [서브에이전트 규칙](28_SUBAGENT_RULES.md) | 에이전트 운영 규칙. | [Organization](Organization/README.md) |
| 29 | [품질 체크리스트](29_QUALITY_CHECKLIST.md) | 단계별 품질 게이트. | [QA](QA/README.md) |
| 30 | [테스트 전략](30_TEST_STRATEGY.md) | 테스트 레벨·커버리지. | [QA](QA/README.md) |
| 31 | [릴리스 프로세스](31_RELEASE_PROCESS.md) | 배포·롤백. | [Delivery](Delivery/README.md) |

### 4.5 지식 · 32–40
| 번호 | 문서 | 한 줄 설명 | 토픽 |
| --- | --- | --- | --- |
| 32 | [의사결정 로그](32_DECISION_LOG.md) | ADR 적재 정본. | [DecisionLog](DecisionLog/README.md) |
| 33 | [회의록](33_MEETING_NOTE.md) | 결정·액션 보관. | [PMO](PMO/README.md) |
| 34 | [클라이언트 지식](34_CLIENT_KNOWLEDGE.md) | 고객별 컨텍스트. | [Research](Research/README.md) |
| 35 | [프로젝트 메모리](35_PROJECT_MEMORY.md) | 학습 누적 정본. | [ProjectMemory](ProjectMemory/README.md) |
| 36 | [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md) | 외부 표준 색인. | Foundation |
| 37 | [베스트 프랙티스](37_BEST_PRACTICES.md) | 모범 사례. | Foundation |
| 38 | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) | 산출물 템플릿. | [Templates](Templates/README.md) |
| 39 | [공통 오류](39_COMMON_ERRORS.md) | 반복 실수·회피책. | [QA](QA/README.md) |
| 40 | [프롬프트 라이브러리](40_PROMPT_LIBRARY.md) | 검증된 프롬프트. | [PromptLibrary](PromptLibrary/README.md) |

---

## 5. 24개 활성 에이전트

실행 정의는 `../.claude/agents/<name>.md`, 조직 구조는 [조직 지도](Organization/OrganizationMap.md), 공통 규칙은 [에이전트 운영 규칙](Organization/AgentOperatingRules.md)을 따른다.

| # | 에이전트 | 역할 | 본부 |
| --- | --- | --- | --- |
| 1 | executive-director | 총괄·전략·최종승인 | 경영 |
| 2 | coo-operator | 운영총괄 | 운영 |
| 3 | cto-reviewer | 기술검토 | 운영 |
| 4 | pmo-director | PMO·일정·리스크 | 운영 |
| 5 | rfp-strategy-lead | RFP 분석·전략 | 비즈니스 |
| 6 | proposal-lead | 제안 총괄 | 비즈니스 |
| 7 | business-analysis-lead | 비즈니스 분석 | 비즈니스 |
| 8 | industry-research-lead | 업종 리서치 | 비즈니스 |
| 9 | product-strategy-lead | 프로덕트 전략 | 비즈니스 |
| 10 | service-planning-lead | 서비스 기획 | 비즈니스 |
| 11 | ux-research-lead | UX 리서치 | 디자인 |
| 12 | information-architecture-lead | 정보구조(IA) | 디자인 |
| 13 | ui-design-lead | UI 디자인 | 디자인 |
| 14 | design-system-lead | 디자인 시스템 | 디자인 |
| 15 | bx-design-lead | 브랜드 경험 | 디자인 |
| 16 | publishing-lead | 퍼블리싱 | 디자인 |
| 17 | frontend-lead | 프론트엔드 | 엔지니어링 |
| 18 | backend-lead | 백엔드 | 엔지니어링 |
| 19 | ai-automation-lead | AI 자동화 | 엔지니어링 |
| 20 | data-analytics-lead | 데이터 분석 | 엔지니어링 |
| 21 | qa-lead | QA | 품질·지식 |
| 22 | security-risk-lead | 보안·리스크 | 품질·지식 |
| 23 | documentation-lead | 문서·골드위키 | 품질·지식 |
| 24 | client-simulation-lead | 고객·평가·경쟁 시뮬레이션 | 품질·지식 |

> 80명 전문 역할의 에이전트 매핑은 [조직 지도 §80명 역할 매핑](Organization/OrganizationMap.md)을 참조한다.

---

## 6. 슬래시 커맨드

실행 정의는 `../.claude/commands/<name>.md`에 있다. 커맨드는 해당 단계의 에이전트를 호출하고 관련 골드위키 정본을 참조한다.

| 커맨드 | 목적 | 주 호출 에이전트 |
| --- | --- | --- |
| `/analyze-rfp` | RFP 접수·분석·요구사항 추출 | rfp-strategy-lead, business-analysis-lead |
| `/generate-proposal` | 윈 전략·제안서 생성 | proposal-lead |
| `/plan-ux` | UX 리서치·IA·플로우 수립 | ux-research-lead, information-architecture-lead |
| `/design-system-init` | 디자인 토큰·컴포넌트 초기화 | design-system-lead, ui-design-lead |
| `/publish-prototype` | HTML 프로토타입 퍼블리싱 | publishing-lead, frontend-lead |
| `/qa-gate` | 품질 게이트 판정 | qa-lead |
| `/security-review` | 보안·리스크 검토 | security-risk-lead |
| `/new-decision` | ADR 기록 | documentation-lead |
| `/run-pipeline` | RFP→납품 파이프라인 실행 | pmo-director |
| `/goldwiki-sync` | 골드위키 정본 동기화·중복 점검 | documentation-lead |

> 위 10개가 현재 등록된 커맨드이다. 추가 커맨드(예: `/plan-backend`, `/data-analyze`, `/brand-system`, `/industry-brief` 등)는 동일 형식으로 확장하며, 확장 시 본 표와 `../.claude/commands/`를 함께 갱신한다.

---

## 7. 워크플로우

각 워크플로우는 다수 에이전트를 오케스트레이션한다. 정본 오케스트레이션은 [27_AUTOMATION_WORKFLOW](27_AUTOMATION_WORKFLOW.md), 실행 정의는 `../.claude/workflows/`, 사람용 런북은 `../Workflows/`에 있다.

| 워크플로우 | 목적 | 런북 / 실행 정의 |
| --- | --- | --- |
| RFP→납품 파이프라인 | 21단계 전 과정 | `../Workflows/RFP_to_Delivery_Runbook.md` · `../.claude/workflows/rfp-to-delivery.md` |
| 제안 스프린트 | RFP 분석→제안 제출 | `../Workflows/Proposal_Runbook.md` · `../.claude/workflows/proposal-sprint.md` |
| 디자인 스프린트 | UX→UI→디자인 시스템 | `../Workflows/Design_Runbook.md` · `../.claude/workflows/design-sprint.md` |
| 납품·QA | 구현→QA→릴리스 이관 | `../.claude/workflows/delivery-qa.md` |

> 위 4개가 현재 등록된 워크플로우이다. 세부 단계 워크플로우(예: 비즈니스 분석, IA 설계, 백엔드 아키텍처, 데이터 분석, 보안 점검, 업종 브리프 등)는 동일 형식으로 확장하며, 확장 시 본 표와 `../.claude/workflows/`·`../Workflows/`를 함께 갱신한다.

---

## 8. RFP → 납품 흐름 (가치 흐름)

영업 접수에서 운영 이관까지 21단계로 표준화된다. 각 단계의 담당·산출물·게이트는 [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md), 오케스트레이션은 [27_AUTOMATION_WORKFLOW](27_AUTOMATION_WORKFLOW.md)에 정의된다.

```mermaid
flowchart LR
  A[RFP 접수<br/>rfp-strategy-lead] --> B[분석·요구추출<br/>business-analysis-lead]
  B --> C[업종/시장 리서치<br/>industry-research-lead]
  C --> D[윈 전략·제안<br/>proposal-lead]
  D --> G1{G-제안<br/>qa-lead}
  G1 --> E[UX·IA·플로우<br/>ux-research-lead]
  E --> F[UI·디자인시스템<br/>ui-design-lead]
  F --> G2{G-설계}
  G2 --> H[퍼블리싱·FE/BE<br/>publishing/frontend/backend-lead]
  H --> I[보안·QA<br/>security-risk-lead·qa-lead]
  I --> G3{G-구현}
  G3 --> J[납품·이관<br/>pmo-director·documentation-lead]
  J --> K[메모리·베스트프랙티스 환류]
```

각 게이트의 통과 기준은 [전사 품질 기준](Foundation/QualityStandard.md)·[품질 체크리스트](29_QUALITY_CHECKLIST.md)에 정의된다.

---

## 9. 빠른 시작

### 9.1 사람용
1. 본 문서로 전체 지형 파악.
2. [회사 컨텍스트](01_COMPANY_CONTEXT.md)·[운영 원칙](Foundation/OperatingPrinciples.md)으로 방향 이해.
3. 자신의 본부 토픽 폴더 README → 핵심 문서 정독.
4. 작업 전 정본 확인, 결정은 [의사결정 로그](Foundation/DecisionLog.md)에 ADR로 기록.

### 9.2 AI 에이전트용
1. **항상 골드위키를 먼저 읽는다.** 본 문서 → 자신의 에이전트 정의(`../.claude/agents/`) → [에이전트 운영 규칙](Organization/AgentOperatingRules.md).
2. 입력에서 RFP 단계를 식별하고 [03](03_RFP_FRAMEWORK.md)에서 자신의 단계를 찾는다.
3. 읽을 정본·갱신할 문서를 확인하고 표준대로 실행.
4. 산출물은 [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md)·[Templates](Templates/README.md) 사용.
5. 결정·학습을 두뇌 4종에 환류, 품질 게이트 통과 후 인계.

---

## 10. 거버넌스 (요약)

| 요소 | 규칙 | 정본 |
| --- | --- | --- |
| 권위 | 골드위키 기록이 공식 표준 | [운영 원칙](Foundation/OperatingPrinciples.md) |
| 단일 출처 | 동일 정보 1곳, 나머지는 링크 | 운영 원칙 §SSOT |
| 변경 관리 | 표준 변경은 ADR 기록 | [의사결정 로그](Foundation/DecisionLog.md) |
| 추적성 | 산출물→정본·담당자 추적 | [전사 품질 기준](Foundation/QualityStandard.md) |
| 환류 | 종료 학습→메모리·베스트프랙티스 | [프로젝트 메모리](Foundation/ProjectMemory.md) |
| 신선도 | 문서별 최종 수정일·상태 유지 | 본 문서 메타 |

문서 생애주기: 초안(Draft) → 검토(Review) → 활성(Active) → 개정(Revising) → 보관(Archived).

---

## 관련 골드위키 문서
- [운영 원칙](Foundation/OperatingPrinciples.md) · [전사 품질 기준](Foundation/QualityStandard.md)
- [조직 지도](Organization/OrganizationMap.md) · [에이전트 운영 규칙](Organization/AgentOperatingRules.md)
- [회사 컨텍스트](01_COMPANY_CONTEXT.md) · [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md)
- [의사결정 로그](Foundation/DecisionLog.md) · [프로젝트 메모리](Foundation/ProjectMemory.md)
- [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) · [베스트 프랙티스](37_BEST_PRACTICES.md)

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](Foundation/DecisionLog.md), [프로젝트 메모리](Foundation/ProjectMemory.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/01_COMPANY_CONTEXT.md =====

# 01 · 회사 컨텍스트 (Goldwiki Digital 회사 소개)

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 정체성·서비스·운영 모델·조직 구조를 정의한다. 모든 에이전트가 회사 맥락 위에서 일관되게 의사결정하도록 한다. |
| **대상 독자** | 전 구성원, 클라이언트, 파트너, 22개 서브에이전트 |
| **담당(Owner) 에이전트** | CEO |
| **참조(상위 문서)** | [여기서 시작하세요](00_START_HERE.md) |
| **연계(하위 문서)** | [비즈니스 목표](02_BUSINESS_GOALS.md), [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 회사 개요

Goldwiki Digital(골드위키 디지털)은 **엔터프라이즈 디지털 프로덕트 컨설팅 회사**이다. 공공·금융·대기업 고객을 대상으로 RFP 분석에서 제안, UX/UI 전략과 디자인 시스템, HTML 프로토타이핑과 풀스택 구현, 그리고 QA까지 디지털 프로덕트의 전 생애주기를 단일 팀으로 제공한다.

차별점은 운영 모델에 있다. 회사는 **AI 증강(AI-augmented) 멀티 에이전트** 방식으로 동작하며, 22개의 전문 AI 서브에이전트가 실무를 수행하고 **골드위키(Gold Wiki)** 가 단일 진실 공급원(SSOT)으로 모든 지식을 통제한다. 이는 속도(빠른 사이클타임), 일관성(표준 준수), 추적성(의사결정 기록)을 동시에 달성한다.

---

## 2. 미션 · 비전 · 가치

### 미션
"엔터프라이즈 고객이 더 빠르고 더 정확하게 탁월한 디지털 프로덕트를 출시하도록, AI 증강 방법론으로 RFP부터 운영까지 전 과정을 통합 제공한다."

### 비전
"디지털 프로덕트 컨설팅의 표준을 재정의하는, 지식 기반 AI 증강 컨설팅의 선도 기업이 된다."

### 핵심 가치(Values)
| 가치 | 의미 | 실천 방식 |
| --- | --- | --- |
| **단일 진실(Single Source of Truth)** | 지식은 한 곳에 모은다. | 골드위키 우선 참조 원칙 준수. |
| **증거 기반(Evidence-Based)** | 추측이 아닌 데이터·표준으로 결정한다. | [의사결정 로그](32_DECISION_LOG.md) 기록. |
| **재사용(Reusability)** | 한 번 만든 자산은 계속 활용한다. | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) 운영. |
| **추적성(Traceability)** | 모든 산출물은 출처로 거슬러 갈 수 있다. | 추적성 매트릭스([06](06_BUSINESS_ANALYSIS.md)). |
| **고객 가치(Client Value)** | 산출물이 아니라 성과를 판다. | 가치제안 중심 제안([05](05_PROPOSAL_STRATEGY.md)). |
| **지속 학습(Continuous Learning)** | 매 프로젝트에서 배우고 환류한다. | [프로젝트 메모리](35_PROJECT_MEMORY.md). |

---

## 3. 서비스 라인

| 서비스 라인 | 범위 | 주 산출물 | 주 담당 에이전트 | 관련 문서 |
| --- | --- | --- | --- | --- |
| **RFP 분석 & 제안 전략** | RFP 독해, 요구사항 분석, 윈 전략, 제안서 작성 | 제안서, 컴플라이언스 매트릭스 | Proposal Strategist, Sales Director, Business Analyst | [03](03_RFP_FRAMEWORK.md), [04](04_RFP_ANALYSIS.md), [05](05_PROPOSAL_STRATEGY.md) |
| **UX/UI 전략** | 리서치, IA, 플로우, 여정, 화면 설계 | 페르소나, IA, 와이어프레임 | UX Researcher, UI Designer, Service Planner | [07](07_UX_PRINCIPLES.md), [11](11_INFORMATION_ARCHITECTURE.md), [13](13_USER_JOURNEY.md) |
| **디자인 시스템** | 토큰, 컴포넌트, 가이드라인, 접근성 | 디자인 시스템, 컴포넌트 라이브러리 | BX/UI/Interaction/Accessibility | [09](09_DESIGN_SYSTEM.md), [14](14_COMPONENT_LIBRARY.md), [15](15_DESIGN_TOKEN.md) |
| **프로토타이핑 & 풀스택 개발** | HTML 프로토타입, 프런트·백엔드, API, DB | 동작 프로토타입, 소스 코드 | Publishing/Frontend/Backend/API/DB | [17](17_HTML_GUIDE.md), [20](20_FRONTEND_GUIDE.md), [21](21_BACKEND_GUIDE.md), [22](22_API_STANDARD.md) |
| **QA** | 테스트 전략, 자동화, 결함 관리, 릴리스 | 테스트 결과, 릴리스 노트 | QA Engineer, DevOps Engineer | [29](29_QUALITY_CHECKLIST.md), [30](30_TEST_STRATEGY.md), [31](31_RELEASE_PROCESS.md) |

---

## 4. 타겟 시장

| 세그먼트 | 특성 | 핵심 니즈 |
| --- | --- | --- |
| **공공부문(Public Sector)** | 조달 규정 엄격, 접근성·보안 필수 | 컴플라이언스, WCAG, 정보보안 |
| **금융(Financial Services)** | 규제 준수, 신뢰성, 보안 최우선 | 안정성, 감사 추적, 보안 인증 |
| **대기업(Enterprise)** | 복잡한 이해관계자, 레거시 통합 | 통합, 확장성, 변화 관리 |
| **성장 기업(Scale-up)** | 빠른 출시, 비용 효율 | 속도, 재사용, 디자인 시스템 |

---

## 5. 차별점 (Why Goldwiki Digital)

1. **AI 증강 처리량.** 22개 전문 에이전트가 병렬로 작업하여 제안 사이클타임과 디자인 처리량을 획기적으로 단축한다.
2. **단일 진실 공급원.** 모든 표준·결정이 골드위키에 집중되어 산출물 품질의 변동성이 낮다.
3. **풀 스펙트럼 단일 팀.** RFP에서 운영까지 하나의 통합 파이프라인([03](03_RFP_FRAMEWORK.md))으로 인계 누락을 제거한다.
4. **추적 가능한 품질.** 게이트 기반 품질 통제([29](29_QUALITY_CHECKLIST.md))로 결함 유출을 억제한다.
5. **누적 학습 자산.** 매 프로젝트가 [베스트 프랙티스](37_BEST_PRACTICES.md)와 [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md)를 강화한다.

---

## 6. AI 증강 운영 모델

```
            ┌──────────────────────────────┐
            │   골드위키 (단일 진실 공급원)   │
            │   표준·결정·템플릿·기억         │
            └──────────────┬───────────────┘
                  읽기 ↑  ↓ 갱신
   ┌───────────┬───────────┼───────────┬───────────┐
 영업/제안   비즈니스 분석   디자인    엔지니어링    QA/운영
 에이전트군    에이전트군    에이전트군   에이전트군   에이전트군
```

운영 원칙:
- **골드위키 우선(GoldWiki-First).** 모든 에이전트는 작업 전 관련 문서를 읽는다.
- **단방향 권위.** 표준은 골드위키에만 존재한다. 산출물은 표준을 인용한다.
- **자동 환류.** 결정·학습은 거버넌스 푸터의 4개 문서로 환류된다.
- **오케스트레이션.** 에이전트 간 인계는 [자동화 워크플로](27_AUTOMATION_WORKFLOW.md)와 [서브에이전트 규칙](28_SUBAGENT_RULES.md)을 따른다.

---

## 7. 22개 AI 에이전트 조직도

```
CEO
├── Project Director (프로젝트 총괄)
│   ├── Sales Director ── Proposal Strategist
│   ├── Business Analyst ── Product Owner ── Service Planner
│   ├── [디자인 본부]
│   │   ├── UX Researcher
│   │   ├── UI Designer
│   │   ├── BX Designer
│   │   ├── Interaction Designer
│   │   └── Accessibility Specialist
│   ├── [엔지니어링 본부]
│   │   ├── Publishing Engineer
│   │   ├── Frontend Engineer
│   │   ├── Backend Engineer
│   │   ├── API Engineer
│   │   ├── Database Architect
│   │   └── Security Engineer
│   ├── [지능·품질 본부]
│   │   ├── AI Engineer
│   │   ├── QA Engineer
│   │   └── DevOps Engineer
│   └── Documentation Specialist (골드위키 관리)
```

각 에이전트의 책임·입출력·협업 규칙은 `/home/user/goldwiki/.claude/agents/`의 정의 파일과 [서브에이전트 규칙](28_SUBAGENT_RULES.md)에 명시된다.

---

## 8. 계약 · 수행 모델

| 모델 | 설명 | 적합 상황 |
| --- | --- | --- |
| **고정가(Fixed-Price)** | 범위·일정·금액 확정 | 명확한 RFP, 공공 조달 |
| **시간·자재(T&M)** | 투입 공수 기반 정산 | 범위 불확실, 탐색적 과제 |
| **마일스톤 기반** | 단계 게이트별 정산 | 장기 풀스택 프로젝트 |
| **리테이너(Retainer)** | 월 단위 지속 지원 | 디자인 시스템·운영 유지 |

공수 산정 접근법은 [제안 전략](05_PROPOSAL_STRATEGY.md)을, 단계 게이트는 [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md)를 따른다.

---

## 9. 의사결정 방식

- **권한 위임.** 일상적 실무 결정은 담당 에이전트가 자율 수행한다.
- **에스컬레이션.** 범위·예산·리스크 영향이 큰 결정은 Project Director를 거쳐 CEO로 에스컬레이션한다.
- **기록 의무.** 모든 중대한 결정은 [의사결정 로그](32_DECISION_LOG.md)에 ADR 형식(맥락·대안·결정·결과)으로 남긴다.
- **합의 기준.** 표준 변경은 관련 본부 에이전트의 검토를 거쳐 Documentation Specialist가 골드위키에 반영한다.

---

## 관련 골드위키 문서
- [여기서 시작하세요](00_START_HERE.md) — 전체 워크스페이스 인덱스.
- [비즈니스 목표](02_BUSINESS_GOALS.md) — 회사 전략 목표와 지표.
- [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) — 수행 파이프라인.
- [서브에이전트 규칙](28_SUBAGENT_RULES.md) — 에이전트 운영 규칙.
- [자동화 워크플로](27_AUTOMATION_WORKFLOW.md) — 에이전트 오케스트레이션.
- [베스트 프랙티스](37_BEST_PRACTICES.md) — 검증된 모범 사례.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/02_BUSINESS_GOALS.md =====

# 02 · 비즈니스 목표 (전략 · 운영 목표)

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital의 북극성 지표, OKR, KPI, 성장 전략을 정의하고, 각 목표를 담당 에이전트·골드위키 문서와 연결한다. |
| **대상 독자** | 경영진, Project Director, Sales Director, 전 본부 리드 에이전트 |
| **담당(Owner) 에이전트** | CEO |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md) |
| **연계(하위 문서)** | [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md), [제안 전략](05_PROPOSAL_STRATEGY.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 북극성 지표 (North Star Metric)

> **북극성 지표: 분기당 성공적으로 납품된 고객 가치 단위(Delivered Client Value Units, DCVU)**

DCVU는 게이트를 모두 통과하여 클라이언트에게 인수된 산출물(제안 수주, 디자인 시스템, 출시된 프로덕트)을 가중 합산한 지표이다. 이 단일 지표는 **속도 × 품질 × 가치**를 동시에 반영하며, 매출보다 선행하는 운영 건강 지표 역할을 한다.

| 구성 요소 | 가중치 | 측정 출처 |
| --- | --- | --- |
| 수주된 제안 | 3.0 | [제안 전략](05_PROPOSAL_STRATEGY.md) |
| 인수된 디자인 시스템 산출물 | 1.5 | [디자인 시스템](09_DESIGN_SYSTEM.md) |
| 출시된 프로덕트(릴리스) | 2.0 | [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| 재사용 자산 등록 | 0.5 | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) |

---

## 2. OKR (목표 및 핵심 결과)

> 측정 주기: 분기. 평가: 핵심 결과(KR) 달성률 0.7 이상을 성공으로 본다.

### Objective 1 — 수주 엔진을 고성능화한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 수주율(Win Rate) | 28% | 40% | Proposal Strategist | [05](05_PROPOSAL_STRATEGY.md) |
| KR2. 제안 사이클타임(중앙값) | 18일 | 10일 | Sales Director | [03](03_RFP_FRAMEWORK.md) |
| KR3. 컴플라이언스 매트릭스 100% 충족 제안 비율 | 70% | 98% | Proposal Strategist | [04](04_RFP_ANALYSIS.md) |

### Objective 2 — 디자인·구현 처리량을 확장한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 주당 디자인 처리량(완료 화면/주) | 12 | 25 | UI Designer | [08](08_UI_GUIDELINES.md) |
| KR2. 컴포넌트 재사용률 | 45% | 75% | BX Designer | [14](14_COMPONENT_LIBRARY.md) |
| KR3. 프로토타입 리드타임(요구→동작) | 9일 | 4일 | Frontend Engineer | [20](20_FRONTEND_GUIDE.md) |

### Objective 3 — 품질을 시스템으로 보증한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 결함 유출률(Defect Escape Rate) | 6.5% | 1.5% | QA Engineer | [30](30_TEST_STRATEGY.md) |
| KR2. WCAG AA 준수율 | 82% | 100% | Accessibility Specialist | [16](16_ACCESSIBILITY.md) |
| KR3. 게이트 1회 통과율(First-Pass Yield) | 64% | 90% | Project Director | [29](29_QUALITY_CHECKLIST.md) |

### Objective 4 — 조직 지식을 복리로 축적한다
| 핵심 결과(KR) | 시작값 | 목표값 | 담당 | 연계 문서 |
| --- | --- | --- | --- | --- |
| KR1. 의사결정 로그 기록 충실도 | 55% | 95% | Documentation Specialist | [32](32_DECISION_LOG.md) |
| KR2. 신규 등록 재사용 템플릿(분기) | 5 | 20 | Documentation Specialist | [38](38_TEMPLATE_LIBRARY.md) |
| KR3. 베스트 프랙티스 채택률 | 40% | 80% | 전 본부 리드 | [37](37_BEST_PRACTICES.md) |

---

## 3. KPI 대시보드

| KPI | 정의 | 목표 | 주기 | 담당 | 출처 문서 |
| --- | --- | --- | --- | --- | --- |
| 수주율 | 수주 건수 ÷ 제출 건수 | ≥ 40% | 월 | Sales Director | [05](05_PROPOSAL_STRATEGY.md) |
| 제안 사이클타임 | 접수→제출 소요일(중앙값) | ≤ 10일 | 월 | Proposal Strategist | [03](03_RFP_FRAMEWORK.md) |
| 디자인 처리량 | 인수 완료 화면 수/주 | ≥ 25 | 주 | UI Designer | [08](08_UI_GUIDELINES.md) |
| 결함 유출률 | 운영 발견 결함 ÷ 전체 결함 | ≤ 1.5% | 월 | QA Engineer | [30](30_TEST_STRATEGY.md) |
| 게이트 1회 통과율 | 재작업 없이 통과한 게이트 비율 | ≥ 90% | 단계별 | Project Director | [29](29_QUALITY_CHECKLIST.md) |
| 컴포넌트 재사용률 | 재사용 컴포넌트 ÷ 전체 사용 | ≥ 75% | 분기 | BX Designer | [14](14_COMPONENT_LIBRARY.md) |
| 고객 만족도(CSAT) | 프로젝트 종료 설문 | ≥ 4.5/5 | 프로젝트별 | Project Director | [34](34_CLIENT_KNOWLEDGE.md) |
| 매출 성장률 | 전년 동기 대비 | ≥ 35% | 분기 | CEO | — |

---

## 4. 성장 전략

| 축 | 전략 | 핵심 레버 | 연계 |
| --- | --- | --- | --- |
| **수주 확대** | AI 증강 제안으로 사이클타임을 줄여 입찰 빈도를 높인다. | 윈 테마 라이브러리, 컴플라이언스 자동화 | [05](05_PROPOSAL_STRATEGY.md) |
| **단가 상승** | 디자인 시스템·풀스택 통합으로 고부가 패키지를 판매한다. | 가치제안 캔버스 | [09](09_DESIGN_SYSTEM.md) |
| **반복 매출** | 리테이너·운영 유지 계약을 확대한다. | 운영 이관 품질 | [31](31_RELEASE_PROCESS.md) |
| **마진 개선** | 재사용 자산으로 한계비용을 낮춘다. | 템플릿·컴포넌트 재사용 | [38](38_TEMPLATE_LIBRARY.md) |
| **레퍼런스 확보** | 공공·금융 등 규제 산업 레퍼런스를 축적한다. | 접근성·보안 강점 | [16](16_ACCESSIBILITY.md), [24](24_SECURITY_GUIDE.md) |

---

## 5. 목표–에이전트–문서 연결 매트릭스

| 목표(Objective) | 핵심 담당 에이전트 | 주 연계 골드위키 문서 |
| --- | --- | --- |
| O1 수주 엔진 | Sales Director, Proposal Strategist | [03](03_RFP_FRAMEWORK.md), [04](04_RFP_ANALYSIS.md), [05](05_PROPOSAL_STRATEGY.md) |
| O2 처리량 확장 | UI Designer, BX Designer, Frontend Engineer | [09](09_DESIGN_SYSTEM.md), [14](14_COMPONENT_LIBRARY.md), [20](20_FRONTEND_GUIDE.md) |
| O3 품질 보증 | QA Engineer, Accessibility Specialist, Security Engineer | [16](16_ACCESSIBILITY.md), [24](24_SECURITY_GUIDE.md), [30](30_TEST_STRATEGY.md) |
| O4 지식 축적 | Documentation Specialist | [32](32_DECISION_LOG.md), [37](37_BEST_PRACTICES.md), [38](38_TEMPLATE_LIBRARY.md) |

---

## 6. 측정 거버넌스

- **데이터 출처 일원화.** 모든 KPI 원천은 골드위키 또는 연계 시스템 로그로 한정한다.
- **검토 리듬.** 주간(처리량·사이클타임), 월간(KPI 대시보드), 분기(OKR 평가).
- **이상 대응.** KPI가 목표 대비 80% 미만이면 Project Director가 근본 원인 분석을 수행하고 [공통 오류](39_COMMON_ERRORS.md)와 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.

---

## 관련 골드위키 문서
- [회사 컨텍스트](01_COMPANY_CONTEXT.md) — 미션·서비스 라인.
- [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) — 사이클타임·게이트 정의.
- [제안 전략](05_PROPOSAL_STRATEGY.md) — 수주율 전략.
- [품질 체크리스트](29_QUALITY_CHECKLIST.md) — 게이트 통과율 측정.
- [테스트 전략](30_TEST_STRATEGY.md) — 결함 유출률 관리.
- [베스트 프랙티스](37_BEST_PRACTICES.md) — 채택률 측정 대상.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/03_RFP_FRAMEWORK.md =====

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




===== 파일: GoldWiki/04_RFP_ANALYSIS.md =====

# 04 · RFP 심층 분석 (플레이북)

| 항목 | 내용 |
| --- | --- |
| **목적** | RFP를 정밀하게 독해·분해하고 요구사항을 추출하여, 윈 전략과 비즈니스 분석의 입력을 만든다. 숨은 기대, 평가기준 매핑, 리스크, 벤치마킹을 체계화한다. |
| **대상 독자** | Business Analyst, Proposal Strategist, Product Owner |
| **담당(Owner) 에이전트** | Business Analyst |
| **참조(상위 문서)** | [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) |
| **연계(하위 문서)** | [제안 전략](05_PROPOSAL_STRATEGY.md), [비즈니스 분석](06_BUSINESS_ANALYSIS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. RFP 독해·분해 방법

RFP는 4개 렌즈로 동시에 읽는다.

| 렌즈 | 핵심 질문 | 산출 |
| --- | --- | --- |
| **요구(Requirements)** | 무엇을 만들어야 하는가 | 기능/비기능 요구 목록 |
| **평가(Evaluation)** | 어떻게 채점되는가 | 배점-요구 매핑 |
| **제약(Constraints)** | 예산·기간·기술·규정 한계는 | 제약 목록 |
| **의도(Intent)** | 발주처가 진짜 원하는 성과는 | 숨은 기대·동인 |

### 분해 절차
1. RFP 전문을 문단 단위로 번호 부여(R-001, R-002 …)하여 추적성 ID를 만든다.
2. 각 문장을 요구/평가/제약/의도로 태깅한다.
3. "shall/must/필수/하여야 한다" 등 강제 표현을 추출하여 컴플라이언스 항목으로 승격한다.
4. 모호·중복·상충 항목을 표시하고 질의응답(Q&A) 후보로 분류한다.

---

## 2. 요구사항 추출 템플릿

| ID | 출처(RFP 조항) | 분류 | 요구사항 | 강제성 | 평가 연결 | 담당 | 리스크 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | 3.1.2 | 기능 | 통합 검색 및 자동완성 제공 | 필수 | 기술 25점 | Frontend | 중 |
| R-014 | 4.2 | 비기능 | 동시접속 5,000 처리, 응답 < 2초 | 필수 | 기술 15점 | Backend | 고 |
| R-021 | 5.1 | 접근성 | WCAG 2.1 AA 전면 준수 | 필수 | 기술 10점 | Accessibility | 중 |
| R-030 | 6.3 | 보안 | 개인정보 암호화·접근통제 | 필수 | 기술 10점 | Security | 고 |

---

## 3. 평가기준 매핑

배점표를 요구사항과 1:1로 연결하여 "점수를 만드는 요구"에 자원을 집중한다.

| 평가 항목 | 배점 | 연결 요구 | 우리 강점 | 대응 전략 |
| --- | --- | --- | --- | --- |
| 사업 이해도 | 15 | R-001~R-005 | 통합 풀스펙트럼 | as-is/to-be로 이해 증명 |
| 기술 방법론 | 30 | R-010~R-021 | 디자인 시스템·접근성 | 검증된 표준 인용 |
| 수행 조직·일정 | 20 | — | AI 증강 처리량 | 21단계 파이프라인 제시 |
| 보안·품질 | 20 | R-030~R-035 | OWASP·게이트 통제 | 보안·QA 게이트 제시 |
| 가격 | 15 | — | 재사용 자산 | 합리적 공수 산정 |

---

## 4. 숨은/암묵 기대 탐지

명시되지 않았지만 평가에 영향을 주는 기대를 발굴한다.

| 신호 | 해석 | 대응 |
| --- | --- | --- |
| 반복 등장 키워드("국민 체감", "디지털 전환") | 발주처 상위 정책 동인 | 윈 테마로 승화([05](05_PROPOSAL_STRATEGY.md)) |
| 과거 사업 실패 언급 | 리스크 회피 강한 의사결정자 | 안정성·레퍼런스 강조 |
| 까다로운 접근성·보안 조항 | 감사·규제 압박 존재 | 컴플라이언스 매트릭스 100% |
| 짧은 일정 + 넓은 범위 | 처리 속도 우려 | AI 증강 처리량 제시 |

---

## 5. 리스크 레지스터 템플릿

| ID | 리스크 | 범주 | 발생가능성 | 영향 | 등급 | 대응 | 담당 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| RR-01 | 성능 요구(5천 동접) 미달 | 기술 | 중 | 고 | 높음 | 부하 테스트 조기 수행([30](30_TEST_STRATEGY.md)) | Backend |
| RR-02 | 접근성 미준수로 감점 | 규제 | 중 | 중 | 중간 | WCAG 자동 점검 통합([16](16_ACCESSIBILITY.md)) | Accessibility |
| RR-03 | 일정 대비 범위 과다 | 일정 | 높음 | 고 | 높음 | MVP 우선순위·단계 납품 | Product Owner |
| RR-04 | 개인정보 처리 위반 | 보안 | 낮음 | 매우높음 | 높음 | 암호화·접근통제 설계([24](24_SECURITY_GUIDE.md)) | Security |

등급 산정: 발생가능성 × 영향. 높음 이상은 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.

---

## 6. 경쟁·베스트프랙티스 벤치마킹

| 단계 | 방법 |
| --- | --- |
| **경쟁사 식별** | 동종 사업 수주 이력·강약점 분석 |
| **포지셔닝 비교** | 가격/품질/속도/레퍼런스 2×2 매핑 |
| **글로벌 베스트프랙티스** | 동종 도메인 표준·우수 사례를 [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)에서 수집 |
| **차별화 도출** | 경쟁사 미보유 강점을 윈 테마로 전환 |

---

## 7. 채점 루브릭 (자체 평가)

제안 초안을 발주처 시각으로 자체 채점하여 약점을 보강한다.

| 항목 | 1점(미흡) | 3점(보통) | 5점(우수) |
| --- | --- | --- | --- |
| 요구 충족 | 다수 누락 | 핵심 충족 | 전 항목 + 추가가치 |
| 차별성 | 일반적 | 일부 차별 | 명확한 윈 테마 |
| 실현 가능성 | 근거 부족 | 합리적 | 검증된 방법론·레퍼런스 |
| 리스크 관리 | 미언급 | 식별만 | 식별+대응+담당 |

총점 80% 미만이면 G2 게이트([03](03_RFP_FRAMEWORK.md))를 통과하지 못한다.

---

## 8. 채워진 예시 발췌 — 공공부문 포털 RFP 샘플

> 사업명(가상): "국민참여 통합포털 고도화 사업", 예산 8억, 기간 7개월, 기술 70 / 가격 30 배점.

**핵심 요구 추출(발췌)**
| ID | 요구 | 강제성 | 평가 |
| --- | --- | --- | --- |
| R-001 | 노후 포털을 반응형으로 전면 개편 | 필수 | 기술 이해 15 |
| R-007 | 민원 신청 플로우 3클릭 이내 | 필수 | UX 10 |
| R-012 | WCAG 2.1 AA 100% 및 정보보안 인증 대응 | 필수 | 품질 20 |
| R-018 | 동시접속 5,000, 평균 응답 2초 이내 | 필수 | 기술 15 |

**숨은 기대 해석**: "국민 체감 서비스" 표현 7회 반복 → 발주처는 가시적 사용성 개선을 최우선시한다. 대응: 여정 지도 기반 페인 포인트 해소를 윈 테마로 설정([13](13_USER_JOURNEY.md)).

**핵심 리스크**: R-018 성능 요구가 가장 높은 리스크(RR-01). 대응: 14단계 아키텍처 설계 시 캐싱·CDN 전제, 17단계에서 부하 테스트 선행.

**자체 채점 결과(요약)**: 요구 충족 5 / 차별성 4 / 실현 가능성 5 / 리스크 관리 4 → 90% 통과. 차별성 보강을 위해 디자인 시스템 재사용 효과를 정량 제시하기로 결정.

이 분석 산출물은 7단계 [비즈니스 분석](06_BUSINESS_ANALYSIS.md)과 6단계 [제안 전략](05_PROPOSAL_STRATEGY.md)의 입력으로 인계된다.

---

## 관련 골드위키 문서
- [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) — 본 플레이북이 속한 3단계.
- [제안 전략](05_PROPOSAL_STRATEGY.md) — 분석 결과로 윈 전략 수립.
- [비즈니스 분석](06_BUSINESS_ANALYSIS.md) — 요구사항 정교화 인계.
- [접근성](16_ACCESSIBILITY.md) — WCAG 요구 대응.
- [보안 가이드](24_SECURITY_GUIDE.md) — 보안 요구 대응.
- [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md) — 벤치마킹 자료.
- [의사결정 로그](32_DECISION_LOG.md) — 리스크 결정 기록.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/05_PROPOSAL_STRATEGY.md =====

# 05 · 제안 전략 (수주 전략)

| 항목 | 내용 |
| --- | --- |
| **목적** | RFP 분석 결과를 수주로 전환하기 위한 윈 전략을 정의한다. 윈 테마, 가치제안, 경쟁 포지셔닝, 가격·공수 산정, 제안서 구조, 레드팀 게이트를 표준화한다. |
| **대상 독자** | Proposal Strategist, Sales Director, CEO |
| **담당(Owner) 에이전트** | Proposal Strategist |
| **참조(상위 문서)** | [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md), [RFP 심층 분석](04_RFP_ANALYSIS.md) |
| **연계(하위 문서)** | [비즈니스 분석](06_BUSINESS_ANALYSIS.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 윈 테마 (Win Themes)

윈 테마는 "발주처의 핵심 동인 × 우리만의 차별점 × 증거"의 교집합이다.

| 구성 요소 | 정의 | 출처 |
| --- | --- | --- |
| **고객 동인** | 발주처가 가장 원하는 성과 | [04](04_RFP_ANALYSIS.md) 숨은 기대 |
| **차별점** | 경쟁사가 못 주는 우리 강점 | [01](01_COMPANY_CONTEXT.md) |
| **증거** | 차별점을 입증하는 사실 | 레퍼런스, KPI([02](02_BUSINESS_GOALS.md)) |

**윈 테마 작성 공식**: "[고객 동인]을 위해, 우리는 [차별점]으로 [정량 성과]를 제공한다. [증거]가 이를 뒷받침한다."

예: "국민 체감 사용성 향상을 위해, 검증된 디자인 시스템 재사용으로 화면 처리량을 2배 높여 7개월 일정 내 안정 출시한다. 최근 공공포털 3개 사업 적기 납품 실적이 이를 뒷받침한다."

---

## 2. 가치제안 캔버스 (Value Proposition Canvas)

| 고객 측면 | 우리 제공 |
| --- | --- |
| **고객 과업(Jobs)**: 노후 포털 개편, 규제 대응, 적기 출시 | **제품·서비스**: 통합 풀스펙트럼 수행 |
| **고통(Pains)**: 일정 압박, 접근성·보안 리스크, 사용성 불만 | **고통 해소제(Pain Relievers)**: 21단계 파이프라인, 게이트 품질통제, WCAG 100% |
| **이득(Gains)**: 가시적 개선, 안정성, 운영 편의 | **이득 창출제(Gain Creators)**: 재사용 디자인 시스템, 운영 이관 자산 |

---

## 3. 경쟁 포지셔닝

| 차원 | 경쟁사 A | 경쟁사 B | Goldwiki Digital |
| --- | --- | --- | --- |
| 처리 속도 | 보통 | 느림 | **빠름(AI 증강)** |
| 디자인 품질 | 높음 | 보통 | **높음(시스템 기반)** |
| 접근성·보안 | 보통 | 보통 | **강함(표준 내재화)** |
| 가격 | 높음 | 낮음 | **합리적(재사용)** |
| 통합성 | 부분 | 부분 | **풀스펙트럼 단일 팀** |

포지셔닝 문장: "우리는 빠르면서도 품질을 시스템으로 보증하는 유일한 통합 팀이다."

---

## 4. 가격 · 공수 산정 접근법

### 산정 절차
1. [비즈니스 분석](06_BUSINESS_ANALYSIS.md)의 WBS를 기준으로 작업 패키지를 분해한다.
2. 각 패키지를 인력 등급·공수(MM)로 환산한다.
3. 재사용 자산([38](38_TEMPLATE_LIBRARY.md), [14](14_COMPONENT_LIBRARY.md)) 적용분만큼 공수를 차감한다.
4. 리스크 버퍼(난이도별 10~25%)를 가산한다.

| 작업 패키지 | 표준 공수(MM) | 재사용 차감 | 리스크 버퍼 | 최종 |
| --- | --- | --- | --- | --- |
| UX·IA·플로우 | 4.0 | -0.5 | +0.4 | 3.9 |
| UI·디자인 시스템 | 6.0 | -2.0 | +0.4 | 4.4 |
| 프런트·백엔드 | 10.0 | -1.0 | +1.5 | 10.5 |
| QA·보안 | 3.0 | -0.3 | +0.4 | 3.1 |

**가격 전략**: 가격 배점 비중과 경쟁 강도에 따라 (a) 가치 기반(고품질 강조) 또는 (b) 경쟁 가격(저배점 회피)을 선택한다. 선택 근거는 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.

---

## 5. 제안서 구조 및 스토리라인

| 장 | 내용 | 윈 테마 연결 |
| --- | --- | --- |
| 1. 경영 요약 | 핵심 메시지·윈 테마 3개 | 전 윈 테마 |
| 2. 사업 이해 | as-is/to-be, 페인 포인트 | 고객 동인 |
| 3. 수행 방법론 | 21단계 파이프라인, 디자인 시스템 | 처리량·품질 |
| 4. 수행 조직·일정 | 조직도, WBS, 마일스톤 | 안정성 |
| 5. 품질·보안 | 게이트, WCAG, OWASP | 규제 대응 |
| 6. 차별점·기대효과 | 정량 성과, 레퍼런스 | 증거 |
| 7. 가격 | 공수·산정 근거 | 합리성 |

**스토리라인 원칙**: 모든 장은 "고객 문제 → 우리 해법 → 증거 → 기대효과" 흐름을 반복한다.

---

## 6. 경영 요약 템플릿

```
[발주처]께서 추진하시는 [사업명]의 핵심은 [고객 동인]입니다.
Goldwiki Digital은 [차별점 1], [차별점 2], [차별점 3]을 통해
[정량 성과]를 약속드립니다.
당사는 [레퍼런스/실적]을 보유하고 있으며,
검증된 [방법론/표준]으로 [리스크]를 사전에 통제합니다.
그 결과 [발주처]는 [기대효과]를 얻으실 것입니다.
```

---

## 7. 컴플라이언스 매트릭스

발주처 요구를 누락 없이 충족함을 증명하는 표. 제출 전 100% 충족이 G6 게이트 통과 조건이다([03](03_RFP_FRAMEWORK.md)).

| RFP 요구 ID | 요구 내용 | 충족 여부 | 제안서 위치 | 근거 |
| --- | --- | --- | --- | --- |
| R-001 | 반응형 전면 개편 | 충족 | 3장 2절 | 디자인 시스템 |
| R-012 | WCAG 2.1 AA | 충족 | 5장 1절 | [16](16_ACCESSIBILITY.md) |
| R-018 | 동시접속 5,000 | 충족 | 4장 3절 | 부하 테스트 계획 |
| R-030 | 개인정보 암호화 | 충족 | 5장 2절 | [24](24_SECURITY_GUIDE.md) |

---

## 8. 레드팀 검토 게이트

제출 전 독립 시각의 적대적 검토를 수행한다(18단계).

**레드팀 체크리스트**
- [ ] 경영 요약만 읽고 윈 테마가 즉시 이해되는가
- [ ] 모든 평가 항목에 명확한 대응이 있는가
- [ ] 컴플라이언스 매트릭스가 100% 충족인가
- [ ] 정량 성과에 근거(레퍼런스·KPI)가 붙어 있는가
- [ ] 경쟁사가 더 잘 쓸 수 있는 약점은 없는가
- [ ] 가격이 가치와 정합하는가
- [ ] 자체 채점 루브릭([04](04_RFP_ANALYSIS.md)) 85% 이상인가

레드팀 미통과 항목은 보강 후 재검토하며, 결과를 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.

---

## 관련 골드위키 문서
- [RFP 심층 분석](04_RFP_ANALYSIS.md) — 윈 전략의 입력.
- [RFP 대응 프레임워크](03_RFP_FRAMEWORK.md) — 6·18단계 위치.
- [비즈니스 분석](06_BUSINESS_ANALYSIS.md) — WBS·공수 근거.
- [비즈니스 목표](02_BUSINESS_GOALS.md) — 수주율·증거 KPI.
- [품질 체크리스트](29_QUALITY_CHECKLIST.md) — G6 게이트.
- [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) — 제안서 템플릿.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/06_BUSINESS_ANALYSIS.md =====

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




===== 파일: GoldWiki/07_UX_PRINCIPLES.md =====

# 07 · UX 원칙 · 휴리스틱

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 모든 제품·서비스 설계에 일관되게 적용되는 사용자 경험(UX) 원칙·휴리스틱·측정 체계를 정의한다. |
| **대상 독자** | UX 리서처, UI 디자이너, BX 디자이너, 인터랙션 디자이너, 서비스 기획자, 프로덕트 오너 |
| **담당(Owner) 에이전트** | UX Researcher (협업: Service Planner, Interaction Designer) |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [비즈니스 목표](02_BUSINESS_GOALS.md) |
| **연계(하위 문서)** | [UI 가이드라인](08_UI_GUIDELINES.md), [디자인 시스템](09_DESIGN_SYSTEM.md), [정보구조](11_INFORMATION_ARCHITECTURE.md), [유저 플로우](12_USER_FLOW.md), [유저 여정](13_USER_JOURNEY.md), [접근성](16_ACCESSIBILITY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 이 문서의 위치

본 문서는 골드위키 디지털의 **경험 설계 철학의 헌법**에 해당한다. 화면 단위 시각 규칙은 [UI 가이드라인](08_UI_GUIDELINES.md)이, 구현 단위 컴포넌트 규칙은 [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)가 담당한다. 본 문서는 그 상위에서 "왜 그렇게 설계하는가"의 기준을 제공한다.

> 모든 디자인·기획 에이전트는 산출물을 만들기 전에 본 문서의 10대 원칙과 측정 지표를 먼저 확인한다.

---

## 2. Goldwiki Digital UX 10대 고유 원칙

각 원칙은 **이름**, **정의**, **실무 적용**, **위반 신호**로 구성한다.

### 원칙 1 — 명료성 우선(Clarity over Cleverness)
- **정의:** 영리한 인터랙션보다 즉시 이해되는 명료함을 우선한다.
- **실무 적용:** 레이블은 도메인 용어가 아닌 사용자 용어로 작성한다. 아이콘 단독 사용을 금지하고 텍스트 레이블을 병기한다.
- **위반 신호:** 첫 사용자가 버튼의 결과를 예측하지 못한다. 사용성 테스트에서 "이게 뭐예요?" 발화가 3회 이상 발생한다.

### 원칙 2 — 한 화면 한 목적(One Screen, One Job)
- **정의:** 각 화면은 사용자의 단일 핵심 과업을 책임진다.
- **실무 적용:** 주요 행동(Primary CTA)은 화면당 1개로 제한한다. 부차 행동은 시각적 위계로 낮춘다.
- **위반 신호:** 한 화면에 동등한 위계의 CTA가 3개 이상 존재한다.

### 원칙 3 — 점진적 공개(Progressive Disclosure)
- **정의:** 사용자가 지금 필요한 정보만 노출하고 나머지는 단계적으로 공개한다.
- **실무 적용:** 고급 설정은 접기/펼치기로 숨긴다. 온보딩은 한 번에 한 개념만 가르친다.
- **위반 신호:** 첫 화면에서 입력 필드가 10개를 넘는다.

### 원칙 4 — 가역성 보장(Forgiveness by Default)
- **정의:** 사용자의 모든 행동은 되돌릴 수 있어야 한다.
- **실무 적용:** 삭제에는 실행 취소(Undo)를, 비가역 행동에는 명시적 확인을 둔다. 자동 저장을 기본으로 한다.
- **위반 신호:** "정말 삭제하시겠습니까?"만 있고 복구 경로가 없다.

### 원칙 5 — 즉각적 피드백(Immediate Feedback)
- **정의:** 모든 사용자 행동에는 100ms 이내의 시각·청각·촉각 반응이 따른다.
- **실무 적용:** 버튼 클릭 시 즉시 상태 변화를, 1초 이상 작업에는 로딩 상태를 표시한다. ([상태 정의](08_UI_GUIDELINES.md) 참조)
- **위반 신호:** 클릭 후 화면 변화 없이 사용자가 재클릭한다.

### 원칙 6 — 접근성 내재화(Accessibility is Not Optional)
- **정의:** 접근성은 추가 기능이 아니라 기본 요구사항이다.
- **실무 적용:** 모든 설계는 [WCAG 2.2 AA](16_ACCESSIBILITY.md)를 충족한다. 색상만으로 정보를 전달하지 않는다.
- **위반 신호:** 키보드만으로 핵심 과업을 완수할 수 없다.

### 원칙 7 — 일관성의 경제(Consistency Pays Compound Interest)
- **정의:** 동일 패턴의 반복은 학습 비용을 0에 수렴시킨다.
- **실무 적용:** [디자인 토큰](15_DESIGN_TOKEN.md)과 [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)를 단일 출처로 사용한다.
- **위반 신호:** 같은 의미의 버튼이 화면마다 다른 색·크기를 가진다.

### 원칙 8 — 데이터로 말하기(Evidence over Opinion)
- **정의:** 디자인 결정은 의견이 아니라 리서치·측정 데이터로 정당화한다.
- **실무 적용:** 모든 주요 결정은 근거를 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.
- **위반 신호:** "제 생각엔"으로 시작하는 결정이 회의록을 채운다.

### 원칙 9 — 인지 부하 최소화(Respect the User's Working Memory)
- **정의:** 사용자가 한 번에 기억해야 하는 항목을 7±2 이하로 유지한다.
- **실무 적용:** 정보를 청킹(grouping)하고, 입력 중 맥락을 화면에 유지한다.
- **위반 신호:** 사용자가 이전 화면의 값을 외워서 다음 화면에 입력해야 한다.

### 원칙 10 — 신뢰의 투명성(Trust through Transparency)
- **정의:** 시스템 상태·비용·개인정보 처리를 숨기지 않는다.
- **실무 적용:** 결제 전 총액을 명시하고, 데이터 수집 사유를 그 자리에서 설명한다.
- **위반 신호:** 결제 마지막 단계에서 숨은 수수료가 처음 등장한다.

---

## 3. Nielsen 10대 사용성 휴리스틱 — 골드위키 적용 기준

| # | 휴리스틱 | 골드위키 적용 체크 |
| --- | --- | --- |
| 1 | 시스템 상태 가시성 | 로딩/진행/저장 상태를 항상 표시하는가 |
| 2 | 시스템과 현실의 일치 | 도메인 전문 용어 대신 사용자 언어를 쓰는가 |
| 3 | 사용자 통제와 자유 | 실행 취소·재실행·탈출 경로가 있는가 |
| 4 | 일관성과 표준 | 디자인 토큰·컴포넌트를 준수하는가 |
| 5 | 오류 예방 | 위험 행동에 제약·확인을 두는가 |
| 6 | 회상보다 인식 | 옵션을 보여주는가, 외우게 하는가 |
| 7 | 유연성과 효율성 | 단축키·자동완성 등 숙련자 경로가 있는가 |
| 8 | 심미적·미니멀 디자인 | 불필요한 정보를 제거했는가 |
| 9 | 오류 인식·진단·복구 | 에러 메시지가 원인+해결책을 주는가 |
| 10 | 도움말과 문서 | 맥락 도움말이 검색 가능한가 |

---

## 4. 리서치 기반 디자인(Research-Driven Design)

골드위키의 모든 설계는 다음 더블 다이아몬드 흐름을 따른다.

```
발견(Discover) → 정의(Define) → 발전(Develop) → 전달(Deliver)
   확산              수렴            확산            수렴
```

| 단계 | 핵심 활동 | 산출물 | 연계 문서 |
| --- | --- | --- | --- |
| 발견 | 사용자 인터뷰, 설문, 분석 데이터 검토 | 인사이트 노트 | [클라이언트 지식](34_CLIENT_KNOWLEDGE.md) |
| 정의 | 페르소나, 여정맵, 문제 정의 | 페르소나·여정맵 | [유저 여정](13_USER_JOURNEY.md) |
| 발전 | 정보구조, 플로우, 와이어프레임 | IA·플로우 | [정보구조](11_INFORMATION_ARCHITECTURE.md), [유저 플로우](12_USER_FLOW.md) |
| 전달 | 프로토타입, 사용성 테스트, 핸드오프 | 테스트 리포트 | [Figma 가이드](10_FIGMA_GUIDE.md) |

**리서치 기법 선택표**

| 질문 유형 | 권장 기법 | 표본 |
| --- | --- | --- |
| "사용자가 왜 이탈하는가?" | 정성 인터뷰, 사용성 테스트 | 5–8명 |
| "어떤 안이 더 효과적인가?" | A/B 테스트 | 통계적 유의 표본 |
| "정보를 어떻게 분류하는가?" | 카드소팅, 트리테스트 | 15–30명 |
| "전반적 만족도는?" | SUS 설문 | 20명 이상 |

---

## 5. 멘탈 모델(Mental Model) 정렬

- **멘탈 모델:** 사용자가 시스템이 어떻게 작동할 것이라 믿는 내적 표상.
- **개념 모델:** 디자이너가 의도한 시스템 구조.
- **목표:** 두 모델의 간극(gulf)을 최소화한다.

**간극 진단 질문**
1. 사용자가 첫 화면에서 "다음에 무엇을 해야 하는가"를 예측하는가? (실행의 간극)
2. 사용자가 행동 결과를 보고 "내가 한 것이 맞았는가"를 확인하는가? (평가의 간극)

간극이 큰 화면은 [유저 플로우](12_USER_FLOW.md)로 분해하여 재설계한다.

---

## 6. UX 성숙도 모델(UX Maturity)

골드위키는 클라이언트 조직과 자사 프로젝트를 다음 5단계로 진단한다.

| 단계 | 명칭 | 특징 | 골드위키 처방 |
| --- | --- | --- | --- |
| 1 | 부재(Absent) | UX 활동 없음 | UX 가치 교육, 빠른 진단 |
| 2 | 제한(Limited) | 산발적 리서치 | 표준 프로세스 도입 |
| 3 | 산발(Emergent) | 일부 팀만 수행 | 디자인 시스템 착수 |
| 4 | 구조화(Structured) | 전사 프로세스 | 측정 체계·거버넌스 |
| 5 | 통합(Integrated) | 데이터·문화 내재화 | 지속 최적화 |

진단 결과는 [비즈니스 분석](06_BUSINESS_ANALYSIS.md)과 [제안 전략](05_PROPOSAL_STRATEGY.md)에 반영한다.

---

## 7. UX 측정 체계

### 7.1 SUS(System Usability Scale)
10문항 5점 척도. 점수 환산법:
- 홀수 문항: (응답값 − 1)
- 짝수 문항: (5 − 응답값)
- 합계 × 2.5 = 0–100 점수

| SUS 점수 | 등급 | 해석 |
| --- | --- | --- |
| 80.3 이상 | A | 우수, 추천 의향 높음 |
| 68 | C (평균) | 업계 평균 기준선 |
| 51 미만 | F | 즉시 개선 필요 |

### 7.2 핵심 지표(KPI)

| 지표 | 정의 | 목표 기준 |
| --- | --- | --- |
| 과업 성공률(Task Success Rate) | 과업 완수 사용자 비율 | ≥ 90% |
| 소요 시간(Time on Task) | 과업 완수 평균 시간 | 기준선 대비 −20% |
| 오류율(Error Rate) | 과업당 평균 오류 수 | ≤ 0.5 |
| 이탈률(Drop-off) | 플로우 단계별 이탈 | 단계당 ≤ 10% |
| SUS | 사용성 종합 | ≥ 80 |
| NPS | 추천 의향 | ≥ 30 |

### 7.3 HEART 프레임워크 매핑

| 차원 | 신호(Signal) | 지표(Metric) |
| --- | --- | --- |
| Happiness | 만족도 설문 | SUS, NPS |
| Engagement | 세션 빈도 | 주간 활성 비율 |
| Adoption | 신규 기능 사용 | 신규 사용자 비율 |
| Retention | 재방문 | 30일 잔존율 |
| Task Success | 과업 완수 | 성공률, 소요 시간 |

---

## 8. UX 안티패턴(피해야 할 것)

| 안티패턴 | 설명 | 대안 |
| --- | --- | --- |
| 다크 패턴(Dark Pattern) | 사용자를 속이는 강제 구독·은폐 비용 | 투명성 원칙(원칙 10) 적용 |
| 미스터리 미트(Mystery Meat) | 의미 불명 아이콘 단독 사용 | 텍스트 레이블 병기 |
| 무한 스크롤 함정 | 푸터·종료 지점 상실 | "더 보기" 버튼, 페이지네이션 |
| 조혼(Premature) 가입 강요 | 가치 경험 전 회원가입 강제 | 게스트 체험 후 가입 유도 |
| 알림 폭격 | 과도한 푸시 | 빈도 제어, 사용자 설정 제공 |
| 가짜 진행 표시 | 의미 없는 단계 부풀리기 | 실제 단계만 표기 |

---

## 9. 산출물 품질 게이트

디자인 산출물은 [품질 체크리스트](29_QUALITY_CHECKLIST.md) 통과 전 다음을 자가 검증한다.

- [ ] 10대 원칙 위반 신호가 없는가
- [ ] Nielsen 휴리스틱 10항 점검을 완료했는가
- [ ] 핵심 과업이 키보드만으로 완수되는가([접근성](16_ACCESSIBILITY.md))
- [ ] 측정 지표 목표가 정의되었는가
- [ ] 주요 결정이 [의사결정 로그](32_DECISION_LOG.md)에 기록되었는가

---

## 관련 골드위키 문서

- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 본 원칙을 시각·화면 단위 규칙으로 구체화한다.
- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 원칙을 시스템 아키텍처로 운영한다.
- [11 · 정보구조](11_INFORMATION_ARCHITECTURE.md) — 인지 부하·멘탈 모델 원칙의 구조적 구현.
- [12 · 유저 플로우](12_USER_FLOW.md) — 실행/평가 간극을 단계로 분해한다.
- [13 · 유저 여정](13_USER_JOURNEY.md) — 리서치 인사이트를 여정으로 통합한다.
- [16 · 접근성](16_ACCESSIBILITY.md) — 원칙 6의 표준 근거.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) — 산출물 검수 게이트.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/08_UI_GUIDELINES.md =====

# 08 · UI 가이드라인

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 시각·화면 단위 UI 설계 규칙(레이아웃, 간격, 타이포그래피, 색상, 상태, 반응형)을 표준화한다. |
| **대상 독자** | UI 디자이너, BX 디자이너, 인터랙션 디자이너, 퍼블리싱 엔지니어, 프런트엔드 엔지니어 |
| **담당(Owner) 에이전트** | UI Designer (협업: BX Designer, Publishing Engineer) |
| **참조(상위 문서)** | [UX 원칙](07_UX_PRINCIPLES.md), [디자인 시스템](09_DESIGN_SYSTEM.md) |
| **연계(하위 문서)** | [디자인 토큰](15_DESIGN_TOKEN.md), [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [접근성](16_ACCESSIBILITY.md), [CSS 가이드](18_CSS_GUIDE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 적용 범위

본 문서는 [UX 원칙](07_UX_PRINCIPLES.md)을 화면에 구현하기 위한 시각 규칙을 정의한다. 모든 수치 값은 [디자인 토큰](15_DESIGN_TOKEN.md)의 토큰을 단일 출처로 참조하며, 본 문서는 그 사용 규칙을 규정한다.

---

## 2. 레이아웃 · 그리드

### 2.1 기준 그리드
- **데스크톱:** 12 컬럼, 거터 24px, 최대 콘텐츠 폭 1200px, 좌우 여백 자동.
- **태블릿:** 8 컬럼, 거터 16px.
- **모바일:** 4 컬럼, 거터 16px, 좌우 여백 16px.

### 2.2 기준선(Baseline) 그리드
- 수직 리듬은 4px 배수를 따른다. 본문 행간은 8px 배수에 정렬한다.

```css
.layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6); /* 24px */
  max-inline-size: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-4); /* 16px */
}
```

---

## 3. 간격 스케일(Spacing Scale)

4px 기반 8단계 스케일을 사용한다. 임의 값(예: 13px) 사용을 금지한다.

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `--space-1` | 4px | 아이콘-텍스트 간격 |
| `--space-2` | 8px | 컴포넌트 내부 패딩 |
| `--space-3` | 12px | 입력 필드 내부 |
| `--space-4` | 16px | 카드 패딩, 모바일 여백 |
| `--space-5` | 20px | 그룹 간 간격 |
| `--space-6` | 24px | 섹션 거터 |
| `--space-8` | 32px | 섹션 간 간격 |
| `--space-12` | 48px | 페이지 블록 분리 |

---

## 4. 타이포그래피 규칙

### 4.1 타입 스케일

| 토큰 | 크기/행간 | 굵기 | 용도 |
| --- | --- | --- | --- |
| `--font-display` | 40/48 | 700 | 페이지 대표 제목 |
| `--font-h1` | 32/40 | 700 | 화면 제목 |
| `--font-h2` | 24/32 | 600 | 섹션 제목 |
| `--font-h3` | 20/28 | 600 | 하위 제목 |
| `--font-body` | 16/24 | 400 | 본문 |
| `--font-small` | 14/20 | 400 | 보조 텍스트 |
| `--font-caption` | 12/16 | 400 | 캡션·레이블 |

### 4.2 규칙
- 본문 최소 크기는 **16px**(모바일 가독성·확대 대응).
- 한 화면에서 글꼴 패밀리는 2종(본문체+제목체) 이하로 제한한다.
- 한 줄 길이는 45–75자(em 기준 약 66ch)를 권장한다.
- 줄바꿈 후 첫 줄에 단어 1개만 남는 고아(orphan)를 피한다.

---

## 5. 색상 사용 규칙

### 5.1 색상 역할(Semantic Roles)

| 역할 | 토큰 | 용도 |
| --- | --- | --- |
| Primary | `--color-primary` | 주요 행동, 강조 |
| Neutral | `--color-neutral-*` | 텍스트, 배경, 경계선 |
| Success | `--color-success` | 성공 상태 |
| Warning | `--color-warning` | 주의 |
| Danger | `--color-danger` | 오류·파괴적 행동 |
| Info | `--color-info` | 정보성 안내 |

### 5.2 규칙
- 색상만으로 의미를 전달하지 않는다(아이콘·텍스트 병기). ([접근성](16_ACCESSIBILITY.md) 참조)
- 본문 텍스트 대비는 **4.5:1**, 대형 텍스트는 **3:1** 이상.
- 브랜드 색은 강조에만 사용하고 면적의 10% 이내로 절제한다.

---

## 6. 아이콘 · 이미지

### 6.1 아이콘
- 그리드 24×24px, 선 굵기 1.5–2px로 통일한다.
- 단독 아이콘 버튼에는 반드시 `aria-label`을 부여한다.
- 의미 전달 아이콘은 텍스트 레이블과 병기한다.

### 6.2 이미지
- 콘텐츠 이미지는 `alt` 텍스트 필수, 장식 이미지는 `alt=""`.
- 반응형 이미지는 `srcset`·`sizes`로 제공한다.
- 종횡비를 CSS `aspect-ratio`로 고정해 레이아웃 이동(CLS)을 방지한다.

---

## 7. 상태(States) 정의

모든 인터랙티브 요소는 다음 상태를 시각적으로 구분해야 한다.

| 상태 | 시각 처리 | 비고 |
| --- | --- | --- |
| 기본(default) | 기준 스타일 | — |
| hover | 배경/명도 변화 | 마우스 환경 한정 |
| focus | 가시 포커스 링 2px | 키보드 필수, 제거 금지 |
| active | 눌림 효과(명도↓, 1px 이동) | 즉각 피드백 |
| disabled | 명도↓, `cursor: not-allowed` | 대비 완화 허용 |
| loading | 스피너/스켈레톤 | 1초 이상 작업 |
| empty | 빈 상태 안내+행동 유도 | "데이터 없음" 금지, 다음 행동 제시 |
| error | 적색 경계+메시지 | 원인+해결책 |

### 7.1 포커스 가시성 예시

```css
.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### 7.2 빈 상태(Empty State) 권장 구조
1. 일러스트/아이콘 (선택)
2. 한 줄 설명 ("아직 등록된 프로젝트가 없습니다")
3. 다음 행동 버튼 ("새 프로젝트 만들기")

---

## 8. 반응형 브레이크포인트

| 토큰 | 범위 | 대상 |
| --- | --- | --- |
| `sm` | < 640px | 모바일 |
| `md` | 640–1023px | 태블릿 |
| `lg` | 1024–1439px | 데스크톱 |
| `xl` | ≥ 1440px | 와이드 |

- 모바일 퍼스트로 작성하고 `min-width` 미디어 쿼리로 확장한다.
- 터치 타깃은 최소 **44×44px**를 보장한다.

```css
.card { padding: var(--space-4); }
@media (min-width: 1024px) {
  .card { padding: var(--space-6); }
}
```

---

## 9. Do / Don't 예시

| 구분 | Do (권장) | Don't (지양) |
| --- | --- | --- |
| 버튼 위계 | 화면당 Primary 1개 | 동등한 색의 CTA 3개 |
| 간격 | 토큰 스케일 사용 | 임의 13px·19px |
| 색상 | 텍스트+색상으로 의미 전달 | 적/녹 색상만으로 구분 |
| 타이포 | 본문 16px | 본문 12px |
| 포커스 | 가시 포커스 링 유지 | `outline: none` 제거 |
| 에러 | "이메일 형식이 올바르지 않습니다" | "오류가 발생했습니다" |
| 로딩 | 스켈레톤 표시 | 빈 화면 방치 |

### 9.1 에러 메시지 작성 공식
```
[무엇이] 잘못되었는가 + [왜] + [어떻게] 해결하는가
예) "비밀번호는 8자 이상이어야 합니다. 특수문자를 1개 이상 포함해 주세요."
```

---

## 10. 검수 체크리스트

- [ ] 모든 수치가 토큰을 참조하는가([디자인 토큰](15_DESIGN_TOKEN.md))
- [ ] 8가지 상태가 모두 정의되었는가
- [ ] 색상 대비가 AA를 충족하는가([접근성](16_ACCESSIBILITY.md))
- [ ] 4개 브레이크포인트에서 레이아웃이 깨지지 않는가
- [ ] 터치 타깃 44px 이상인가
- [ ] 포커스 가시성이 유지되는가

---

## 관련 골드위키 문서

- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 본 가이드라인의 상위 설계 철학.
- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — UI 규칙을 시스템으로 운영.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 상태·변형의 컴포넌트 구현.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — 간격·색상·타이포 수치의 단일 출처.
- [16 · 접근성](16_ACCESSIBILITY.md) — 대비·포커스·터치 타깃 기준.
- [18 · CSS 가이드](18_CSS_GUIDE.md) — 그리드·미디어 쿼리 구현 표준.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/09_DESIGN_SYSTEM.md =====

# 09 · 디자인 시스템

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 디자인 시스템(Design System) 아키텍처, 거버넌스, 버전 관리, 기여 모델, 테마 전략을 정의한다. |
| **대상 독자** | UI 디자이너, BX 디자이너, 인터랙션 디자이너, 프런트엔드 엔지니어, 프로덕트 오너 |
| **담당(Owner) 에이전트** | UI Designer (협업: Frontend Engineer, Accessibility Specialist) |
| **참조(상위 문서)** | [UX 원칙](07_UX_PRINCIPLES.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [Figma 가이드](10_FIGMA_GUIDE.md), [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [디자인 토큰](15_DESIGN_TOKEN.md), [접근성](16_ACCESSIBILITY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 디자인 시스템이란

골드위키 디자인 시스템은 **재사용 가능한 표준의 집합 + 이를 운영하는 사람·프로세스·도구**의 총체다. 산출물 일관성을 보장하고, 디자인-개발 간 마찰을 제거하며, 신규 프로젝트의 착수 속도를 높이는 것이 목표다.

### 1.1 단일 출처(Single Source of Truth)
- 시각 토큰의 출처: [디자인 토큰](15_DESIGN_TOKEN.md)
- 컴포넌트 명세의 출처: [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)
- 도구상의 출처: [Figma 가이드](10_FIGMA_GUIDE.md)
- 철학·규칙의 출처: 본 문서와 [UX 원칙](07_UX_PRINCIPLES.md), [UI 가이드라인](08_UI_GUIDELINES.md)

---

## 2. 시스템 원칙

1. **토큰이 진실이다.** 모든 시각 값은 토큰에서 파생한다. 하드코딩 금지.
2. **컴포넌트는 합성한다.** 작은 것에서 큰 것으로 조립한다(원자→분자→유기체).
3. **접근성은 기본값이다.** 모든 컴포넌트는 [WCAG 2.2 AA](16_ACCESSIBILITY.md)를 통과해야 라이브러리에 등재된다.
4. **변경은 추적된다.** 모든 변경은 버전·체인지로그·[의사결정 로그](32_DECISION_LOG.md)에 남는다.
5. **문서 없는 컴포넌트는 존재하지 않는다.** 사용 가이드 없는 자산은 배포하지 않는다.

---

## 3. 아키텍처 — 5계층 모델

골드위키는 아토믹 디자인을 확장한 5계층을 사용한다.

```
파운데이션(Foundation)   ← 원칙, 그리드, 보이스&톤, 접근성 기준
        ↓
토큰(Tokens)            ← color, spacing, radius, typography, shadow, motion
        ↓
컴포넌트(Components)     ← button, input, modal, table … (재사용 단위)
        ↓
패턴(Patterns)          ← 폼 검증, 검색·필터, 빈 상태, 알림 패턴
        ↓
템플릿(Templates)       ← 대시보드, 목록-상세, 결제, 온보딩 레이아웃
```

| 계층 | 정의 | 출처 문서 |
| --- | --- | --- |
| 파운데이션 | 변하지 않는 토대 규칙 | [07](07_UX_PRINCIPLES.md), [08](08_UI_GUIDELINES.md), [16](16_ACCESSIBILITY.md) |
| 토큰 | 명명된 시각 결정 값 | [15 · 디자인 토큰](15_DESIGN_TOKEN.md) |
| 컴포넌트 | 조합 가능한 UI 단위 | [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) |
| 패턴 | 반복되는 문제의 검증된 해법 | 본 문서 §4 |
| 템플릿 | 페이지 단위 조립 | [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) |

---

## 4. 패턴 카탈로그(요약)

| 패턴 | 해결 문제 | 구성 컴포넌트 |
| --- | --- | --- |
| 폼 검증 패턴 | 입력 오류 안내 | input + 헬프텍스트 + 에러 |
| 검색·필터 패턴 | 대량 데이터 탐색 | input + select + table + pagination |
| 빈 상태 패턴 | 데이터 부재 안내 | card + 일러스트 + 버튼 |
| 알림 패턴 | 상태 전달 | toast + 배지 |
| 확인 패턴 | 비가역 행동 방지 | modal + 버튼 그룹 |

각 패턴은 [UX 원칙](07_UX_PRINCIPLES.md)의 어떤 원칙을 충족하는지 명시한다(예: 확인 패턴 = 원칙 4 가역성).

---

## 5. 거버넌스 · 버전 관리

### 5.1 운영 체계
- **시스템 오너:** UI Designer 에이전트가 총괄, 변경 승인권 보유.
- **검토 위원회:** UI Designer + Frontend Engineer + Accessibility Specialist 3인.
- **결정 기록:** 모든 채택·폐기는 [의사결정 로그](32_DECISION_LOG.md)에 기록.

### 5.2 버전 관리(SemVer)

| 변경 유형 | 버전 증가 | 예시 |
| --- | --- | --- |
| 파괴적 변경(Breaking) | MAJOR (1.0.0→2.0.0) | 토큰명 변경, props 제거 |
| 기능 추가(Feature) | MINOR (1.0.0→1.1.0) | 신규 컴포넌트·variant |
| 수정(Patch) | PATCH (1.0.0→1.0.1) | 버그·문서 수정 |

### 5.3 폐기(Deprecation) 정책
- 폐기 예정 자산은 1개 MINOR 버전 동안 경고와 함께 유지한다.
- 대체 경로를 체인지로그에 명시한다.

---

## 6. 기여 모델(Contribution Model)

```
제안(Propose) → 검토(Review) → 시범(Prototype) → 채택(Adopt) → 배포(Publish)
```

| 단계 | 활동 | 산출물 |
| --- | --- | --- |
| 제안 | 신규/변경 요청 작성 | 제안서(문제·근거) |
| 검토 | 위원회 평가 | 검토 의견 |
| 시범 | Figma+코드 프로토타입 | 시범 컴포넌트 |
| 채택 | 토큰·문서·접근성 검증 | 명세서 |
| 배포 | 라이브러리 퍼블리시 | 버전 릴리스 |

**등재 기준(Definition of Done)**
- [ ] 토큰만 사용(하드코딩 0)
- [ ] 모든 상태(default/hover/focus/active/disabled/loading/empty/error) 정의
- [ ] [접근성](16_ACCESSIBILITY.md) 통과(키보드·스크린리더·대비)
- [ ] [Figma](10_FIGMA_GUIDE.md) 라이브러리 등재 + 코드 Code Connect 매핑
- [ ] 사용 가이드 문서화([14](14_COMPONENT_LIBRARY.md))

---

## 7. 테마(Theming)

골드위키는 토큰 별칭(alias) 계층으로 다중 테마를 지원한다.

```
글로벌 토큰  → --blue-600: #2563eb
별칭 토큰    → --color-primary: var(--blue-600)
테마 재정의  → [data-theme="dark"] { --color-primary: var(--blue-400); }
```

| 테마 | 용도 | 비고 |
| --- | --- | --- |
| Light(기본) | 일반 환경 | 기준 대비 검증 |
| Dark | 야간·저조도 | 별도 대비 재검증 |
| 클라이언트 브랜드 | 화이트라벨 | 별칭만 교체, 컴포넌트 불변 |

상세 구현은 [디자인 토큰](15_DESIGN_TOKEN.md) §테마/다크모드 참조.

---

## 8. 연관 문서와의 관계도

```
                ┌────────── 09 디자인 시스템 (본 문서: 아키텍처·거버넌스) ──────────┐
                │                                                                  │
        10 Figma 가이드        14 컴포넌트 라이브러리      15 디자인 토큰      16 접근성
        (도구·핸드오프)         (명세·사용 가이드)          (시각 값 출처)     (등재 통과 기준)
```

| 문서 | 본 시스템에서의 역할 |
| --- | --- |
| [10 · Figma 가이드](10_FIGMA_GUIDE.md) | 시스템을 도구 안에서 구현·퍼블리시·핸드오프 |
| [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) | 컴포넌트 계층의 명세·카탈로그 |
| [15 · 디자인 토큰](15_DESIGN_TOKEN.md) | 토큰 계층의 정의·빌드 파이프라인 |
| [16 · 접근성](16_ACCESSIBILITY.md) | 등재 게이트의 합격 기준 |

---

## 9. 성숙도 로드맵

| 분기 | 목표 | 산출물 |
| --- | --- | --- |
| 1단계 | 토큰·핵심 12컴포넌트 확립 | 토큰셋, [14](14_COMPONENT_LIBRARY.md) |
| 2단계 | 패턴·템플릿 라이브러리 | [38](38_TEMPLATE_LIBRARY.md) |
| 3단계 | Code Connect 전면 매핑 | [10](10_FIGMA_GUIDE.md) |
| 4단계 | 다크·브랜드 테마 + 자동 회귀 테스트 | 테마셋, [30](30_TEST_STRATEGY.md) |

---

## 관련 골드위키 문서

- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 파운데이션 계층의 철학.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 파운데이션 계층의 시각 규칙.
- [10 · Figma 가이드](10_FIGMA_GUIDE.md) — 시스템의 도구 구현·핸드오프.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 컴포넌트 계층 명세.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — 토큰 계층 정의·파이프라인.
- [16 · 접근성](16_ACCESSIBILITY.md) — 등재 합격 기준.
- [38 · 템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) — 템플릿 계층.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/10_FIGMA_GUIDE.md =====

# 10 · Figma 작업 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 Figma 작업 표준(파일 구조, 네이밍, variables & styles, 컴포넌트, 오토레이아웃, 퍼블리싱, 핸드오프, 디자인-투-코드)을 정의한다. |
| **대상 독자** | UI 디자이너, BX 디자이너, 인터랙션 디자이너, 프런트엔드 엔지니어, 퍼블리싱 엔지니어 |
| **담당(Owner) 에이전트** | UI Designer (협업: Interaction Designer, Frontend Engineer) |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [디자인 토큰](15_DESIGN_TOKEN.md), [프런트엔드 가이드](20_FRONTEND_GUIDE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 적용 범위

본 표준은 골드위키의 모든 Figma 파일에 적용된다. 목표는 (1) 파일 간 일관성, (2) 디자인-개발 핸드오프 마찰 제거, (3) Figma 변수와 [디자인 토큰](15_DESIGN_TOKEN.md)의 1:1 동기화다.

---

## 2. 파일 · 페이지 구조

### 2.1 파일 분리 전략
| 파일 | 용도 |
| --- | --- |
| `[DS] Goldwiki Foundations` | 변수·스타일·토큰 정의 |
| `[DS] Goldwiki Components` | 컴포넌트 라이브러리(퍼블리시) |
| `[PRJ] <클라이언트>-<프로젝트>` | 프로젝트 작업 파일 |
| `[ARCHIVE] <...>` | 종료 파일 보관 |

### 2.2 표준 페이지 순서(프로젝트 파일)
```
00 · 표지 & 안내(Cover & Readme)
01 · 리서치 & 레퍼런스
02 · 정보구조 & 플로우
03 · 와이어프레임
04 · UI 디자인 (Ready for Dev)
05 · 프로토타입
06 · 폐기/보류(Archive)
```

---

## 3. 네이밍 규칙

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 페이지 | `NN · 이름` | `04 · UI 디자인` |
| 프레임(화면) | `화면ID_화면명` | `LOGIN_로그인` |
| 컴포넌트 | `카테고리/이름` | `Button/Primary` |
| variant 속성 | `속성=값` | `state=hover` |
| 레이어 | 의미 기반 명명 | `card-title` (`Group 12` 금지) |
| 변수 | 토큰명과 동일 | `color/primary` |

> 레이어명은 핸드오프 시 코드 식별자의 단서가 되므로 의미 기반으로 명명한다.

---

## 4. Variables & Styles

### 4.1 변수 컬렉션 구조
| 컬렉션 | 모드 | 내용 |
| --- | --- | --- |
| `Primitives` | 단일 | 원시 값(blue-600 등) |
| `Semantic` | Light / Dark | 별칭(color/primary 등) |
| `Spacing` | 단일 | space-1 ~ space-12 |
| `Radius` | 단일 | radius-sm ~ radius-full |

- 색상은 변수로 관리하고, 텍스트는 텍스트 스타일로 관리한다.
- Semantic 컬렉션의 모드 전환으로 다크모드를 구현한다. ([디자인 토큰](15_DESIGN_TOKEN.md) §테마)

### 4.2 토큰 동기화 규칙
Figma 변수명은 [디자인 토큰](15_DESIGN_TOKEN.md)의 토큰명과 **계층·표기까지 동일**해야 한다(예: `color/primary` ↔ `--color-primary`). 변수 export → Style Dictionary 파이프라인으로 코드 토큰을 생성한다.

---

## 5. 컴포넌트 · Variants

### 5.1 설계 규칙
- 모든 인터랙티브 컴포넌트는 `state` 속성으로 [8개 상태](08_UI_GUIDELINES.md)를 variant로 보유한다.
- Boolean 속성(예: `hasIcon`)과 Instance swap(아이콘 교체)을 활용한다.
- 컴포넌트 설명란에 사용 가이드·접근성 노트를 기재한다.

### 5.2 Button 컴포넌트 변수 예시
| 속성 | 값 |
| --- | --- |
| `variant` | primary / secondary / ghost / danger |
| `size` | sm / md / lg |
| `state` | default / hover / focus / active / disabled / loading |
| `hasIcon` | true / false |

---

## 6. 오토레이아웃(Auto Layout) 규칙

- 모든 컴포넌트·카드·리스트는 오토레이아웃을 사용한다(고정 좌표 배치 금지).
- 간격(gap)·패딩은 [간격 스케일](08_UI_GUIDELINES.md) 토큰 값만 사용한다.
- 리사이징은 의도에 따라 `Hug` / `Fill` / `Fixed`를 명시한다.
- 반응형 동작은 `min/max width` 제약과 함께 정의한다.

| 사용 사례 | 권장 설정 |
| --- | --- |
| 버튼 | 가로 Hug, 패딩 토큰 |
| 카드 | 세로 스택, gap = space-4 |
| 목록 | 세로 Fill, 아이템 Hug |
| 툴바 | 가로 Fill, 양끝 정렬 |

---

## 7. 라이브러리 · 퍼블리싱

```
변경 → 검토(09 거버넌스) → 퍼블리시 → 체인지로그 → 프로젝트 파일 업데이트
```

- 컴포넌트 라이브러리는 `[DS] Goldwiki Components` 파일에서만 퍼블리시한다.
- 퍼블리시 시 변경 설명을 반드시 작성하고 SemVer로 버전을 기록한다. ([09 §5.2](09_DESIGN_SYSTEM.md))
- 프로젝트 파일은 라이브러리 업데이트를 검토 후 수동 수락한다.

---

## 8. 개발 핸드오프

### 8.1 "Ready for Dev" 체크리스트
- [ ] 프레임이 `04 · UI 디자인` 페이지에 정리됨
- [ ] 모든 값이 변수/스타일로 연결됨(분리된 값 0)
- [ ] 상태·반응형·엣지 케이스 프레임 포함
- [ ] 레이어명이 의미 기반으로 정리됨
- [ ] Dev Mode에서 "Ready for dev" 표시
- [ ] 주석으로 인터랙션·검증 규칙 명시

### 8.2 핸드오프 노트 포함 항목
- 인터랙션·애니메이션 사양([모션 토큰](15_DESIGN_TOKEN.md))
- 접근성 노트([16](16_ACCESSIBILITY.md): 포커스 순서, aria-label)
- 반응형 동작 설명

---

## 9. 디자인-투-코드 (Figma MCP)

골드위키는 Figma MCP를 통해 디자인을 코드로 변환한다.

| 단계 | 활동 | 도구 |
| --- | --- | --- |
| 1 | 프레임 선택·컨텍스트 추출 | `get_design_context` |
| 2 | 토큰 매핑 확인 | 변수 ↔ [15](15_DESIGN_TOKEN.md) |
| 3 | 컴포넌트 코드 생성 | Code Connect 매핑 |
| 4 | [프런트엔드 가이드](20_FRONTEND_GUIDE.md) 규약으로 정리 | 리뷰 |

### 9.1 Code Connect 매핑 원칙
Figma 컴포넌트와 코드 컴포넌트를 1:1로 매핑하여, 디자인에서 추출한 코드가 실제 라이브러리 컴포넌트를 참조하도록 한다.

```jsx
// 예시: Button Code Connect 매핑
import figma from "@figma/code-connect";
import { Button } from "./Button";

figma.connect(Button, "https://figma.com/.../Button", {
  props: {
    variant: figma.enum("variant", {
      primary: "primary",
      secondary: "secondary",
      danger: "danger",
    }),
    size: figma.enum("size", { sm: "sm", md: "md", lg: "lg" }),
    label: figma.string("label"),
  },
  example: ({ variant, size, label }) => (
    <Button variant={variant} size={size}>{label}</Button>
  ),
});
```

---

## 10. 검수 체크리스트

- [ ] 파일·페이지 구조 표준 준수
- [ ] 네이밍 규칙 준수(레이어명 의미 기반)
- [ ] 모든 값이 변수/스타일 연결
- [ ] 오토레이아웃 적용
- [ ] 상태 variant 완비
- [ ] Code Connect 매핑 완료

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — Figma는 시스템의 도구 구현체.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 그리드·간격·상태의 시각 기준.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — Figma 컴포넌트의 코드 짝.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — Figma 변수와 동기화되는 토큰.
- [20 · 프런트엔드 가이드](20_FRONTEND_GUIDE.md) — 디자인-투-코드 산출물의 정리 규약.
- [16 · 접근성](16_ACCESSIBILITY.md) — 핸드오프 접근성 노트 기준.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/11_INFORMATION_ARCHITECTURE.md =====

# 11 · 정보구조(IA)

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 정보구조(IA) 방법론(콘텐츠 인벤토리, 분류체계, 카드소팅, 트리테스트, 사이트맵, 내비게이션, 레이블링)을 표준화한다. |
| **대상 독자** | UX 리서처, 서비스 기획자, 프로덕트 오너, UI 디자이너 |
| **담당(Owner) 에이전트** | Service Planner (협업: UX Researcher, Product Owner) |
| **참조(상위 문서)** | [UX 원칙](07_UX_PRINCIPLES.md), [비즈니스 분석](06_BUSINESS_ANALYSIS.md) |
| **연계(하위 문서)** | [유저 플로우](12_USER_FLOW.md), [유저 여정](13_USER_JOURNEY.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. IA의 목적

정보구조(IA)는 사용자가 정보를 **찾을 수 있고(findable)**, **이해할 수 있게(understandable)** 조직하는 작업이다. [UX 원칙](07_UX_PRINCIPLES.md)의 "인지 부하 최소화(원칙 9)"와 "멘탈 모델 정렬"을 구조로 구현한다.

---

## 2. IA 프로세스 개요

```
인벤토리 → 분류체계 설계 → 카드소팅(검증) → 사이트맵 → 트리테스트(검증) → 내비게이션·레이블링
```

| 단계 | 활동 | 산출물 |
| --- | --- | --- |
| 콘텐츠 인벤토리 | 기존 콘텐츠 전수 조사 | 인벤토리 시트 |
| 분류체계 | 그룹·계층 설계 | 택소노미 |
| 카드소팅 | 사용자 멘탈 모델 검증 | 그룹핑 결과 |
| 사이트맵 | 구조 시각화 | 사이트맵 |
| 트리테스트 | 탐색 성공률 검증 | 테스트 리포트 |
| 내비게이션 | 메뉴·레이블 확정 | 내비 모델 |

---

## 3. 콘텐츠 인벤토리

### 3.1 인벤토리 시트 컬럼
| 컬럼 | 설명 |
| --- | --- |
| ID | 페이지/콘텐츠 고유번호 |
| 제목 | 콘텐츠명 |
| URL | 경로 |
| 유형 | 페이지/문서/미디어 |
| 소유자 | 책임 부서 |
| 최종 수정 | 갱신일 |
| 조치(ROT) | 유지/수정/삭제(Keep/Revise/Delete) |

### 3.2 ROT 분석
- **Redundant(중복):** 동일 정보 반복 → 통합.
- **Outdated(낡음):** 갱신 필요 → 수정 또는 삭제.
- **Trivial(사소):** 가치 낮음 → 삭제.

---

## 4. 분류체계(Taxonomy)

### 4.1 조직 체계 5종(LATCH)
| 체계 | 기준 | 적합 사례 |
| --- | --- | --- |
| Location | 위치 | 매장 찾기 |
| Alphabet | 가나다/ABC | 사전, 색인 |
| Time | 시간 | 이력, 일정 |
| Category | 주제 | 제품 카테고리 |
| Hierarchy | 위계 | 가격순, 인기순 |

### 4.2 설계 원칙
- 한 계층의 형제 항목 수는 5–7개를 권장한다(원칙 9 준수).
- 깊이는 3단계 이내를 목표로 한다(클릭 깊이 ≤ 3).
- 상호 배타적(Mutually Exclusive)·전체 포괄적(Collectively Exhaustive) 분류를 지향한다.

---

## 5. 카드소팅(Card Sorting)

| 유형 | 방식 | 용도 |
| --- | --- | --- |
| 오픈(Open) | 사용자가 그룹·이름 자유 생성 | 신규 구조 발견 |
| 클로즈드(Closed) | 정해진 그룹에 분류 | 기존 구조 검증 |
| 하이브리드 | 그룹 추가 허용 | 절충 |

- 표본: 15–30명. 30명 이상이면 유사도 행렬이 안정화된다.
- 분석: 항목 간 동시 분류 빈도로 덴드로그램(유사도 군집)을 도출한다.

---

## 6. 트리테스트(Tree Testing)

레이블·계층만으로 사용자가 목표를 찾는지 검증한다(시각 디자인 배제).

| 지표 | 정의 | 목표 |
| --- | --- | --- |
| 성공률(Success) | 정답 위치 도달 비율 | ≥ 80% |
| 직진율(Directness) | 후퇴 없이 도달 비율 | ≥ 60% |
| 소요 시간 | 과업 완료 시간 | 짧을수록 양호 |

성공률이 낮은 과업의 경로는 레이블 또는 계층을 재설계한다.

---

## 7. 사이트맵 표기법

```
[●] 페이지(Page)        [▣] 동적/생성 페이지
[◇] 결정/분기           [→] 이동 흐름
1.0 / 1.1 / 1.1.1       계층 번호 표기
```

### 7.1 채워진 사이트맵 예시 — 이커머스

```
0.0 홈
├── 1.0 상품
│   ├── 1.1 카테고리 목록
│   │   └── 1.1.1 상품 상세 [▣]
│   └── 1.2 검색 결과 [▣]
├── 2.0 장바구니
│   └── 2.1 결제 [◇ 로그인 분기]
│       ├── 2.1.1 주문 완료
│       └── 2.1.2 결제 실패
├── 3.0 마이페이지
│   ├── 3.1 주문 내역
│   ├── 3.2 배송 조회 [▣]
│   ├── 3.3 회원 정보
│   └── 3.4 위시리스트
└── 4.0 고객지원
    ├── 4.1 자주 묻는 질문
    └── 4.2 1:1 문의
```

상세 분기는 [유저 플로우](12_USER_FLOW.md)로 전개한다.

---

## 8. 내비게이션 모델

| 모델 | 설명 | 적합 사례 |
| --- | --- | --- |
| 전역(Global) | 모든 화면 공통 메뉴 | 주요 섹션 진입 |
| 지역(Local) | 섹션 내 하위 메뉴 | 카테고리 내 탐색 |
| 맥락(Contextual) | 본문 내 관련 링크 | 연관 콘텐츠 |
| 보조(Utility) | 검색·로그인·장바구니 | 부가 기능 |
| 빵부스러기(Breadcrumb) | 위치 표시 | 깊은 계층 |
| 패싯(Faceted) | 다중 필터 | 대량 상품 탐색 |

---

## 9. 레이블링(Labeling) 규칙

- **사용자 언어 사용:** 내부 용어 대신 사용자가 쓰는 말로 작성한다(원칙 1).
- **일관성:** 동일 대상은 전역에서 동일 레이블을 쓴다.
- **구체성:** "더 보기"보다 "상품 더 보기"처럼 맥락을 담는다.
- **검증:** 트리테스트로 모호한 레이블을 식별한다.

| 나쁜 레이블 | 좋은 레이블 |
| --- | --- |
| 정보 | 회사 소개 |
| 기타 | 환불·교환 안내 |
| 솔루션 | 요금제 비교 |

---

## 10. 패싯 내비게이션(Faceted Navigation)

대량 데이터 탐색을 위한 다차원 필터 구조.

```
상품 목록
├── 패싯: 카테고리 (의류 / 신발 / 가방)
├── 패싯: 가격대 (~3만 / 3~7만 / 7만~)
├── 패싯: 색상 (다중 선택)
└── 패싯: 평점 (4점 이상)
정렬: 인기순 / 최신순 / 가격순
```

- 각 패싯은 독립적이며 조합 가능해야 한다.
- 적용된 필터는 칩(chip)으로 표시하고 개별 제거를 허용한다.
- 결과 0건 시 [빈 상태 패턴](09_DESIGN_SYSTEM.md)을 적용한다.

---

## 11. 검수 체크리스트

- [ ] 콘텐츠 인벤토리 ROT 분석 완료
- [ ] 깊이 ≤ 3, 형제 항목 ≤ 7
- [ ] 카드소팅으로 분류 검증
- [ ] 트리테스트 성공률 ≥ 80%
- [ ] 레이블이 사용자 언어인가
- [ ] 사이트맵이 [유저 플로우](12_USER_FLOW.md)와 정합한가

---

## 관련 골드위키 문서

- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 인지 부하·멘탈 모델의 상위 근거.
- [12 · 유저 플로우](12_USER_FLOW.md) — 사이트맵의 분기를 흐름으로 전개.
- [13 · 유저 여정](13_USER_JOURNEY.md) — 여정의 터치포인트를 구조에 매핑.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 내비게이션의 시각 규칙.
- [06 · 비즈니스 분석](06_BUSINESS_ANALYSIS.md) — 콘텐츠·기능 요구의 출처.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/12_USER_FLOW.md =====

# 12 · 유저 플로우

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 유저 플로우 표준(표기법, 플로우 유형, 엣지·에러 경로, 화면 매핑, 예시 플로우)을 정의한다. |
| **대상 독자** | 서비스 기획자, 인터랙션 디자이너, UX 리서처, UI 디자이너, 프런트엔드 엔지니어 |
| **담당(Owner) 에이전트** | Interaction Designer (협업: Service Planner, UX Researcher) |
| **참조(상위 문서)** | [정보구조](11_INFORMATION_ARCHITECTURE.md), [UX 원칙](07_UX_PRINCIPLES.md) |
| **연계(하위 문서)** | [유저 여정](13_USER_JOURNEY.md), [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 유저 플로우의 목적

유저 플로우는 사용자가 과업을 완수하기까지의 **단계·결정·시스템 반응**을 시각화한다. [UX 원칙](07_UX_PRINCIPLES.md)의 실행/평가 간극을 단계로 분해하여, 화면 목록과 구현 범위를 도출하는 근거가 된다.

---

## 2. 표기법 · 범례

골드위키는 mermaid `flowchart`를 표준 표기로 사용한다.

| 도형 | 의미 | mermaid 표기 |
| --- | --- | --- |
| 둥근 사각형 | 시작/종료 | `([시작])` |
| 사각형 | 화면/단계 | `[화면]` |
| 마름모 | 결정/분기 | `{조건?}` |
| 평행사변형 | 입력/출력 | `[/입력/]` |
| 빨간 노드 | 에러/실패 경로 | `:::error` |
| 화살표 | 흐름 방향 | `-->` |

```mermaid
flowchart LR
  A([시작]) --> B[화면] --> C{조건?}
  C -->|예| D[다음 화면]
  C -->|아니오| E[대안 경로]:::error
  classDef error fill:#fde,stroke:#c33;
```

---

## 3. 플로우 유형

| 유형 | 정의 | 사용 시점 |
| --- | --- | --- |
| 과업 플로우(Task Flow) | 단일 경로의 직선 흐름 | 단순 과업(로그인 등) |
| 결정 플로우(Wireflow/Decision) | 분기·조건 포함 | 다중 경로(결제 등) |
| 시스템 플로우(System Flow) | 시스템 처리·상태 전이 | 백엔드 연동·비동기 작업 |

---

## 4. 엣지 케이스 · 에러 경로 표준

모든 플로우는 정상 경로(happy path)와 함께 다음을 반드시 포함한다.

| 범주 | 예시 | 처리 원칙 |
| --- | --- | --- |
| 입력 오류 | 형식 오류, 필수 누락 | 인라인 검증, 명확한 에러 메시지([08](08_UI_GUIDELINES.md)) |
| 인증 실패 | 비밀번호 오류 | 재시도·복구 경로(원칙 4) |
| 네트워크 오류 | 타임아웃 | 재시도 버튼, 상태 보존 |
| 빈 결과 | 검색 0건 | 빈 상태 패턴 |
| 권한 부족 | 미인증 접근 | 로그인 유도 후 복귀 |
| 시스템 오류 | 서버 5xx | 안내+고객지원 링크 |

---

## 5. 플로우 → 화면 목록 매핑

플로우의 각 화면 노드는 화면 목록(Screen Inventory)으로 전환되어 디자인·개발 범위가 된다.

| 플로우 노드 | 화면 ID | 화면명 | 주요 컴포넌트 | 상태 |
| --- | --- | --- | --- | --- |
| 시작 | ONB-01 | 환영 | card, button | empty |
| 입력 | ONB-02 | 정보 입력 | form, input, select | error |
| 확인 | ONB-03 | 검토 | table, button | loading |
| 종료 | ONB-04 | 완료 | card, toast | success |

컴포넌트 사양은 [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)를 참조한다.

---

## 6. 예시 플로우 1 — 온보딩(Onboarding)

```mermaid
flowchart TD
  A([앱 첫 실행]) --> B[환영 화면]
  B --> C{계정 보유?}
  C -->|예| D[로그인]
  C -->|아니오| E[회원가입]
  E --> F[/이메일·비밀번호 입력/]
  F --> G{입력 유효?}
  G -->|아니오| H[인라인 에러 표시]:::error
  H --> F
  G -->|예| I[이메일 인증 발송]
  I --> J{인증 완료?}
  J -->|만료/실패| K[재발송 안내]:::error
  K --> I
  J -->|예| L[프로필 설정]
  L --> M[관심사 선택]
  M --> N[홈 진입]
  D --> O{인증 성공?}
  O -->|아니오| P[비밀번호 재설정 유도]:::error
  O -->|예| N
  N --> Q([완료])
  classDef error fill:#fde,stroke:#c33;
```

**핵심 설계 결정**
- 가치 경험 전 가입 강제를 피하기 위해 "둘러보기" 경로를 환영 화면에 둔다(안티패턴 회피, [07](07_UX_PRINCIPLES.md)).
- 이메일 인증 만료 시 즉시 재발송 경로를 제공한다(원칙 4 가역성).

---

## 7. 예시 플로우 2 — 결제(Checkout)

```mermaid
flowchart TD
  A([장바구니]) --> B{로그인 상태?}
  B -->|아니오| C[로그인/게스트 선택]
  C --> D[배송지 입력]
  B -->|예| D
  D --> E[/배송지 검증/]
  E --> F{유효?}
  F -->|아니오| G[주소 오류 안내]:::error
  G --> D
  F -->|예| H[결제 수단 선택]
  H --> I[주문 요약·총액 표시]
  I --> J{결제 승인?}
  J -->|실패| K[결제 실패 안내·재시도]:::error
  K --> H
  J -->|성공| L[주문 완료]
  L --> M[영수증·배송 안내]
  M --> N([완료])
  classDef error fill:#fde,stroke:#c33;
```

**핵심 설계 결정**
- 총액(배송비·세금 포함)을 결제 직전이 아닌 요약 단계에서 명시한다(원칙 10 투명성).
- 결제 실패 시 입력값을 보존하여 재시도 마찰을 줄인다.

---

## 8. 플로우 품질 기준

- [ ] 정상 경로 + 모든 에러 경로 포함
- [ ] 분기마다 조건이 명시되었는가
- [ ] 각 화면 노드가 화면 목록으로 매핑되었는가
- [ ] 종료 노드(성공/실패)가 명확한가
- [ ] [정보구조](11_INFORMATION_ARCHITECTURE.md) 사이트맵과 정합한가
- [ ] 되돌리기·재시도 경로가 있는가(원칙 4)

---

## 관련 골드위키 문서

- [11 · 정보구조](11_INFORMATION_ARCHITECTURE.md) — 사이트맵 분기를 흐름으로 전개.
- [13 · 유저 여정](13_USER_JOURNEY.md) — 플로우를 감정·터치포인트 맥락으로 확장.
- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 가역성·투명성 등 설계 근거.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 화면 노드의 구성 컴포넌트.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 에러·빈 상태의 시각 규칙.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/13_USER_JOURNEY.md =====

# 13 · 유저 여정 지도

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 유저 여정 지도(Journey Map) 방법론(페르소나, 단계, 행동·생각·감정, 터치포인트, 페인포인트·기회, 서비스 블루프린트 연계)을 표준화한다. |
| **대상 독자** | UX 리서처, 서비스 기획자, BX 디자이너, 프로덕트 오너 |
| **담당(Owner) 에이전트** | UX Researcher (협업: Service Planner, BX Designer) |
| **참조(상위 문서)** | [UX 원칙](07_UX_PRINCIPLES.md), [정보구조](11_INFORMATION_ARCHITECTURE.md) |
| **연계(하위 문서)** | [유저 플로우](12_USER_FLOW.md), [UI 가이드라인](08_UI_GUIDELINES.md), [클라이언트 지식](34_CLIENT_KNOWLEDGE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 여정 지도의 목적

유저 여정 지도는 사용자가 목표를 달성하는 **전 과정의 경험**을 시간 축으로 시각화한다. [유저 플로우](12_USER_FLOW.md)가 "무엇을 클릭하는가"라면, 여정 지도는 "그때 무엇을 느끼고 어디서 좌절하는가"를 다룬다. 페인포인트와 개선 기회를 발굴하는 것이 핵심 목적이다.

---

## 2. 페르소나(Persona)

여정 지도는 항상 특정 페르소나를 기준으로 작성한다.

### 2.1 페르소나 템플릿
| 항목 | 내용 |
| --- | --- |
| 이름·한 줄 정의 | "김지현, 32세 / 바쁜 직장인 첫 온라인 구매자" |
| 목표(Goals) | 빠르고 안전하게 적합한 상품 구매 |
| 동기(Motivations) | 시간 절약, 신뢰 가능한 후기 |
| 좌절(Frustrations) | 복잡한 가입, 숨은 비용 |
| 기술 친숙도 | 중 (모바일 중심) |
| 핵심 인용 | "결제까지 3분 안에 끝났으면 좋겠어요." |

### 2.2 작성 원칙
- 인구통계보다 **행동·목표 기반**으로 정의한다.
- 리서치 데이터([클라이언트 지식](34_CLIENT_KNOWLEDGE.md))에 근거한다(허구 금지, 원칙 8).
- 프로젝트당 핵심 페르소나 2–3개로 제한한다.

---

## 3. 여정 지도 구성 요소

| 레인(Lane) | 내용 |
| --- | --- |
| 단계(Stage) | 인지 → 탐색 → 결정 → 행동 → 유지 |
| 행동(Doing) | 사용자가 실제로 하는 행동 |
| 생각(Thinking) | 의문·기대·판단 |
| 감정(Feeling) | 감정 곡선(긍정↔부정) |
| 터치포인트(Touchpoint) | 접점 채널(앱·웹·이메일·콜센터) |
| 페인포인트(Pain) | 좌절·마찰 지점 |
| 기회(Opportunity) | 개선 아이디어 |

---

## 4. 채워진 여정맵 예시 — 첫 온라인 구매(페르소나: 김지현)

| 단계 | 인지 | 탐색 | 결정 | 행동(결제) | 유지 |
| --- | --- | --- | --- | --- | --- |
| **행동** | 광고 보고 앱 설치 | 카테고리·후기 탐색 | 상품·가격 비교 | 장바구니→결제 | 배송 조회, 재구매 |
| **생각** | "괜찮아 보이네" | "후기가 믿을 만한가?" | "이 가격이 최선인가?" | "안전하게 결제되나?" | "언제 오지?" |
| **감정** | 😐 중립 | 🙂 흥미 | 😟 불안(가격 비교) | 😣 긴장(결제) | 😀 만족(배송 알림) |
| **터치포인트** | 광고, 앱스토어 | 앱 검색·필터 | 상품 상세 | 결제 화면 | 푸시·배송 페이지 |
| **페인포인트** | — | 후기 신뢰도 부족 | 숨은 배송비 | 가입 강제 | 배송 상태 불투명 |
| **기회** | — | 검증 후기 배지 | 총액 사전 표시 | 게스트 결제 | 실시간 배송 추적 |

### 4.1 감정 곡선 요약
탐색→결정 구간에서 감정이 하강(불안)했다가 배송 알림에서 회복한다. **저점(결제 단계)** 이 가장 우선적인 개선 대상이다.

---

## 5. 페인포인트 → 기회 → 개선 매핑

| 페인포인트 | 근본 원인 | 개선 기회 | 연계 조치 |
| --- | --- | --- | --- |
| 후기 신뢰도 부족 | 가짜 후기 우려 | 구매 인증 배지 | [11 IA](11_INFORMATION_ARCHITECTURE.md) 레이블 |
| 숨은 배송비 | 비용 늦은 공개 | 총액 사전 표시 | [07 원칙 10](07_UX_PRINCIPLES.md) |
| 가입 강제 | 전환 장벽 | 게스트 결제 | [12 결제 플로우](12_USER_FLOW.md) |
| 배송 불투명 | 상태 미제공 | 실시간 추적 | 시스템 플로우 |

---

## 6. 서비스 블루프린트(Service Blueprint) 연계

여정 지도가 "프런트스테이지(사용자 경험)"라면, 블루프린트는 그 아래 "백스테이지(내부 프로세스)"까지 확장한다.

| 레이어 | 결제 단계 예시 |
| --- | --- |
| 물리적 증거 | 결제 화면, 영수증 이메일 |
| 사용자 행동 | 결제 정보 입력·승인 |
| **상호작용선** | ──────────── |
| 프런트스테이지 | 결제 UI 응답, 검증 메시지 |
| **가시선** | ──────────── |
| 백스테이지 | PG사 연동, 재고 차감 |
| 지원 프로세스 | 결제 게이트웨이, 주문 DB |

블루프린트의 백스테이지는 [API 표준](22_API_STANDARD.md)·[데이터베이스 가이드](23_DATABASE_GUIDE.md)와 연결된다.

---

## 7. 여정맵 작성 절차

```
페르소나 확정 → 단계 정의 → 리서치 데이터 매핑 → 감정 곡선 → 페인포인트 → 기회 도출 → 우선순위
```

| 단계 | 산출물 | 검증 |
| --- | --- | --- |
| 페르소나 | 페르소나 카드 | 리서치 근거 |
| 데이터 매핑 | 행동·생각·감정 | 인터뷰 인용 |
| 기회 도출 | 개선 백로그 | 우선순위(영향×노력) |

---

## 8. 측정 연계

여정 개선 효과는 [UX 측정 체계](07_UX_PRINCIPLES.md)로 검증한다.

| 단계 | 측정 지표 |
| --- | --- |
| 탐색 | 검색 성공률, 이탈률 |
| 결정 | 상세→장바구니 전환율 |
| 결제 | 결제 완료율, 소요 시간 |
| 유지 | 재구매율, NPS |

---

## 9. 검수 체크리스트

- [ ] 페르소나가 리서치에 근거하는가
- [ ] 5개 단계와 7개 레인이 모두 채워졌는가
- [ ] 감정 저점이 식별되었는가
- [ ] 페인포인트마다 기회·연계 조치가 있는가
- [ ] 블루프린트 백스테이지가 연결되었는가
- [ ] 개선 효과 측정 지표가 정의되었는가

---

## 관련 골드위키 문서

- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 리서치 기반·측정 체계의 근거.
- [12 · 유저 플로우](12_USER_FLOW.md) — 여정의 행동을 화면 흐름으로 구체화.
- [11 · 정보구조](11_INFORMATION_ARCHITECTURE.md) — 터치포인트의 구조적 구현.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 터치포인트 화면의 시각 규칙.
- [34 · 클라이언트 지식](34_CLIENT_KNOWLEDGE.md) — 페르소나·리서치 데이터 출처.
- [22 · API 표준](22_API_STANDARD.md) — 블루프린트 백스테이지 연동.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/14_COMPONENT_LIBRARY.md =====

# 14 · 컴포넌트 라이브러리

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 핵심 UI 컴포넌트 카탈로그(해부구조, props/variants/states, 사용 가이드, 접근성 노트, 예시 마크업)를 정의한다. |
| **대상 독자** | UI 디자이너, 프런트엔드 엔지니어, 퍼블리싱 엔지니어, 접근성 전문가 |
| **담당(Owner) 에이전트** | UI Designer (협업: Frontend Engineer, Accessibility Specialist) |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [디자인 토큰](15_DESIGN_TOKEN.md), [접근성](16_ACCESSIBILITY.md), [Figma 가이드](10_FIGMA_GUIDE.md), [HTML 가이드](17_HTML_GUIDE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 카탈로그 사용 규칙

- 모든 컴포넌트는 [디자인 토큰](15_DESIGN_TOKEN.md)만 사용하며 하드코딩을 금지한다.
- 모든 컴포넌트는 [8개 상태](08_UI_GUIDELINES.md)와 [접근성](16_ACCESSIBILITY.md) 기준을 충족해야 등재된다.
- 각 항목은 **해부구조 / props·variants / states / 사용 가이드 / 접근성 노트 / 예시 마크업** 순서로 기술한다.

### 컴포넌트 명세 공통 표기
| 키 | 의미 |
| --- | --- |
| Anatomy | 구성 요소 분해 |
| Props | 설정 가능한 속성 |
| Variants | 시각 변형 |
| States | 상태 |
| A11y | 접근성 노트 |

---

## 2. Button(버튼)

- **Anatomy:** 컨테이너 + (선택)아이콘 + 레이블
- **Props:** `variant`, `size`, `disabled`, `loading`, `iconLeft`, `iconRight`
- **Variants:** primary / secondary / ghost / danger
- **States:** default, hover, focus, active, disabled, loading
- **사용 가이드:** 화면당 primary 1개. 파괴적 행동은 danger + 확인 모달.
- **A11y:** 아이콘 전용은 `aria-label` 필수. `loading` 시 `aria-busy="true"`.

```html
<button class="btn btn--primary" type="button">저장</button>
<button class="btn btn--danger" type="button">삭제</button>
<button class="btn btn--primary" aria-busy="true" disabled>
  <span class="spinner" aria-hidden="true"></span> 저장 중…
</button>
```

---

## 3. Input(입력 필드)

- **Anatomy:** 레이블 + 입력 + 헬프텍스트/에러 + (선택)아이콘
- **Props:** `type`, `label`, `placeholder`, `value`, `error`, `required`, `disabled`
- **States:** default, focus, filled, error, disabled
- **사용 가이드:** placeholder를 레이블 대체로 쓰지 않는다. 에러는 인라인+원인 설명.
- **A11y:** `label[for]` 연결. 에러는 `aria-describedby`로 연결, `aria-invalid="true"`.

```html
<div class="field">
  <label for="email">이메일</label>
  <input id="email" type="email" required
         aria-invalid="true" aria-describedby="email-err" />
  <p id="email-err" class="field__error">이메일 형식이 올바르지 않습니다.</p>
</div>
```

---

## 4. Select(선택)

- **Anatomy:** 레이블 + 트리거 + 옵션 목록
- **Props:** `options`, `value`, `multiple`, `searchable`, `disabled`
- **States:** default, focus, open, selected, disabled
- **사용 가이드:** 옵션 5개 이하면 라디오 고려. 7개 이상이면 검색 제공.
- **A11y:** 네이티브 `<select>` 우선. 커스텀은 `role="listbox"`/`role="option"`, 화살표 키 탐색 지원.

```html
<label for="region">지역</label>
<select id="region" name="region">
  <option value="">선택하세요</option>
  <option value="seoul">서울</option>
  <option value="busan">부산</option>
</select>
```

---

## 5. Modal(모달)

- **Anatomy:** 오버레이 + 컨테이너 + 헤더(제목·닫기) + 본문 + 푸터(행동)
- **Props:** `open`, `title`, `size`, `dismissible`
- **States:** open, closing
- **사용 가이드:** 비가역 행동 확인·집중 과업에 사용. 중첩 모달 금지.
- **A11y:** `role="dialog"` + `aria-modal="true"`, 포커스 트랩, ESC로 닫기, 열릴 때 첫 포커스·닫힐 때 트리거로 복귀.

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="m-title">
  <h2 id="m-title">정말 삭제하시겠습니까?</h2>
  <p>이 작업은 되돌릴 수 없습니다.</p>
  <div class="modal__footer">
    <button class="btn btn--ghost">취소</button>
    <button class="btn btn--danger">삭제</button>
  </div>
</div>
```

---

## 6. Table(테이블)

- **Anatomy:** caption + thead + tbody + (선택)정렬·페이지네이션
- **Props:** `columns`, `data`, `sortable`, `selectable`, `stickyHeader`
- **States:** default, loading(스켈레톤), empty, error
- **사용 가이드:** 빈 상태는 빈 상태 패턴 적용. 모바일은 카드형 전환 고려.
- **A11y:** `<th scope="col/row">`, 정렬 상태는 `aria-sort`로 표기.

```html
<table>
  <caption>주문 내역</caption>
  <thead>
    <tr><th scope="col" aria-sort="descending">주문일</th><th scope="col">상태</th></tr>
  </thead>
  <tbody>
    <tr><td>2026-06-20</td><td>배송 완료</td></tr>
  </tbody>
</table>
```

---

## 7. Tabs(탭)

- **Anatomy:** 탭 리스트 + 탭 + 탭 패널
- **Props:** `tabs`, `activeIndex`, `orientation`
- **States:** default, active, focus, disabled
- **사용 가이드:** 동등한 콘텐츠 그룹 전환에 사용. 탭 7개 이하 권장.
- **A11y:** `role="tablist"`/`tab`/`tabpanel`, `aria-selected`, 화살표 키 이동.

```html
<div role="tablist" aria-label="설정">
  <button role="tab" aria-selected="true" id="t1" aria-controls="p1">계정</button>
  <button role="tab" aria-selected="false" id="t2" aria-controls="p2">알림</button>
</div>
<div role="tabpanel" id="p1" aria-labelledby="t1">…</div>
```

---

## 8. Toast(토스트)

- **Anatomy:** 컨테이너 + 아이콘 + 메시지 + (선택)행동/닫기
- **Props:** `variant`, `message`, `duration`, `action`
- **Variants:** success / info / warning / error
- **사용 가이드:** 짧은 비차단 알림에 사용. 중요·비가역 정보는 모달로.
- **A11y:** `role="status"`(정보) 또는 `role="alert"`(오류), 자동 소멸 시 충분한 시간 보장.

```html
<div class="toast toast--success" role="status">
  저장되었습니다. <button class="toast__action">실행 취소</button>
</div>
```

---

## 9. Nav(내비게이션)

- **Anatomy:** 컨테이너 + 로고 + 메뉴 항목 + 보조 영역
- **Props:** `items`, `currentPath`, `variant`(top/side)
- **States:** default, hover, current, disabled
- **사용 가이드:** 현재 위치를 명확히 표시. 모바일은 햄버거+드로어.
- **A11y:** `<nav aria-label>`, 현재 항목 `aria-current="page"`, 키보드 탐색.

```html
<nav aria-label="주요">
  <ul>
    <li><a href="/" aria-current="page">홈</a></li>
    <li><a href="/products">상품</a></li>
  </ul>
</nav>
```

---

## 10. Card(카드)

- **Anatomy:** 컨테이너 + (선택)미디어 + 제목 + 본문 + (선택)행동
- **Props:** `title`, `media`, `actions`, `clickable`
- **States:** default, hover, focus(클릭형)
- **사용 가이드:** 카드 전체를 링크로 만들 때 중첩 인터랙티브 요소 주의.
- **A11y:** 클릭형 카드는 단일 링크로 감싸고 내부 버튼 중복을 피한다.

```html
<article class="card">
  <h3 class="card__title">베이직 요금제</h3>
  <p>월 9,900원으로 핵심 기능을 모두.</p>
  <button class="btn btn--primary">선택</button>
</article>
```

---

## 11. Form(폼)

- **Anatomy:** form + fieldset/legend + 필드 그룹 + 검증 요약 + 제출
- **Props:** `onSubmit`, `validation`, `layout`
- **States:** default, validating, error, submitting, success
- **사용 가이드:** 관련 필드는 fieldset로 묶고, 제출 시 첫 오류로 포커스 이동.
- **A11y:** 검증 요약을 상단에 두고 각 오류로 점프 링크 제공. 필수 표시는 텍스트로도.

```html
<form novalidate>
  <fieldset>
    <legend>배송지</legend>
    <div class="field">
      <label for="addr">주소 <span aria-hidden="true">*</span></label>
      <input id="addr" required aria-required="true" />
    </div>
  </fieldset>
  <button class="btn btn--primary" type="submit">주문하기</button>
</form>
```

---

## 12. Pagination(페이지네이션)

- **Anatomy:** 이전 + 페이지 번호 + 다음 + (선택)전체 개수
- **Props:** `currentPage`, `totalPages`, `onChange`
- **States:** default, current, disabled(양 끝)
- **사용 가이드:** 무한 스크롤 대신 명확한 페이지 제어가 필요할 때 사용.
- **A11y:** `<nav aria-label="페이지">`, 현재 `aria-current="page"`, 비활성 끝 버튼 `disabled`.

```html
<nav aria-label="페이지">
  <a href="?p=1" rel="prev">이전</a>
  <a href="?p=1" aria-current="page">1</a>
  <a href="?p=2">2</a>
  <a href="?p=2" rel="next">다음</a>
</nav>
```

---

## 13. Tooltip(툴팁)

- **Anatomy:** 트리거 + 팝업 내용 + 포인터
- **Props:** `content`, `placement`, `delay`
- **States:** hidden, visible
- **사용 가이드:** 보조 설명 한정. 필수 정보는 본문에 노출(툴팁 의존 금지).
- **A11y:** `aria-describedby`로 연결, 포커스·호버 모두에서 표시, ESC로 닫힘.

```html
<button aria-describedby="tip-1">도움말</button>
<span role="tooltip" id="tip-1">비밀번호는 8자 이상이어야 합니다.</span>
```

---

## 14. 컴포넌트 등재 체크리스트

- [ ] 토큰만 사용(하드코딩 0)
- [ ] 모든 상태 정의
- [ ] [접근성](16_ACCESSIBILITY.md): 키보드·스크린리더·대비 통과
- [ ] [Figma](10_FIGMA_GUIDE.md) variant + Code Connect 매핑
- [ ] 사용 가이드·예시 마크업 문서화
- [ ] [HTML 가이드](17_HTML_GUIDE.md) 시맨틱 규약 준수

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 컴포넌트 계층의 거버넌스.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 상태·시각 규칙.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — 컴포넌트 시각 값의 출처.
- [16 · 접근성](16_ACCESSIBILITY.md) — 컴포넌트별 접근성 기준.
- [10 · Figma 가이드](10_FIGMA_GUIDE.md) — Figma 컴포넌트·Code Connect.
- [17 · HTML 가이드](17_HTML_GUIDE.md) — 시맨틱 마크업 규약.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/15_DESIGN_TOKEN.md =====

# 15 · 디자인 토큰

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 디자인 토큰(Design Token) 분류·네이밍·전체 토큰셋·테마·빌드 파이프라인을 정의한다. |
| **대상 독자** | UI 디자이너, 프런트엔드 엔지니어, 퍼블리싱 엔지니어 |
| **담당(Owner) 에이전트** | UI Designer (협업: Frontend Engineer) |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [Figma 가이드](10_FIGMA_GUIDE.md), [CSS 가이드](18_CSS_GUIDE.md), [접근성](16_ACCESSIBILITY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 디자인 토큰이란

디자인 토큰은 시각 디자인 결정을 **이름이 부여된 값**으로 추상화한 단위다. 골드위키의 모든 시각 값은 토큰에서 파생하며, 토큰은 디자인([Figma](10_FIGMA_GUIDE.md))과 코드([CSS](18_CSS_GUIDE.md)) 양쪽의 단일 출처다.

---

## 2. 토큰 분류(3계층)

```
글로벌(Global/Primitive)  → 원시 값. 의미 없음.  예) --blue-600: #2563eb
        ↓ 참조
별칭(Alias/Semantic)      → 의미 부여.          예) --color-primary: var(--blue-600)
        ↓ 참조
컴포넌트(Component)        → 컴포넌트 전용.      예) --button-bg: var(--color-primary)
```

| 계층 | 변경 빈도 | 직접 사용 |
| --- | --- | --- |
| 글로벌 | 매우 낮음 | 금지(별칭 통해 사용) |
| 별칭 | 낮음 | 권장 |
| 컴포넌트 | 중간 | 컴포넌트 내부 |

---

## 3. 네이밍 규칙

```
[카테고리]-[속성]-[변형]-[상태]
예) color-text-primary, color-bg-danger-hover, space-4, radius-md
```

- 소문자, 하이픈 구분(kebab-case).
- Figma 변수는 슬래시 표기(`color/text/primary`), CSS는 하이픈(`--color-text-primary`)으로 1:1 대응한다. ([Figma §4.2](10_FIGMA_GUIDE.md))

---

## 4. 전체 예시 토큰셋

### 4.1 JSON (W3C 토큰 형식, Style Dictionary 입력)

```json
{
  "color": {
    "blue":   { "400": { "value": "#60a5fa" }, "600": { "value": "#2563eb" }, "700": { "value": "#1d4ed8" } },
    "gray":   { "50": { "value": "#f9fafb" }, "500": { "value": "#6b7280" }, "900": { "value": "#111827" } },
    "red":    { "600": { "value": "#dc2626" } },
    "green":  { "600": { "value": "#16a34a" } },
    "primary":   { "value": "{color.blue.600}" },
    "danger":    { "value": "{color.red.600}" },
    "success":   { "value": "{color.green.600}" },
    "text":      { "value": "{color.gray.900}" },
    "bg":        { "value": "{color.gray.50}" }
  },
  "space":  { "1": { "value": "4px" }, "2": { "value": "8px" }, "4": { "value": "16px" }, "6": { "value": "24px" }, "8": { "value": "32px" } },
  "radius": { "sm": { "value": "4px" }, "md": { "value": "8px" }, "lg": { "value": "16px" }, "full": { "value": "9999px" } },
  "font":   {
    "family": { "base": { "value": "Pretendard, system-ui, sans-serif" } },
    "size":   { "body": { "value": "16px" }, "h2": { "value": "24px" }, "h1": { "value": "32px" } },
    "weight": { "regular": { "value": "400" }, "semibold": { "value": "600" }, "bold": { "value": "700" } }
  },
  "shadow": {
    "sm": { "value": "0 1px 2px rgba(0,0,0,0.06)" },
    "md": { "value": "0 4px 12px rgba(0,0,0,0.10)" }
  },
  "motion": {
    "duration": { "fast": { "value": "150ms" }, "base": { "value": "250ms" } },
    "easing":   { "standard": { "value": "cubic-bezier(0.2, 0, 0, 1)" } }
  }
}
```

### 4.2 CSS 커스텀 프로퍼티 (Style Dictionary 출력)

```css
:root {
  /* 글로벌 */
  --blue-400: #60a5fa; --blue-600: #2563eb; --blue-700: #1d4ed8;
  --gray-50: #f9fafb; --gray-500: #6b7280; --gray-900: #111827;
  --red-600: #dc2626; --green-600: #16a34a;

  /* 별칭(Semantic) */
  --color-primary: var(--blue-600);
  --color-danger:  var(--red-600);
  --color-success: var(--green-600);
  --color-text:    var(--gray-900);
  --color-bg:      var(--gray-50);
  --color-focus:   var(--blue-600);

  /* 간격 / 반경 */
  --space-1: 4px; --space-2: 8px; --space-4: 16px; --space-6: 24px; --space-8: 32px;
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-full: 9999px;

  /* 타이포 */
  --font-family-base: Pretendard, system-ui, sans-serif;
  --font-size-body: 16px; --font-size-h2: 24px; --font-size-h1: 32px;
  --font-weight-regular: 400; --font-weight-semibold: 600; --font-weight-bold: 700;

  /* 그림자 / 모션 */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10);
  --motion-fast: 150ms; --motion-base: 250ms;
  --motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);

  /* 컴포넌트 토큰 예시 */
  --button-bg: var(--color-primary);
  --button-radius: var(--radius-md);
  --button-padding: var(--space-2) var(--space-4);
}
```

---

## 5. 테마 / 다크모드

별칭 토큰만 재정의하여 컴포넌트 변경 없이 테마를 전환한다.

```css
[data-theme="dark"] {
  --color-bg:   var(--gray-900);
  --color-text: var(--gray-50);
  --color-primary: var(--blue-400); /* 다크 배경 대비 보정 */
  --shadow-md: 0 4px 12px rgba(0,0,0,0.40);
}
```

| 규칙 | 내용 |
| --- | --- |
| 재정의 범위 | 별칭 계층만 (글로벌·컴포넌트 직접 수정 금지) |
| 대비 재검증 | 다크 테마는 [WCAG AA](16_ACCESSIBILITY.md) 대비를 별도 검증 |
| 시스템 연동 | `prefers-color-scheme`로 기본값 결정 가능 |
| 브랜드 테마 | 클라이언트별 별칭 오버라이드(화이트라벨) |

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* 다크 별칭 적용 */ }
}
```

---

## 6. 빌드 / 싱크 파이프라인 (Style Dictionary)

```
Figma 변수  ──export──▶  tokens.json  ──Style Dictionary──▶  ├─ CSS 커스텀 프로퍼티
                                                              ├─ SCSS 변수
                                                              ├─ JS/TS 상수
                                                              └─ iOS/Android 리소스
```

### 6.1 Style Dictionary 설정 예시

```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "dist/css/",
      "files": [{ "destination": "tokens.css", "format": "css/variables" }]
    },
    "js": {
      "transformGroup": "js",
      "buildPath": "dist/js/",
      "files": [{ "destination": "tokens.js", "format": "javascript/es6" }]
    }
  }
}
```

### 6.2 동기화 규칙
- 토큰 변경은 Figma 변수 → `tokens.json` → 빌드 순서로만 흐른다(단방향).
- 빌드 산출물은 버전 태그를 달고 [릴리스 프로세스](31_RELEASE_PROCESS.md)를 따른다.
- 토큰 변경(특히 글로벌)은 [SemVer](09_DESIGN_SYSTEM.md) MAJOR/MINOR로 분류한다.

---

## 7. 토큰 사용 규칙(Do/Don't)

| Do | Don't |
| --- | --- |
| `color: var(--color-text)` | `color: #111827` |
| `padding: var(--space-4)` | `padding: 16px` (직접 값) |
| 별칭 토큰 사용 | 글로벌 토큰 직접 사용 |
| 컴포넌트 토큰으로 변형 | 컴포넌트마다 임의 값 |

---

## 8. 검수 체크리스트

- [ ] 3계층 분류를 준수했는가
- [ ] 네이밍 규칙(카테고리-속성-변형-상태)을 따랐는가
- [ ] Figma 변수와 CSS 토큰명이 1:1 대응하는가
- [ ] 다크/브랜드 테마가 별칭만 재정의하는가
- [ ] 다크 테마 대비를 재검증했는가([16](16_ACCESSIBILITY.md))
- [ ] 빌드 파이프라인이 단방향인가

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 토큰 계층의 거버넌스·버전.
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 토큰을 사용하는 시각 규칙.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 컴포넌트 토큰 소비처.
- [10 · Figma 가이드](10_FIGMA_GUIDE.md) — Figma 변수와의 동기화.
- [18 · CSS 가이드](18_CSS_GUIDE.md) — CSS 커스텀 프로퍼티 적용 표준.
- [16 · 접근성](16_ACCESSIBILITY.md) — 색상 대비 검증 기준.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/16_ACCESSIBILITY.md =====

# 16 · 접근성

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 접근성 표준(WCAG 2.2 AA, POUR, 시맨틱 HTML, ARIA, 키보드·포커스, 색대비, 폼·에러, 테스트, 감사 체크리스트)을 정의한다. |
| **대상 독자** | 접근성 전문가, UI 디자이너, 퍼블리싱 엔지니어, 프런트엔드 엔지니어, QA 엔지니어 |
| **담당(Owner) 에이전트** | Accessibility Specialist (협업: Publishing Engineer, QA Engineer) |
| **참조(상위 문서)** | [UX 원칙](07_UX_PRINCIPLES.md), [UI 가이드라인](08_UI_GUIDELINES.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [디자인 토큰](15_DESIGN_TOKEN.md), [HTML 가이드](17_HTML_GUIDE.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 목표 수준

골드위키의 모든 산출물은 **WCAG 2.2 레벨 AA**를 기본 목표로 한다. 접근성은 [UX 원칙](07_UX_PRINCIPLES.md) 원칙 6에 따라 선택이 아닌 필수이며, 컴포넌트 등재의 합격 게이트다.

---

## 2. POUR 4대 원칙

| 원칙 | 의미 | 핵심 요구 |
| --- | --- | --- |
| Perceivable(인식) | 정보를 인지 가능하게 | 대체 텍스트, 자막, 대비 |
| Operable(운용) | 조작 가능하게 | 키보드 접근, 충분한 시간 |
| Understandable(이해) | 이해 가능하게 | 명확한 레이블·에러 |
| Robust(견고) | 보조기술 호환 | 유효한 시맨틱·ARIA |

---

## 3. WCAG 2.2 핵심 성공 기준(AA 발췌)

| 기준 | 요구 | 적용 |
| --- | --- | --- |
| 1.4.3 명도 대비 | 본문 4.5:1, 대형 3:1 | [디자인 토큰](15_DESIGN_TOKEN.md) 색 검증 |
| 1.4.11 비텍스트 대비 | UI·그래픽 3:1 | 경계선·아이콘 |
| 2.1.1 키보드 | 모든 기능 키보드 가능 | 포커스 관리 |
| 2.4.7 포커스 가시성 | 포커스 표시 | 포커스 링 유지([08](08_UI_GUIDELINES.md)) |
| 2.4.11 포커스 가려짐 없음(2.2 신규) | 포커스 요소 비가림 | 고정 헤더 주의 |
| 2.5.8 타깃 크기(2.2 신규) | 최소 24×24px | 터치 44px 권장 |
| 3.3.7 중복 입력 방지(2.2 신규) | 이전 입력 재요구 금지 | 자동 채움 |
| 4.1.2 이름·역할·값 | 보조기술에 전달 | 적절한 ARIA |

---

## 4. 시맨틱 HTML 우선

ARIA보다 **네이티브 시맨틱 요소를 우선**한다("No ARIA is better than bad ARIA").

```html
<!-- 권장 -->
<button>저장</button>
<nav aria-label="주요">…</nav>
<main>…</main>

<!-- 지양 -->
<div role="button" tabindex="0" onclick="…">저장</div>
```

| 용도 | 권장 요소 |
| --- | --- |
| 행동 | `<button>` |
| 이동 | `<a href>` |
| 구조 | `<header><nav><main><footer>` |
| 목록 | `<ul><ol><dl>` |
| 표 | `<table><th scope>` |

---

## 5. ARIA 규칙

1. 네이티브 요소로 가능하면 ARIA를 쓰지 않는다.
2. 네이티브 시맨틱을 ARIA로 덮어쓰지 않는다.
3. 모든 인터랙티브 ARIA 요소는 키보드 조작이 가능해야 한다.
4. 포커스 가능한 요소를 `aria-hidden="true"`로 숨기지 않는다.
5. 모든 ARIA 위젯에 접근 가능한 이름을 부여한다.

| 패턴 | 핵심 ARIA |
| --- | --- |
| 모달 | `role="dialog"` `aria-modal` `aria-labelledby` |
| 탭 | `role="tablist/tab/tabpanel"` `aria-selected` |
| 토스트 | `role="status"` / `role="alert"` |
| 라이브 영역 | `aria-live="polite/assertive"` |

---

## 6. 키보드 · 포커스 관리

| 키 | 동작 |
| --- | --- |
| Tab / Shift+Tab | 다음/이전 포커스 |
| Enter / Space | 활성화 |
| Esc | 닫기·취소 |
| 화살표 | 그룹 내 이동(탭·메뉴·라디오) |

**포커스 관리 규칙**
- 논리적 포커스 순서(DOM 순서 = 시각 순서).
- 모달은 포커스 트랩, 닫힐 때 트리거로 복귀.
- 페이지 상단에 "본문 바로가기(Skip to content)" 링크 제공.
- `tabindex` 양수 값 사용 금지(0과 -1만).

```html
<a class="skip-link" href="#main">본문 바로가기</a>
```

---

## 7. 색상 대비

- 색상만으로 정보를 전달하지 않는다(아이콘·텍스트·패턴 병기). ([UI §5](08_UI_GUIDELINES.md))
- 대비 검증은 토큰 색 조합 단위로 수행한다.

| 조합 | 요구 대비 |
| --- | --- |
| 본문 텍스트/배경 | ≥ 4.5:1 |
| 대형 텍스트(18.66px Bold/24px) | ≥ 3:1 |
| UI 컴포넌트·아이콘 | ≥ 3:1 |
| 포커스 표시 | ≥ 3:1 |

---

## 8. 폼 · 에러 접근성

- 모든 입력에 `<label for>` 연결(placeholder 대체 금지).
- 오류는 `aria-invalid="true"` + `aria-describedby`로 메시지 연결.
- 제출 시 오류 요약을 상단에 두고 첫 오류로 포커스 이동.
- 필수 표시는 색·기호만이 아니라 텍스트로도 안내.

```html
<label for="pw">비밀번호 (필수)</label>
<input id="pw" type="password" required aria-invalid="true" aria-describedby="pw-err" />
<p id="pw-err" role="alert">8자 이상, 특수문자를 1개 이상 포함해 주세요.</p>
```

---

## 9. 테스트

### 9.1 도구·기법 매트릭스
| 방법 | 도구/대상 | 커버리지 |
| --- | --- | --- |
| 자동 검사 | axe, Lighthouse | 약 30–40%(기계 검출 가능 항목) |
| 키보드 테스트 | Tab만으로 전 과업 | 운용성 |
| 스크린리더 | NVDA, VoiceOver | 인식·이름·역할 |
| 확대 | 200%·400% 줌 | 리플로우 |
| 색각 시뮬 | 색맹 필터 | 색 의존성 |

> 자동 검사만으로는 충분하지 않다. 수동 키보드·스크린리더 테스트를 반드시 병행한다.

### 9.2 axe 검사 예시 (CI 연동)
```js
import { axe } from "jest-axe";
test("페이지에 접근성 위반이 없어야 한다", async () => {
  const { container } = render(<Page />);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 10. 접근성 감사 체크리스트

| 영역 | 체크 항목 |
| --- | --- |
| 구조 | [ ] 시맨틱 랜드마크(`header/nav/main/footer`) |
| 이미지 | [ ] 의미 이미지 `alt`, 장식 `alt=""` |
| 대비 | [ ] 본문 4.5:1, UI 3:1 |
| 키보드 | [ ] 모든 기능 키보드 가능, 포커스 가시 |
| 포커스 | [ ] 트랩·복귀·논리적 순서·Skip 링크 |
| 폼 | [ ] 레이블 연결, 에러 연결, 오류 요약 |
| 동적 | [ ] 라이브 영역으로 변경 알림 |
| 미디어 | [ ] 자막·대본 제공 |
| 모션 | [ ] `prefers-reduced-motion` 존중 |
| 언어 | [ ] `<html lang="ko">` |

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 11. 컴포넌트별 접근성은 어디에

각 컴포넌트의 구체 접근성 노트는 [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)의 각 항목 A11y 섹션에 있다. 본 문서는 전사 표준을, [14](14_COMPONENT_LIBRARY.md)는 컴포넌트 단위 적용을 담당한다.

---

## 관련 골드위키 문서

- [07 · UX 원칙](07_UX_PRINCIPLES.md) — 접근성 내재화 원칙(원칙 6).
- [08 · UI 가이드라인](08_UI_GUIDELINES.md) — 대비·포커스·터치 타깃 시각 규칙.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 컴포넌트별 접근성 노트.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — 색 대비 검증 대상.
- [17 · HTML 가이드](17_HTML_GUIDE.md) — 시맨틱 마크업 규약.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) — 출시 전 접근성 게이트.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/17_HTML_GUIDE.md =====

# 17 · HTML 표준 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 시맨틱(Semantic) HTML 작성 표준을 정의하여, HTML 프로토타입과 실제 산출물의 접근성·SEO·성능·유지보수성을 일관되게 보장한다. |
| **대상 독자** | 퍼블리싱 엔지니어(Publishing Engineer), 프론트엔드 엔지니어, UI 디자이너, 접근성 전문가 |
| **담당(Owner) 에이전트** | Publishing Engineer |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [접근성](16_ACCESSIBILITY.md) |
| **연계(하위 문서)** | [CSS 가이드](18_CSS_GUIDE.md), [JS 가이드](19_JS_GUIDE.md), [프론트엔드 가이드](20_FRONTEND_GUIDE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 기본 원칙

골드위키 디지털의 모든 마크업은 다음 원칙을 따른다.

1. **시맨틱 우선(Semantics First):** 의미를 가진 요소를 먼저 선택하고, 의미가 없을 때만 `<div>`·`<span>`을 쓴다.
2. **접근성 내장(Accessibility by Default):** 마크업 단계에서 [접근성](16_ACCESSIBILITY.md) WCAG 2.2 AA를 충족한다. ARIA는 네이티브 요소로 표현 불가능할 때만 보조 수단으로 쓴다.
3. **콘텐츠와 표현의 분리:** 시각 스타일은 [CSS 가이드](18_CSS_GUIDE.md), 동작은 [JS 가이드](19_JS_GUIDE.md)로 분리한다. 인라인 스타일·인라인 핸들러를 금지한다.
4. **점진적 향상(Progressive Enhancement):** JavaScript 없이도 핵심 콘텐츠와 내비게이션이 동작해야 한다.
5. **검증 가능성:** 모든 페이지는 W3C 마크업 검사기와 [품질 체크리스트](29_QUALITY_CHECKLIST.md)를 통과한다.

> **핵심 규칙:** "`<div>`를 쓰기 전에, 이 콘텐츠의 의미를 가진 요소가 존재하는가?"를 항상 자문한다.

---

## 2. 문서 구조(Document Skeleton)

모든 HTML 문서는 아래 골격을 기준으로 한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>제품 소개 · Goldwiki Digital</title>
    <meta name="description" content="골드위키 디지털의 엔터프라이즈 디지털 프로덕트 컨설팅 소개." />
    <link rel="canonical" href="https://example.com/products" />
    <link rel="stylesheet" href="/assets/css/main.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">본문 바로가기</a>

    <header class="site-header">
      <nav aria-label="주요 메뉴"><!-- 글로벌 내비게이션 --></nav>
    </header>

    <main id="main">
      <h1>엔터프라이즈 디지털 프로덕트 컨설팅</h1>
      <!-- 페이지 고유 콘텐츠 -->
    </main>

    <footer class="site-footer"><!-- 저작권, 보조 링크 --></footer>

    <script type="module" src="/assets/js/app.js"></script>
  </body>
</html>
```

핵심 규칙:

- `<html lang="ko">`를 항상 명시한다. 다국어 페이지는 언어별로 `lang` 값을 조정한다.
- `<meta charset>`는 `<head>`의 첫 요소여야 한다(인코딩 스니핑 방지).
- 스크립트는 `<body>` 종료 직전에 두거나 `defer`/`type="module"`을 사용해 렌더링을 막지 않는다.
- "본문 바로가기(skip link)"는 키보드 사용자를 위한 필수 요소다([접근성](16_ACCESSIBILITY.md) 참조).

---

## 3. 랜드마크와 시맨틱 요소

### 3.1 페이지 랜드마크

랜드마크는 보조기술 사용자가 페이지 구조를 빠르게 탐색하는 기준점이다.

| 요소 | 역할(role) | 용도 | 페이지당 개수 |
| --- | --- | --- | --- |
| `<header>` | banner | 사이트 헤더(로고, 글로벌 메뉴) | 1 (최상위 1개) |
| `<nav>` | navigation | 내비게이션 그룹 | 여러 개 가능(라벨 필수) |
| `<main>` | main | 페이지 고유 핵심 콘텐츠 | 정확히 1개 |
| `<aside>` | complementary | 보조 콘텐츠(관련 링크, 광고) | 여러 개 가능 |
| `<footer>` | contentinfo | 사이트 푸터 | 1 (최상위 1개) |
| `<section>` | region(라벨 시) | 주제 단위 묶음 | 여러 개 |
| `<article>` | article | 독립적으로 배포 가능한 콘텐츠 단위 | 여러 개 |

`<nav>`가 여러 개라면 반드시 구분 라벨을 붙인다.

```html
<nav aria-label="주요 메뉴">…</nav>
<nav aria-label="푸터 메뉴">…</nav>
<nav aria-label="브레드크럼"><ol>…</ol></nav>
```

### 3.2 `<section>` vs `<article>` vs `<div>`

| 상황 | 선택 |
| --- | --- |
| 독립 배포·재사용 가능한 단위(블로그 글, 상품 카드, 댓글) | `<article>` |
| 제목을 가진 주제 단위 묶음 | `<section>` (가급적 `aria-labelledby`로 제목 연결) |
| 순수 스타일링·레이아웃 목적, 의미 없음 | `<div>` |

```html
<article aria-labelledby="card-1-title">
  <h3 id="card-1-title">RFP 분석 자동화</h3>
  <p>AI 에이전트가 제안요청서를 구조화하여 핵심 요구사항을 추출한다.</p>
  <a href="/services/rfp">자세히 보기</a>
</article>
```

---

## 4. 제목 위계(Heading Hierarchy)

- 페이지당 `<h1>`은 하나만 둔다(페이지 핵심 주제).
- 제목 레벨을 건너뛰지 않는다(`<h2>` 다음에 `<h4>` 금지).
- 제목은 시각적 크기가 아니라 **문서 개요(outline)** 기준으로 선택한다. 크기는 [CSS](18_CSS_GUIDE.md)로 조정한다.

```html
<h1>서비스 개요</h1>
  <h2>UX/UI 전략</h2>
    <h3>디자인 시스템 구축</h3>
    <h3>접근성 검수</h3>
  <h2>프론트엔드 구현</h2>
```

좋지 않은 예와 개선:

```html
<!-- 나쁨: 스타일 목적의 제목 오용 -->
<h4 class="big">대형 배너 문구</h4>

<!-- 좋음: 의미는 단락, 시각 강조는 클래스로 -->
<p class="display-text">대형 배너 문구</p>
```

---

## 5. 텍스트·콘텐츠 시맨틱

| 의미 | 요소 | 비권장 대체 |
| --- | --- | --- |
| 강한 중요도 | `<strong>` | `<b>` (의미 없음) |
| 강조(어조 변화) | `<em>` | `<i>` (의미 없음) |
| 인용 블록 | `<blockquote cite>` | `<div class="quote">` |
| 짧은 인용 | `<q>` | 따옴표 직접 입력 |
| 코드 | `<code>`, `<pre>` | `<span class="code">` |
| 약어 | `<abbr title>` | 일반 텍스트 |
| 시간/날짜 | `<time datetime>` | `<span>` |
| 정의 목록 | `<dl><dt><dd>` | 표 또는 단락 |

```html
<p>
  <strong>중요:</strong> 모든 에이전트는 의사결정 전
  <abbr title="제안요청서">RFP</abbr> 요구사항을 확인한다.
</p>
<p>게시일: <time datetime="2026-06-26">2026년 6월 26일</time></p>
```

---

## 6. 이미지와 미디어

```html
<!-- 정보성 이미지: 의미 있는 대체 텍스트 -->
<img src="/img/dashboard.webp" alt="프로젝트 진척 대시보드, 완료율 78% 표시"
     width="1200" height="675" loading="lazy" decoding="async" />

<!-- 장식용 이미지: 빈 alt로 보조기술에서 숨김 -->
<img src="/img/divider.svg" alt="" role="presentation" />

<!-- 반응형 이미지 -->
<picture>
  <source type="image/avif" srcset="/img/hero.avif" />
  <source type="image/webp" srcset="/img/hero.webp" />
  <img src="/img/hero.jpg" alt="컨설팅 협업 장면" width="1600" height="900" />
</picture>

<!-- 캡션이 있는 그림 -->
<figure>
  <img src="/img/architecture.png" alt="멀티 에이전트 아키텍처 구성도" />
  <figcaption>그림 1. 골드위키 중심의 멀티 에이전트 아키텍처</figcaption>
</figure>
```

규칙:

- `width`/`height`(또는 `aspect-ratio`)를 항상 지정해 레이아웃 시프트(CLS)를 방지한다.
- 스크롤 하단 이미지는 `loading="lazy"`, 첫 화면(LCP) 이미지는 lazy를 쓰지 않는다.
- `alt`는 이미지의 **목적**을 기술한다. "이미지", "사진" 같은 단어는 넣지 않는다.

---

## 7. 폼(Forms)

폼은 접근성과 검증이 가장 자주 누락되는 영역이다. 다음을 표준으로 한다.

```html
<form action="/contact" method="post" novalidate>
  <fieldset>
    <legend>문의 정보</legend>

    <div class="field">
      <label for="name">이름 <span aria-hidden="true">*</span></label>
      <input id="name" name="name" type="text" autocomplete="name"
             required aria-required="true" />
    </div>

    <div class="field">
      <label for="email">이메일</label>
      <input id="email" name="email" type="email" inputmode="email"
             autocomplete="email" required
             aria-describedby="email-hint email-error" />
      <p id="email-hint" class="hint">답변 받을 이메일을 입력한다.</p>
      <p id="email-error" class="error" role="alert" hidden>
        올바른 이메일 형식이 아니다.
      </p>
    </div>

    <fieldset>
      <legend>관심 서비스</legend>
      <label><input type="radio" name="service" value="rfp" /> RFP 분석</label>
      <label><input type="radio" name="service" value="ux" /> UX/UI 전략</label>
      <label><input type="radio" name="service" value="dev" /> 개발 구현</label>
    </fieldset>

    <button type="submit">문의 보내기</button>
  </fieldset>
</form>
```

폼 규칙:

| 규칙 | 이유 |
| --- | --- |
| 모든 입력에 `<label for>` 연결 | 스크린리더·클릭 영역 확대 |
| 적절한 `type`/`inputmode` 사용 | 모바일 키보드 최적화 |
| `autocomplete` 토큰 지정 | 입력 부담 감소, 접근성 향상 |
| 그룹은 `<fieldset>`+`<legend>` | 관계 명확화 |
| 오류는 `aria-describedby`로 연결, `role="alert"` | 동적 오류 안내 |
| 색상만으로 필수 표시 금지 | 색약 사용자 고려 |

자세한 검증 로직과 오류 처리 패턴은 [JS 가이드 §에러 처리](19_JS_GUIDE.md)를 따른다.

---

## 8. 테이블(Tables)

데이터 테이블에만 `<table>`을 쓰고, 레이아웃 목적으로는 절대 쓰지 않는다(레이아웃은 [CSS Grid](18_CSS_GUIDE.md)).

```html
<table>
  <caption>2026년 분기별 프로젝트 현황</caption>
  <thead>
    <tr>
      <th scope="col">분기</th>
      <th scope="col">신규 계약</th>
      <th scope="col">완료</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1분기</th>
      <td>12</td>
      <td>9</td>
    </tr>
    <tr>
      <th scope="row">2분기</th>
      <td>15</td>
      <td>11</td>
    </tr>
  </tbody>
</table>
```

- `<caption>`으로 표 제목을 제공한다.
- 헤더 셀은 `<th scope="col|row">`로 방향을 명시한다.

---

## 9. 인터랙티브 요소

| 동작 | 올바른 요소 | 금지 |
| --- | --- | --- |
| 페이지 이동 | `<a href>` | `<div onclick>`로 이동 |
| 동작 실행(제출/토글) | `<button type>` | `<a href="#">`로 동작 |
| 펼침/접힘 | `<details><summary>` | 수동 JS 토글(필요시에만) |
| 모달/대화상자 | `<dialog>` | `<div role="dialog">` 직접 구현 |

```html
<details>
  <summary>FAQ: 골드위키란 무엇인가?</summary>
  <p>모든 AI 에이전트가 참조하는 단일 진실 공급원(SSOT) 지식베이스다.</p>
</details>

<dialog id="confirm">
  <form method="dialog">
    <p>제출하시겠는가?</p>
    <button value="cancel">취소</button>
    <button value="ok">확인</button>
  </form>
</dialog>
```

`<button>`은 기본 `type`이 `submit`이므로, 폼 내부의 일반 버튼은 반드시 `type="button"`을 지정한다.

---

## 10. 메타데이터와 SEO

```html
<head>
  <title>RFP 분석 자동화 | Goldwiki Digital</title>
  <meta name="description" content="AI 에이전트 기반 RFP 분석으로 제안 적중률을 높인다. 60자 내외 요약." />
  <link rel="canonical" href="https://example.com/services/rfp" />

  <!-- Open Graph (소셜 공유) -->
  <meta property="og:title" content="RFP 분석 자동화" />
  <meta property="og:description" content="AI 에이전트 기반 RFP 분석." />
  <meta property="og:image" content="https://example.com/og/rfp.png" />
  <meta property="og:type" content="website" />

  <!-- 구조화 데이터 (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Goldwiki Digital",
    "url": "https://example.com",
    "description": "엔터프라이즈 디지털 프로덕트 컨설팅"
  }
  </script>
</head>
```

SEO 체크리스트:

- [ ] 고유하고 서술적인 `<title>` (50–60자)
- [ ] `<meta name="description">` (120–160자)
- [ ] 정규 URL `<link rel="canonical">` 지정
- [ ] 의미 있는 제목 위계(`<h1>` 1개)
- [ ] 이미지 `alt` 텍스트 완비
- [ ] Open Graph / 구조화 데이터(JSON-LD) 제공
- [ ] 깨끗한 URL과 `sitemap.xml`, `robots.txt`

---

## 11. 성능 최적화 마크업

```html
<head>
  <!-- 핵심 폰트·LCP 이미지 사전 로드 -->
  <link rel="preload" href="/fonts/pretendard.woff2" as="font"
        type="font/woff2" crossorigin />
  <link rel="preload" href="/img/hero.webp" as="image" fetchpriority="high" />

  <!-- 외부 출처 사전 연결 -->
  <link rel="preconnect" href="https://api.example.com" crossorigin />
  <link rel="dns-prefetch" href="https://cdn.example.com" />
</head>
```

| 기법 | 목적 | 적용 위치 |
| --- | --- | --- |
| `rel="preload"` | 핵심 자원 우선 로드 | 폰트, LCP 이미지 |
| `rel="preconnect"` | 연결 핸드셰이크 선처리 | API·CDN 도메인 |
| `loading="lazy"` | 지연 로딩 | 화면 밖 이미지/iframe |
| `fetchpriority="high"` | 우선순위 상향 | LCP 이미지 |
| `defer` / `type="module"` | 비차단 스크립트 | 모든 스크립트 |
| `width`/`height` 명시 | CLS 방지 | 모든 미디어 |

성능 예산과 Core Web Vitals 목표는 [프론트엔드 가이드 §성능 예산](20_FRONTEND_GUIDE.md)에 정의한다.

---

## 12. 깔끔한 예시 페이지

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>서비스 소개 | Goldwiki Digital</title>
  <meta name="description" content="골드위키 디지털의 4대 핵심 서비스 안내." />
  <link rel="stylesheet" href="/assets/css/main.css" />
</head>
<body>
  <a class="skip-link" href="#main">본문 바로가기</a>
  <header class="site-header">
    <a href="/" class="logo">Goldwiki Digital</a>
    <nav aria-label="주요 메뉴">
      <ul>
        <li><a href="/services" aria-current="page">서비스</a></li>
        <li><a href="/work">사례</a></li>
        <li><a href="/contact">문의</a></li>
      </ul>
    </nav>
  </header>

  <main id="main">
    <h1>4대 핵심 서비스</h1>
    <section aria-labelledby="svc-heading">
      <h2 id="svc-heading">제공 서비스</h2>
      <ul class="card-grid">
        <li>
          <article aria-labelledby="s1">
            <h3 id="s1">RFP 분석 &amp; 제안 전략</h3>
            <p>요구사항 구조화와 적중 전략 수립을 자동화한다.</p>
          </article>
        </li>
        <li>
          <article aria-labelledby="s2">
            <h3 id="s2">UX/UI 전략 &amp; 디자인 시스템</h3>
            <p>일관된 경험과 재사용 가능한 디자인 자산을 구축한다.</p>
          </article>
        </li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Goldwiki Digital</p>
  </footer>
  <script type="module" src="/assets/js/app.js"></script>
</body>
</html>
```

---

## 13. HTML 프로토타입 퍼블리싱 파이프라인

골드위키 디지털의 프로토타입은 HTML로 작성하여 디자인-개발 간 인수인계의 기준 산출물로 삼는다.

| 단계 | 활동 | 담당 | 산출물 |
| --- | --- | --- | --- |
| 1. 토큰 동기화 | [디자인 토큰](15_DESIGN_TOKEN.md)을 CSS 변수로 반영 | Publishing Engineer | `tokens.css` |
| 2. 컴포넌트 마크업 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)를 시맨틱 HTML로 구현 | Publishing Engineer | 컴포넌트 HTML |
| 3. 접근성 검수 | WCAG 2.2 AA, 키보드/스크린리더 테스트 | Accessibility Specialist | 검수 리포트 |
| 4. 성능 점검 | Lighthouse, CWV 측정 | Frontend Engineer | 성능 리포트 |
| 5. 핸드오프 | 프론트엔드 프레임워크로 전환 | Frontend Engineer | 컴포넌트 코드 |

각 단계는 [품질 체크리스트](29_QUALITY_CHECKLIST.md)와 [테스트 전략](30_TEST_STRATEGY.md)을 통과해야 다음 단계로 넘어간다.

---

## 14. 마크업 품질 체크리스트

- [ ] `<!DOCTYPE html>`과 `<html lang>` 명시
- [ ] 랜드마크(`header`/`nav`/`main`/`footer`) 1회씩, `<main>`은 정확히 1개
- [ ] 제목 위계 정상(`<h1>` 1개, 건너뜀 없음)
- [ ] 모든 이미지에 적절한 `alt`
- [ ] 모든 폼 입력에 `<label>` 연결
- [ ] 인터랙티브 요소는 네이티브 요소 사용(`<a>`/`<button>`)
- [ ] 메타 태그(title/description/canonical/OG) 완비
- [ ] 성능 힌트(preload/lazy/width·height) 적용
- [ ] 인라인 스타일·인라인 이벤트 핸들러 없음
- [ ] W3C 마크업 검사기 통과

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 마크업이 따라야 할 디자인 원칙과 토큰 체계.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 시맨틱 HTML로 구현할 컴포넌트 명세.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — HTML/CSS에 주입되는 토큰 정의.
- [16 · 접근성](16_ACCESSIBILITY.md) — WCAG 기준과 ARIA 사용 규칙.
- [18 · CSS 가이드](18_CSS_GUIDE.md) — 마크업과 분리되는 스타일 아키텍처.
- [19 · JS 가이드](19_JS_GUIDE.md) — DOM 동작과 폼 검증 패턴.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 프로토타입의 프레임워크 전환과 성능 예산.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) — 퍼블리싱 품질 게이트.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/18_CSS_GUIDE.md =====

# 18 · CSS 아키텍처 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 확장 가능하고 예측 가능한 CSS 아키텍처를 정의하여, 디자인 토큰 기반의 일관된 스타일링과 반응형·성능 표준을 보장한다. |
| **대상 독자** | 퍼블리싱 엔지니어(Publishing Engineer), 프론트엔드 엔지니어, UI 디자이너 |
| **담당(Owner) 에이전트** | Publishing Engineer |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [디자인 토큰](15_DESIGN_TOKEN.md), [HTML 가이드](17_HTML_GUIDE.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [접근성](16_ACCESSIBILITY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 아키텍처 원칙

1. **토큰 우선(Token First):** 모든 색상·간격·타이포·반경 값은 [디자인 토큰](15_DESIGN_TOKEN.md)에서 파생된 CSS 커스텀 프로퍼티로만 사용한다. 하드코딩된 매직 넘버를 금지한다.
2. **유틸리티 + 컴포넌트 하이브리드:** 자주 쓰는 단일 속성은 유틸리티 클래스로, 복합·재사용 단위는 컴포넌트 클래스로 작성한다.
3. **낮은 특이성(Low Specificity):** `@layer`로 캐스케이드를 통제하고, `!important`와 ID 선택자를 피한다.
4. **관심사 분리:** 마크업([HTML](17_HTML_GUIDE.md))과 동작([JS](19_JS_GUIDE.md))에서 스타일을 분리한다.
5. **반응형 기본(Responsive by Default):** 모바일 퍼스트 + 컨테이너 쿼리로 구성요소 단위 적응을 구현한다.

---

## 2. 캐스케이드 레이어(`@layer`)

특이성 전쟁을 방지하기 위해 레이어 순서를 명시적으로 선언한다. 뒤에 선언된 레이어가 우선한다.

```css
@layer reset, tokens, base, layout, components, utilities, overrides;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
  body { -webkit-font-smoothing: antialiased; }
  img, picture, svg { display: block; max-width: 100%; }
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--color-text);
    background: var(--color-bg);
    line-height: var(--leading-normal);
  }
}
```

| 레이어 | 책임 |
| --- | --- |
| `reset` | 브라우저 기본값 정규화 |
| `tokens` | 커스텀 프로퍼티 정의 |
| `base` | 요소 기본 스타일(타이포 등) |
| `layout` | 페이지/그리드 레이아웃 |
| `components` | 재사용 컴포넌트 |
| `utilities` | 단일 속성 헬퍼 |
| `overrides` | 예외적 최종 보정(최소화) |

> 유틸리티가 컴포넌트보다 뒤에 있으므로 특이성이 같아도 유틸리티가 항상 이긴다 — 의도된 동작이다.

---

## 3. 디자인 토큰 → CSS 커스텀 프로퍼티

[디자인 토큰(15)](15_DESIGN_TOKEN.md)을 단일 진실 공급원으로 삼아 CSS 변수로 매핑한다.

```css
@layer tokens {
  :root {
    /* 색상 — 시맨틱 토큰 */
    --color-brand: #c8911a;
    --color-brand-strong: #a4760f;
    --color-text: #1a1a1a;
    --color-text-muted: #5b5b5b;
    --color-bg: #ffffff;
    --color-surface: #f6f6f4;
    --color-border: #e0e0dc;
    --color-danger: #c0392b;
    --color-success: #1e8449;

    /* 간격 — 4px 베이스 스케일 */
    --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
    --space-4: 1rem;    --space-6: 1.5rem; --space-8: 2rem;
    --space-12: 3rem;   --space-16: 4rem;

    /* 타이포 */
    --font-sans: "Pretendard", system-ui, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, monospace;
    --text-sm: 0.875rem; --text-base: 1rem; --text-lg: 1.25rem;
    --text-xl: 1.5rem;   --text-2xl: 2rem;  --text-3xl: 2.5rem;
    --leading-tight: 1.25; --leading-normal: 1.6;

    /* 반경·그림자·전환 */
    --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px;
    --shadow-1: 0 1px 2px rgba(0,0,0,.06);
    --shadow-2: 0 4px 12px rgba(0,0,0,.10);
    --transition: 160ms cubic-bezier(.2,.0,.2,1);
  }
}
```

### 3.1 다크 모드 — 토큰 재정의

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f2f2f0;
    --color-bg: #131312;
    --color-surface: #1e1e1c;
    --color-border: #34342f;
  }
}
/* 사용자 수동 토글 지원 */
[data-theme="dark"] { /* 위와 동일 재정의 */ }
```

테마는 토큰만 교체하므로 컴포넌트 CSS는 수정할 필요가 없다.

---

## 4. 네이밍 규칙

### 4.1 컴포넌트 — BEM (필요한 복합 컴포넌트에 한해)

```css
@layer components {
  /* Block__Element--Modifier */
  .card { padding: var(--space-6); border-radius: var(--radius-md); }
  .card__title { font-size: var(--text-lg); font-weight: 600; }
  .card__body { color: var(--color-text-muted); }
  .card--featured { border: 2px solid var(--color-brand); }
}
```

### 4.2 유틸리티 — 약어 + 토큰 스케일

```css
@layer utilities {
  .mt-4 { margin-top: var(--space-4); }
  .p-6  { padding: var(--space-6); }
  .flex { display: flex; }
  .gap-4 { gap: var(--space-4); }
  .text-muted { color: var(--color-text-muted); }
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }
}
```

| 종류 | 패턴 | 예시 |
| --- | --- | --- |
| 블록 | `.소문자-케밥` | `.card`, `.site-header` |
| 엘리먼트 | `.block__element` | `.card__title` |
| 모디파이어 | `.block--modifier` | `.card--featured` |
| 상태 | `.is-*`, `.has-*` | `.is-open`, `.is-active` |
| 유틸리티 | `.속성-값` | `.mt-4`, `.flex` |

`.sr-only`(스크린리더 전용)는 [접근성](16_ACCESSIBILITY.md)의 필수 유틸리티다.

---

## 5. 현대 레이아웃

### 5.1 Flexbox — 1차원 정렬

```css
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}
```

### 5.2 Grid — 2차원 레이아웃 / 자동 반응형

```css
/* 미디어 쿼리 없이 반응형 카드 그리드 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: var(--space-6);
}

/* 페이지 레이아웃 — 사이드바 + 본문 */
.layout {
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-areas: "sidebar main";
  gap: var(--space-8);
}
.layout__sidebar { grid-area: sidebar; }
.layout__main { grid-area: main; }

@media (max-width: 48rem) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas: "main";
  }
  .layout__sidebar { display: none; }
}
```

### 5.3 컨테이너 쿼리 — 구성요소 단위 적응

뷰포트가 아닌 **부모 컨테이너** 크기에 반응하므로 진정한 재사용 컴포넌트를 만든다.

```css
.card-container { container-type: inline-size; container-name: card; }

.card { display: block; }

@container card (min-width: 24rem) {
  .card { display: grid; grid-template-columns: 8rem 1fr; gap: var(--space-4); }
}
```

---

## 6. 반응형 전략

| 원칙 | 설명 |
| --- | --- |
| 모바일 퍼스트 | 기본 스타일은 모바일, `min-width`로 확장 |
| 콘텐츠 기반 브레이크포인트 | 디바이스가 아닌 레이아웃 깨짐 기준 |
| 상대 단위 | `rem`(레이아웃), `ch`(가독 폭), `%`/`fr`(유연 폭) |
| `clamp()` 유동 타이포 | 뷰포트에 따라 부드럽게 스케일 |

```css
/* 표준 브레이크포인트 (rem 기준) */
/* sm 36rem / md 48rem / lg 64rem / xl 80rem */

h1 {
  /* 최소 1.75rem, 선호 5vw, 최대 3rem */
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
}

.container {
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}
```

`margin-inline`, `padding-block` 등 **논리 속성(Logical Properties)**을 사용하여 다국어/RTL에 대비한다.

---

## 7. 컴포넌트 작성 예시

```css
@layer components {
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    font: inherit;
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background var(--transition), box-shadow var(--transition);
  }
  .btn:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }
  .btn--primary {
    background: var(--color-brand);
    color: #fff;
  }
  .btn--primary:hover { background: var(--color-brand-strong); }
  .btn--ghost {
    background: transparent;
    border-color: var(--color-border);
    color: var(--color-text);
  }
  .btn[disabled] { opacity: .5; cursor: not-allowed; }
}
```

`:focus-visible`로 키보드 포커스 링을 보장하는 것은 [접근성](16_ACCESSIBILITY.md) 필수 요건이다.

---

## 8. 접근성·사용자 선호 반영

```css
/* 모션 최소화 선호 존중 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 명도 대비 — 최소 텍스트 대비 4.5:1 (토큰 단계에서 검증) */
/* 터치 타깃 최소 크기 보장 */
.btn, a.nav-link { min-height: 44px; }
```

---

## 9. 성능 가이드

| 기법 | 설명 |
| --- | --- |
| 셀렉터 단순화 | 깊은 중첩·자식 결합 최소화 |
| `content-visibility` | 화면 밖 섹션 렌더 비용 절감 |
| `will-change` 신중 사용 | 합성 레이어 남발 금지 |
| 크리티컬 CSS 인라인 | 첫 화면 스타일만 `<head>`에 인라인 |
| 미사용 CSS 제거 | 빌드 시 PurgeCSS/Lightning CSS |
| `@import` 지양 | 직렬 다운로드 유발, `<link>` 사용 |

```css
.long-article section {
  content-visibility: auto;
  contain-intrinsic-size: 0 600px; /* 스크롤바 점프 방지 */
}
```

빌드 파이프라인과 번들 예산은 [프론트엔드 가이드](20_FRONTEND_GUIDE.md)를 따른다.

---

## 10. 파일 구조

```
assets/css/
├── main.css            # @layer 선언 + import 진입점
├── reset.css
├── tokens.css          # 15_DESIGN_TOKEN 동기화
├── base.css
├── layout/
│   ├── grid.css
│   └── container.css
├── components/
│   ├── button.css
│   ├── card.css
│   └── form.css
└── utilities.css
```

```css
/* main.css */
@layer reset, tokens, base, layout, components, utilities, overrides;
@import "reset.css"      layer(reset);
@import "tokens.css"     layer(tokens);
@import "base.css"       layer(base);
@import "layout/grid.css" layer(layout);
@import "components/button.css" layer(components);
@import "utilities.css"  layer(utilities);
```

> 운영 빌드에서는 `@import` 대신 번들러로 결합하여 직렬 다운로드를 방지한다.

---

## 11. 코드 리뷰 체크리스트

- [ ] 모든 값이 토큰(커스텀 프로퍼티)에서 유래 (하드코딩 없음)
- [ ] `@layer`로 캐스케이드 통제, `!important` 미사용
- [ ] ID 선택자·과도한 특이성 없음
- [ ] 네이밍 규칙(BEM/유틸리티) 준수
- [ ] 모바일 퍼스트, 논리 속성 사용
- [ ] `:focus-visible` 포커스 스타일 존재
- [ ] `prefers-reduced-motion` 대응
- [ ] 미사용 CSS 없음, 셀렉터 단순

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — 스타일이 구현하는 디자인 원칙.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — CSS로 스타일링할 컴포넌트 명세.
- [15 · 디자인 토큰](15_DESIGN_TOKEN.md) — CSS 커스텀 프로퍼티의 원천.
- [16 · 접근성](16_ACCESSIBILITY.md) — 포커스·대비·모션 요건.
- [17 · HTML 가이드](17_HTML_GUIDE.md) — 스타일을 적용할 시맨틱 마크업.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 빌드·성능 예산·CSS-in-JS 정책.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/19_JS_GUIDE.md =====

# 19 · JavaScript / TypeScript 표준 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | JavaScript/TypeScript 코딩 표준을 정의하여, 안전하고 읽기 쉬우며 테스트 가능한 클라이언트·프로토타입 코드를 일관되게 작성한다. |
| **대상 독자** | 프론트엔드 엔지니어, 퍼블리싱 엔지니어, API 엔지니어 |
| **담당(Owner) 에이전트** | Frontend Engineer |
| **참조(상위 문서)** | [HTML 가이드](17_HTML_GUIDE.md), [CSS 가이드](18_CSS_GUIDE.md), [디자인 시스템](09_DESIGN_SYSTEM.md) |
| **연계(하위 문서)** | [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [API 표준](22_API_STANDARD.md), [테스트 전략](30_TEST_STRATEGY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 기본 원칙

1. **TypeScript 우선:** 신규 코드는 TypeScript로 작성하고 `strict` 모드를 적용한다. 프로토타입 인라인 스크립트도 JSDoc 타입을 권장한다.
2. **불변성 선호:** `const`를 기본으로 하고, 객체·배열은 가급적 불변으로 다룬다.
3. **순수 함수 지향:** 부수 효과를 경계로 격리하고 입출력이 명확한 함수를 작성한다.
4. **명시적 에러 처리:** 실패를 삼키지 않는다. 모든 비동기 경로에 에러 처리를 둔다.
5. **점진적 향상:** 프로토타입은 JS 없이도 핵심 콘텐츠가 동작하도록 한다([HTML 가이드](17_HTML_GUIDE.md)).

---

## 2. 언어 기능 표준

```ts
// const / let만 사용, var 금지
const MAX_RETRY = 3;
let attempt = 0;

// 구조 분해 + 기본값
function createUser({ name, role = "guest" }: { name: string; role?: string }) {
  return { name, role, createdAt: new Date() };
}

// 옵셔널 체이닝 + 널 병합
const city = user?.address?.city ?? "미지정";

// 템플릿 리터럴
const msg = `${user.name}님, ${user.role} 권한으로 로그인했다.`;

// 전개·나머지 연산자 (불변 갱신)
const next = { ...state, loading: false };
const [first, ...rest] = items;
```

| 권장 | 비권장 |
| --- | --- |
| `const`/`let` | `var` |
| `===` / `!==` | `==` / `!=` |
| 화살표 함수(콜백) | `function`+`bind` 남발 |
| `for...of`, 배열 메서드 | 인덱스 `for` 루프(불필요 시) |
| 옵셔널 체이닝 `?.` | 중첩 `&&` 가드 |
| `Map`/`Set` | 객체를 임의 키맵으로 |

---

## 3. TypeScript 표준

```jsonc
// tsconfig.json (핵심 설정)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "isolatedModules": true
  }
}
```

```ts
// 도메인 타입: type alias로 명확히
type ProjectStatus = "draft" | "active" | "done";

interface Project {
  readonly id: string;
  title: string;
  status: ProjectStatus;
  ownerId: string;
}

// 제네릭 유틸 — API 응답 래퍼
interface ApiResult<T> {
  data: T;
  meta: { page: number; total: number };
}

// 타입 가드
function isProject(x: unknown): x is Project {
  return typeof x === "object" && x !== null && "status" in x;
}
```

규칙: `any` 금지(불가피하면 `unknown` + 타입 가드), public API에는 명시적 반환 타입, `enum` 대신 유니온 리터럴 + `as const` 선호.

---

## 4. 모듈 구조

```ts
// 명명 내보내기 우선 (트리 셰이킹·자동완성에 유리)
export function formatDate(d: Date): string { /* ... */ }
export function parseQuery(s: string): URLSearchParams { /* ... */ }

// 배럴(barrel) 파일은 신중히 — 순환 참조·번들 비대화 주의
// utils/index.ts
export * from "./date";
export * from "./query";
```

| 규칙 | 내용 |
| --- | --- |
| 모듈 = 하나의 책임 | 파일은 단일 관심사 |
| 명명 내보내기 우선 | 기본 내보내기는 최소화 |
| 절대/별칭 임포트 | `@/utils` 등 경로 별칭 |
| 순환 의존 금지 | 빌드 시 madge 등으로 검출 |

---

## 5. 비동기 패턴

```ts
// async/await 기본. Promise 체인보다 가독성 우선.
async function fetchProject(id: string): Promise<Project> {
  const res = await fetch(`/api/v1/projects/${id}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `프로젝트 조회 실패: ${id}`);
  }
  return res.json() as Promise<Project>;
}

// 병렬 처리 — 독립 작업은 동시에
const [user, projects] = await Promise.all([
  fetchUser(uid),
  fetchProjects(uid),
]);

// 부분 실패 허용
const results = await Promise.allSettled(ids.map(fetchProject));
const ok = results.filter((r) => r.status === "fulfilled");

// 타임아웃·취소 (AbortController)
async function fetchWithTimeout(url: string, ms = 5000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}
```

API 호출 규약(상태 코드, 에러 envelope)은 [API 표준](22_API_STANDARD.md)을 따른다.

---

## 6. 에러 처리

```ts
// 도메인 에러 클래스
class ApiError extends Error {
  constructor(public status: number, message: string, public cause?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

// 호출부: 의미 있는 분기 처리
try {
  const project = await fetchProject(id);
  render(project);
} catch (err) {
  if (err instanceof ApiError && err.status === 404) {
    showNotFound();
  } else {
    reportError(err);          // 관측성 도구로 전송
    showGenericError();
  }
}
```

원칙:

- **빈 `catch` 금지.** 최소한 로깅하거나 재던진다.
- 사용자에게는 친절한 메시지를, 로그에는 상세 컨텍스트를 남긴다.
- 예측 가능한 실패는 결과 타입(`Result<T, E>`)으로, 예외적 실패는 throw로 다룬다.

---

## 7. 프로토타입용 DOM / 이벤트 처리

프로토타입에서 프레임워크 없이 다룰 때의 표준 패턴이다.

```ts
// 안전한 요소 조회 (널 가드)
function $<T extends Element>(sel: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`요소를 찾을 수 없다: ${sel}`);
  return el;
}

// 이벤트 위임 — 동적 목록에 효율적
const list = $<HTMLUListElement>("#todo-list");
list.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-action='delete']");
  if (!btn) return;
  btn.closest("li")?.remove();
});

// 폼 검증 + 동적 오류 표시 (17_HTML_GUIDE의 마크업과 연동)
const form = $<HTMLFormElement>("#contact");
form.addEventListener("submit", (e) => {
  const email = $<HTMLInputElement>("#email", form);
  const err = $<HTMLElement>("#email-error", form);
  if (!email.checkValidity()) {
    e.preventDefault();
    err.hidden = false;
    email.setAttribute("aria-invalid", "true");
    email.focus();
  }
});

// 디바운스 유틸 — 입력·검색에 사용
function debounce<A extends unknown[]>(fn: (...a: A) => void, wait = 250) {
  let t: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
```

접근성을 위해 동적 오류는 `aria-invalid`·`role="alert"`와 함께 노출한다([접근성](16_ACCESSIBILITY.md)).

---

## 8. 상태 관리

| 규모 | 권장 접근 |
| --- | --- |
| 프로토타입 | 단순 모듈 상태 + 이벤트 |
| 소규모 앱 | 신호(signals)·`useState`/`useReducer` |
| 중대형 앱 | 서버 상태(TanStack Query) + 경량 클라이언트 스토어(Zustand) |

```ts
// 프레임워크 독립적 미니 스토어 (관찰 가능 패턴)
function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<(s: T) => void>();
  return {
    get: () => state,
    set: (next: Partial<T>) => {
      state = { ...state, ...next };
      listeners.forEach((fn) => fn(state));
    },
    subscribe: (fn: (s: T) => void) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
```

원칙: 서버 상태와 클라이언트 상태를 분리하고, 파생 상태는 저장하지 말고 계산한다.

---

## 9. 유틸리티 예제 코드

```ts
// 안전한 JSON 파싱
function safeParse<T>(json: string, fallback: T): T {
  try { return JSON.parse(json) as T; } catch { return fallback; }
}

// 통화 포맷 (한국 원화)
const krw = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" });
krw.format(1250000); // "₩1,250,000"

// 상대 시간 포맷
const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
rtf.format(-3, "day"); // "3일 전"

// 배열 그룹화
function groupBy<T, K extends string>(arr: T[], key: (t: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    (acc[key(item)] ??= []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
```

---

## 10. 테스트

테스트 전략 전반은 [테스트 전략](30_TEST_STRATEGY.md)을 따른다. 단위 테스트 예시(Vitest)는 다음과 같다.

```ts
import { describe, it, expect } from "vitest";
import { groupBy } from "@/utils/array";

describe("groupBy", () => {
  it("키 함수 기준으로 묶는다", () => {
    const data = [{ t: "a" }, { t: "b" }, { t: "a" }];
    const result = groupBy(data, (x) => x.t);
    expect(result.a).toHaveLength(2);
    expect(result.b).toHaveLength(1);
  });
});
```

| 계층 | 도구 | 대상 |
| --- | --- | --- |
| 단위 | Vitest/Jest | 순수 함수, 유틸 |
| 컴포넌트 | Testing Library | DOM·상호작용 |
| E2E | Playwright | 사용자 시나리오 |

테스트는 구현 세부가 아닌 **동작**을 검증한다(`getByRole` 등 접근성 기반 쿼리 사용).

---

## 11. 린팅 / 포매팅

```jsonc
// eslint (flat config 요약)
// - eslint:recommended + @typescript-eslint/strict-type-checked
// - eslint-plugin-import, jsx-a11y(React 시)
// 핵심 규칙
{
  "no-console": "warn",
  "eqeqeq": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "import/no-cycle": "error"
}
```

- 포매팅은 Prettier로 자동화하고 린트와 역할을 분리한다.
- 커밋 전 `lint-staged` + `husky`로 검사한다.
- CI에서 `tsc --noEmit`, ESLint, 테스트를 게이트로 실행한다([프론트엔드 가이드 §CI](20_FRONTEND_GUIDE.md)).

---

## 12. 코드 리뷰 체크리스트

- [ ] TypeScript `strict` 통과, `any` 없음
- [ ] 모든 비동기 경로에 에러 처리(빈 catch 없음)
- [ ] 부동 Promise(`no-floating-promises`) 없음
- [ ] 불변 갱신·`const` 기본
- [ ] DOM 접근 시 널 가드, 접근성 속성 반영
- [ ] 순환 의존 없음, 명명 내보내기 사용
- [ ] 핵심 로직 단위 테스트 존재
- [ ] ESLint/Prettier/`tsc` 통과

---

## 관련 골드위키 문서

- [17 · HTML 가이드](17_HTML_GUIDE.md) — JS가 제어하는 시맨틱 마크업.
- [18 · CSS 가이드](18_CSS_GUIDE.md) — 스타일/동작 분리 원칙.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 프레임워크·빌드·상태·CI.
- [22 · API 표준](22_API_STANDARD.md) — 클라이언트가 호출하는 API 규약.
- [16 · 접근성](16_ACCESSIBILITY.md) — DOM 동작의 접근성 요건.
- [30 · 테스트 전략](30_TEST_STRATEGY.md) — 테스트 계층과 커버리지 기준.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/20_FRONTEND_GUIDE.md =====

# 20 · 프론트엔드 엔지니어링 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 프론트엔드 스택, 프로젝트 구조, 컴포넌트 아키텍처, 성능 예산, CI 표준을 정의하여 일관되고 고품질인 사용자 인터페이스를 구현한다. |
| **대상 독자** | 프론트엔드 엔지니어, 퍼블리싱 엔지니어, 데브옵스 엔지니어, UI 디자이너 |
| **담당(Owner) 에이전트** | Frontend Engineer |
| **참조(상위 문서)** | [디자인 시스템](09_DESIGN_SYSTEM.md), [HTML 가이드](17_HTML_GUIDE.md), [CSS 가이드](18_CSS_GUIDE.md), [JS 가이드](19_JS_GUIDE.md) |
| **연계(하위 문서)** | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md), [API 표준](22_API_STANDARD.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 권장 스택과 근거

| 영역 | 표준 선택 | 근거 |
| --- | --- | --- |
| 프레임워크 | React + TypeScript (또는 Next.js) | 생태계 성숙도, 채용 용이, SSR/RSC 지원 |
| 빌드 도구 | Vite (SPA), Next.js(풀스택) | 빠른 HMR, 최적화된 번들 |
| 스타일 | CSS 모듈 + 디자인 토큰 변수 | [CSS 가이드](18_CSS_GUIDE.md)와 일관, 런타임 비용 없음 |
| 라우팅 | 파일 기반(Next) / TanStack Router | 타입 안전 라우팅 |
| 서버 상태 | TanStack Query | 캐싱·재검증·중복 제거 |
| 클라이언트 상태 | Zustand / Context(소규모) | 경량, 보일러플레이트 최소 |
| 폼 | React Hook Form + Zod | 성능·스키마 검증 일원화 |
| 테스트 | Vitest + Testing Library + Playwright | [테스트 전략](30_TEST_STRATEGY.md) 정합 |

> 스택 변경은 [의사결정 로그](32_DECISION_LOG.md)에 ADR로 기록한다. 프로토타입 단계는 [HTML 가이드](17_HTML_GUIDE.md)의 시맨틱 HTML을 출발점으로 한다.

---

## 2. 프로젝트 구조 (기능 기반)

```
src/
├── app/                  # 라우트·레이아웃·진입점
├── features/             # 기능 단위 (도메인별 응집)
│   └── projects/
│       ├── components/
│       ├── api/          # 데이터 패칭 훅
│       ├── hooks/
│       ├── types.ts
│       └── index.ts      # 공개 API (배럴)
├── components/           # 공용 UI (디자인 시스템 구현)
│   └── ui/               # Button, Card, Modal …
├── lib/                  # 프레임워크 무관 유틸 (19_JS_GUIDE)
├── styles/               # 토큰·전역 CSS (18_CSS_GUIDE)
├── hooks/                # 공용 훅
└── test/                 # 테스트 셋업
```

원칙: 기능(feature) 내부는 자유롭게, 기능 간에는 공개 `index.ts`를 통해서만 의존한다. 횡단 관심사는 `lib`/`components/ui`로 올린다.

---

## 3. 컴포넌트 아키텍처

```tsx
// 프레젠테이션 컴포넌트 — 순수, props만 의존
interface CardProps {
  title: string;
  children: React.ReactNode;
  featured?: boolean;
}
export function Card({ title, children, featured = false }: CardProps) {
  return (
    <article className={`card ${featured ? "card--featured" : ""}`}
             aria-label={title}>
      <h3 className="card__title">{title}</h3>
      <div className="card__body">{children}</div>
    </article>
  );
}

// 컨테이너 컴포넌트 — 데이터·상태 담당
export function ProjectCard({ id }: { id: string }) {
  const { data, isLoading, error } = useProject(id);
  if (isLoading) return <CardSkeleton />;
  if (error) return <ErrorState onRetry={() => location.reload()} />;
  return <Card title={data.title} featured={data.status === "active"}>{data.summary}</Card>;
}
```

| 원칙 | 설명 |
| --- | --- |
| 표현/컨테이너 분리 | 재사용성·테스트 용이 |
| 합성(Composition) 우선 | 상속 대신 children·슬롯 |
| 단일 책임 | 한 컴포넌트는 한 일 |
| 접근성 내장 | [접근성](16_ACCESSIBILITY.md) 준수 — role/aria/포커스 |
| 디자인 토큰 사용 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md)·[디자인 토큰](15_DESIGN_TOKEN.md) |

---

## 4. 라우팅 / 상태 / 데이터 패칭

```tsx
// 서버 상태: TanStack Query — 캐싱·재시도·재검증
function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => api.getProject(id),       // 22_API_STANDARD 규약
    staleTime: 60_000,
    retry: 2,
  });
}

// 변경(뮤테이션) + 낙관적 업데이트
function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.updateProject,
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: ["project", vars.id] }),
  });
}
```

| 상태 유형 | 도구 | 메모 |
| --- | --- | --- |
| 서버 상태 | TanStack Query | 단일 출처, 캐시 키 일관 |
| 전역 UI 상태 | Zustand | 테마·모달 등 |
| 지역 상태 | `useState`/`useReducer` | 컴포넌트 내부 |
| URL 상태 | 라우터 검색 파라미터 | 공유·북마크 가능 |

---

## 5. 디자인 시스템 통합

```tsx
// 토큰을 CSS 변수로 참조 — 하드코딩 금지 (18_CSS_GUIDE)
// components/ui/Button.tsx
import styles from "./Button.module.css";

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return <button className={`${styles.btn} ${styles[variant]}`} {...props} />;
}
```

- [컴포넌트 라이브러리(14)](14_COMPONENT_LIBRARY.md)의 명세 = 구현 계약. 컴포넌트는 라이브러리 문서와 1:1 대응한다.
- [디자인 토큰(15)](15_DESIGN_TOKEN.md)은 빌드 시 CSS 변수 + TS 상수로 동시 생성하여 디자인-개발 드리프트를 막는다.
- 컴포넌트 변경은 Storybook 스토리와 시각 회귀 테스트로 검증한다.

---

## 6. 성능 예산 (Core Web Vitals)

| 지표 | 목표(양호) | 한계 |
| --- | --- | --- |
| LCP (최대 콘텐츠 페인트) | < 2.5s | 4.0s |
| INP (다음 페인트까지 상호작용) | < 200ms | 500ms |
| CLS (누적 레이아웃 시프트) | < 0.1 | 0.25 |
| TTFB | < 0.8s | 1.8s |
| JS 초기 번들 (gzip) | < 170KB | 250KB |

성능 기법:

- 코드 분할(라우트·컴포넌트 단위 `lazy`/dynamic import)
- LCP 이미지 `preload` + `fetchpriority="high"` ([HTML 가이드](17_HTML_GUIDE.md))
- 폰트 `font-display: swap`, 서브셋, `woff2`
- 이미지 `srcset`/`sizes`, AVIF/WebP, 화면 밖 lazy
- 서버 컴포넌트/스트리밍으로 클라이언트 JS 최소화
- 메모이제이션은 측정 후 적용(과용 금지)

```tsx
// 라우트 단위 코드 분할
const ReportPage = lazy(() => import("@/features/report/ReportPage"));
```

번들 예산은 CI에서 `size-limit`으로 강제한다.

---

## 7. 빌드 단계 접근성

- 컴포넌트 개발 시 `eslint-plugin-jsx-a11y`로 정적 검사.
- 자동화 검사: `axe-core`(단위/E2E), Lighthouse(접근성 점수 ≥ 95).
- 수동 검사: 키보드 전용 탐색, 스크린리더(NVDA/VoiceOver), 200% 확대.
- 모든 검사는 [접근성(16)](16_ACCESSIBILITY.md) WCAG 2.2 AA 기준과 [품질 체크리스트(29)](29_QUALITY_CHECKLIST.md)를 따른다.

```ts
// 컴포넌트 접근성 테스트 (Vitest + jest-axe)
import { axe } from "vitest-axe";
it("접근성 위반이 없다", async () => {
  const { container } = render(<Button>저장</Button>);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 8. CI 체크

```yaml
# .github/workflows/frontend.yml (요약)
jobs:
  verify:
    steps:
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck     # tsc --noEmit
      - run: pnpm lint          # ESLint + jsx-a11y
      - run: pnpm test          # Vitest (커버리지)
      - run: pnpm build         # 프로덕션 빌드
      - run: pnpm size          # size-limit (번들 예산)
      - run: pnpm e2e           # Playwright (스모크)
      - run: pnpm lhci          # Lighthouse CI (성능·접근성)
```

| 게이트 | 도구 | 통과 기준 |
| --- | --- | --- |
| 타입 | `tsc` | 오류 0 |
| 린트 | ESLint | 오류 0 |
| 단위 테스트 | Vitest | 커버리지 ≥ 80% |
| 번들 크기 | size-limit | 예산 내 |
| 접근성/성능 | Lighthouse CI | 접근성 ≥ 95, 성능 ≥ 90 |
| E2E | Playwright | 핵심 시나리오 통과 |

릴리스 절차는 [릴리스 프로세스(31)](31_RELEASE_PROCESS.md)를 따른다.

---

## 9. 환경 변수 / 설정

```ts
// 타입 안전 환경 변수 검증 (Zod)
import { z } from "zod";
const env = z.object({
  VITE_API_BASE: z.string().url(),
  VITE_ENV: z.enum(["dev", "staging", "prod"]),
}).parse(import.meta.env);
```

- 비밀값을 클라이언트 번들에 포함하지 않는다(공개 키만). 시크릿 관리는 [보안 가이드](24_SECURITY_GUIDE.md).
- 환경별 설정은 빌드 타임에 검증해 잘못된 배포를 차단한다.

---

## 10. 코드 리뷰 체크리스트

- [ ] 기능 기반 구조 준수, 기능 간 공개 API로만 의존
- [ ] 컴포넌트가 [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) 명세와 일치
- [ ] 디자인 토큰 사용, 하드코딩 없음
- [ ] 서버/클라이언트 상태 분리, 캐시 키 일관
- [ ] 성능 예산 충족(번들·CWV)
- [ ] 접근성 검사 통과(axe·키보드)
- [ ] CI 게이트 전부 통과
- [ ] 비밀값 노출 없음

---

## 관련 골드위키 문서

- [09 · 디자인 시스템](09_DESIGN_SYSTEM.md) — UI 일관성의 기반.
- [14 · 컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) — 구현 계약이 되는 컴포넌트 명세.
- [17 · HTML 가이드](17_HTML_GUIDE.md) / [18 · CSS 가이드](18_CSS_GUIDE.md) / [19 · JS 가이드](19_JS_GUIDE.md) — 기반 언어 표준.
- [22 · API 표준](22_API_STANDARD.md) — 데이터 패칭 계약.
- [29 · 품질 체크리스트](29_QUALITY_CHECKLIST.md) / [30 · 테스트 전략](30_TEST_STRATEGY.md) — 품질 게이트.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 배포 절차.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/21_BACKEND_GUIDE.md =====

# 21 · 백엔드 엔지니어링 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | 백엔드 서비스의 아키텍처, 설정·시크릿, 관측성, 에러 처리, 인증·캐싱·백그라운드 잡 표준을 정의하여 견고하고 유지보수 가능한 서버를 구축한다. |
| **대상 독자** | 백엔드 엔지니어, API 엔지니어, 데이터베이스 아키텍트, 데브옵스 엔지니어, 보안 엔지니어 |
| **담당(Owner) 에이전트** | Backend Engineer |
| **참조(상위 문서)** | [API 표준](22_API_STANDARD.md), [데이터베이스 가이드](23_DATABASE_GUIDE.md), [보안 가이드](24_SECURITY_GUIDE.md) |
| **연계(하위 문서)** | [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [테스트 전략](30_TEST_STRATEGY.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 기본 원칙

1. **명확한 경계:** 도메인·애플리케이션·인프라를 분리한다(헥사고날/포트-어댑터).
2. **무상태(Stateless) 서비스:** 수평 확장을 위해 상태는 외부 저장소(DB/캐시)에 둔다.
3. **명시적 계약:** API는 [API 표준](22_API_STANDARD.md), 데이터는 [데이터베이스 가이드](23_DATABASE_GUIDE.md)를 따른다.
4. **관측 가능성 기본:** 모든 요청은 추적·로깅·메트릭으로 가시화한다.
5. **보안 내재화:** 입력 검증·인증·시크릿 관리를 설계 단계에서 반영한다([보안 가이드](24_SECURITY_GUIDE.md)).

---

## 2. 아키텍처: 레이어드 / 헥사고날

```
┌──────────────────────────────────────────────┐
│  인터페이스 어댑터 (HTTP 컨트롤러, 메시지 소비자)  │  ← 입력 포트
├──────────────────────────────────────────────┤
│  애플리케이션 계층 (유스케이스/서비스, 트랜잭션 경계)│
├──────────────────────────────────────────────┤
│  도메인 계층 (엔티티, 값 객체, 도메인 규칙)        │  ← 외부 의존 0
├──────────────────────────────────────────────┤
│  인프라 어댑터 (DB 리포지토리, 캐시, 외부 API)     │  ← 출력 포트
└──────────────────────────────────────────────┘
```

| 계층 | 책임 | 의존 방향 |
| --- | --- | --- |
| 인터페이스 | 프로토콜 변환(HTTP↔도메인), 검증 | 애플리케이션 |
| 애플리케이션 | 유스케이스 오케스트레이션, 트랜잭션 | 도메인(포트) |
| 도메인 | 비즈니스 규칙, 불변식 | 없음(순수) |
| 인프라 | 영속성·외부연동 구현 | 도메인 포트 구현 |

**의존성 규칙:** 모든 의존은 안쪽(도메인)을 향한다. 도메인은 프레임워크·DB를 알지 못한다.

---

## 3. 예시 서비스 구조

```
src/
├── interfaces/
│   └── http/
│       ├── routes/projects.controller.ts
│       └── middleware/auth.ts
├── application/
│   ├── projects/create-project.usecase.ts
│   └── ports/project.repository.ts        # 인터페이스(포트)
├── domain/
│   └── projects/
│       ├── project.entity.ts
│       └── project.errors.ts
├── infrastructure/
│   ├── db/project.repository.pg.ts         # 포트 구현(어댑터)
│   ├── cache/redis.client.ts
│   └── config/env.ts
└── shared/
    ├── logger.ts
    └── errors.ts
```

```ts
// domain/projects/project.entity.ts — 순수 도메인
export class Project {
  private constructor(
    readonly id: string,
    private _title: string,
    private _status: "draft" | "active" | "done",
  ) {}

  static create(title: string): Project {
    if (title.trim().length < 2) {
      throw new DomainError("제목은 2자 이상이어야 한다.");
    }
    return new Project(crypto.randomUUID(), title, "draft");
  }

  activate() {
    if (this._status !== "draft") throw new DomainError("초안만 활성화할 수 있다.");
    this._status = "active";
  }
}

// application/ports/project.repository.ts — 포트
export interface ProjectRepository {
  save(p: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
}

// application/projects/create-project.usecase.ts
export class CreateProjectUseCase {
  constructor(private readonly repo: ProjectRepository, private readonly log: Logger) {}
  async execute(input: { title: string }): Promise<{ id: string }> {
    const project = Project.create(input.title);
    await this.repo.save(project);
    this.log.info("project.created", { id: project.id });
    return { id: project.id };
  }
}
```

서비스 경계 원칙: 유스케이스 하나당 한 트랜잭션, 도메인 객체는 포트를 통해서만 영속화한다.

---

## 4. 설정과 시크릿

```ts
// infrastructure/config/env.ts — 시작 시 검증, 실패 시 즉시 종료
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export const env = schema.parse(process.env);
```

| 규칙 | 내용 |
| --- | --- |
| 설정은 환경 변수로 | 12-Factor 원칙, 코드와 분리 |
| 시작 시 검증 | 잘못된 설정으로 기동 금지 |
| 시크릿은 비밀 저장소 | Vault/KMS/Secrets Manager ([보안 가이드](24_SECURITY_GUIDE.md)) |
| 환경별 분리 | dev/staging/prod 격리, 운영 비밀은 운영에만 |
| 절대 커밋 금지 | `.env`는 `.gitignore`, 예시는 `.env.example` |

---

## 5. 로깅과 관측성

```ts
// 구조화 로깅 (JSON) + 상관관계 ID
logger.info("request.completed", {
  requestId: ctx.requestId,    // 추적 상관관계
  method: "POST",
  path: "/v1/projects",
  status: 201,
  durationMs: 42,
  userId: ctx.userId,
});
```

세 기둥(3 Pillars):

| 기둥 | 도구 예 | 용도 |
| --- | --- | --- |
| 로그(Logs) | 구조화 JSON, Loki/ELK | 사건 기록, 디버깅 |
| 메트릭(Metrics) | Prometheus | 처리량·지연·에러율(RED) |
| 추적(Traces) | OpenTelemetry | 분산 요청 경로 |

원칙:

- 모든 요청에 상관관계 ID(`X-Request-Id`)를 부여·전파한다.
- 로그에 비밀번호·토큰·개인정보(PII)를 남기지 않는다([보안 가이드](24_SECURITY_GUIDE.md)).
- 헬스체크(`/healthz`)와 준비성(`/readyz`) 엔드포인트를 제공한다.
- 골든 시그널(지연·트래픽·오류·포화도)에 알림을 건다.

---

## 6. 에러 처리

```ts
// shared/errors.ts — 도메인 에러 계층
export class AppError extends Error {
  constructor(readonly code: string, readonly status: number, message: string) {
    super(message);
  }
}
export class DomainError extends AppError {
  constructor(message: string) { super("DOMAIN_RULE", 422, message); }
}
export class NotFoundError extends AppError {
  constructor(resource: string) { super("NOT_FOUND", 404, `${resource}을(를) 찾을 수 없다.`); }
}

// 전역 에러 핸들러 — API 표준 envelope로 변환
function errorHandler(err: unknown, req, res) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, requestId: req.id },
    });
  }
  logger.error("unhandled", { err, requestId: req.id });
  return res.status(500).json({
    error: { code: "INTERNAL", message: "내부 서버 오류", requestId: req.id },
  });
}
```

- 에러 응답 형식은 [API 표준 §에러 envelope](22_API_STANDARD.md)와 일치시킨다.
- 예상 가능한 실패는 명시적 에러로, 예기치 못한 실패는 500 + 알림으로 처리한다.
- 내부 스택트레이스를 클라이언트에 노출하지 않는다.

---

## 7. 인증·인가 패턴

```ts
// JWT 검증 미들웨어 (24_SECURITY_GUIDE 참조)
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) throw new AppError("UNAUTHENTICATED", 401, "인증 필요");
  try {
    req.user = verifyJwt(token, env.JWT_SECRET); // 만료·서명 검증
    next();
  } catch {
    throw new AppError("UNAUTHENTICATED", 401, "유효하지 않은 토큰");
  }
}

// 역할 기반 인가(RBAC)
const requireRole = (...roles: string[]) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError("FORBIDDEN", 403, "권한 없음");
  }
  next();
};
```

| 관심사 | 표준 |
| --- | --- |
| 인증(Authn) | OAuth2 / OIDC, 단기 JWT 액세스 토큰 + 리프레시 |
| 인가(Authz) | RBAC(역할) 또는 ABAC(속성), 최소 권한 |
| 세션 | 무상태 토큰 우선, 서버 세션 시 안전 쿠키 |
| 토큰 저장 | `HttpOnly`+`Secure`+`SameSite` 쿠키 권장 |

상세 위협 모델과 통제는 [보안 가이드](24_SECURITY_GUIDE.md), 토큰 발급 흐름은 [API 표준](22_API_STANDARD.md)을 따른다.

---

## 8. 캐싱

| 계층 | 도구 | 무효화 전략 |
| --- | --- | --- |
| 애플리케이션 캐시 | Redis | TTL + 키 기반 무효화 |
| HTTP 캐시 | `Cache-Control`, `ETag` | 조건부 요청(304) |
| 쿼리/리드 모델 | 구체화 뷰/캐시 | 이벤트 기반 갱신 |

```ts
// cache-aside 패턴
async function getProject(id: string): Promise<Project> {
  const key = `project:${id}`;
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const project = await repo.findById(id);
  if (!project) throw new NotFoundError("프로젝트");
  await redis.set(key, JSON.stringify(project), "EX", 300); // 5분 TTL
  return project;
}
// 쓰기 시 무효화
async function updateProject(p: Project) {
  await repo.save(p);
  await redis.del(`project:${p.id}`);
}
```

원칙: 캐시는 정확성 다음의 최적화다. 무효화 전략을 먼저 정하고 캐시를 도입한다.

---

## 9. 백그라운드 잡 / 비동기 처리

```ts
// 큐 기반 잡 (예: BullMQ) — HTTP 요청에서 무거운 작업 분리
await emailQueue.add("send-proposal", { projectId, to }, {
  attempts: 3,
  backoff: { type: "exponential", delay: 2000 },
  removeOnComplete: 1000,
});

// 워커
emailQueue.process("send-proposal", async (job) => {
  await mailer.send(job.data);   // 멱등하게 작성 (중복 실행 대비)
});
```

| 유형 | 도구 예 | 용도 |
| --- | --- | --- |
| 작업 큐 | BullMQ/SQS | 이메일, 리포트 생성 |
| 스케줄러 | cron/잡 스케줄러 | 정기 배치 |
| 이벤트 스트림 | Kafka/Redis Stream | 비동기 도메인 이벤트 |

규칙: 잡은 멱등하게, 재시도·백오프·데드레터 큐(DLQ)를 갖춘다. 장기 작업은 동기 요청에서 분리한다.

---

## 10. 코드 리뷰 체크리스트

- [ ] 계층 경계 준수(도메인이 인프라에 의존하지 않음)
- [ ] 유스케이스당 단일 트랜잭션 경계
- [ ] 설정·시크릿이 코드에 하드코딩되지 않음, 시작 시 검증
- [ ] 구조화 로깅 + 상관관계 ID, PII 미노출
- [ ] 에러가 [API 표준](22_API_STANDARD.md) envelope로 변환됨
- [ ] 인증/인가 적용, 최소 권한
- [ ] 캐시 무효화 전략 명시
- [ ] 백그라운드 잡 멱등·재시도 처리
- [ ] 단위·통합 테스트 존재([테스트 전략](30_TEST_STRATEGY.md))

---

## 관련 골드위키 문서

- [22 · API 표준](22_API_STANDARD.md) — HTTP 계약·에러 형식·인증 흐름.
- [23 · 데이터베이스 가이드](23_DATABASE_GUIDE.md) — 영속성·트랜잭션·마이그레이션.
- [24 · 보안 가이드](24_SECURITY_GUIDE.md) — 인증·시크릿·데이터 보호.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — 클라이언트 통합 지점.
- [30 · 테스트 전략](30_TEST_STRATEGY.md) — 단위·통합·계약 테스트.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 배포·롤백 절차.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/22_API_STANDARD.md =====

# 22 · API 표준

| 항목 | 내용 |
| --- | --- |
| **목적** | REST API의 설계·네이밍·버저닝·에러·인증·페이지네이션·웹훅 표준을 정의하여 일관되고 예측 가능한 인터페이스 계약을 보장한다. |
| **대상 독자** | API 엔지니어, 백엔드 엔지니어, 프론트엔드 엔지니어, QA 엔지니어 |
| **담당(Owner) 에이전트** | API Engineer |
| **참조(상위 문서)** | [백엔드 가이드](21_BACKEND_GUIDE.md), [보안 가이드](24_SECURITY_GUIDE.md), [데이터베이스 가이드](23_DATABASE_GUIDE.md) |
| **연계(하위 문서)** | [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [테스트 전략](30_TEST_STRATEGY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 설계 원칙

1. **리소스 중심:** URL은 명사(리소스)로, 동작은 HTTP 메서드로 표현한다.
2. **계약 우선(Contract First):** OpenAPI 3.1 명세를 단일 진실로 삼고 코드·문서·목(mock)을 생성한다.
3. **일관성:** 네이밍·에러·페이지네이션 규약을 모든 엔드포인트에 동일 적용한다.
4. **하위 호환:** 변경은 가산적으로. 파괴적 변경은 버전을 올린다.
5. **안전 기본:** 인증·레이트리밋·입력 검증을 표준으로 한다([보안 가이드](24_SECURITY_GUIDE.md)).

---

## 2. 리소스 설계와 네이밍

| 규칙 | 좋은 예 | 나쁜 예 |
| --- | --- | --- |
| 복수 명사, 소문자, 케밥/단일어 | `/projects` | `/getProject` |
| 계층은 중첩으로 | `/projects/{id}/tasks` | `/projectTasks?pid=` |
| 동사 금지(메서드로 표현) | `POST /projects` | `/createProject` |
| 필드는 `snake_case`(혹은 일관된 한 가지) | `created_at` | 혼용 |

```
GET    /v1/projects             # 목록
POST   /v1/projects             # 생성
GET    /v1/projects/{id}        # 단건 조회
PATCH  /v1/projects/{id}        # 부분 수정
PUT    /v1/projects/{id}        # 전체 교체
DELETE /v1/projects/{id}        # 삭제
GET    /v1/projects/{id}/tasks  # 하위 리소스
```

복잡한 동작은 하위 리소스/액션으로: `POST /v1/projects/{id}/activate`.

---

## 3. HTTP 메서드와 상태 코드

| 메서드 | 멱등성 | 의미 | 성공 코드 |
| --- | --- | --- | --- |
| GET | O | 조회 | 200 |
| POST | X | 생성/액션 | 201(생성), 200/202 |
| PUT | O | 전체 교체 | 200 / 204 |
| PATCH | △ | 부분 수정 | 200 |
| DELETE | O | 삭제 | 204 |

| 코드 | 의미 | 사용 시점 |
| --- | --- | --- |
| 200 | 성공 | 조회·수정 |
| 201 | 생성됨 | POST 생성, `Location` 헤더 포함 |
| 202 | 접수됨 | 비동기 처리 시작 |
| 204 | 내용 없음 | 삭제·교체 성공 |
| 400 | 잘못된 요청 | 형식 오류 |
| 401 | 미인증 | 토큰 없음/무효 |
| 403 | 권한 없음 | 인가 실패 |
| 404 | 없음 | 리소스 부재 |
| 409 | 충돌 | 중복·상태 충돌 |
| 422 | 처리 불가 | 검증 실패(의미적) |
| 429 | 요청 과다 | 레이트리밋 |
| 500 | 서버 오류 | 예기치 못한 실패 |

---

## 4. 버저닝

| 전략 | 표기 | 채택 |
| --- | --- | --- |
| URL 경로 버전 | `/v1/projects` | **표준 채택** — 명확·캐시 친화 |
| 헤더 버전 | `Accept: application/vnd.gw.v1+json` | 보조 |

- 메이저 버전만 URL에 노출(`v1`, `v2`). 마이너 변경은 가산적이며 버전 불변.
- 폐기(deprecation)는 `Deprecation`/`Sunset` 헤더와 문서로 최소 6개월 사전 고지한다.
- 호환성 정책과 변경 절차는 [릴리스 프로세스](31_RELEASE_PROCESS.md) 및 [의사결정 로그](32_DECISION_LOG.md)에 기록한다.

---

## 5. 페이지네이션 · 필터 · 정렬

```
GET /v1/projects?status=active&sort=-created_at&page[size]=20&page[cursor]=eyJpZCI6...
```

- **커서 기반(cursor) 권장**: 대용량·실시간 데이터에 안정적. 오프셋은 소규모 목록에만.
- 필터: `?field=value`, 범위는 `?created_at[gte]=2026-01-01`.
- 정렬: `?sort=field`(오름차), `?sort=-field`(내림차), 다중은 콤마.

```jsonc
// 목록 응답 — 메타 + 링크
{
  "data": [ { "id": "p_1", "title": "RFP 분석" } ],
  "meta": { "count": 20, "has_more": true },
  "links": { "next": "/v1/projects?page[cursor]=eyJpZCI6..." }
}
```

---

## 6. 에러 Envelope

모든 에러는 동일 구조로 반환한다([백엔드 가이드 §에러 처리](21_BACKEND_GUIDE.md)와 정합).

```jsonc
{
  "error": {
    "code": "VALIDATION_FAILED",     // 기계 판독용 안정 코드
    "message": "요청을 처리할 수 없다.", // 사람용 메시지(한국어)
    "request_id": "req_01H...",        // 추적 상관관계
    "details": [
      { "field": "title", "issue": "최소 2자 이상이어야 한다." }
    ]
  }
}
```

| 필드 | 설명 |
| --- | --- |
| `code` | 버전 간 안정적인 식별자(대문자 스네이크) |
| `message` | 사용자 표시용 한국어 메시지 |
| `request_id` | 로그·추적 연계용 |
| `details` | 필드 단위 검증 오류(선택) |

---

## 7. 멱등성(Idempotency)

```
POST /v1/payments
Idempotency-Key: 5f3c2b1a-...

# 같은 키로 재요청 시 동일 결과 반환(중복 생성 방지)
```

- 생성·결제 등 비멱등 POST에는 `Idempotency-Key` 헤더를 지원한다.
- 키-응답 매핑을 일정 기간(예: 24h) 저장하여 재시도 시 캐시된 결과를 반환한다.
- 네트워크 재시도가 안전하도록 클라이언트는 동일 키를 재사용한다.

---

## 8. 인증 (OAuth2 / JWT)

```
# 액세스 토큰으로 호출
GET /v1/projects
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
```

| 흐름 | 용도 |
| --- | --- |
| Authorization Code + PKCE | 웹/모바일 사용자 로그인 |
| Client Credentials | 서버 간(M2M) 통신 |
| Refresh Token | 단기 액세스 토큰 갱신 |

원칙:

- 액세스 토큰은 단기(예: 15분), 리프레시 토큰은 회전(rotation)한다.
- 스코프(`projects:read`, `projects:write`)로 최소 권한을 부여한다.
- 토큰 검증·저장·전송 표준은 [보안 가이드](24_SECURITY_GUIDE.md)를 따른다.

---

## 9. 레이트리밋(Rate Limiting)

```
HTTP/1.1 429 Too Many Requests
RateLimit-Limit: 1000
RateLimit-Remaining: 0
RateLimit-Reset: 35
Retry-After: 35
```

- 표준 헤더(`RateLimit-*`, `Retry-After`)로 한도와 회복 시간을 알린다.
- 키 단위(사용자/클라이언트/IP)로 한도를 설정하고, 한도 초과는 429로 응답한다.
- 클라이언트는 `Retry-After`를 존중하여 지수 백오프로 재시도한다.

---

## 10. OpenAPI 계약 예시

```yaml
openapi: 3.1.0
info:
  title: Goldwiki Project API
  version: 1.0.0
paths:
  /v1/projects:
    post:
      summary: 프로젝트 생성
      security: [{ bearerAuth: ["projects:write"] }]
      parameters:
        - in: header
          name: Idempotency-Key
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/ProjectCreate" }
      responses:
        "201":
          description: 생성됨
          headers:
            Location: { schema: { type: string } }
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Project" }
        "422":
          description: 검증 실패
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Error" }
components:
  securitySchemes:
    bearerAuth: { type: http, scheme: bearer, bearerFormat: JWT }
  schemas:
    ProjectCreate:
      type: object
      required: [title]
      properties:
        title: { type: string, minLength: 2, maxLength: 120 }
    Project:
      type: object
      properties:
        id: { type: string }
        title: { type: string }
        status: { type: string, enum: [draft, active, done] }
        created_at: { type: string, format: date-time }
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code: { type: string }
            message: { type: string }
            request_id: { type: string }
```

OpenAPI 명세는 계약 테스트의 기준이 된다([테스트 전략](30_TEST_STRATEGY.md)).

---

## 11. 웹훅(Webhooks)

```jsonc
// 발신 이벤트 페이로드
POST https://client.example.com/hooks
X-GW-Event: project.activated
X-GW-Signature: sha256=...      // HMAC 서명으로 위변조 방지
X-GW-Delivery: dlv_01H...
{
  "id": "evt_01H...",
  "type": "project.activated",
  "created_at": "2026-06-26T10:00:00Z",
  "data": { "project_id": "p_1" }
}
```

| 규칙 | 내용 |
| --- | --- |
| 서명 검증 | HMAC-SHA256 시그니처 필수 |
| 멱등 처리 | 수신 측은 `id`로 중복 무시 |
| 재시도 | 2xx 외 응답 시 지수 백오프 재시도 |
| 빠른 응답 | 수신 즉시 2xx, 처리는 비동기(큐) |

---

## 12. API 리뷰 체크리스트

- [ ] 리소스 중심 URL, 동사 미사용
- [ ] 올바른 메서드·상태 코드
- [ ] 일관된 페이지네이션·필터·정렬
- [ ] 표준 에러 envelope + `request_id`
- [ ] 비멱등 생성에 `Idempotency-Key` 지원
- [ ] 인증·스코프·레이트리밋 적용
- [ ] OpenAPI 명세 최신화 및 계약 테스트 통과
- [ ] 웹훅 서명·재시도·멱등 처리

---

## 관련 골드위키 문서

- [21 · 백엔드 가이드](21_BACKEND_GUIDE.md) — API를 구현하는 서비스 아키텍처.
- [23 · 데이터베이스 가이드](23_DATABASE_GUIDE.md) — 리소스의 영속 모델.
- [24 · 보안 가이드](24_SECURITY_GUIDE.md) — 인증·서명·입력 검증.
- [20 · 프론트엔드 가이드](20_FRONTEND_GUIDE.md) — API를 소비하는 클라이언트.
- [30 · 테스트 전략](30_TEST_STRATEGY.md) — 계약·통합 테스트.
- [31 · 릴리스 프로세스](31_RELEASE_PROCESS.md) — 버전 폐기·배포 절차.

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/23_DATABASE_GUIDE.md =====

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




===== 파일: GoldWiki/24_SECURITY_GUIDE.md =====

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




===== 파일: GoldWiki/25_AI_GUIDE.md =====

# 25 · 워크스페이스 AI 엔지니어링 가이드

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 멀티에이전트 AI 워크스페이스를 안전하고 일관되며 비용 효율적으로 운영하기 위한 공학 표준을 정의한다. |
| **대상 독자** | AI Engineer, Backend Engineer, Project Director, QA Engineer 및 AI 산출물을 다루는 모든 에이전트 |
| **담당(Owner) 에이전트** | AI Engineer |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [비즈니스 목표](02_BUSINESS_GOALS.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **연계(하위 문서)** | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md), [프롬프트 라이브러리](40_PROMPT_LIBRARY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 개요: 골드위키는 조직의 두뇌다

골드위키 디지털의 운영 모델은 **AI 증강(AI-Augmented)** 방식이다. RFP 분석부터 제안, UX/UI, 프로토타입, 개발, QA까지 전 과정을 22개의 전문 AI 서브에이전트가 수행하며, 모든 지식과 의사결정의 단일 진실 공급원(SSOT, Single Source of Truth)은 **골드위키(`/GoldWiki`)**다.

본 가이드의 제1원칙은 다음과 같다.

> 모든 AI 에이전트는 작업·판단 전에 반드시 골드위키를 먼저 참조한다. 모델의 사전학습 지식보다 골드위키의 명시적 컨텍스트가 항상 우선한다.

이 원칙을 통해 환각(hallucination)을 줄이고, 조직 일관성을 확보하며, 지식 중복을 방지한다.

---

## 2. 멀티에이전트 시스템 동작 방식

### 2.1 구조

골드위키 워크스페이스는 **오케스트레이터(Orchestrator) + 전문 서브에이전트** 구조로 동작한다.

```mermaid
flowchart TD
    O[오케스트레이터<br/>Project Director] --> A1[Proposal Strategist]
    O --> A2[UX Researcher]
    O --> A3[UI Designer]
    O --> A4[Frontend Engineer]
    O --> A5[QA Engineer]
    A1 -. 읽기/갱신 .-> GW[(골드위키 SSOT)]
    A2 -. 읽기/갱신 .-> GW
    A3 -. 읽기/갱신 .-> GW
    A4 -. 읽기/갱신 .-> GW
    A5 -. 읽기/갱신 .-> GW
    O -. 게이트 검수 .-> GW
```

- **오케스트레이터**: 과업을 분해하고, 적합한 서브에이전트에 위임하며, 단계 간 품질 게이트를 통과시킨다.
- **서브에이전트**: 단일 책임 원칙(Single Responsibility)에 따라 자기 도메인만 수행한다. 22개 에이전트의 레지스트리는 [서브에이전트 규칙](28_SUBAGENT_RULES.md)에 정의되어 있다.
- **공유 메모리**: 모든 에이전트는 골드위키를 통해 비동기로 소통한다. 직접 호출이 아니라 **문서를 매개로 한 인계(handoff)**가 기본이다.

### 2.2 에이전트 통신 패턴

| 패턴 | 설명 | 사용 예 |
| --- | --- | --- |
| 순차 위임(Sequential) | 단계별로 결과를 다음 에이전트에 인계 | RFP 분석 → 제안 전략 |
| 병렬 팬아웃(Fan-out) | 독립 과업을 동시 실행 후 취합 | 경쟁사 벤치마크 + 글로벌 베스트프랙티스 벤치마크 |
| 평가자-실행자(Evaluator-Executor) | 한 에이전트가 산출, 다른 에이전트가 검수 | UI Designer 산출 → QA Engineer 검수 |
| 사람 개입(Human-in-the-loop) | 게이트에서 사람 승인 필요 | 최종 제안서 클라이언트 제출 전 |

### 2.3 컨텍스트 인계 규약

인계 시 다음 메타데이터를 항상 포함한다.

```json
{
  "from_agent": "ux-researcher",
  "to_agent": "ui-designer",
  "artifact": "11_INFORMATION_ARCHITECTURE.md",
  "decision_refs": ["32_DECISION_LOG.md#D-2026-041"],
  "open_questions": ["로그인 진입 동선 2안 중 택1 필요"],
  "quality_gate_passed": true
}
```

---

## 3. 모델 선택(Claude 모델 패밀리)

골드위키 워크스페이스는 Anthropic의 Claude 모델 패밀리를 사용한다. 과업의 **복잡도·지연·비용** 삼각 균형을 기준으로 모델 등급을 선택한다.

| 모델 등급 | 대표 특성 | 적합 과업 | 골드위키 내 사용 예 |
| --- | --- | --- | --- |
| **상위 추론 모델**(Opus 계열) | 최고 수준 추론·장문 분석·복잡한 의사결정 | 심층 분석, 전략 수립, 모호성 큰 합성 작업 | RFP 숨은기대 추출, 제안 전략, 아키텍처 설계 |
| **균형 모델**(Sonnet 계열) | 추론·속도·비용의 균형 | 일상적 산출물 생성, 코드 작성, 문서화 | 화면 목록 작성, HTML 프로토타입, QA 케이스 |
| **경량 모델**(Haiku 계열) | 빠르고 저렴, 단순 과업 최적 | 분류, 추출, 라우팅, 요약 1차 패스 | 문서 태깅, 단순 요약, 라우팅 판단 |

> 정확한 모델 ID·가격·컨텍스트 한도는 시점에 따라 변하므로, 운영 전 반드시 최신 Anthropic 공식 문서(또는 `claude-api` 스킬)로 확인한다. 본 가이드는 **선택 기준**만 규정하고 구체 수치는 명시하지 않는다.

### 3.1 모델 선택 의사결정 규칙

1. 과업이 **모호하거나 전략적 판단**을 요하면 상위 추론 모델을 쓴다.
2. 과업이 **명확한 산출 형식과 절차**를 가지면 균형 모델을 기본으로 한다.
3. 과업이 **대량·반복·단순**하면 경량 모델로 비용을 절감한다.
4. 동일 파이프라인 안에서 **모델 혼합(model cascading)**을 적극 활용한다. 예: 경량 모델로 1차 추출 → 균형 모델로 정제 → 상위 모델로 최종 검수.

---

## 4. 골드위키 기반 컨텍스트와 RAG

### 4.1 컨텍스트 주입 원칙

에이전트는 작업 시작 시 **관련 골드위키 문서를 컨텍스트로 주입**한다. 전체 문서를 무분별하게 넣지 않고, 과업과 관련된 문서만 선별한다(토큰 비용·정확도 모두를 위해).

| 과업 유형 | 필수 주입 문서 |
| --- | --- |
| RFP 분석 | [03](03_RFP_FRAMEWORK.md), [04](04_RFP_ANALYSIS.md), [34](34_CLIENT_KNOWLEDGE.md) |
| UX 설계 | [07](07_UX_PRINCIPLES.md), [11](11_INFORMATION_ARCHITECTURE.md), [12](12_USER_FLOW.md) |
| UI/디자인 | [08](08_UI_GUIDELINES.md), [09](09_DESIGN_SYSTEM.md), [15](15_DESIGN_TOKEN.md) |
| 개발 | [17](17_HTML_GUIDE.md)~[24](24_SECURITY_GUIDE.md) |
| 모든 과업 | [37](37_BEST_PRACTICES.md), [39](39_COMMON_ERRORS.md) |

### 4.2 RAG 파이프라인

```mermaid
flowchart LR
    Q[과업 질의] --> R[검색: 관련 골드위키 문서]
    R --> F[선별/랭킹]
    F --> C[컨텍스트 구성<br/>인용 출처 포함]
    C --> M[모델 추론]
    M --> V[출처 검증]
    V --> A[산출물 + 인용]
```

- **검색**: 과업 키워드로 골드위키 문서·섹션을 검색한다.
- **랭킹/선별**: 관련도 높은 상위 N개만 컨텍스트에 포함한다.
- **인용 강제**: 골드위키에서 가져온 사실은 반드시 출처 문서·섹션을 표기한다. 출처 없는 단정은 금지한다.
- **검증**: 산출 후 인용된 출처가 실제로 그 내용을 뒷받침하는지 확인한다.

### 4.3 컨텍스트 신선도

골드위키가 SSOT이므로, 에이전트는 **캐시된 기억이 아니라 현재 문서 상태**를 읽어야 한다. 의사결정이 바뀌면 [의사결정 로그](32_DECISION_LOG.md)가 우선한다.

---

## 5. 도구 사용(Tool Use)

에이전트는 추론만으로 부족한 작업에 도구를 호출한다.

| 도구 범주 | 용도 | 주의사항 |
| --- | --- | --- |
| 파일 읽기/쓰기 | 골드위키·산출물 입출력 | 절대경로 사용, 기존 문서 우선 수정 |
| 검색(Grep/Glob) | 코드·문서 탐색 | 광범위 탐색은 검색 도구로 |
| 웹 검색/페치 | 외부 벤치마크·표준 확인 | 출처 신뢰도 검증, 인용 보존 |
| 코드 실행 | 빌드·테스트·린트 | 샌드박스 정책 준수 |

### 5.1 도구 사용 규칙

1. **최소 권한 원칙**: 과업에 필요한 도구만 사용한다.
2. **결정적 도구 우선**: 계산·검증·조회는 모델 추측 대신 도구로 처리한다.
3. **도구 결과 검증**: 도구 출력이 비정상이면 재시도·대체 전략을 적용한다(에러 패턴은 [공통 오류](39_COMMON_ERRORS.md) 참조).
4. **부작용 통제**: 외부 시스템 변경(파일 쓰기, API 호출)은 게이트 통과 후 수행한다.

---

## 6. 평가(Evaluation)와 가드레일(Guardrails)

### 6.1 평가 체계

| 평가 유형 | 방법 | 적용 시점 |
| --- | --- | --- |
| 규칙 기반(Rule-based) | 형식·필수 항목·금지어 자동 검사 | 산출 직후 |
| LLM 평가자(LLM-as-Judge) | 별도 모델이 품질 루브릭으로 채점 | 게이트 통과 전 |
| 골든셋 회귀(Golden Set) | 검증된 정답 사례와 비교 | 프롬프트/모델 변경 시 |
| 사람 검수(Human Review) | 전문가 최종 확인 | 클라이언트 제출 전 |

평가 루브릭 예시(제안서 요약):

| 기준 | 배점 | 합격선 |
| --- | --- | --- |
| 요구사항 충족 정확도 | 30 | 27 이상 |
| 숨은 기대 반영 | 20 | 16 이상 |
| 논리 일관성 | 20 | 16 이상 |
| 골드위키 근거 인용 | 15 | 12 이상 |
| 한국어 표현 품질 | 15 | 12 이상 |

### 6.2 가드레일

| 가드레일 | 통제 내용 |
| --- | --- |
| 입력 가드레일 | 민감정보·기밀 RFP 데이터 처리 정책, 프롬프트 인젝션 탐지 |
| 출력 가드레일 | 금지 표현(추측성 단정, 미확인 수치) 차단, 형식 강제 |
| 범위 가드레일 | 에이전트가 자기 도메인 밖 결정을 내리지 못하도록 제한 |
| 인용 가드레일 | 출처 없는 사실 주장 차단 |

---

## 7. 비용(Cost)과 지연(Latency)

### 7.1 비용 최적화 전략

| 전략 | 설명 | 절감 효과 |
| --- | --- | --- |
| 모델 캐스케이딩 | 단순 단계는 경량 모델로 처리 | 높음 |
| 프롬프트 캐싱 | 반복되는 시스템 프롬프트·골드위키 컨텍스트 캐시 | 높음 |
| 컨텍스트 선별 | 관련 문서만 주입, 토큰 절감 | 중간 |
| 배치 처리 | 비실시간 과업은 묶어서 처리 | 중간 |
| 조기 종료 | 게이트 미통과 시 후속 단계 중단 | 중간 |

### 7.2 지연 관리

- 대화형/클라이언트 대면 과업은 빠른 모델·스트리밍 응답을 우선한다.
- 백그라운드 합성 과업(전체 RFP 분석 등)은 지연보다 품질을 우선한다.
- 병렬 팬아웃으로 전체 파이프라인 지연을 단축한다.

### 7.3 모니터링 지표

| 지표 | 설명 | 목표 |
| --- | --- | --- |
| 토큰/과업 | 과업당 평균 토큰 소비 | 추세 하향 |
| 비용/납품물 | 산출물 1건당 모델 비용 | 예산 내 |
| p95 지연 | 응답 95퍼센타일 지연 | 합의 SLA 내 |
| 캐시 적중률 | 프롬프트 캐시 적중 비율 | 상향 |

---

## 8. 환각 완화(Hallucination Mitigation)

| 기법 | 적용 방법 |
| --- | --- |
| 근거 강제(Grounding) | 골드위키·도구 결과만 사실 근거로 인정, 인용 필수 |
| 불확실성 표명 | 모르는 것은 "확인 필요"로 명시, 추측 금지 |
| 검증 패스 | 산출 후 별도 검증 단계(셀프 체크 또는 LLM 평가자) |
| 구조화 출력 | 스키마 강제로 임의 생성 여지 축소 |
| 출처 대조 | 인용 문서가 실제로 주장을 뒷받침하는지 대조 |

환각 위험 신호: 구체적 수치·날짜·고유명사가 출처 없이 등장, 골드위키에 없는 "사실" 주장, 과도하게 단정적인 어조.

---

## 9. 휴먼인더루프(Human-in-the-Loop) 정책

| 게이트 | 사람 승인 필요 여부 | 승인자 |
| --- | --- | --- |
| RFP 분석 결과 확정 | 권장 | Project Director |
| 제안 전략 확정 | 필수 | Sales Director, Project Director |
| 디자인 시스템 채택 | 필수 | UI Designer 리드, Project Director |
| 클라이언트 산출물 제출 | 필수 | Project Director (+ CEO 중대 건) |
| 운영 환경 릴리스 | 필수 | DevOps Engineer + Project Director |

원칙: **되돌릴 수 없거나 외부에 노출되는 결정**은 반드시 사람 승인을 거친다. 에스컬레이션 경로는 [서브에이전트 규칙](28_SUBAGENT_RULES.md)의 에스컬레이션 매트릭스를 따른다.

---

## 관련 골드위키 문서

- [26_PROMPT_ENGINEERING.md](26_PROMPT_ENGINEERING.md) — 에이전트 프롬프트 설계 표준
- [27_AUTOMATION_WORKFLOW.md](27_AUTOMATION_WORKFLOW.md) — RFP→납품 자율 파이프라인
- [28_SUBAGENT_RULES.md](28_SUBAGENT_RULES.md) — 22개 서브에이전트 공통 규칙과 레지스트리
- [29_QUALITY_CHECKLIST.md](29_QUALITY_CHECKLIST.md) — AI 출력 품질 체크리스트
- [40_PROMPT_LIBRARY.md](40_PROMPT_LIBRARY.md) — 재사용 프롬프트 모음
- [37_BEST_PRACTICES.md](37_BEST_PRACTICES.md) — 조직 베스트 프랙티스
- [39_COMMON_ERRORS.md](39_COMMON_ERRORS.md) — 반복 오류와 대응

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/26_PROMPT_ENGINEERING.md =====

# 26 · 프롬프트 엔지니어링 표준

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 모든 AI 에이전트가 일관되고 신뢰할 수 있는 프롬프트를 설계·운영하기 위한 표준을 정의한다. |
| **대상 독자** | AI Engineer, 모든 서브에이전트 작성자, Documentation Specialist |
| **담당(Owner) 에이전트** | AI Engineer |
| **참조(상위 문서)** | [AI 가이드](25_AI_GUIDE.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **연계(하위 문서)** | [프롬프트 라이브러리](40_PROMPT_LIBRARY.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md), [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 원칙

프롬프트는 골드위키 디지털의 **실행 코드**다. 코드처럼 버전 관리하고, 테스트하고, 재사용한다. 모든 프롬프트는 골드위키를 먼저 참조하도록 설계한다.

핵심 원칙:

1. **명확성 우선**: 모호함은 환각과 재작업의 원인이다.
2. **근거 기반**: 사실은 골드위키·도구 결과에서만 가져오게 한다.
3. **구조화**: 출력 형식을 명시적으로 강제한다.
4. **재사용**: 검증된 패턴은 [프롬프트 라이브러리](40_PROMPT_LIBRARY.md)에 등재한다.

---

## 2. 프롬프트 구성요소

모든 프롬프트는 다음 6개 블록으로 구성한다(RCTCFE 모델).

| 블록 | 한국어 명칭 | 역할 |
| --- | --- | --- |
| Role | 역할 | 에이전트의 정체성·전문성·관점 정의 |
| Context | 맥락 | 골드위키 근거, 프로젝트 배경, 클라이언트 정보 |
| Task | 과업 | 수행할 구체적 작업 한 가지 |
| Constraints | 제약 | 하지 말 것, 범위, 분량, 톤, 언어(한국어) |
| Format | 형식 | 출력 구조(표/JSON/마크다운/섹션) |
| Examples | 예시 | few-shot 입출력 예 |

### 2.1 기본 골격 템플릿

```text
[역할]
당신은 골드위키 디지털의 {에이전트명}이다. {핵심 전문성}을 갖추었다.
작업 전 반드시 골드위키 관련 문서를 먼저 참조한다.

[맥락]
- 프로젝트: {프로젝트명}
- 참조 골드위키: {문서 목록과 핵심 발췌}
- 클라이언트 배경: {요지}

[과업]
{단일하고 명확한 과업}

[제약]
- 모든 출력은 한국어로 작성한다.
- 골드위키에 근거 없는 사실은 단정하지 않는다(불확실하면 "확인 필요"로 표기).
- 분량: {예: 표 형식, 최대 N항목}

[형식]
{출력 스키마/구조}

[예시]
입력: {...}  →  출력: {...}
```

---

## 3. 역할·맥락·과업·제약·형식 상세

### 3.1 역할(Role) 설계

- 직무명, 전문 영역, 판단 관점을 구체화한다. "당신은 도우미다"는 금지.
- 좋은 예: "당신은 골드위키 디지털의 UX Researcher다. 정량·정성 리서치를 통합해 정보구조(IA) 가설을 수립한다."

### 3.2 맥락(Context) 설계

- 골드위키 발췌를 **인용 가능한 형태**로 삽입한다.
- 출처 라벨을 붙인다: `[출처: 04_RFP_ANALYSIS.md §요구사항]`.

### 3.3 과업(Task) 설계

- 한 프롬프트는 **하나의 과업**만. 복합 과업은 파이프라인으로 분해한다([27](27_AUTOMATION_WORKFLOW.md) 참조).
- 동사로 시작: "추출하라", "분류하라", "요약하라", "설계하라".

### 3.4 제약(Constraints) 설계

| 제약 유형 | 예시 |
| --- | --- |
| 언어 | "모든 출력은 자연스러운 실무 한국어" |
| 근거 | "근거 없는 수치·날짜 금지" |
| 범위 | "UX 영역만 다루고 UI 결정은 하지 않음" |
| 분량/형식 | "표로, 최대 10행" |
| 톤 | "격식 있는 비즈니스 문어체" |

### 3.5 형식(Format) 설계

출력 형식을 명시하면 후처리·평가가 쉬워진다.

```json
{
  "requirements": [
    {"id": "R-01", "category": "기능", "text": "...", "priority": "필수", "source": "RFP p.12"}
  ],
  "open_questions": ["..."]
}
```

---

## 4. Few-shot 프롬프팅

few-shot은 형식·톤·판단 기준을 예시로 가르치는 기법이다.

| 상황 | 권장 샷 수 |
| --- | --- |
| 형식이 단순·명확 | 0~1샷 |
| 분류·라벨링 | 2~5샷(경계 사례 포함) |
| 복잡한 판단·톤 | 3~5샷(다양한 케이스) |

설계 원칙:
- 예시는 **대표성**과 **경계 사례**를 함께 담는다.
- 예시 입출력은 실제 골드위키 형식과 일치시킨다.
- 예시가 길어 토큰이 부담되면, 핵심 패턴만 압축한다.

few-shot 예시(요구사항 우선순위 분류):

```text
입력: "사용자는 SSO로 로그인할 수 있어야 한다." → 출력: {priority: "필수", reason: "인증 핵심 기능"}
입력: "다크 모드를 지원하면 좋겠다." → 출력: {priority: "선택", reason: "선호 표현('좋겠다')"}
```

---

## 5. CoT(사고연쇄) vs 직접 응답

| 기법 | 사용 시점 | 주의 |
| --- | --- | --- |
| **CoT(Chain-of-Thought)** | 다단계 추론, 분석, 모호성 큰 합성 | 추론 과정을 출력에 노출할지 결정(클라이언트 산출물은 결론만) |
| **직접 응답(Direct)** | 분류·추출·형식 변환 등 명확 과업 | 불필요한 추론은 비용·지연만 증가 |

CoT 운영 규칙:
- 내부 추론은 별도 영역(예: `<scratch>`)에 두고 최종 산출에서 제거한다.
- "단계별로 생각하라"는 지시는 복잡 과업에만 선택적으로 적용한다.
- RFP 숨은기대 추출·리스크 분석 등은 CoT 권장, 화면 목록 작성은 직접 응답 권장.

---

## 6. 구조화 출력(Structured Output)

| 방법 | 설명 |
| --- | --- |
| JSON 스키마 강제 | 후처리·평가·파이프라인 연결에 최적 |
| 마크다운 표/섹션 | 사람이 읽는 골드위키 문서 산출 시 |
| 마커 구분 | `===섹션===` 등으로 영역 분리 |

원칙: 산출물이 **다음 에이전트의 입력**이 되면 JSON, **사람이 읽는 문서**면 골드위키 마크다운 형식을 따른다.

---

## 7. 평가와 반복(Iteration)

프롬프트는 한 번에 완성되지 않는다. 측정 → 개선 사이클을 돈다.

```mermaid
flowchart LR
    D[프롬프트 초안] --> T[골든셋 테스트]
    T --> E[평가: 루브릭 채점]
    E --> A{합격선?}
    A -- 아니오 --> R[원인 분석·개선]
    R --> D
    A -- 예 --> P[프롬프트 라이브러리 등재]
```

평가 항목: 정확도, 형식 준수율, 근거 인용률, 한국어 품질, 토큰 효율. 평가 방법은 [AI 가이드 §6](25_AI_GUIDE.md)를 따른다.

---

## 8. 프롬프트 버전 관리

프롬프트는 코드처럼 버전을 관리한다.

| 항목 | 규칙 |
| --- | --- |
| 식별자 | `PRM-{도메인}-{일련}` 예: `PRM-RFP-007` |
| 버전 | SemVer 적용: `v1.2.0`([릴리스 프로세스](31_RELEASE_PROCESS.md) 참조) |
| 변경 기록 | 변경 사유·평가 결과를 [의사결정 로그](32_DECISION_LOG.md)에 기록 |
| 저장소 | [프롬프트 라이브러리](40_PROMPT_LIBRARY.md)가 정본 |

버전 메타데이터 예시:

```yaml
id: PRM-RFP-007
version: v1.3.0
owner: ai-engineer
model_tier: 상위 추론
eval_score: 0.93
changelog: "숨은기대 추출 정확도 향상을 위해 few-shot 2건 추가"
```

---

## 9. 재사용 패턴(Reusable Patterns)

| 패턴 | 용도 | 골격 |
| --- | --- | --- |
| 추출기(Extractor) | RFP 요구사항·평가기준 추출 | 역할+근거+JSON 스키마 |
| 분류기(Classifier) | 우선순위·심각도 라벨링 | few-shot 경계 사례 + 직접 응답 |
| 합성기(Synthesizer) | 전략·요약 생성 | CoT + 근거 인용 |
| 평가자(Judge) | 산출물 채점 | 루브릭 + 점수 스키마 |
| 변환기(Transformer) | 형식 변환(표→문서 등) | 입출력 예시 + 형식 강제 |

각 패턴의 완성형 프롬프트는 [프롬프트 라이브러리](40_PROMPT_LIBRARY.md)에서 관리한다.

---

## 10. 안티패턴(피해야 할 것)

| 안티패턴 | 문제 | 대안 |
| --- | --- | --- |
| 다중 과업 한 프롬프트 | 품질 저하, 디버깅 곤란 | 파이프라인 분해 |
| 근거 없는 단정 유도 | 환각 | 근거 인용 강제 |
| 형식 미지정 | 후처리 불가 | 스키마 강제 |
| 영어 혼용 출력 | 표준 위반 | "한국어로 작성" 명시 |
| 예시 없는 모호 과업 | 결과 편차 | few-shot 추가 |

---

## 관련 골드위키 문서

- [25_AI_GUIDE.md](25_AI_GUIDE.md) — AI 엔지니어링 전반과 평가·가드레일
- [27_AUTOMATION_WORKFLOW.md](27_AUTOMATION_WORKFLOW.md) — 프롬프트가 단계별로 쓰이는 파이프라인
- [28_SUBAGENT_RULES.md](28_SUBAGENT_RULES.md) — 에이전트 프롬프트 템플릿 규약
- [40_PROMPT_LIBRARY.md](40_PROMPT_LIBRARY.md) — 검증된 프롬프트 정본
- [38_TEMPLATE_LIBRARY.md](38_TEMPLATE_LIBRARY.md) — 문서·산출물 템플릿
- [37_BEST_PRACTICES.md](37_BEST_PRACTICES.md) — 조직 베스트 프랙티스

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/27_AUTOMATION_WORKFLOW.md =====

# 27 · 자율 RFP→납품 자동화 파이프라인

| 항목 | 내용 |
| --- | --- |
| **목적** | RFP 수령부터 경영 요약까지 21단계 자율 워크플로우를 정의하고, 각 단계의 트리거·담당 에이전트·입력·산출물·골드위키 접점·인계·품질 게이트를 표준화한다. |
| **대상 독자** | 모든 서브에이전트, Project Director, AI Engineer |
| **담당(Owner) 에이전트** | Project Director (오케스트레이터) |
| **참조(상위 문서)** | [AI 가이드](25_AI_GUIDE.md), [RFP 프레임워크](03_RFP_FRAMEWORK.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **연계(하위 문서)** | [품질 체크리스트](29_QUALITY_CHECKLIST.md), [테스트 전략](30_TEST_STRATEGY.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 개요

골드위키 디지털의 핵심 자산은 **RFP를 받아 클라이언트 납품물까지 자율적으로 생산하는 21단계 파이프라인**이다. 각 단계는 골드위키를 읽고(read) 산출 후 골드위키를 갱신(update)한다. 단계 사이에는 **품질 게이트**가 있어, 통과해야 다음 단계로 인계된다.

핵심 원칙:
- 모든 단계는 작업 전 골드위키를 먼저 참조한다.
- 모든 산출물은 다음 단계의 입력이 되도록 구조화한다.
- 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md)·[프로젝트 메모리](35_PROJECT_MEMORY.md)를 갱신한다.

---

## 2. 파이프라인 다이어그램

```mermaid
flowchart TD
    S1[1. RFP 읽기] --> S2[2. 분석]
    S2 --> S3[3. 요약]
    S3 --> S4[4. 요구사항 추출]
    S4 --> S5[5. 평가기준 도출]
    S5 --> S6[6. 숨은기대 식별]
    S6 --> S7[7. 리스크 분석]
    S7 --> S8[8. 경쟁사 벤치마크]
    S7 --> S9[9. 글로벌 베스트프랙티스 벤치마크]
    S8 --> S10[10. 제안 전략]
    S9 --> S10
    S10 --> G1{게이트 A<br/>전략 승인}
    G1 --> S11[11. WBS]
    S11 --> S12[12. 정보구조 IA]
    S12 --> S13[13. 유저 플로우]
    S13 --> S14[14. 화면 목록]
    S14 --> S15[15. UX 전략]
    S15 --> S16[16. UI 컨셉]
    S16 --> S17[17. 디자인 시스템]
    S17 --> G2{게이트 B<br/>디자인 승인}
    G2 --> S18[18. HTML 프로토타입 계획]
    S18 --> S19[19. 개발 계획]
    S19 --> S20[20. QA 계획]
    S20 --> G3{게이트 C<br/>품질 검수}
    G3 --> S21[21. 경영 요약]
    S21 --> OUT[클라이언트 납품]
```

게이트 통과 기준은 [품질 체크리스트](29_QUALITY_CHECKLIST.md)의 클라이언트 준비 게이트를 따른다.

---

## 3. 단계별 상세 명세

### 단계 1 · RFP 읽기

| 항목 | 내용 |
| --- | --- |
| 트리거 | 신규 RFP 문서 수령 |
| 담당 에이전트 | Business Analyst |
| 입력 | 원본 RFP(PDF/문서), 클라이언트 배경 |
| 산출물 | 정규화된 RFP 텍스트, 메타데이터(발주처·예산·기한) |
| 읽는 문서 | [03](03_RFP_FRAMEWORK.md), [34](34_CLIENT_KNOWLEDGE.md) |
| 갱신 문서 | [04](04_RFP_ANALYSIS.md), [35](35_PROJECT_MEMORY.md) |
| 인계 | → 단계 2(분석) |

### 단계 2 · 분석

| 항목 | 내용 |
| --- | --- |
| 트리거 | 정규화된 RFP 확보 |
| 담당 에이전트 | Business Analyst, Proposal Strategist |
| 입력 | 정규화 RFP |
| 산출물 | 구조 분석(범위·목표·제약·이해관계자) |
| 읽는 문서 | [03](03_RFP_FRAMEWORK.md), [06](06_BUSINESS_ANALYSIS.md) |
| 갱신 문서 | [04](04_RFP_ANALYSIS.md) |
| 인계 | → 단계 3 |

### 단계 3 · 요약

| 항목 | 내용 |
| --- | --- |
| 트리거 | 분석 완료 |
| 담당 에이전트 | Business Analyst |
| 입력 | 구조 분석 |
| 산출물 | 1페이지 핵심 요약(목적·범위·기대효과) |
| 읽는 문서 | [04](04_RFP_ANALYSIS.md) |
| 갱신 문서 | [04](04_RFP_ANALYSIS.md), [35](35_PROJECT_MEMORY.md) |
| 인계 | → 단계 4 |

### 단계 4 · 요구사항 추출

| 항목 | 내용 |
| --- | --- |
| 트리거 | 요약 확정 |
| 담당 에이전트 | Business Analyst, Product Owner |
| 입력 | 분석·요약 |
| 산출물 | 요구사항 목록(ID·기능/비기능·우선순위·출처) |
| 읽는 문서 | [03](03_RFP_FRAMEWORK.md), [06](06_BUSINESS_ANALYSIS.md) |
| 갱신 문서 | [04](04_RFP_ANALYSIS.md) |
| 인계 | → 단계 5 |

요구사항 산출 형식:

```json
{"id":"R-012","type":"기능","text":"SSO 로그인 지원","priority":"필수","source":"RFP §3.2"}
```

### 단계 5 · 평가기준 도출

| 항목 | 내용 |
| --- | --- |
| 트리거 | 요구사항 확보 |
| 담당 에이전트 | Proposal Strategist |
| 입력 | RFP 평가 항목, 요구사항 |
| 산출물 | 평가기준·배점 매트릭스, 우리 강점 매핑 |
| 읽는 문서 | [03](03_RFP_FRAMEWORK.md), [05](05_PROPOSAL_STRATEGY.md) |
| 갱신 문서 | [04](04_RFP_ANALYSIS.md), [05](05_PROPOSAL_STRATEGY.md) |
| 인계 | → 단계 6 |

### 단계 6 · 숨은기대 식별

| 항목 | 내용 |
| --- | --- |
| 트리거 | 평가기준 확보 |
| 담당 에이전트 | Proposal Strategist, Business Analyst |
| 입력 | RFP 전문, 클라이언트 지식 |
| 산출물 | 명시되지 않은 기대·동기·정치적 맥락 분석 |
| 읽는 문서 | [04](04_RFP_ANALYSIS.md), [34](34_CLIENT_KNOWLEDGE.md) |
| 갱신 문서 | [05](05_PROPOSAL_STRATEGY.md), [34](34_CLIENT_KNOWLEDGE.md) |
| 인계 | → 단계 7 |
| 비고 | CoT 추론 권장([26 §5](26_PROMPT_ENGINEERING.md)) |

### 단계 7 · 리스크 분석

| 항목 | 내용 |
| --- | --- |
| 트리거 | 숨은기대 확보 |
| 담당 에이전트 | Project Director, Business Analyst |
| 입력 | 요구사항·기대·제약 |
| 산출물 | 리스크 레지스터(발생가능성·영향·대응) |
| 읽는 문서 | [06](06_BUSINESS_ANALYSIS.md), [37](37_BEST_PRACTICES.md) |
| 갱신 문서 | [35](35_PROJECT_MEMORY.md), [39](39_COMMON_ERRORS.md) |
| 인계 | → 단계 8, 9(병렬) |

### 단계 8 · 경쟁사 벤치마크

| 항목 | 내용 |
| --- | --- |
| 트리거 | 리스크 분석 완료 |
| 담당 에이전트 | Business Analyst, Service Planner |
| 입력 | 도메인·경쟁 환경 |
| 산출물 | 경쟁사 비교표, 차별화 포인트 |
| 읽는 문서 | [34](34_CLIENT_KNOWLEDGE.md), [36](36_REFERENCE_LIBRARY.md) |
| 갱신 문서 | [36](36_REFERENCE_LIBRARY.md) |
| 인계 | → 단계 10 |

### 단계 9 · 글로벌 베스트프랙티스 벤치마크

| 항목 | 내용 |
| --- | --- |
| 트리거 | 리스크 분석 완료(단계 8과 병렬) |
| 담당 에이전트 | Service Planner, UX Researcher |
| 입력 | 도메인, 글로벌 표준 |
| 산출물 | 우수 사례·표준(WCAG, 업계 패턴) 요약 |
| 읽는 문서 | [07](07_UX_PRINCIPLES.md), [16](16_ACCESSIBILITY.md), [37](37_BEST_PRACTICES.md) |
| 갱신 문서 | [36](36_REFERENCE_LIBRARY.md), [37](37_BEST_PRACTICES.md) |
| 인계 | → 단계 10 |

### 단계 10 · 제안 전략

| 항목 | 내용 |
| --- | --- |
| 트리거 | 벤치마크 2종 취합 |
| 담당 에이전트 | Proposal Strategist, Sales Director |
| 입력 | 평가기준·숨은기대·벤치마크 |
| 산출물 | 수주 전략, 핵심 메시지, 승부수(win theme) |
| 읽는 문서 | [05](05_PROPOSAL_STRATEGY.md), [02](02_BUSINESS_GOALS.md) |
| 갱신 문서 | [05](05_PROPOSAL_STRATEGY.md), [32](32_DECISION_LOG.md) |
| 인계 | → **게이트 A** |

> **게이트 A(전략 승인)**: Sales Director·Project Director 승인 필수([25 §9](25_AI_GUIDE.md) 휴먼인더루프). 미통과 시 단계 5~10 재작업.

### 단계 11 · WBS(작업분해구조)

| 항목 | 내용 |
| --- | --- |
| 트리거 | 게이트 A 통과 |
| 담당 에이전트 | Project Director |
| 입력 | 제안 전략, 범위 |
| 산출물 | WBS, 일정, 담당 매핑 |
| 읽는 문서 | [02](02_BUSINESS_GOALS.md), [35](35_PROJECT_MEMORY.md) |
| 갱신 문서 | [35](35_PROJECT_MEMORY.md) |
| 인계 | → 단계 12 |

### 단계 12 · 정보구조(IA)

| 항목 | 내용 |
| --- | --- |
| 트리거 | WBS 확정 |
| 담당 에이전트 | UX Researcher, Service Planner |
| 입력 | 요구사항, 사용자 정의 |
| 산출물 | 사이트맵·콘텐츠 구조 |
| 읽는 문서 | [07](07_UX_PRINCIPLES.md), [11](11_INFORMATION_ARCHITECTURE.md) |
| 갱신 문서 | [11](11_INFORMATION_ARCHITECTURE.md) |
| 인계 | → 단계 13 |

### 단계 13 · 유저 플로우

| 항목 | 내용 |
| --- | --- |
| 트리거 | IA 확정 |
| 담당 에이전트 | UX Researcher, Interaction Designer |
| 입력 | IA, 핵심 과업 |
| 산출물 | 주요 사용자 플로우 다이어그램 |
| 읽는 문서 | [11](11_INFORMATION_ARCHITECTURE.md), [12](12_USER_FLOW.md), [13](13_USER_JOURNEY.md) |
| 갱신 문서 | [12](12_USER_FLOW.md) |
| 인계 | → 단계 14 |

### 단계 14 · 화면 목록

| 항목 | 내용 |
| --- | --- |
| 트리거 | 플로우 확정 |
| 담당 에이전트 | Service Planner, UI Designer |
| 입력 | 플로우, IA |
| 산출물 | 화면 정의서(화면 ID·명칭·목적·요소) |
| 읽는 문서 | [12](12_USER_FLOW.md), [08](08_UI_GUIDELINES.md) |
| 갱신 문서 | [11](11_INFORMATION_ARCHITECTURE.md) |
| 인계 | → 단계 15 |

### 단계 15 · UX 전략

| 항목 | 내용 |
| --- | --- |
| 트리거 | 화면 목록 확정 |
| 담당 에이전트 | UX Researcher |
| 입력 | 화면 목록, 사용자 여정 |
| 산출물 | UX 원칙·핵심 경험 정의 |
| 읽는 문서 | [07](07_UX_PRINCIPLES.md), [13](13_USER_JOURNEY.md) |
| 갱신 문서 | [07](07_UX_PRINCIPLES.md) |
| 인계 | → 단계 16 |

### 단계 16 · UI 컨셉

| 항목 | 내용 |
| --- | --- |
| 트리거 | UX 전략 확정 |
| 담당 에이전트 | UI Designer, BX Designer |
| 입력 | UX 전략, 브랜드 |
| 산출물 | 비주얼 컨셉·무드·키 스크린 시안 |
| 읽는 문서 | [08](08_UI_GUIDELINES.md), [10](10_FIGMA_GUIDE.md) |
| 갱신 문서 | [08](08_UI_GUIDELINES.md) |
| 인계 | → 단계 17 |

### 단계 17 · 디자인 시스템

| 항목 | 내용 |
| --- | --- |
| 트리거 | UI 컨셉 확정 |
| 담당 에이전트 | UI Designer, Interaction Designer, Accessibility Specialist |
| 입력 | UI 컨셉, 디자인 토큰 |
| 산출물 | 컴포넌트·토큰·패턴 정의 |
| 읽는 문서 | [09](09_DESIGN_SYSTEM.md), [14](14_COMPONENT_LIBRARY.md), [15](15_DESIGN_TOKEN.md), [16](16_ACCESSIBILITY.md) |
| 갱신 문서 | [09](09_DESIGN_SYSTEM.md), [14](14_COMPONENT_LIBRARY.md), [15](15_DESIGN_TOKEN.md) |
| 인계 | → **게이트 B** |

> **게이트 B(디자인 승인)**: 접근성(WCAG)·디자인 일관성 검수 필수. [29](29_QUALITY_CHECKLIST.md)의 UX·UI·디자인시스템·접근성 체크리스트 적용.

### 단계 18 · HTML 프로토타입 계획

| 항목 | 내용 |
| --- | --- |
| 트리거 | 게이트 B 통과 |
| 담당 에이전트 | Publishing Engineer, Frontend Engineer |
| 입력 | 디자인 시스템, 화면 목록 |
| 산출물 | 프로토타입 범위·구조·우선순위 계획 |
| 읽는 문서 | [17](17_HTML_GUIDE.md), [18](18_CSS_GUIDE.md), [20](20_FRONTEND_GUIDE.md) |
| 갱신 문서 | [38](38_TEMPLATE_LIBRARY.md) |
| 인계 | → 단계 19 |

### 단계 19 · 개발 계획

| 항목 | 내용 |
| --- | --- |
| 트리거 | 프로토타입 계획 확정 |
| 담당 에이전트 | Frontend Engineer, Backend Engineer, API Engineer, Database Architect |
| 입력 | 요구사항, 프로토타입 계획 |
| 산출물 | 아키텍처·API 계약·데이터 모델·개발 일정 |
| 읽는 문서 | [20](20_FRONTEND_GUIDE.md), [21](21_BACKEND_GUIDE.md), [22](22_API_STANDARD.md), [23](23_DATABASE_GUIDE.md), [24](24_SECURITY_GUIDE.md) |
| 갱신 문서 | [32](32_DECISION_LOG.md) |
| 인계 | → 단계 20 |

### 단계 20 · QA 계획

| 항목 | 내용 |
| --- | --- |
| 트리거 | 개발 계획 확정 |
| 담당 에이전트 | QA Engineer, Security Engineer |
| 입력 | 요구사항, 개발 계획 |
| 산출물 | 테스트 전략·케이스·종료기준 |
| 읽는 문서 | [29](29_QUALITY_CHECKLIST.md), [30](30_TEST_STRATEGY.md), [24](24_SECURITY_GUIDE.md) |
| 갱신 문서 | [30](30_TEST_STRATEGY.md) |
| 인계 | → **게이트 C** |

> **게이트 C(품질 검수)**: [30](30_TEST_STRATEGY.md) 종료기준 충족 + [29](29_QUALITY_CHECKLIST.md) DoD 통과.

### 단계 21 · 경영 요약

| 항목 | 내용 |
| --- | --- |
| 트리거 | 게이트 C 통과 |
| 담당 에이전트 | Project Director, CEO |
| 입력 | 전 단계 산출물 |
| 산출물 | 경영진·클라이언트용 1~2페이지 요약 |
| 읽는 문서 | 전 단계 골드위키 산출물 |
| 갱신 문서 | [35](35_PROJECT_MEMORY.md), [37](37_BEST_PRACTICES.md) |
| 인계 | → 클라이언트 납품 |

---

## 4. 단계 간 게이트와 품질 체크

| 게이트 | 위치 | 통과 조건 | 승인자 |
| --- | --- | --- | --- |
| 게이트 A | 단계 10 후 | 전략 정합성·수주 가능성 | Sales/Project Director |
| 게이트 B | 단계 17 후 | 디자인 일관성·접근성 | UI Lead/Project Director |
| 게이트 C | 단계 20 후 | 테스트 종료기준·DoD | QA/Project Director |
| 최종 | 단계 21 후 | 경영 승인·클라이언트 준비 | Project Director(+CEO) |

각 게이트는 미통과 시 직전 관련 단계로 **롤백**한다. 롤백 사유는 [공통 오류](39_COMMON_ERRORS.md)에 누적 기록한다.

---

## 5. 인계 규약

모든 인계는 [AI 가이드 §2.3](25_AI_GUIDE.md)의 인계 메타데이터를 포함한다. 미해결 질문(open questions)이 있으면 게이트 통과 전 반드시 해소한다.

---

## 관련 골드위키 문서

- [25_AI_GUIDE.md](25_AI_GUIDE.md) — 멀티에이전트 오케스트레이션과 게이트
- [28_SUBAGENT_RULES.md](28_SUBAGENT_RULES.md) — 단계별 담당 에이전트 정의
- [03_RFP_FRAMEWORK.md](03_RFP_FRAMEWORK.md) — RFP 분석 프레임워크
- [05_PROPOSAL_STRATEGY.md](05_PROPOSAL_STRATEGY.md) — 제안 전략 수립
- [29_QUALITY_CHECKLIST.md](29_QUALITY_CHECKLIST.md) — 게이트 품질 기준
- [30_TEST_STRATEGY.md](30_TEST_STRATEGY.md) — QA 계획 표준

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/28_SUBAGENT_RULES.md =====

# 28 · 서브에이전트 공통 규칙

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 22개 서브에이전트가 따라야 할 공통 거버넌스·협업·품질 규칙과 에이전트 레지스트리를 정의한다. |
| **대상 독자** | 22개 모든 서브에이전트, AI Engineer, Project Director |
| **담당(Owner) 에이전트** | Project Director |
| **참조(상위 문서)** | [AI 가이드](25_AI_GUIDE.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) |
| **연계(하위 문서)** | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md), [의사결정 로그](32_DECISION_LOG.md), [베스트 프랙티스](37_BEST_PRACTICES.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 제1규칙: 골드위키 먼저 참조

> 모든 서브에이전트는 어떤 작업·판단을 하기 전에 **반드시 골드위키를 먼저 참조한다.** 모델 내부 지식보다 골드위키의 명시적 컨텐츠가 항상 우선한다.

이 규칙을 어긴 산출물은 게이트에서 자동 반려된다. 골드위키에 근거가 없는 사실은 단정하지 않고 "확인 필요"로 표시한다.

---

## 2. SSOT와 중복 금지

| 규칙 | 설명 |
| --- | --- |
| 단일 진실 공급원(SSOT) | 모든 지식의 정본은 골드위키다. 사본·요약을 별도로 유지하지 않는다. |
| 중복 금지(No Duplication) | 같은 내용을 두 문서에 쓰지 않는다. 참조 링크로 연결한다. |
| 출처 명시 | 다른 문서 내용을 인용할 때 링크와 섹션을 표기한다. |
| 정본 우선 | 충돌 시 [의사결정 로그](32_DECISION_LOG.md)의 최신 결정을 따른다. |

---

## 3. 의사결정 시 필수 갱신 규칙

에이전트가 의미 있는 결정을 내릴 때마다 다음 4개 문서를 **반드시** 갱신한다.

| 문서 | 갱신 내용 |
| --- | --- |
| [의사결정 로그(32)](32_DECISION_LOG.md) | 결정 ID·배경·대안·선택·근거·결정자 |
| [프로젝트 메모리(35)](35_PROJECT_MEMORY.md) | 프로젝트 맥락·진행 상태 변화 |
| [베스트 프랙티스(37)](37_BEST_PRACTICES.md) | 재사용 가능한 교훈·패턴 |
| [레퍼런스 라이브러리(36)](36_REFERENCE_LIBRARY.md) | 참고한 외부 자료·근거 |

의사결정 로그 표준 항목 예시:

```yaml
id: D-2026-058
date: 2026-06-26
agent: ui-designer
context: "버튼 컴포넌트 상태 정의 충돌"
options: ["A안: 4상태", "B안: 6상태"]
decision: "B안 채택(접근성 포커스 상태 포함)"
rationale: "WCAG 2.4.7 준수"
links: ["09_DESIGN_SYSTEM.md", "16_ACCESSIBILITY.md"]
```

---

## 4. 협업·인계 프로토콜

| 단계 | 행동 |
| --- | --- |
| 수신 | 인계 메타데이터·입력 골드위키 문서 확인 |
| 작업 | 자기 도메인 내에서만 수행, 범위 밖은 위임 |
| 검증 | 셀프 체크 + 필요 시 평가자 에이전트 검수 |
| 갱신 | 산출물·골드위키 문서 갱신 |
| 인계 | 다음 에이전트에 메타데이터 포함 인계([27](27_AUTOMATION_WORKFLOW.md)) |

인계 메타데이터는 [AI 가이드 §2.3](25_AI_GUIDE.md) 형식을 따른다. 협업은 직접 호출이 아니라 **골드위키 문서를 매개**로 한다.

---

## 5. 에스컬레이션 매트릭스

| 상황 | 1차 대응 | 에스컬레이션 대상 |
| --- | --- | --- |
| 도메인 내 모호성 | 담당 에이전트 자체 판단 | 해당 리드 에이전트 |
| 영역 간 충돌 | 관련 에이전트 협의 | Project Director |
| 범위·일정 변경 | Project Director | Sales Director |
| 전략·수주 판단 | Sales Director | CEO |
| 법적·보안 중대 리스크 | Security Engineer | Project Director + CEO |
| 클라이언트 직접 영향 | Project Director | CEO(필요 시) |

에스컬레이션 시 [의사결정 로그](32_DECISION_LOG.md)에 사유를 기록한다.

---

## 6. 출력 품질 기준

모든 에이전트 산출물은 다음을 충족한다.

- [ ] 골드위키 근거를 인용했다(출처 링크 포함).
- [ ] 모든 본문이 자연스러운 실무 한국어다.
- [ ] 출력 형식이 과업 요구(JSON/표/문서)에 맞다.
- [ ] 근거 없는 수치·날짜·고유명사가 없다.
- [ ] 자기 도메인 범위를 벗어나지 않았다.
- [ ] 관련 골드위키 4개 문서를 갱신했다(의사결정 시).
- [ ] [품질 체크리스트(29)](29_QUALITY_CHECKLIST.md)의 해당 분야 DoD를 통과했다.

---

## 7. 22개 서브에이전트 레지스트리

| # | 에이전트 | 역할(미션 한 줄) | 주요 골드위키 문서 | 핵심 협업자 |
| --- | --- | --- | --- | --- |
| 1 | CEO | 비전·중대 의사결정·최종 승인을 책임진다 | [02](02_BUSINESS_GOALS.md), [32](32_DECISION_LOG.md) | Project Director, Sales Director |
| 2 | Project Director | 파이프라인을 오케스트레이션하고 게이트를 관리한다 | [27](27_AUTOMATION_WORKFLOW.md), [35](35_PROJECT_MEMORY.md) | 전 에이전트 |
| 3 | Sales Director | 수주 전략과 클라이언트 관계를 주도한다 | [05](05_PROPOSAL_STRATEGY.md), [34](34_CLIENT_KNOWLEDGE.md) | Proposal Strategist, CEO |
| 4 | Proposal Strategist | 제안 전략·승부수·평가기준 대응을 설계한다 | [03](03_RFP_FRAMEWORK.md), [05](05_PROPOSAL_STRATEGY.md) | Business Analyst, Sales Director |
| 5 | Business Analyst | RFP를 분석하고 요구사항을 추출한다 | [04](04_RFP_ANALYSIS.md), [06](06_BUSINESS_ANALYSIS.md) | Proposal Strategist, Product Owner |
| 6 | Product Owner | 제품 백로그와 우선순위를 정의한다 | [06](06_BUSINESS_ANALYSIS.md), [02](02_BUSINESS_GOALS.md) | Business Analyst, Service Planner |
| 7 | Service Planner | 서비스 구조·화면 목록·기획을 수립한다 | [11](11_INFORMATION_ARCHITECTURE.md), [12](12_USER_FLOW.md) | UX Researcher, UI Designer |
| 8 | UX Researcher | 사용자 리서치·IA·UX 전략을 담당한다 | [07](07_UX_PRINCIPLES.md), [13](13_USER_JOURNEY.md) | Service Planner, Interaction Designer |
| 9 | UI Designer | 비주얼 UI와 화면 디자인을 책임진다 | [08](08_UI_GUIDELINES.md), [09](09_DESIGN_SYSTEM.md) | BX Designer, Frontend Engineer |
| 10 | BX Designer | 브랜드 경험과 비주얼 아이덴티티를 정의한다 | [08](08_UI_GUIDELINES.md), [10](10_FIGMA_GUIDE.md) | UI Designer |
| 11 | Interaction Designer | 인터랙션·모션·상태 전이를 설계한다 | [12](12_USER_FLOW.md), [14](14_COMPONENT_LIBRARY.md) | UX Researcher, Frontend Engineer |
| 12 | Accessibility Specialist | 접근성(WCAG) 준수를 검수·보장한다 | [16](16_ACCESSIBILITY.md), [09](09_DESIGN_SYSTEM.md) | UI Designer, QA Engineer |
| 13 | Publishing Engineer | HTML/CSS 마크업과 프로토타입을 제작한다 | [17](17_HTML_GUIDE.md), [18](18_CSS_GUIDE.md) | Frontend Engineer, UI Designer |
| 14 | Frontend Engineer | 프론트엔드 구현을 담당한다 | [19](19_JS_GUIDE.md), [20](20_FRONTEND_GUIDE.md) | Publishing Engineer, API Engineer |
| 15 | Backend Engineer | 백엔드 로직과 서비스를 구현한다 | [21](21_BACKEND_GUIDE.md), [23](23_DATABASE_GUIDE.md) | API Engineer, Database Architect |
| 16 | API Engineer | API 계약과 연동을 설계·구현한다 | [22](22_API_STANDARD.md), [21](21_BACKEND_GUIDE.md) | Backend Engineer, Frontend Engineer |
| 17 | Database Architect | 데이터 모델·스키마·성능을 설계한다 | [23](23_DATABASE_GUIDE.md), [21](21_BACKEND_GUIDE.md) | Backend Engineer |
| 18 | Security Engineer | 보안 위협·통제·컴플라이언스를 담당한다 | [24](24_SECURITY_GUIDE.md), [22](22_API_STANDARD.md) | Backend Engineer, QA Engineer |
| 19 | AI Engineer | AI 시스템·프롬프트·평가를 설계한다 | [25](25_AI_GUIDE.md), [26](26_PROMPT_ENGINEERING.md) | 전 에이전트 |
| 20 | QA Engineer | 테스트 전략·품질 검수를 책임진다 | [29](29_QUALITY_CHECKLIST.md), [30](30_TEST_STRATEGY.md) | Security Engineer, Frontend Engineer |
| 21 | DevOps Engineer | CI/CD·릴리스·인프라를 운영한다 | [31](31_RELEASE_PROCESS.md), [24](24_SECURITY_GUIDE.md) | Backend Engineer, QA Engineer |
| 22 | Documentation Specialist | 골드위키 문서 품질·일관성을 관리한다 | [38](38_TEMPLATE_LIBRARY.md), [00](00_START_HERE.md) | 전 에이전트 |

---

## 8. 공통 의사결정 규칙

1. 결정 전 골드위키에서 선례([32](32_DECISION_LOG.md))를 확인한다.
2. 선례가 있으면 따르고, 바꿔야 하면 사유를 기록한다.
3. 영역 밖 결정은 하지 않고 담당 에이전트에 위임한다.
4. 되돌릴 수 없는 결정은 사람 승인을 받는다([25 §9](25_AI_GUIDE.md)).
5. 결정 후 4개 거버넌스 문서를 갱신한다(§3).

---

## 9. 서브에이전트 정의 파일 규약

각 에이전트는 `/home/user/goldwiki/.claude/agents/<name>.md`에 정의된다. frontmatter(`name`은 영문 kebab-case, `description`은 한국어)와 본문 H2 섹션 구조는 [공유 스펙]에 따른다. 본문 첫 줄에 "이 에이전트는 항상 골드위키를 먼저 참조한다"를 둔다.

---

## 관련 골드위키 문서

- [25_AI_GUIDE.md](25_AI_GUIDE.md) — 멀티에이전트 시스템과 휴먼인더루프
- [27_AUTOMATION_WORKFLOW.md](27_AUTOMATION_WORKFLOW.md) — 에이전트가 수행하는 21단계 파이프라인
- [26_PROMPT_ENGINEERING.md](26_PROMPT_ENGINEERING.md) — 에이전트 프롬프트 설계
- [32_DECISION_LOG.md](32_DECISION_LOG.md) — 의사결정 기록 정본
- [35_PROJECT_MEMORY.md](35_PROJECT_MEMORY.md) — 프로젝트 컨텍스트
- [37_BEST_PRACTICES.md](37_BEST_PRACTICES.md) — 베스트 프랙티스
- [29_QUALITY_CHECKLIST.md](29_QUALITY_CHECKLIST.md) — 출력 품질 게이트

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/29_QUALITY_CHECKLIST.md =====

# 29 · 마스터 품질 체크리스트

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 모든 산출물이 클라이언트 제출 전 충족해야 할 분야별 품질 체크리스트와 완료정의(DoD), 클라이언트 준비 게이트를 정의한다. |
| **대상 독자** | QA Engineer, 모든 산출 에이전트, Project Director |
| **담당(Owner) 에이전트** | QA Engineer |
| **참조(상위 문서)** | [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **연계(하위 문서)** | [테스트 전략](30_TEST_STRATEGY.md), [릴리스 프로세스](31_RELEASE_PROCESS.md), [공통 오류](39_COMMON_ERRORS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 사용 방법

각 단계 산출물은 해당 분야 체크리스트를 통과해야 다음 단계(또는 게이트)로 인계된다. 체크박스가 하나라도 미충족이면 산출물은 반려된다. 반복 결함은 [공통 오류](39_COMMON_ERRORS.md)에 누적한다.

---

## 2. 제안(Proposal) 체크리스트

- [ ] RFP의 모든 명시 요구사항이 추적표(traceability)로 매핑되었다.
- [ ] 평가기준·배점에 대응하는 강점이 명확히 드러난다.
- [ ] 숨은 기대(미명시 동기)가 전략에 반영되었다.
- [ ] 경쟁사 대비 차별화 포인트(win theme)가 분명하다.
- [ ] 리스크와 대응 방안이 제시되었다.
- [ ] 글로벌 베스트프랙티스 근거가 인용되었다([36](36_REFERENCE_LIBRARY.md)).
- [ ] 일정·예산·범위가 현실적이고 일관된다.
- [ ] 경영 요약이 1~2페이지로 압축되어 있다.
- [ ] 모든 내용이 자연스러운 한국어다.

---

## 3. UX 체크리스트

- [ ] 정보구조(IA)가 사용자 멘탈 모델과 일치한다.
- [ ] 핵심 사용자 플로우가 막힘 없이 완결된다.
- [ ] 각 화면의 목적과 진입/이탈 경로가 정의되었다.
- [ ] 사용자 여정의 페인포인트가 해소되었다.
- [ ] UX 원칙([07](07_UX_PRINCIPLES.md))과 충돌하지 않는다.
- [ ] 엣지 케이스(빈 상태·오류·로딩)가 설계되었다.

---

## 4. UI 체크리스트

- [ ] 디자인 가이드라인([08](08_UI_GUIDELINES.md))을 준수한다.
- [ ] 레이아웃 그리드·여백이 일관된다.
- [ ] 타이포그래피 위계가 명확하다.
- [ ] 색상이 디자인 토큰([15](15_DESIGN_TOKEN.md))에서 파생되었다.
- [ ] 반응형 브레이크포인트가 정의되었다.
- [ ] 인터랙션 상태(hover/focus/active/disabled)가 모두 디자인되었다.

---

## 5. 디자인 시스템 체크리스트

- [ ] 컴포넌트가 [컴포넌트 라이브러리(14)](14_COMPONENT_LIBRARY.md)에 등록되었다.
- [ ] 디자인 토큰이 단일 소스에서 관리된다([15](15_DESIGN_TOKEN.md)).
- [ ] 명명 규칙이 일관된다.
- [ ] 각 컴포넌트의 변형(variant)·상태가 문서화되었다.
- [ ] 사용/금지 가이드가 포함되었다.
- [ ] 코드와 디자인이 동기화되었다(Code Connect 등).

---

## 6. 접근성(Accessibility) 체크리스트

- [ ] 색 대비가 WCAG 2.1 AA(본문 4.5:1, 큰 텍스트 3:1)를 충족한다.
- [ ] 모든 상호작용 요소가 키보드로 접근 가능하다.
- [ ] 포커스 표시(focus indicator)가 명확하다(WCAG 2.4.7).
- [ ] 이미지에 대체 텍스트(alt)가 있다.
- [ ] 폼 요소에 레이블이 연결되었다.
- [ ] 시맨틱 HTML과 적절한 ARIA가 사용되었다.
- [ ] 스크린리더로 핵심 플로우가 완결된다.
- [ ] 동적 콘텐츠 변화가 보조기술에 전달된다(live region).
- [ ] 상세 기준은 [접근성(16)](16_ACCESSIBILITY.md)을 따른다.

---

## 7. 프론트엔드(Frontend) 체크리스트

- [ ] HTML이 시맨틱하고 유효하다([17](17_HTML_GUIDE.md)).
- [ ] CSS가 토큰·네이밍 규칙을 따른다([18](18_CSS_GUIDE.md)).
- [ ] JS가 코딩 표준([19](19_JS_GUIDE.md))을 준수한다.
- [ ] 컴포넌트가 재사용 가능하고 props 계약이 명확하다.
- [ ] 반응형이 주요 디바이스에서 검증되었다.
- [ ] 성능 예산(번들 크기·Core Web Vitals)을 충족한다.
- [ ] 브라우저 호환성이 확인되었다.
- [ ] 콘솔 에러·경고가 없다.

---

## 8. 백엔드(Backend) 체크리스트

- [ ] 비즈니스 로직이 요구사항을 정확히 구현했다.
- [ ] 에러 처리·로깅이 일관된다([21](21_BACKEND_GUIDE.md)).
- [ ] 입력 검증이 모든 경계에서 수행된다.
- [ ] 트랜잭션·데이터 정합성이 보장된다([23](23_DATABASE_GUIDE.md)).
- [ ] 성능(쿼리·응답시간)이 목표 내다.
- [ ] 구성·비밀(secret)이 코드에 하드코딩되지 않았다.

---

## 9. API 체크리스트

- [ ] API 표준([22](22_API_STANDARD.md))을 준수한다(REST/네이밍/상태코드).
- [ ] OpenAPI 명세가 최신이다.
- [ ] 요청/응답 스키마가 검증된다.
- [ ] 인증·인가가 적용되었다.
- [ ] 에러 응답 형식이 일관된다.
- [ ] 버저닝 정책을 따른다.
- [ ] 율 제한(rate limit)·페이지네이션이 정의되었다.

---

## 10. 보안(Security) 체크리스트

- [ ] OWASP Top 10 위협을 점검했다([24](24_SECURITY_GUIDE.md)).
- [ ] 인증·세션 관리가 안전하다.
- [ ] 입력값이 검증·이스케이프되어 인젝션을 방지한다.
- [ ] 민감정보가 암호화(전송/저장)된다.
- [ ] 접근 제어가 최소 권한 원칙을 따른다.
- [ ] 의존성 취약점이 스캔되었다.
- [ ] 보안 헤더가 설정되었다.

---

## 11. AI 출력 체크리스트

- [ ] 모든 사실이 골드위키·도구 결과로 근거되었다(인용 포함).
- [ ] 근거 없는 수치·날짜·고유명사가 없다(환각 점검).
- [ ] 출력 형식이 요구 스키마와 일치한다.
- [ ] 자기 도메인 범위를 벗어나지 않았다.
- [ ] 한국어 표현이 자연스럽고 일관된다.
- [ ] 평가 루브릭([25 §6](25_AI_GUIDE.md)) 합격선을 넘었다.
- [ ] 의사결정 시 4개 거버넌스 문서를 갱신했다.

---

## 12. 문서(Documentation) 체크리스트

- [ ] 골드위키 표준 구조(메타데이터·관련문서·거버넌스 인용)를 따른다.
- [ ] 상호 링크가 유효하고 충분하다.
- [ ] 중복 내용이 없다(SSOT 준수).
- [ ] 표·체크리스트·예시가 적절히 포함되었다.
- [ ] 용어가 조직 표준과 일치한다.
- [ ] 최종 수정일·상태가 갱신되었다.

---

## 13. 완료정의(DoD, Definition of Done)

산출물은 다음을 모두 만족할 때 "완료"로 간주한다.

| # | 완료 조건 |
| --- | --- |
| 1 | 해당 분야 체크리스트 100% 통과 |
| 2 | 관련 골드위키 문서 갱신 완료 |
| 3 | 평가자(또는 동료 에이전트) 검수 통과 |
| 4 | 미해결 질문(open questions) 0건 |
| 5 | 결함이 종료기준([30](30_TEST_STRATEGY.md)) 내로 수렴 |
| 6 | 인계 메타데이터 작성 완료 |

---

## 14. 클라이언트 준비 게이트

클라이언트 제출 전 최종 게이트. 모두 충족해야 한다.

- [ ] 모든 분야 DoD 충족.
- [ ] 게이트 A/B/C([27](27_AUTOMATION_WORKFLOW.md)) 전부 통과.
- [ ] Project Director 승인(중대 건 CEO 승인).
- [ ] 경영 요약 검토 완료.
- [ ] 브랜딩·표기·한국어 품질 최종 교정.
- [ ] 보안·기밀 정보 노출 점검 완료.
- [ ] 산출물 패키징·전달 형식 확인.

---

## 관련 골드위키 문서

- [30_TEST_STRATEGY.md](30_TEST_STRATEGY.md) — 테스트 유형·종료기준
- [31_RELEASE_PROCESS.md](31_RELEASE_PROCESS.md) — 릴리스 체크리스트
- [27_AUTOMATION_WORKFLOW.md](27_AUTOMATION_WORKFLOW.md) — 게이트가 배치된 파이프라인
- [28_SUBAGENT_RULES.md](28_SUBAGENT_RULES.md) — 출력 품질 공통 규칙
- [16_ACCESSIBILITY.md](16_ACCESSIBILITY.md) — 접근성 상세 기준
- [24_SECURITY_GUIDE.md](24_SECURITY_GUIDE.md) — 보안 상세 기준
- [39_COMMON_ERRORS.md](39_COMMON_ERRORS.md) — 반복 결함 기록

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/30_TEST_STRATEGY.md =====

# 30 · 테스트 전략

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 모든 디지털 산출물에 대한 테스트 전략, 유형, 커버리지 목표, 자동화, 결함 관리, 종료기준을 표준화한다. |
| **대상 독자** | QA Engineer, Frontend/Backend/API Engineer, Security Engineer, DevOps Engineer |
| **담당(Owner) 에이전트** | QA Engineer |
| **참조(상위 문서)** | [품질 체크리스트](29_QUALITY_CHECKLIST.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) |
| **연계(하위 문서)** | [릴리스 프로세스](31_RELEASE_PROCESS.md), [보안 가이드](24_SECURITY_GUIDE.md), [공통 오류](39_COMMON_ERRORS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 테스트 철학

테스트는 품질을 "검사"하는 것이 아니라 "설계"하는 활동이다. 골드위키 디지털은 **시프트 레프트(shift-left)** 원칙에 따라 요구사항 단계부터 검증 가능성을 고려한다. 모든 테스트 활동은 [품질 체크리스트](29_QUALITY_CHECKLIST.md)의 DoD와 연결된다.

---

## 2. 테스트 피라미드

```mermaid
flowchart TD
    E2E[E2E 테스트<br/>소수·느림·고비용] 
    INT[통합 테스트<br/>중간]
    UNIT[단위 테스트<br/>다수·빠름·저비용]
    E2E --- INT --- UNIT
```

| 계층 | 비중 | 특성 |
| --- | --- | --- |
| 단위(Unit) | 약 70% | 빠르고 격리됨, 함수·컴포넌트 단위 |
| 통합(Integration) | 약 20% | 모듈·서비스 간 상호작용 |
| E2E | 약 10% | 사용자 시나리오 전체 흐름 |

안티패턴 "아이스크림 콘"(E2E 과다)을 피한다. 빠른 피드백을 위해 하위 계층을 두껍게 유지한다.

---

## 3. 테스트 유형

| 유형 | 목적 | 담당 | 도구 예 |
| --- | --- | --- | --- |
| 단위(Unit) | 개별 로직 정확성 | Frontend/Backend Engineer | Jest, Vitest, JUnit, pytest |
| 통합(Integration) | 모듈·DB·API 연동 | Backend/API Engineer | Supertest, Testcontainers |
| E2E | 사용자 시나리오 | QA Engineer | Playwright, Cypress |
| 비주얼 회귀(Visual) | UI 외형 변화 감지 | QA Engineer, UI Designer | Playwright snapshot, Chromatic |
| 접근성(a11y) | WCAG 준수 | Accessibility Specialist | axe-core, Pa11y, Lighthouse |
| 성능(Performance) | 응답·부하·Core Web Vitals | QA/DevOps Engineer | k6, Lighthouse, WebPageTest |
| 보안(Security) | 취약점 탐지 | Security Engineer | OWASP ZAP, Snyk, SAST/DAST |

각 유형의 합격 기준은 [품질 체크리스트](29_QUALITY_CHECKLIST.md)의 분야별 항목과 일치시킨다.

---

## 4. 커버리지 목표

| 대상 | 라인 커버리지 | 분기 커버리지 | 비고 |
| --- | --- | --- | --- |
| 핵심 비즈니스 로직 | ≥ 90% | ≥ 85% | 결제·인증 등 |
| 일반 모듈 | ≥ 80% | ≥ 75% | |
| UI 컴포넌트 | ≥ 70% | — | 비주얼 테스트로 보완 |
| 전체 평균 | ≥ 80% | ≥ 75% | 릴리스 게이트 |

커버리지는 품질의 필요조건이지 충분조건이 아니다. 의미 있는 단언(assertion) 없는 커버리지는 무효로 본다.

---

## 5. 테스트 데이터

| 원칙 | 설명 |
| --- | --- |
| 격리 | 테스트 간 데이터 간섭 금지, 각 테스트 독립 셋업/정리 |
| 재현성 | 시드(seed) 고정으로 결정적 결과 보장 |
| 익명화 | 실데이터 사용 시 개인정보 마스킹([24](24_SECURITY_GUIDE.md)) |
| 팩토리 | 테스트 데이터 빌더/팩토리로 생성 |
| 경계값 | 빈값·최대값·특수문자·다국어 포함 |

```javascript
// 테스트 데이터 팩토리 예시
const makeUser = (overrides = {}) => ({
  id: 'u-001', name: '홍길동', role: 'member', ...overrides,
});
```

---

## 6. 테스트 환경

| 환경 | 용도 | 데이터 |
| --- | --- | --- |
| 로컬(Local) | 개발자 단위·통합 테스트 | 모의/시드 |
| CI | 자동 회귀 테스트 | 격리 시드 |
| 스테이징(Staging) | E2E·UAT·성능 | 운영 유사(익명화) |
| 운영(Production) | 스모크·모니터링 | 실데이터(읽기 위주) |

환경 구성·승격 경로는 [릴리스 프로세스](31_RELEASE_PROCESS.md)와 정합되게 운영한다.

---

## 7. 자동화

```mermaid
flowchart LR
    PR[PR 생성] --> L[린트·정적분석]
    L --> U[단위 테스트]
    U --> I[통합 테스트]
    I --> A[접근성·비주얼]
    A --> SEC[보안 스캔]
    SEC --> G{게이트 통과?}
    G -- 예 --> M[머지 가능]
    G -- 아니오 --> F[차단·리포트]
```

- 모든 PR은 자동 테스트 게이트를 통과해야 머지된다.
- E2E·성능은 스테이징 배포 후 야간/스케줄 실행을 병행한다.
- 플레이키(flaky) 테스트는 격리·수정 전까지 게이트에서 제외하고 [공통 오류](39_COMMON_ERRORS.md)에 기록한다.

---

## 8. 도구 스택(예시)

| 영역 | 권장 도구 |
| --- | --- |
| 단위 | Jest / Vitest / pytest / JUnit |
| E2E | Playwright |
| 비주얼 | Playwright Snapshot / Chromatic |
| 접근성 | axe-core / Lighthouse CI |
| 성능 | k6 / Lighthouse |
| 보안 | OWASP ZAP / Snyk |
| CI | GitHub Actions |

도구 선택 결정은 [의사결정 로그](32_DECISION_LOG.md)에 기록하고 프로젝트 특성에 맞게 조정한다.

---

## 9. 결함 라이프사이클

```mermaid
stateDiagram-v2
    [*] --> 신규
    신규 --> 분류
    분류 --> 진행중
    진행중 --> 해결
    해결 --> 검증
    검증 --> 종료
    검증 --> 재오픈
    재오픈 --> 진행중
    분류 --> 보류
```

| 상태 | 설명 |
| --- | --- |
| 신규(New) | 결함 보고됨 |
| 분류(Triage) | 심각도·우선순위·담당 배정 |
| 진행중(In Progress) | 수정 작업 중 |
| 해결(Resolved) | 수정 완료, 검증 대기 |
| 검증(Verify) | QA 재현 테스트 |
| 종료(Closed) | 검증 통과 |
| 재오픈(Reopen) | 검증 실패 |

---

## 10. 결함 심각도

| 심각도 | 정의 | 대응 SLA |
| --- | --- | --- |
| S1 치명(Blocker) | 핵심 기능 마비·데이터 손실·보안 사고 | 즉시 |
| S2 심각(Critical) | 주요 기능 장애, 우회 불가 | 24시간 내 |
| S3 보통(Major) | 기능 장애, 우회 가능 | 다음 릴리스 |
| S4 경미(Minor) | 사소한 결함·표기 | 백로그 |

---

## 11. 종료기준(Exit Criteria)

릴리스 전 다음을 모두 충족해야 한다.

- [ ] 계획된 테스트 케이스 실행률 ≥ 95%.
- [ ] 통과율 ≥ 98%.
- [ ] S1·S2 결함 0건(잔존 없음).
- [ ] S3 결함은 합의된 처리 계획 보유.
- [ ] 커버리지 목표(§4) 충족.
- [ ] 접근성·보안·성능 테스트 합격.
- [ ] [품질 체크리스트(29)](29_QUALITY_CHECKLIST.md) DoD 통과.

---

## 관련 골드위키 문서

- [29_QUALITY_CHECKLIST.md](29_QUALITY_CHECKLIST.md) — 분야별 품질 체크리스트·DoD
- [31_RELEASE_PROCESS.md](31_RELEASE_PROCESS.md) — 릴리스 게이트와 환경
- [24_SECURITY_GUIDE.md](24_SECURITY_GUIDE.md) — 보안 테스트 기준
- [16_ACCESSIBILITY.md](16_ACCESSIBILITY.md) — 접근성 테스트 기준
- [20_FRONTEND_GUIDE.md](20_FRONTEND_GUIDE.md) — 프론트엔드 테스트 관행
- [39_COMMON_ERRORS.md](39_COMMON_ERRORS.md) — 반복 결함·플레이키 테스트

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/31_RELEASE_PROCESS.md =====

# 31 · 릴리스 프로세스

| 항목 | 내용 |
| --- | --- |
| **목적** | Goldwiki Digital(골드위키 디지털)의 코드·산출물 릴리스를 위한 브랜칭 전략, CI/CD 파이프라인, 버저닝, 릴리스·롤백·모니터링 표준을 정의한다. |
| **대상 독자** | DevOps Engineer, Backend/Frontend/API Engineer, QA Engineer, Project Director |
| **담당(Owner) 에이전트** | DevOps Engineer |
| **참조(상위 문서)** | [테스트 전략](30_TEST_STRATEGY.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| **연계(하위 문서)** | [보안 가이드](24_SECURITY_GUIDE.md), [공통 오류](39_COMMON_ERRORS.md), [의사결정 로그](32_DECISION_LOG.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 원칙

릴리스는 **작고 자주, 자동화되고 되돌릴 수 있게** 한다. 모든 릴리스는 [테스트 전략](30_TEST_STRATEGY.md)의 종료기준과 [품질 체크리스트](29_QUALITY_CHECKLIST.md)의 게이트를 통과해야 한다. 운영 환경 릴리스는 사람 승인이 필수다([25 §9](25_AI_GUIDE.md)).

---

## 2. 브랜칭 전략

트렁크 기반(Trunk-Based)을 기본으로 하되, 짧은 수명의 기능 브랜치를 사용한다.

| 브랜치 | 용도 | 규칙 |
| --- | --- | --- |
| `main` | 항상 배포 가능한 정본 | 직접 푸시 금지, PR·게이트 통과만 머지 |
| `feature/*` | 기능 개발 | 수명 짧게(수일 내), `main`에서 분기 |
| `fix/*` | 버그 수정 | 동일 규칙 |
| `release/*` | 릴리스 안정화(필요 시) | 핫픽스 백포트 |
| `hotfix/*` | 운영 긴급 수정 | `main`에서 분기, 신속 배포 |

```mermaid
gitGraph
    commit
    branch feature/login
    commit
    commit
    checkout main
    merge feature/login
    commit tag: "v1.2.0"
    branch hotfix/auth
    commit
    checkout main
    merge hotfix/auth tag: "v1.2.1"
```

PR 규칙: 리뷰 1인 이상 승인, 모든 자동 게이트 통과, 작업 단위는 작게 유지.

---

## 3. 환경

| 환경 | 목적 | 승격 트리거 |
| --- | --- | --- |
| 개발(Dev) | 통합 확인 | `main` 머지 시 자동 |
| 스테이징(Staging) | E2E·UAT·성능·접근성 | 릴리스 후보 태깅 |
| 운영(Production) | 실서비스 | 사람 승인 후 |

환경 정의는 [테스트 전략 §6](30_TEST_STRATEGY.md)과 정합한다. 환경별 구성·비밀은 안전하게 분리 관리한다([24](24_SECURITY_GUIDE.md)).

---

## 4. CI/CD 파이프라인

```mermaid
flowchart LR
    C[커밋/PR] --> B[빌드]
    B --> L[린트·정적분석]
    L --> T[자동 테스트]
    T --> SEC[보안 스캔]
    SEC --> ART[아티팩트 생성]
    ART --> DEPdev[Dev 배포]
    DEPdev --> E2E[스테이징 E2E]
    E2E --> APV{운영 승인}
    APV -- 승인 --> PROD[운영 배포]
    APV -- 반려 --> STOP[중단]
    PROD --> MON[배포 후 모니터링]
```

| 단계 | 내용 | 실패 시 |
| --- | --- | --- |
| 빌드 | 의존성 설치·컴파일·번들 | 즉시 중단 |
| 린트/정적분석 | 코드 스타일·정적 취약점 | 차단 |
| 자동 테스트 | 단위·통합([30](30_TEST_STRATEGY.md)) | 차단 |
| 보안 스캔 | SAST·의존성·시크릿 스캔 | 차단 |
| 아티팩트 | 버전 태그된 빌드 산출물 | — |
| 배포 | 환경별 자동/승인 배포 | 롤백 |
| 모니터링 | 헬스·에러·성능 관측 | 자동 알림 |

---

## 5. 버저닝(SemVer)

[유의적 버전(SemVer)](https://semver.org) `MAJOR.MINOR.PATCH`를 따른다.

| 구분 | 증가 조건 | 예 |
| --- | --- | --- |
| MAJOR | 하위 호환 깨지는 변경 | `1.4.2 → 2.0.0` |
| MINOR | 하위 호환 기능 추가 | `1.4.2 → 1.5.0` |
| PATCH | 하위 호환 버그 수정 | `1.4.2 → 1.4.3` |

- 프리릴리스: `2.0.0-rc.1`, 빌드 메타데이터: `2.0.0+build.42`.
- 태그는 `v` 접두사 사용: `v2.0.0`.
- API 버저닝은 [API 표준(22)](22_API_STANDARD.md)을 따른다. 프롬프트 버저닝도 동일 규칙([26 §8](26_PROMPT_ENGINEERING.md)).

---

## 6. 릴리스 체크리스트

- [ ] [테스트 전략](30_TEST_STRATEGY.md) 종료기준 충족(S1·S2 0건).
- [ ] [품질 체크리스트](29_QUALITY_CHECKLIST.md) 클라이언트 준비 게이트 통과.
- [ ] 보안 스캔 통과([24](24_SECURITY_GUIDE.md)).
- [ ] 버전 번호·태그 결정(SemVer).
- [ ] 릴리스 노트·변경 로그 작성(한국어).
- [ ] 데이터베이스 마이그레이션 검증·롤백 스크립트 준비.
- [ ] 구성·비밀·환경 변수 확인.
- [ ] 롤백 계획 수립·검증.
- [ ] 이해관계자 공지·승인([25 §9](25_AI_GUIDE.md)).
- [ ] 모니터링·알림 활성화 확인.

---

## 7. 변경관리(Change Management)

| 변경 유형 | 승인 | 일정 |
| --- | --- | --- |
| 일반 변경 | PR 리뷰 + 게이트 | 정규 릴리스 창 |
| 표준 변경(반복·저위험) | 자동 승인 | 상시 |
| 긴급 변경(Hotfix) | DevOps + Project Director | 즉시 |

모든 변경은 [의사결정 로그](32_DECISION_LOG.md)와 변경 이력에 기록한다. 변경 영향·롤백 가능성을 사전 평가한다.

---

## 8. 배포 전략

| 전략 | 설명 | 적용 |
| --- | --- | --- |
| 블루-그린(Blue-Green) | 신·구 환경 전환으로 무중단 | 중요 서비스 |
| 카나리(Canary) | 일부 트래픽에 점진 노출 | 위험 큰 변경 |
| 롤링(Rolling) | 순차 인스턴스 교체 | 일반 |
| 기능 플래그(Feature Flag) | 코드 배포와 노출 분리 | 점진 출시·A/B |

---

## 9. 롤백(Rollback)

```mermaid
flowchart LR
    M[모니터링 이상 감지] --> D{임계 초과?}
    D -- 예 --> R[즉시 롤백<br/>이전 안정 버전]
    D -- 아니오 --> W[관찰 지속]
    R --> POST[사후 분석]
    POST --> LOG[공통 오류 기록]
```

- 롤백 트리거: 에러율 급증, 핵심 지표 하락, S1 결함 발생.
- 롤백은 자동화하고 정기적으로 리허설한다.
- 데이터 마이그레이션은 전방·후방 호환을 보장하여 롤백 가능하게 설계한다.
- 사후 분석(post-mortem) 결과는 [공통 오류](39_COMMON_ERRORS.md)·[베스트 프랙티스](37_BEST_PRACTICES.md)에 기록한다.

---

## 10. 릴리스 후 모니터링

| 지표 | 관측 항목 | 알림 임계 |
| --- | --- | --- |
| 가용성 | 헬스체크·업타임 | 다운 즉시 |
| 에러율 | 5xx·예외율 | 기준 대비 급증 |
| 지연 | p95/p99 응답시간 | SLA 초과 |
| 핵심 지표 | 전환·로그인 등 비즈니스 KPI | 유의미 하락 |
| 리소스 | CPU·메모리·DB 부하 | 임계 초과 |

배포 직후 일정 기간 집중 관측(하이퍼케어)하고, 이상 시 §9 롤백 절차를 발동한다.

---

## 관련 골드위키 문서

- [30_TEST_STRATEGY.md](30_TEST_STRATEGY.md) — 릴리스 전 테스트 종료기준
- [29_QUALITY_CHECKLIST.md](29_QUALITY_CHECKLIST.md) — 클라이언트 준비 게이트
- [24_SECURITY_GUIDE.md](24_SECURITY_GUIDE.md) — 보안 스캔·비밀 관리
- [22_API_STANDARD.md](22_API_STANDARD.md) — API 버저닝
- [27_AUTOMATION_WORKFLOW.md](27_AUTOMATION_WORKFLOW.md) — 납품 파이프라인 연계
- [39_COMMON_ERRORS.md](39_COMMON_ERRORS.md) — 사후 분석·반복 장애

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/32_DECISION_LOG.md =====

# 32 · 의사결정 로그(Decision Log / ADR)

| 항목 | 내용 |
| --- | --- |
| **목적** | 골드위키 디지털의 모든 아키텍처·표준·프로세스 의사결정을 추적 가능한 형식(ADR, Architecture Decision Record)으로 영구 기록한다. |
| **대상 독자** | 전 직군 및 전 AI 에이전트(특히 Project Director, 각 도메인 리드, 신규 합류자) |
| **담당(Owner) 에이전트** | Project Director (공동: Documentation Specialist) |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **연계(하위 문서)** | [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 왜 의사결정 로그인가

"왜 그렇게 결정했는가"는 시간이 지나면 가장 빨리 잊히는 지식이다. 코드와 디자인 산출물은 *무엇을* 했는지 보여주지만, *왜* 그 길을 택했고 어떤 대안을 버렸는지는 남지 않는다. 의사결정 로그(ADR)는 이 공백을 메운다.

- **재논의 비용 제거** — 이미 끝난 토론을 6개월 뒤 다시 시작하지 않는다.
- **온보딩 가속** — 신규 인원·에이전트가 결정의 맥락을 스스로 학습한다.
- **책임 추적성** — 누가, 언제, 어떤 근거로 결정했는지 명확하다.
- **에이전트 정합성** — 모든 AI 에이전트는 행동 전 이 로그를 조회하여 과거 결정과 모순되지 않게 한다.

> 골드위키 거버넌스 원칙: **결정은 코드 머지 전에 기록한다.** 기록되지 않은 결정은 존재하지 않는 결정으로 간주한다.

---

## 2. 채택한 ADR 형식

골드위키는 Michael Nygard의 경량 ADR 형식을 기반으로 하되, 다국어 협업과 에이전트 자동 갱신에 맞게 확장했다.

### 형식 규칙

1. 모든 ADR은 본 문서 하단의 **결정 기록 목록**에 순번(`ADR-NNNN`)으로 누적한다.
2. 한 ADR은 **하나의 결정**만 다룬다. 결정이 여러 개면 분리한다.
3. ADR은 **불변(immutable)** 이다. 결정을 바꾸려면 기존 ADR을 `폐기(Superseded)` 상태로 표시하고 새 ADR을 작성해 상호 링크한다. 과거 기록을 삭제하거나 덮어쓰지 않는다.
4. 상태(Status) 값은 다음 중 하나다: `제안(Proposed)` · `승인(Accepted)` · `폐기(Superseded)` · `보류(Deprecated)` · `반려(Rejected)`.
5. 모든 ADR은 작성 즉시 [프로젝트 메모리](35_PROJECT_MEMORY.md)의 "결정" 섹션에 한 줄 요약으로 동기화한다.

### 상태 전이도

```
제안(Proposed) ──승인──▶ 승인(Accepted) ──대체결정──▶ 폐기(Superseded)
      │                          │
   반려(Rejected)            보류(Deprecated)
```

---

## 3. 재사용 ADR 템플릿

새 결정을 기록할 때 아래 블록을 복사하여 "결정 기록" 섹션에 추가한다.

```markdown
### ADR-NNNN · <결정 제목(한 문장)>

- **상태:** 제안 | 승인 | 폐기 | 보류 | 반려
- **날짜:** YYYY-MM-DD
- **결정자:** <에이전트/역할명> (검토: <역할명>)
- **관련 프로젝트/범위:** <프로젝트명 또는 "전사 표준">
- **대체 관계:** (선택) ADR-XXXX 를 폐기함 / ADR-YYYY 로 폐기됨

**맥락(Context)**
> 어떤 문제·압력·제약 때문에 결정이 필요했는가. 사실 위주로 서술한다.

**검토한 대안(Options)**
| 대안 | 장점 | 단점 |
| --- | --- | --- |
| A. … | … | … |
| B. … | … | … |

**결정(Decision)**
> 우리가 무엇을 하기로 했는가. 능동태로 단정적으로 서술한다.

**근거(Rationale)**
> 왜 이 대안을 택했는가. 측정 가능한 기준(비용, 일정, 위험, 유지보수성 등)을 명시한다.

**결과(Consequences)**
- 긍정적: …
- 부정적/감수할 트레이드오프: …
- 후속 조치: <담당> / <기한>

**참조 링크:** <골드위키 문서, 외부 표준 등>
```

---

## 4. 결정 기록(채워진 예시)

### ADR-0001 · 디자인 토큰 관리에 Style Dictionary를 채택한다

- **상태:** 승인(Accepted)
- **날짜:** 2026-06-26
- **결정자:** UI Designer (검토: Frontend Engineer, BX Designer)
- **관련 프로젝트/범위:** 전사 표준
- **대체 관계:** 없음

**맥락**
> 프로젝트마다 색상·간격·타이포 값을 CSS·Figma·iOS/Android에 중복 정의하면서 값이 어긋나는 사고가 반복되었다. 단일 원천(Single Source of Truth)에서 다중 플랫폼으로 토큰을 변환·배포할 도구가 필요했다.

**검토한 대안**
| 대안 | 장점 | 단점 |
| --- | --- | --- |
| A. Style Dictionary | 다중 플랫폼 출력(CSS/SCSS/JS/iOS/Android), 성숙·무료, 변환 파이프라인 커스터마이즈 용이 | 초기 설정 학습곡선 |
| B. Tokens Studio 단독 | Figma 연동 우수 | 빌드/배포 자동화 약함, 플랫폼 출력 제한 |
| C. 수작업 CSS 변수 관리 | 도입 비용 0 | 동기화 오류 지속, 확장 불가 |

**결정**
> 디자인 토큰의 단일 원천은 JSON으로 관리하고, Style Dictionary로 CSS 커스텀 프로퍼티·SCSS·JS·플랫폼 산출물을 빌드한다. Figma 측은 Tokens Studio로 동일 JSON을 동기화한다.

**근거**
> 토큰 불일치 사고를 구조적으로 차단하고, 신규 플랫폼 추가 시 변환 설정만 추가하면 되는 확장성을 확보한다. 라이선스 비용이 없어 전 프로젝트 적용 부담이 없다.

**결과**
- 긍정적: 토큰 변경이 한 곳에서 모든 채널로 전파된다.
- 트레이드오프: 토큰 빌드 단계가 CI에 추가된다.
- 후속 조치: 토큰 빌드 파이프라인 표준화 → Frontend Engineer / 2026-07-10
- 상세: [디자인 토큰](15_DESIGN_TOKEN.md), [디자인 시스템](09_DESIGN_SYSTEM.md)

---

### ADR-0002 · 접근성 기준선을 WCAG 2.2 AA로 표준화한다

- **상태:** 승인(Accepted)
- **날짜:** 2026-06-26
- **결정자:** Accessibility Specialist (검토: UX Researcher, QA Engineer)
- **관련 프로젝트/범위:** 전사 표준
- **대체 관계:** 없음

**맥락**
> 클라이언트마다 접근성 요구 수준이 제각각이고, 제안 단계에서 합의 없이 진행하다 검수 단계에서 비용이 급증하는 사례가 있었다. 공통 기준선이 필요했다.

**검토한 대안**
| 대안 | 장점 | 단점 |
| --- | --- | --- |
| A. WCAG 2.2 AA | 국내외 공공·민간 표준, 법적 방어선 충족, 도구 생태계 풍부 | 일부 신규 기준(2.2) 검증 도구 미성숙 |
| B. WCAG 2.1 AA | 도구 성숙 | 최신 모바일·인지 접근성 기준 누락 |
| C. AAA 전면 적용 | 최고 수준 | 비용·디자인 제약 과도, 비현실적 |

**결정**
> 전 프로젝트의 기본 접근성 목표를 **WCAG 2.2 AA**로 정한다. 클라이언트가 더 높은 수준을 요구하면 ADR로 별도 기록한다.

**근거**
> AA는 법적·실무적 방어선이면서 비용 대비 효과가 가장 균형적이다. 2.2 채택으로 최신 인지·모바일 기준까지 포괄한다.

**결과**
- 긍정적: 제안서·견적·QA 체크리스트가 단일 기준으로 정렬된다.
- 트레이드오프: 일부 화려한 인터랙션에 제약이 생긴다.
- 후속 조치: 접근성 검수 체크리스트 갱신 → Accessibility Specialist / 2026-07-05
- 상세: [접근성](16_ACCESSIBILITY.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md)

---

### ADR-0003 · RFP 분석에 멀티에이전트 파이프라인을 사용한다

- **상태:** 승인(Accepted)
- **날짜:** 2026-06-26
- **결정자:** Proposal Strategist (검토: CEO, Project Director, AI Engineer)
- **관련 프로젝트/범위:** 전사 표준(제안 영역)
- **대체 관계:** 없음

**맥락**
> RFP 한 건을 단일 작업으로 처리하면 요구사항 누락·일정 산정 오류가 잦았다. 분석·요구사항 추출·리스크 탐지·경쟁 분석·스토리라인을 분업화할 필요가 있었다.

**검토한 대안**
| 대안 | 장점 | 단점 |
| --- | --- | --- |
| A. 전문 에이전트 파이프라인 | 단계별 품질 게이트, 병렬화, 재사용 | 오케스트레이션 복잡도 |
| B. 단일 거대 프롬프트 | 단순 | 누락·환각 위험, 추적 불가 |

**결정**
> RFP 처리를 `RFP 분석 → 요구사항 추출 → 리스크 탐지 → 경쟁 벤치마크 → 제안 스토리라인 → 경영 요약`의 순차/병렬 에이전트 파이프라인으로 구성한다. 각 단계는 [프롬프트 라이브러리](40_PROMPT_LIBRARY.md)의 표준 프롬프트를 사용한다.

**근거**
> 단계별로 검증 가능한 산출물이 생겨 품질 게이트를 둘 수 있고, 단계 결과를 다음 입찰에 재사용할 수 있다.

**결과**
- 긍정적: 요구사항 추적성 확보, 제안 리드타임 단축.
- 트레이드오프: 파이프라인 관리·로그 운영 부담.
- 후속 조치: 프롬프트 표준화 → AI Engineer / 2026-07-08
- 상세: [RFP 프레임워크](03_RFP_FRAMEWORK.md), [RFP 분석](04_RFP_ANALYSIS.md), [제안 전략](05_PROPOSAL_STRATEGY.md)

---

### ADR-0004 · v1 백엔드 API는 GraphQL 대신 REST로 한다

- **상태:** 승인(Accepted)
- **날짜:** 2026-06-26
- **결정자:** API Engineer (검토: Backend Engineer, Frontend Engineer)
- **관련 프로젝트/범위:** 전사 기본값(프로젝트별 재정의 가능)

**맥락**
> 신규 제품 v1의 데이터 요구는 비교적 정형적이고, 팀 전반이 REST·OpenAPI에 익숙하다. 초기 속도와 캐싱 단순성이 중요했다.

**검토한 대안**
| 대안 | 장점 | 단점 |
| --- | --- | --- |
| A. REST + OpenAPI | 캐싱·도구·온보딩 단순, 표준화 용이 | 과다/과소 페칭 가능성 |
| B. GraphQL | 유연한 쿼리, 단일 엔드포인트 | 캐싱·보안·N+1 운영 복잡, v1 과투자 |

**결정**
> v1은 OpenAPI 3.1 기반 REST로 구현한다. GraphQL은 클라이언트 쿼리 다양성이 실증된 v2에서 재검토한다.

**근거**
> 초기에는 단순성과 속도가 유연성보다 가치가 크다. HTTP 캐싱과 표준 도구 체계를 그대로 활용한다.

**결과**
- 긍정적: v1 개발 속도 향상, 운영 단순.
- 트레이드오프: 일부 화면에서 다중 호출 발생 가능.
- 후속 조치: v2 착수 시 GraphQL 재평가 ADR 작성 → API Engineer / v2 킥오프
- 상세: [API 표준](22_API_STANDARD.md), [백엔드 가이드](21_BACKEND_GUIDE.md)

---

### ADR-0005 · 제안 산출물을 HTML 프로토타입 우선으로 전달한다

- **상태:** 승인(Accepted)
- **날짜:** 2026-06-26
- **결정자:** Service Planner (검토: UI Designer, Publishing Engineer, Sales Director)
- **관련 프로젝트/범위:** 전사 표준(제안·디자인 영역)

**맥락**
> 정적 시안만으로는 인터랙션·반응형 동작을 설득하기 어려웠고, 클라이언트가 실제 사용감을 체감하지 못해 수주 전환율이 낮았다.

**결정**
> 핵심 화면은 정적 시안이 아니라 동작 가능한 HTML 프로토타입으로 제안한다. 디자인 토큰을 적용해 그대로 구현 자산으로 승계한다.

**근거**
> 클라이언트 체감 설득력이 높고, 프로토타입이 그대로 구현 출발점이 되어 재작업이 준다.

**결과**
- 긍정적: 수주 전환율·구현 연속성 개선.
- 트레이드오프: 제안 단계 공수 증가.
- 후속 조치: 프로토타입 표준 골격 마련 → Publishing Engineer / 2026-07-12
- 상세: [HTML 가이드](17_HTML_GUIDE.md), [프론트엔드 가이드](20_FRONTEND_GUIDE.md), [제안 전략](05_PROPOSAL_STRATEGY.md)

---

### ADR-0006 · 메리츠화재 인터넷 마케팅 플랫폼 운영(2025) 입찰에 참여한다(Bid)

- **상태:** 승인(Accepted)
- **날짜:** 2026-06-27
- **결정자:** executive-director (검토: rfp-strategy-lead, pmo-director, security-risk-lead)
- **관련 프로젝트/범위:** MERITZ-2025-TM (제안 영역)
- **대체 관계:** 없음

**맥락**
> 메리츠화재 TM사업부문의 인터넷 마케팅 플랫폼 2년 운영(대표홈페이지+TM 마케팅 플랫폼) RFP. 평가는 제안 80 : 가격 20의 기술 우위형이며, 조직 운영방안(25)·UI/UX 기획(15) 비중이 높다. 참여 여부 판단이 필요했다.

**검토한 대안**
| 대안 | 장점 | 단점 |
| --- | --- | --- |
| A. 참여(Bid) | 자사 핵심 역량과 높은 정합, 2년 안정 매출, 기술 비중 유리 | 가격 경쟁·단가 동결·인력 연속성 리스크 |
| B. 불참(No-Bid) | 리스크 회피 | 핵심 시장(금융 운영) 레퍼런스 기회 상실 |

**결정**
> 입찰에 **참여(Bid)** 한다. 윈테마는 성과 기반 운영(전환·이탈 책임)·무중단 연속성·사용자 중심 금융 UX. 별첨4는 보장분석 전환율·펫보험 이탈율 2과제로 대응한다.

**근거**
> Bid/No-Bid 4축 평균 3.6/5(72%)로 G1 게이트(60%) 통과. 기술 80점 구조에서 조직 운영방안·UI/UX 우위로 수주 가능 구간(~55%) 확보 가능. 가격을 2위 이내로 맞추면 상향.

**결과**
- 긍정적: 금융 운영 레퍼런스 확보, 2년 안정 매출.
- 트레이드오프: 단가 동결(2년+연장) 원가 부담, 가격·인력 연속성 리스크 상시 관리 필요.
- 후속 조치: Q&A(범위·MM 조정 확인) → 별첨3 인력·별첨4 SB 작성 → 원가/가격 확정 → `/proposal-build` 인계 / rfp-strategy-lead
- 상세: [RFP 분석 패키지 — 메리츠 2025](../Examples/RFP_Analysis_Meritz_2025.md), [RFP 프레임워크](RFP/RFPAnalysisFramework.md)

---

## 5. 운영 규칙 요약(체크리스트)

- [ ] 결정이 코드/디자인에 반영되기 **전에** ADR을 작성했는가?
- [ ] 검토한 대안과 버린 이유를 명시했는가?
- [ ] 상태·날짜·결정자를 채웠는가?
- [ ] 기존 결정을 바꾸는 경우 폐기 처리 + 상호 링크했는가?
- [ ] [프로젝트 메모리](35_PROJECT_MEMORY.md)·[베스트 프랙티스](37_BEST_PRACTICES.md)에 동기화했는가?

---

## 관련 골드위키 문서

- [프로젝트 메모리](35_PROJECT_MEMORY.md) — 결정의 한 줄 요약이 누적되는 살아있는 상태 기록
- [베스트 프랙티스](37_BEST_PRACTICES.md) — 반복 검증된 결정이 규칙으로 승격되는 곳
- [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md) — 결정 근거가 된 외부 표준의 출처
- [회의록](33_MEETING_NOTE.md) — 결정이 도출된 논의의 원본 기록
- [서브에이전트 규칙](28_SUBAGENT_RULES.md) — 어떤 에이전트가 어떤 결정 권한을 갖는가
- [RFP 분석](04_RFP_ANALYSIS.md) · [제안 전략](05_PROPOSAL_STRATEGY.md) — 제안 영역 결정의 적용처
- [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) — ADR 템플릿의 사본 보관처

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/33_MEETING_NOTE.md =====

# 33 · 회의록 표준(Meeting Note)

| 항목 | 내용 |
| --- | --- |
| **목적** | 골드위키 디지털의 모든 회의를 일관된 형식으로 기록하고, 결정사항·액션아이템을 추적 가능하게 만든다. |
| **대상 독자** | 전 직군, 회의 주관/참석자, 결정 후속 조치를 수행하는 모든 에이전트 |
| **담당(Owner) 에이전트** | Documentation Specialist (회의별 서기 지정) |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) |
| **연계(하위 문서)** | [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 회의록 원칙

회의록은 "참석한 사람만 아는 합의"를 "조직이 아는 사실"로 전환하는 장치다. 다음 원칙을 따른다.

1. **결정 중심으로 기록한다** — 발언 속기록이 아니라 *결정·합의·미결 사항*을 남긴다.
2. **모든 액션아이템에는 담당자와 기한이 있다** — 담당자 없는 액션은 액션이 아니다.
3. **24시간 내 공유한다** — 회의 종료 후 영업일 1일 이내 본 형식으로 게시한다.
4. **결정은 ADR로 승격한다** — 회의에서 나온 구조적 결정은 [의사결정 로그](32_DECISION_LOG.md)에 ADR로 기록하고 링크한다.
5. **상태를 갱신한다** — 회의 결과는 [프로젝트 메모리](35_PROJECT_MEMORY.md)의 현재 상태/미해결 질문에 반영한다.

---

## 2. 재사용 회의록 템플릿

```markdown
# 회의록 · <회의 제목>

| 항목 | 내용 |
| --- | --- |
| 일시 | YYYY-MM-DD HH:MM–HH:MM |
| 장소/채널 | <회의실 / 화상 링크> |
| 회의 유형 | 킥오프 / 정기 / 리뷰 / 의사결정 / 회고 |
| 주관 | <이름/역할> |
| 서기 | <이름/역할> |

## 참석자
- 참석: <이름(역할)>, …
- 불참(공유 대상): <이름(역할)>

## 안건(Agenda)
1. …
2. …

## 논의 요약
- <안건별 핵심 논의 내용>

## 결정사항(Decisions)
| # | 결정 내용 | 근거 | ADR 링크 |
| --- | --- | --- | --- |
| D1 | … | … | ADR-XXXX |

## 액션아이템(Action Items)
| # | 할 일 | 담당 | 기한 | 상태 |
| --- | --- | --- | --- | --- |
| A1 | … | <담당> | YYYY-MM-DD | 진행중 |

## 미해결 질문(Open Questions)
- <질문 / 누가 언제까지 해소>

## 다음 회의
- 일시 / 예정 안건
```

---

## 3. 채워진 예시 회의록 1 — RFP 킥오프

```markdown
# 회의록 · "한빛생명 통합 디지털 채널 구축" RFP 대응 킥오프

| 항목 | 내용 |
| --- | --- |
| 일시 | 2026-06-26 10:00–11:10 |
| 장소/채널 | 본사 3층 회의실 / 화상 병행 |
| 회의 유형 | 킥오프 |
| 주관 | Sales Director |
| 서기 | Documentation Specialist |
```

### 참석자
- 참석: Sales Director, Proposal Strategist, Business Analyst, UX Researcher, Project Director, AI Engineer
- 불참(공유 대상): CEO

### 안건
1. RFP 핵심 요건·평가 배점 공유
2. 제안 일정과 마일스톤 확정
3. 분석 파이프라인·역할 분담
4. 초기 리스크 식별

### 논의 요약
- RFP 제출 마감은 2026-07-17, 발표 평가는 2026-07-24로 확인. 평가 배점은 기술 60 / 가격 30 / 발표 10.
- 핵심 요건은 (1) 4개 분산 채널 통합, (2) WCAG 2.2 AA 접근성 명문화, (3) 6개월 내 1차 오픈.
- 분석은 [RFP 프레임워크](03_RFP_FRAMEWORK.md)의 멀티에이전트 파이프라인(ADR-0003)으로 진행하기로 함.

### 결정사항
| # | 결정 내용 | 근거 | ADR 링크 |
| --- | --- | --- | --- |
| D1 | RFP 분석은 멀티에이전트 파이프라인으로 수행 | 요구사항 누락 방지·추적성 | ADR-0003 |
| D2 | 접근성 목표를 WCAG 2.2 AA로 제안서에 명시 | 전사 표준 부합 | ADR-0002 |
| D3 | 핵심 화면은 HTML 프로토타입으로 제안 | 수주 전환율 제고 | ADR-0005 |

### 액션아이템
| # | 할 일 | 담당 | 기한 | 상태 |
| --- | --- | --- | --- | --- |
| A1 | RFP 요구사항 추출표 작성 | Business Analyst | 2026-06-30 | 진행중 |
| A2 | 경쟁사 벤치마크 3개사 분석 | Proposal Strategist | 2026-07-02 | 진행중 |
| A3 | 제안 스토리라인 초안 | Service Planner | 2026-07-05 | 대기 |
| A4 | 리스크 레지스터 초안 | Project Director | 2026-07-01 | 진행중 |

### 미해결 질문
- 레거시 회원 DB 연동 범위 불명확 → Business Analyst가 2026-06-30까지 발주처에 질의서 발송.
- 가격 상한 비공개 여부 → Sales Director 확인.

### 다음 회의
- 2026-07-02 10:00 / 안건: 요구사항·리스크 1차 리뷰

---

## 4. 채워진 예시 회의록 2 — 디자인 리뷰

```markdown
# 회의록 · "한빛생명" 메인·가입 플로우 디자인 1차 리뷰

| 항목 | 내용 |
| --- | --- |
| 일시 | 2026-06-26 15:00–16:05 |
| 장소/채널 | 화상(Figma 화면 공유) |
| 회의 유형 | 리뷰 |
| 주관 | Project Director |
| 서기 | UI Designer |
```

### 참석자
- 참석: Project Director, UI Designer, UX Researcher, BX Designer, Interaction Designer, Accessibility Specialist, Frontend Engineer
- 불참(공유 대상): Product Owner

### 안건
1. 메인 화면 UI 컨셉 검토
2. 가입 플로우 사용성·접근성 점검
3. 디자인 토큰 반영 상태 확인

### 논의 요약
- 메인 히어로 영역 대비비가 일부 텍스트에서 4.5:1 미만으로 측정되어 색상 토큰 조정 필요.
- 가입 플로우 단계 수가 5단계로 과다하다는 의견. 약관 동의·본인 인증을 한 화면으로 통합 검토.
- 디자인 토큰은 Style Dictionary(ADR-0001) 산출 CSS 변수로 적용 확인.

### 결정사항
| # | 결정 내용 | 근거 | ADR 링크 |
| --- | --- | --- | --- |
| D1 | 본문 텍스트 색상 토큰을 명도 한 단계 강화 | WCAG 2.2 AA 대비 충족 | ADR-0002 |
| D2 | 가입 플로우를 5→4단계로 축소 | 이탈률 저감 | (ADR 불요, 화면 수준) |

### 액션아이템
| # | 할 일 | 담당 | 기한 | 상태 |
| --- | --- | --- | --- | --- |
| A1 | 색상 토큰 명도 조정·재배포 | UI Designer | 2026-06-29 | 진행중 |
| A2 | 가입 플로우 4단계 재설계 | Interaction Designer | 2026-07-01 | 진행중 |
| A3 | 대비비 자동 검사 추가 | Accessibility Specialist | 2026-06-30 | 대기 |
| A4 | 토큰 변경 반영 프로토타입 갱신 | Publishing Engineer | 2026-07-02 | 대기 |

### 미해결 질문
- 본인 인증 수단(휴대폰/공동인증서) 클라이언트 정책 미확정 → Business Analyst 확인.

### 다음 회의
- 2026-07-03 15:00 / 안건: 2차 디자인 리뷰 + 프로토타입 시연

---

## 5. 회의 유형별 권장 시간·산출물

| 유형 | 권장 시간 | 필수 산출물 |
| --- | --- | --- |
| 킥오프 | 60–90분 | 역할분담, 일정, 리스크 초안 |
| 정기 스탠드업 | 15분 | 액션 진척, 차단 요소 |
| 리뷰 | 60분 | 피드백 목록, 결정사항 |
| 의사결정 | 30–60분 | ADR(승인/반려) |
| 회고 | 60분 | 잘된 점/개선점/액션 |

---

## 관련 골드위키 문서

- [의사결정 로그](32_DECISION_LOG.md) — 회의에서 도출된 결정의 정식 기록처
- [프로젝트 메모리](35_PROJECT_MEMORY.md) — 회의 결과가 반영되는 살아있는 상태
- [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) — 회의록 작성·공유 자동화 흐름
- [클라이언트 지식베이스](34_CLIENT_KNOWLEDGE.md) — 클라이언트 회의 이력 누적처
- [RFP 프레임워크](03_RFP_FRAMEWORK.md) — 킥오프 회의의 입력 자료
- [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md) — 회의록 템플릿 사본 보관처

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/34_CLIENT_KNOWLEDGE.md =====

# 34 · 클라이언트 지식베이스(Client Knowledge)

| 항목 | 내용 |
| --- | --- |
| **목적** | 클라이언트별 프로필·이해관계자·도메인·제약·선호·이력을 구조화하여 영업·제안·실행 전 과정에서 재사용한다. |
| **대상 독자** | Sales Director, Proposal Strategist, Project Director, Business Analyst, 클라이언트 접점 전 에이전트 |
| **담당(Owner) 에이전트** | Sales Director (공동: Business Analyst) |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [비즈니스 목표](02_BUSINESS_GOALS.md) |
| **연계(하위 문서)** | [RFP 분석](04_RFP_ANALYSIS.md), [제안 전략](05_PROPOSAL_STRATEGY.md), [프로젝트 메모리](35_PROJECT_MEMORY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 왜 클라이언트 지식베이스인가

클라이언트 관계는 개인의 기억에 묶여 있으면 안 된다. 담당자가 바뀌어도 "이 클라이언트가 무엇을 중시하고, 무엇에 민감하며, 과거 무엇을 약속했는지"가 조직에 남아야 한다. 이 문서는 그 기억을 구조화한다.

- **제안 적중률 향상** — 클라이언트의 숨은 평가 기준·선호를 알고 제안한다.
- **반복 실수 방지** — 과거 갈등·민감 사항을 사전에 회피한다.
- **관계 연속성** — 담당 교체 시에도 신뢰 관계의 맥락이 유지된다.
- **에이전트 정합성** — 모든 클라이언트 접점 에이전트는 행동 전 해당 프로필을 조회한다.

---

## 2. 지식베이스 구조

각 클라이언트는 다음 6개 블록으로 구성한다.

| 블록 | 담는 내용 |
| --- | --- |
| **① 프로필(Profile)** | 회사 개요, 산업, 규모, 거래 단계, 핵심 사업 |
| **② 이해관계자(Stakeholders)** | 의사결정자·실무자·영향자, 직책, 성향, 평가 권한 |
| **③ 도메인(Domain)** | 업의 특성, 규제, 경쟁 환경, 도메인 용어 |
| **④ 제약(Constraints)** | 예산·일정·기술·조직·법규 제약 |
| **⑤ 선호(Preferences)** | 커뮤니케이션 방식, 산출물 형식, 의사결정 스타일, 톤앤매너 |
| **⑥ 이력(History)** | 과거 프로젝트, 결정, 갈등/성공, 약속, 미해결 사항 |

### 이력 캡처 방법

1. 모든 클라이언트 회의 후 [회의록](33_MEETING_NOTE.md)의 핵심을 해당 프로필 "이력"에 한 줄 요약으로 누적한다.
2. 클라이언트와 관련된 모든 ADR은 프로필 이력에 링크한다.
3. 민감 사항(가격 협상, 갈등)은 별도 표식(⚠️)으로 기록한다.
4. 프로필은 분기 1회 또는 주요 이벤트 발생 시 Sales Director가 검수한다.

---

## 3. 재사용 클라이언트 프로필 템플릿

```markdown
# 클라이언트 프로필 · <클라이언트명>

| 항목 | 내용 |
| --- | --- |
| 코드명 | <내부 식별 코드> |
| 산업/도메인 | … |
| 규모 | <매출/임직원/사용자 규모> |
| 거래 단계 | 잠재 / 제안중 / 수주 / 진행중 / 유지 |
| 주 담당(우리측) | <역할/이름> |
| 최종 갱신 | YYYY-MM-DD |

## ① 프로필
- 개요: …
- 핵심 사업/제품: …
- 디지털 성숙도: 낮음 / 중간 / 높음

## ② 이해관계자
| 이름/직책 | 역할 | 평가 권한 | 성향·메모 |
| --- | --- | --- | --- |
| … | 의사결정자 | 높음 | … |

## ③ 도메인
- 업 특성: …
- 규제·표준: …
- 도메인 용어: <용어=뜻>

## ④ 제약
- 예산: … / 일정: … / 기술: … / 조직: … / 법규: …

## ⑤ 선호
- 커뮤니케이션: … / 산출물 형식: … / 의사결정 스타일: … / 톤앤매너: …

## ⑥ 이력
| 날짜 | 사건/결정 | 결과 | 링크 |
| --- | --- | --- | --- |
| YYYY-MM-DD | … | … | <회의록/ADR> |

## ⚠️ 민감 사항
- …
```

---

## 4. 채워진 예시 프로필 1 (가상)

> 아래 클라이언트는 교육·예시용 **가상 기업**이며 실재하지 않는다.

```markdown
# 클라이언트 프로필 · 한빛생명(가상)

| 항목 | 내용 |
| --- | --- |
| 코드명 | HANB-LIFE |
| 산업/도메인 | 생명보험(금융) |
| 규모 | 임직원 약 1,800명 / 디지털 채널 MAU 약 120만 |
| 거래 단계 | 제안중 |
| 주 담당(우리측) | Sales Director — 김선영 |
| 최종 갱신 | 2026-06-26 |
```

### ① 프로필
- 개요: 중견 생명보험사. 오프라인 설계사 채널 비중이 높고 디지털 전환을 가속 중.
- 핵심 사업/제품: 종신·정기보험, 연금, 건강보험. 최근 다이렉트 채널 강화.
- 디지털 성숙도: 중간(레거시 시스템 다수, 채널 분산).

### ② 이해관계자
| 이름/직책 | 역할 | 평가 권한 | 성향·메모 |
| --- | --- | --- | --- |
| 박정호 / 디지털혁신본부장 | 의사결정자 | 높음 | 데이터·근거 중시. 추상적 비전보다 실측 지표 선호 |
| 이수민 / UX팀장 | 실무 책임 | 중간 | 사용성·접근성에 민감. 프로토타입 시연 선호 |
| 최영근 / IT인프라팀장 | 영향자 | 중간 | 레거시 연동 안정성·보안 강조 |

### ③ 도메인
- 업 특성: 규제 산업, 상품 약관 복잡, 신뢰·정확성이 핵심.
- 규제·표준: 보험업법, 전자금융거래법, 개인정보보호법, 금융 접근성 가이드.
- 도메인 용어: 청약=보험 가입 신청 / 부담보=특정 위험 보장 제외 / 해지환급금=중도 해지 시 환급액.

### ④ 제약
- 예산: 1차 오픈 기준 비공개(상한 추정 중) / 일정: 6개월 내 1차 오픈 / 기술: 레거시 회원·계약 DB 연동 필수 / 조직: 본부-IT 협의 절차 김 / 법규: 금융 접근성·보안 심사 통과 필수.

### ⑤ 선호
- 커뮤니케이션: 격주 정기 보고 + 주요 마일스톤 대면 발표.
- 산출물 형식: 동작하는 프로토타입 + 1페이지 경영 요약.
- 의사결정 스타일: 본부장 단독 승인보다 실무 합의 후 상신.
- 톤앤매너: 신뢰감 있는 정제된 비주얼, 과한 트렌드 지양.

### ⑥ 이력
| 날짜 | 사건/결정 | 결과 | 링크 |
| --- | --- | --- | --- |
| 2026-06-26 | RFP 대응 킥오프 | 분석 파이프라인 가동 | [회의록](33_MEETING_NOTE.md) |
| 2026-06-26 | 접근성 WCAG 2.2 AA 제안 명시 결정 | 제안 차별화 요소 | ADR-0002 |

### ⚠️ 민감 사항
- 과거 타사 구축 사업에서 레거시 연동 지연으로 오픈이 밀린 이력 있음 → 연동 일정 보수적으로 약속할 것.

---

## 5. 채워진 예시 프로필 2 (가상, 요약)

> 교육·예시용 **가상 기업**.

```markdown
# 클라이언트 프로필 · 그린마켓(가상)

| 항목 | 내용 |
| --- | --- |
| 코드명 | GRN-MART |
| 산업/도메인 | 신선식품 이커머스(리테일) |
| 규모 | 스타트업, MAU 약 30만 |
| 거래 단계 | 수주(진행중) |
| 주 담당(우리측) | Project Director — 정민재 |
| 최종 갱신 | 2026-06-26 |
```

- **프로필:** 빠른 의사결정·실험 문화의 스타트업. MVP 속도 최우선.
- **이해관계자:** CPO(의사결정자, 데이터 드리븐), 그로스 리드(전환율 집착).
- **도메인:** 콜드체인 물류, 당일배송 슬롯, 재고 회전 핵심.
- **제약:** 예산 타이트, 2개월 단위 빠른 릴리스, 소규모 개발팀.
- **선호:** 슬랙 비동기 소통, 작은 단위 잦은 배포, A/B 테스트 근거 선호.
- **이력:** 결제 플로우 개선으로 체크아웃 이탈 -12% (2026-05).
- **⚠️ 민감 사항:** 과한 문서화보다 동작하는 결과물 우선 — 보고는 간결하게.

---

## 관련 골드위키 문서

- [RFP 분석](04_RFP_ANALYSIS.md) — 클라이언트 요건 해석의 기반
- [제안 전략](05_PROPOSAL_STRATEGY.md) — 프로필 기반 맞춤 제안 설계
- [비즈니스 분석](06_BUSINESS_ANALYSIS.md) — 도메인·제약 심층 분석
- [회의록](33_MEETING_NOTE.md) — 클라이언트 이력의 원본 기록
- [프로젝트 메모리](35_PROJECT_MEMORY.md) — 프로젝트 단위 상태와 연결
- [의사결정 로그](32_DECISION_LOG.md) — 클라이언트 관련 결정 추적

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/35_PROJECT_MEMORY.md =====

# 35 · 프로젝트 메모리(Project Memory)

| 항목 | 내용 |
| --- | --- |
| **목적** | 프로젝트의 결정·가정·미해결 질문·용어집·현재 상태·리스크를 하나의 살아있는 상태(state)로 유지하여, 모든 에이전트가 동일한 맥락 위에서 작업하게 한다. |
| **대상 독자** | 전 에이전트(작업 시작 전 필독), Project Director, Product Owner |
| **담당(Owner) 에이전트** | Project Director (자동 갱신: 전 에이전트) |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **연계(하위 문서)** | [의사결정 로그](32_DECISION_LOG.md), [회의록](33_MEETING_NOTE.md), [클라이언트 지식베이스](34_CLIENT_KNOWLEDGE.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 프로젝트 메모리란

프로젝트 메모리는 "지금 이 프로젝트가 어디에 와 있는가"를 한곳에서 알려주는 **살아있는 단일 상태**다. 정적인 보고서가 아니라, 결정이 나거나 상황이 바뀔 때마다 갱신되는 작업 메모리다.

AI 에이전트는 컨텍스트를 영구히 기억하지 못한다. 프로젝트 메모리는 그 빈자리를 메우는 **조직의 외장 기억장치**다. 모든 에이전트는 작업 시작 전 이 문서를 읽고, 작업 후 변경분을 반영한다.

### 기록 대상

| 구획 | 무엇을 담는가 | 갱신 시점 |
| --- | --- | --- |
| **결정(Decisions)** | 확정된 결정의 한 줄 요약 + ADR 링크 | ADR 생성 즉시 |
| **가정(Assumptions)** | 검증 전제로 깔고 가는 전제 | 가정 도입/검증 시 |
| **미해결 질문(Open Questions)** | 답을 기다리는 질문 + 담당/기한 | 발생/해소 시 |
| **용어집(Glossary)** | 프로젝트·도메인 용어 정의 | 새 용어 등장 시 |
| **현재 상태(Current State)** | 단계·진척·차단 요소 | 마일스톤/주간 |
| **리스크(Risks)** | 리스크·영향·대응 | 식별/변동 시 |

---

## 2. 구조화 스키마

프로젝트 메모리는 사람과 에이전트가 모두 읽도록 마크다운 + 선택적 frontmatter로 구조화한다.

```yaml
---
project: <프로젝트 코드>
client: <클라이언트 코드명>
phase: 제안 | 분석 | 설계 | 구현 | QA | 릴리스 | 유지
owner: <역할>
last_updated: YYYY-MM-DD
status: active | paused | closed
---
```

본문 섹션 순서: `결정 → 가정 → 미해결 질문 → 용어집 → 현재 상태 → 리스크`. 각 항목은 표로 누적하며, 항목 삭제 대신 상태 변경(해소/폐기)으로 이력을 보존한다.

---

## 3. 채워진 스냅샷 — 본 워크스페이스 부트스트랩(첫 메모리 항목)

```yaml
---
project: GOLDWIKI-BOOTSTRAP
client: 내부(Goldwiki Digital)
phase: 구현
owner: Project Director
last_updated: 2026-06-26
status: active
---
```

### 결정(Decisions)
| # | 결정 요약 | ADR |
| --- | --- | --- |
| 1 | 골드위키(`/GoldWiki`)를 조직의 단일 진실 원천으로 삼는다 | (헌장) |
| 2 | 모든 AI 에이전트는 행동 전 골드위키를 먼저 참조한다 | (헌장) |
| 3 | 디자인 토큰 관리는 Style Dictionary를 사용한다 | [ADR-0001](32_DECISION_LOG.md) |
| 4 | 접근성 기준선은 WCAG 2.2 AA | [ADR-0002](32_DECISION_LOG.md) |
| 5 | RFP 분석은 멀티에이전트 파이프라인으로 수행한다 | [ADR-0003](32_DECISION_LOG.md) |
| 6 | v1 API는 REST(OpenAPI 3.1) | [ADR-0004](32_DECISION_LOG.md) |
| 7 | 핵심 제안은 HTML 프로토타입 우선 | [ADR-0005](32_DECISION_LOG.md) |

### 가정(Assumptions)
| # | 가정 | 검증 책임 | 상태 |
| --- | --- | --- | --- |
| 1 | 22개 서브에이전트 정의가 `.claude/agents/`에 존재한다 | Documentation Specialist | 검증중 |
| 2 | 골드위키 40개 문서 체계가 표준 골격을 따른다 | Project Director | 검증중 |
| 3 | 에이전트는 상대 링크로 문서 간 탐색이 가능하다 | AI Engineer | 유효 |

### 미해결 질문(Open Questions)
| # | 질문 | 담당 | 기한 | 상태 |
| --- | --- | --- | --- | --- |
| 1 | 골드위키 변경 시 자동 인덱싱 파이프라인을 둘 것인가 | AI Engineer | 2026-07-05 | 열림 |
| 2 | 문서 간 링크 무결성 검사를 CI에 추가할 것인가 | DevOps Engineer | 2026-07-08 | 열림 |

### 용어집(Glossary)
| 용어 | 정의 |
| --- | --- |
| 골드위키(Gold Wiki) | `/GoldWiki` 지식베이스. 조직의 단일 진실 원천 |
| ADR | 아키텍처 의사결정 기록. [32](32_DECISION_LOG.md) 참조 |
| 부트스트랩 | 워크스페이스 초기 지식·에이전트 체계를 구축하는 작업 |
| 단일 진실 원천(SSOT) | 중복 없는 단일 권위 소스 |

### 현재 상태(Current State)
- 골드위키 40개 문서 작성 진행 중. 32–40 지식/메모리 계층 작성 단계.
- 22개 서브에이전트 정의 정비 병행.
- 차단 요소: 없음.

### 리스크(Risks)
| # | 리스크 | 영향 | 가능성 | 대응 |
| --- | --- | --- | --- | --- |
| 1 | 문서 간 용어 불일치 | 중 | 중 | 공유 스펙·용어집으로 통일, 검수 |
| 2 | 링크 깨짐(파일명 오타) | 중 | 중 | 링크 무결성 검사 도입 검토(미해결 Q2) |
| 3 | 에이전트가 메모리 갱신을 누락 | 높음 | 중 | 거버넌스 인용구로 갱신 의무화 |

---

## 3-1. 스냅샷 — MERITZ-2025-TM (RFP 분석)

```yaml
---
project: MERITZ-2025-TM
client: 메리츠화재 TM사업부문
phase: 제안
owner: rfp-strategy-lead
last_updated: 2026-06-27
status: active
---
```

### 결정(Decisions)
| # | 결정 요약 | ADR |
| --- | --- | --- |
| 1 | 메리츠화재 인터넷 마케팅 플랫폼 운영(2025) 입찰 **참여(Bid)** | [ADR-0006](32_DECISION_LOG.md) |
| 2 | 별첨4는 **보장분석 전환율 + 펫보험 이탈율** 2과제로 대응 | [ADR-0006](32_DECISION_LOG.md) |

### 가정(Assumptions)
| # | 가정 | 검증 책임 | 상태 |
| --- | --- | --- | --- |
| 1 | 상주 9.0 MM/월(현행 9명 등급) 체계 유지 가능 | pmo-director | 검증중 |
| 2 | 단가 동결(C-001)을 견디는 원가 구조 설계 가능 | executive-director | 검증중 |
| 3 | 금융 보안·개인정보 운영 거버넌스 충족 가능 | security-risk-lead | 검증중 |

### 미해결 질문(Open Questions)
| # | 질문 | 담당 | 기한 | 상태 |
| --- | --- | --- | --- | --- |
| 1 | 포괄 조항(R-010) 업무량 상한·변경관리 기준 | rfp-strategy-lead | Q&A 마감 | 열림 |
| 2 | 분기 평가에 따른 MM 증감 단가·정산 방식 | executive-director | Q&A 마감 | 열림 |
| 3 | 신규 서비스 구축의 개발 범위 경계 | rfp-strategy-lead | Q&A 마감 | 열림 |

### 현재 상태(Current State)
- `/rfp-start` 분석 패키지(자체 채점 88, G2 통과): [Examples/RFP_Analysis_Meritz_2025.md](../Examples/RFP_Analysis_Meritz_2025.md).
- 별첨4 ① 보장분석 SB + 동작 프로토타입: [SB](../Examples/Meritz_별첨4_보장분석_SB초안.md) · `Examples/prototypes/meritz-bojang-analysis.html`.
- 별첨4 ② 펫보험 SB + 동작 프로토타입: [SB](../Examples/Meritz_별첨4_펫보험_SB초안.md) · `Examples/prototypes/meritz-pet-insurance.html`.
- 제안서 본문 초안(필수 목차·평가 80:20 대응): [Examples/Meritz_제안서_본문.md](../Examples/Meritz_제안서_본문.md).
- Figma 6화면 시각화(clubschool 팀): https://www.figma.com/design/5Ryfm9XmHglumCbWWIUEJN
- 다음: 별첨3 인력 경력 → 원가/가격 확정 → PT(30분) 자료 구성.

### 리스크(Risks)
| # | 리스크 | 영향 | 가능성 | 대응 |
| --- | --- | --- | --- | --- |
| 1 | 가격 경쟁(차순위 −5점) | 높음 | 높음 | 최저임금 준수 원가 최적화, 2위 이내 + 기술 우위 |
| 2 | 인력 연속성(2년+연장) | 높음 | 중간 | 백업 풀·지식 이관 SOP |
| 3 | 단가 동결 원가 부담(C-001) | 중간 | 높음 | 보수적 단가 설계 |
| 4 | 금융 보안·개인정보 | 높음 | 중간 | 보안 거버넌스·접근통제·감사로그 |

---

## 4. 운영 규칙

1. **작업 전 읽기, 작업 후 쓰기** — 모든 에이전트의 기본 루프.
2. **결정은 ADR과 동기화** — 결정 섹션은 [의사결정 로그](32_DECISION_LOG.md)의 거울이다.
3. **가정은 반드시 검증 책임자를 단다** — 검증되지 않은 가정은 리스크로 승격될 수 있다.
4. **미해결 질문은 방치 금지** — 기한 도래 시 에스컬레이션.
5. **상태는 정직하게** — 진척 과장 금지. "차단됨"은 차단됨으로 기록한다.

---

## 관련 골드위키 문서

- [의사결정 로그](32_DECISION_LOG.md) — 결정 섹션의 원본
- [회의록](33_MEETING_NOTE.md) — 상태 변화의 입력원
- [클라이언트 지식베이스](34_CLIENT_KNOWLEDGE.md) — 클라이언트 맥락 연결
- [서브에이전트 규칙](28_SUBAGENT_RULES.md) — 에이전트의 메모리 읽기/쓰기 의무
- [품질 체크리스트](29_QUALITY_CHECKLIST.md) — 상태 검증 기준
- [베스트 프랙티스](37_BEST_PRACTICES.md) — 검증된 패턴의 승격처

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/36_REFERENCE_LIBRARY.md =====

# 36 · 레퍼런스 라이브러리(Reference Library)

| 항목 | 내용 |
| --- | --- |
| **목적** | 골드위키 디지털이 신뢰하는 외부 레퍼런스·표준을 분야별로 큐레이션하고, 각 자료의 중요성과 내부 문서와의 상호참조를 정리한다. |
| **대상 독자** | 전 직군·전 에이전트(근거 확인이 필요한 모든 작업) |
| **담당(Owner) 에이전트** | Documentation Specialist (분야별 검수: 각 도메인 리드) |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [베스트 프랙티스](37_BEST_PRACTICES.md) |
| **연계(하위 문서)** | [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 사용 원칙

1. **표준을 근거로 말한다** — 주장에는 출처를 단다. 권위 있는 1차 표준을 우선한다.
2. **버전을 명시한다** — 표준·도구는 버전이 결정을 바꾼다(예: WCAG 2.2 vs 2.1).
3. **내부 적용처를 연결한다** — 외부 표준은 항상 그것을 적용하는 내부 골드위키 문서와 묶는다.
4. **링크가 아니라 이유를 기록한다** — "왜 이 자료가 중요한가"를 한 줄로 남긴다.

---

## 2. 분야별 레퍼런스

### 2.1 UX / 사용성
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| Nielsen Norman Group (NN/g) | 사용성 휴리스틱·리서치 방법론 | 사용성 평가의 사실상 표준 어휘 제공 | [UX 원칙](07_UX_PRINCIPLES.md) |
| Jakob Nielsen 10대 휴리스틱 | 인터페이스 평가 10원칙 | 휴리스틱 평가의 기준 프레임 | [UX 원칙](07_UX_PRINCIPLES.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| 《About Face》(Cooper) | 인터랙션 디자인 원론 | 목표 지향 설계의 이론적 토대 | [유저 플로우](12_USER_FLOW.md), [유저 저니](13_USER_JOURNEY.md) |

### 2.2 접근성 / WCAG
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| W3C WCAG 2.2 | 웹 접근성 국제 표준 | 전사 접근성 기준선(AA), 법적 방어선 | [접근성](16_ACCESSIBILITY.md), ADR-0002 |
| WAI-ARIA Authoring Practices | 위젯 접근성 구현 패턴 | 컴포넌트 접근성 구현의 정답지 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) |
| 한국형 웹콘텐츠 접근성 지침(KWCAG) | 국내 공공 접근성 기준 | 국내 공공·금융 사업 필수 | [접근성](16_ACCESSIBILITY.md) |

### 2.3 디자인 시스템 / 토큰
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| W3C Design Tokens Community Group | 토큰 포맷 표준 초안 | 토큰 상호운용성 기준 | [디자인 토큰](15_DESIGN_TOKEN.md), ADR-0001 |
| Style Dictionary | 토큰 변환·빌드 도구 | 다중 플랫폼 토큰 배포 표준 도구 | [디자인 토큰](15_DESIGN_TOKEN.md) |
| Material Design / Apple HIG | 플랫폼 디자인 가이드 | 플랫폼 규범·관습의 기준점 | [UI 가이드라인](08_UI_GUIDELINES.md), [디자인 시스템](09_DESIGN_SYSTEM.md) |

### 2.4 웹 플랫폼 / 프론트엔드
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| MDN Web Docs | HTML/CSS/JS 권위 레퍼런스 | 프론트 구현의 1차 사실 출처 | [HTML](17_HTML_GUIDE.md), [CSS](18_CSS_GUIDE.md), [JS](19_JS_GUIDE.md) |
| web.dev (Core Web Vitals) | 성능·UX 지표 가이드 | 성능 목표(LCP/INP/CLS) 기준 | [프론트엔드 가이드](20_FRONTEND_GUIDE.md) |
| WHATWG HTML Living Standard | HTML 명세 원본 | 시맨틱·접근성 트리의 근거 | [HTML 가이드](17_HTML_GUIDE.md) |

### 2.5 API 설계
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| OpenAPI Specification 3.1 | REST API 기술 표준 | 전사 API 계약 표준 | [API 표준](22_API_STANDARD.md), ADR-0004 |
| RFC 9110 (HTTP Semantics) | HTTP 의미론 | 메서드·상태코드 사용의 근거 | [API 표준](22_API_STANDARD.md) |
| JSON:API / RFC 7807(Problem Details) | 응답·에러 포맷 규약 | 일관된 응답/에러 구조 | [API 표준](22_API_STANDARD.md), [백엔드 가이드](21_BACKEND_GUIDE.md) |

### 2.6 보안 / OWASP
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| OWASP Top 10 | 주요 웹 취약점 목록 | 보안 최소 점검 기준 | [보안 가이드](24_SECURITY_GUIDE.md) |
| OWASP ASVS | 애플리케이션 보안 검증 표준 | 보안 요구사항 레벨 정의 | [보안 가이드](24_SECURITY_GUIDE.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| OWASP Cheat Sheet Series | 주제별 보안 구현 가이드 | 실무 보안 구현 정답지 | [백엔드 가이드](21_BACKEND_GUIDE.md), [API 표준](22_API_STANDARD.md) |

### 2.7 테스트 / 품질
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| 테스트 피라미드(Cohn) | 단위/통합/E2E 비율 모델 | 테스트 투자 배분 기준 | [테스트 전략](30_TEST_STRATEGY.md) |
| ISTQB 용어집 | 테스트 표준 용어 | 품질 용어 통일 | [테스트 전략](30_TEST_STRATEGY.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| axe-core / Lighthouse | 자동 접근성·품질 검사 도구 | 회귀 방지 자동화 | [접근성](16_ACCESSIBILITY.md), [프론트엔드 가이드](20_FRONTEND_GUIDE.md) |

### 2.8 AI / 프롬프팅
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| Anthropic 프롬프트 엔지니어링 가이드 | Claude 프롬프트 설계 원칙 | 에이전트 프롬프트 품질 기준 | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md), [프롬프트 라이브러리](40_PROMPT_LIBRARY.md) |
| Model Context Protocol(MCP) | 도구·컨텍스트 연결 프로토콜 | 에이전트-도구 연동 표준 | [AI 가이드](25_AI_GUIDE.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) |
| OWASP Top 10 for LLM | LLM 애플리케이션 보안 위협 | 프롬프트 인젝션 등 방어 기준 | [AI 가이드](25_AI_GUIDE.md), [보안 가이드](24_SECURITY_GUIDE.md) |

---

## 3. 내부 상호참조 맵

외부 표준 → 그것을 규정·적용하는 골드위키 문서의 매핑이다.

| 외부 표준 | 표준화 ADR | 1차 적용 문서 | 검수 문서 |
| --- | --- | --- | --- |
| WCAG 2.2 AA | ADR-0002 | [16](16_ACCESSIBILITY.md) | [29](29_QUALITY_CHECKLIST.md) |
| Style Dictionary | ADR-0001 | [15](15_DESIGN_TOKEN.md) | [09](09_DESIGN_SYSTEM.md) |
| OpenAPI 3.1 | ADR-0004 | [22](22_API_STANDARD.md) | [30](30_TEST_STRATEGY.md) |
| OWASP Top 10 | — | [24](24_SECURITY_GUIDE.md) | [29](29_QUALITY_CHECKLIST.md) |
| Core Web Vitals | — | [20](20_FRONTEND_GUIDE.md) | [30](30_TEST_STRATEGY.md) |
| MCP | — | [25](25_AI_GUIDE.md) | [27](27_AUTOMATION_WORKFLOW.md) |

---

## 4. 자료 추가 규칙

- 새 자료는 분야·중요성·내부 적용처를 함께 기록한다.
- 결정에 영향을 준 자료는 해당 ADR에 역링크한다.
- 표준 버전 변경(예: WCAG 차기 버전) 시 [의사결정 로그](32_DECISION_LOG.md)에 재평가 ADR을 연다.

---

## 관련 골드위키 문서

- [베스트 프랙티스](37_BEST_PRACTICES.md) — 표준을 실행 규칙으로 번역한 계층
- [의사결정 로그](32_DECISION_LOG.md) — 표준 채택 결정의 근거 기록
- [접근성](16_ACCESSIBILITY.md) · [API 표준](22_API_STANDARD.md) · [보안 가이드](24_SECURITY_GUIDE.md) — 표준의 주 적용처
- [AI 가이드](25_AI_GUIDE.md) · [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md) — AI 분야 표준 적용처
- [프로젝트 메모리](35_PROJECT_MEMORY.md) — 표준 적용 상태 추적

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/37_BEST_PRACTICES.md =====

# 37 · 베스트 프랙티스(Best Practices) — 지혜 계층

| 항목 | 내용 |
| --- | --- |
| **목적** | 전 분야에서 반복 검증된 모범 실천을 도메인별로 간결하고 실행 가능한 규칙으로 정리한다. 골드위키의 "지혜 계층"으로서 의사결정의 기본값을 제공한다. |
| **대상 독자** | 전 직군·전 에이전트 |
| **담당(Owner) 에이전트** | Project Director (도메인별 검수: 각 리드) |
| **참조(상위 문서)** | [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md), [의사결정 로그](32_DECISION_LOG.md) |
| **연계(하위 문서)** | 각 도메인 가이드 문서 전체 |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 사용법

각 규칙은 **기본값(default)** 이다. 어기려면 [의사결정 로그](32_DECISION_LOG.md)에 ADR로 근거를 남긴다. 검증을 거쳐 새로 승격된 규칙은 이 문서에 추가한다.

---

## 1. 제안(Proposal)
1. RFP의 **평가 배점**을 먼저 분해하고, 모든 제안 노력을 배점 비중에 정렬한다.
2. 요구사항은 **추적표(ID-요구-근거-대응)** 로 관리해 누락 0을 목표로 한다.
3. 차별화는 "우리가 잘하는 것"이 아니라 "클라이언트가 평가하는 것"에서 찾는다.
4. 핵심 메시지는 **경영 요약 1페이지**로 먼저 쓰고 본문을 거기에 맞춘다.
5. 동작하는 **HTML 프로토타입**으로 설득력을 높인다(ADR-0005).

## 2. UX
6. 모든 화면은 **사용자 목표**와 한 줄로 연결되어야 한다.
7. 설계 전 **유저 플로우**부터 그려 단계 수와 분기를 가시화한다.
8. 가정이 아니라 **근거(리서치/데이터)** 로 설계를 정당화한다.
9. 단계 수를 줄이는 것이 기능을 더하는 것보다 대개 낫다.
10. 에러·빈 상태·로딩 상태를 정상 상태와 동등하게 설계한다.

## 3. UI
11. 색·간격·타이포는 **디자인 토큰**에서만 가져온다(하드코딩 금지).
12. 본문 대비비 **4.5:1 이상**을 기본값으로 한다(WCAG 2.2 AA).
13. 터치 타깃 최소 **44×44px**, 인접 요소 간 충분한 간격을 둔다.
14. 일관성 > 창의성: 동일 의미는 동일 컴포넌트로 표현한다.
15. 시각적 위계를 명도·크기·여백으로 만든다(장식 남용 금지).

## 4. 디자인 시스템
16. 단일 토큰 원천(JSON) → Style Dictionary로 다중 플랫폼 배포(ADR-0001).
17. 컴포넌트는 **상태(state)·변형(variant)** 까지 정의해야 완성으로 본다.
18. 접근성 패턴(ARIA)을 컴포넌트 정의에 내장한다.
19. 토큰·컴포넌트 변경은 버전과 변경 로그를 남긴다.

## 5. 프론트엔드
20. **시맨틱 HTML**을 먼저 쓰고 스타일·스크립트를 얹는다.
21. Core Web Vitals(LCP/INP/CLS) 목표를 빌드 게이트로 둔다.
22. 점진적 향상(progressive enhancement): JS 없이도 핵심 동작이 가능해야 한다.
23. 상태와 부수효과를 분리하고, DOM 직접 조작을 최소화한다.
24. 번들 크기·이미지 최적화·지연 로딩을 기본 적용한다.

## 6. 백엔드
25. 입력은 **신뢰하지 않는다** — 경계에서 검증·정규화한다.
26. 비즈니스 로직과 I/O(저장소·외부 API)를 계층 분리한다.
27. 멱등성(idempotency)이 필요한 연산은 멱등 키로 보장한다.
28. 모든 외부 호출에 타임아웃·재시도·서킷브레이커를 둔다.
29. 구조화 로깅 + 상관관계 ID로 추적성을 확보한다.

## 7. API
30. REST는 **명사 자원 + HTTP 메서드 의미**를 따른다(RFC 9110).
31. 모든 변경은 OpenAPI 3.1 계약을 **먼저** 갱신한다(계약 우선).
32. 에러는 RFC 7807(Problem Details) 형식으로 일관되게 반환한다.
33. 버저닝 전략(URL 또는 헤더)을 정하고 하위 호환을 지킨다.
34. 페이지네이션·필터·정렬 규약을 전역으로 통일한다.

## 8. 데이터베이스
35. 스키마는 **마이그레이션 파일**로만 변경한다(수동 변경 금지).
36. 인덱스는 실제 쿼리 패턴에 근거해 설계한다(추측 인덱싱 금지).
37. 외래키·제약으로 무결성을 DB 차원에서 강제한다.
38. 개인정보·민감정보는 암호화·마스킹 정책을 적용한다.
39. N+1 쿼리를 코드 리뷰 체크 항목으로 둔다.

## 9. 보안
40. 최소 권한 원칙(least privilege)을 기본값으로 한다.
41. OWASP Top 10을 최소 점검선으로 모든 릴리스에 적용한다.
42. 비밀값은 코드·로그에 절대 남기지 않는다(시크릿 매니저 사용).
43. 인증/인가는 검증된 라이브러리를 쓰고 자체 구현하지 않는다.
44. 의존성 취약점을 CI에서 자동 스캔한다.

## 10. AI / 에이전트
45. 모든 에이전트는 **행동 전 골드위키를 먼저 참조**한다.
46. 프롬프트는 [프롬프트 라이브러리](40_PROMPT_LIBRARY.md)의 표준을 재사용한다.
47. 출력은 검증 가능한 형식으로 요구하고, 사실 주장에는 출처를 단다.
48. 프롬프트 인젝션을 신뢰 경계로 다룬다(OWASP Top 10 for LLM).
49. 에이전트 결정은 [의사결정 로그](32_DECISION_LOG.md)·[프로젝트 메모리](35_PROJECT_MEMORY.md)에 기록한다.

## 11. QA
50. 테스트 피라미드를 따른다: 단위 다수, 통합 적정, E2E 소수.
51. 버그는 재현 테스트를 먼저 작성한 뒤 고친다(회귀 방지).
52. 접근성·성능 검사를 자동화 게이트로 둔다(axe-core/Lighthouse).
53. "완료(Done)"의 정의(DoD)를 사전에 합의한다.

## 12. 문서
54. 코드/디자인보다 **결정의 이유**를 우선 기록한다(ADR).
55. 중복 지식을 금지한다 — 한 사실은 한곳에만, 나머지는 링크.
56. 모든 문서는 담당(Owner)과 최종 수정일을 유지한다.
57. 템플릿은 [템플릿 라이브러리](38_TEMPLATE_LIBRARY.md)에서 가져온다.

## 13. 협업
58. 액션아이템에는 항상 담당자와 기한이 있다.
59. 비동기 우선: 결정·맥락을 글로 남겨 회의를 줄인다.
60. 차단 요소는 즉시 가시화하고 에스컬레이션 경로를 따른다.
61. 인수인계는 [프로젝트 메모리](35_PROJECT_MEMORY.md) 상태 기준으로 한다.

---

## 규칙 승격 절차

1. 특정 결정이 둘 이상 프로젝트에서 반복 검증되면 →
2. 해당 도메인 리드가 본 문서에 규칙으로 추가 제안 →
3. Project Director 승인 후 번호 부여·등재 →
4. 관련 ADR과 [프로젝트 메모리](35_PROJECT_MEMORY.md)에 동기화.

---

## 관련 골드위키 문서

- [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md) — 각 규칙의 외부 표준 근거
- [의사결정 로그](32_DECISION_LOG.md) — 규칙의 예외·변경 기록처
- [품질 체크리스트](29_QUALITY_CHECKLIST.md) — 규칙의 검수 적용
- [공통 오류](39_COMMON_ERRORS.md) — 규칙 위반 시 나타나는 증상
- [프롬프트 라이브러리](40_PROMPT_LIBRARY.md) — AI 규칙의 실행 도구
- [프로젝트 메모리](35_PROJECT_MEMORY.md) — 규칙 적용 상태

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/38_TEMPLATE_LIBRARY.md =====

# 38 · 템플릿 라이브러리(Template Library)

| 항목 | 내용 |
| --- | --- |
| **목적** | 제안·기획·설계·개발·릴리스 전 과정에서 즉시 복사하여 쓸 수 있는 재사용 문서·아티팩트 템플릿을 한곳에 모은다. |
| **대상 독자** | 전 직군·전 에이전트 |
| **담당(Owner) 에이전트** | Documentation Specialist (도메인별 검수: 각 리드) |
| **참조(상위 문서)** | [베스트 프랙티스](37_BEST_PRACTICES.md), [회사 컨텍스트](01_COMPANY_CONTEXT.md) |
| **연계(하위 문서)** | [의사결정 로그](32_DECISION_LOG.md), [테스트 전략](30_TEST_STRATEGY.md), [릴리스 프로세스](31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 사용법

아래 코드펜스를 그대로 복사하여 새 산출물의 출발점으로 쓴다. `<…>`·`{…}`는 채워 넣을 자리다. 빈 채로 두지 않는다.

---

## 1. 제안서(Proposal)

```markdown
# 제안서 · {프로젝트명}

## 1. 제안 개요
- 발주처 / 사업명 / 제출일 / 제안 유효기간

## 2. 제안 배경과 이해
- 클라이언트가 처한 문제와 목표(우리의 해석)

## 3. 핵심 제안 전략(차별화)
- 평가 배점에 정렬된 3대 핵심 메시지

## 4. 사업 범위(Scope)
- 포함 / 제외(Out of scope)

## 5. 추진 방안
- 방법론, 단계, 핵심 산출물

## 6. 일정과 마일스톤(WBS 요약)

## 7. 투입 인력과 역할(R&R)

## 8. 품질·접근성·보안 기준
- WCAG 2.2 AA / OWASP Top 10 / 테스트 전략

## 9. 리스크와 대응

## 10. 견적과 산정 근거

## 부록
- 레퍼런스, 프로토타입 링크
```

## 2. 경영 요약(Executive Summary)

```markdown
# 경영 요약 · {프로젝트명} (1페이지)

- **문제:** {한 문장으로 클라이언트의 핵심 문제}
- **제안:** {우리가 제시하는 해법 한 문장}
- **핵심 가치 3가지:**
  1. {평가 기준 1에 정렬된 가치}
  2. {평가 기준 2에 정렬된 가치}
  3. {평가 기준 3에 정렬된 가치}
- **기대 효과(측정 가능):** {지표 + 목표치}
- **일정·비용 요약:** {기간} / {금액 또는 범위}
- **리스크 한 줄:** {최대 리스크 + 대응}
- **다음 단계:** {의사결정 요청 사항}
```

## 3. WBS(작업분해구조)

```markdown
# WBS · {프로젝트명}

| WBS ID | 작업(Task) | 산출물 | 담당 | 선행작업 | 시작 | 종료 | 공수(MD) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 분석 | | | | | | |
| 1.1 | 요구사항 정의 | 요구사항 추적표 | BA | - | | | |
| 2 | 설계 | | | | | | |
| 2.1 | IA/플로우 | 사이트맵·플로우 | UX | 1.1 | | | |
| 3 | 구현 | | | | | | |
| 4 | QA/릴리스 | 테스트 리포트 | QA | 3 | | | |
```

## 4. IA 사이트맵(Information Architecture)

```markdown
# 사이트맵 · {서비스명}

- 1.0 홈
  - 2.0 상품
    - 2.1 상품 목록
    - 2.2 상품 상세
  - 3.0 가입/청약
    - 3.1 약관 동의
    - 3.2 정보 입력
    - 3.3 본인 인증
    - 3.4 완료
  - 4.0 마이페이지
  - 5.0 고객센터

> 표기 규칙: {뎁스번호} {화면명} — 각 노드는 화면 목록의 ID와 1:1 매핑.
```

## 5. 유저 플로우(User Flow)

```markdown
# 유저 플로우 · {플로우명}

목표: {사용자가 달성하려는 것}
진입점: {어디서 시작}

[시작] → (정보 입력) → <검증 OK?>
  - 예 → (다음 단계) → [완료]
  - 아니오 → (에러 안내) → (정보 입력)으로 복귀

분기/예외:
- 미인증 사용자: 로그인 플로우로 우회
- 타임아웃: 세션 만료 안내 후 재시작

성공 기준: {완료율/소요시간 목표}
```

## 6. 화면 목록(Screen List)

```markdown
# 화면 목록 · {서비스명}

| 화면 ID | 화면명 | IA 위치 | 주요 기능 | 상태 정의(빈/로딩/에러) | 접근성 유의점 | 담당 |
| --- | --- | --- | --- | --- | --- | --- |
| SC-001 | 홈 | 1.0 | 핵심 진입 | 로딩 스켈레톤 | 랜드마크/제목 위계 | UI |
| SC-010 | 상품 상세 | 2.2 | 정보·CTA | 데이터 없음 안내 | 표 대체텍스트 | UI |
| SC-031 | 약관 동의 | 3.1 | 동의 처리 | 미동의 에러 | 체크박스 라벨 | UI |
```

## 7. UX 전략(UX Strategy)

```markdown
# UX 전략 · {프로젝트명}

- **타깃 사용자/페르소나:** {핵심 1~2}
- **핵심 사용자 목표(Jobs To Be Done):** {…}
- **설계 원칙 3가지:** {…}
- **핵심 여정과 전환 포인트:** {…}
- **측정 지표(North Star + 보조):** {…}
- **접근성 목표:** WCAG 2.2 AA
- **리스크와 검증 계획(리서치/테스트):** {…}
```

## 8. UI 컨셉 브리프(UI Concept Brief)

```markdown
# UI 컨셉 브리프 · {프로젝트명}

- **브랜드 톤앤매너:** {키워드 3개}
- **무드/레퍼런스:** {링크/설명}
- **컬러 방향:** {주조/보조/강조 — 토큰 기준}
- **타이포 시스템:** {서체/스케일}
- **레이아웃 그리드:** {컬럼/간격}
- **컴포넌트 우선순위:** {핵심 컴포넌트}
- **접근성 제약:** {대비/포커스/모션}
- **금지 사항:** {피할 표현}
```

## 9. 테스트 계획(Test Plan)

```markdown
# 테스트 계획 · {프로젝트명}

- **목적/범위:** {대상 기능}
- **테스트 레벨:** 단위 / 통합 / E2E / 접근성 / 성능 / 보안
- **환경:** {브라우저/디바이스/데이터}
- **완료 기준(Exit Criteria):** {커버리지/결함 기준}

| TC ID | 시나리오 | 전제 | 절차 | 기대 결과 | 우선순위 |
| --- | --- | --- | --- | --- | --- |
| TC-001 | 정상 가입 | 미가입 사용자 | 4단계 진행 | 완료 화면 노출 | 높음 |
| TC-002 | 약관 미동의 | - | 동의 없이 진행 | 차단·에러 안내 | 높음 |
```

## 10. 릴리스 노트(Release Notes)

```markdown
# 릴리스 노트 · {제품명} v{X.Y.Z} ({YYYY-MM-DD})

## 새로운 기능
- {사용자 관점 변화}

## 개선
- {성능·UX 개선}

## 버그 수정
- {수정된 문제}

## 호환성/마이그레이션
- {주의 사항}

## 알려진 이슈
- {미해결 항목 + 우회법}
```

## 11. ADR(아키텍처 의사결정 기록)

```markdown
### ADR-NNNN · {결정 제목}

- **상태:** 제안 | 승인 | 폐기 | 보류 | 반려
- **날짜:** YYYY-MM-DD
- **결정자:** {역할} (검토: {역할})

**맥락**
> {문제·제약}

**검토한 대안**
| 대안 | 장점 | 단점 |
| --- | --- | --- |

**결정**
> {무엇을 하기로 했는가}

**근거 / 결과(트레이드오프, 후속 조치)**
```

---

## 관련 골드위키 문서

- [의사결정 로그](32_DECISION_LOG.md) — ADR 템플릿의 운영처
- [회의록](33_MEETING_NOTE.md) — 회의록 템플릿 원본
- [테스트 전략](30_TEST_STRATEGY.md) — 테스트 계획 템플릿의 기준
- [릴리스 프로세스](31_RELEASE_PROCESS.md) — 릴리스 노트 운영 절차
- [정보구조](11_INFORMATION_ARCHITECTURE.md) · [유저 플로우](12_USER_FLOW.md) — IA/플로우 템플릿 적용처
- [베스트 프랙티스](37_BEST_PRACTICES.md) — 템플릿이 따르는 규칙

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/39_COMMON_ERRORS.md =====

# 39 · 공통 오류와 해결책(Common Errors)

| 항목 | 내용 |
| --- | --- |
| **목적** | 분야별로 반복되는 흔한 오류를 문제→원인→해결→예방 형식으로 정리하여, 같은 실수를 두 번 하지 않게 한다. |
| **대상 독자** | 전 직군·전 에이전트 |
| **담당(Owner) 에이전트** | QA Engineer (도메인별 검수: 각 리드) |
| **참조(상위 문서)** | [베스트 프랙티스](37_BEST_PRACTICES.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| **연계(하위 문서)** | 각 도메인 가이드 문서 |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 제안(Proposal)
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 제출 후 요구사항 누락 발견 | 요구사항을 추적표로 관리하지 않음 | 추적표로 전수 재점검 후 보완 제출 | 요구사항 추적표(ID-요구-대응) 의무화 |
| 평가에서 낮은 점수 | 노력이 배점 비중과 어긋남 | 배점 재분해 후 자원 재배분 | 착수 시 배점 분해표 작성([05](05_PROPOSAL_STRATEGY.md)) |
| 견적 초과/적자 | 공수 산정 누락(연동·QA 과소평가) | WBS 재산정, 버퍼 반영 | WBS 템플릿·과거 실적 기반 산정 |

## 2. UX
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 가입 이탈률 높음 | 단계 과다·맥락 단절 | 플로우 단계 축소·진행 표시 | 플로우 우선 설계, 단계 수 점검 |
| 사용자 불만 잦음 | 근거 없는 가정 설계 | 사용성 테스트로 검증·수정 | 리서치 근거 기반 설계 원칙 |
| 에러 상황 혼란 | 빈/에러/로딩 상태 미설계 | 모든 상태 화면 정의 | 상태 3종 설계 체크리스트 |

## 3. UI
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 화면마다 색·간격 불일치 | 값 하드코딩 | 디자인 토큰으로 치환 | 토큰만 사용 규칙(ADR-0001) |
| 동일 의미 다른 컴포넌트 | 컴포넌트 가이드 부재 | 컴포넌트 통합·표준화 | [14](14_COMPONENT_LIBRARY.md) 준수 |
| 모바일 터치 오작동 | 타깃 크기 부족 | 44×44px 이상으로 조정 | UI 규칙 13 적용 |

## 4. 접근성(Accessibility)
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 대비 부족으로 가독성 저하 | 색상 대비 미검증 | 대비 4.5:1 이상으로 조정 | 토큰에 대비 검사 내장 |
| 스크린리더 탐색 불가 | 시맨틱/ARIA 누락 | 랜드마크·라벨·역할 보강 | WAI-ARIA 패턴 준수 |
| 키보드로 조작 불가 | 포커스 관리 누락 | 포커스 순서·트랩 구현 | 키보드 테스트 게이트 |

## 5. 프론트엔드
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 초기 로딩 느림(LCP 나쁨) | 대형 이미지·블로킹 리소스 | 이미지 최적화·지연 로딩 | Core Web Vitals 빌드 게이트 |
| 레이아웃 깜빡임(CLS) | 크기 미지정 미디어 | width/height·aspect-ratio 지정 | 컴포넌트 규칙화 |
| JS 비활성 시 동작 불가 | 점진적 향상 미적용 | 핵심 동작 서버/시맨틱 보장 | progressive enhancement |

## 6. 백엔드
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 외부 API 장애 시 전체 지연 | 타임아웃·차단 부재 | 타임아웃·서킷브레이커 도입 | 외부 호출 표준 래퍼 |
| 중복 요청으로 중복 처리 | 멱등성 미보장 | 멱등 키 도입 | 결제 등 멱등 설계 의무 |
| 장애 원인 추적 불가 | 비구조화 로깅 | 구조화 로깅+상관 ID | 로깅 표준 적용 |

## 7. API
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 클라이언트마다 다른 에러 처리 | 에러 포맷 비표준 | RFC 7807로 통일 | 응답/에러 규약([22](22_API_STANDARD.md)) |
| 변경으로 클라이언트 깨짐 | 하위 호환 위반 | 버전 분리·디프리케이션 절차 | 계약 우선·SemVer |
| 문서와 실제 응답 불일치 | 문서 수기 관리 | OpenAPI에서 자동 생성 | 계약 우선 개발 |

## 8. 데이터베이스
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 목록 조회 급격히 느려짐 | N+1 쿼리 | 조인·일괄 조회로 변경 | 리뷰 체크 항목화 |
| 운영 중 스키마 깨짐 | 수동 변경 | 마이그레이션으로 복구·정렬 | 마이그레이션 강제 |
| 데이터 정합성 오류 | 제약 미설정 | FK·유니크 제약 추가 | DB 차원 무결성 강제 |

## 9. 보안(Security)
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 시크릿 유출 | 코드/로그에 키 노출 | 키 회수·교체, 시크릿 매니저 이관 | 시크릿 스캔 CI |
| XSS/인젝션 | 입력 미검증·미이스케이프 | 입력 검증·출력 인코딩 | OWASP Top 10 점검 |
| 권한 상승 | 인가 검증 누락 | 서버측 인가 일원화 | 최소 권한·인가 테스트 |

## 10. AI / 프롬프팅
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 환각(없는 사실 생성) | 출처·근거 미요구 | 출처 명시·검증 단계 추가 | 검증 가능 형식 강제(BP 47) |
| 프롬프트 인젝션 | 외부 입력 무비판 수용 | 입력 격리·권한 분리 | OWASP LLM Top 10 적용 |
| 골드위키 미참조로 모순된 결정 | 사전 조회 누락 | 메모리/ADR 대조 후 정정 | "행동 전 골드위키 참조" 규칙 |

## 11. 프로세스
| 문제 | 원인 | 해결 | 예방 |
| --- | --- | --- | --- |
| 결정 재논의 반복 | ADR 미기록 | 결정을 ADR로 소급 기록 | 결정 즉시 ADR화([32](32_DECISION_LOG.md)) |
| 액션 미이행 | 담당/기한 부재 | 담당·기한 부여, 추적 | 회의록 액션표 의무 |
| 인수인계 혼선 | 상태 기록 부재 | 프로젝트 메모리로 정렬 | [35](35_PROJECT_MEMORY.md) 기준 인계 |

---

## 신규 오류 등재 절차

1. QA·리뷰에서 새 유형의 오류 발견 시 →
2. 문제·원인·해결·예방 4칸으로 해당 도메인 표에 추가 →
3. 예방책이 규칙으로 일반화되면 [베스트 프랙티스](37_BEST_PRACTICES.md)로 승격.

---

## 관련 골드위키 문서

- [베스트 프랙티스](37_BEST_PRACTICES.md) — 예방책의 규칙화 계층
- [품질 체크리스트](29_QUALITY_CHECKLIST.md) — 오류 사전 차단 점검
- [테스트 전략](30_TEST_STRATEGY.md) — 회귀 방지 테스트
- [보안 가이드](24_SECURITY_GUIDE.md) · [API 표준](22_API_STANDARD.md) — 도메인별 상세
- [의사결정 로그](32_DECISION_LOG.md) — 재발 방지 결정 기록
- [프롬프트 라이브러리](40_PROMPT_LIBRARY.md) — AI 오류 예방 프롬프트

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/40_PROMPT_LIBRARY.md =====

# 40 · 프롬프트 라이브러리(Prompt Library)

| 항목 | 내용 |
| --- | --- |
| **목적** | 주요 과업·에이전트에 즉시 복사하여 쓸 수 있는 검증된 프롬프트를 한곳에 모은다. 모든 프롬프트는 파라미터화되어 재사용 가능하다. |
| **대상 독자** | 전 에이전트, 프롬프트 작성·운영자 |
| **담당(Owner) 에이전트** | AI Engineer (공동: 각 도메인 리드) |
| **참조(상위 문서)** | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md), [AI 가이드](25_AI_GUIDE.md) |
| **연계(하위 문서)** | [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md), [서브에이전트 규칙](28_SUBAGENT_RULES.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 사용 규칙

1. `{플레이스홀더}`는 실제 값으로 치환한다.
2. 모든 프롬프트는 **출력 형식**과 **검증 가능성**을 명시한다(환각 방지).
3. 모든 에이전트는 실행 전 골드위키 관련 문서를 먼저 참조한다.
4. 결과로 나온 결정은 [의사결정 로그](32_DECISION_LOG.md)·[프로젝트 메모리](35_PROJECT_MEMORY.md)에 기록한다.

---

### P-01 · RFP 분석 (담당: Proposal Strategist)
```
역할: 당신은 RFP 분석 전문가다. 먼저 골드위키 [03 RFP 프레임워크]를 참조한다.
입력 RFP: {RFP 전문 또는 핵심 발췌}
과업: 다음을 표로 추출하라.
1) 사업 개요·목표 2) 평가 항목과 배점 3) 명시적 요구사항 4) 암묵적 기대
5) 일정·마일스톤 6) 제약·전제 7) 즉시 질의할 모호 사항
출력: 한국어 표. 근거가 불명확한 항목은 "근거 불충분"으로 표시하고 추정하지 말 것.
```
사용 노트: 산출표는 P-02 입력으로 연결.

### P-02 · 요구사항 추출 (담당: Business Analyst)
```
역할: 요구사항 분석가. 골드위키 [06 비즈니스 분석] 참조.
입력: {P-01 분석 결과 / 회의록}
과업: 요구사항을 추적표로 작성하라.
컬럼: [요구ID | 유형(기능/비기능) | 요구 설명 | 출처(RFP/회의) | 우선순위(MoSCoW) | 검증 방법]
규칙: 출처 없는 항목은 만들지 말 것. 비기능(성능/보안/접근성)도 누락 없이 포함.
출력: 한국어 마크다운 표.
```
사용 노트: 누락 0이 목표. WBS·테스트 계획의 기준이 됨.

### P-03 · 리스크 탐지 (담당: Project Director)
```
역할: 리스크 분석가. 골드위키 [35 프로젝트 메모리] 리스크 섹션 참조.
입력: {요구사항 추적표 / 제약 / 일정}
과업: 리스크 레지스터를 작성하라.
컬럼: [리스크ID | 설명 | 영향(상/중/하) | 가능성(상/중/하) | 대응전략 | 담당]
추가: 영향×가능성 상위 3개를 별도 강조.
출력: 한국어 표 + 상위 3개 요약.
```

### P-04 · 경쟁사 벤치마크 (담당: Proposal Strategist)
```
역할: 경쟁 분석가.
대상: {경쟁사/레퍼런스 서비스 목록}
기준: {비교 축 — 예: IA, 가입 플로우, 접근성, 성능, 차별 기능}
과업: 비교 매트릭스를 작성하고, 우리가 취할 차별화 포인트 3가지를 도출하라.
규칙: 확인 불가한 수치는 단정하지 말고 "확인 필요"로 표기.
출력: 한국어 비교표 + 차별화 3선.
```

### P-05 · 제안 스토리라인 (담당: Service Planner)
```
역할: 제안 스토리텔러. 골드위키 [05 제안 전략] 참조.
입력: {평가 배점 / 요구사항 / 차별화 포인트}
과업: 평가 배점 비중에 정렬된 제안 스토리라인을 구성하라.
구조: 문제 정의 → 우리의 통찰 → 해법 → 차별화 근거 → 기대효과(지표) → 실행 신뢰성.
출력: 섹션별 한 줄 메시지 + 근거. 한국어.
```

### P-06 · IA 생성 (담당: Service Planner)
```
역할: 정보구조 설계자. 골드위키 [11 정보구조] 참조.
입력: {요구사항 / 콘텐츠 목록 / 사용자 목표}
과업: 계층형 사이트맵을 생성하라. 각 노드에 뎁스번호와 화면ID를 부여.
규칙: 사용자 멘탈모델 우선, 뎁스 3 이내 권장. 중복 경로 제거.
출력: 들여쓰기 트리(한국어) + 노드-화면ID 매핑.
```

### P-07 · 유저 플로우 (담당: Interaction Designer)
```
역할: 인터랙션 설계자. 골드위키 [12 유저 플로우] 참조.
대상 플로우: {플로우명 / 사용자 목표}
과업: 시작-분기-예외-완료를 포함한 플로우를 기술하라.
포함: 정상 경로, 분기 조건, 에러/타임아웃 처리, 성공 기준(지표).
출력: 텍스트 플로우 다이어그램(한국어) + 단계 수.
```

### P-08 · 화면 목록 (담당: UI Designer)
```
역할: UI 기획자. 골드위키 [08 UI 가이드라인] 참조.
입력: {사이트맵 / 플로우}
과업: 화면 목록표를 작성하라.
컬럼: [화면ID | 화면명 | IA위치 | 주요기능 | 상태(빈/로딩/에러) | 접근성 유의점 | 담당]
규칙: 모든 화면에 3종 상태 정의 필수.
출력: 한국어 표.
```

### P-09 · UX 전략 (담당: UX Researcher)
```
역할: UX 전략가. 골드위키 [07 UX 원칙] 참조.
입력: {클라이언트 목표 / 사용자 리서치 / 제약}
과업: UX 전략 문서를 작성하라.
포함: 페르소나, 핵심 JTBD, 설계 원칙 3, 핵심 여정, 측정 지표(North Star+보조), 접근성 목표(WCAG 2.2 AA), 검증 계획.
출력: 한국어 마크다운.
```

### P-10 · UI 컨셉 (담당: BX Designer)
```
역할: 브랜드/UI 컨셉 디자이너. 골드위키 [09 디자인 시스템] 참조.
입력: {브랜드 톤 / 클라이언트 선호 / 레퍼런스}
과업: UI 컨셉 브리프를 작성하라.
포함: 톤앤매너 키워드 3, 컬러/타이포 방향(토큰 기준), 그리드, 핵심 컴포넌트, 접근성 제약, 금지 사항.
출력: 한국어 브리프.
```

### P-11 · 디자인 토큰 (담당: UI Designer)
```
역할: 디자인 토큰 설계자. 골드위키 [15 디자인 토큰] 참조(ADR-0001).
입력: {컬러/타이포/간격 스케일 결정}
과업: W3C 토큰 포맷의 JSON 토큰 세트를 생성하라.
규칙: 시맨틱 토큰(역할 기반)과 원시 토큰(값) 분리. 대비 4.5:1 충족.
출력: JSON(코드블록) + Style Dictionary 빌드 대상(css/scss/js) 명시.
```

### P-12 · HTML 프로토타입 (담당: Publishing Engineer)
```
역할: 퍼블리싱 엔지니어. 골드위키 [17 HTML 가이드] 참조(ADR-0005).
입력: {화면ID / 와이어프레임 / 토큰}
과업: 시맨틱·접근성 준수 HTML+CSS 프로토타입을 작성하라.
규칙: 시맨틱 태그, ARIA 적정, 토큰 기반 CSS 변수, 키보드 조작 가능, 반응형.
출력: 단일 파일 HTML(코드블록). 인라인 주석으로 접근성 포인트 표시.
```

### P-13 · 코드 리뷰 (담당: Frontend/Backend Engineer)
```
역할: 코드 리뷰어. 골드위키 [37 베스트 프랙티스]·[39 공통 오류] 참조.
대상: {변경 코드 / PR diff}
과업: 다음 관점으로 리뷰하라.
1) 정확성/버그 2) 보안(OWASP) 3) 성능(N+1, CWV) 4) 가독성/중복 5) 접근성
출력: [심각도 | 위치 | 문제 | 제안] 표. 칭찬할 점도 1개 이상. 한국어.
```

### P-14 · 테스트 계획 (담당: QA Engineer)
```
역할: QA 엔지니어. 골드위키 [30 테스트 전략] 참조.
입력: {요구사항 추적표 / 화면 목록}
과업: 테스트 계획과 케이스를 작성하라.
포함: 범위, 레벨(단위/통합/E2E/접근성/성능/보안), 완료 기준, 케이스표[TC-ID|시나리오|전제|절차|기대|우선순위].
규칙: 각 요구ID에 최소 1개 케이스 매핑(추적성).
출력: 한국어 마크다운.
```

### P-15 · 경영 요약 (담당: Proposal Strategist)
```
역할: 경영 요약 작성자. 골드위키 [38 템플릿 라이브러리] 경영 요약 템플릿 사용.
입력: {제안 전체 / 핵심 지표}
과업: 1페이지 경영 요약을 작성하라.
포함: 문제, 제안, 핵심 가치 3(평가기준 정렬), 측정 가능한 기대효과, 일정/비용 요약, 최대 리스크, 다음 단계.
출력: 한국어. 분량 1페이지 엄수.
```

### P-16 · 접근성 점검 (담당: Accessibility Specialist)
```
역할: 접근성 전문가. 골드위키 [16 접근성] 참조(WCAG 2.2 AA).
대상: {화면/컴포넌트/HTML}
과업: WCAG 2.2 AA 기준으로 위반 항목을 점검하라.
컬럼: [기준번호 | 항목 | 위반여부 | 근거 | 수정 제안]
포함: 대비, 키보드, 포커스, 라벨/대체텍스트, 모션.
출력: 한국어 표 + 통과/실패 요약.
```

### P-17 · 회의록 정리 (담당: Documentation Specialist)
```
역할: 서기. 골드위키 [33 회의록] 템플릿 사용.
입력: {회의 대화/메모}
과업: 표준 회의록으로 정리하라.
포함: 참석자, 안건, 논의 요약, 결정사항(+ADR 후보 표시), 액션아이템(담당/기한), 미해결 질문.
출력: 한국어 마크다운. 담당/기한 없는 액션은 표시 후 보완 요청.
```

---

## 프롬프트 등재·개선 절차

1. 새 과업 발생 시 표준 프롬프트를 본 문서에 추가(ID·담당·사용 노트 명시).
2. 실사용에서 개선되면 버전 메모와 함께 갱신.
3. 프롬프트 품질 원칙은 [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md)을 따른다.

---

## 관련 골드위키 문서

- [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md) — 프롬프트 품질 설계 원칙
- [AI 가이드](25_AI_GUIDE.md) — 에이전트·모델 운영 기준
- [서브에이전트 규칙](28_SUBAGENT_RULES.md) — 프롬프트와 에이전트 역할 매핑
- [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) — 프롬프트 파이프라인 연결
- [RFP 분석](04_RFP_ANALYSIS.md) · [제안 전략](05_PROPOSAL_STRATEGY.md) — 제안 프롬프트 적용처
- [의사결정 로그](32_DECISION_LOG.md) · [프로젝트 메모리](35_PROJECT_MEMORY.md) — 결과 기록처

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/AI/AIAutomationGuide.md =====

# AI 자동화 가이드 — 멀티에이전트·GoldWiki RAG·프롬프트·평가·가드레일

> 이 문서는 GoldWiki(SSOT)에 속한다. ClubSchool AI OS의 핵심 운영 원리를 정의한다. **모든 에이전트는 의사결정 전 GoldWiki를 먼저 참조한다**는 원칙이 이 문서에서 구체화된다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `ai-automation-lead` |
| **협업 에이전트** | `executive-director`, `coo-operator`, `documentation-lead`, `backend-lead`, `data-analytics-lead`, `qa-lead`, `security-risk-lead` |
| **상위 참조** | [AI 가이드(번호형)](../25_AI_GUIDE.md), [프롬프트 엔지니어링(번호형)](../26_PROMPT_ENGINEERING.md), [자동화 워크플로우(번호형)](../27_AUTOMATION_WORKFLOW.md), [서브에이전트 규칙(번호형)](../28_SUBAGENT_RULES.md) |
| **연계** | [프롬프트 라이브러리](../PromptLibrary/README.md), [의사결정 로그](../DecisionLog/README.md), [프로젝트 메모리](../ProjectMemory/README.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

Claude Code 기반 멀티에이전트로 RFP→납품 전 과정을 자동화하기 위한 아키텍처, GoldWiki 기반 RAG, 프롬프트 표준, 평가(eval), 가드레일을 정의한다. 지식 중복을 막고 모든 산출물을 근거 기반·재현 가능하게 만든다.

## 언제 사용하는가

- 새 서브에이전트·슬래시 커맨드·워크플로우를 설계할 때.
- 에이전트가 GoldWiki를 참조/갱신하는 RAG 흐름을 구성할 때.
- 프롬프트 품질·일관성을 표준화할 때.
- 자동화 산출물의 평가·가드레일·휴먼 게이트를 설계할 때.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 운영 원칙·거버넌스 | [00_START_HERE](../00_START_HERE.md), [서브에이전트 규칙(번호형)](../28_SUBAGENT_RULES.md) |
| 도메인 지식(SSOT) | GoldWiki 전체 토픽 폴더·번호형 문서 |
| 프롬프트 자산 | [프롬프트 라이브러리](../PromptLibrary/README.md), [40_PROMPT_LIBRARY](../40_PROMPT_LIBRARY.md) |
| 품질·평가 기준 | [품질 체크리스트(번호형)](../29_QUALITY_CHECKLIST.md) |

## 처리 방식

### 1) 멀티에이전트 아키텍처

오케스트레이터(`executive-director`/`coo-operator`)가 작업을 분해해 24개 도메인 서브에이전트에 위임한다.

```mermaid
flowchart TD
  U[사용자/슬래시 커맨드] --> O[Orchestrator: executive-director / coo-operator]
  O --> R[(GoldWiki RAG · SSOT)]
  O --> A1[rfp-strategy-lead]
  O --> A2[proposal-lead]
  O --> A3[ux-research-lead]
  O --> A4[frontend-lead / backend-lead]
  A1 & A2 & A3 & A4 --> R
  A2 --> G{품질 게이트 · qa-lead}
  G -->|통과| D[납품 산출물]
  G -->|반려| O
  D --> M[(DecisionLog · ProjectMemory 갱신)]
```

원칙: **GoldWiki 우선 참조** → 작업 → **GoldWiki 갱신**(DecisionLog/ProjectMemory/BestPractices). 모든 에이전트는 [서브에이전트 규칙](../28_SUBAGENT_RULES.md)을 따른다.

### 2) GoldWiki RAG

GoldWiki를 단일 지식원으로 사용한다. 검색 → 근거 인용 → 산출 → 갱신 루프.

```
1) Retrieve: 토픽 폴더 README + 관련 번호형 문서를 우선 로드(메타→본문).
2) Ground:   답변/산출물에 근거 문서 경로를 인용(예: ../04_RFP_ANALYSIS.md).
3) Generate: 인용 근거 범위 내에서만 단정. 근거 없으면 "확인 필요"로 표시.
4) Update:   새 결정→DecisionLog, 재사용 지식→BestPractices/ProjectMemory.
```

청킹은 문서의 H2/H3 섹션 단위, 메타데이터(폴더·담당 에이전트·최종수정)를 함께 인덱싱한다. 지식 중복 금지: 동일 내용은 한 곳에 두고 나머지는 링크한다.

### 3) 프롬프트 표준 (R-C-T-O-G)

| 요소 | 내용 |
| --- | --- |
| **R**ole | 에이전트 역할·페르소나 |
| **C**ontext | 참조할 GoldWiki 문서 경로 명시(먼저 읽게 함) |
| **T**ask | 구체 작업·범위 |
| **O**utput | 형식·구조·산출물 |
| **G**uardrail | 제약·금지·품질 기준·에스컬레이션 |

```
[R] 너는 proposal-lead다.
[C] GoldWiki 05_PROPOSAL_STRATEGY.md, 04_RFP_ANALYSIS.md, Proposal/README.md를 먼저 읽어라.
[T] 첨부 RFP에 대한 제안서 목차와 핵심 메시지(Win Theme)를 작성하라.
[O] 마크다운 목차 + 섹션별 1줄 메시지 + 근거(인용 경로).
[G] 근거 없는 수치 금지. 클라이언트 제출 품질. 완료 후 DecisionLog 갱신, qa-lead 검토.
```

### 4) 평가(Eval)

자동화 산출물은 게이트 통과 전 평가한다.

| 평가 축 | 방법 |
| --- | --- |
| 정확성·근거성 | GoldWiki 인용 일치, 환각 검출(LLM-as-judge + 룰) |
| 완전성 | 필수 섹션·체크리스트 충족률 |
| 형식 준수 | 템플릿/구조 검증(스키마) |
| 안전성 | PII·민감정보·금지 표현 스캔 |

골든셋(대표 RFP·산출물)으로 회귀 평가하고 점수를 [프로젝트 메모리](../ProjectMemory/README.md)에 기록한다.

### 5) 가드레일

- **입력**: 프롬프트 인젝션 방어, 민감정보 입력 차단, 범위 외 요청 거절.
- **처리**: 도구 권한 최소화(Read/Write/Edit/Grep/Glob 등 필요한 것만), 외부 호출 화이트리스트.
- **출력**: PII 마스킹, 근거 없는 단정 금지, 법적·재무 단정은 휴먼 검토 필수.
- **휴먼 게이트**: 클라이언트 제출·계약·비용 영향 산출물은 `executive-director` 최종 승인.

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| 에이전트/커맨드/워크플로우 정의 | 표준 형식 준수 |
| RAG 파이프라인 설계 | 검색·근거·갱신 루프 |
| 프롬프트 자산 | [프롬프트 라이브러리](../PromptLibrary/README.md) 등록 |
| 평가 리포트 | 골든셋 점수·회귀 결과 |
| 가드레일 정책 | 입력/처리/출력/휴먼 게이트 |

## 품질 기준

- [ ] 모든 산출물이 GoldWiki 근거를 인용.
- [ ] 환각·근거 없는 수치 0건(평가 통과).
- [ ] 도구 권한 최소화 원칙 준수.
- [ ] PII·민감정보 출력 0건.
- [ ] 휴먼 게이트가 필요한 산출물에 승인 기록.
- [ ] 결정·재사용 지식이 GoldWiki에 갱신됨.

## 체크리스트

- [ ] 에이전트가 작업 전 GoldWiki를 먼저 읽었는가.
- [ ] 프롬프트가 R-C-T-O-G를 갖췄는가.
- [ ] 평가 골든셋으로 회귀 검증했는가.
- [ ] 가드레일(입력/처리/출력)이 적용됐는가.
- [ ] DecisionLog/ProjectMemory 갱신했는가.

## 예시 프롬프트

```
역할: ai-automation-lead. GoldWiki AI/AIAutomationGuide.md, 27_AUTOMATION_WORKFLOW.md, 28_SUBAGENT_RULES.md를 먼저 읽어라.
작업: 'RFP 분석→제안 초안' 워크플로우를 멀티에이전트로 설계. GoldWiki RAG·평가·가드레일 포함.
출력: mermaid 흐름, 참여 에이전트, 품질 게이트, 평가 축, 가드레일 정책.
완료 후 DecisionLog에 설계 결정을, PromptLibrary에 사용 프롬프트를 등록하라.
```

---

### 관련 문서
[AI README](README.md) · [프롬프트 라이브러리](../PromptLibrary/README.md) · [백엔드 가이드](../Backend/BackendGuide.md) · [데이터 분석 가이드](../Data/DataAnalyticsGuide.md) · [25_AI_GUIDE](../25_AI_GUIDE.md) · [27_AUTOMATION_WORKFLOW](../27_AUTOMATION_WORKFLOW.md) · [28_SUBAGENT_RULES](../28_SUBAGENT_RULES.md)




===== 파일: GoldWiki/AI/README.md =====

# AI — AI 자동화 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. AI 자동화 설계 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

Claude Code 기반 **멀티에이전트 자동화 표준**을 관리한다. 에이전트 오케스트레이션, GoldWiki 기반 RAG, 프롬프트 표준(R-C-T-O-G), 평가(eval), 가드레일을 정의해 RFP→납품 과정을 근거 기반·재현 가능하게 자동화한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [AIAutomationGuide.md](AIAutomationGuide.md) | AI 자동화 가이드(멀티에이전트·골드위키 RAG·프롬프트·평가·가드레일, 8섹션) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [PromptLibrary](../PromptLibrary/README.md), [Backend](../Backend/BackendGuide.md), [Data](../Data/DataAnalyticsGuide.md), [DecisionLog](../DecisionLog/README.md), [ProjectMemory](../ProjectMemory/README.md)
- 번호형: [25_AI_GUIDE](../25_AI_GUIDE.md), [26_PROMPT_ENGINEERING](../26_PROMPT_ENGINEERING.md), [27_AUTOMATION_WORKFLOW](../27_AUTOMATION_WORKFLOW.md), [28_SUBAGENT_RULES](../28_SUBAGENT_RULES.md), [40_PROMPT_LIBRARY](../40_PROMPT_LIBRARY.md)

## 담당 에이전트

- **주담당**: `ai-automation-lead`
- **협업**: `executive-director`, `coo-operator`, `documentation-lead`, `backend-lead`, `data-analytics-lead`, `qa-lead`, `security-risk-lead`

## 사용 흐름

1. 작업을 받으면 관련 GoldWiki 토픽·번호형 문서를 먼저 검색·로드한다(RAG Retrieve).
2. [AIAutomationGuide.md](AIAutomationGuide.md)의 R-C-T-O-G 프롬프트로 산출하고 근거를 인용한다.
3. 평가(골든셋)·가드레일을 통과시키고 휴먼 게이트가 필요한 산출물은 승인받는다.
4. 결정·재사용 지식을 [의사결정 로그](../DecisionLog/README.md)·[프로젝트 메모리](../ProjectMemory/README.md)에 갱신한다.

## 거버넌스

모든 에이전트는 의사결정 전 GoldWiki를 먼저 참조하고 산출물에 근거를 인용하며, 평가·가드레일을 통과한 뒤 결정·재사용 지식을 [의사결정 로그](../DecisionLog/README.md)·[프로젝트 메모리](../ProjectMemory/README.md)에 갱신한다.




===== 파일: GoldWiki/Backend/BackendGuide.md =====

# 백엔드 엔지니어링 가이드

> 이 문서는 GoldWiki(SSOT)에 속한다. 백엔드를 설계·구현하기 전, 모든 에이전트는 이 문서와 [API 표준(번호형)](../22_API_STANDARD.md)·[보안 가이드(번호형)](../24_SECURITY_GUIDE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `backend-lead` |
| **협업 에이전트** | `frontend-lead`, `security-risk-lead`, `data-analytics-lead`, `ai-automation-lead`, `qa-lead`, `cto-reviewer` |
| **상위 참조** | [백엔드 가이드(번호형)](../21_BACKEND_GUIDE.md), [API 표준(번호형)](../22_API_STANDARD.md), [데이터베이스 가이드(번호형)](../23_DATABASE_GUIDE.md), [보안 가이드(번호형)](../24_SECURITY_GUIDE.md) |
| **연계** | [데이터 분석 가이드](../Data/DataAnalyticsGuide.md), [AI 자동화 가이드](../AI/AIAutomationGuide.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

확장 가능하고 안전하며 관측 가능한 백엔드를 구축하기 위한 아키텍처, API 설계, 데이터 접근, 인증·인가, 관측성(observability), 배포 표준을 정의한다.

## 언제 사용하는가

- 신규 서비스/API의 아키텍처 결정과 스캐폴딩.
- 프론트엔드와의 API 계약 합의.
- 인증·권한·보안 요구가 있는 기능 구현.
- 장애·성능 이슈 진단을 위한 관측성 기준 수립.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 기능·도메인 요구 | [비즈니스 분석(번호형)](../06_BUSINESS_ANALYSIS.md), [RFP 분석(번호형)](../04_RFP_ANALYSIS.md) |
| API 계약 | [API 표준(번호형)](../22_API_STANDARD.md), [프론트엔드 가이드](../Frontend/FrontendGuide.md) |
| 데이터 모델 | [데이터베이스 가이드(번호형)](../23_DATABASE_GUIDE.md), [데이터 분석 가이드](../Data/DataAnalyticsGuide.md) |
| 보안·컴플라이언스 | [보안 가이드(번호형)](../24_SECURITY_GUIDE.md) (OWASP) |

## 처리 방식

### 1) 아키텍처 — 계층형 + 도메인 모듈

```
src/
  modules/
    proposal/
      proposal.controller.ts   # HTTP 경계(검증·직렬화)
      proposal.service.ts      # 비즈니스 로직(순수)
      proposal.repository.ts   # 데이터 접근
      proposal.schema.ts       # Zod DTO
  shared/
    middleware/ auth/ logger/ errors/
  config/  db/  main.ts
```

원칙: 컨트롤러는 얇게, 서비스에 도메인 로직 집중, 레포지토리로 DB 격리. 모듈 간 의존은 서비스 인터페이스로만. 모놀리스로 시작하고 경계가 안정되면 분리한다(아키텍처 변경은 ADR로 [의사결정 로그](../DecisionLog/README.md)에 기록).

### 2) API 설계 (REST 기준)

- 리소스 명사·복수형(`/proposals`, `/proposals/{id}`), 동작은 HTTP 메서드로.
- 입력은 경계에서 Zod로 검증, 실패 시 400 + 표준 오류 바디.
- 페이지네이션(cursor 우선), 필터·정렬 쿼리 규약, 멱등성 키(POST 재시도).

```ts
// 표준 오류 응답
{ "error": { "code": "VALIDATION_ERROR", "message": "title is required",
             "details": [{ "field": "title", "issue": "required" }],
             "traceId": "b1f2…" } }
```

```ts
export const createProposal = async (req, res, next) => {
  try {
    const dto = CreateProposalSchema.parse(req.body);      // 검증
    const result = await proposalService.create(dto, req.user);
    res.status(201).json(result);
  } catch (e) { next(e); }                                  // 중앙 에러 핸들러
};
```

### 3) 데이터 접근

- 마이그레이션 기반 스키마 관리(Prisma/Drizzle 등), 수동 DDL 금지.
- N+1 방지, 인덱스 설계, 트랜잭션 경계 명시. 상세는 [데이터베이스 가이드](../23_DATABASE_GUIDE.md).
- PII는 암호화·마스킹, 보존 정책 준수([데이터 분석 가이드](../Data/DataAnalyticsGuide.md) 거버넌스 연계).

### 4) 인증·인가

- 인증: OIDC/OAuth2, 단명 액세스 토큰 + 리프레시 토큰(httpOnly·Secure 쿠키).
- 인가: RBAC(역할) + 리소스 소유권 검사. 미들웨어에서 1차, 서비스에서 도메인 권한 2차.
- 비밀번호 해시(Argon2/bcrypt), 시크릿은 비밀 관리자(Secrets Manager), 코드/리포 노출 0.

```ts
router.post("/proposals",
  authenticate,                 // 토큰 검증
  authorize("proposal:create"), // 권한
  rateLimit({ window: "1m", max: 60 }),
  createProposal);
```

### 5) 관측성

- **로깅**: 구조화 JSON 로그 + 상관관계 `traceId`. PII 마스킹.
- **메트릭**: RED(Request rate, Errors, Duration) + 리소스 사용량.
- **트레이싱**: OpenTelemetry로 분산 추적, 외부 호출 span.
- **헬스체크**: `/healthz`(liveness), `/readyz`(readiness).
- **알림**: SLO 위반(에러율·p95 지연) 시 알림 → [PMO](../PMO/README.md) 리스크 연계.

### 6) 신뢰성·배포

- 멱등성·재시도·타임아웃·서킷브레이커, 외부 의존 격리.
- 12-factor 설정(환경변수), 무중단 배포, 마이그레이션 선행.
- 백업·복구 리허설, 비밀 회전.

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| API 서비스 코드 | 모듈형, 검증·에러 표준화 |
| OpenAPI 스펙 | 계약 문서(자동 생성) |
| DB 마이그레이션 | 버전 관리 |
| 관측성 설정 | 로그/메트릭/트레이스/알림 |
| 테스트 | 단위·통합·계약 테스트 |

## 품질 기준

- [ ] 모든 입력 경계 검증(Zod), 표준 오류 응답.
- [ ] 인증·인가 누락 엔드포인트 0건.
- [ ] OWASP Top 10 점검 통과([보안 가이드](../24_SECURITY_GUIDE.md)).
- [ ] p95 지연·에러율 SLO 충족, 헬스체크 동작.
- [ ] 마이그레이션 가역, 테스트 커버리지 ≥ 80%.
- [ ] 시크릿·PII 코드 노출 0건.

## 체크리스트

- [ ] OpenAPI 스펙과 구현 일치.
- [ ] 레이트 리밋·멱등성 키 적용(쓰기 API).
- [ ] 구조화 로그 + traceId, PII 마스킹.
- [ ] 트랜잭션 경계·인덱스 검토.
- [ ] 아키텍처/스택 결정 ADR 기록([의사결정 로그](../DecisionLog/README.md)).

## 예시 프롬프트

```
역할: backend-lead. GoldWiki Backend/BackendGuide.md, 22_API_STANDARD.md, 24_SECURITY_GUIDE.md를 먼저 읽어라.
작업: 제안서 생성/조회 API 설계·구현. RBAC, 입력 검증, 표준 오류, OpenAPI 생성.
제약: 계층형 모듈 구조, OWASP 점검, 구조화 로그+traceId, 통합·계약 테스트 포함.
출력: 모듈 코드, OpenAPI, 마이그레이션, 테스트, 관측성 설정. security-risk-lead 검토 요청.
```

---

### 관련 문서
[Backend README](README.md) · [데이터 분석 가이드](../Data/DataAnalyticsGuide.md) · [AI 자동화 가이드](../AI/AIAutomationGuide.md) · [21_BACKEND_GUIDE](../21_BACKEND_GUIDE.md) · [22_API_STANDARD](../22_API_STANDARD.md) · [24_SECURITY_GUIDE](../24_SECURITY_GUIDE.md)




===== 파일: GoldWiki/Backend/README.md =====

# Backend — 백엔드 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 백엔드 설계·구현 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

확장 가능하고 안전하며 관측 가능한 **백엔드 구현 표준**을 관리한다. 아키텍처, API 설계, 데이터 접근, 인증·인가, 관측성, 신뢰성·배포를 정의해 서비스 안정성과 보안을 보장한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [BackendGuide.md](BackendGuide.md) | 백엔드 가이드(아키텍처·API·인증·관측성·예시, 8섹션) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [Frontend](../Frontend/FrontendGuide.md), [Data](../Data/DataAnalyticsGuide.md), [AI](../AI/AIAutomationGuide.md)
- 번호형: [21_BACKEND_GUIDE](../21_BACKEND_GUIDE.md), [22_API_STANDARD](../22_API_STANDARD.md), [23_DATABASE_GUIDE](../23_DATABASE_GUIDE.md), [24_SECURITY_GUIDE](../24_SECURITY_GUIDE.md), [30_TEST_STRATEGY](../30_TEST_STRATEGY.md)

## 담당 에이전트

- **주담당**: `backend-lead`
- **협업**: `frontend-lead`, `security-risk-lead`, `data-analytics-lead`, `ai-automation-lead`, `qa-lead`, `cto-reviewer`

## 사용 흐름

1. 도메인 요구와 [데이터 모델](../Data/DataAnalyticsGuide.md)·[보안 요구](../24_SECURITY_GUIDE.md)를 입력으로 받는다.
2. [BackendGuide.md](BackendGuide.md)의 계층형 모듈·API·인증 표준으로 구현한다.
3. OpenAPI·관측성·테스트를 갖추고 `security-risk-lead` 검토를 받는다.
4. 아키텍처·스택 결정을 [의사결정 로그](../DecisionLog/README.md)에 ADR로 기록한다.

## 거버넌스

모든 엔드포인트는 입력 검증·인증·인가를 갖추고 OWASP Top 10 점검과 SLO(에러율·p95)를 충족해야 하며, 아키텍처·스택 결정은 [의사결정 로그](../DecisionLog/README.md)에 기록한다.




===== 파일: GoldWiki/Brand/BXGuidelines.md =====

# 브랜드 경험(BX) 가이드라인 (Brand Experience Guidelines)

Goldwiki Digital(골드위키 디지털)의 브랜드 경험 표준. **브랜드 톤·보이스·비주얼 아이덴티티**를 정의하여, 모든 접점에서 일관된 인상과 신뢰를 전달한다.

> 이 문서를 쓰는 에이전트(BX Designer)는 [01_COMPANY_CONTEXT](../01_COMPANY_CONTEXT.md), [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md), [08_UI_GUIDELINES](../08_UI_GUIDELINES.md)를 먼저 참조한다. BX는 UX·UI·디자인 시스템의 상위 정체성 레이어다.

---

## 목적

- 브랜드 핵심 가치·포지셔닝·퍼스낼리티를 정의한다.
- 글쓰기 톤·보이스(Voice & Tone)와 비주얼 아이덴티티(로고/색/타이포/이미지) 규칙을 표준화한다.
- 브랜드 일관성을 모든 산출물·접점에 적용하는 기준을 제공한다.

## 언제 사용하는가

| 시점 | 사용 목적 |
| --- | --- |
| 제안서/세일즈 | 브랜드 일관 메시지·톤 |
| UI/디자인 시스템 | 비주얼 토큰의 정체성 근거 |
| 콘텐츠/마이크로카피 | 보이스·톤 적용 |
| 캠페인/마케팅 | 비주얼·메시지 가이드 |

## 입력 정보

- 회사 컨텍스트·미션: [01_COMPANY_CONTEXT](../01_COMPANY_CONTEXT.md)
- 비즈니스 목표·타깃: [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md)
- 페르소나: [../UX/UXStrategyFramework](../UX/UXStrategyFramework.md)
- 디자인 토큰·UI: [../DesignSystem/DesignSystemGuide](../DesignSystem/DesignSystemGuide.md), [../UI/UIGuidelines](../UI/UIGuidelines.md)

## 처리 방식

### 1. 브랜드 정체성
- 미션/비전, 핵심 가치 3~5개
- 포지셔닝 문장: "[타깃]에게 [차별점]을 제공하는 [카테고리]"
- 브랜드 퍼스낼리티(예: 전문적·명료·신뢰·진취) — 형용사 5개로 고정

### 2. 보이스 & 톤
- **보이스**(불변): 브랜드의 성격. 예) 전문적이되 친근, 군더더기 없음
- **톤**(가변): 상황별 조정

| 상황 | 톤 |
| --- | --- |
| 성공/완료 | 간결·긍정 |
| 오류 | 공감·해결 중심(비난 금지) |
| 온보딩 | 안내·격려 |
| 마케팅 | 자신감·근거 제시 |

| Do | Don't |
| --- | --- |
| 능동태, 짧은 문장 | 수동태 남발, 장황 |
| 사용자 용어 | 내부 전문용어 |
| "다음 단계를 진행하세요" | "에러 발생" 식 무책임 통보 |

### 3. 비주얼 아이덴티티
- **로고**: 클리어스페이스(로고 높이의 1배), 최소 크기, 금지 사용(왜곡/그림자/임의 색)
- **색**: 브랜드 컬러 → 시맨틱 토큰으로 연결([15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md)). 대비 WCAG AA 준수
- **타이포**: 브랜드 서체 + 대체 서체, 위계 규칙은 [../UI/UIGuidelines](../UI/UIGuidelines.md)
- **이미지/일러스트**: 톤(사실적/추상), 피사체, 색 보정 가이드
- **모션**: 이징/지속시간 원칙(절제·기능적)

### 4. 적용 매트릭스
```mermaid
flowchart LR
  BX[BX 정체성] --> V[보이스/톤]
  BX --> VI[비주얼 아이덴티티]
  VI --> DS[디자인 시스템 토큰]
  V --> CP[마이크로카피/콘텐츠]
  DS --> UI[UI]
```

## 출력 산출물

| 산출물 | 형식 |
| --- | --- |
| 브랜드 가이드북 | 문서/PDF |
| 보이스·톤 사전 | 표 |
| 로고/색/타이포 사양 | 문서 + 토큰 연계 |
| 마이크로카피 가이드 | 표 |

## 품질 기준

- [ ] 브랜드 퍼스낼리티가 형용사로 명확히 고정되었다.
- [ ] 보이스(불변)와 톤(상황별)이 구분되어 정의되었다.
- [ ] 브랜드 색이 시맨틱 토큰으로 연결되고 대비 AA를 충족한다.
- [ ] 로고 클리어스페이스·금지 사용이 명시되었다.
- [ ] 마이크로카피 Do/Don't 예시가 있다.

## 체크리스트

- [ ] 포지셔닝 문장이 정의되었는가
- [ ] 상황별 톤 매트릭스가 있는가
- [ ] 로고 사용/금지 규칙이 있는가
- [ ] 색·타이포가 디자인 시스템과 정합하는가
- [ ] 적용 매트릭스로 접점 일관성이 보장되는가
- [ ] [09_DESIGN_SYSTEM](../09_DESIGN_SYSTEM.md)·[08_UI_GUIDELINES](../08_UI_GUIDELINES.md)와 연결했는가

## 예시 프롬프트

```
역할: bx-design-lead(BX Designer). GoldWiki/Brand/BXGuidelines.md를 따른다.
입력: 01_COMPANY_CONTEXT, 02_BUSINESS_GOALS, 브랜드 컬러, 페르소나.
작업: 브랜드 퍼스낼리티(형용사 5)·포지셔닝 문장·보이스/톤 매트릭스·
      비주얼 아이덴티티(로고/색/타이포) 가이드 작성. 마이크로카피 Do/Don't 포함.
출력: 보이스·톤 표, 적용 매트릭스 mermaid, 토큰 연계 색 표.
```




===== 파일: GoldWiki/Brand/README.md =====

# Brand 토픽 — GoldWiki

브랜드 경험(BX)의 단일 진실 공급원(SSOT). 브랜드 정체성·보이스/톤·비주얼 아이덴티티를 정의하여 모든 접점에서 일관된 인상과 신뢰를 전달한다.

## 폴더 목적

- 브랜드 핵심 가치·포지셔닝·퍼스낼리티 정의
- 보이스 & 톤(글쓰기) 및 비주얼 아이덴티티(로고/색/타이포/이미지) 표준화
- BX를 UX·UI·디자인 시스템의 상위 정체성 레이어로 운영

## BX(브랜드 경험) 개요

BX는 사용자가 브랜드와 만나는 모든 순간의 총합이다. UX가 "쓰기 좋은가"를, UI가 "보기 좋은가"를 다룬다면, BX는 "어떤 브랜드로 기억되는가"를 책임진다. 본 토픽은 정체성을 정의하고 이를 보이스/톤과 비주얼 토큰으로 전개하여 디자인 시스템·UI로 연결한다.

## 포함 문서

| 문서 | 내용 |
| --- | --- |
| [BXGuidelines.md](BXGuidelines.md) | 브랜드 톤·보이스·비주얼 아이덴티티 가이드(8섹션) |

## 관련 GoldWiki 문서

- [01_COMPANY_CONTEXT](../01_COMPANY_CONTEXT.md) — 회사 컨텍스트·미션
- [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md) — 비즈니스 목표·타깃
- [08_UI_GUIDELINES](../08_UI_GUIDELINES.md) — UI 가이드라인(타이포/색 위계)
- [09_DESIGN_SYSTEM](../09_DESIGN_SYSTEM.md) — 디자인 시스템(토큰 연계)
- [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md) — 브랜드 색→시맨틱 토큰

## 관련 토픽 폴더

- [../UI/README.md](../UI/README.md) · [../DesignSystem/README.md](../DesignSystem/README.md) · [../UX/README.md](../UX/README.md)

## 담당 에이전트

- 주관: `bx-design-lead` (BX Designer)
- 협업: `ui-design-lead`, `design-system-lead`, `proposal-lead`

## 거버넌스

브랜드 색·타이포는 디자인 시스템 시맨틱 토큰으로 연결되어 일관성을 유지하며 대비 WCAG 2.2 AA를 충족한다. 보이스(불변)와 톤(상황별)을 구분해 적용하고, 브랜드 변경은 [32_DECISION_LOG](../32_DECISION_LOG.md)에 기록한다.




===== 파일: GoldWiki/Business/README.md =====

# Business — 비즈니스 분석 토픽

## 폴더 목적

RFP·제안 단계에서 도출된 요구를 **실행 가능한 사업 설계로 정교화**하는 비즈니스 분석 표준을 보관한다. as-is/to-be 분석, 범위 정의(Scope), WBS·공수 산정, KPI·기대효과, 이해관계자 분석을 다룬다. 본 토픽의 정본 지식은 번호 문서 [06 비즈니스 분석](../06_BUSINESS_ANALYSIS.md)에 있으며, 여기서는 토픽 진입점과 연계를 제공한다(지식 중복 금지).

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| (정본) [../06_BUSINESS_ANALYSIS.md](../06_BUSINESS_ANALYSIS.md) | 비즈니스 분석 정본 — as-is/to-be, 범위, WBS·공수, KPI |
| README.md | 본 토픽 개요·진입점 (이 문서) |

> 토픽 전용 보조 문서가 추가될 경우 이 표에 등록한다. 정본 지식은 06 문서를 링크하며 복사하지 않는다.

## 관련 GoldWiki 토픽 / 번호 문서

- [06 비즈니스 분석](../06_BUSINESS_ANALYSIS.md) — 비즈니스 분석 정본.
- [02 비즈니스 목표](../02_BUSINESS_GOALS.md) — KPI·기대효과 기준.
- [RFP](../RFP/README.md) — 요구사항 입력.
- [Proposal](../Proposal/README.md) — WBS·공수의 가격 산정 활용.
- [PMO](../PMO/README.md) — 일정·리스크·자원 관리.
- [Research](../Research/README.md) — 시장·업종 근거.

## 담당 에이전트

- **Owner**: business-analysis-lead
- **협업**: product-strategy-lead, service-planning-lead, pmo-director, proposal-lead

## 거버넌스

본 토픽의 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다. 정본은 06 문서이며, 본 토픽은 진입점·연계만 관리한다.




===== 파일: GoldWiki/Company/README.md =====

# Company — 회사 토픽

> Goldwiki Digital(ClubSchool AI OS)의 정체성·서비스·운영 모델 개요. 회사 컨텍스트의 **정본은 [번호형 01 · 회사 컨텍스트](../01_COMPANY_CONTEXT.md)**이며, 본 폴더는 그 진입점을 제공한다.

## 폴더 목적

회사가 누구이며 무엇을 어떻게 제공하는지에 대한 공통 이해를 모든 사람·AI 에이전트에 제공한다. SSOT 원칙에 따라 회사 정보를 이 폴더에 중복 기재하지 않고, 정본 문서로 링크한다. 본 README는 회사 맥락의 빠른 요약과 정본 안내를 담는다.

## 회사 개요 (요약)

- **정체성:** AI 증강(AI-augmented) 멀티에이전트 방식으로 동작하는 엔터프라이즈 디지털 프로덕트 컨설팅 회사.
- **미션:** "엔터프라이즈 고객이 더 빠르고 정확하게 탁월한 디지털 프로덕트를 출시하도록, RFP부터 운영까지 전 과정을 AI 증강 방법론으로 통합 제공한다."
- **서비스 라인:** ① RFP 분석·제안 전략 ② UX/UI 전략 ③ 디자인 시스템 ④ 프로토타이핑·풀스택 개발 ⑤ QA·릴리스.
- **운영 모델:** 24개 활성 AI 에이전트와 80명 전문 역할이 골드위키(SSOT)를 공유하며 RFP→납품 21단계 파이프라인을 수행.
- **타겟 시장:** 공공·금융·대기업·성장기업.

> 위 내용의 **정본**과 상세(미션·비전·가치·차별점·계약 모델·조직도)는 [번호형 01 · 회사 컨텍스트](../01_COMPANY_CONTEXT.md)를 참조한다. 본 폴더는 정보를 복사하지 않는다.

## 포함 문서

| 문서 | 한 줄 설명 |
| --- | --- |
| [README](README.md) | 본 문서 — 회사 개요 진입점 및 정본 안내 |

> 회사 컨텍스트 정본은 토픽 폴더가 아닌 [번호형 01](../01_COMPANY_CONTEXT.md)에 위치한다.

## 관련 골드위키 토픽·번호 문서

- [번호형 01 · 회사 컨텍스트(정본)](../01_COMPANY_CONTEXT.md)
- [번호형 02 · 비즈니스 목표](../02_BUSINESS_GOALS.md)
- [조직 지도](../Organization/OrganizationMap.md) — 24 에이전트·80 역할 조직도
- [운영 원칙](../Foundation/OperatingPrinciples.md)
- [Business 토픽](../Business/README.md), [번호형 03 · RFP 프레임워크](../03_RFP_FRAMEWORK.md)

## 담당 에이전트

- **주관:** executive-director (회사 정체성·전략)
- **연계:** coo-operator (운영 모델), documentation-lead (정본 관리)

> **거버넌스:** 회사 정보는 [번호형 01](../01_COMPANY_CONTEXT.md)에만 정본으로 존재한다. 변경은 [의사결정 로그](../Foundation/DecisionLog.md)에 기록 후 반영한다.




===== 파일: GoldWiki/Data/DataAnalyticsGuide.md =====

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




===== 파일: GoldWiki/Data/README.md =====

# Data — 데이터/분석 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 데이터·지표 작업 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

신뢰할 수 있는 데이터로 의사결정을 지원하는 **데이터·분석 표준**을 관리한다. 데이터 모델링(메달리온·차원 모델), 단일 지표 정의, 분석 파이프라인, 대시보드, 데이터 거버넌스를 다룬다. 운영 DB는 번호형 [23_DATABASE_GUIDE](../23_DATABASE_GUIDE.md)와 연계하며, 본 폴더는 그 위의 **분석 계층(Gold 마트·지표·BI)**을 책임진다.

## 개요 — 데이터 모델링·지표·분석 파이프라인

- **데이터 모델링**: 운영 데이터(Bronze) → 정제(Silver) → 분석 마트(Gold: 팩트/차원). 스타 스키마 우선.
- **지표**: "한 번 정의, 한 곳 관리" 원칙의 지표 사전. 전환율·리드타임·재작업률 등.
- **분석 파이프라인**: 수집→적재→변환→테스트→서빙→모니터링. 데이터 테스트를 CI에 통합.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [DataAnalyticsGuide.md](DataAnalyticsGuide.md) | 데이터 분석/지표 정의/대시보드 가이드(8섹션, SQL 예제 포함) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [Backend](../Backend/BackendGuide.md), [AI](../AI/AIAutomationGuide.md), [PMO](../PMO/README.md)
- 번호형: [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md), [06_BUSINESS_ANALYSIS](../06_BUSINESS_ANALYSIS.md), [23_DATABASE_GUIDE](../23_DATABASE_GUIDE.md), [24_SECURITY_GUIDE](../24_SECURITY_GUIDE.md), [29_QUALITY_CHECKLIST](../29_QUALITY_CHECKLIST.md)

## 담당 에이전트

- **주담당**: `data-analytics-lead`
- **협업**: `backend-lead`, `product-strategy-lead`, `business-analysis-lead`, `ai-automation-lead`, `security-risk-lead`

## 거버넌스

모든 지표는 단일 정의로 관리하고 대시보드 수치는 원천과 대사 일치해야 하며, PII는 마스킹·접근 통제하고 지표 정의 변경은 [의사결정 로그](../DecisionLog/README.md)에 기록한다.




===== 파일: GoldWiki/DecisionLog/README.md =====

# DecisionLog — 의사결정 로그 토픽

> 조직의 모든 중대한 의사결정을 ADR(Architecture Decision Record)로 기록·추적하는 토픽. 방법론·템플릿 정본은 [Foundation/DecisionLog](../Foundation/DecisionLog.md)이고, 누적 ADR은 [번호형 32](../32_DECISION_LOG.md)에 적재된다.

## 폴더 목적

의사결정을 휘발시키지 않고 맥락·대안·결정·결과와 함께 영속 기록하는 운영의 진입점을 제공한다. 미래의 사람·AI 에이전트가 "왜 이렇게 결정했는가"를 추적하고 동일한 논의를 반복하지 않도록 한다. SSOT 원칙에 따라 방법론을 재서술하지 않고 정본으로 링크한다. ADR은 골드위키 "두뇌 갱신" 원칙의 핵심 산출물이다.

## 포함 문서

| 문서 | 한 줄 설명 |
| --- | --- |
| [README](README.md) | 본 문서 — 의사결정 로그 운영 진입점 |

> ADR **방법론·템플릿 정본**: [Foundation/DecisionLog](../Foundation/DecisionLog.md)
> 누적 **ADR 적재 정본**: [번호형 32 · 의사결정 로그](../32_DECISION_LOG.md)

## ADR 작성 흐름 (요약)

1. 이 결정이 ADR 대상인가 판단(가역적·일상적이면 생략).
2. 순번(`ADR-NNNN`)·상태·일자·결정자 기재.
3. 맥락 → 대안 비교(2개 이상) → 결정·근거 → 결과.
4. 영향받는 정본 문서·프로젝트 메모리·베스트 프랙티스 환류.
5. 번복 시 기존 ADR을 Superseded로 표기하고 양방향 링크.

상세 절차·템플릿·예시 4건은 [Foundation/DecisionLog](../Foundation/DecisionLog.md) 참조.

## 관련 골드위키 토픽·번호 문서

- [Foundation/DecisionLog(방법론 정본)](../Foundation/DecisionLog.md)
- [번호형 32 · 의사결정 로그(ADR 적재 정본)](../32_DECISION_LOG.md)
- [번호형 35 · 프로젝트 메모리](../35_PROJECT_MEMORY.md) — 결정↔학습 연결
- [ProjectMemory 토픽](../ProjectMemory/README.md)
- [운영 원칙](../Foundation/OperatingPrinciples.md), [전사 품질 기준](../Foundation/QualityStandard.md), [번호형 37 · 베스트 프랙티스](../37_BEST_PRACTICES.md)

## 담당 에이전트

- **주관:** documentation-lead (ADR 기록·정본 관리)
- **연계:** 결정 주체 본부 리드 (ADR 작성), executive-director (전략 결정 승인)

> **거버넌스:** 모든 ADR은 [번호형 32](../32_DECISION_LOG.md)에만 적재하고, 결정은 [프로젝트 메모리](../Foundation/ProjectMemory.md)·베스트 프랙티스·레퍼런스 라이브러리를 갱신한다.




===== 파일: GoldWiki/Delivery/FinalDeliveryChecklist.md =====

# 최종 납품 체크리스트 (Final Delivery Checklist)

## 목적

ClubSchool AI OS 프로젝트의 **최종 납품(handover)** 단계에서 산출물·품질·문서·인수가 모두 충족되었는지 검증하는 정본 체크리스트다. 납품물이 계약·RFP 요건을 빠짐없이 충족하고, 클라이언트가 운영·유지보수할 수 있는 상태로 인계되도록 보장한다. 본 문서는 GoldWiki SSOT의 납품 게이트 기준이며, [품질 검증 10단계](../QA/QualityReviewChecklist.md) 통과를 전제로 한다.

> 모든 에이전트는 납품 전 GoldWiki를 먼저 참조한다. 납품 결과·이슈·교훈은 [../DecisionLog/](../DecisionLog/)와 [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md)에 기록해 차기 프로젝트 자산으로 환원한다.

## 언제 사용하는가

- 프로젝트 최종 단계(L8 납품·인수)에서 클라이언트 인계 직전.
- 단계별 중간 산출물의 부분 납품(milestone delivery) 시.
- 검수 요청(인수 검사) 제출 전 자가 점검.
- 하자보수·인수 인계 후 잔여 의무 확인 시.

## 입력 정보

| 입력 | 출처 | 비고 |
| --- | --- | --- |
| 계약·RFP 납품 요건 | [../RFP/](../RFP/), 과업지시서 | 산출물 목록·형식 기준 |
| 산출물 정의·WBS | [../PMO/WBSGuide.md](../PMO/WBSGuide.md) | 산출물 추적 |
| 품질 검증 결과 | [../QA/QualityReviewChecklist.md](../QA/QualityReviewChecklist.md) | 10단계 Pass 증빙 |
| 릴리스 기준 | [../31_RELEASE_PROCESS.md](../31_RELEASE_PROCESS.md) | 버전·배포 |
| 테스트 결과 | [../30_TEST_STRATEGY.md](../30_TEST_STRATEGY.md) | QA 통과 증빙 |

## 처리 방식

납품 검증은 **4개 영역(산출물·품질·문서·인수)** 을 순차로 점검한다. 각 영역은 게이트이며, 한 영역이라도 미충족이면 납품을 보류한다.

```mermaid
flowchart LR
  A[산출물 완결성] --> B[품질 충족]
  B --> C[문서 완비]
  C --> D[인수 절차]
  D --> G{전 영역 충족?}
  G -- 예 --> H[납품 확정]
  G -- 아니오 --> X[보류·보완]
```

### 1. 산출물 영역

납품 대상 산출물이 계약·WBS 정의대로 빠짐없이 존재하고 최신본인지 확인한다.

- [ ] 산출물 목록이 계약·RFP 요건과 100% 일치한다.
- [ ] 각 산출물이 최종 승인 버전이며 버전·일자가 표기되었다.
- [ ] 소스 코드·디자인 원본·자산이 합의된 형식으로 포함되었다.
- [ ] 산출물 간 상호 참조·링크가 유효하다(깨진 링크 0건).
- [ ] 부분 납품 시 잔여 산출물·일정이 명시되었다.

### 2. 품질 영역

산출물이 합의된 품질 기준과 테스트를 통과했는지 확인한다.

- [ ] [품질 검증 10단계](../QA/QualityReviewChecklist.md)를 모두 Pass했다.
- [ ] 기능·통합·접근성 테스트 결과가 기준을 충족한다([../30_TEST_STRATEGY.md](../30_TEST_STRATEGY.md)).
- [ ] 알려진 결함(known issues)이 등록·등급화되었고 치명 결함이 없다.
- [ ] 보안·개인정보 점검을 통과했다([../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md)).
- [ ] 성능 기준(응답시간·부하)이 검증되었다.

### 3. 문서 영역

운영·유지보수·인수에 필요한 문서가 완비되었는지 확인한다.

- [ ] 사용자/운영자 매뉴얼이 작성되었다.
- [ ] 기술 문서(아키텍처·API·DB·배포)가 최신이다([../22_API_STANDARD.md](../22_API_STANDARD.md)).
- [ ] 릴리스 노트·변경 이력이 정리되었다([../../Templates/Release_Notes.md](../../Templates/Release_Notes.md)).
- [ ] 유지보수·이관 가이드(계정·권한·환경)가 포함되었다.
- [ ] 모든 문서가 자연스러운 한국어로 작성되었다.

### 4. 인수 영역

클라이언트 인수·검수 절차와 잔여 의무를 확정한다.

- [ ] 인수 검사(UAT) 일정·기준·담당이 합의되었다.
- [ ] 인수확인서·검수조서 양식이 준비되었다.
- [ ] 교육·핸드오버 세션이 계획·실시되었다.
- [ ] 하자보수 범위·기간·연락 체계가 명시되었다.
- [ ] 미해결 이슈·후속 과제가 인계 목록에 기록되었다.

### 납품 판정 기준

| 판정 | 기준 | 조치 |
| --- | --- | --- |
| 납품 확정 | 4개 영역 전 항목 충족 | 인수확인서 서명, DecisionLog 기록 |
| 조건부 납품 | 경미 결함·문서 보완 잔여 | 보완 일정 합의 후 부분 인계 |
| 납품 보류 | 치명 결함·핵심 산출물 누락 | 재작업, 게이트 재검 |

## 출력 산출물

- **납품 검증 보고서**: 4개 영역별 점검 결과·미충족 항목.
- **납품물 목록(BOM)**: 산출물·버전·형식·위치.
- **인수확인서·검수조서**: 클라이언트 서명용.
- **이관·핸드오버 패키지**: 매뉴얼·기술문서·계정/권한·잔여 과제.
- **교훈(lessons learned)**: [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md)·[../DecisionLog/](../DecisionLog/)에 기록.

## 품질 기준

- 4개 영역 전 항목 충족 시에만 납품을 확정한다.
- 모든 산출물은 최종 승인 버전이며 추적 가능하다.
- 치명 결함·핵심 산출물 누락이 0건이다.
- 클라이언트가 독립 운영 가능한 문서·교육이 제공되었다.
- 인수확인서로 인계가 공식 확정된다.

## 체크리스트

- [ ] 산출물 영역(5항목)을 점검했다.
- [ ] 품질 영역(5항목)을 점검하고 10단계 Pass를 확인했다.
- [ ] 문서 영역(5항목)을 점검했다.
- [ ] 인수 영역(5항목)을 점검했다.
- [ ] 납품 판정(확정/조건부/보류)을 기록했다.
- [ ] 인수확인서와 핸드오버 패키지를 인계했다.
- [ ] 교훈을 ProjectMemory·DecisionLog에 기록했다.

## 예시 프롬프트

```text
당신은 pmo-director다. GoldWiki/Delivery/FinalDeliveryChecklist.md로 아래 프로젝트의
최종 납품 적합성을 검증하라.

입력: 산출물 목록·버전, 품질 검증 보고서(10단계 결과), 테스트 결과, 문서 목록, 인수 일정
요구:
1) 4개 영역(산출물·품질·문서·인수)별 항목 점검 결과
2) 미충족 항목과 보완 요구(우선순위)
3) 납품 판정(확정/조건부/보류)과 사유
4) 인수확인서·핸드오버 패키지 구성 목록
5) ProjectMemory·DecisionLog에 기록할 교훈

모든 출력은 한국어로 작성한다.
```




===== 파일: GoldWiki/Delivery/README.md =====

# Delivery — 납품·인수 토픽

## 폴더 목적

ClubSchool AI OS 프로젝트의 **최종 납품(handover)** 기준을 정의한다. 납품물이 계약·RFP 요건을 빠짐없이 충족하고, 품질·문서·인수 절차가 완비되어 클라이언트가 독립 운영·유지보수할 수 있는 상태로 인계되도록 보장한다. GoldWiki SSOT의 납품 게이트 정본 토픽이다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [FinalDeliveryChecklist.md](FinalDeliveryChecklist.md) | 최종 납품 체크리스트(산출물·품질·문서·인수 4영역)와 납품 판정 기준 |

## 관련 GoldWiki 토픽 / 번호 문서

- [../31_RELEASE_PROCESS.md](../31_RELEASE_PROCESS.md) — 릴리스 프로세스
- [../30_TEST_STRATEGY.md](../30_TEST_STRATEGY.md) — 테스트 전략
- [../QA/QualityReviewChecklist.md](../QA/QualityReviewChecklist.md) — 품질 검증 10단계(납품 전제)
- [../PMO/WBSGuide.md](../PMO/WBSGuide.md) — 산출물 정의·WBS 추적
- [../../Templates/Release_Notes.md](../../Templates/Release_Notes.md) — 릴리스 노트 템플릿
- [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md) — 교훈 누적
- [../DecisionLog/](../DecisionLog/) — 납품 판정·이슈 기록

## 담당 에이전트

- **주담당:** `pmo-director` (납품·인수 총괄)
- **협업:** `qa-lead`(품질 증빙), `documentation-lead`(문서·매뉴얼), `executive-director`(납품 확정 승인), `backend-lead`/`frontend-lead`(기술 이관)

## 거버넌스

납품은 산출물·품질·문서·인수 4개 영역 전 항목 충족 시에만 확정한다(인수확인서 서명). 치명 결함·핵심 산출물 누락이 있으면 보류한다. 납품 결과·교훈은 [ProjectMemory](../35_PROJECT_MEMORY.md)·[DecisionLog](../DecisionLog/)에 기록한다.




===== 파일: GoldWiki/DesignSystem/DesignSystemGuide.md =====

# 디자인 시스템 가이드 (Design System Guide)

Goldwiki Digital(골드위키 디지털)의 디자인 시스템 구축·운영 표준. **토큰 → 컴포넌트 → 패턴**의 3계층과 거버넌스를 정의하여, 디자인-개발 일관성과 재사용성을 보장한다.

> 이 문서를 쓰는 에이전트는 [09_DESIGN_SYSTEM](../09_DESIGN_SYSTEM.md), [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md), [14_COMPONENT_LIBRARY](../14_COMPONENT_LIBRARY.md)를 먼저 참조한다. 디자인 시스템은 GoldWiki의 시각 표준 SSOT다.

---

## 목적

- 토큰·컴포넌트·패턴의 계층 구조와 명명 규칙을 정의한다.
- 디자인-개발 단일 출처(Figma ↔ 코드)를 동기화하는 체계를 마련한다.
- 기여·버전·폐기(deprecation)·접근성 거버넌스를 규정한다.

## 언제 사용하는가

| 시점 | 사용 목적 |
| --- | --- |
| 시스템 신규 구축 | 0→1 토큰/컴포넌트 정의 |
| 컴포넌트 추가/변경 | 기여 절차·리뷰 |
| 멀티 테마/브랜드 | 토큰 분기 전략 |
| 버전 릴리스 | SemVer·체인지로그 |

## 입력 정보

- UI 가이드라인: [../UI/UIGuidelines](../UI/UIGuidelines.md)
- 브랜드 비주얼: [../Brand/BXGuidelines](../Brand/BXGuidelines.md)
- 접근성 기준: [16_ACCESSIBILITY](../16_ACCESSIBILITY.md)
- 프런트 구현 표준: [20_FRONTEND_GUIDE](../20_FRONTEND_GUIDE.md), [18_CSS_GUIDE](../18_CSS_GUIDE.md)

## 처리 방식

### 3계층 아키텍처
```mermaid
flowchart TD
  T[Tokens · 토큰] --> C[Components · 컴포넌트]
  C --> P[Patterns · 패턴]
  P --> A[Application · 화면]
```

#### 1) 토큰 (Tokens)
- **글로벌(원시)**: `color-blue-500`, `space-4`
- **시맨틱(별칭)**: `color-primary` → `color-blue-500`
- **컴포넌트**: `button-bg-primary` → `color-primary`
- 출처: 디자인 토큰 파일(JSON/Style Dictionary) → [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md)

| 카테고리 | 예시 토큰 |
| --- | --- |
| Color | `color-primary`, `color-surface`, `color-danger` |
| Spacing | `space-1`..`space-12` (4px 베이스) |
| Typography | `font-size-body`, `line-height-h1` |
| Radius | `radius-sm/md/lg` |
| Elevation | `shadow-1/2/3` |

#### 2) 컴포넌트 (Components)
- 원자→분자→유기체(Atomic) 계층
- 각 컴포넌트 명세: 용도, props/variant, 상태(6+), 접근성(role/aria), 사용/금지 예
- Figma 컴포넌트 ↔ 코드 컴포넌트 1:1, Code Connect 매핑 권장

#### 3) 패턴 (Patterns)
- 폼, 빈 상태, 에러 처리, 페이지네이션, 알림/토스트, 검색 등 반복 해법
- 패턴은 컴포넌트 조합 + 사용 맥락 규칙으로 문서화

### 거버넌스
| 항목 | 규칙 |
| --- | --- |
| 버전 | SemVer(major.minor.patch) — 파괴적 변경=major |
| 기여 | 제안 → 리뷰(디자인+개발) → 승인 → 문서화 → 릴리스 |
| 폐기 | deprecated 표기 → 1 마이너 유예 → 제거 |
| 승인 | design-system-lead 승인, 접근성 게이트 필수 |
| 변경 기록 | [32_DECISION_LOG](../32_DECISION_LOG.md)·CHANGELOG 갱신 |

### 기여 절차 (mermaid)
```mermaid
flowchart LR
  PR[제안] --> RV{리뷰}
  RV -- 반려 --> PR
  RV -- 승인 --> DOC[문서화]
  DOC --> REL[릴리스 + 버전업]
  REL --> SYNC[Figma↔코드 동기화]
```

## 출력 산출물

| 산출물 | 형식 |
| --- | --- |
| 토큰 파일 | JSON ([15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md)) |
| 컴포넌트 카탈로그 | 문서/Storybook ([14_COMPONENT_LIBRARY](../14_COMPONENT_LIBRARY.md)) |
| 패턴 라이브러리 | 문서 |
| 거버넌스/기여 가이드 | 문서 |
| 릴리스 노트 | 문서 ([Templates/Release_Notes](../../Templates/Release_Notes.md)) |

## 품질 기준

- [ ] 화면이 시맨틱 토큰만 참조한다(원시 토큰 직접 사용 금지).
- [ ] 모든 컴포넌트에 상태·접근성·사용/금지 예가 있다.
- [ ] Figma와 코드 컴포넌트가 동기화되어 있다.
- [ ] 버전이 SemVer를 따르고 체인지로그가 있다.
- [ ] 폐기 컴포넌트에 마이그레이션 경로가 명시되었다.

## 체크리스트

- [ ] 토큰 3계층(글로벌/시맨틱/컴포넌트)이 정의되었는가
- [ ] 명명 규칙이 일관적인가
- [ ] 컴포넌트 접근성(role/aria/포커스)이 검증되었는가
- [ ] 패턴이 컴포넌트 조합으로 문서화되었는가
- [ ] 거버넌스(버전/기여/폐기)가 운영되는가
- [ ] [09_DESIGN_SYSTEM](../09_DESIGN_SYSTEM.md)에 반영했는가

## 예시 프롬프트

```
역할: design-system-lead. GoldWiki/DesignSystem/DesignSystemGuide.md를 따른다.
입력: 브랜드 컬러/타이포, UI 가이드라인, 라이트/다크 요구.
작업: 토큰 3계층 정의(라이트/다크 분기) → Button/Input/Modal 컴포넌트 명세
      (variant·상태·aria) → 폼/빈상태 패턴 → SemVer 거버넌스.
출력: 토큰 JSON 예시, 컴포넌트 카탈로그 표, 기여 절차 mermaid.
```




===== 파일: GoldWiki/DesignSystem/README.md =====

# DesignSystem 토픽 — GoldWiki

디자인 시스템(토큰·컴포넌트·패턴)과 거버넌스의 단일 진실 공급원(SSOT). 디자인-개발 일관성과 재사용성을 운영하는 표준을 모은다.

## 폴더 목적

- 토큰 → 컴포넌트 → 패턴의 3계층 아키텍처 정의
- Figma ↔ 코드 동기화 및 단일 출처 운영
- 버전(SemVer)·기여·폐기·접근성 거버넌스 관리

## 포함 문서

| 문서 | 내용 |
| --- | --- |
| [DesignSystemGuide.md](DesignSystemGuide.md) | 디자인 시스템 가이드(토큰→컴포넌트→패턴, 거버넌스) |

## 관련 GoldWiki 문서

- [09_DESIGN_SYSTEM](../09_DESIGN_SYSTEM.md) — 디자인 시스템 번호형 문서
- [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md) — 디자인 토큰
- [14_COMPONENT_LIBRARY](../14_COMPONENT_LIBRARY.md) — 컴포넌트 라이브러리
- [10_FIGMA_GUIDE](../10_FIGMA_GUIDE.md) — Figma 가이드
- [16_ACCESSIBILITY](../16_ACCESSIBILITY.md) — 접근성

## 관련 토픽 폴더

- [../UI/README.md](../UI/README.md) · [../UX/README.md](../UX/README.md) · [../Brand/README.md](../Brand/README.md) · [../Frontend/README.md](../Frontend/README.md)

## 담당 에이전트

- 주관: `design-system-lead`
- 협업: `ui-design-lead`, `frontend-lead`, `bx-design-lead`

## 거버넌스

화면은 시맨틱 토큰만 참조한다(원시 토큰 직접 사용 금지). 컴포넌트 추가/변경은 제안→리뷰(디자인+개발)→승인→문서화→릴리스 절차를 따르고, 접근성 게이트를 통과해야 한다. 변경은 SemVer로 버전업하고 [32_DECISION_LOG](../32_DECISION_LOG.md)·CHANGELOG에 기록한다.




===== 파일: GoldWiki/Foundation/DecisionLog.md =====

# 의사결정 기록 (Decision Log · ADR 방법론)

> 조직의 모든 중대한 의사결정을 ADR(Architecture Decision Record) 형식으로 기록·추적하는 방법과 템플릿. 이 문서는 *방법론 정본*이고, 누적되는 실제 결정 로그는 [번호형 32](../../GoldWiki/32_DECISION_LOG.md)에 적재된다.

## 목적

의사결정을 휘발시키지 않고 **맥락·대안·결정·결과**와 함께 영속 기록하여, 미래의 사람·AI 에이전트가 "왜 이렇게 결정했는가"를 추적하고 동일한 논의를 반복하지 않도록 한다. ADR은 골드위키 "두뇌 갱신" 원칙의 핵심 산출물이며, 모든 표준 변경·아키텍처 선택·트레이드오프의 단일 추적 지점이다.

## 언제 사용하는가

- 되돌리기 어렵거나 비용이 큰 결정을 내릴 때 (기술 스택, 아키텍처, 표준 변경)
- 여러 대안 중 하나를 선택하고 그 근거를 남겨야 할 때
- 범위·예산·일정·리스크에 영향을 주는 결정을 할 때
- 기존 결정을 번복·대체(supersede)할 때
- 제안서·납품물의 핵심 의사결정을 클라이언트에게 설명해야 할 때

> **판단 기준:** "6개월 뒤 누군가 '왜 이렇게 했지?'라고 물을 수 있는 결정이면 ADR을 남긴다." 일상적·가역적 실무 결정은 남기지 않아도 된다.

## 입력 정보

| 입력 | 설명 |
| --- | --- |
| 결정이 필요한 문제 | 무엇을 정해야 하는가 (1~2문장) |
| 맥락·제약 | 배경, 요구사항, 기술/예산/일정 제약 |
| 검토한 대안 | 최소 2개 이상의 후보와 각 장단점 |
| 이해관계자 | 결정에 영향을 주는/받는 에이전트·역할 |
| 관련 표준 | 영향받는 골드위키 정본 문서 |

## 처리 방식

### ADR 작성 절차
1. **번호 부여** — `ADR-NNNN` 순번. 최신 번호는 [번호형 32](../../GoldWiki/32_DECISION_LOG.md) 말미에서 확인.
2. **상태 설정** — 제안(Proposed) → 승인(Accepted) → (필요 시) 대체됨(Superseded by ADR-XXXX) / 폐기(Deprecated).
3. **맥락 기술** — 가치판단 없이 사실과 제약만.
4. **대안 비교** — 표로 장단점·평가 기준.
5. **결정·근거** — 무엇을, 왜. 거부한 대안의 거부 이유 포함.
6. **결과(Consequences)** — 긍정/부정 영향, 후속 작업, 리스크.
7. **두뇌 환류** — 영향받는 정본 문서·프로젝트 메모리·베스트 프랙티스를 같은 작업에서 갱신.

### ADR 템플릿

```markdown
## ADR-NNNN: <결정 제목>
- 상태: Proposed | Accepted | Superseded by ADR-XXXX | Deprecated
- 일자: YYYY-MM-DD
- 결정자: <에이전트/역할>
- 관련 문서: <goldwiki 정본 링크>

### 맥락 (Context)
<배경·문제·제약을 사실 위주로>

### 검토한 대안 (Options)
| 대안 | 장점 | 단점 |
| --- | --- | --- |
| A | … | … |
| B | … | … |

### 결정 (Decision)
<선택한 대안과 핵심 근거. 거부한 대안의 거부 이유.>

### 결과 (Consequences)
- 긍정: …
- 부정/리스크: …
- 후속 작업: …
```

## 출력 산출물

- 번호가 부여된 ADR 엔트리 ([번호형 32](../../GoldWiki/32_DECISION_LOG.md)에 추가)
- 갱신된 영향 문서(정본) 및 두뇌 4종
- 필요 시 대체 관계(supersede) 링크

## 품질 기준

| 기준 | 충족 조건 |
| --- | --- |
| 추적성 | 번호·일자·결정자·관련 문서가 모두 명시 |
| 대안 비교 | 2개 이상 대안과 거부 이유가 기록 |
| 가역성 명시 | 결정의 되돌리기 비용/리스크가 결과에 기술 |
| 환류 완료 | 영향 정본·메모리·베스트 프랙티스 갱신 완료 |
| 상태 일관성 | 대체된 ADR은 양방향 링크로 연결 |

## 체크리스트

- [ ] 이 결정이 ADR 대상인가 (가역적·일상적이면 생략 가능)
- [ ] 순번·상태·일자·결정자를 채웠는가
- [ ] 대안을 2개 이상 비교했는가
- [ ] 거부한 대안의 거부 이유를 적었는가
- [ ] 결과(긍정/부정/후속)를 적었는가
- [ ] 영향받는 정본 문서를 갱신했는가
- [ ] 번복이면 기존 ADR을 Superseded로 표기하고 양방향 링크했는가

## 예시 프롬프트

```
당신은 documentation-lead 에이전트다. 방금 cto-reviewer가 내린
"프론트엔드 상태관리 라이브러리 선택" 결정을 ADR로 기록하라.
- DecisionLog 템플릿을 사용하고, 최소 3개 대안을 비교 표로 정리하라.
- 번호는 32_DECISION_LOG.md의 마지막 ADR 다음 순번을 쓰라.
- 결정의 결과 섹션에 번들 크기·러닝커브·팀 숙련도 영향을 명시하라.
- 영향받는 ../Frontend/ 정본 문서를 갱신하고 양방향 링크를 걸어라.
```

---

## 예시 ADR 4건 (요약 카탈로그)

> 전문은 [번호형 32](../../GoldWiki/32_DECISION_LOG.md)에 적재. 아래는 형식 학습용 예시이다.

### ADR-0001: 골드위키를 단일 진실 공급원으로 채택
- 상태: Accepted · 2026-06-26 · 결정자: executive-director
- 맥락: 멀티에이전트 운영에서 지식이 산출물·채팅에 흩어져 불일치 발생.
- 대안: (A) 위키 단일화 (B) 산출물 내 분산 기록 (C) 외부 문서도구.
- 결정: (A). 모든 표준·결정·기억을 골드위키에 집중, "정의 1회·참조 다수" 원칙.
- 결과: 일관성↑, 중복↓. 초기 정본화 비용 발생.

### ADR-0002: RFP→납품 21단계 표준 파이프라인 채택
- 상태: Accepted · 2026-06-26 · 결정자: pmo-director
- 맥락: 프로젝트마다 프로세스가 달라 인계 누락·품질 변동 발생.
- 대안: (A) 21단계 게이트형 파이프라인 (B) 프로젝트별 자율.
- 결정: (A). 단계별 게이트·담당·산출물 표준화. 정본 [27](../../GoldWiki/27_AUTOMATION_WORKFLOW.md).
- 결과: 추적성·예측성↑. 소형 과제엔 테일러링 가이드 필요.

### ADR-0003: 디자인 토큰 정본을 DesignSystem 폴더로 일원화
- 상태: Accepted · 2026-06-26 · 결정자: design-system-lead
- 맥락: 색/타이포 토큰이 UI·DesignSystem 문서에 중복 기재되어 불일치.
- 대안: (A) DesignSystem 단일 정본 (B) 각 문서 자체 정의.
- 결정: (A). UI 문서는 토큰을 링크만. 중복 금지 원칙 적용.
- 결과: 토큰 불일치 제거. 변경 1지점화.

### ADR-0004: 접근성 기준을 WCAG 2.2 AA로 상향
- 상태: Accepted · 2026-06-26 · 결정자: security-risk-lead, accessibility 역할
- 맥락: 공공/금융 고객 조달 요건 강화, 기존 2.1 AA로는 미달 사례.
- 대안: (A) 2.2 AA 전사 기준 (B) 프로젝트별 협의.
- 결정: (A). 전 산출물 기본값 2.2 AA. 정본 [16](../../GoldWiki/16_ACCESSIBILITY.md).
- 결과: 입찰 적격성↑, QA 게이트에 a11y 항목 추가.

---

## 관련 골드위키 문서
- [번호형 32 · 의사결정 로그(정본 적재)](../../GoldWiki/32_DECISION_LOG.md)
- [운영 원칙](OperatingPrinciples.md) — 두뇌 갱신 원칙
- [프로젝트 메모리](ProjectMemory.md) — 학습 환류
- [전사 품질 기준](QualityStandard.md) — 결정 품질 게이트
- [DecisionLog 폴더 README](../DecisionLog/README.md)

> **거버넌스:** 본 문서의 모든 의사결정은 [의사결정 로그](../../GoldWiki/32_DECISION_LOG.md), [프로젝트 메모리](ProjectMemory.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Foundation/OperatingPrinciples.md =====

# 조직 운영 원칙 (Operating Principles)

> Goldwiki Digital(ClubSchool AI OS)의 모든 사람·AI 에이전트를 구속하는 최상위 운영 헌장. 의사결정·산출물·협업의 기본값을 정의한다.

## 목적

조직 전체가 동일한 원칙 위에서 일관되게 판단·실행하도록 운영의 헌법을 정의한다. 골드위키(GoldWiki)를 단일 진실 공급원(SSOT, 조직의 두뇌)으로 운영하는 다섯 가지 핵심 원칙 — **골드위키 우선 · SSOT · 중복 금지 · 두뇌 갱신 · 품질 기준** — 을 명문화하여, 24개 활성 에이전트와 80명 역할이 충돌 없이 협업할 수 있는 공통 기반을 제공한다.

이 문서는 추상적 선언이 아니라 **실행 가능한 규칙**이다. 각 원칙은 "무엇을 해야 하는가"와 "어겼을 때 어떻게 되는가"를 함께 정의한다.

## 언제 사용하는가

- 신규 에이전트·구성원이 합류하여 조직의 작동 방식을 익힐 때
- 두 산출물·문서 사이에 정보가 충돌하거나 중복될 때, 어느 쪽이 권위를 갖는지 판단할 때
- 어떤 결정을 골드위키에 기록해야 하는지(또는 하지 않아도 되는지) 모호할 때
- 표준 변경·새 문서 생성·기존 문서 폐기를 검토할 때
- 품질 게이트 통과 여부를 판단할 때의 1차 기준이 필요할 때
- 에이전트 간 책임 경계나 인계 방식에 대한 분쟁이 발생할 때

## 입력 정보

| 입력 | 출처 | 용도 |
| --- | --- | --- |
| 작업 맥락(RFP 단계, 산출물 종류) | [RFP 대응 프레임워크](../../GoldWiki/03_RFP_FRAMEWORK.md) | 어떤 원칙·표준이 적용되는지 식별 |
| 관련 표준 문서 | 해당 토픽 폴더(`../UX/`, `../Backend/` 등) | 정본 참조 대상 확정 |
| 기존 의사결정 | [의사결정 로그](DecisionLog.md), [번호형 32](../../GoldWiki/32_DECISION_LOG.md) | 선례·제약 확인 |
| 조직도·역할 | [조직 지도](../Organization/OrganizationMap.md) | 책임 주체·에스컬레이션 경로 확인 |
| 품질 기준 | [전사 품질 기준](QualityStandard.md) | 완료 정의(DoD) 확인 |

## 처리 방식

### 원칙 1 — 골드위키 우선 (GoldWiki-First)
모든 에이전트는 **의사결정·산출물 생성 전에** 관련 골드위키 문서를 먼저 읽는다. 추측·개인 메모·이전 프로젝트의 기억으로 시작하지 않는다.

- 작업 착수 시 [00_START_HERE](../../GoldWiki/00_START_HERE.md)에서 관련 토픽·번호 문서를 식별한다.
- 토픽 폴더의 README → 핵심 문서 순으로 읽는다.
- 골드위키에 답이 없으면, 그 자체가 신규 표준을 만들어야 한다는 신호다.

### 원칙 2 — 단일 진실 공급원 (SSOT)
하나의 사실·표준은 **골드위키 단 한 곳**에 정본(canonical)으로 존재한다. 골드위키에 기록된 내용이 공식 표준이며, 구두 합의·채팅·개인 문서는 효력이 없다.

| 상황 | 올바른 처리 |
| --- | --- |
| 표준이 골드위키에 있음 | 그대로 따른다 |
| 표준이 산출물에만 있음 | 골드위키로 승격(promote)하고 산출물은 링크로 대체 |
| 표준이 두 곳에 다름 | 골드위키 정본이 우선, 다른 쪽을 정정 |

### 원칙 3 — 지식 중복 금지 (Define Once, Reference Everywhere)
같은 정보를 두 문서에 적지 않는다. 항상 **정본으로 링크**한다. 복사-붙여넣기는 시간이 지나면 반드시 불일치를 만든다.

```
❌ 나쁜 예: UI 문서와 디자인시스템 문서에 색상 토큰을 각각 표로 적음
✅ 좋은 예: 색상 토큰 정본은 ../DesignSystem/ 에 1회 정의, UI 문서는 링크
```

### 원칙 4 — 두뇌 갱신 (Update the Brain)
사소하지 않은 모든 결정·학습은 **같은 작업 단위 안에서** 조직의 두뇌를 갱신한다. 결정과 기록을 분리하지 않는다.

갱신 대상 4종:
- [의사결정 로그](DecisionLog.md) / [번호형 32](../../GoldWiki/32_DECISION_LOG.md) — 무엇을 왜 결정했는가
- [프로젝트 메모리](ProjectMemory.md) / [번호형 35](../../GoldWiki/35_PROJECT_MEMORY.md) — 프로젝트에서 무엇을 배웠는가
- [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md) — 재사용 가능한 모범 사례로 일반화
- [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md) — 근거가 된 외부 표준·자료

### 원칙 5 — 품질 기준 (Quality Bar)
모든 산출물은 **경영진 수준 · 클라이언트 제출 가능 · 구현 가능 · 재사용 가능 · 근거 기반**이어야 한다. 상세 기준과 완료 정의(DoD)는 [전사 품질 기준](QualityStandard.md)을 따른다.

## 출력 산출물

- 원칙을 적용한 의사결정과 그 근거(→ DecisionLog 엔트리)
- 정본화·중복 제거된 골드위키 문서
- 갱신된 두뇌 4종 문서
- 품질 게이트 통과 기록

## 품질 기준

| 기준 | 충족 조건 |
| --- | --- |
| 골드위키 우선 준수 | 작업 전 관련 정본을 읽은 흔적(인용·링크)이 있다 |
| 중복 없음 | 동일 정보가 2곳 이상에 본문으로 존재하지 않는다 |
| 추적 가능 | 모든 산출물이 정본 문서·담당 에이전트로 거슬러 추적된다 |
| 두뇌 갱신 완료 | 결정과 동시에 4종 문서가 갱신되었다 |
| 신선도 | 변경한 문서의 최종 수정일·상태가 갱신되었다 |

## 체크리스트

- [ ] 작업 전 관련 골드위키 정본을 읽었는가
- [ ] 새로 만든 정보가 기존 정본과 중복되지 않는가 (중복이면 링크로 대체)
- [ ] 정본이 골드위키 단 한 곳에만 존재하는가
- [ ] 사소하지 않은 결정을 DecisionLog에 ADR로 남겼는가
- [ ] 학습 내용을 ProjectMemory·BestPractices·ReferenceLibrary에 환류했는가
- [ ] 산출물이 5대 품질 기준(경영진·제출가능·구현가능·재사용·근거)을 충족하는가
- [ ] 변경 문서의 메타데이터(최종 수정일·상태)를 갱신했는가
- [ ] 책임 경계·인계 방식이 [에이전트 운영 규칙](../Organization/AgentOperatingRules.md)에 부합하는가

## 예시 프롬프트

```
당신은 ui-design-lead 에이전트다. 운영 원칙(특히 SSOT·중복 금지)을 준수하라.
신규 화면의 색상·간격을 정의하기 전에:
1) ../DesignSystem/ 의 토큰 정본을 먼저 읽고, 거기 정의된 토큰만 사용하라.
2) 정본에 없는 새 토큰이 필요하면, design-system-lead와 협의하여 정본에 추가하고
   DecisionLog에 근거와 함께 기록하라. UI 문서에는 토큰을 복사하지 말고 링크하라.
3) 작업 완료 시 두뇌 4종 문서 갱신 여부를 체크리스트로 확인하라.
```

---

## 관련 골드위키 문서
- [전사 품질 기준](QualityStandard.md) — 5대 원칙 중 품질 기준의 상세 정의
- [의사결정 기록(ADR)](DecisionLog.md) — 두뇌 갱신의 핵심 산출물
- [프로젝트 메모리](ProjectMemory.md) — 학습 환류 체계
- [조직 지도](../Organization/OrganizationMap.md) — 책임 주체·보고선
- [에이전트 운영 규칙](../Organization/AgentOperatingRules.md) — 협업·인계·에스컬레이션
- [번호형 28 · 서브에이전트 규칙](../../GoldWiki/28_SUBAGENT_RULES.md), [번호형 37 · 베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md)

> **거버넌스:** 본 문서에서 비롯된 모든 의사결정은 [의사결정 로그](DecisionLog.md), [프로젝트 메모리](ProjectMemory.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Foundation/ProjectMemory.md =====

# 프로젝트 메모리 (Project Memory)

> 프로젝트별 컨텍스트·결정·학습·회고를 누적하여 조직이 매 프로젝트에서 배우고 재사용하도록 하는 장기 기억 체계. 방법론·스키마는 이 문서가 정본이고, 누적 스냅샷은 [번호형 35](../../GoldWiki/35_PROJECT_MEMORY.md)에 적재된다.

## 목적

각 프로젝트의 핵심 사실·결정·학습을 구조화된 스키마로 저장하여, (1) 진행 중 프로젝트의 컨텍스트를 모든 에이전트가 공유하고, (2) 종료 후 학습을 [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md)로 환류하며, (3) 유사 신규 프로젝트가 과거 자산을 즉시 재활용하도록 한다. "지속 학습" 가치의 구현체이다.

## 언제 사용하는가

- 프로젝트 킥오프 시 메모리 스냅샷을 신규 생성할 때
- 중요한 결정·이벤트·리스크 변화가 발생할 때 스냅샷을 갱신할 때
- 단계 게이트 통과·마일스톤 종료 시 학습을 적재할 때
- 프로젝트 종료 회고에서 교훈을 일반화하여 환류할 때
- 신규 RFP가 들어왔을 때 유사 과거 프로젝트의 컨텍스트를 조회할 때

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 프로젝트 식별 정보(코드명·클라이언트·기간) | [클라이언트 지식 34](../../GoldWiki/34_CLIENT_KNOWLEDGE.md) |
| 단계·산출물 현황 | [RFP 프레임워크 03](../../GoldWiki/03_RFP_FRAMEWORK.md) |
| 주요 의사결정 | [의사결정 로그](DecisionLog.md) |
| 리스크·이슈 | PMO 리스크 레지스터 |
| 회고·교훈 | 단계/종료 회고 |

## 처리 방식

### 메모리 스키마

```yaml
project:
  code: "PRJ-2026-018"          # 프로젝트 코드
  client: "<클라이언트>"
  domain: "공공 | 금융 | 대기업 | 성장기업"
  period: "2026-07 ~ 2026-11"
  status: "진행 | 보류 | 완료 | 중단"
context:
  goal: "<핵심 목표 1~2문장>"
  scope: "<범위 요약>"
  constraints: ["예산", "규제(WCAG/보안)", "레거시 통합"]
  stakeholders: ["<핵심 이해관계자>"]
decisions:                       # DecisionLog ADR 참조
  - id: "ADR-0042"
    summary: "<결정 요약>"
risks:
  - id: "R-03"
    desc: "<리스크>"
    severity: "H|M|L"
    mitigation: "<완화책>"
    status: "open|mitigated|closed"
learnings:                       # 종료/단계 회고
  - what: "<무엇이 일어났나>"
    why: "<원인>"
    action: "<다음에 할 일>"
    promote_to: "BestPractices | Template | none"
artifacts:
  - name: "<산출물>"
    link: "<경로>"
```

### 운영 절차
1. **생성**: 킥오프에서 `project`·`context` 작성, status=진행.
2. **갱신**: 결정·리스크·산출물 변화 시 즉시 해당 섹션 추가(덮어쓰지 말고 누적).
3. **학습 적재**: 게이트·마일스톤마다 `learnings` 추가, `promote_to` 지정.
4. **종료 환류**: 종료 회고에서 `promote_to: BestPractices`인 항목을 [37](../../GoldWiki/37_BEST_PRACTICES.md)로, 재사용 산출물을 [템플릿 라이브러리 38](../../GoldWiki/38_TEMPLATE_LIBRARY.md)로 승격. status=완료.

## 출력 산출물

- 프로젝트별 메모리 스냅샷(YAML 블록, [번호형 35](../../GoldWiki/35_PROJECT_MEMORY.md)에 적재)
- 환류된 베스트 프랙티스·템플릿
- 신규 프로젝트용 재사용 컨텍스트 패키지

## 품질 기준

| 기준 | 충족 조건 |
| --- | --- |
| 누적성 | 갱신 시 기존 기록을 덮어쓰지 않고 추가한다 |
| 추적성 | 결정은 ADR 번호로, 산출물은 경로로 연결된다 |
| 환류 완료 | 종료 시 학습이 베스트 프랙티스/템플릿으로 승격된다 |
| 검색성 | domain·client·기간으로 조회 가능한 메타 보유 |
| 신선도 | status·최종 갱신일이 현행화된다 |

## 체크리스트

- [ ] 킥오프에 메모리 스냅샷을 생성했는가
- [ ] 주요 결정을 ADR 번호로 연결했는가
- [ ] 리스크의 상태·완화책이 현행화되었는가
- [ ] 게이트마다 학습을 적재하고 promote_to를 지정했는가
- [ ] 종료 시 학습을 베스트 프랙티스/템플릿으로 환류했는가
- [ ] 스냅샷의 status·갱신일을 최신화했는가

## 예시 프롬프트

```
당신은 pmo-director 에이전트다. PRJ-2026-018 프로젝트가 UX 단계 게이트를
통과했다. ProjectMemory 스키마에 따라 35_PROJECT_MEMORY.md의 해당 스냅샷에
이번 단계의 learnings를 누적 추가하라(기존 내용 보존). 재사용 가치가 있는
'리서치 인터뷰 가이드'는 promote_to: Template 로 표시하고, 종료 시 38번
템플릿 라이브러리로 승격할 후보로 남겨라.
```

---

## 예시 스냅샷 (요약)

```yaml
project: { code: "PRJ-2026-018", client: "○○공단", domain: "공공",
           period: "2026-07 ~ 2026-11", status: "진행" }
context:
  goal: "민원 포털 전면 개편(접근성·모바일 우선)"
  constraints: ["WCAG 2.2 AA", "기존 인증연계 유지", "고정가"]
decisions:
  - { id: "ADR-0044", summary: "디자인 토큰 정본 DesignSystem 일원화 적용" }
risks:
  - { id: "R-02", desc: "레거시 SSO 연동 불확실", severity: "H",
      mitigation: "1주차 PoC", status: "mitigated" }
learnings:
  - { what: "공공 접근성 자가진단 조기 수행이 재작업 감소",
      why: "후반 발견 시 비용 급증", action: "킥오프 주에 a11y 베이스라인",
      promote_to: "BestPractices" }
```

---

## 관련 골드위키 문서
- [번호형 35 · 프로젝트 메모리(정본 적재)](../../GoldWiki/35_PROJECT_MEMORY.md)
- [번호형 34 · 클라이언트 지식](../../GoldWiki/34_CLIENT_KNOWLEDGE.md)
- [의사결정 기록](DecisionLog.md) — 결정 연결
- [운영 원칙](OperatingPrinciples.md) — 두뇌 갱신 원칙
- [번호형 37 · 베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [번호형 38 · 템플릿 라이브러리](../../GoldWiki/38_TEMPLATE_LIBRARY.md)
- [ProjectMemory 폴더 README](../ProjectMemory/README.md)

> **거버넌스:** 본 문서의 모든 의사결정은 [의사결정 로그](DecisionLog.md), [프로젝트 메모리](../../GoldWiki/35_PROJECT_MEMORY.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Foundation/QualityStandard.md =====

# 전사 품질 기준 (Quality Standard · DoD · Gates)

> 모든 산출물에 적용되는 전사 공통 품질 기준, 완료 정의(Definition of Done), 단계별 품질 게이트를 정의한다. 단계별 세부 체크리스트는 [번호형 29](../../GoldWiki/29_QUALITY_CHECKLIST.md)와 연계된다.

## 목적

"무엇이 충분히 좋은가"를 조직 차원에서 단일 기준으로 못 박아, 산출물 품질의 변동성을 제거하고 클라이언트 제출 가능한 일관된 결과를 보장한다. 5대 품질 기준, 산출물 유형별 완료 정의(DoD), 그리고 단계 진행을 통제하는 품질 게이트를 정의한다.

## 언제 사용하는가

- 산출물을 "완료" 선언하기 직전 (DoD 충족 확인)
- 단계 게이트 통과 여부를 판정할 때
- 코드/디자인 리뷰·레드팀 검토의 기준이 필요할 때
- 신규 산출물 유형의 품질 기준을 정의할 때
- 품질 미달로 인한 재작업·반려 사유를 명확히 해야 할 때

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 산출물과 그 유형 | 작업 결과물 |
| 적용 표준(정본) | 해당 토픽 폴더 정본 |
| 단계·게이트 정의 | [RFP 프레임워크 03](../../GoldWiki/03_RFP_FRAMEWORK.md) |
| 클라이언트 수용 기준 | RFP 요구사항·계약 |
| 접근성/보안 기준 | [16](../../GoldWiki/16_ACCESSIBILITY.md), [24](../../GoldWiki/24_SECURITY_GUIDE.md) |

## 처리 방식

### 5대 품질 기준 (모든 산출물 공통)

| 기준 | 의미 | 검증 방법 |
| --- | --- | --- |
| **경영진 수준(Executive-grade)** | 구조·근거·표현이 의사결정자에게 바로 통한다 | 요약·근거·시각화 존재 |
| **클라이언트 제출 가능(Client-ready)** | 오탈자·미완성·플레이스홀더 없음 | 교정·완결성 검토 |
| **구현 가능(Implementable)** | 실제로 만들 수 있을 만큼 구체적 | 기술 검토·실현성 확인 |
| **재사용 가능(Reusable)** | 템플릿/패턴으로 다시 쓸 수 있다 | 일반화·템플릿화 가능성 |
| **근거 기반(Evidence-based)** | 추측이 아닌 표준·데이터에 기반 | 출처·정본 인용 |

### 완료 정의(DoD) — 산출물 유형별

| 유형 | 완료 정의 |
| --- | --- |
| 문서/제안서 | 8섹션 구조 충족, 정본 링크, 오탈자 0, 검토자 승인 |
| UX/디자인 | 정본 토큰 사용, 접근성 2.2 AA, 핸드오프 명세 완비 |
| 코드 | 테스트 통과, 표준 준수, 리뷰 승인, 보안 점검 통과 |
| API | OpenAPI 명세, 에러 규약 준수, 예시 요청/응답 포함 |
| ADR | 대안 비교·결과 기술, 영향 문서 갱신 |

### 품질 게이트 (단계 통제)

게이트는 다음 단계 진행 전 반드시 통과해야 하는 관문이다.

```mermaid
flowchart LR
  A[산출물 완성] --> G1{DoD 충족?}
  G1 -->|No| R[반려·재작업]
  G1 -->|Yes| G2{표준 정본 준수?}
  G2 -->|No| R
  G2 -->|Yes| G3{a11y·보안 통과?}
  G3 -->|No| R
  G3 -->|Yes| G4{검토자 승인?}
  G4 -->|No| R
  G4 -->|Yes| P[게이트 통과 · 다음 단계]
```

| 게이트 | 위치 | 통과 기준 |
| --- | --- | --- |
| G-제안 | 제출 전 | 레드팀 검토 통과, 컴플라이언스 매트릭스 100% |
| G-설계 | 구현 착수 전 | IA/플로우/토큰 정본 일치, a11y 베이스라인 |
| G-구현 | 배포 전 | 테스트 통과율 기준 충족, 보안 점검 통과 |
| G-납품 | 이관 전 | DoD 전 항목, 회고·메모리 환류 완료 |

## 출력 산출물

- 게이트 통과/반려 판정과 사유
- 미충족 항목의 재작업 지시
- 갱신된 품질 게이트 기록(ProjectMemory)

## 품질 기준

| 기준 | 충족 조건 |
| --- | --- |
| 객관성 | 판정이 체크리스트·정본 기준으로 재현 가능 |
| 추적성 | 통과/반려 사유가 기록된다 |
| 일관성 | 동일 유형은 동일 DoD로 판정된다 |
| 환류 | 반려 패턴이 [공통 오류 39](../../GoldWiki/39_COMMON_ERRORS.md)로 누적된다 |

## 체크리스트

- [ ] 5대 품질 기준을 모두 충족하는가
- [ ] 해당 유형의 DoD 전 항목을 충족하는가
- [ ] 적용 표준 정본을 인용·준수했는가
- [ ] 접근성(2.2 AA)·보안 기준을 통과했는가
- [ ] 검토자/레드팀 승인을 받았는가
- [ ] 플레이스홀더·미완성·오탈자가 0인가
- [ ] 반려 시 사유와 재작업 항목을 기록했는가

## 예시 프롬프트

```
당신은 qa-lead 에이전트다. proposal-lead가 제출한 제안서를 G-제안 게이트로
판정하라. QualityStandard의 5대 기준과 제안서 DoD, 컴플라이언스 매트릭스
100% 충족 여부를 항목별로 점검하고, 미충족 항목을 표로 반려 사유와 함께
제시하라. 반복되는 결함 유형은 39_COMMON_ERRORS.md에 환류하라.
```

---

## 관련 골드위키 문서
- [번호형 29 · 품질 체크리스트](../../GoldWiki/29_QUALITY_CHECKLIST.md)
- [번호형 30 · 테스트 전략](../../GoldWiki/30_TEST_STRATEGY.md)
- [운영 원칙](OperatingPrinciples.md) — 품질 기준 원칙
- [의사결정 기록](DecisionLog.md), [프로젝트 메모리](ProjectMemory.md)
- [번호형 16 · 접근성](../../GoldWiki/16_ACCESSIBILITY.md), [번호형 24 · 보안](../../GoldWiki/24_SECURITY_GUIDE.md), [번호형 39 · 공통 오류](../../GoldWiki/39_COMMON_ERRORS.md)

> **거버넌스:** 본 문서의 모든 의사결정은 [의사결정 로그](DecisionLog.md), [프로젝트 메모리](ProjectMemory.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Foundation/README.md =====

# Foundation — 기초 토픽

> 조직 운영의 토대가 되는 헌장·거버넌스 문서 모음. 모든 에이전트가 다른 어떤 토픽보다 먼저 숙지해야 하는 골드위키의 뿌리이다.

## 폴더 목적

Foundation은 ClubSchool AI OS의 **운영 헌법**을 담는다. 골드위키를 단일 진실 공급원(SSOT, 조직의 두뇌)으로 운영하기 위한 원칙, 의사결정 기록 방법, 프로젝트 기억 체계, 전사 품질 기준을 정의한다. 여기서 정의한 원칙은 24개 토픽 폴더 전체에 적용되는 상위 규범이다.

## 포함 문서

| 문서 | 한 줄 설명 |
| --- | --- |
| [운영 원칙](OperatingPrinciples.md) | 골드위키 우선·SSOT·중복 금지·두뇌 갱신·품질 기준의 5대 운영 원칙 |
| [의사결정 기록(ADR)](DecisionLog.md) | 의사결정을 ADR로 기록하는 방법·템플릿·예시 |
| [프로젝트 메모리](ProjectMemory.md) | 프로젝트 컨텍스트·학습을 누적하는 스키마와 운영 |
| [전사 품질 기준](QualityStandard.md) | 5대 품질 기준·완료 정의(DoD)·품질 게이트 |

## 관련 골드위키 토픽·번호 문서

- [조직 지도](../Organization/OrganizationMap.md) · [에이전트 운영 규칙](../Organization/AgentOperatingRules.md)
- [번호형 00 · 여기서 시작하세요](../00_START_HERE.md) — 전체 마스터 인덱스
- [번호형 01 · 회사 컨텍스트](../01_COMPANY_CONTEXT.md)
- [번호형 28 · 서브에이전트 규칙](../28_SUBAGENT_RULES.md)
- [번호형 29 · 품질 체크리스트](../29_QUALITY_CHECKLIST.md)
- [번호형 32 · 의사결정 로그(정본 적재)](../32_DECISION_LOG.md)
- [번호형 35 · 프로젝트 메모리(정본 적재)](../35_PROJECT_MEMORY.md)
- [번호형 37 · 베스트 프랙티스](../37_BEST_PRACTICES.md)

## 담당 에이전트

- **주관:** documentation-lead (골드위키 거버넌스·정본 관리)
- **승인:** executive-director (운영 원칙·품질 기준 최종 승인)
- **연계:** pmo-director (프로젝트 메모리), 전 본부 리드 (품질 게이트 적용)

> **거버넌스:** Foundation 문서는 모든 토픽의 상위 규범이며, 변경은 반드시 [의사결정 로그](DecisionLog.md)에 ADR로 기록한 뒤 documentation-lead가 정본에 반영한다.




===== 파일: GoldWiki/Frontend/FrontendGuide.md =====

# 프론트엔드 엔지니어링 가이드

> 이 문서는 GoldWiki(SSOT)에 속한다. 프론트엔드를 구현하기 전, 모든 에이전트는 이 문서와 [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md)·[디자인 시스템](../DesignSystem/README.md)을 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `frontend-lead` |
| **협업 에이전트** | `publishing-lead`, `backend-lead`, `ui-design-lead`, `qa-lead`, `ai-automation-lead` |
| **상위 참조** | [프론트엔드 가이드(번호형)](../20_FRONTEND_GUIDE.md), [JS 가이드(번호형)](../19_JS_GUIDE.md), [디자인 시스템](../DesignSystem/README.md) |
| **연계** | [API 표준(번호형)](../22_API_STANDARD.md), [테스트 전략(번호형)](../30_TEST_STRATEGY.md), [릴리스 프로세스(번호형)](../31_RELEASE_PROCESS.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

일관되고 유지보수 가능하며 성능·접근성을 만족하는 프론트엔드를 구현하기 위한 스택, 프로젝트 구조, 컴포넌트 아키텍처, 성능 예산, 접근성, CI 표준을 정의한다.

## 언제 사용하는가

- 신규 웹 앱/SPA/SSR 프로젝트의 기술 결정과 스캐폴딩.
- 퍼블리싱 산출물을 컴포넌트로 전환할 때.
- 성능·접근성 회귀를 방지하는 CI 게이트를 구성할 때.
- 코드 리뷰·아키텍처 검토(`cto-reviewer`)의 기준이 필요할 때.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 시맨틱 마크업·토큰 | [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md) |
| 컴포넌트 명세 | [컴포넌트 라이브러리(번호형)](../14_COMPONENT_LIBRARY.md) |
| API 계약 | [백엔드 가이드](../Backend/BackendGuide.md), [API 표준(번호형)](../22_API_STANDARD.md) |
| 비기능 요구(성능/접근성) | [접근성(번호형)](../16_ACCESSIBILITY.md), 본 문서 성능 예산 |

## 처리 방식

### 1) 권장 스택

| 영역 | 표준 | 근거 |
| --- | --- | --- |
| 프레임워크 | React + TypeScript / Next.js | 생태계·SSR/RSC·채용 용이 |
| 빌드 | Vite(SPA) / Next(풀스택) | 빠른 HMR, 최적 번들 |
| 스타일 | CSS Modules + 디자인 토큰 | [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md)와 정합, 런타임 0 |
| 서버 상태 | TanStack Query | 캐싱·재검증·중복 제거 |
| 클라이언트 상태 | Zustand / Context | 경량 |
| 폼 | React Hook Form + Zod | 검증 일원화 |
| 테스트 | Vitest + Testing Library + Playwright | [테스트 전략](../30_TEST_STRATEGY.md) 정합 |

스택 변경은 [의사결정 로그](../DecisionLog/README.md)에 ADR로 기록한다.

### 2) 프로젝트 구조 (기능 단위 colocation)

```
src/
  app/                 # 라우팅·진입점
  features/
    proposal/
      api/             # 해당 기능 API 훅
      components/
      hooks/
      types.ts
      index.ts
  shared/
    ui/                # 디자인 시스템 컴포넌트
    lib/ hooks/ utils/
  styles/tokens.css
```

기능 간 직접 import 금지(`shared`를 경유). 배럴(`index.ts`)로 공개 표면을 최소화한다.

### 3) 컴포넌트 아키텍처

- **표현/컨테이너 분리**: 데이터 패칭은 훅, UI는 순수 컴포넌트.
- **합성 우선**: 큰 prop 덩어리 대신 children/슬롯 합성.
- **타입 안전**: `any` 금지, props는 명시적 인터페이스, 외부 데이터는 Zod로 파싱.

```tsx
export function ProposalList() {
  const { data, isLoading, error } = useProposals();   // TanStack Query
  if (isLoading) return <Skeleton rows={5} />;
  if (error) return <ErrorState onRetry={refetch} />;
  return (
    <ul aria-label="제안서 목록">
      {data.map((p) => <ProposalCard key={p.id} proposal={p} />)}
    </ul>
  );
}
```

### 4) 성능 예산 (납품 게이트)

| 지표 | 예산 |
| --- | --- |
| LCP | < 2.5s (모바일 4G) |
| INP | < 200ms |
| CLS | < 0.1 |
| 초기 JS(gzip) | < 170KB |
| Lighthouse 성능 | ≥ 90 |

기법: 코드 스플리팅(`React.lazy`/동적 import), 이미지 lazy + 명시 크기, 폰트 preload + `swap`, 메모이제이션은 측정 후 적용.

### 5) 접근성

키보드 전체 조작, 포커스 관리(모달 트랩/복원), `prefers-reduced-motion` 대응, axe-core를 CI에 통합. 상세는 [접근성(번호형)](../16_ACCESSIBILITY.md).

### 6) CI 파이프라인

```yaml
# .github/workflows/frontend.yml (발췌)
jobs:
  ci:
    steps:
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm typecheck
      - run: pnpm test --coverage
      - run: pnpm build
      - run: pnpm exec playwright test
      - run: pnpm exec lhci autorun   # 성능 예산 검사
```

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| 애플리케이션 코드 | 기능 단위 구조, 타입 안전 |
| 컴포넌트 스토리/문서 | Storybook 또는 MDX |
| 테스트 스위트 | 단위·통합·E2E |
| CI 설정 | lint/type/test/build/perf 게이트 |
| 성능·접근성 리포트 | Lighthouse·axe |

## 품질 기준

- [ ] TypeScript strict, `any` 0건.
- [ ] 핵심 경로 테스트 커버리지 ≥ 80%.
- [ ] 성능 예산 전 항목 충족.
- [ ] axe critical 0건, 키보드 전체 조작.
- [ ] API 응답은 Zod로 파싱 후 사용.
- [ ] ESLint/Prettier 통과, 콘솔 에러 0건.

## 체크리스트

- [ ] 디자인 토큰만 사용(하드코딩 0).
- [ ] 로딩/에러/빈 상태 모두 구현.
- [ ] 라우트 단위 코드 스플리팅.
- [ ] 환경변수·시크릿 클라이언트 노출 0건.
- [ ] 의존성 변경 시 [의사결정 로그](../DecisionLog/README.md) 기록.

## 예시 프롬프트

```
역할: frontend-lead. GoldWiki Frontend/FrontendGuide.md, 22_API_STANDARD.md를 먼저 읽어라.
작업: '제안서 대시보드' 페이지를 React+TS로 구현. TanStack Query로 /api/proposals 연동.
제약: 기능 단위 구조, 성능 예산 충족, 로딩/에러/빈 상태 포함, axe critical 0.
출력: 컴포넌트·훅·테스트·Lighthouse 리포트. backend-lead와 API 계약 확인, qa-lead에 핸드오프.
```

---

### 관련 문서
[Frontend README](README.md) · [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md) · [백엔드 가이드](../Backend/BackendGuide.md) · [20_FRONTEND_GUIDE](../20_FRONTEND_GUIDE.md) · [30_TEST_STRATEGY](../30_TEST_STRATEGY.md)




===== 파일: GoldWiki/Frontend/README.md =====

# Frontend — 프론트엔드 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 프론트엔드 구현 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

일관되고 유지보수 가능하며 성능·접근성을 만족하는 **프론트엔드 구현 표준**을 관리한다. 스택 선택, 프로젝트 구조, 컴포넌트 아키텍처, 성능 예산, 접근성, CI 게이트를 정의해 구현 품질과 회귀 방지를 보장한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [FrontendGuide.md](FrontendGuide.md) | 프론트엔드 가이드(스택·구조·성능·접근성·CI, 8섹션) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [Publishing](../Publishing/HTMLCSSGuide.md), [Backend](../Backend/BackendGuide.md), [UI](../UI/README.md), [DesignSystem](../DesignSystem/README.md)
- 번호형: [19_JS_GUIDE](../19_JS_GUIDE.md), [20_FRONTEND_GUIDE](../20_FRONTEND_GUIDE.md), [22_API_STANDARD](../22_API_STANDARD.md), [30_TEST_STRATEGY](../30_TEST_STRATEGY.md), [31_RELEASE_PROCESS](../31_RELEASE_PROCESS.md)

## 담당 에이전트

- **주담당**: `frontend-lead`
- **협업**: `publishing-lead`, `backend-lead`, `ui-design-lead`, `qa-lead`, `cto-reviewer`

## 사용 흐름

1. [퍼블리싱 가이드](../Publishing/HTMLCSSGuide.md) 산출물과 [API 표준](../22_API_STANDARD.md) 계약을 입력으로 받는다.
2. [FrontendGuide.md](FrontendGuide.md)의 스택·구조·성능 기준으로 컴포넌트를 구현한다.
3. lint/type/test/build/perf CI 게이트를 통과하고 `qa-lead`에 핸드오프한다.
4. 의존성·아키텍처 결정을 [의사결정 로그](../DecisionLog/README.md)에 ADR로 기록한다.

## 거버넌스

성능 예산·접근성(axe critical 0)·테스트 커버리지 기준을 충족해야 납품 게이트를 통과하며, 스택·아키텍처 결정은 [의사결정 로그](../DecisionLog/README.md)에 ADR로 남긴다.




===== 파일: GoldWiki/Industry/AIService.md =====

# AI 서비스/플랫폼 (AI Service & Platform)

> ClubSchool AI OS 업종 지식 — 생성형 AI 서비스·챗봇·AI 검색·AI SaaS·LLM 기반 플랫폼 제안·구축 참조 문서. 모든 에이전트는 AI 서비스 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **확률적 산출물**: LLM은 결정적이지 않다. 동일 입력에 다른 출력, 환각(hallucination) 가능성이 본질. UX·검증·가드레일로 신뢰를 설계해야 한다.
- **비용·지연 변수**: 토큰 기반 과금, 추론 지연(latency)이 UX·원가의 핵심 변수. 스트리밍·캐싱·모델 라우팅 전략 필수.
- **규제·거버넌스**: 개인정보보호법(학습/추론 데이터), 저작권, EU AI Act 등 글로벌 동향, 국내 AI 신뢰성·윤리 가이드라인. 데이터 출처·동의·로깅 관리.
- **빠른 모델 변화**: 모델·가격·기능이 수시 변경. 추상화 레이어로 모델 교체 가능성을 확보해야 한다.
- **RAG·툴 사용**: 사내 지식 기반 검색증강생성(RAG), 함수/툴 호출, 에이전트 워크플로우가 표준 패턴.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 일반 사용자 | 자연어로 빠르고 신뢰가능한 답변 | 웹/앱 챗 |
| 업무 사용자 | 사내 지식 기반 정확한 응답, 출처 | 업무 도구 |
| 운영자 | 프롬프트·지식·가드레일 관리, 품질 모니터링 | 어드민 |
| 개발자 | API·SDK, 통합 | 개발자 포털 |
| 컴플라이언스 | 데이터·로그·안전성 점검 | 거버넌스 |
| 경영진 | 비용·사용량·품질 지표 | 대시보드 |

## 주요 Pain Point

- **환각·부정확**으로 신뢰 저하, 출처 부재.
- 응답 **지연**으로 체감 품질 저하.
- 프롬프트·지식 업데이트가 **개발 의존**, 운영 느림.
- 비용 **예측·통제** 어려움(토큰 폭증).
- 개인정보·민감정보 **유출/학습** 우려.
- 품질·안전성 **측정·모니터링** 체계 부재.

## 일반적인 RFP 요구사항

- 생성형 AI 챗봇/AI 검색/도메인 어시스턴트 구축.
- RAG(사내 문서 기반) + 출처 표기, 함수/툴 호출.
- 프롬프트·지식·가드레일 운영 어드민, 품질 모니터링.
- 모델 추상화·라우팅, 스트리밍, 캐싱, 비용 관리.
- 개인정보/민감정보 마스킹, 데이터 거버넌스, 로깅·감사.
- 안전성(유해·탈옥 방지) 가드레일, 평가(eval) 체계.
- 기존 시스템/지식 연동, API·SDK 제공.
- 성능(지연)·확장성·가용성 SLA.

## UX/UI 핵심 전략

- **신뢰 설계**: 답변에 **출처/근거** 표기, 불확실성 명시("확실하지 않음"), 환각 방지 가드레일, 사용자 피드백(좋아요/신고) 루프.
- **스트리밍 응답**으로 체감 지연 최소화, 진행 상태(생성 중·검색 중·도구 호출 중) 표시.
- **대화 맥락 관리**: 히스토리·후속 질문, 프롬프트 제안(suggested prompts), 재생성·편집.
- 입력 가이드: 무엇을 물어볼 수 있는지 예시 제공, 빈 상태(empty state) 설계.
- 오류·한계 상태(모델 실패·민감 요청 거부)를 **정중하고 회복가능하게**.
- 운영 어드민: 프롬프트 버전 관리, 지식 업로드, 가드레일 설정, 품질 대시보드를 노코드로.

## 기술 고려사항

- **모델/추론**: 모델 추상화 레이어(교체 가능), 라우팅(작업별 모델), 스트리밍, 프롬프트 캐싱, 비용/토큰 모니터링.
- **RAG**: 벡터DB·임베딩, 청킹·재랭킹, 출처 추적, 지식 최신화 파이프라인, 권한 기반 검색(ACL).
- **가드레일**: 입력/출력 필터, PII 마스킹, 유해·탈옥 방지, 도메인 제한, 휴먼인더루프.
- **평가(eval)**: 정확도·근거성(groundedness)·안전성 자동 평가, 회귀 테스트, 골든셋.
- **거버넌스/보안**: 데이터 출처·동의·보관, 로깅·감사, 개인정보보호법·저작권·AI 윤리 준수.
- **운영**: 관측성(latency·비용·실패율), 캐싱, 폴백, 레이트리밋.

## 제안서 차별화 포인트

- **신뢰 가능한 AI**(출처 표기·근거성·가드레일) 설계로 환각 리스크 정량 관리.
- 모델 추상화·라우팅·캐싱으로 **비용·지연 최적화** 전략과 절감 근거.
- RAG **지식 거버넌스**(권한·최신화·출처) 아키텍처.
- 자동 **평가(eval) 체계**로 품질을 지표화·회귀 방지.
- 노코드 운영 어드민으로 **현업 자율 운영** 전환.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 환각·부정확 | 신뢰 손상 | RAG·출처·근거성 eval·가드레일·HITL |
| 비용 폭증 | 원가 악화 | 토큰 모니터링·캐싱·모델 라우팅·레이트리밋 |
| 개인정보/민감정보 노출 | 규제·신뢰 | PII 마스킹·접근통제·학습 분리·로깅 |
| 모델 변경 종속 | 유지보수 부담 | 모델 추상화 레이어·폴백 |
| 안전성(탈옥/유해) | 사고·평판 | 입출력 필터·레드팀·정책 |
| 품질 회귀 | 사용자 이탈 | 골든셋·자동 eval·회귀 테스트 |

## 체크리스트

- [ ] 모델 추상화·라우팅·스트리밍·캐싱·비용 모니터링
- [ ] RAG 벡터DB·청킹·재랭킹·출처 추적·권한 기반 검색(ACL)
- [ ] 지식 최신화 파이프라인 및 버전 관리
- [ ] 입출력 가드레일·PII 마스킹·유해/탈옥 방지·HITL
- [ ] 자동 평가(eval): 정확도·근거성·안전성·골든셋·회귀
- [ ] 답변 출처/근거 표기·불확실성 명시 UX
- [ ] 스트리밍·진행 상태·피드백(좋아요/신고) 루프
- [ ] 데이터 출처·동의·보관 거버넌스(개인정보/저작권)
- [ ] 로깅·감사·관측성(latency·비용·실패율)
- [ ] 노코드 운영 어드민(프롬프트/지식/가드레일/대시보드)
- [ ] API·SDK·기존 시스템 연동
- [ ] 성능(지연)·확장성·가용성 SLA·폴백·레이트리밋

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- AI 가이드: [../25_AI_GUIDE.md](../25_AI_GUIDE.md) · 프롬프트: [../26_PROMPT_ENGINEERING.md](../26_PROMPT_ENGINEERING.md)
- 담당 에이전트: `industry-research-lead`, 협업 `ai-automation-lead`·`data-analytics-lead`




===== 파일: GoldWiki/Industry/Banking.md =====

# 은행/금융 (Banking)

> ClubSchool AI OS 업종 지식 — 은행·증권·카드·캐피탈 등 규제 금융업의 디지털 제안/구축을 위한 단일 참조 문서. 모든 에이전트는 금융 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **고도 규제 산업**: 전자금융감독규정(금융감독원), 전자금융거래법, 신용정보법, 개인정보보호법, 금융분야 가명정보 가이드라인이 동시 적용된다. 설계 단계부터 컴플라이언스가 기능 요구사항과 동급이다.
- **망분리 환경**: 금융권은 물리적/논리적 망분리(전자금융감독규정 제15조)가 원칙. 개발망·내부망·인터넷망이 분리되어 외부 SaaS/오픈소스 도입과 클라우드 사용에 제약이 크다(2023년 금융권 클라우드·망분리 규제 단계적 완화 진행 중).
- **레거시 코어뱅킹**: 대부분 메인프레임/차세대 코어(계정계)와 정보계가 공존. 신규 채널(앱/웹)은 EAI/API 게이트웨이를 통해 코어와 연동한다.
- **무중단 운영**: 24/365 가용성, 금융사고 시 즉시 보고 의무. 장애는 곧 평판·규제 리스크.
- **본인확인·인증 다층화**: 공동인증서, 금융인증서, 간편인증(PASS/네이버/카카오), 생체인증, OTP, ARS가 채널별로 혼재.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 개인 리테일 고객 (MZ) | 빠른 가입, 간편 송금, 직관적 자산 조회 | 모바일 앱 우선 |
| 시니어 고객 | 큰 글씨, 단순 동선, 영업점 연계 | 앱/웹/ATM/영업점 |
| 기업/SOHO 고객 | 대량이체, 전자세금계산서, 자금관리(CMS) | 기업뱅킹 웹 |
| PB/WM 고객 | 자산배분 리포트, 상담 예약, 맞춤 상품 | 앱 + RM 대면 |
| 영업점 직원(텔러/RM) | 빠른 업무처리 단말, 상담 지원 | 내부 업무계 |
| 컴플라이언스/리스크 담당 | 감사추적, 규제보고, 이상거래 탐지 | 내부 관리 시스템 |

## 주요 Pain Point

- 신규 가입·대출 신청 과정의 **이탈률**이 높다(eKYC·서류 제출·동의 단계 과다).
- **약관·동의 화면**이 길고 복잡해 사용자 피로와 컴플라이언스 리스크가 공존한다.
- 채널 간(앱/웹/영업점) **고객 경험 불일치**와 데이터 단절.
- 레거시 연동으로 **응답 지연**·장애 전파, 신규 기능 출시 속도 저하.
- 보안 요구(키보드 보안·백신·앱 위변조 탐지)로 인한 **앱 구동 지연**과 UX 마찰.
- 시니어·장애인 접근성 미흡 → 금융 디지털 소외 및 민원.

## 일반적인 RFP 요구사항

- 차세대 채널 시스템(개인/기업 뱅킹 웹·앱) 구축 또는 고도화(UI/UX 전면 개편).
- **반응형/적응형** 웹, 앱(iOS/Android) 동시 대응, 웹앱 하이브리드 가능성.
- 전자금융감독규정 준수 및 보안성 심의(정보보호 점검) 통과.
- **웹 접근성**(KWCAG 2.2, 행정·공공이 아니어도 장애인차별금지법 적용) 인증 마크 취득.
- 본인확인·간편인증 다채널 연동, OTP/생체인증, FDS(이상금융거래탐지) 연계.
- 코어/정보계 연동(EAI·API), 마이데이터(본인신용정보관리업) 연동.
- 성능 SLA(동시접속, 응답시간), 무중단 배포, DR(재해복구) 체계.
- 형상관리·산출물(감리 대응), 정보보호 산출물 일체.

## UX/UI 핵심 전략

- **신뢰감 + 효율**의 균형: 절제된 컬러(브랜드 1~2색), 명확한 정보 위계, 금액·상태의 가독성 최우선.
- 가입/대출 등 핵심 플로우는 **단계 축소 + 진행률 표시 + 중단·재개** 지원. 동의는 핵심 동의/선택 동의 분리, 요약+상세 토글.
- **마이크로카피**로 보안·수수료·금리를 투명하게 사전 고지(다크패턴 금지, 금소법 적합성 원칙).
- 시니어/접근성: 본문 16px 이상, 명도대비 4.5:1 이상, 큰 터치 타깃(48px), 보이스오버/토크백 완전 지원.
- 자산 대시보드는 **개인화 위젯** + 실시간 잔액 + 소비분석 시각화. 다크모드 대응.
- 오류·실패 상태(이체 실패, 인증 만료)에 대한 **회복 동선** 설계가 신뢰의 핵심.

## 기술 고려사항

- **보안 컴플라이언스**: 전자금융감독규정(접근통제·암호화·로그보관 5년), 키보드보안/E2E 암호화(TLS 1.2+), 앱 위변조·루팅 탐지, OWASP Top 10/MASVS 대응.
- **인증/연동**: 통합인증(SSO), 간편인증(PASS·카카오·네이버), 마이데이터 API(금융보안원 표준 API), 오픈뱅킹.
- **성능/가용성**: CDN·캐싱, 무상태 세션, 부하분산, 무중단 배포(Blue-Green), DR RTO/RPO 정의.
- **레거시 연동**: EAI/ESB, API Gateway, 메시지 큐, 거래 멱등성(idempotency) 보장.
- **프론트엔드**: 망분리 고려한 패키지 검증(보안 취약점 스캔), 디자인 시스템 토큰화, 다국어(글로벌 지점) 옵션.
- **로그/감사**: 모든 거래 감사추적, 개인정보 접근기록, 이상징후 모니터링(SIEM 연계).

## 제안서 차별화 포인트

- 금융 규제(전자금융감독규정·금소법·신용정보법)에 대한 **구체적 준수 매핑표** 제시 — 단순 "보안 강화"가 아니라 조항-기능-검증 방법 매핑.
- **이탈률 감소 정량 목표**(예: 비대면 대출 신청 완료율 +15%p)와 측정 체계(퍼널·이벤트 트래킹) 제시.
- 접근성 인증(웹/앱) **취득 보증** + 시니어 UX 별도 트랙.
- 보안성 심의/정보보호 점검 **통과 경험·산출물 샘플** 제시로 리스크 해소.
- 디자인 시스템 기반 멀티채널 일관성 + 향후 운영 효율(컴포넌트 재사용률) 근거.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 보안성 심의 미통과 | 오픈 지연·페널티 | 착수 시 보안 체크리스트 게이트, 사전 모의점검 |
| 레거시 연동 지연 | 일정 슬립 | 연동 명세 조기 확정, 스텁/목 서버 병행 개발 |
| 망분리로 인한 도구 제약 | 생산성 저하 | 반입 가능 오픈소스 사전 검증 목록 확정 |
| 접근성 인증 실패 | 재작업·민원 | 설계 단계 KWCAG 가이드 내재화, 중간 점검 |
| 규제 변경(마이데이터 등) | 범위 변동 | 변경관리 프로세스, 규제 모니터링 담당 지정 |
| 무중단 요구 vs 일정 | 배포 리스크 | Blue-Green/카나리, 롤백 시나리오 사전 검증 |

## 체크리스트

- [ ] 전자금융감독규정 적용 조항 식별 및 기능 매핑표 작성
- [ ] 금소법(금융소비자보호법) 적합성·설명의무 화면 반영
- [ ] 신용정보법/개인정보보호법 동의 설계(필수/선택 분리) 검토
- [ ] 망분리 환경 전제 개발 도구·오픈소스 반입 목록 확정
- [ ] 간편인증·OTP·생체인증·FDS 연동 명세 확보
- [ ] 마이데이터/오픈뱅킹 표준 API 연동 범위 확정
- [ ] KWCAG 2.2 접근성 가이드 적용 및 인증 취득 계획
- [ ] 성능 SLA(동시접속·응답시간) 및 부하테스트 시나리오 정의
- [ ] DR(RTO/RPO)·무중단 배포·롤백 시나리오 수립
- [ ] 감사추적·개인정보 접근기록·로그 5년 보관 설계
- [ ] 보안성 심의/정보보호 점검 대응 산출물 목록 확보
- [ ] 핵심 퍼널(가입·이체·대출) 이탈률 측정 체계 설계

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 보안: [../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md) · 접근성: [../16_ACCESSIBILITY.md](../16_ACCESSIBILITY.md)
- 담당 에이전트: `industry-research-lead`, 협업 `security-risk-lead`·`ux-research-lead`




===== 파일: GoldWiki/Industry/CRM.md =====

# CRM/고객관리 (Customer Relationship Management)

> ClubSchool AI OS 업종 지식 — CRM·CDP·마케팅 자동화(MA)·고객데이터 플랫폼 제안·구축 참조 문서. 모든 에이전트는 CRM RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **데이터가 자산**: 고객 행동·거래·동의·채널 접점 데이터를 통합·정제·활용하는 것이 핵심. 데이터 품질이 곧 성과.
- **개인정보·마케팅 동의 규제**: 개인정보보호법, 정보통신망법(광고성 정보 전송 시 사전 수신 동의·야간 발송 제한·수신거부 보장), 마이데이터·가명정보 활용 규제. 동의 기반 마케팅(consent-driven)이 필수.
- **세그먼트·여정 자동화**: 세그먼트→캠페인→채널(이메일/카카오/문자/푸시)→여정(journey) 자동화. 실시간 트리거 마케팅 확대.
- **운영자 중심 도구**: 마케터·CS·세일즈가 실제 매일 쓰는 어드민. 사용성·자동화가 운영 효율을 좌우.
- **통합/연계 허브**: 커머스·콜센터·앱·웹·광고매체와 양방향 연동.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 마케터 | 세그먼트·캠페인·여정 설계, 성과 분석 | CRM/MA 어드민 |
| CS/콜센터 | 통합 고객 뷰, 상담 이력, 빠른 응대 | CS 콘솔 |
| 세일즈 | 리드·파이프라인·고객 관리 | 세일즈 CRM |
| 데이터 분석가 | 세그먼트 추출, 성과·LTV 분석 | 분석/대시보드 |
| 운영 관리자 | 권한·동의·캠페인 승인 | 관리 콘솔 |
| 경영진 | 고객·매출·캠페인 성과 대시보드 | 대시보드 |

## 주요 Pain Point

- 고객 데이터가 시스템별로 **분산·중복**, 통합 고객 뷰(360°) 부재.
- 세그먼트·캠페인 작업이 **수작업·IT 의존**으로 느림.
- 광고성 정보 동의·수신거부 관리 미흡으로 **규제 위반 리스크**.
- 캠페인 성과 측정·기여(attribution)가 불명확.
- CS·세일즈·마케팅 간 **고객 이력 단절**.
- 실시간 행동 기반 마케팅(이탈 방지·재구매) 대응 부족.

## 일반적인 RFP 요구사항

- 통합 CRM/CDP(고객 데이터 통합·360° 뷰) 구축.
- 세그먼트·캠페인·여정(journey) 자동화, 멀티채널(이메일·카카오·SMS·푸시) 발송.
- 마케팅 동의·수신거부·발송 규제(야간 제한 등) 관리.
- 통합 고객 뷰(거래·상담·캠페인 이력) CS/세일즈 콘솔.
- 성과 분석·기여·LTV·이탈 예측, 대시보드.
- 데이터 연동(커머스·콜센터·앱/웹·광고매체), 식별자 통합(ID resolution).
- 개인정보보호·가명처리·접근통제·감사로그.
- 권한·승인 워크플로우, 어드민 사용성.

## UX/UI 핵심 전략

- **운영자 생산성 우선**: 세그먼트는 노코드 조건 빌더(드래그·필터), 캠페인/여정은 비주얼 캔버스. 미리보기·테스트 발송.
- **통합 고객 뷰(360°)**: 한 화면에 프로필·동의 상태·거래·상담·캠페인 반응 타임라인. CS가 즉시 맥락 파악.
- **동의 가시화**: 채널별 마케팅 동의/거부 상태를 명확히 표시, 발송 전 동의·시간대 규제 자동 검증.
- 캠페인 성과는 **퍼널·기여·A/B**를 직관적 시각화. 인사이트→재실행(re-target) 동선.
- 권한·승인을 어드민 워크플로우로 명확화(작성→검토→승인→발송).
- 대량 데이터 처리 UI(가상 스크롤·비동기 작업 상태) 성능 고려.

## 기술 고려사항

- **데이터 통합/CDP**: ID resolution(식별자 통합), 실시간/배치 수집, 데이터 정제·중복제거, 가명/익명 처리.
- **세그먼트/여정 엔진**: 실시간 트리거, 조건 엔진, 빈도/억제(frequency capping), 우선순위.
- **멀티채널 발송**: 이메일/카카오 알림톡·친구톡/SMS/푸시 연동, 발송 큐·재시도·발송 결과 추적.
- **규제 준수**: 광고성 정보 사전 동의·수신거부·야간(21시~익일 8시) 발송 제한 자동 검증, 동의 이력 보관.
- **분석**: 이벤트 트래킹, 기여 모델, LTV·이탈 예측(ML), 대시보드.
- **보안**: 개인정보 암호화·접근통제·감사로그, 가명정보 결합 규제 준수.

## 제안서 차별화 포인트

- **통합 고객 뷰(360°)**와 ID resolution 데이터 아키텍처 구체화.
- 노코드 세그먼트·여정 **운영 자동화**로 마케터 자율성·캠페인 속도 향상.
- 마케팅 동의·발송 규제 **자동 검증** 컴플라이언스 설계.
- 캠페인 성과·기여·LTV **측정 체계**와 인사이트 루프.
- 실시간 트리거(이탈/재구매) 마케팅 **유스케이스** 제시.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 데이터 품질·통합 실패 | 360° 무력화 | 데이터 정제·ID 매칭·품질 모니터링 |
| 광고 동의/규제 위반 | 제재·신뢰 | 동의·수신거부·야간 발송 자동 검증 |
| 발송 실패/지연 | 캠페인 손실 | 발송 큐·재시도·결과 추적 |
| 어드민 복잡·저활용 | ROI 미달 | 노코드 빌더·교육·UX 검증 |
| 개인정보 유출 | 과징금 | 암호화·접근통제·감사·가명처리 |
| 시스템 연동 지연 | 일정 슬립 | 연동 명세 조기 확정, 단계적 통합 |

## 체크리스트

- [ ] 통합 고객 뷰(360°)·ID resolution 데이터 아키텍처
- [ ] 노코드 세그먼트 빌더·비주얼 여정 캔버스
- [ ] 멀티채널(이메일/카카오/SMS/푸시) 발송·큐·재시도·결과 추적
- [ ] 광고성 정보 사전 동의·수신거부·야간 발송 제한 자동 검증
- [ ] 동의 이력 보관·감사로그
- [ ] CS/세일즈 통합 고객 뷰·상담 이력
- [ ] 캠페인 성과·기여·A/B·LTV·이탈 예측 분석
- [ ] 데이터 연동(커머스/콜센터/앱·웹/광고매체) 명세
- [ ] 개인정보 암호화·접근통제·가명처리 규제 준수
- [ ] 권한·승인 워크플로우(작성→검토→승인→발송)
- [ ] 대량 데이터 처리 성능(가상 스크롤·비동기)
- [ ] 실시간 트리거 마케팅 유스케이스 정의

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 커머스 연계: [./Commerce.md](./Commerce.md) · 멤버십: [./Membership.md](./Membership.md)
- 담당 에이전트: `industry-research-lead`, 협업 `data-analytics-lead`·`backend-lead`




===== 파일: GoldWiki/Industry/Commerce.md =====

# 이커머스/리테일 (Commerce & Retail)

> ClubSchool AI OS 업종 지식 — 종합몰·전문몰·브랜드몰·O2O 리테일의 커머스 플랫폼 제안·구축 참조 문서. 모든 에이전트는 커머스 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **전환율(CVR)이 곧 매출**: 검색→상세→장바구니→결제의 모든 마찰이 매출에 직결. 1초 지연이 전환 하락으로 이어진다.
- **트래픽 변동성 극대**: 타임딜·라이브커머스·시즌 세일 시 순간 트래픽 폭증. 탄력적 인프라가 필수.
- **옴니채널·O2O**: 온라인몰·앱·오프라인 매장·라이브커머스가 재고·회원·포인트를 공유.
- **규제**: 전자상거래법(청약철회·표시광고), 개인정보보호법, 통신판매업 신고, 결제(PG)·간편결제·전자금융거래법 일부, 식품/화장품 등 품목별 표시규제.
- **개인화·검색**: 상품 수가 많아 검색·추천·필터의 품질이 탐색 경험을 좌우.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 일반 구매자 | 빠른 검색, 신뢰 가능한 상세, 간편결제 | 앱/모바일 웹 |
| 충성 고객/멤버 | 등급 혜택, 적립, 재구매 편의 | 앱 |
| 셀러/입점사(마켓플레이스) | 상품 등록, 주문/정산 관리 | 셀러센터 |
| MD/운영자 | 상품·프로모션·전시 운영 | 어드민/CMS |
| CS 상담사 | 주문·교환·환불 처리 | CS 시스템 |
| 물류/풀필먼트 | 주문 연동, 배송 추적 | WMS/연동 |

## 주요 Pain Point

- 검색·필터 품질 낮아 **원하는 상품 탐색 실패** → 이탈.
- 상품 상세의 정보 과다/구조 부재로 **신뢰·전환 저하**.
- 장바구니→결제 단계 많고 비회원 결제 마찰로 **카트 이탈**.
- 트래픽 폭증 시 **장애·느린 응답**(타임딜·라이브).
- 옴니채널 재고/회원/포인트 **불일치**.
- 개인정보·청약철회·표시광고 등 **규제 위반 리스크**.

## 일반적인 RFP 요구사항

- 커머스 플랫폼(상품·검색·장바구니·주문·결제·배송·리뷰) 구축/리뉴얼.
- 헤드리스 커머스/디자인 시스템 기반 멀티채널(웹·앱) 대응.
- 검색·추천·개인화, 프로모션/쿠폰/적립 엔진.
- 간편결제(카카오·네이버·페이코·토스)·PG·간편가입 연동.
- 어드민(MD/운영)·셀러센터(마켓플레이스) UX.
- 전자상거래법·개인정보보호 준수, 결제 보안, 웹 접근성.
- 성능(피크 트래픽)·캐싱·CDN, 검색엔진 최적화(SEO).
- ERP/WMS/CRM/물류 연동, 데이터 분석·대시보드.

## UX/UI 핵심 전략

- **검색·필터 우선**: 자동완성, 오타 보정, 패싯 필터, 정렬, 검색결과 무한스크롤. 검색 0건 회복 동선.
- 상품 상세는 **신뢰 요소**(리뷰·평점·Q&A·배송정보·반품정책)를 구조화, 핵심 구매 버튼 고정(sticky CTA).
- 결제는 **원페이지/최소 단계**, 비회원 간편결제 + 가입 유도, 주소·결제 자동화.
- 장바구니/위시리스트 **저장·동기화**, 재구매·정기배송 편의.
- 개인화 추천(연관·재구매·맞춤)과 프로모션을 동선에 자연 배치.
- 모바일 퍼스트, 빠른 로딩(스켈레톤·이미지 최적화), 접근성 준수.

## 기술 고려사항

- **성능/확장성**: CDN, 캐싱(상품/카탈로그), 헤드리스/마이크로서비스, 오토스케일, 큐 기반 주문 처리, 타임딜 대비 부하 설계.
- **검색/추천**: 검색엔진(Elasticsearch/OpenSearch), 추천 모델, 색인 동기화.
- **결제/보안**: 간편결제·PG 연동, PCI-DSS, 결제 멱등성, 이상거래 탐지, 청약철회 로직.
- **연동**: ERP/WMS/CRM, 재고 실시간 동기화, 배송 추적(택배사 API).
- **데이터**: 이벤트 트래킹(퍼널·전환), GA4/내부 분석, A/B 테스트 인프라.
- **옴니채널**: 단일 회원·포인트·재고 정합성, 오프라인 연계(픽업/매장재고).

## 제안서 차별화 포인트

- **전환율(CVR)·카트 이탈률 개선** 정량 목표와 퍼널 측정·A/B 테스트 체계.
- 피크 트래픽(타임딜·라이브) **무중단 아키텍처**와 부하테스트 근거.
- 검색·추천·개인화 품질 향상 **데이터 전략**.
- 헤드리스/디자인 시스템 기반 **멀티채널 운영 효율**.
- 전자상거래법·결제 보안 **컴플라이언스 매핑** + 운영 어드민 생산성.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 피크 트래픽 장애 | 매출 손실·평판 | 오토스케일·캐싱·큐, 사전 부하테스트 |
| 결제/주문 정합성 오류 | 환불·분쟁 | 멱등성·트랜잭션·정합성 배치 |
| 검색/추천 품질 저하 | 전환 하락 | 색인·랭킹 튜닝, 검색 분석 |
| 재고 옴니채널 불일치 | 오배송·취소 | 단일 재고 소스·실시간 동기화 |
| 전자상거래법 위반 | 제재·민원 | 청약철회·표시광고 로직, 법무 검수 |
| 개인정보 유출 | 과징금 | 암호화·접근통제·동의 설계 |

## 체크리스트

- [ ] 검색·필터·자동완성·추천 품질 및 색인 동기화 설계
- [ ] 상품 상세 신뢰 요소(리뷰/평점/배송/반품) 구조화
- [ ] 결제 최소단계·비회원/간편결제·멱등성 설계
- [ ] 피크 트래픽(타임딜/라이브) 오토스케일·부하테스트
- [ ] 전자상거래법(청약철회·표시광고) 로직 반영
- [ ] 간편결제·PG·PCI-DSS·이상거래 탐지 연동
- [ ] ERP/WMS/CRM·재고 실시간 동기화 명세
- [ ] 옴니채널 단일 회원·포인트·재고 정합성
- [ ] 이벤트 트래킹·퍼널·A/B 테스트 인프라
- [ ] KWCAG 2.2 접근성·모바일 퍼스트 성능
- [ ] 어드민(MD)·셀러센터 권한·운영 워크플로우
- [ ] 개인정보 동의·암호화·접근통제 설계

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- CRM 연계: [./CRM.md](./CRM.md) · 멤버십: [./Membership.md](./Membership.md)
- 담당 에이전트: `industry-research-lead`, 협업 `data-analytics-lead`·`frontend-lead`




===== 파일: GoldWiki/Industry/EnterprisePortal.md =====

# 대기업 포털/인트라넷 (Enterprise Portal & Intranet)

> ClubSchool AI OS 업종 지식 — 대기업·그룹사의 임직원 포털·인트라넷·그룹웨어·통합업무 플랫폼 제안·구축 참조 문서. 모든 에이전트는 포털 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **B2E(임직원 대상)**: 외부 고객이 아닌 내부 사용자가 매일 사용하는 업무 도구. 생산성·효율이 ROI의 핵심.
- **시스템 허브**: 그룹웨어(메일·결재·게시판)·HR·근태·경비·지식관리(KMS)·다수 사내 시스템의 단일 진입점(SSO).
- **거버넌스·보안**: 사내 보안정책, 망분리/내부망, DLP(정보유출방지), 권한·조직 기반 접근통제, 감사로그. 그룹사는 계열사별 정책 차이가 존재.
- **조직·인사 연동**: 조직개편·인사발령이 잦아 조직도·권한이 동적. HR 시스템(SAP SuccessFactors 등)과 실시간 연동.
- **레거시·다양성**: 오래된 사내 시스템 다수, 브라우저·OS 환경 다양(레거시 IE 잔존 가능성).

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 일반 임직원 | 빠른 업무 진입, 공지·일정·결재 | PC/모바일 |
| 관리자/리더 | 결재·승인, 조직 현황, 리포트 | PC/모바일 |
| HR/총무 | 공지·정책 게시, 인사 연동 | 어드민 |
| IT 운영자 | 권한·계정·SSO 관리, 모니터링 | 관리 콘솔 |
| 현장/생산직 | 모바일 간편 조회, 근태 | 모바일 앱 |
| 임원/경영진 | 경영 대시보드, 핵심 지표 | PC/태블릿 |

## 주요 Pain Point

- 시스템이 분산되어 **여러 번 로그인·이동**, 정보 찾기 어려움.
- 포털 첫 화면이 정보 과다·비개인화로 **실제 업무 진입 비효율**.
- 조직개편 시 **조직도/권한 반영 지연**, 수작업.
- 모바일 대응 미흡, 레거시 브라우저 의존.
- 검색이 약해 **사내 지식·문서 탐색 실패**.
- 계열사별 정책·디자인 분절로 **그룹 일관성 부재**.

## 일반적인 RFP 요구사항

- 통합 임직원 포털/인트라넷(공지·결재·일정·게시판·지식·시스템 바로가기) 구축/개편.
- SSO·조직/인사(HR) 연동, 권한 기반 접근통제(RBAC).
- 개인화 대시보드(역할·부서별 위젯), 통합검색(사내 문서·시스템).
- 반응형·모바일(앱 또는 PWA), 그룹 디자인 시스템.
- 그룹웨어·HR·근태·경비 등 다수 시스템 연동.
- 보안(DLP·감사로그·접근통제), 망분리 환경.
- CMS 기반 콘텐츠 운영, 권한·승인 워크플로우.
- 성능(전사 동시 접속), 가용성, 무중단 운영.

## UX/UI 핵심 전략

- **개인화 대시보드**: 역할·부서·자주 쓰는 기능 기반 위젯 구성, 임직원이 직접 커스터마이즈. "오늘 할 일"(결재·일정·공지)을 첫 화면에.
- **단일 진입(SSO)** + 시스템 바로가기 통합으로 이동 최소화.
- **강력한 통합검색**: 문서·게시글·구성원·시스템을 한 번에. 자동완성·필터·권한 반영 결과.
- 조직도·구성원 검색을 직관적으로(연락처·소속·상태). 모바일 우선 핵심 기능(결재·근태·공지).
- 그룹 **디자인 시스템**으로 계열사·서비스 일관성, 다크모드·접근성.
- 정보 위계 명확화: 공지/업무/소통/지식을 명료히 구분, 과밀 지양.

## 기술 고려사항

- **SSO/인증**: SAML/OIDC 기반 통합인증, 사내 IdP, MFA, 세션 관리.
- **조직/권한**: HR 연동 실시간 조직/인사, RBAC, 조직개편 자동 반영(배치/실시간).
- **연동**: 그룹웨어·HR(SuccessFactors 등)·근태·경비·KMS API, ESB/API Gateway.
- **검색**: 엔터프라이즈 검색엔진, 권한 기반 색인(ACL), 문서 커넥터.
- **보안**: DLP, 감사로그, 접근통제, 망분리, 개인정보(임직원) 보호, 다운로드 통제.
- **성능/호환**: 전사 동시접속 대비 캐싱·스케일, 브라우저 호환(레거시 대응 전략).

## 제안서 차별화 포인트

- **업무 진입 시간·클릭 수 감소** 등 생산성 정량 목표.
- 역할 기반 **개인화 대시보드** 설계와 위젯 프레임워크.
- 조직개편 자동 반영 등 **운영 부담 감소** 아키텍처.
- 권한 반영 **통합검색** 품질 전략.
- 그룹 디자인 시스템 기반 **계열사 확장성·일관성**.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 다수 시스템 연동 복잡 | 일정 지연 | 연동 우선순위·단계적 통합, 목 서버 |
| 조직/권한 정합성 오류 | 보안 사고 | HR 실시간 연동·ACL 검증·감사 |
| 레거시 브라우저 의존 | 호환 문제 | 호환 전략·점진 폐기 로드맵 |
| 검색 권한 누출 | 정보 유출 | 권한 기반 색인·ACL 테스트 |
| 사용자 저활용 | ROI 미달 | 개인화·교육·점진 도입·피드백 |
| 계열사 정책 차이 | 표준화 난항 | 공통/개별 정책 분리 거버넌스 |

## 체크리스트

- [ ] SSO(SAML/OIDC)·MFA·세션 관리 설계
- [ ] HR 연동 실시간 조직/인사·RBAC·조직개편 자동 반영
- [ ] 역할·부서별 개인화 대시보드·위젯 프레임워크
- [ ] 권한 기반(ACL) 통합검색·문서 커넥터
- [ ] 그룹웨어·HR·근태·경비·KMS 연동 명세
- [ ] DLP·감사로그·접근통제·망분리 보안 설계
- [ ] 임직원 개인정보 보호·다운로드 통제
- [ ] 반응형·모바일(앱/PWA) 핵심 기능 정의
- [ ] 그룹 디자인 시스템·다크모드·접근성
- [ ] 전사 동시접속 캐싱·스케일·브라우저 호환 전략
- [ ] CMS 권한·승인 워크플로우
- [ ] 업무 진입 시간·검색 성공률 등 KPI 측정

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 보안: [../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md) · IA: [../11_INFORMATION_ARCHITECTURE.md](../11_INFORMATION_ARCHITECTURE.md)
- 담당 에이전트: `industry-research-lead`, 협업 `information-architecture-lead`·`backend-lead`




===== 파일: GoldWiki/Industry/Hotel.md =====

# 호텔/호스피탤리티 (Hotel & Hospitality)

> ClubSchool AI OS 업종 지식 — 호텔·리조트·풀빌라·레저 시설의 예약/마이페이지/멤버십 디지털 제안·구축 참조 문서. 모든 에이전트는 호스피탤리티 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **경험 중심 산업**: 브랜드 이미지·감성·비주얼이 전환의 핵심. 고품질 이미지/영상과 빠른 로딩의 균형이 필수.
- **다이렉트 부킹 전쟁**: OTA(아고다·부킹닷컴·네이버예약) 의존도가 높아 수수료 부담이 크다. 자사 채널 직접 예약(Direct Booking) 비중 확대가 비즈니스 목표.
- **시즌·실시간 재고**: 객실 요금/재고가 날짜·요일·시즌·이벤트별로 실시간 변동(Rate/Inventory). PMS·채널매니저 연동이 핵심.
- **멀티 프로퍼티/브랜드**: 체인은 다수 지점·브랜드·언어를 단일 플랫폼에서 운영.
- **글로벌 고객**: 다국어(한/영/중/일)·다통화·해외 결제수단 대응.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 국내 레저 고객 | 빠른 날짜·객실 검색, 프로모션, 패키지 | 모바일 웹/앱 |
| 비즈니스 투숙객 | 빠른 예약, 영수증, 멤버십 적립 | 웹/앱 |
| 해외 관광객 | 다국어·다통화, 글로벌 결제 | 다국어 웹 |
| 멤버십/VIP 회원 | 등급 혜택, 포인트, 우선 예약 | 멤버 전용 |
| 호텔 운영자(프런트/세일즈) | 예약 관리, 요금 운영, 고객 정보 | 백오피스/PMS |
| 마케터 | 프로모션·패키지 구성, 캠페인 | CMS/마케팅툴 |

## 주요 Pain Point

- 예약 엔진이 느리거나 단계가 많아 **검색→결제 이탈**.
- OTA 대비 자사 사이트의 **가격/혜택 비교 우위**가 불명확.
- 객실 요금·재고가 **실시간 동기화 안 됨**(오버부킹·요금 불일치).
- 다국어/다통화·해외 결제 미흡으로 글로벌 고객 이탈.
- 모바일 비주얼 무거워 로딩 지연, 갤러리·룸 정보 탐색 불편.
- 멤버십 혜택이 예약 동선에 자연스럽게 녹아들지 않음.

## 일반적인 RFP 요구사항

- 통합 예약 플랫폼(검색→객실/패키지 선택→부가서비스→결제→확정) 구축/개편.
- 멀티 프로퍼티/브랜드·다국어·다통화 지원.
- PMS·채널매니저·결제(PG)·예약엔진(Booking Engine) 연동.
- 멤버십/로열티(등급·포인트·혜택) 시스템.
- CMS 기반 프로모션/패키지/이벤트 운영, 마케팅 자동화.
- 반응형 웹·앱, 고성능 미디어(이미지·영상) 최적화.
- 개인정보보호·결제 보안(PCI-DSS 준수 PG 연동), 웹 접근성.
- SEO·OTA 메타서치(구글 호텔 등) 연동.

## UX/UI 핵심 전략

- **비주얼 우선 + 빠른 전환**: 풀스크린 비주얼, 그러나 예약 위젯은 항상 접근 가능(고정/플로팅).
- 검색은 **날짜·인원·프로모션 코드**를 최소 클릭으로. 결과는 객실 유형·잔여·요금을 카드로 비교.
- **다이렉트 부킹 인센티브**(회원가·무료 혜택·최저가 보장) 강조 메시지.
- 결제는 게스트 체크아웃 + 회원가입 유도, 부가서비스(조식·스파·픽업) 업셀을 자연스럽게.
- 다국어·다통화 자동 감지 + 수동 전환, 글로벌 결제수단(해외카드·알리/위챗페이) 노출.
- 미디어 최적화: 차세대 이미지 포맷(WebP/AVIF), lazy-load, CDN으로 LCP 개선.

## 기술 고려사항

- **예약 엔진/재고**: 실시간 요금·재고(Rate/Inventory) 동기화, 채널매니저·PMS 연동, 오버부킹 방지.
- **결제/보안**: PCI-DSS 준수 PG, 다통화 정산, 환불/취소 정책 로직, 사기 방지.
- **성능**: CDN, 이미지 최적화, Core Web Vitals(LCP/CLS/INP) 목표 설정.
- **다국어/i18n**: 콘텐츠 번역 워크플로우, 통화·날짜·세금 표기 현지화, hreflang SEO.
- **개인화/멤버십**: 회원 등급별 요금·혜택, 포인트 적립/사용, CRM 연계.
- **연동**: Google Hotel Ads/메타서치, 마케팅 자동화(이메일/카카오), 리뷰 플랫폼.

## 제안서 차별화 포인트

- **다이렉트 부킹 전환율 향상** 전략(회원가·업셀·이탈 복구)과 정량 목표 제시.
- 예약 퍼널 **이탈 지점 분석**과 단계 축소·속도 개선 설계.
- 멀티 프로퍼티/다국어/다통화를 **단일 운영 플랫폼**으로 묶는 아키텍처.
- 비주얼 품질과 Core Web Vitals를 **동시 충족**하는 미디어 파이프라인.
- 멤버십을 예약 동선에 자연 통합하는 **로열티 UX 청사진**.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| PMS/채널매니저 연동 지연 | 오픈 지연 | 연동 명세 조기 확정, 목 서버 |
| 실시간 재고 불일치 | 오버부킹·민원 | 동기화 주기·락 설계, 정합성 모니터링 |
| 미디어 무게로 성능 저하 | 이탈·SEO 하락 | CDN·차세대 포맷·lazy-load, CWV 게이트 |
| 다국어 콘텐츠 운영 부담 | 품질 저하 | 번역 워크플로우·CMS 다국어 구조화 |
| 결제 보안/환불 분쟁 | 신뢰 손상 | PCI 준수 PG, 명확한 취소정책 로직 |
| 성수기 트래픽 폭증 | 장애 | 오토스케일·캐싱·부하테스트 |

## 체크리스트

- [ ] 예약 엔진·PMS·채널매니저 실시간 동기화 명세 확보
- [ ] 멀티 프로퍼티/브랜드·다국어·다통화 구조 정의
- [ ] PCI-DSS 준수 PG·다통화 정산·환불정책 로직 설계
- [ ] Core Web Vitals(LCP/CLS/INP) 목표 및 미디어 최적화 파이프라인
- [ ] 다이렉트 부킹 인센티브(회원가·업셀) 전략·UX 반영
- [ ] 멤버십/로열티(등급·포인트·혜택) 예약 동선 통합
- [ ] hreflang·구조화 데이터 등 SEO·메타서치 연동
- [ ] 개인정보보호·결제정보 처리 동의 및 보안 설계
- [ ] KWCAG 2.2 접근성 및 글로벌 결제수단 대응
- [ ] 예약 퍼널 이탈 측정·분석 체계
- [ ] 성수기 트래픽 대비 오토스케일·부하테스트
- [ ] CMS 기반 프로모션/패키지 운영 권한·워크플로우

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 멤버십 연계: [./Membership.md](./Membership.md) · 접근성: [../16_ACCESSIBILITY.md](../16_ACCESSIBILITY.md)
- 담당 에이전트: `industry-research-lead`, 협업 `ui-design-lead`·`frontend-lead`




===== 파일: GoldWiki/Industry/Insurance.md =====

# 보험 (Insurance)

> ClubSchool AI OS 업종 지식 — 생명·손해·소액단기(미니보험) 보험사의 디지털 가입/청구/마이페이지 제안·구축 참조 문서. 모든 에이전트는 보험 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **상품 복잡성**: 약관·특약·담보 구조가 다층적이며, 동일 상품도 연령·직업·건강고지에 따라 보험료가 달라진다. 정보 구조화가 곧 전환율이다.
- **규제 환경**: 보험업법, 금융소비자보호법(설명의무·적합성/적정성 원칙·청약철회), 신용정보법, 개인정보보호법(민감정보=건강정보 별도 동의). 전자서명·전자청약 법적 요건 준수 필요.
- **비대면 전환 가속**: CM(사이버마케팅) 채널 성장, 다이렉트 보험 비중 확대. 단, 설계사(FC)·GA(법인대리점) 채널과의 병존이 핵심.
- **언더라이팅·청구 자동화**: AI 기반 인수심사, 사진/영수증 OCR 자동청구, 실손 간편청구(보험금 청구 전산화 법제화 2024~) 확대.
- **마이데이터·헬스케어 결합**: 건강정보 기반 개인화 보험, 건강증진형 상품(웨어러블 연계).

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 개인 가입 희망자 | 쉬운 상품 비교, 빠른 보험료 계산, 간편 청약 | 다이렉트 웹/앱 |
| 기존 계약자 | 보험금 청구, 계약 조회/변경, 보험료 납입 | 마이페이지 앱/웹 |
| 설계사(FC)·GA | 상품 설계 지원, 청약 처리, 고객관리 | 영업지원 시스템 |
| 보상/심사 담당 | 청구 심사, 사기 탐지, 지급 결정 | 내부 보상시스템 |
| 고객센터 상담사 | 통합 고객 뷰, 빠른 조회·응대 | 상담 시스템 |
| 컴플라이언스 | 불완전판매 점검, 녹취·동의 관리 | 관리 시스템 |

## 주요 Pain Point

- **보험료 계산기**까지 도달 전 이탈, 견적 후 청약 단계 포기율 과다.
- 약관·고지의무·동의 화면이 길어 **불완전판매 리스크**와 사용자 피로 동시 발생.
- 보험금 **청구 과정 복잡**(서류 종류 불명확, 반려 사유 불친절)으로 고객 불만 최다.
- 채널 단절: CM 가입 고객이 마이페이지에서 동일 경험을 받지 못함.
- 설계사/다이렉트 채널 간 **상품·데이터 정합성** 문제.
- 시니어·유병자 대상 가입 동선의 접근성 미흡.

## 일반적인 RFP 요구사항

- 다이렉트 보험 가입 플랫폼(상품 비교→견적→청약→전자서명) 구축/개편.
- 마이페이지·보험금 청구(간편청구, 사진/OCR 업로드) 시스템.
- 설계사 영업지원·청약 단말(태블릿) UX.
- 금소법 설명의무·적합성·청약철회·녹취 동의 화면 반영.
- 건강고지·민감정보 동의 설계, 전자청약/전자서명 법적 요건.
- 보험료 계산 엔진/상품 마스터 연동, 언더라이팅 룰 연계.
- 웹 접근성(KWCAG 2.2) 및 보안성 점검 대응.
- 마이데이터·실손 간편청구(전산화) 연동.

## UX/UI 핵심 전략

- **복잡함을 단순화**: 상품 비교는 핵심 담보 3~5개로 요약 후 상세 확장. 보험료는 입력 즉시 실시간 갱신.
- 청약 플로우는 **저장·재개**, 진행률, 단계별 필수 정보 최소화. 건강고지는 점진적 질의(progressive disclosure).
- 보험금 청구는 **"무엇을 찍어 올리면 되는지"**를 사례 이미지로 안내, 반려 사유는 구체적·해결가능하게.
- 금소법 설명의무 화면은 요약-상세 토글 + 핵심 위험 강조(가독성), 청약철회 안내 명확화.
- 마이페이지: 보유 계약 카드형 정리, 만기/갱신 알림, 청구 진행 상태 추적(타임라인).
- 시니어 대응: 큰 글씨/대비, 용어 풀이 툴팁, 상담 연결 버튼 상시 노출.

## 기술 고려사항

- **민감정보 처리**: 건강정보(민감정보) 별도 동의·암호화·접근통제(개인정보보호법 제23조), 보관·파기 정책.
- **전자청약/서명**: 전자서명법·보험업감독규정 준수, 본인확인, 청약서·약관 교부 증빙(타임스탬프).
- **OCR/AI**: 영수증·진단서 OCR, 자동 분류, 사기 탐지 모델 연계(설명가능성 요건).
- **연동**: 보험료 계산 엔진, 상품 마스터, 언더라이팅 룰엔진, 코어(계약관리), 실손 간편청구 중계기관.
- **녹취·동의 관리**: 불완전판매 방지 녹취, 동의 이력 감사추적.
- **성능/보안**: 동시 견적 트래픽 대응, OWASP/MASVS, 망분리 환경 가능성.

## 제안서 차별화 포인트

- 금소법 설명의무·불완전판매 방지를 **화면·로직·로그로 증명**하는 컴플라이언스 설계 제시.
- 청약 완료율·청구 1회 완결률(반려율 감소) 등 **정량 KPI**와 측정 체계.
- 보험금 청구 UX를 "찍어서 끝내는 경험"으로 재설계한 **구체 와이어프레임/사례**.
- 다이렉트·설계사·마이페이지 **옴니채널 일관성** 디자인 시스템.
- 건강정보 동의·OCR·사기탐지 등 **AI/민감정보 거버넌스** 청사진.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 불완전판매 컴플라이언스 누락 | 제재·민원 | 금소법 요건 화면 매핑, 법무 검수 게이트 |
| 민감정보(건강) 처리 위반 | 과징금·신뢰 | 별도 동의·암호화·접근통제 설계 명문화 |
| 보험료 엔진/룰 연동 지연 | 일정 지연 | 명세 조기 확정, 목 엔진 병행 |
| 청구 반려율 개선 미달 | 만족도 저하 | 사례기반 안내·실시간 검증, 파일럿 측정 |
| 전자서명 법적 요건 미충족 | 계약 효력 | 전자서명법 검토, 증빙 타임스탬프 |
| 채널 데이터 정합성 | 운영 혼선 | 단일 상품 마스터·정합성 검증 배치 |

## 체크리스트

- [ ] 금소법 설명의무·적합성/적정성·청약철회 화면 반영
- [ ] 건강정보 등 민감정보 별도 동의·암호화·접근통제 설계
- [ ] 전자청약/전자서명 법적 요건 및 약관 교부 증빙 확보
- [ ] 보험료 계산 엔진·상품 마스터·언더라이팅 룰 연동 명세
- [ ] 보험금 청구 OCR·자동분류·반려사유 안내 설계
- [ ] 실손 간편청구(전산화) 중계기관 연동 검토
- [ ] 마이데이터·헬스케어(웨어러블) 연동 범위 확정
- [ ] 녹취·동의 이력 감사추적 및 불완전판매 점검 로직
- [ ] KWCAG 2.2 접근성·시니어 UX 적용
- [ ] 청약 완료율·청구 1회 완결률 KPI 측정 체계
- [ ] 옴니채널(다이렉트/설계사/마이페이지) 일관성 검증
- [ ] 보안성 점검·OWASP/MASVS 대응 산출물

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 보안: [../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md) · 접근성: [../16_ACCESSIBILITY.md](../16_ACCESSIBILITY.md)
- 담당 에이전트: `industry-research-lead`, 협업 `security-risk-lead`·`service-planning-lead`




===== 파일: GoldWiki/Industry/Membership.md =====

# 멤버십/구독 (Membership & Subscription)

> ClubSchool AI OS 업종 지식 — 로열티 멤버십·유료 구독(SaaS·콘텐츠·정기배송)·등급 혜택 플랫폼 제안·구축 참조 문서. 모든 에이전트는 멤버십/구독 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **반복 결제(Recurring) 비즈니스**: 구독은 LTV·이탈률(Churn)·MRR이 핵심 지표. 신규 획득보다 **유지(retention)**가 수익을 좌우.
- **규제**: 전자상거래법(정기결제 명확 고지·청약철회), 콘텐츠 등 구독의 자동갱신·해지 절차 투명성(다크패턴 규제 강화 추세 — 공정위 구독 해지 간소화 가이드), 정보통신망법(마케팅 동의), 개인정보보호법, 결제 보안.
- **등급·포인트·혜택 구조**: 멤버십은 등급(tier)·적립·쿠폰·전용 혜택의 룰 엔진이 핵심. 구독은 플랜·요금제·체험(trial)·업/다운그레이드.
- **결제·정산 복잡**: 정기결제(빌링키), 프로레이션(proration), 환불, 실패 결제 재시도(dunning), 세금계산서.
- **크로스 도메인**: 커머스·콘텐츠·통신·호텔 등 모든 업종의 부가 레이어로 결합.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 신규 구독자 | 쉬운 플랜 선택·체험·결제 | 웹/앱 |
| 기존 구독자 | 플랜 변경·결제 관리·간편 해지 | 마이페이지 |
| 멤버십 회원 | 등급·포인트·혜택 확인·사용 | 앱 |
| 마케터/운영자 | 등급/혜택/플랜 운영, 이탈 방지 캠페인 | 어드민 |
| 재무/정산 | 결제·환불·정산·세금 | 정산 시스템 |
| 경영진 | MRR·Churn·LTV 대시보드 | 대시보드 |

## 주요 Pain Point

- 플랜·혜택 구조가 복잡해 **선택·이해 어려움**.
- 결제 실패·갱신 누락으로 **비자발적 이탈**(involuntary churn).
- 해지 동선이 어렵거나(다크패턴) → **불만·규제 리스크**.
- 등급/포인트 혜택이 분산되어 **체감·활용 저조**.
- 이탈 징후 **사전 감지·대응** 미흡.
- 운영자가 플랜/혜택 변경에 **개발 의존**.

## 일반적인 RFP 요구사항

- 멤버십(등급·포인트·혜택)·구독(플랜·정기결제) 플랫폼 구축.
- 정기결제(빌링키)·프로레이션·환불·실패 재시도(dunning) 결제 엔진 연동.
- 체험(trial)·업/다운그레이드·일시정지·해지 플로우.
- 정기결제 고지·자동갱신·간편 해지(규제 준수) 설계.
- 마이페이지(구독 관리·결제수단·이용내역).
- 이탈 예측·방지 캠페인, CRM/MA 연동.
- MRR/Churn/LTV 대시보드, 정산·세금.
- 개인정보·결제 보안, 웹 접근성.

## UX/UI 핵심 전략

- **플랜 선택 단순화**: 핵심 플랜 2~4개 비교표(추천 강조), 혜택 차이 명확화, 체험→전환 자연스러운 동선.
- **투명한 결제 고지**: 다음 결제일·금액·갱신 조건을 명확히, 자동갱신 사전 안내. 해지는 어렵게 만들지 않음(규제·신뢰).
- **마이페이지 = 통제권**: 플랜 변경·일시정지·결제수단·이용내역을 한 곳에서. 변경 영향(요금 차이) 미리보기.
- 멤버십 혜택은 **등급 진척도(게이미피케이션)** + 상황 기반 혜택 추천으로 체감 강화.
- 결제 실패 시 **부드러운 복구**(재시도 안내·결제수단 업데이트 유도).
- 이탈 방지: 해지 시 대안 제시(일시정지·다운그레이드·혜택), 그러나 강압 금지.

## 기술 고려사항

- **결제/빌링**: 빌링키 기반 정기결제, 프로레이션 계산, dunning(실패 재시도·알림), 환불·부분환불, 세금계산서/현금영수증.
- **구독 상태머신**: trial→active→past_due→paused→canceled 등 상태 전이 정의, 멱등성·중복결제 방지.
- **멤버십 룰엔진**: 등급 산정(기간·구매액), 포인트 적립/소멸, 혜택 자격 판정.
- **규제**: 정기결제 고지·자동갱신·간편 해지 로직, 마케팅 동의, 청약철회.
- **연동**: PG(빌링)·CRM/MA·커머스·정산, 이벤트 트래킹.
- **분석**: MRR/ARR·Churn·LTV·코호트·이탈 예측(ML).

## 제안서 차별화 포인트

- **이탈률(Churn) 감소·LTV 향상** 정량 목표와 코호트·이탈 예측 체계.
- 비자발적 이탈 방지 **dunning(결제 재시도)** 설계로 매출 보존.
- 규제 준수 **투명 결제·간편 해지**를 신뢰 자산으로 전환(다크패턴 회피).
- 멤버십 룰엔진·게이미피케이션으로 **혜택 체감·재방문** 강화.
- 운영자 노코드 **플랜/혜택 운영**으로 민첩성 확보.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 결제 실패 누적 | 비자발적 이탈 | dunning·재시도·결제수단 업데이트 유도 |
| 정기결제 고지/해지 규제 위반 | 제재·신뢰 | 명확 고지·간편 해지·법무 검수 |
| 프로레이션/환불 오류 | 정산 분쟁 | 빌링 로직 검증·회귀 테스트 |
| 중복/이중 결제 | 환불·불만 | 멱등성·상태머신·트랜잭션 |
| 혜택 룰 오류 | 손실·불만 | 룰엔진 검증·시뮬레이션 |
| 이탈 예측 부정확 | 캠페인 비효율 | 코호트 검증·모델 모니터링 |

## 체크리스트

- [ ] 정기결제(빌링키)·프로레이션·환불·세금 처리 설계
- [ ] dunning(결제 실패 재시도·알림) 및 결제수단 업데이트 동선
- [ ] 구독 상태머신(trial/active/past_due/paused/canceled)·멱등성
- [ ] 체험·업/다운그레이드·일시정지·해지 플로우
- [ ] 정기결제 고지·자동갱신·간편 해지(규제 준수) 로직
- [ ] 멤버십 등급 산정·포인트 적립/소멸·혜택 자격 룰엔진
- [ ] 플랜 비교·결제 투명성·마이페이지 통제권 UX
- [ ] CRM/MA·PG·커머스·정산 연동 명세
- [ ] MRR/Churn/LTV·코호트·이탈 예측 분석
- [ ] 마케팅 동의·청약철회·개인정보 동의 설계
- [ ] 결제 보안·중복결제 방지
- [ ] 운영자 노코드 플랜/혜택 운영 어드민

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 커머스: [./Commerce.md](./Commerce.md) · CRM: [./CRM.md](./CRM.md)
- 담당 에이전트: `industry-research-lead`, 협업 `data-analytics-lead`·`service-planning-lead`




===== 파일: GoldWiki/Industry/PublicSector.md =====

# 공공 (Public Sector)

> ClubSchool AI OS 업종 지식 — 중앙부처·지자체·공공기관·공기업의 대국민 서비스/포털/업무시스템 제안·구축 참조 문서. 모든 에이전트는 공공 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **법적 의무로서의 품질**: 웹 접근성(지능정보화기본법, 장애인차별금지법)에 따라 공공 웹사이트는 **웹 접근성 의무** 대상이며, 미준수 시 시정명령·과태료 대상이 될 수 있다. 접근성은 선택이 아니라 필수.
- **표준·인증 체계**: 행정안전부 전자정부 웹표준·웹호환성 준수, 웹 접근성 품질인증(KWCAG 2.2), 정보시스템 감리(일정 규모 이상 의무), 정보보호 관리(ISMS·보안성 검토).
- **조달·계약 절차**: 나라장터(조달청 g2b) 입찰, 제안서 평가(기술+가격), 협상에 의한 계약, 산출물·검수 절차가 엄격.
- **다양한 사용자 포용**: 고령자·장애인·외국인 등 모든 국민이 사용자. 디지털 포용·취약계층 배려가 핵심 가치.
- **보안·표준 환경**: 행정망/국가정보통신망, G-Cloud(행정전자서명·GPKI), 표준프레임워크(전자정부프레임워크) 사용이 일반적.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 일반 국민 | 쉬운 민원 신청·조회, 정보 접근 | 웹/모바일 |
| 고령자·장애인 | 접근성, 단순 동선, 보조기기 지원 | 웹/모바일 |
| 외국인 | 다국어 안내 | 다국어 웹 |
| 공무원/담당자 | 신청 처리, 통계, 업무 효율 | 내부 업무시스템 |
| 기관 관리자 | 콘텐츠·서비스 운영, 통계 | CMS/어드민 |
| 감리·감사 | 산출물·표준·보안 점검 | 산출물 |

## 주요 Pain Point

- 노후화된 디자인·복잡한 IA로 **민원 찾기 어려움**, 행정용어 난해.
- 접근성 미흡으로 **취약계층 디지털 소외** 및 민원·시정 리스크.
- 기관/서비스별 분절(중복 로그인·중복 입력)로 **사용자 피로**.
- 모바일 미대응·웹표준 미준수로 **호환성 문제**.
- 본인확인·전자서명 절차 복잡, 첨부서류 과다.
- 운영자(공무원)의 **콘텐츠 관리 난이도** 높음.

## 일반적인 RFP 요구사항

- 대국민 포털/홈페이지/민원 서비스 구축·개편(반응형, 모바일 대응).
- 전자정부 **웹표준·웹호환성** 및 **웹 접근성 품질인증(KWCAG 2.2)** 취득.
- 표준프레임워크(전자정부프레임워크) 적용, 정보시스템 감리 대응.
- 행정전자서명(GPKI)·간편인증·통합로그인(공공 SSO) 연동.
- 다국어, 고령자/장애인 배려 UI, 디지털 포용.
- CMS 기반 콘텐츠 운영, 통계·민원 처리 어드민.
- 정보보호(ISMS 준거, 보안성 검토), 개인정보 영향평가(PIA) 대응.
- 산출물(SW 개발 산출물, 감리 지적사항 조치) 일체.

## UX/UI 핵심 전략

- **접근성 우선 설계(Accessibility-first)**: KWCAG 2.2 전 항목을 설계 단계부터 내재화. 명도대비 4.5:1, 키보드 전체 조작, 스크린리더 레이블, 대체텍스트, 포커스 표시.
- **쉬운 행정언어**: 전문용어→쉬운 말, 안내 중심 마이크로카피, 단계별 도움말.
- IA 단순화: 생애주기/대상별/상황별 분류로 **민원을 빠르게 찾는** 구조. 통합검색 강화.
- 신청 플로우: 단계 최소화, 진행률, 자동입력(행정정보 공동이용), 첨부 안내 명확화.
- 디바이스·고령자 대응: 큰 글씨 옵션, 단순 모드, 음성 안내 고려.
- 일관된 정부 디자인 시스템(KRDS, 디지털플랫폼정부 디자인 시스템) 참조·준수.

## 기술 고려사항

- **표준프레임워크**: 전자정부 표준프레임워크 버전 준수, 공통컴포넌트 활용.
- **인증/보안**: GPKI 행정전자서명, 간편인증, 공공 SSO, ISMS 준거, 보안 취약점 점검(시큐어코딩 행안부 가이드).
- **개인정보**: 개인정보 영향평가(PIA) 대상 여부 확인, 행정정보 공동이용 동의·로그.
- **접근성/호환성**: KWCAG 2.2 자동·수동 검사 도구, 다중 브라우저·보조기기 테스트.
- **인프라**: G-Cloud/행정망 환경, 망분리, 표준 산출물·형상관리.
- **운영**: CMS 권한·승인 워크플로우, 통계(접속·민원), 장애 대응 체계.

## 제안서 차별화 포인트

- **웹 접근성 품질인증 취득 보증** + 인증 경험·자동검사 리포트 샘플.
- 행정용어 쉬운 말 전환·디지털 포용 **취약계층 UX 트랙** 제시.
- 표준프레임워크·감리·보안성 검토 **준수 매핑표**와 산출물 체계.
- 생애주기/대상별 IA 재설계로 **민원 도달 시간 단축** 정량 목표.
- KRDS 등 정부 디자인 시스템 기반 **일관성·재사용·운영 효율**.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 웹 접근성 인증 실패 | 검수 불가·재작업 | 설계 단계 내재화, 중간 점검, 자동+수동 검사 |
| 감리 지적사항 다수 | 검수 지연 | 산출물 표준 준수, 감리 사전 점검 |
| 보안성 검토 미통과 | 오픈 지연 | 시큐어코딩 가이드 준수, 모의점검 |
| 행정 협조 지연(연동) | 일정 슬립 | 연동 기관 협의 조기 착수, 대안 동선 |
| 요구 변경(정책) | 범위 변동 | 변경관리 프로세스, 우선순위 합의 |
| 운영자 활용 저조 | 콘텐츠 노후 | 직관적 CMS·운영 교육·매뉴얼 |

## 체크리스트

- [ ] KWCAG 2.2 전 항목 설계 내재화 및 품질인증 취득 계획
- [ ] 전자정부 웹표준·웹호환성(다중 브라우저) 준수
- [ ] 전자정부 표준프레임워크 버전·공통컴포넌트 적용
- [ ] GPKI 행정전자서명·간편인증·공공 SSO 연동
- [ ] 정보보호(ISMS 준거)·시큐어코딩·보안성 검토 대응
- [ ] 개인정보 영향평가(PIA) 대상 여부 및 동의·로그 설계
- [ ] 행정정보 공동이용 연동으로 첨부서류 최소화
- [ ] 생애주기/대상별 IA·통합검색·쉬운 행정언어 적용
- [ ] 고령자·장애인·외국인 디지털 포용 UX
- [ ] KRDS 등 정부 디자인 시스템 참조·일관성
- [ ] 정보시스템 감리 산출물·형상관리 체계
- [ ] CMS 권한·승인 워크플로우 및 통계·민원 어드민

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 접근성: [../16_ACCESSIBILITY.md](../16_ACCESSIBILITY.md) · 보안: [../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md)
- 담당 에이전트: `industry-research-lead`, 협업 `information-architecture-lead`·`security-risk-lead`




===== 파일: GoldWiki/Industry/README.md =====

# Industry — 업종 지식 인덱스

> ClubSchool AI OS GoldWiki의 **업종(도메인) 지식 베이스**. 제안·기획·설계·구축 의사결정 전, 해당 업종 문서를 먼저 참조해 업종 특성·규제·Pain Point·차별화 포인트를 반영한다. 업종 지식의 단일 진실 공급원(SSOT).

## 폴더 목적

RFP/제안 대상이 속한 업종의 **현실 맥락**(한국 시장·규제·사용자·기술)을 표준화해, 모든 에이전트가 동일한 업종 인사이트 위에서 작업하도록 한다. 각 문서는 동일한 9섹션 형식(업종 특성 / 주요 사용자 / 주요 Pain Point / 일반적인 RFP 요구사항 / UX·UI 핵심 전략 / 기술 고려사항 / 제안서 차별화 포인트 / 리스크 / 체크리스트)을 따른다.

## 포함 문서 (10)

| # | 업종 | 문서 | 핵심 규제/키워드 |
|---|---|---|---|
| 1 | 은행/금융 | [Banking.md](./Banking.md) | 전자금융감독규정·금소법·망분리·FDS·마이데이터 |
| 2 | 보험 | [Insurance.md](./Insurance.md) | 금소법 설명의무·민감정보 동의·전자청약·간편청구 |
| 3 | 호텔/호스피탤리티 | [Hotel.md](./Hotel.md) | 다이렉트 부킹·PMS·다국어/다통화·PCI-DSS |
| 4 | 이커머스/리테일 | [Commerce.md](./Commerce.md) | 전자상거래법·전환율·피크 트래픽·간편결제 |
| 5 | 공공 | [PublicSector.md](./PublicSector.md) | 웹 접근성 의무(KWCAG 2.2)·표준프레임워크·감리·GPKI |
| 6 | 통신 | [Telecom.md](./Telecom.md) | 단통법·요금제 시뮬레이터·본인확인·대규모 트래픽 |
| 7 | 대기업 포털/인트라넷 | [EnterprisePortal.md](./EnterprisePortal.md) | SSO·HR 연동·RBAC·DLP·통합검색 |
| 8 | CRM/고객관리 | [CRM.md](./CRM.md) | 360° 뷰·CDP·마케팅 동의/수신거부·여정 자동화 |
| 9 | AI 서비스/플랫폼 | [AIService.md](./AIService.md) | RAG·가드레일·환각 관리·비용/지연·평가(eval) |
| 10 | 멤버십/구독 | [Membership.md](./Membership.md) | 정기결제·간편 해지·Churn/LTV·dunning |

## 사용법

1. **RFP 착수 시**: 발주처 업종을 식별하고 해당 문서를 정독한다(없으면 가장 가까운 문서 + 보완 리서치).
2. **제안/기획 단계**: "제안서 차별화 포인트"와 "주요 Pain Point"를 제안 핵심 메시지로 활용한다.
3. **설계/구축 단계**: "UX/UI 핵심 전략"·"기술 고려사항"을 설계 결정의 근거로 인용한다.
4. **품질 게이트**: 각 문서 말미 "체크리스트"를 제안·산출물 검수에 적용한다.
5. **갱신**: 신규 프로젝트에서 얻은 업종 인사이트·규제 변경은 해당 문서에 반영하고 [../DecisionLog](../DecisionLog/)에 결정을 남긴다. 지식 중복 금지.

## RFP 분석 연계

업종 문서는 RFP 분석의 입력으로 사용된다. RFP 분석 프레임워크에서 업종 식별 → 본 인덱스에서 해당 문서 로드 → 요구사항/리스크/차별화에 반영한다.

- RFP 분석 프레임워크: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 번호형 RFP 문서: [../03_RFP_FRAMEWORK.md](../03_RFP_FRAMEWORK.md) · [../04_RFP_ANALYSIS.md](../04_RFP_ANALYSIS.md)
- 제안 전략: [../05_PROPOSAL_STRATEGY.md](../05_PROPOSAL_STRATEGY.md)

## 관련 GoldWiki 토픽

- 보안/리스크: [../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md)
- 웹 접근성: [../16_ACCESSIBILITY.md](../16_ACCESSIBILITY.md)
- 정보구조(IA): [../11_INFORMATION_ARCHITECTURE.md](../11_INFORMATION_ARCHITECTURE.md)
- UX 원칙: [../07_UX_PRINCIPLES.md](../07_UX_PRINCIPLES.md)
- AI 가이드: [../25_AI_GUIDE.md](../25_AI_GUIDE.md)

## 담당 에이전트

- **주관**: `industry-research-lead`(업종 리서치) — 업종 지식 작성·갱신·검증 책임.
- **협업**: `rfp-strategy-lead`(RFP 연계), `proposal-lead`(차별화 메시지), `security-risk-lead`(규제/리스크), `ux-research-lead`·`service-planning-lead`(전략 반영).

## 거버넌스

모든 에이전트는 업종 의사결정 전 본 인덱스와 해당 업종 문서를 먼저 참조하며, 새로 검증된 업종 인사이트는 중복 없이 해당 문서에 반영하고 DecisionLog를 갱신한다.




===== 파일: GoldWiki/Industry/Telecom.md =====

# 통신 (Telecom)

> ClubSchool AI OS 업종 지식 — 이동통신사(MNO)·알뜰폰(MVNO)·인터넷/IPTV 사업자의 가입·요금제·마이페이지 디지털 제안·구축 참조 문서. 모든 에이전트는 통신 RFP 착수 전 본 문서를 먼저 참조한다.

## 업종 특성

- **고객 규모·트래픽 거대**: 수백만~수천만 가입자, 마이페이지·요금 조회 트래픽이 상시 높음. 안정성과 확장성이 절대 조건.
- **규제 환경**: 전기통신사업법, 단말기유통구조개선법(단통법) — 공시지원금·추가지원금 표시 의무, 통신비 표시 투명성. 개인정보보호법, 본인확인기관 규제(통신사=본인확인 사업자).
- **상품 복잡성**: 요금제·결합할인(인터넷+모바일+IPTV)·단말 할부·약정·부가서비스가 다층 조합. 시뮬레이션이 핵심.
- **번호이동·개통 플로우**: 본인확인·서류·개통 절차가 까다롭고 규제 민감.
- **멤버십·구독 결합**: 통신 멤버십(VIP 등급), OTT·콘텐츠 구독 번들이 차별화 포인트.

## 주요 사용자

| 사용자 그룹 | 핵심 니즈 | 채널 |
|---|---|---|
| 신규 가입/번호이동 고객 | 요금제 비교, 단말 선택, 간편 개통 | 웹/앱 |
| 기존 가입자 | 요금 조회·납부, 데이터 사용량, 요금제 변경 | 마이페이지 앱 |
| 결합상품 고객 | 결합할인 시뮬레이션, 가족 결합 관리 | 웹/앱 |
| 멤버십 고객 | 등급 혜택·쿠폰·포인트 | 멤버십 앱 |
| 대리점/콜센터 | 가입 처리, 상담 지원 | 영업/상담 시스템 |
| 운영자 | 요금제·프로모션 운영 | 어드민/CMS |

## 주요 Pain Point

- 요금제·결합·단말 조합이 복잡해 **선택 어려움**, 비교 도구 부재.
- 가입/개통 플로우의 본인확인·서류 단계 많아 **이탈**.
- 마이페이지 정보 과다·동선 복잡으로 **요금/사용량 찾기 어려움**.
- 단통법 등 규제 표시 미흡 시 **컴플라이언스 리스크**.
- 대규모 트래픽 시 **마이페이지 지연·장애**.
- 멤버십 혜택이 분산되어 **활용도 저조**.

## 일반적인 RFP 요구사항

- 다이렉트 가입·번호이동 플랫폼(요금제 비교→단말→약정→본인확인→개통) 구축/개편.
- 마이페이지(요금·사용량·납부·요금제 변경) 고도화.
- 결합상품·요금제 시뮬레이터, 단말 할부 계산.
- 멤버십/구독(OTT 번들) 통합.
- 단통법 공시지원금 표시, 본인확인·간편인증.
- 대규모 트래픽 대비 성능·가용성, 캐싱·CDN.
- 개인정보보호·보안, 웹 접근성(KWCAG 2.2).
- 빌링/CRM/개통 시스템 연동, 데이터 분석.

## UX/UI 핵심 전략

- **복잡한 상품의 단순화**: 요금제는 사용 패턴(데이터/통화) 기반 추천, 핵심 3안 비교 후 상세. 결합/할부는 실시간 시뮬레이션으로 총액 즉시 표시.
- 가입/개통 플로우는 **단계 시각화 + 저장·재개**, 본인확인 간편화(간편인증), 서류 촬영 가이드.
- 마이페이지: 이번 달 요금·데이터 잔여를 **첫 화면 핵심 위젯**으로, 요금제 변경은 영향(요금 차이) 미리보기.
- 단통법 공시지원금·약정 조건을 **투명하게** 사전 고지(다크패턴 금지).
- 멤버십 혜택을 **상시 노출 + 위치/상황 기반** 추천.
- 대규모 사용자 대비 성능 우선 UI(스켈레톤·지연 로딩), 접근성·시니어 모드.

## 기술 고려사항

- **성능/확장성**: 대규모 동시접속, 캐싱(요금/사용량 조회), CDN, 오토스케일, 빌링 시스템 부하 분리.
- **연동**: 빌링·CRM·개통(번호이동/MNP)·재고(단말)·본인확인기관 API.
- **인증/보안**: 통신사 본인확인, 간편인증, OWASP/MASVS, 개인정보 암호화·접근통제.
- **규제 표시**: 단통법 공시지원금·추가지원금·약정 표시 로직, 표시 이력 관리.
- **시뮬레이터**: 요금제·결합·할부 계산 엔진, 룰 변경 운영.
- **데이터**: 사용량·요금 데이터 실시간성, 퍼널·전환 트래킹.

## 제안서 차별화 포인트

- 요금제·결합 **시뮬레이터 UX**로 선택 어려움을 해소하는 구체 설계.
- 가입/개통 **이탈률 감소** 정량 목표(본인확인 간편화·단계 축소).
- 대규모 트래픽 **무중단·고성능 아키텍처**와 부하테스트 근거.
- 단통법 등 규제 표시 **컴플라이언스 매핑**.
- 멤버십·구독(OTT 번들) **통합 경험** 청사진.

## 리스크

| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 빌링/개통 연동 지연 | 오픈 지연 | 명세 조기 확정, 목 서버 |
| 대규모 트래픽 장애 | 평판·이탈 | 캐싱·오토스케일·부하테스트 |
| 단통법 표시 위반 | 제재 | 공시지원금 로직·표시 이력, 법무 검수 |
| 본인확인 절차 복잡 | 이탈 | 간편인증·촬영 가이드, 단계 축소 |
| 시뮬레이터 계산 오류 | 분쟁 | 룰엔진 검증·회귀 테스트 |
| 개인정보 유출 | 과징금 | 암호화·접근통제·동의 |

## 체크리스트

- [ ] 요금제·결합·할부 시뮬레이터 로직 및 운영 룰 정의
- [ ] 가입/개통(번호이동) 플로우 단계 최소화·본인확인 간편화
- [ ] 단통법 공시지원금·약정 표시 로직 및 이력 관리
- [ ] 마이페이지 핵심 위젯(요금/사용량) 우선 노출
- [ ] 빌링·CRM·개통·단말재고·본인확인기관 연동 명세
- [ ] 대규모 동시접속 캐싱·CDN·오토스케일·부하테스트
- [ ] 멤버십·구독(OTT) 통합 경험 설계
- [ ] KWCAG 2.2 접근성·시니어 모드
- [ ] 개인정보 암호화·접근통제·동의 설계
- [ ] OWASP/MASVS 보안 점검
- [ ] 퍼널·전환·요금제 변경 측정 체계
- [ ] 어드민(요금제/프로모션) 운영 워크플로우

---

### 관련 문서

- 업종 인덱스: [Industry/README.md](./README.md)
- RFP 분석 연계: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 멤버십 연계: [./Membership.md](./Membership.md) · 보안: [../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md)
- 담당 에이전트: `industry-research-lead`, 협업 `service-planning-lead`·`backend-lead`




===== 파일: GoldWiki/Organization/AgentOperatingRules.md =====

# 에이전트 공통 운영 규칙 (Agent Operating Rules)

> 24개 활성 에이전트가 공유하는 운영·협업·인계·에스컬레이션 규칙과 금지사항. 모든 에이전트는 이 규칙을 준수하며, 우선 원칙은 항상 "골드위키를 먼저 참조한다"이다.

## 목적

멀티에이전트 운영에서 일관성·추적성·안전을 보장하기 위한 공통 행동 규약을 정의한다. 작업 착수 절차, 에이전트 간 협업·인계 방식, 에스컬레이션 트리거와 경로, 그리고 절대 금지사항을 명문화하여, 24개 에이전트가 충돌·중복·누락 없이 협업하도록 한다.

## 언제 사용하는가

- 모든 에이전트가 작업을 착수할 때(공통 절차)
- 에이전트 간 산출물을 인계(handoff)할 때
- 책임 경계·우선순위 충돌이 발생할 때
- 결정을 상위로 에스컬레이션해야 할지 판단할 때
- 금지된 행동인지 확인이 필요할 때

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 자신의 에이전트 정의 | `../../.claude/agents/<name>.md` |
| 조직 구조·보고선 | [조직 지도](OrganizationMap.md) |
| 적용 표준 정본 | 해당 토픽 폴더 |
| 품질 기준·DoD | [전사 품질 기준](../Foundation/QualityStandard.md) |
| 협업·RACI | `../../Agents/COLLABORATION_MAP.md`, `../../Agents/RACI.md` |

## 처리 방식

### 1. 공통 작업 절차 (모든 에이전트)
1. **골드위키 우선** — 착수 전 관련 정본([00_START_HERE](../../GoldWiki/00_START_HERE.md) → 토픽 README → 핵심 문서)을 읽는다.
2. **단계 식별** — RFP→납품 파이프라인([03](../../GoldWiki/03_RFP_FRAMEWORK.md))에서 자신의 단계·산출물을 확인한다.
3. **표준 준수 실행** — 정본 표준과 템플릿([38](../../GoldWiki/38_TEMPLATE_LIBRARY.md))으로 산출물을 만든다.
4. **품질 게이트** — [품질 기준](../Foundation/QualityStandard.md)의 DoD·게이트를 통과시킨다.
5. **두뇌 갱신** — 결정·학습을 DecisionLog·ProjectMemory·BestPractices·ReferenceLibrary에 환류한다.
6. **인계** — 다음 에이전트에 표준 형식으로 인계한다.

### 2. 협업·인계 규칙

| 항목 | 규칙 |
| --- | --- |
| 인계 패키지 | 산출물 + 컨텍스트 요약 + 미해결 이슈 + 참조 정본 링크 |
| 책임 단일성 | 한 산출물의 책임(R)은 한 에이전트. RACI를 따른다 |
| 충돌 해소 | 표준 충돌은 골드위키 정본 우선. 미정이면 상위 리드가 중재 |
| 병렬 작업 | 동일 정본을 동시 수정 금지. documentation-lead가 직렬화 |
| 검토 의무 | 본부 경계를 넘는 산출물은 관련 리드 교차 검토 |

인계 흐름 예:
```mermaid
sequenceDiagram
  rfp-strategy-lead->>proposal-lead: RFP 분석표 + 윈 테마 후보
  proposal-lead->>qa-lead: 제안서 초안 (G-제안 검토 요청)
  qa-lead-->>proposal-lead: 반려/통과 + 사유
  proposal-lead->>documentation-lead: 결정·학습 환류 요청
```

### 3. 에스컬레이션 기준

| 트리거 | 에스컬레이션 대상 |
| --- | --- |
| 범위·예산·일정 변동 | pmo-director → coo-operator |
| 기술 실현성·아키텍처 리스크 | cto-reviewer |
| 보안·규제·접근성 미준수 위험 | security-risk-lead → cto-reviewer |
| 표준 간 충돌 미해소 | documentation-lead → 해당 본부 리드 |
| 전략·최종 승인 필요 | executive-director |
| 클라이언트 평가 리스크 | client-simulation-lead → executive-director |

### 4. 금지사항 (전 에이전트 공통)
- ❌ 골드위키를 읽지 않고 추측으로 결정·산출물 생성
- ❌ 같은 정보를 두 문서에 본문으로 중복 기재(링크 대신 복사)
- ❌ 정본을 임의로 무단 변경(DecisionLog 기록 없이)
- ❌ 동일 정본 동시 편집으로 충돌 유발
- ❌ 플레이스홀더·"추후 작성"·일반적 AI 문구로 산출물 제출
- ❌ 결정·학습을 두뇌 4종에 환류하지 않고 작업 종료
- ❌ 자신의 책임 범위(RACI의 R) 밖 산출물을 무단 변경
- ❌ 품질 게이트를 우회하여 다음 단계 진행

## 출력 산출물

- 표준을 준수한 산출물과 인계 패키지
- 에스컬레이션 기록(필요 시)
- 갱신된 두뇌 4종 문서

## 품질 기준

| 기준 | 충족 조건 |
| --- | --- |
| 절차 준수 | 6단계 공통 절차를 따랐다 |
| 인계 완전성 | 인계 패키지 4요소를 포함한다 |
| 추적성 | 결정·인계가 기록으로 남는다 |
| 경계 준수 | RACI 책임 경계를 지켰다 |
| 무중복 | 정본 중복·동시편집 충돌이 없다 |

## 체크리스트

- [ ] 착수 전 관련 골드위키 정본을 읽었는가
- [ ] 자신의 RFP 단계·책임(R)을 확인했는가
- [ ] 산출물이 DoD·게이트를 통과했는가
- [ ] 인계 패키지 4요소를 갖췄는가
- [ ] 에스컬레이션 트리거에 해당하면 올바른 대상에 올렸는가
- [ ] 금지사항을 위반하지 않았는가
- [ ] 두뇌 4종을 갱신했는가

## 예시 프롬프트

```
당신은 frontend-lead 에이전트다. AgentOperatingRules를 준수하라.
ui-design-lead로부터 화면 디자인을 인계받아 프로토타입을 구현하기 전:
1) ../../GoldWiki/ 의 프론트엔드·접근성 정본을 먼저 읽어라.
2) 인계 패키지의 미해결 이슈를 확인하고, 누락 시 ui-design-lead에 회신 요청하라.
3) 구현 중 아키텍처 리스크가 보이면 cto-reviewer로 에스컬레이션하라.
4) 완료 시 인계 패키지(산출물+컨텍스트+이슈+링크)를 qa-lead에 전달하고
   결정·학습을 두뇌 4종에 환류하라.
```

---

## 관련 골드위키 문서
- [조직 지도](OrganizationMap.md) — 계층·보고선·에스컬레이션 경로
- [번호형 28 · 서브에이전트 규칙](../../GoldWiki/28_SUBAGENT_RULES.md)
- [운영 원칙](../Foundation/OperatingPrinciples.md), [전사 품질 기준](../Foundation/QualityStandard.md)
- [번호형 27 · 자동화 워크플로](../../GoldWiki/27_AUTOMATION_WORKFLOW.md)
- `../../Agents/RACI.md`, `../../Agents/ESCALATION_POLICY.md`, `../../Agents/COLLABORATION_MAP.md`

> **거버넌스:** 본 문서의 모든 의사결정은 [의사결정 로그](../Foundation/DecisionLog.md), [프로젝트 메모리](../Foundation/ProjectMemory.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Organization/OrganizationMap.md =====

# 조직 지도 (Organization Map)

> Goldwiki Digital(ClubSchool AI OS)의 24개 활성 AI 에이전트와 이를 둘러싼 80명 전문 역할의 조직도·계층·보고선을 정의한다. 사람(80 역할)과 AI(24 에이전트)가 동일 구조 위에서 협업한다.

## 목적

조직의 책임 구조를 단일 그림으로 제시하여, 누가 무엇을 결정하고 누구에게 보고하며 어떤 에이전트가 어떤 역할군을 대표하는지 명확히 한다. 24개 활성 서브에이전트(실행 주체)와 80명 역할(전문 직능)의 매핑·계층·보고선·에스컬레이션 경로를 정의한다. 협업·인계의 세부 규칙은 [에이전트 운영 규칙](AgentOperatingRules.md)을 따른다.

## 언제 사용하는가

- 어떤 작업을 어떤 에이전트/역할에 할당할지 결정할 때
- 의사결정 권한과 에스컬레이션 경로를 확인할 때
- 본부 간 협업·인계 라인을 식별할 때
- 신규 역할·에이전트를 조직에 편입할 때
- 클라이언트에게 수행 조직 구조를 제시할 때

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 24개 활성 에이전트 정의 | `../../.claude/agents/` |
| 회사 컨텍스트·조직 개요 | [번호형 01](../../GoldWiki/01_COMPANY_CONTEXT.md) |
| 운영 규칙 | [에이전트 운영 규칙](AgentOperatingRules.md) |
| RACI·협업 맵 | `../../Agents/RACI.md`, `../../Agents/COLLABORATION_MAP.md` |

## 처리 방식

### 거버넌스 계층 (4계층)

1. **경영(Executive)** — 전략·최종 승인·거버넌스
2. **운영·검토(Operations & Review)** — 운영 총괄·기술 검토·PMO
3. **본부 리드(Domain Leads)** — 각 직능 본부의 책임 에이전트
4. **전문 역할(Specialist Roles)** — 본부 산하 80명 전문 직능

### 전체 조직도

```mermaid
graph TD
  ED[executive-director<br/>총괄·전략·최종승인]
  COO[coo-operator<br/>운영총괄]
  CTO[cto-reviewer<br/>기술검토]
  PMO[pmo-director<br/>PMO·일정·리스크]

  ED --> COO
  ED --> CTO
  COO --> PMO

  subgraph 비즈니스본부
    RFP[rfp-strategy-lead]
    PROP[proposal-lead]
    BA[business-analysis-lead]
    IND[industry-research-lead]
    PROD[product-strategy-lead]
    SVC[service-planning-lead]
  end

  subgraph 디자인본부
    UXR[ux-research-lead]
    IA[information-architecture-lead]
    UI[ui-design-lead]
    DS[design-system-lead]
    BX[bx-design-lead]
    PUB[publishing-lead]
  end

  subgraph 엔지니어링본부
    FE[frontend-lead]
    BE[backend-lead]
    AIA[ai-automation-lead]
    DAT[data-analytics-lead]
  end

  subgraph 품질·지식본부
    QA[qa-lead]
    SEC[security-risk-lead]
    DOC[documentation-lead]
    SIM[client-simulation-lead]
  end

  COO --> RFP & PROP & BA & IND & PROD & SVC
  COO --> UXR & IA & UI & DS & BX & PUB
  CTO --> FE & BE & AIA & DAT
  CTO --> QA & SEC
  PMO --> DOC
  ED --> SIM
```

### 24개 활성 에이전트 · 계층 · 보고선

| # | 에이전트 | 계층 | 보고선(상위) | 대표 역할군 |
| --- | --- | --- | --- | --- |
| 1 | executive-director | 경영 | — | 경영진 |
| 2 | coo-operator | 운영 | executive-director | 운영 총괄 |
| 3 | cto-reviewer | 운영 | executive-director | 기술 검토 |
| 4 | pmo-director | 운영 | coo-operator | PMO |
| 5 | rfp-strategy-lead | 본부 리드 | coo-operator | RFP 전략 |
| 6 | proposal-lead | 본부 리드 | coo-operator | 제안 |
| 7 | business-analysis-lead | 본부 리드 | coo-operator | 비즈니스 분석 |
| 8 | industry-research-lead | 본부 리드 | coo-operator | 업종 리서치 |
| 9 | product-strategy-lead | 본부 리드 | coo-operator | 프로덕트 전략 |
| 10 | service-planning-lead | 본부 리드 | coo-operator | 서비스 기획 |
| 11 | ux-research-lead | 본부 리드 | coo-operator | UX 리서치 |
| 12 | information-architecture-lead | 본부 리드 | coo-operator | IA |
| 13 | ui-design-lead | 본부 리드 | coo-operator | UI |
| 14 | design-system-lead | 본부 리드 | coo-operator | 디자인 시스템 |
| 15 | bx-design-lead | 본부 리드 | coo-operator | 브랜드 경험 |
| 16 | publishing-lead | 본부 리드 | coo-operator | 퍼블리싱 |
| 17 | frontend-lead | 본부 리드 | cto-reviewer | 프론트엔드 |
| 18 | backend-lead | 본부 리드 | cto-reviewer | 백엔드 |
| 19 | ai-automation-lead | 본부 리드 | cto-reviewer | AI 자동화 |
| 20 | data-analytics-lead | 본부 리드 | cto-reviewer | 데이터 분석 |
| 21 | qa-lead | 본부 리드 | cto-reviewer | QA |
| 22 | security-risk-lead | 본부 리드 | cto-reviewer | 보안·리스크 |
| 23 | documentation-lead | 본부 리드 | pmo-director | 문서·골드위키 |
| 24 | client-simulation-lead | 본부 리드 | executive-director | 고객·평가·경쟁 시뮬레이션 |

### 80명 역할 매핑 (본부별 전문 직능)

각 본부 리드 에이전트는 다수의 전문 역할을 대표한다. 사람용 역할 카탈로그는 `../../Agents/`에 있으며, 본 표는 총량(80) 분포를 보인다.

| 본부 | 대표 리드 | 소속 전문 역할(예) | 역할 수 |
| --- | --- | --- | --- |
| 경영·운영 | executive-director, coo-operator, cto-reviewer, pmo-director | 전략기획, 운영관리, 기술아키텍트, PMO매니저, 리스크매니저, 재무 | 8 |
| 비즈니스 | rfp-strategy-lead, proposal-lead, business-analysis-lead, industry-research-lead, product-strategy-lead, service-planning-lead | RFP분석가, 제안PM, 카피라이터, BA, 도메인리서처, PO, 서비스기획자, 가격전략가 | 16 |
| 디자인 | ux-research-lead, information-architecture-lead, ui-design-lead, design-system-lead, bx-design-lead | UX리서처, 사용성평가, IA, 인터랙션, UI디자이너, 비주얼, 토큰엔지니어, 브랜드, 모션 | 18 |
| 퍼블리싱·프론트 | publishing-lead, frontend-lead | 퍼블리셔, 마크업, 접근성, FE개발, 상태관리, 성능 | 12 |
| 백엔드·데이터·AI | backend-lead, ai-automation-lead, data-analytics-lead | BE개발, API, DBA, DevOps, AI엔지니어, MLOps, 데이터분석, BI | 14 |
| 품질·보안·지식 | qa-lead, security-risk-lead, documentation-lead, client-simulation-lead | QA, 테스트자동화, 보안엔지니어, 컴플라이언스, 테크라이터, 평가위원시뮬, 경쟁사시뮬 | 12 |
| **합계** | **24 에이전트** | — | **80** |

### 보고·승인 흐름
- 일상 실무 결정: 본부 리드 자율.
- 범위·예산·리스크 영향 결정: 리드 → COO/CTO → executive-director.
- 표준 변경: 관련 리드 검토 → documentation-lead가 골드위키 반영.

## 출력 산출물

- 작업별 담당 에이전트·역할 배정
- 에스컬레이션 경로 식별
- 클라이언트 제시용 수행 조직도

## 품질 기준

| 기준 | 충족 조건 |
| --- | --- |
| 완전성 | 24 에이전트·80 역할이 모두 매핑된다 |
| 명확성 | 모든 노드의 보고선이 단일하게 정의된다 |
| 정합성 | `.claude/agents/` 정의와 일치한다 |
| 추적성 | 역할↔에이전트 매핑이 RACI와 일치한다 |

## 체크리스트

- [ ] 작업에 맞는 본부·리드를 식별했는가
- [ ] 결정 권한과 에스컬레이션 경로를 확인했는가
- [ ] 역할↔에이전트 매핑이 RACI와 일치하는가
- [ ] 신규 역할 편입 시 보고선을 단일하게 지정했는가
- [ ] 조직도 변경을 DecisionLog에 기록했는가

## 예시 프롬프트

```
당신은 coo-operator 에이전트다. 신규 금융 RFP가 접수되었다. OrganizationMap을
참조하여 (1) 분석~제안 단계에 투입할 본부 리드를 지정하고, (2) 각 리드가
대표하는 전문 역할을 RACI와 대조해 책임(R)/승인(A)을 배정하라. 보안·접근성
민감도가 높으므로 security-risk-lead의 에스컬레이션 경로를 명시하라.
```

---

## 관련 골드위키 문서
- [에이전트 운영 규칙](AgentOperatingRules.md) — 협업·인계·에스컬레이션
- [번호형 01 · 회사 컨텍스트](../../GoldWiki/01_COMPANY_CONTEXT.md)
- [번호형 28 · 서브에이전트 규칙](../../GoldWiki/28_SUBAGENT_RULES.md)
- [운영 원칙](../Foundation/OperatingPrinciples.md)
- `../../Agents/RACI.md`, `../../Agents/ORG_CHART.md`, `../../Agents/COLLABORATION_MAP.md`

> **거버넌스:** 본 문서의 모든 의사결정은 [의사결정 로그](../Foundation/DecisionLog.md), [프로젝트 메모리](../Foundation/ProjectMemory.md), [베스트 프랙티스](../../GoldWiki/37_BEST_PRACTICES.md), [레퍼런스 라이브러리](../../GoldWiki/36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Organization/README.md =====

# Organization — 조직 토픽

> 24개 활성 AI 에이전트와 80명 전문 역할의 조직 구조·운영 규칙 정본. 누가 무엇을 결정하고 어떻게 협업·인계·에스컬레이션하는지를 정의한다.

## 폴더 목적

조직의 책임 구조와 공통 행동 규약을 단일하게 정의한다. 24개 에이전트의 계층·보고선·역할 매핑(조직도)과, 모든 에이전트가 따르는 협업·인계·에스컬레이션·금지사항(운영 규칙)을 담는다. 사람(80 역할)과 AI(24 에이전트)가 동일한 구조 위에서 일관되게 협업하도록 한다.

## 포함 문서

| 문서 | 한 줄 설명 |
| --- | --- |
| [조직 지도](OrganizationMap.md) | 24 에이전트 + 80 역할 조직도(mermaid)·계층·보고선 |
| [에이전트 운영 규칙](AgentOperatingRules.md) | 공통 작업 절차·협업/인계·에스컬레이션·금지사항 |

## 관련 골드위키 토픽·번호 문서

- [운영 원칙](../Foundation/OperatingPrinciples.md) · [전사 품질 기준](../Foundation/QualityStandard.md)
- [번호형 01 · 회사 컨텍스트](../01_COMPANY_CONTEXT.md) — 회사 조직 개요
- [번호형 28 · 서브에이전트 규칙](../28_SUBAGENT_RULES.md) — 에이전트 운영 규칙(번호형 정본)
- [번호형 27 · 자동화 워크플로](../27_AUTOMATION_WORKFLOW.md) — 오케스트레이션
- 실행 정의: `../../.claude/agents/` (24개 에이전트)
- 사람용 레지스트리: `../../Agents/RACI.md`, `../../Agents/ORG_CHART.md`, `../../Agents/COLLABORATION_MAP.md`, `../../Agents/ESCALATION_POLICY.md`

## 담당 에이전트

- **주관:** coo-operator (운영 조직), documentation-lead (조직 정본 관리)
- **승인:** executive-director (조직 구조 변경 최종 승인)
- **연계:** pmo-director (협업·인계 운영), cto-reviewer (엔지니어링 본부)

> **거버넌스:** 조직 구조·규칙 변경은 [의사결정 로그](../Foundation/DecisionLog.md)에 ADR로 기록한 뒤 `.claude/agents/` 정의 및 RACI와 정합을 맞춘다.




===== 파일: GoldWiki/PMO/README.md =====

# PMO — 프로젝트 관리 토픽

## 폴더 목적

ClubSchool AI OS 프로젝트의 **일정·범위·자원·리스크 통제** 기준을 정의한다. 작업분해구조(WBS)를 일관된 원칙으로 작성해 과업을 누락 없이 분해하고, 공수·의존성·임계경로를 현실적으로 산정하며, 마일스톤·게이트로 진척을 통제한다. GoldWiki SSOT의 일정 관리 정본 토픽이다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [WBSGuide.md](WBSGuide.md) | WBS 작성 가이드(분해 원칙·공수 산정·의존성·일정화·예시 표) |

## 관련 GoldWiki 토픽 / 번호 문서

- [../27_AUTOMATION_WORKFLOW.md](../27_AUTOMATION_WORKFLOW.md) — RFP→납품 표준 단계 모델
- [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md) — 과거 공수 실적·교훈
- [../32_DECISION_LOG.md](../32_DECISION_LOG.md) — 의사결정 기록
- [../../Templates/WBS.md](../../Templates/WBS.md) — WBS 산출물 템플릿
- [../QA/QualityReviewChecklist.md](../QA/QualityReviewChecklist.md) — 일정/WBS 현실성 검증(6단계)
- [../Delivery/](../Delivery/) — 납품 단계 연계
- [../Organization/](../Organization/) — 가용 인력·역할

## 담당 에이전트

- **주담당:** `pmo-director` (PMO·일정·리스크 총괄)
- **협업:** `coo-operator`(운영 총괄), `executive-director`(승인), 각 단계 리드(`rfp-strategy-lead`, `proposal-lead`, `ux-research-lead`, `backend-lead`, `qa-lead` 등 공수·일정 입력)

## 거버넌스

WBS는 100% 규칙·MECE·8/80 규칙을 준수해 작성하고, [품질 검증 6단계](../QA/QualityReviewChecklist.md)로 현실성을 검증한다. 일정·범위 변경은 [DecisionLog](../DecisionLog/)에 기록하고 실적은 [ProjectMemory](../35_PROJECT_MEMORY.md)에 누적한다.




===== 파일: GoldWiki/PMO/WBSGuide.md =====

# WBS 작성 가이드 (Work Breakdown Structure Guide)

## 목적

ClubSchool AI OS 프로젝트의 **작업분해구조(WBS)** 를 일관된 원칙으로 작성하기 위한 정본 가이드다. RFP 분석부터 최종 납품까지 전 과업을 누락 없이 분해하고, 공수·의존성·일정을 현실적으로 산정해 `pmo-director`가 일정·리스크·자원을 통제할 수 있게 한다. 본 가이드는 GoldWiki SSOT의 일정 관리 기준이며, WBS 산출물은 [WBS 템플릿](../../Templates/WBS.md)으로 작성하고 [품질 검증 6단계](../QA/QualityReviewChecklist.md)로 검증한다.

> 모든 에이전트는 WBS 작성 전 GoldWiki를 먼저 참조한다. 일정·범위 변경은 [../DecisionLog/](../DecisionLog/)에 기록하고 [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md)에 누적한다.

## 언제 사용하는가

- 프로젝트 착수 시 전체 과업을 분해해 기준선(baseline) 일정을 수립할 때.
- 제안서에 수행 일정·투입 계획·마일스톤을 제시할 때.
- 범위 변경(change request) 발생 시 영향 범위·재일정을 산정할 때.
- 단계 종료 게이트에서 진척·잔여 작업을 점검할 때.

## 입력 정보

| 입력 | 출처 | 비고 |
| --- | --- | --- |
| 과업 범위·요구사항 | [../RFP/](../RFP/), 요구사항 추적표 | 누락 분해 방지 기준 |
| 산출물 정의 | [../Delivery/FinalDeliveryChecklist.md](../Delivery/FinalDeliveryChecklist.md) | 산출물 기반 분해 |
| 가용 인력·역할 | [../Organization/](../Organization/), [../../Agents/](../../Agents/) | 공수 배정 근거 |
| 표준 단계 모델 | [../27_AUTOMATION_WORKFLOW.md](../27_AUTOMATION_WORKFLOW.md) | RFP→납품 단계 |
| 과거 공수 실적 | [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md) | 산정 보정 |

## 처리 방식

### 1. 분해 원칙

- **산출물 지향(Deliverable-oriented):** 작업이 아닌 "완성된 산출물" 단위로 분해한다(예: "UX 리서치 보고서" → 산출물).
- **100% 규칙:** 상위 작업은 하위 작업의 합과 정확히 일치한다. 누락·중복 금지.
- **상호 배타(MECE):** 하위 작업 간 범위가 겹치지 않는다.
- **8/80 규칙:** 최하위 작업패키지(Work Package)는 8시간~80시간(1~10일) 분량으로 분해한다. 너무 크면 분해, 너무 작으면 통합.
- **단일 책임:** 작업패키지마다 단일 담당(owner)을 지정한다.
- **검증 가능:** 각 작업패키지는 완료정의(DoD)와 산출물로 완료를 판정할 수 있어야 한다.

### 2. 분해 레벨과 코드 체계

| 레벨 | 명칭 | 예시 | WBS 코드 |
| --- | --- | --- | --- |
| L1 | 단계(Phase) | RFP 분석 | 1 |
| L2 | 산출물군(Deliverable) | 요구사항 분석 보고서 | 1.2 |
| L3 | 작업패키지(Work Package) | 요구사항 추적표 작성 | 1.2.3 |
| L4 | 활동(Activity, 필요 시) | 기능요구 추출 | 1.2.3.1 |

WBS 코드는 점 표기(dot notation)로 부여해 상하위 관계를 명확히 한다.

### 3. 표준 단계(L1) 모델

ClubSchool AI OS의 RFP→납품 표준 단계를 기본 골격으로 사용한다.

| L1 | 단계 | 주요 산출물 | 담당 리드 |
| --- | --- | --- | --- |
| 1 | RFP 분석 | RFP 분석 보고서, 요구사항 추적표 | `rfp-strategy-lead` |
| 2 | 전략·기획 | 제안 전략, 비즈니스 분석 | `proposal-lead`, `business-analysis-lead` |
| 3 | UX/UI 설계 | IA, 플로우, 화면 설계, 디자인 시스템 | `ux-research-lead`, `ui-design-lead` |
| 4 | 기술 설계 | 아키텍처, API/DB 설계 | `cto-reviewer`, `backend-lead` |
| 5 | 제안서 작성 | 제안서, 경영 요약 | `proposal-lead` |
| 6 | 구현·개발 | 프론트/백엔드/AI 구현 | `frontend-lead`, `backend-lead` |
| 7 | QA·검증 | 품질 검증 보고서, 테스트 결과 | `qa-lead` |
| 8 | 납품·인수 | 최종 납품물, 인수확인서 | `pmo-director` |

### 4. 공수 산정

- **산정 기법:** 3점 산정(낙관 O / 최빈 M / 비관 P)을 기본으로 하고, 기대공수 E = (O + 4M + P) / 6 로 계산한다.
- **근거 명시:** 모든 공수에 산정 근거(유사 실적·전문가 판단·하향식 배분)를 기록한다.
- **버퍼:** 작업패키지 단위 버퍼 대신 단계·프로젝트 수준 통합 버퍼(15~20%)를 둔다.
- **단위:** 인일(man-day, MD)을 기본 단위로 한다.

공수 산정 예시:

| 작업패키지 | O(MD) | M(MD) | P(MD) | 기대공수 E |
| --- | --- | --- | --- | --- |
| 요구사항 추적표 작성 | 2 | 3 | 6 | 3.3 |
| IA 설계 | 4 | 6 | 11 | 6.5 |
| API 명세 작성 | 3 | 5 | 9 | 5.3 |

### 5. 의존성과 임계경로

- **의존 유형:** FS(완료-시작), SS(시작-시작), FF(완료-완료), SF(시작-완료). 기본은 FS.
- **임계경로(critical path):** 총 소요가 가장 긴 의존 경로를 식별하고, 해당 작업의 지연이 전체 일정을 지연시킴을 명시한다.
- **선행/병행:** 병행 가능 작업을 식별해 일정을 단축한다.

```mermaid
graph LR
  A[1.RFP분석 3.3MD] --> B[2.전략기획 8MD]
  B --> C[3.UX/UI 12MD]
  B --> D[4.기술설계 9MD]
  C --> E[5.제안서 6MD]
  D --> E
  E --> F[7.QA 4MD]
  F --> G[8.납품 2MD]
```

### 6. 일정화

- 기대공수·가용 인력·캘린더(휴일·병행도)를 반영해 시작·종료일을 산정한다.
- 마일스톤(M)과 품질 게이트(G)를 일정에 명시한다.
- 자원 평준화(resource leveling)로 과부하 인력을 조정한다.

### 7. WBS 예시 표

| WBS 코드 | 작업명 | 산출물 | 담당 | 기대공수(MD) | 선행 | 일정 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | RFP 분석 | RFP 분석 보고서 | rfp-strategy-lead | 3.3 | - | D1~D3 |
| 1.1 | 요구사항 추출 | 요구사항 목록 | rfp-strategy-lead | 1.5 | - | D1 |
| 1.2 | 요구사항 추적표 | 추적표 | rfp-strategy-lead | 1.8 | 1.1 | D2~D3 |
| 2 | 전략·기획 | 제안 전략서 | proposal-lead | 8.0 | 1 | D4~D8 |
| 3 | UX/UI 설계 | IA·화면 설계 | ux-research-lead | 12.0 | 2 | D9~D20 |
| 4 | 기술 설계 | 아키텍처 문서 | backend-lead | 9.0 | 2 | D9~D17 |
| 5 | 제안서 작성 | 제안서 | proposal-lead | 6.0 | 3,4 | D21~D26 |
| 7 | QA·검증 | 품질 검증 보고서 | qa-lead | 4.0 | 5 | D27~D29 |
| 8 | 납품·인수 | 최종 납품물 | pmo-director | 2.0 | 7 | D30 |

## 출력 산출물

- **WBS 표**: WBS 코드·작업·산출물·담당·공수·의존성·일정 ([../../Templates/WBS.md](../../Templates/WBS.md) 형식).
- **임계경로 다이어그램**: 의존 관계·임계경로 시각화.
- **마일스톤·게이트 일정**: 주요 시점과 품질 게이트.
- **자원 투입 계획**: 역할별 공수 배분표.

## 품질 기준

- 100% 규칙·MECE를 준수해 누락·중복이 없다.
- 모든 작업패키지가 8/80 규칙을 만족하고 단일 담당·DoD를 갖는다.
- 모든 공수에 산정 근거가 있다.
- 임계경로가 식별되고 버퍼가 명시되었다.
- WBS가 요구사항 추적표·산출물 정의와 정합한다.

## 체크리스트

- [ ] 산출물 지향으로 분해했다.
- [ ] 100% 규칙·MECE를 검증했다.
- [ ] 작업패키지가 8/80 범위 안에 있다.
- [ ] 공수를 3점 산정하고 근거를 기록했다.
- [ ] 의존성·임계경로를 식별했다.
- [ ] 마일스톤·게이트·버퍼를 일정에 반영했다.
- [ ] [품질 검증 6단계](../QA/QualityReviewChecklist.md)로 현실성을 검증했다.

## 예시 프롬프트

```text
당신은 pmo-director다. GoldWiki/PMO/WBSGuide.md 원칙에 따라 아래 프로젝트의 WBS를 작성하라.

입력: 과업 범위(요구사항 추적표), 가용 인력(역할·인원), 납기 D-30
요구:
1) L1~L3 분해(산출물 지향, 100% 규칙, 8/80 준수)
2) WBS 코드 부여, 작업패키지별 담당·DoD 지정
3) 3점 산정으로 공수 계산(근거 포함)
4) 의존성·임계경로 식별, 마일스톤·게이트·버퍼 반영
5) WBS 표와 임계경로 mermaid 다이어그램 출력

산출물은 Templates/WBS.md 형식을 따르고 모두 한국어로 작성한다.
```




===== 파일: GoldWiki/ProjectMemory/README.md =====

# ProjectMemory — 프로젝트 메모리 토픽

> 프로젝트별 컨텍스트·결정·학습을 누적하는 조직의 장기 기억 체계. 방법론·스키마 정본은 [Foundation/ProjectMemory](../Foundation/ProjectMemory.md)이고, 누적 스냅샷은 [번호형 35](../35_PROJECT_MEMORY.md)에 적재된다.

## 폴더 목적

조직이 매 프로젝트에서 배우고 그 학습을 재사용하도록, 프로젝트 메모리의 운영 진입점을 제공한다. 진행 중 프로젝트의 컨텍스트를 모든 에이전트가 공유하고, 종료 시 학습을 베스트 프랙티스·템플릿으로 환류하는 흐름을 안내한다. SSOT 원칙에 따라 본 폴더는 방법론을 재서술하지 않고 정본으로 링크한다.

## 포함 문서

| 문서 | 한 줄 설명 |
| --- | --- |
| [README](README.md) | 본 문서 — 프로젝트 메모리 운영 진입점 |

> 메모리 **방법론·스키마 정본**: [Foundation/ProjectMemory](../Foundation/ProjectMemory.md)
> 누적 **스냅샷 적재 정본**: [번호형 35 · 프로젝트 메모리](../35_PROJECT_MEMORY.md)

## 운영 흐름 (요약)

1. **킥오프** — 메모리 스냅샷 생성(project·context). 스키마는 [Foundation/ProjectMemory](../Foundation/ProjectMemory.md) 참조.
2. **진행 중** — 결정(ADR 연결)·리스크·산출물 변화를 누적 갱신.
3. **게이트마다** — 학습(learnings) 적재, promote_to 지정.
4. **종료** — 베스트 프랙티스([37](../37_BEST_PRACTICES.md))·템플릿([38](../38_TEMPLATE_LIBRARY.md))으로 환류.

## 관련 골드위키 토픽·번호 문서

- [Foundation/ProjectMemory(방법론 정본)](../Foundation/ProjectMemory.md)
- [번호형 35 · 프로젝트 메모리(스냅샷 적재 정본)](../35_PROJECT_MEMORY.md)
- [번호형 32 · 의사결정 로그](../32_DECISION_LOG.md) — 결정 연결
- [DecisionLog 토픽](../DecisionLog/README.md)
- [번호형 34 · 클라이언트 지식](../34_CLIENT_KNOWLEDGE.md), [번호형 37 · 베스트 프랙티스](../37_BEST_PRACTICES.md), [번호형 38 · 템플릿 라이브러리](../38_TEMPLATE_LIBRARY.md)

## 담당 에이전트

- **주관:** pmo-director (프로젝트 메모리 운영)
- **연계:** documentation-lead (정본 관리·환류), 전 본부 리드 (학습 적재)

> **거버넌스:** 메모리 스냅샷은 [번호형 35](../35_PROJECT_MEMORY.md)에만 적재하고, 학습 환류는 [의사결정 로그](../Foundation/DecisionLog.md)·베스트 프랙티스를 갱신한다.




===== 파일: GoldWiki/PromptLibrary/README.md =====

# PromptLibrary — 프롬프트 라이브러리 토픽

## 폴더 목적

ClubSchool AI OS에서 반복 사용하는 **검증된 프롬프트(prompt)** 를 한곳에 모아 재사용·품질·일관성을 보장한다. RFP 요구사항 추출, 숨은 기대 탐지, 제안 스토리라인, IA·플로우·UI 생성, 디자인 토큰, HTML 프로토타입, 경쟁사 벤치마크, 리스크 탐지, 경영 요약, 코드 리뷰 등 핵심 작업의 표준 프롬프트를 제공한다. GoldWiki SSOT의 프롬프트 정본 토픽이다.

## 포함 문서 / 연계 정본

본 토픽은 다음 두 정본을 가리키는 인덱스 역할을 한다.

| 정본 | 설명 |
| --- | --- |
| [../40_PROMPT_LIBRARY.md](../40_PROMPT_LIBRARY.md) | 번호형 프롬프트 라이브러리 정본(개요·카탈로그·사용 규칙) |
| [../../.claude/prompts/](../../.claude/prompts/) | 실행 가능한 개별 프롬프트 파일 모음 |

개별 프롬프트 파일:

- [`rfp-requirement-extraction.md`](../../.claude/prompts/rfp-requirement-extraction.md) — RFP 요구사항 추출
- [`hidden-expectation-detection.md`](../../.claude/prompts/hidden-expectation-detection.md) — 숨은 기대 탐지
- [`proposal-storyline.md`](../../.claude/prompts/proposal-storyline.md) — 제안 스토리라인
- [`competitor-benchmark.md`](../../.claude/prompts/competitor-benchmark.md) — 경쟁사 벤치마크
- [`risk-detection.md`](../../.claude/prompts/risk-detection.md) — 리스크 탐지
- [`ia-generation.md`](../../.claude/prompts/ia-generation.md) · [`user-flow-generation.md`](../../.claude/prompts/user-flow-generation.md) · [`ui-concept.md`](../../.claude/prompts/ui-concept.md) — UX/UI 생성
- [`design-token-generation.md`](../../.claude/prompts/design-token-generation.md) · [`html-prototype.md`](../../.claude/prompts/html-prototype.md) — 디자인·퍼블리싱
- [`executive-summary.md`](../../.claude/prompts/executive-summary.md) · [`code-review.md`](../../.claude/prompts/code-review.md) — 보고·검토

## 관련 GoldWiki 토픽 / 번호 문서

- [../26_PROMPT_ENGINEERING.md](../26_PROMPT_ENGINEERING.md) — 프롬프트 엔지니어링 원칙
- [../28_SUBAGENT_RULES.md](../28_SUBAGENT_RULES.md) — 서브에이전트 규칙
- [../Templates/](../Templates/) — 산출물 템플릿(프롬프트 출력 형식 연계)

## 담당 에이전트

- **주담당:** `documentation-lead` (프롬프트 정본 관리)
- **협업:** 각 도메인 리드(자기 영역 프롬프트 제안·개선), `qa-lead`(프롬프트 출력 품질 검증)

## 거버넌스

프롬프트는 [26 프롬프트 엔지니어링](../26_PROMPT_ENGINEERING.md) 원칙을 따르고, 개선·신규 등록은 `documentation-lead`가 승인한다. 중복 프롬프트는 금지하며 정본은 항상 `.claude/prompts/`에 둔다.




===== 파일: GoldWiki/Proposal/AIClientSimulation.md =====

# AI 고객 시뮬레이션 (AI Client Simulation)

> 이 문서는 발주처 담당자의 관점에서 예상 질문을 생성하고 답변 전략을 단련하는 표준이다. 모든 에이전트는 [제안 전략](ProposalStrategy.md)과 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | client-simulation-lead |
| **협업 에이전트** | proposal-lead, cto-reviewer, pmo-director, executive-director |
| **정본 상위 문서** | [05 제안 전략](../05_PROPOSAL_STRATEGY.md), [34 고객 지식](../34_CLIENT_KNOWLEDGE.md) |
| **연계 토픽** | [AIEvaluationBoard](AIEvaluationBoard.md), [AICompetitorSimulation](AICompetitorSimulation.md), [ExecutiveSummaryTemplate](ExecutiveSummaryTemplate.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

발표(PT)·질의응답에서 나올 질문을 **고객사 관점별로 미리 생성**하고, 약한 답변을 강한 답변으로 개선하여 현장 대응력을 끌어올린다. 시뮬레이션은 제안서의 빈틈을 발표 전에 노출시킨다.

---

## 언제 사용하는가

- 제안서 초안 완성 후 발표 준비 단계
- PT 리허설·예상 Q&A 스크립트 작성 시
- [AIEvaluationBoard](AIEvaluationBoard.md) 약점 보완 후 현장 검증으로

---

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 제안서·경영 요약 | [ExecutiveSummaryTemplate](ExecutiveSummaryTemplate.md) |
| 발주처 배경·이해관계자 | [34 고객 지식](../34_CLIENT_KNOWLEDGE.md) |
| 숨은 기대·리스크 | [RFPAnalysisFramework](../RFP/RFPAnalysisFramework.md) |

---

## 처리 방식

1. **관점별 페르소나 구성** — 임원·실무자·IT담당자·운영자 4관점으로 분리.
2. **관점별 질문 생성** — 각 페르소나의 관심사에 맞춘 예상 질문.
3. **약한 답변 식별** — 초안 답변의 모호·근거 부족·방어적 표현 진단.
4. **강한 답변 설계** — 결론 우선 + 근거 + 증거 + 안심 구조로 개선.
5. **압박 질문 대비** — 적대적·함정 질문에 대한 침착한 프레이밍.

### 관점별 관심사

| 페르소나 | 핵심 관심 | 질문 성향 |
| --- | --- | --- |
| 임원(의사결정자) | 사업 성과·리스크·예산 | "왜 당신들인가, 실패하면?" |
| 실무자(현업) | 업무 적합성·변화 부담 | "기존 업무 어떻게 바뀌나" |
| IT담당자 | 기술 안정성·연동·보안 | "성능·보안·레거시 연동은?" |
| 운영자 | 운영·유지보수·이관 | "납품 후 우리가 운영 가능한가" |

---

## 출력 산출물

1. **관점별 예상 질문 세트** — 4관점 각 5문항 이상.
2. **답변 전략 카드** — 질문별 핵심 메시지·증거.
3. **약한→강한 답변 개선 예시** — Before/After.
4. **압박 질문 대응 가이드** — 프레이밍 문장.

---

## 답변 구조 표준 (결론-근거-증거-안심)

```
[결론] 가능합니다 / 다음과 같이 대응합니다.
[근거] 왜냐하면 ~한 방법론/설계 때문입니다.
[증거] 실제로 ~ 사업에서 ~ 성과를 냈습니다.
[안심] 또한 ~ 게이트/계약으로 보증합니다.
```

---

## 품질 기준

- 4관점이 모두 분리·반영되었는가
- 압박·함정 질문이 포함되었는가
- 모든 답변에 증거(레퍼런스·KPI)가 있는가
- 약한 답변이 강한 답변으로 정량 개선되었는가
- 답변이 결론-근거-증거-안심 구조를 따르는가

---

## 체크리스트

- [ ] 임원/실무자/IT담당자/운영자 4관점 질문을 생성했다
- [ ] 각 관점 5문항 이상을 확보했다
- [ ] 답변 전략 카드를 작성했다
- [ ] 약한→강한 답변 개선 예시를 만들었다
- [ ] 압박 질문 대응 프레이밍을 준비했다

---

## 관점별 예상 질문 예시 — 공공포털 고도화

### 임원 관점
- 이 사업이 실패한다면 가장 큰 원인은 무엇이고 어떻게 막습니까?
- 경쟁사 대비 우리에게 줄 수 있는 결정적 차별점은?
- 예산 대비 기대효과를 정량으로 약속할 수 있습니까?

### 실무자 관점
- 현재 민원 처리 절차가 어떻게 단순해집니까?
- 오픈 직후 현업의 업무 부담이 늘지 않습니까?

### IT담당자 관점
- 동시접속 5,000 성능을 어떻게 보증합니까?
- 기존 레거시·인증 시스템과의 연동 리스크는?
- 개인정보 암호화·접근통제 설계는 구체적으로?

### 운영자 관점
- 납품 후 우리 인력만으로 운영·장애 대응이 가능합니까?
- 디자인 시스템 변경을 자체적으로 할 수 있습니까?

---

## 약한 답변 → 강한 답변 개선 예시

> **질문(IT담당자)**: "동시접속 5,000명 성능을 정말 보장합니까?"

**약한 답변**
> "네, 저희 기술력으로 충분히 가능합니다. 최선을 다하겠습니다."
> (문제: 결론만 있고 근거·증거·검증 없음, 방어적)

**강한 답변**
> [결론] 5,000 동접·평균 응답 2초 이내를 계약 기준으로 보증합니다.
> [근거] API 게이트웨이 캐싱과 CDN 분산, 무상태 수평 확장 아키텍처를 적용하기 때문입니다([21 백엔드](../21_BACKEND_GUIDE.md)).
> [증거] 동종 공공포털에서 동일 설계로 6,200 동접을 응답 1.7초로 처리한 실적이 있습니다.
> [안심] 또한 17단계에서 JMeter로 사전 부하 테스트를 수행하고, 합격 기준 미달 시 출시하지 않는 품질 게이트를 운영합니다([30 테스트 전략](../30_TEST_STRATEGY.md)).

---

## 예시 프롬프트

```
당신은 client-simulation-lead 에이전트다. 발주처 4관점(임원/실무자/IT담당자/운영자)으로
AI 고객 시뮬레이션을 수행하라.
1) 관점별 예상 질문 각 5문항 이상(압박/함정 질문 포함)
2) 질문별 답변 전략 카드(핵심 메시지·증거)
3) 약한 답변 2건을 결론-근거-증거-안심 구조의 강한 답변으로 개선(Before/After)
4) 압박 질문 대응 프레이밍
모든 답변에 레퍼런스·KPI 증거를 부착하라.
```

---

## 관련 골드위키 문서
- [ProposalStrategy](ProposalStrategy.md) — 검증 대상 전략.
- [AIEvaluationBoard](AIEvaluationBoard.md) — 채점과 연계.
- [AICompetitorSimulation](AICompetitorSimulation.md) — 경쟁 대응 질문.
- [34 고객 지식](../34_CLIENT_KNOWLEDGE.md) — 이해관계자 정보.
- [ExecutiveSummaryTemplate](ExecutiveSummaryTemplate.md) — 발표 도입.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Proposal/AICompetitorSimulation.md =====

# AI 경쟁사 시뮬레이션 (AI Competitor Simulation)

> 이 문서는 경쟁사의 예상 제안을 예측하고 우리 제안의 약점을 선제 보강하는 표준이다. 모든 에이전트는 [제안 전략](ProposalStrategy.md)과 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | client-simulation-lead |
| **협업 에이전트** | proposal-lead, rfp-strategy-lead, executive-director, cto-reviewer |
| **정본 상위 문서** | [05 제안 전략](../05_PROPOSAL_STRATEGY.md) |
| **연계 토픽** | [ProposalStrategy](ProposalStrategy.md), [AIEvaluationBoard](AIEvaluationBoard.md), [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

경쟁사의 입장에서 그들이 제출할 제안을 예측하고, 그 시각으로 **우리 제안의 약점을 적대적으로 도출**한 뒤 차별화 전략으로 전환한다. "경쟁사가 우리를 어떻게 공격할까"를 먼저 시뮬레이션하여 방어선을 구축한다.

---

## 언제 사용하는가

- 제안 전략 수립 직후 차별화 검증 단계
- 경쟁 강도가 높은 사업에서
- 레드팀 게이트에서 우리 약점 점검 시
- 가격 전략 결정 전 경쟁 가격대 추정 시

---

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 경쟁사 이력·강약점 | [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md), 시장 조사 |
| 우리 윈 테마·포지셔닝 | [ProposalStrategy](ProposalStrategy.md) |
| 평가 배점·공략 우선순위 | [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md) |
| 업종 특성 | [Industry](../Industry/) |

---

## 처리 방식

1. **경쟁사 식별·프로파일링** — 유력 경쟁사 2~3곳의 강점·약점·전형 전략.
2. **경쟁사 제안 예측** — 각 경쟁사가 강조할 윈 테마·가격 전략을 가정.
3. **적대적 약점 도출** — 경쟁사 시각으로 우리 제안의 빈틈을 공격.
4. **차별화 전략 수립** — 경쟁사 미보유 강점을 윈 테마로 전환·증폭.
5. **비교표 작성** — 가격/기술/레퍼런스/UX·UI/일정 5축 비교.
6. **방어 메시지 준비** — 예상 공격에 대한 반박 프레이밍.

---

## 출력 산출물

1. **경쟁사 프로파일** — 2~3곳 강·약점·전형 전략.
2. **경쟁사 예상 제안 시나리오** — 각 사 윈 테마·가격 가정.
3. **우리 약점 리스트(적대적)** — 경쟁사 공격 포인트.
4. **차별화 전략표** — 약점 → 대응 → 강화된 윈 테마.
5. **5축 비교표** — 가격/기술/레퍼런스/UX·UI/일정.

---

## 5축 경쟁 비교표 (예시 — 공공포털 고도화)

| 비교 축 | 경쟁사 A (대형 SI) | 경쟁사 B (저가 입찰) | 우리 (ClubSchool) |
| --- | --- | --- | --- |
| **가격** | 높음(프리미엄) | 매우 낮음(저가 공세) | **합리적**(재사용 절감) |
| **기술** | 안정적·보수적 | 검증 부족 | **검증된 표준 + 21단계** |
| **레퍼런스** | 풍부·대형 | 빈약 | **동종 포털 3건 적기 납품** |
| **UX·UI** | 보통(외주 의존) | 약함 | **디자인 시스템·여정 기반** |
| **일정** | 여유롭지만 느림 | 무리한 단축 | **AI 증강 처리량·현실 버퍼** |

---

## 경쟁사 예상 제안 → 우리 약점 → 차별화

| 경쟁사 예상 강조점 | 그로 인한 우리 약점 | 차별화 대응 |
| --- | --- | --- |
| A: "대형 수행 실적·안정성" | 회사 규모·대형 실적 열세 | 동종 도메인 적합 실적 + 게이트 품질 보증으로 안정성 재정의 |
| B: "최저가" | 가격 정량 점수 열세 가능 | 재사용 절감을 가격에 반영 + 저가의 품질 리스크를 발주처 시각으로 부각 |
| A: "풍부한 인력 풀" | 인력 규모 열세 | 핵심 전담 인력 100% + AI 증강 처리량으로 산출 효율 입증 |

---

## 약점 → 강화된 윈 테마 예시

> **적대적 지적**: "경쟁사 A는 대형 실적이 압도적이다. 우리는 규모에서 밀린다."
>
> **차별화 전환**: 규모 경쟁을 피하고 **'적합성'으로 프레임 전환**. "대형 범용 실적보다, 동종 공공포털에서 동일 설계로 6,200 동접을 안정 처리한 직접 적합 실적이 본 사업 성공을 보증한다." → 윈 테마 "검증된 적합성"으로 증폭.

---

## 품질 기준

- 경쟁사 2~3곳을 구체적으로 프로파일링했는가
- 우리 약점을 적대적·솔직하게 도출했는가
- 모든 약점에 차별화 대응이 있는가
- 5축 비교표가 사실 기반(레퍼런스 인용)인가
- 차별화가 경쟁사 미보유 강점에 기반하는가

---

## 체크리스트

- [ ] 경쟁사 2~3곳 프로파일을 작성했다
- [ ] 경쟁사 예상 제안 시나리오를 가정했다
- [ ] 적대적 시각으로 우리 약점을 도출했다
- [ ] 약점별 차별화 대응을 수립했다
- [ ] 5축(가격/기술/레퍼런스/UX·UI/일정) 비교표를 작성했다
- [ ] 강화된 윈 테마로 [ProposalStrategy](ProposalStrategy.md)에 반영했다

---

## 예시 프롬프트

```
당신은 client-simulation-lead 에이전트다. AI 경쟁사 시뮬레이션을 수행하라.
1) 유력 경쟁사 2~3곳 프로파일(강점/약점/전형 전략)
2) 각 사 예상 제안 시나리오(윈 테마·가격 가정)
3) 경쟁사 시각으로 우리 제안 약점을 적대적으로 도출
4) 약점→차별화 대응표(경쟁사 미보유 강점 기반)
5) 5축 비교표(가격/기술/레퍼런스/UX·UI/일정)
6) 강화된 윈 테마 제안
도출된 차별화는 ProposalStrategy에 반영하고, 결정은 32_DECISION_LOG에 기록하라.
```

---

## 관련 골드위키 문서
- [ProposalStrategy](ProposalStrategy.md) — 차별화 반영 대상.
- [AIEvaluationBoard](AIEvaluationBoard.md) — 채점 입력.
- [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md) — 배점 기반 공략.
- [Industry](../Industry/) — 업종 경쟁 특성.
- [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md) — 경쟁·실적 자료.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Proposal/AIEvaluationBoard.md =====

# AI 평가위원 (AI Evaluation Board)

> 이 문서는 제안서를 실제 평가위원의 관점에서 점수화하여 제출 전 약점을 발견·보완하는 표준이다. 모든 에이전트는 [제안 전략](ProposalStrategy.md)과 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | client-simulation-lead |
| **협업 에이전트** | proposal-lead, rfp-strategy-lead, cto-reviewer, executive-director |
| **정본 상위 문서** | [05 제안 전략](../05_PROPOSAL_STRATEGY.md), [29 품질 체크리스트](../29_QUALITY_CHECKLIST.md) |
| **연계 토픽** | [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md), [AIClientSimulation](AIClientSimulation.md), [AICompetitorSimulation](AICompetitorSimulation.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

제출 전, 가상의 평가위원단(AI Evaluation Board)이 제안서를 발주처 시각으로 **항목별 100점 만점 채점**한다. 약점을 적시하고 보완 전략을 처방하며 최종 수주 가능성을 예측하여, 제출 품질을 결정적으로 끌어올린다.

---

## 언제 사용하는가

- 제안서 초안 완성 직후(레드팀 게이트, 18단계)
- 경영 요약·발표 자료 확정 전
- 경쟁 강도가 높아 변별이 중요한 사업에서
- 보완 후 재채점(차이 분석)을 할 때

---

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 제안서 초안·경영 요약 | [ExecutiveSummaryTemplate](ExecutiveSummaryTemplate.md) |
| 평가 배점·세부 기준 | [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md) |
| 윈 테마·증거 | [ProposalStrategy](ProposalStrategy.md) |
| 경쟁사 예상 제안 | [AICompetitorSimulation](AICompetitorSimulation.md) |

---

## 처리 방식

1. **평가위원 페르소나 구성** — 기술위원·UX위원·사업위원·가격위원 등 다관점.
2. **항목별 채점** — 아래 7개 평가축을 각 100점 만점으로 채점(가중치는 RFP 배점에 비례).
3. **약점 적시** — 각 항목에서 감점 사유를 구체적으로 기술.
4. **보완 처방** — 항목별 "무엇을 어떻게 고치면 +몇 점"인지 제시.
5. **최종 수주 가능성 예측** — 가중 총점 → 등급(상/중/하)·확률대.
6. **재채점** — 보완 후 차이(Before→After) 분석.

### 7개 평가축 (각 100점 만점)

| 평가축 | 핵심 질문 | RFP 배점 가중 예 |
| --- | --- | --- |
| 기술 | 방법론이 검증·실현 가능한가 | 30% |
| UX·UI | 사용성·디자인 품질이 우수한가 | 15% |
| 사업 이해도 | 발주처 문제·동인을 정확히 이해했는가 | 15% |
| 수행 계획 | 일정·조직·WBS가 현실적인가 | 15% |
| 인력 | 투입 인력의 역량·전담성이 충분한가 | 10% |
| 가격 | 가격이 가치와 정합하고 합리적인가 | 10% |
| 리스크 대응 | 리스크 식별·대응·담당이 명확한가 | 5% |

---

## 출력 산출물

1. **채점표** — 7개 축 × 100점, 가중 총점.
2. **약점 리스트** — 항목별 감점 사유.
3. **보완 처방표** — 조치 → 예상 점수 증가.
4. **수주 가능성 예측** — 등급·확률대·근거.
5. **재채점 차이 분석** — Before/After.

---

## 채점 루브릭 (100점 환산 기준)

| 구간 | 의미 |
| --- | --- |
| 90~100 | 탁월 — 변별 우위, 증거 충분 |
| 75~89 | 우수 — 충족 + 일부 차별 |
| 60~74 | 보통 — 기본 충족, 차별 약함 |
| 40~59 | 미흡 — 누락·근거 부족 |
| 0~39 | 부적합 — 핵심 요구 미충족 |

---

## 품질 기준

- 채점이 RFP 평가 배점 가중과 정합하는가
- 약점이 구체적이고 실행 가능한 보완으로 연결되는가
- 점수에 근거(어느 페이지·어떤 누락)가 붙어 있는가
- 보완 후 재채점으로 개선이 정량 입증되는가
- 평가위원 다관점이 반영되었는가

---

## 체크리스트

- [ ] 7개 평가축을 각 100점으로 채점했다
- [ ] RFP 배점 가중을 적용해 총점을 산출했다
- [ ] 항목별 약점을 구체적으로 적시했다
- [ ] 보완 처방과 예상 점수 증가를 제시했다
- [ ] 수주 가능성을 등급·확률로 예측했다
- [ ] 보완 후 재채점 차이를 분석했다

---

## 실제 채점 예시 — "국민참여 통합포털 고도화 사업" 제안서 초안

> 평가위원단: 기술위원, UX위원, 사업위원, 가격위원 (4인 가상)

### 채점표 (각 100점 만점)

| 평가축 | 점수 | 가중 | 가중점수 | 핵심 감점 사유 |
| --- | --- | --- | --- | --- |
| 기술 | 88 | 30% | 26.4 | 부하 테스트 시점·규모가 추상적 |
| UX·UI | 82 | 15% | 12.3 | 여정 개선 효과의 정량 근거 부족 |
| 사업 이해도 | 90 | 15% | 13.5 | as-is 문제 진단은 우수, to-be 지표 미흡 |
| 수행 계획 | 76 | 15% | 11.4 | 7개월 일정의 버퍼·임계경로 불명확 |
| 인력 | 79 | 10% | 7.9 | 핵심 인력 전담률·투입 시기 모호 |
| 가격 | 84 | 10% | 8.4 | 재사용 절감 효과를 가격에 미반영 |
| 리스크 대응 | 80 | 5% | 4.0 | 고위험 2건 담당자 미지정 |
| **총점** | — | 100% | **83.9** | — |

### 약점 → 보완 처방

| 약점 | 보완 조치 | 예상 증가 |
| --- | --- | --- |
| 부하 테스트 추상적 | 17단계에 5,000 동접 시나리오·도구(JMeter)·합격 기준 명시 | 기술 +5 |
| 여정 효과 근거 부족 | 동종 사업 이탈률 38%↓ KPI 인용 | UX +6 |
| 일정 버퍼 불명확 | 임계경로·리스크 버퍼(15%) 간트 추가 | 수행 +8 |
| 인력 전담률 모호 | 핵심 4인 전담 100%·투입 타임라인 표 | 인력 +7 |
| 리스크 담당 미지정 | RR-01/RR-04에 담당 에이전트·완화 일정 부여 | 리스크 +10 |

### 재채점 (보완 후)

| 평가축 | Before | After |
| --- | --- | --- |
| 기술 | 88 | 93 |
| UX·UI | 82 | 88 |
| 수행 계획 | 76 | 84 |
| 인력 | 79 | 86 |
| 리스크 대응 | 80 | 90 |
| **가중 총점** | **83.9** | **89.6** |

### 최종 수주 가능성 예측

- **초안**: 83.9점 → 중상위. 강력 경쟁사 존재 시 박빙(확률 50~60%).
- **보완 후**: 89.6점 → 상위. 변별 우위 확보(확률 70~78%).
- **결정**: 보완 5건을 제출 전 필수 반영. 일정 버퍼·리스크 담당 지정을 [32 의사결정 로그](../32_DECISION_LOG.md)에 기록.

---

## 예시 프롬프트

```
당신은 client-simulation-lead 에이전트다. AI 평가위원단(기술/UX/사업/가격위원)을 구성해
제안서 초안을 채점하라.
1) 7개 평가축(기술/UX·UI/사업이해도/수행계획/인력/가격/리스크대응) 각 100점 채점
2) RFP 배점 가중을 적용한 가중 총점
3) 항목별 약점 적시(페이지·누락 근거 포함)
4) 보완 처방표(조치→예상 증가)
5) 수주 가능성 등급·확률 예측
6) 보완 후 재채점 차이 분석
고위험 보완 결정은 32_DECISION_LOG 기록 항목으로 명시하라.
```

---

## 관련 골드위키 문서
- [ProposalStrategy](ProposalStrategy.md) — 채점 대상 전략.
- [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md) — 배점 가중 근거.
- [AIClientSimulation](AIClientSimulation.md) — 발표 질의 검증.
- [AICompetitorSimulation](AICompetitorSimulation.md) — 경쟁 비교 입력.
- [29 품질 체크리스트](../29_QUALITY_CHECKLIST.md) — G6 게이트.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Proposal/ExecutiveSummaryTemplate.md =====

# 경영 요약 작성 가이드 + 템플릿 (Executive Summary)

> 이 문서는 제안서 경영 요약(Executive Summary)의 작성 원칙과 재사용 템플릿을 제공한다. 모든 에이전트는 작성 전 [제안 전략](ProposalStrategy.md)과 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | proposal-lead |
| **협업 에이전트** | executive-director, rfp-strategy-lead, documentation-lead |
| **정본 상위 문서** | [05 제안 전략](../05_PROPOSAL_STRATEGY.md) |
| **연계 토픽** | [ProposalStrategy](ProposalStrategy.md), [AIEvaluationBoard](AIEvaluationBoard.md), [38 템플릿 라이브러리](../38_TEMPLATE_LIBRARY.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

평가위원이 **가장 먼저·가장 집중해서 읽는** 1~2페이지에서 윈 테마를 즉시 각인시킨다. 경영 요약만 읽어도 "왜 우리를 선택해야 하는가"가 명확해야 한다.

---

## 언제 사용하는가

- 제안 전략 확정 후 제안서 본문 착수 직전
- 발표(PT) 도입부 스크립트의 기반으로
- 제출 전 레드팀·[AIEvaluationBoard](AIEvaluationBoard.md) 채점 대상으로

---

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 윈 테마·포지셔닝 | [ProposalStrategy](ProposalStrategy.md) |
| 고객 동인·숨은 기대 | [RFPAnalysisFramework](../RFP/RFPAnalysisFramework.md) |
| 정량 성과·레퍼런스 | [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md), [02 비즈니스 목표](../02_BUSINESS_GOALS.md) |

---

## 처리 방식 — 작성 원칙

1. **고객 언어로 시작** — 우리 회사가 아니라 발주처의 목표·문제로 시작한다.
2. **윈 테마 3개를 명시** — 차별점을 정량 성과와 증거로 제시한다.
3. **증거 동반** — 모든 약속에 레퍼런스·KPI를 붙인다.
4. **리스크 선제 언급** — 발주처의 우려를 먼저 짚고 통제 방안을 제시한다.
5. **1~2페이지·스캔 가능** — 소제목·굵게·표로 빠르게 읽히게 한다.
6. **금지** — 일반적 자기소개, 추상적 미사여구, 근거 없는 최상급 표현.

### 구성 요소

| 블록 | 내용 | 분량 |
| --- | --- | --- |
| 도입 | 발주처 목표·핵심 동인 1문단 | 3~4줄 |
| 핵심 메시지 | 윈 테마 3개 | 표/불릿 |
| 차별점·증거 | 정량 성과 + 레퍼런스 | 표 |
| 리스크 통제 | 주요 우려 → 대응 | 2~3줄 |
| 기대효과 | 발주처가 얻는 결과 | 2~3줄 |

---

## 출력 산출물

- **경영 요약 1~2페이지** — 아래 템플릿 채움.
- **PT 도입 스크립트** — 경영 요약 축약본(60초).

---

## 품질 기준

- 경영 요약만으로 윈 테마가 즉시 이해되는가
- 발주처 언어·목표로 시작하는가
- 3개 윈 테마가 정량 성과·증거를 갖는가
- 주요 리스크와 통제가 선제 제시되는가
- 1~2페이지에 스캔 가능한가
- [AIEvaluationBoard](AIEvaluationBoard.md) 채점 85% 이상인가

---

## 체크리스트

- [ ] 발주처 목표로 시작했다
- [ ] 윈 테마 3개를 명시했다
- [ ] 모든 약속에 증거를 붙였다
- [ ] 리스크 통제를 선제 제시했다
- [ ] 기대효과로 마무리했다
- [ ] 1~2페이지·스캔 가능하다

---

## 템플릿

```
[발주처]께서 추진하시는 [사업명]의 핵심은 [고객 동인]입니다.
현재 [as-is 문제]로 인해 [영향]이 발생하고 있습니다.

ClubSchool은 다음 세 가지로 이를 해결합니다.
  1. [윈 테마 1] — [정량 성과]. 근거: [레퍼런스/KPI].
  2. [윈 테마 2] — [정량 성과]. 근거: [레퍼런스/KPI].
  3. [윈 테마 3] — [정량 성과]. 근거: [레퍼런스/KPI].

| 차별점 | 정량 성과 | 증거 |
| --- | --- | --- |
| [차별점 1] | [수치] | [레퍼런스] |
| [차별점 2] | [수치] | [KPI] |

[발주처]께서 우려하실 [핵심 리스크]는 [검증된 방법론/표준]으로 사전 통제합니다.
그 결과 [발주처]는 [정량 기대효과]를 얻으실 것입니다.
```

---

## 채워진 예시 — 공공포털 고도화

> [○○부]께서 추진하시는 "국민참여 통합포털 고도화 사업"의 핵심은 **국민이 체감하는 사용성 향상**입니다. 현재 노후 포털의 복잡한 민원 절차로 이탈률이 높고 접근성 미흡으로 정보 소외가 발생하고 있습니다.
>
> ClubSchool은 다음 세 가지로 이를 해결합니다.
> 1. **검증된 디자인 시스템 재사용**으로 화면 처리량을 2배 높여 7개월 내 안정 출시 — 근거: 공공포털 3개 적기 납품.
> 2. **여정 기반 UX 재설계**로 민원 신청을 3클릭 이내로 단축 — 근거: 동종 사업 이탈률 38% 개선.
> 3. **WCAG 2.1 AA 100% + OWASP 게이트 내재화**로 규제·보안 무결성 보증 — 근거: 자동·수동 접근성 점검 통합.

| 차별점 | 정량 성과 | 증거 |
| --- | --- | --- |
| 디자인 시스템 재사용 | 화면 처리량 2배 | 3개 포털 실적 |
| 여정 기반 UX | 이탈률 38%↓ | 동종 사업 KPI |

> 가장 큰 우려인 동시접속 5,000 성능은 캐싱·CDN 설계와 조기 부하 테스트로 사전 통제합니다. 그 결과 ○○부는 국민 만족도 상승과 안정적 운영 기반을 확보하실 것입니다.

---

## 예시 프롬프트

```
당신은 proposal-lead 에이전트다. 제안 전략(ProposalStrategy)을 입력으로 경영 요약을 작성하라.
- 발주처 목표로 시작, 윈 테마 3개를 정량 성과·증거와 함께 제시
- 차별점·증거 표, 리스크 선제 통제, 기대효과로 마무리
- 1~2페이지, 스캔 가능하게. 일반적 자기소개·미사여구 금지
작성 후 AIEvaluationBoard로 자체 채점하고 85% 미만 항목을 보강하라.
```

---

## 관련 골드위키 문서
- [ProposalStrategy](ProposalStrategy.md) — 윈 테마 입력.
- [05 제안 전략](../05_PROPOSAL_STRATEGY.md) — 정본.
- [AIEvaluationBoard](AIEvaluationBoard.md) — 자체 채점.
- [38 템플릿 라이브러리](../38_TEMPLATE_LIBRARY.md) — 제안서 템플릿.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Proposal/ProposalStrategy.md =====

# 제안 전략 (Proposal Strategy)

> 이 문서는 RFP 분석 결과를 수주로 전환하는 윈 전략의 실무 표준이다. 모든 에이전트는 제안 작업 전 [05 제안 전략](../05_PROPOSAL_STRATEGY.md) 정본과 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | proposal-lead |
| **협업 에이전트** | rfp-strategy-lead, business-analysis-lead, executive-director, client-simulation-lead |
| **정본 상위 문서** | [05 제안 전략](../05_PROPOSAL_STRATEGY.md) |
| **연계 토픽** | [ExecutiveSummaryTemplate](ExecutiveSummaryTemplate.md), [AIEvaluationBoard](AIEvaluationBoard.md), [AIClientSimulation](AIClientSimulation.md), [AICompetitorSimulation](AICompetitorSimulation.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

RFP 분석([RFP](../RFP/RFPAnalysisFramework.md))에서 도출된 고객 동인·평가기준·경쟁 구도를 바탕으로, **수주 가능성을 극대화하는 윈 테마·가치제안·포지셔닝·스토리라인**을 정의한다. 제안 전략은 제안서 전 장의 메시지 일관성을 보증하는 골격이다.

---

## 언제 사용하는가

- RFP 분석 인계 직후(파이프라인 6단계, 제안 전략 수립)
- 제안서 목차·스토리라인을 확정하기 전
- 경영 요약([ExecutiveSummaryTemplate](ExecutiveSummaryTemplate.md))을 작성하기 전
- 제출 전 레드팀·시뮬레이션 검증 단계

---

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| RFP 분석 보고서·숨은 기대 | [RFPAnalysisFramework](../RFP/RFPAnalysisFramework.md) |
| 평가-요구 매핑·공략 우선순위 | [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md) |
| 자사 차별점·실적 | [Company](../Company/), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md) |
| 경쟁사 분석 | [AICompetitorSimulation](AICompetitorSimulation.md) |

---

## 처리 방식

### 1. 윈 테마(Win Themes)

윈 테마 = **고객 동인 × 차별점 × 증거**의 교집합.

**작성 공식**: "[고객 동인]을 위해, 우리는 [차별점]으로 [정량 성과]를 제공한다. [증거]가 이를 뒷받침한다."

| 구성 요소 | 정의 | 출처 |
| --- | --- | --- |
| 고객 동인 | 발주처가 가장 원하는 성과 | RFP 숨은 기대 |
| 차별점 | 경쟁사가 못 주는 강점 | 자사 역량 |
| 증거 | 차별점을 입증하는 사실 | 레퍼런스·KPI |

### 2. 가치제안 캔버스

| 고객 측면 | 우리 제공 |
| --- | --- |
| 고객 과업(Jobs): 노후 포털 개편, 규제 대응, 적기 출시 | 제품·서비스: 통합 풀스펙트럼 수행 |
| 고통(Pains): 일정 압박, 접근성·보안 리스크 | 고통 해소제: 21단계 파이프라인, 게이트, WCAG 100% |
| 이득(Gains): 가시적 개선, 안정성 | 이득 창출제: 재사용 디자인 시스템, 운영 이관 자산 |

### 3. 경쟁 포지셔닝

2×2(품질 × 속도)와 차원별 비교로 "우리만의 자리"를 정의한다.

| 차원 | 경쟁사 A | 경쟁사 B | 우리(ClubSchool) |
| --- | --- | --- | --- |
| 처리 속도 | 보통 | 느림 | **빠름(AI 증강)** |
| 디자인 품질 | 높음 | 보통 | **높음(시스템 기반)** |
| 접근성·보안 | 보통 | 보통 | **강함(표준 내재화)** |
| 가격 | 높음 | 낮음 | **합리적(재사용)** |

포지셔닝 문장: "우리는 빠르면서도 품질을 시스템으로 보증하는 유일한 통합 팀이다."

### 4. 스토리라인

모든 장은 **"고객 문제 → 우리 해법 → 증거 → 기대효과"** 흐름을 반복한다.

| 장 | 내용 | 윈 테마 연결 |
| --- | --- | --- |
| 1. 경영 요약 | 핵심 메시지·윈 테마 3개 | 전체 |
| 2. 사업 이해 | as-is/to-be, 페인 포인트 | 고객 동인 |
| 3. 수행 방법론 | 21단계, 디자인 시스템 | 처리량·품질 |
| 4. 조직·일정 | 조직도, WBS, 마일스톤 | 안정성 |
| 5. 품질·보안 | 게이트, WCAG, OWASP | 규제 대응 |
| 6. 차별점·기대효과 | 정량 성과, 레퍼런스 | 증거 |
| 7. 가격 | 공수·산정 근거 | 합리성 |

---

## 출력 산출물

1. **윈 테마 시트** — 3개 내외 윈 테마(공식 적용·증거 포함).
2. **가치제안 캔버스** — 고객 과업/고통/이득 ↔ 우리 제공.
3. **경쟁 포지셔닝 맵** — 2×2 + 차원별 비교표.
4. **스토리라인 개요** — 장별 메시지·증거 매핑.
5. **제안 전략 1페이저** — 경영진 승인용 요약.

---

## 품질 기준

- 윈 테마가 고객 동인·차별점·증거를 모두 포함하는가
- 모든 평가 항목이 윈 테마/장에 대응되는가
- 차별점이 경쟁사 대비 실제로 우위인가([AICompetitorSimulation](AICompetitorSimulation.md))
- 모든 정량 성과에 증거가 붙어 있는가
- 스토리라인이 장 전체에서 일관된가

---

## 체크리스트

- [ ] 윈 테마 3개를 공식에 맞춰 작성했다
- [ ] 가치제안 캔버스를 채웠다
- [ ] 경쟁 포지셔닝 맵을 작성했다
- [ ] 스토리라인을 장별로 매핑했다
- [ ] 평가 항목 누락 없이 대응했다
- [ ] [AIEvaluationBoard](AIEvaluationBoard.md)·[AIClientSimulation](AIClientSimulation.md)으로 검증했다

---

## 예시 — 공공포털 윈 테마

> "국민 체감 사용성 향상을 위해, 검증된 디자인 시스템 재사용으로 화면 처리량을 2배 높여 7개월 일정 내 안정 출시한다. 최근 공공포털 3개 사업 적기 납품 실적이 이를 뒷받침한다."

- 고객 동인: 국민 체감 사용성(RFP 7회 반복)
- 차별점: 디자인 시스템 재사용 → 처리량 2배
- 증거: 공공포털 3개 적기 납품 실적

---

## 예시 프롬프트

```
당신은 proposal-lead 에이전트다. RFP 분석 보고서를 입력으로 제안 전략을 수립하라.
1) 윈 테마 3개(고객 동인×차별점×증거, 공식 적용)
2) 가치제안 캔버스
3) 경쟁 포지셔닝 맵(2×2 + 차원별 비교)
4) 장별 스토리라인 매핑(고객 문제→해법→증거→기대효과)
5) 경영진 승인용 1페이저
완료 후 AIEvaluationBoard, AIClientSimulation, AICompetitorSimulation으로 검증을 지시하라.
```

---

## 관련 골드위키 문서
- [05 제안 전략](../05_PROPOSAL_STRATEGY.md) — 정본.
- [ExecutiveSummaryTemplate](ExecutiveSummaryTemplate.md) — 경영 요약.
- [AIEvaluationBoard](AIEvaluationBoard.md) — 평가위원 채점.
- [AIClientSimulation](AIClientSimulation.md) — 고객 질문 시뮬레이션.
- [AICompetitorSimulation](AICompetitorSimulation.md) — 경쟁사 시뮬레이션.
- [EvaluationCriteriaAnalysis](../RFP/EvaluationCriteriaAnalysis.md) — 평가 입력.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Proposal/README.md =====

# Proposal — 제안 전략 토픽

## 폴더 목적

RFP 분석 결과를 **수주로 전환하는 제안 전략·경영 요약·시뮬레이션 도구**를 보관한다. 윈 테마와 스토리라인을 정의하고, AI 평가위원·고객·경쟁사 시뮬레이션으로 제출 전 품질을 결정적으로 끌어올린다. 21단계 파이프라인의 6·18단계(제안 전략·레드팀)를 책임진다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [ProposalStrategy.md](ProposalStrategy.md) | 윈 테마·가치제안·포지셔닝·스토리라인 |
| [ExecutiveSummaryTemplate.md](ExecutiveSummaryTemplate.md) | 경영 요약 작성 가이드 + 재사용 템플릿 |
| [AIEvaluationBoard.md](AIEvaluationBoard.md) | AI 평가위원: 7축 100점 채점·보완 처방·수주 가능성 예측 |
| [AIClientSimulation.md](AIClientSimulation.md) | AI 고객 시뮬레이션: 4관점 예상 질문·답변 강화 |
| [AICompetitorSimulation.md](AICompetitorSimulation.md) | AI 경쟁사 시뮬레이션: 경쟁 제안 예측·차별화·5축 비교 |

## 관련 GoldWiki 토픽 / 번호 문서

- [05 제안 전략](../05_PROPOSAL_STRATEGY.md) — 정본 상위 문서.
- [RFP](../RFP/README.md) — 제안 전략의 입력 토픽.
- [29 품질 체크리스트](../29_QUALITY_CHECKLIST.md) — G6 제출 게이트.
- [34 고객 지식](../34_CLIENT_KNOWLEDGE.md) — 고객 시뮬레이션 입력.
- [38 템플릿 라이브러리](../38_TEMPLATE_LIBRARY.md) — 제안서 템플릿.

## 담당 에이전트

- **Owner**: proposal-lead
- **시뮬레이션 Owner**: client-simulation-lead
- **협업**: rfp-strategy-lead, executive-director, cto-reviewer, pmo-director, documentation-lead

## 워크플로우 / 커맨드 연계

- `/generate-proposal`로 전략·경영 요약을 생성한다.
- 제출 전 AIEvaluationBoard·AIClientSimulation·AICompetitorSimulation 3종을 순차 실행해 레드팀 게이트를 통과시킨다.

> **거버넌스:** 본 토픽의 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다. 지식 중복 금지 — 정본은 링크한다.




===== 파일: GoldWiki/Publishing/HTMLCSSGuide.md =====

# 시맨틱 HTML + 토큰 기반 CSS 퍼블리싱 가이드

> 이 문서는 ClubSchool AI OS의 단일 진실 공급원(SSOT)인 GoldWiki에 속한다. 퍼블리싱 산출물을 만들기 전, 모든 에이전트와 엔지니어는 이 문서와 [디자인 시스템](../DesignSystem/README.md)·[접근성 가이드(번호형)](../16_ACCESSIBILITY.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | `publishing-lead` |
| **협업 에이전트** | `frontend-lead`, `ui-design-lead`, `design-system-lead`, `qa-lead` |
| **상위 참조** | [디자인 시스템](../DesignSystem/README.md), [디자인 토큰(번호형)](../15_DESIGN_TOKEN.md), [접근성(번호형)](../16_ACCESSIBILITY.md), [HTML 가이드(번호형)](../17_HTML_GUIDE.md), [CSS 가이드(번호형)](../18_CSS_GUIDE.md) |
| **연계** | [프론트엔드 가이드](../Frontend/FrontendGuide.md), [품질 체크리스트(번호형)](../29_QUALITY_CHECKLIST.md) |
| **최종 수정** | 2026-06-26 · **상태** 활성(Active) |

---

## 목적

퍼블리싱 단계(디자인 시안 → 동작하는 마크업)의 표준을 정의한다. 목표는 다음 네 가지를 동시에 보장하는 것이다.

1. **시맨틱(Semantic) HTML** — 의미를 가진 요소를 우선 사용해 접근성·SEO·유지보수성을 내장한다.
2. **토큰 기반 CSS** — 모든 색·간격·타이포는 [디자인 토큰](../15_DESIGN_TOKEN.md)에서 파생된 CSS 커스텀 프로퍼티만 사용한다. 하드코딩 금지.
3. **재사용 가능한 구조** — BEM 또는 데이터 속성 기반 네이밍으로 컴포넌트를 [컴포넌트 라이브러리(번호형)](../14_COMPONENT_LIBRARY.md)와 1:1 매핑한다.
4. **검증 가능성** — W3C 검사, Lighthouse, axe 자동 검사를 통과한다.

## 언제 사용하는가

- UI 디자인 확정(Figma) 후 프로토타입·랜딩·정적 페이지를 마크업할 때.
- 프론트엔드 컴포넌트 구현 전 시맨틱 골격과 토큰 매핑을 먼저 잡을 때.
- 제안서·납품물에 포함될 데모 페이지를 클라이언트 제출 품질로 만들 때.
- 디자인 시스템 변경(토큰 갱신)을 퍼블리싱 산출물에 반영할 때.

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 확정 디자인 시안 | [UI 가이드(번호형)](../08_UI_GUIDELINES.md), Figma |
| 디자인 토큰(JSON/CSS 변수) | [디자인 토큰](../15_DESIGN_TOKEN.md), [디자인 시스템](../DesignSystem/README.md) |
| 컴포넌트 명세 | [컴포넌트 라이브러리(번호형)](../14_COMPONENT_LIBRARY.md) |
| 접근성 요구사항 | [접근성(번호형)](../16_ACCESSIBILITY.md) (WCAG 2.2 AA) |
| 콘텐츠/카피 | 서비스 기획 산출물 |

## 처리 방식

### 1) 문서 골격 — 시맨틱 우선

`<div>`를 쓰기 전에 "이 콘텐츠의 의미를 가진 요소가 있는가?"를 항상 자문한다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>엔터프라이즈 디지털 컨설팅 · ClubSchool</title>
    <meta name="description" content="RFP부터 납품까지 멀티에이전트로 수행하는 AI 디지털 컨설팅." />
    <link rel="stylesheet" href="/assets/tokens.css" />
    <link rel="stylesheet" href="/assets/main.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">본문으로 건너뛰기</a>
    <header class="site-header">
      <nav aria-label="주요 메뉴"><!-- ... --></nav>
    </header>
    <main id="main">
      <section aria-labelledby="hero-title">
        <h1 id="hero-title">RFP에서 납품까지, AI가 운영하는 디지털 컨설팅</h1>
      </section>
    </main>
    <footer class="site-footer"><!-- ... --></footer>
  </body>
</html>
```

규칙: 페이지당 `<h1>` 1개, 헤딩 레벨 건너뛰기 금지(`h2`→`h4` 금지), 랜드마크(`header`/`nav`/`main`/`footer`) 명시, 의미 없는 래퍼만 `<div>`.

### 2) 토큰 레이어 — `tokens.css`

원시(primitive) → 시맨틱(semantic) 2계층으로 분리한다. 컴포넌트 CSS는 **시맨틱 토큰만** 참조한다.

```css
:root {
  /* primitive */
  --color-blue-600: #2563eb;
  --color-gray-900: #111827;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --radius-md: 8px;
  --font-sans: "Pretendard", system-ui, sans-serif;

  /* semantic (컴포넌트는 이 계층만 사용) */
  --color-bg: #ffffff;
  --color-fg: var(--color-gray-900);
  --color-accent: var(--color-blue-600);
  --color-accent-fg: #ffffff;
  --surface-radius: var(--radius-md);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0b0f19;
    --color-fg: #e5e7eb;
  }
}
```

### 3) 컴포넌트 CSS — BEM + 토큰

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--surface-radius);
  background: var(--color-accent);
  color: var(--color-accent-fg);
  border: 0;
  font: 600 1rem/1.2 var(--font-sans);
}
.btn:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 2px; }
.btn--ghost { background: transparent; color: var(--color-accent); }
```

하드코딩 색·픽셀 금지. 모든 값은 토큰 변수로. 매직 넘버는 PR에서 반려한다.

### 4) 반응형·레이아웃

- 모바일 퍼스트, `min-width` 미디어 쿼리. 브레이크포인트는 토큰화(`--bp-md: 768px`).
- 레이아웃은 Flexbox/Grid 우선. `float`·절대 위치 남용 금지.
- 컨테이너 쿼리(`@container`)로 컴포넌트 단위 반응형을 권장.

### 5) 성능·자산

- 이미지: `loading="lazy"`, `width`/`height` 명시(CLS 방지), 최신 포맷(AVIF/WebP) + fallback.
- 폰트: `font-display: swap`, 서브셋, preload.
- Critical CSS 인라인, 나머지 비동기 로드.

## 출력 산출물

| 산출물 | 설명 |
| --- | --- |
| `*.html` | 시맨틱 마크업 페이지(검증 통과) |
| `tokens.css` | 토큰 정의(원시+시맨틱) |
| `main.css` / 컴포넌트 CSS | BEM·토큰 기반 스타일 |
| 마크업 명세서 | 컴포넌트↔클래스 매핑 표 |
| 검사 리포트 | W3C·Lighthouse·axe 결과 |

## 품질 기준

- [ ] W3C 마크업 검사 0 오류.
- [ ] 헤딩 위계 정상, 페이지당 `<h1>` 1개.
- [ ] 모든 색·간격·타이포가 토큰 변수 참조(하드코딩 0건).
- [ ] WCAG 2.2 AA: 대비 4.5:1 이상, 포커스 가시성, 키보드 전체 조작.
- [ ] axe 자동 검사 critical 0건.
- [ ] Lighthouse 성능·접근성·SEO 각 90+ (납품 기준).
- [ ] 다크모드·축소 모션(`prefers-reduced-motion`) 대응.

## 체크리스트

- [ ] `lang` 속성, `viewport`, `title`, `meta description` 작성.
- [ ] 랜드마크(`header/nav/main/footer`)와 skip-link 포함.
- [ ] 폼: `<label for>` 연결, 오류 메시지 `aria-describedby`.
- [ ] 이미지 `alt`(장식은 `alt=""`), 아이콘 버튼 `aria-label`.
- [ ] 인라인 스타일·인라인 이벤트 핸들러 0건.
- [ ] 토큰 변경 시 [디자인 토큰](../15_DESIGN_TOKEN.md)·[의사결정 로그](../DecisionLog/README.md) 동기화.

## 예시 프롬프트

```
역할: publishing-lead. GoldWiki Publishing/HTMLCSSGuide.md와 15_DESIGN_TOKEN.md를 먼저 읽어라.
작업: 첨부 Figma '요금제' 섹션을 시맨틱 HTML + 토큰 기반 CSS로 퍼블리싱.
제약: <div> 최소화, BEM, 시맨틱 토큰만 사용, WCAG 2.2 AA, 다크모드 대응.
출력: pricing.html, pricing.css, 컴포넌트↔클래스 매핑 표, axe/Lighthouse 자가검사 결과.
완료 후 frontend-lead에 핸드오프하고 DecisionLog에 토큰 사용 내역을 남겨라.
```

---

### 관련 문서
[Publishing README](README.md) · [프론트엔드 가이드](../Frontend/FrontendGuide.md) · [디자인 시스템](../DesignSystem/README.md) · [17_HTML_GUIDE](../17_HTML_GUIDE.md) · [18_CSS_GUIDE](../18_CSS_GUIDE.md) · [29_QUALITY_CHECKLIST](../29_QUALITY_CHECKLIST.md)




===== 파일: GoldWiki/Publishing/README.md =====

# Publishing — 퍼블리싱 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 퍼블리싱 작업 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

디자인 시안을 시맨틱 HTML과 토큰 기반 CSS로 전환하는 **퍼블리싱 표준**을 관리한다. 접근성·성능·재사용성을 마크업 단계에서 내장해, 프론트엔드 구현과 클라이언트 납품물의 품질을 일관되게 보장한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [HTMLCSSGuide.md](HTMLCSSGuide.md) | 시맨틱 HTML + 토큰 기반 CSS 퍼블리싱 가이드(8섹션, 코드 예제 포함) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [DesignSystem](../DesignSystem/README.md), [Frontend](../Frontend/FrontendGuide.md), [UI](../UI/README.md)
- 번호형: [14_COMPONENT_LIBRARY](../14_COMPONENT_LIBRARY.md), [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md), [16_ACCESSIBILITY](../16_ACCESSIBILITY.md), [17_HTML_GUIDE](../17_HTML_GUIDE.md), [18_CSS_GUIDE](../18_CSS_GUIDE.md), [29_QUALITY_CHECKLIST](../29_QUALITY_CHECKLIST.md)

## 담당 에이전트

- **주담당**: `publishing-lead`
- **협업**: `frontend-lead`, `ui-design-lead`, `design-system-lead`, `qa-lead`

## 사용 흐름

1. UI 확정 시안과 [디자인 토큰](../15_DESIGN_TOKEN.md)을 입력으로 받는다.
2. [HTMLCSSGuide.md](HTMLCSSGuide.md)의 8섹션 절차로 시맨틱 마크업·토큰 CSS를 작성한다.
3. W3C·axe·Lighthouse 자가검사 후 `frontend-lead`에 핸드오프한다.
4. 결과·토큰 사용 내역을 [의사결정 로그](../DecisionLog/README.md)에 갱신한다.

## 거버넌스

모든 퍼블리싱 산출물은 토큰 변수만 사용하고 WCAG 2.2 AA·성능 예산을 충족해야 하며, 토큰·구조 변경은 [의사결정 로그](../DecisionLog/README.md)에 기록한다.




===== 파일: GoldWiki/QA/QualityReviewChecklist.md =====

# 품질 검증 체크리스트 (Quality Review Checklist)

## 목적

ClubSchool AI OS의 모든 산출물이 클라이언트 제출·임원 보고·최종 납품 전에 통과해야 하는 **10단계 품질 검증 체계**를 정의한다. 본 문서는 GoldWiki SSOT의 품질 게이트 정본으로서, 모든 산출 에이전트가 자기 산출물을 자가 검증하고 `qa-lead`가 교차 검증하는 단일 기준을 제공한다. 마스터 품질 체크리스트([../29_QUALITY_CHECKLIST.md](../29_QUALITY_CHECKLIST.md))를 RFP→납품 전 과정에 맞춰 단계화·심화한 실행 도구다.

> 모든 에이전트는 검증 전 GoldWiki를 먼저 참조한다. 본 체크리스트의 판정 결과·반복 결함은 [../DecisionLog/](../DecisionLog/)와 [../39_COMMON_ERRORS.md](../39_COMMON_ERRORS.md)에 누적해 조직 학습으로 환원한다.

## 언제 사용하는가

- 제안서·RFP 분석·UX/UI 산출물·기술 설계·WBS 등 모든 주요 산출물의 **게이트 통과 직전**.
- `qa-lead`가 다른 에이전트의 산출물을 교차 검증할 때.
- `executive-director`의 최종 승인 직전, `pmo-director`의 단계 종료 판정 시.
- 클라이언트 제출본·임원 보고본·최종 납품본 확정 전 (3중 게이트).

## 입력 정보

| 입력 | 출처 | 비고 |
| --- | --- | --- |
| 검증 대상 산출물 | 각 산출 에이전트 | 버전·작성자 명시 필수 |
| 원본 RFP / 과업지시서 | [../RFP/](../RFP/) | 요구사항 추적표 포함 |
| 평가기준·배점표 | [../03_RFP_FRAMEWORK.md](../03_RFP_FRAMEWORK.md) | 정량/정성 배점 |
| 제안 전략·win theme | [../05_PROPOSAL_STRATEGY.md](../05_PROPOSAL_STRATEGY.md) | |
| 베스트프랙티스 근거 | [../37_BEST_PRACTICES.md](../37_BEST_PRACTICES.md), [../36_REFERENCE_LIBRARY.md](../36_REFERENCE_LIBRARY.md) | |
| 이전 결함 이력 | [../39_COMMON_ERRORS.md](../39_COMMON_ERRORS.md), [../35_PROJECT_MEMORY.md](../35_PROJECT_MEMORY.md) | 재발 방지 |

## 처리 방식

검증은 아래 **10단계**를 순차로 수행한다. 각 단계는 독립 게이트이며, 한 단계라도 **불합격(Fail)** 이면 산출물은 반려된다. 단계별 판정은 합격(Pass) / 조건부 합격(Conditional) / 불합격(Fail) 3등급으로 기록한다.

```mermaid
flowchart LR
  S1[1.RFP 이해도] --> S2[2.요구사항 누락]
  S2 --> S3[3.평가항목 대응]
  S3 --> S4[4.UX/UI 실현]
  S4 --> S5[5.기술 구현]
  S5 --> S6[6.일정/WBS]
  S6 --> S7[7.리스크 대응]
  S7 --> S8[8.고객 설득력]
  S8 --> S9[9.임원 보고]
  S9 --> S10[10.최종 제출]
  S10 --> G{전 단계 Pass?}
  G -- 예 --> R[게이트 통과]
  G -- 아니오 --> X[반려·재작업]
```

**판정 등급 공통 정의**

| 등급 | 기준 | 후속 조치 |
| --- | --- | --- |
| Pass | 해당 단계 체크 항목 100% 충족 | 다음 단계 진행 |
| Conditional | 경미 결함 1~2건, 치명 결함 없음 | 보완 후 재확인, 게이트 통과 보류 |
| Fail | 치명 결함 1건 이상 또는 체크 80% 미만 | 즉시 반려, 재작업 |

### 1. RFP 이해도 검증

발주처의 명시적 요구와 사업 배경·목적을 정확히 이해했는지 검증한다.

- [ ] 사업 목적·배경·기대효과를 한 문단으로 요약할 수 있다.
- [ ] 발주처의 조직·산업 맥락([../Industry/](../Industry/), [../34_CLIENT_KNOWLEDGE.md](../34_CLIENT_KNOWLEDGE.md))이 반영되었다.
- [ ] 과업 범위(In/Out of scope)가 명확히 구분되었다.
- [ ] 숨은 기대(미명시 동기·정치적 맥락)가 식별되었다.
- [ ] 모호·상충 조항이 가정(assumption)으로 문서화되었다.

**판정 기준:** 사업 목적·범위·숨은 기대 3요소 모두 문서화 시 Pass. 숨은 기대 미식별 시 Conditional, 사업 목적 오해 시 Fail.

### 2. 요구사항 누락 검증

RFP의 모든 요구사항이 산출물에 추적·반영되었는지 검증한다.

- [ ] 요구사항 추적표(traceability matrix)가 존재하고 100% 매핑된다.
- [ ] 기능/비기능 요구사항이 각각 누락 없이 대응된다.
- [ ] 의무(must)·선택(should)·우대(nice) 요구가 구분 표기되었다.
- [ ] 미대응 항목에 대해 사유·대안이 명시되었다.

**판정 기준:** 의무 요구 누락 0건이면 Pass. 선택 요구 누락 시 Conditional, 의무 요구 누락 시 Fail.

### 3. 평가항목 대응 검증

평가기준·배점에 산출물이 전략적으로 대응하는지 검증한다.

- [ ] 평가표의 모든 항목·배점에 대응 콘텐츠가 매핑되었다.
- [ ] 고배점 항목에 콘텐츠·근거가 집중 배치되었다.
- [ ] 정량 평가(가격·실적·인력)와 정성 평가(전략·창의)가 모두 커버된다.
- [ ] win theme이 평가위원 관점에서 명료하게 드러난다.

**판정 기준:** 전 평가항목 대응 + 고배점 집중 시 Pass. 고배점 항목 근거 부족 시 Conditional, 평가항목 미대응 시 Fail.

### 4. UX/UI 실현 가능성 검증

제안한 UX/UI가 사용자·범위·기술 제약 내에서 실현 가능한지 검증한다.

- [ ] IA·플로우가 사용자 멘탈 모델과 일치한다([../UX/](../UX/), [../07_UX_PRINCIPLES.md](../07_UX_PRINCIPLES.md)).
- [ ] 화면 목록·디자인이 과업 범위·기간 내 구현 가능하다.
- [ ] 접근성 기준(WCAG 2.1 AA)이 반영되었다([../16_ACCESSIBILITY.md](../16_ACCESSIBILITY.md)).
- [ ] 디자인 시스템·토큰과 일관된다([../DesignSystem/](../DesignSystem/)).

**판정 기준:** 범위 내 구현 가능 + 접근성 반영 시 Pass. 접근성 누락 시 Conditional, 범위 초과 설계 시 Fail.

### 5. 기술 구현 가능성 검증

아키텍처·기술 스택·통합 방안이 구현 가능하고 안전한지 검증한다.

- [ ] 아키텍처가 비기능 요구(성능·보안·확장성)를 충족한다([../Backend/](../Backend/), [../21_BACKEND_GUIDE.md](../21_BACKEND_GUIDE.md)).
- [ ] API·데이터 모델 표준을 준수한다([../22_API_STANDARD.md](../22_API_STANDARD.md), [../23_DATABASE_GUIDE.md](../23_DATABASE_GUIDE.md)).
- [ ] 보안·개인정보 요건(OWASP 등)이 반영되었다([../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md)).
- [ ] 외부 연동·레거시 마이그레이션 리스크가 평가되었다.

**판정 기준:** 비기능 충족 + 보안 반영 시 Pass. 통합 리스크 미평가 시 Conditional, 구현 불가 설계 시 Fail.

### 6. 일정/WBS 현실성 검증

WBS·일정·공수가 현실적이고 내적 일관성을 갖는지 검증한다.

- [ ] WBS가 [../PMO/WBSGuide.md](../PMO/WBSGuide.md) 분해 원칙을 준수한다.
- [ ] 공수 산정 근거가 명시되고 가용 인력과 일치한다.
- [ ] 의존성·임계경로(critical path)가 식별되었다.
- [ ] 버퍼·마일스톤·게이트가 일정에 반영되었다.

**판정 기준:** 임계경로 식별 + 공수 근거 명시 시 Pass. 버퍼 부재 시 Conditional, 일정-범위 불일치 시 Fail.

### 7. 리스크 대응 검증

주요 리스크가 식별·평가·대응되었는지 검증한다.

- [ ] 리스크 등록부(발생가능성×영향도)가 존재한다.
- [ ] 상위 리스크별 완화·우발 계획(mitigation/contingency)이 있다.
- [ ] 리스크 소유자(owner)와 트리거가 지정되었다.
- [ ] 보안·법규·일정 리스크가 별도 점검되었다([../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md)).

**판정 기준:** 상위 리스크 대응계획 + 소유자 지정 시 Pass. 트리거 미정의 시 Conditional, 치명 리스크 누락 시 Fail.

### 8. 고객 설득력 검증

산출물이 고객·평가위원을 설득할 수 있는 서사·근거를 갖는지 검증한다.

- [ ] 스토리라인이 고객 문제→해결→가치 순으로 논리적이다.
- [ ] 차별화 포인트가 경쟁사 대비 구체적으로 입증된다.
- [ ] 정량 효과(ROI·KPI)가 근거와 함께 제시되었다.
- [ ] `client-simulation-lead` 모의 평가를 통과했다.

**판정 기준:** 스토리라인 일관 + 차별화 입증 시 Pass. 정량 효과 근거 부족 시 Conditional, 설득 서사 부재 시 Fail.

### 9. 임원 보고 적합성 검증

임원·의사결정자에게 보고 가능한 압축성·명료성을 갖는지 검증한다.

- [ ] 경영 요약이 1~2페이지로 핵심을 압축한다([../../Templates/Executive_Summary.md](../../Templates/Executive_Summary.md)).
- [ ] 의사결정 요청 사항·옵션·권고가 명확하다.
- [ ] 리스크·비용·기대효과가 한눈에 보인다(표/차트).
- [ ] 전문용어가 임원 눈높이로 풀이되었다.

**판정 기준:** 요약 1~2p + 의사결정 포인트 명확 시 Pass. 권고 모호 시 Conditional, 핵심 누락 시 Fail.

### 10. 최종 제출 적합성 검증

제출 형식·완결성·법적/행정 요건을 최종 확인한다.

- [ ] 제출 형식·분량·파일 규격이 RFP 지침과 일치한다.
- [ ] 목차·페이지·서식·로고 등 행정 요건이 충족된다.
- [ ] 오탈자·수치 오류·링크 깨짐이 없다(전수 교정).
- [ ] [../Delivery/FinalDeliveryChecklist.md](../Delivery/FinalDeliveryChecklist.md) 납품 게이트와 정합한다.
- [ ] 모든 내용이 자연스러운 한국어로 작성되었다.

**판정 기준:** 형식·완결성·교정 모두 충족 시 Pass. 경미 오탈자 시 Conditional, 형식 위반·핵심 누락 시 Fail.

## 출력 산출물

- **품질 검증 보고서**: 10단계별 판정 등급·결함 목록·보완 요구사항.
- **게이트 판정서**: 통과/반려 결정 및 사유.
- **결함 등록 항목**: 반복 결함을 [../39_COMMON_ERRORS.md](../39_COMMON_ERRORS.md)에 누적.
- **DecisionLog 항목**: 중대 판정·예외 승인을 [../DecisionLog/](../DecisionLog/)에 기록.

## 품질 기준

- 10단계 전 단계가 Pass여야 게이트 통과(Conditional은 보완 후 재검).
- 모든 판정에 근거·증빙이 첨부된다(주관 판정 금지).
- 검증자는 산출 작성자와 분리된다(자가 검증 후 `qa-lead` 교차 검증).
- 판정 결과는 추적 가능하게 버전·일시·검증자와 함께 기록된다.

## 체크리스트

- [ ] 10단계 검증을 모두 수행했다.
- [ ] 각 단계 판정 등급(Pass/Conditional/Fail)을 기록했다.
- [ ] Fail·Conditional 항목의 보완 요구를 명시했다.
- [ ] 반복 결함을 공통 오류 문서에 누적했다.
- [ ] 게이트 판정서를 작성하고 승인 라인에 인계했다.

## 예시 프롬프트

```text
당신은 qa-lead다. GoldWiki/QA/QualityReviewChecklist.md의 10단계 품질 검증 체계로
아래 제안서 초안을 교차 검증하라.

대상: {제안서 v0.3}
참조: 원본 RFP, 평가배점표, 제안 전략(05), 베스트프랙티스(37)

각 단계(1~10)별로 다음을 출력하라:
- 판정 등급(Pass/Conditional/Fail)
- 충족/미충족 체크 항목
- 결함과 보완 요구사항(우선순위 포함)

마지막에 게이트 통과 여부와 사유, DecisionLog에 기록할 항목을 요약하라.
모든 출력은 한국어로 작성한다.
```




===== 파일: GoldWiki/QA/README.md =====

# QA — 품질 보증 토픽

## 폴더 목적

ClubSchool AI OS의 모든 산출물이 클라이언트 제출·임원 보고·최종 납품 전에 충족해야 할 **품질 검증 체계**를 정의한다. 자가 검증과 교차 검증의 단일 기준을 제공하고, 게이트 통과·반려 판정을 표준화해 일관된 품질을 보장한다. GoldWiki SSOT의 품질 게이트 정본 토픽이다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [QualityReviewChecklist.md](QualityReviewChecklist.md) | 10단계 품질 검증 체계(RFP 이해도→최종 제출 적합성)와 단계별 판정 기준 |

## 관련 GoldWiki 토픽 / 번호 문서

- [../29_QUALITY_CHECKLIST.md](../29_QUALITY_CHECKLIST.md) — 마스터 품질 체크리스트(분야별 DoD)
- [../30_TEST_STRATEGY.md](../30_TEST_STRATEGY.md) — 테스트 전략
- [../31_RELEASE_PROCESS.md](../31_RELEASE_PROCESS.md) — 릴리스 프로세스
- [../39_COMMON_ERRORS.md](../39_COMMON_ERRORS.md) — 공통 오류(반복 결함 누적)
- [../37_BEST_PRACTICES.md](../37_BEST_PRACTICES.md) — 베스트프랙티스 근거
- [../PMO/](../PMO/) — 일정/WBS 현실성 검증 연계
- [../Delivery/](../Delivery/) — 최종 납품 게이트 연계
- [../DecisionLog/](../DecisionLog/) — 중대 판정·예외 기록

## 담당 에이전트

- **주담당:** `qa-lead` (품질 검증 총괄·교차 검증)
- **협업:** `security-risk-lead`(보안·리스크 검증), `executive-director`(최종 승인), `pmo-director`(단계 게이트 판정), 모든 산출 에이전트(자가 검증)

## 거버넌스

모든 산출물은 게이트 통과 전 본 토픽의 10단계 검증을 거치며, 한 단계라도 불합격이면 반려된다. 반복 결함은 [공통 오류](../39_COMMON_ERRORS.md)에 누적하고 중대 판정은 [DecisionLog](../DecisionLog/)에 기록한다.




===== 파일: GoldWiki/RFP/EvaluationCriteriaAnalysis.md =====

# 평가기준 분석 (Evaluation Criteria Analysis)

> 이 문서는 RFP 평가표를 분해하여 요구·전략에 매핑하고, 점수를 만드는 곳에 자원을 집중하는 방법을 정의한다. 모든 에이전트는 [RFP 분석 프레임워크](RFPAnalysisFramework.md)와 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | rfp-strategy-lead |
| **협업 에이전트** | proposal-lead, business-analysis-lead, executive-director |
| **정본 상위 문서** | [04 RFP 심층 분석](../04_RFP_ANALYSIS.md), [05 제안 전략](../05_PROPOSAL_STRATEGY.md) |
| **연계 토픽** | [RequirementExtraction](RequirementExtraction.md), [Proposal 전략](../Proposal/ProposalStrategy.md), [AIEvaluationBoard](../Proposal/AIEvaluationBoard.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

발주처의 평가표(배점·세부 기준·정성/정량 방식)를 정밀 분해하여, **각 점수를 누가·어떤 요구로·어떤 증거로 획득할지**를 설계한다. 평가기준 분석은 윈 전략과 자원 배분, 제안서 목차의 골격을 결정한다.

---

## 언제 사용하는가

- RFP 분석 5단계(평가기준 분석)에서
- 제안 전략의 윈 테마·우선순위를 정할 때
- 제안서 목차와 분량(장별 가중)을 배분할 때
- 제출 전 [AIEvaluationBoard](../Proposal/AIEvaluationBoard.md)로 자체 채점할 때

---

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 평가 배점표·세부 평가 기준 | RFP 평가 부문 |
| 정량/정성 평가 방식·평가위원 구성 | 공고·관행 |
| 요구사항 매트릭스 | [RequirementExtraction](RequirementExtraction.md) |
| 자사 강점·레퍼런스 | [Company](../Company/), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md) |

---

## 처리 방식

### 분석 절차
1. **배점표 구조화** — 대분류·세부 항목·배점·평가 방식(정량/정성)을 표로 정리.
2. **요구 매핑** — 각 평가 항목에 기여하는 요구 ID를 연결.
3. **점수 기여도 산정** — 항목별 획득 난이도와 우리 강점 적합도를 평가.
4. **공략 우선순위** — 배점 × 승산 × 차별 가능성으로 우선순위화(High/Mid/Low).
5. **대응 전략 수립** — 항목별 "어떤 증거로 만점을 노릴지" 정의.
6. **자원·분량 배분** — 배점 비중에 비례해 제안서 분량·전문가 투입을 배분.

### 정량 vs 정성 평가 구분

| 구분 | 특징 | 공략 |
| --- | --- | --- |
| 정량(가격·실적·인력 자격) | 객관 산식, 변별 작음 | 감점 회피·요건 충족 |
| 정성(기술·이해도·창의성) | 평가위원 주관, 변별 큼 | 윈 테마·서사·증거로 차별화 |

---

## 출력 산출물

### 평가-요구 매핑표

| 평가 항목 | 배점 | 방식 | 연결 요구 | 우리 강점 | 획득 난이도 | 공략 우선순위 | 대응 전략 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 사업 이해도 | 15 | 정성 | R-001~005 | 통합 풀스펙트럼 | 중 | High | as-is/to-be로 이해 증명 |
| 기술 방법론 | 30 | 정성 | R-010~021 | 디자인 시스템·접근성 | 중 | High | 검증된 표준·21단계 제시 |
| 수행 조직·일정 | 20 | 정성 | — | AI 증강 처리량 | 하 | Mid | 조직도·WBS·마일스톤 |
| 보안·품질 | 20 | 정성 | SEC-030~ | OWASP·게이트 통제 | 중 | High | 보안·QA 게이트 |
| 가격 | 15 | 정량 | — | 재사용 자산 | 하 | Mid | 합리적 공수 산정 |

### 배점-분량 배분표

| 장 | 대응 평가 항목 | 배점 합 | 권장 분량 비중 |
| --- | --- | --- | --- |
| 사업 이해 | 사업 이해도 | 15 | 15% |
| 수행 방법론 | 기술 방법론 | 30 | 30% |
| 조직·일정 | 수행 조직·일정 | 20 | 20% |
| 품질·보안 | 보안·품질 | 20 | 20% |
| 가격 | 가격 | 15 | 15% |

---

## 품질 기준

- 모든 배점 항목이 요구·전략·증거에 연결되었는가
- 정성 항목에 차별화 서사와 증거(레퍼런스·KPI)가 있는가
- 정량 항목에서 감점 요인(요건 미충족)이 0인가
- 배점 비중과 제안서 분량·자원이 정합하는가
- 공략 우선순위가 배점×승산으로 합리적인가

---

## 체크리스트

- [ ] 배점표를 대분류·세부·방식으로 구조화했다
- [ ] 평가 항목별 연결 요구 ID를 매핑했다
- [ ] 점수 기여도와 획득 난이도를 산정했다
- [ ] 공략 우선순위(High/Mid/Low)를 부여했다
- [ ] 항목별 대응 전략과 증거를 정의했다
- [ ] 배점-분량 배분표로 제안서 자원을 배분했다

---

## 예시 — 기술 70 : 가격 30 공공포털 RFP

> 기술 70점 = 사업이해 15 + 기술방법론 30 + 조직·일정 10 + 품질·보안 15, 가격 30점.

| 평가 항목 | 배점 | 우리 강점 | 대응 전략 | 예상 획득 |
| --- | --- | --- | --- | --- |
| 사업 이해도 | 15 | 여정 분석 역량 | 페인 포인트 7건 정량 제시 | 13~14 |
| 기술 방법론 | 30 | 디자인 시스템·21단계 | 재사용 효과 2배 정량 입증 | 26~28 |
| 조직·일정 | 10 | AI 증강 처리량 | 7개월 마일스톤·버퍼 명시 | 8~9 |
| 품질·보안 | 15 | 게이트·WCAG·OWASP | 컴플라이언스 100% 매트릭스 | 13~14 |
| 가격 | 30 | 재사용 자산 | 가치 기반 가격(저배점 아님→감점 회피) | 26~28 |

**판단**: 가격 30점 비중이 높으므로 정량 감점 회피가 핵심. 기술 방법론(30점)이 최대 변별 영역 → 디자인 시스템 재사용 효과를 윈 테마로 승화([Proposal 전략](../Proposal/ProposalStrategy.md)). 예상 총점 86~93점으로 제출 전 [AIEvaluationBoard](../Proposal/AIEvaluationBoard.md) 재검증.

---

## 예시 프롬프트

```
당신은 rfp-strategy-lead 에이전트다. RFP 평가표를 분석하라.
1) 배점표를 대분류·세부·정량/정성 방식으로 구조화
2) 각 항목에 연결 요구 ID 매핑, 우리 강점 적합도 평가
3) 배점×승산×차별로 공략 우선순위(High/Mid/Low)
4) 항목별 대응 전략과 증거(레퍼런스/KPI) 정의
5) 배점-분량 배분표로 제안서 자원 배분 권고
산출물은 Proposal/ProposalStrategy.md의 윈 테마 입력으로 인계하라.
```

---

## 관련 골드위키 문서
- [RFPAnalysisFramework](RFPAnalysisFramework.md) — 분석이 속한 5단계.
- [RequirementExtraction](RequirementExtraction.md) — 요구-배점 연결.
- [05 제안 전략](../05_PROPOSAL_STRATEGY.md) — 윈 테마 정본.
- [Proposal 전략](../Proposal/ProposalStrategy.md) — 전략 인계.
- [AIEvaluationBoard](../Proposal/AIEvaluationBoard.md) — 자체 채점 검증.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/RFP/README.md =====

# RFP — RFP 분석 토픽

## 폴더 목적

RFP(제안요청서)를 접수하여 윈 전략과 비즈니스 분석으로 인계하기까지의 **분석 표준·방법·템플릿**을 보관한다. ClubSchool AI OS 21단계 파이프라인의 전반부(1~9단계)를 책임지는 토픽이며, 여기서 만든 산출물이 [Proposal](../Proposal/README.md) 토픽의 입력이 된다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [RFPAnalysisFramework.md](RFPAnalysisFramework.md) | RFP 분석 프레임워크(접수~9단계, 분류, 게이트 G1·G2) |
| [RequirementExtraction.md](RequirementExtraction.md) | 요구사항 추출 방법·8개 분류·추적성(RTM)·템플릿·예시 |
| [EvaluationCriteriaAnalysis.md](EvaluationCriteriaAnalysis.md) | 평가기준 분석·배점 매핑·대응 전략·배점-분량 배분 |

## 관련 GoldWiki 토픽 / 번호 문서

- [03 RFP 대응 프레임워크](../03_RFP_FRAMEWORK.md) — 정본 상위 프레임워크.
- [04 RFP 심층 분석](../04_RFP_ANALYSIS.md) — 분석 플레이북 정본.
- [Proposal](../Proposal/README.md) — 9단계 인계 대상 토픽.
- [Business](../Business/README.md) — 요구 정교화·WBS.
- [Industry](../Industry/README.md) — 발주처 업종 특성·숨은 기대 해석.
- [27 자동화 워크플로우](../27_AUTOMATION_WORKFLOW.md) — 21단계 파이프라인 정본.

## 담당 에이전트

- **Owner**: rfp-strategy-lead
- **협업**: business-analysis-lead, proposal-lead, industry-research-lead, pmo-director, security-risk-lead, cto-reviewer

## 워크플로우 / 커맨드 연계

- 슬래시 커맨드 `/analyze-rfp`로 1~9단계를 구동한다.
- 게이트 G1(Bid/No-Bid)·G2(분석 완결성)를 통과해야 제안 전략으로 진행한다.

> **거버넌스:** 본 토픽의 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다. 지식 중복 금지 — 정본은 링크한다.




===== 파일: GoldWiki/RFP/RFPAnalysisFramework.md =====

# RFP 분석 프레임워크

> 이 문서는 ClubSchool AI OS의 RFP 대응 21단계 파이프라인 중 **1~9단계(접수~제안 전략 인계)**를 표준화한다. 모든 에이전트는 RFP 작업 전 본 프레임워크와 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | rfp-strategy-lead |
| **협업 에이전트** | business-analysis-lead, proposal-lead, industry-research-lead, pmo-director, cto-reviewer |
| **정본 상위 문서** | [03 RFP 대응 프레임워크](../03_RFP_FRAMEWORK.md), [04 RFP 심층 분석](../04_RFP_ANALYSIS.md) |
| **연계 토픽** | [RequirementExtraction](RequirementExtraction.md), [EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md), [Proposal 전략](../Proposal/ProposalStrategy.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

RFP(제안요청서)를 접수한 순간부터 윈 전략과 비즈니스 분석으로 인계하기까지의 절차를 단계화·게이트화하여, **누락 없이·추적 가능하게·점수를 만드는 방향으로** RFP를 분해한다. 본 프레임워크는 21단계 파이프라인([27 자동화 워크플로우](../27_AUTOMATION_WORKFLOW.md))의 전반부(1~9단계)를 책임진다.

---

## 언제 사용하는가

- 신규 RFP·제안요청서·사업계획서·기획요청을 접수했을 때
- 입찰 참여 여부(Bid/No-Bid)를 의사결정해야 할 때
- 요구사항·평가기준·제약을 구조화하여 제안 전략의 입력을 만들 때
- 기존 분석을 재검토(레드팀)하여 누락·상충을 찾을 때

---

## 입력 정보

| 입력 | 출처 | 비고 |
| --- | --- | --- |
| RFP 원문(본문·붙임·과업지시서) | 발주처 | PDF/HWP/문서 |
| 사전규격·질의응답·정정공고 | 조달 공고 | 변경 추적 필수 |
| 발주처 배경·정책 동인 | [01 회사 컨텍스트](../01_COMPANY_CONTEXT.md), [Industry](../Industry/) | 숨은 기대 해석용 |
| 과거 유사 사업·레퍼런스 | [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md) | 벤치마킹 |
| 자사 역량·자산 현황 | [Company](../Company/), [38 템플릿 라이브러리](../38_TEMPLATE_LIBRARY.md) | 강점 매핑 |

---

## 처리 방식 — 1~9단계

```mermaid
flowchart LR
  S1[1.접수·등록] --> S2[2.Bid/No-Bid]
  S2 -->|Go| S3[3.정독·분해]
  S3 --> S4[4.요구추출]
  S4 --> S5[5.평가기준분석]
  S5 --> S6[6.숨은기대탐지]
  S6 --> S7[7.리스크식별]
  S7 --> S8[8.벤치마킹]
  S8 --> S9[9.분석보고서·인계]
  S2 -->|No-Go| X[종료·기록]
```

### 단계별 상세

| 단계 | 명칭 | 핵심 활동 | 산출물 | 담당 |
| --- | --- | --- | --- | --- |
| 1 | 접수·등록 | RFP를 SSOT에 등록, 추적 ID 부여, 마감·예산·배점 메타 기록 | RFP 등록 카드 | rfp-strategy-lead |
| 2 | Bid/No-Bid 판단 | 적합도·승산·수익성·리스크 4축 채점, 게이트 G1 | Bid/No-Bid 결정서 | executive-director |
| 3 | 정독·분해 | 문단 번호 부여(R-001…), 요구/평가/제약/의도 4렌즈 태깅 | 태깅된 RFP | rfp-strategy-lead |
| 4 | 요구사항 추출 | 기능·비기능·제약·컴플라이언스 추출, 추적 ID | 요구사항 매트릭스 | business-analysis-lead |
| 5 | 평가기준 분석 | 배점표↔요구 매핑, 점수 기여도 산정 | 평가-요구 매핑표 | rfp-strategy-lead |
| 6 | 숨은 기대 탐지 | 반복 키워드·정책 동인·실패 언급 신호 해석 | 인텐트 노트 | industry-research-lead |
| 7 | 리스크 식별 | 기술·일정·규제·보안 리스크 레지스터화 | 리스크 레지스터 | pmo-director, security-risk-lead |
| 8 | 경쟁·벤치마킹 | 경쟁사 식별, 포지셔닝 2×2, 베스트프랙티스 수집 | 경쟁 분석 노트 | proposal-lead |
| 9 | 분석 보고서·인계 | 통합 RFP 분석 보고서 작성, 게이트 G2, 전략 인계 | RFP 분석 보고서 | rfp-strategy-lead |

### 4렌즈 동시 독해

| 렌즈 | 핵심 질문 | 산출 |
| --- | --- | --- |
| 요구(Requirements) | 무엇을 만들어야 하는가 | 기능/비기능 목록 |
| 평가(Evaluation) | 어떻게 채점되는가 | 배점-요구 매핑 |
| 제약(Constraints) | 예산·기간·기술·규정 한계는 | 제약 목록 |
| 의도(Intent) | 발주처가 진짜 원하는 성과는 | 숨은 기대·동인 |

---

## 출력 산출물

1. **RFP 등록 카드** — 사업명, 발주처, 예산, 기간, 마감, 기술/가격 배점, 추적 ID.
2. **Bid/No-Bid 결정서** — 4축 점수, 결정, 근거([32 의사결정 로그](../32_DECISION_LOG.md) 기록).
3. **요구사항 매트릭스** — [RequirementExtraction](RequirementExtraction.md) 템플릿 적용.
4. **평가-요구 매핑표** — [EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md) 적용.
5. **리스크 레지스터** — 등급·대응·담당 포함.
6. **RFP 분석 보고서** — 위 산출물을 통합한 단일 문서, 제안 전략의 입력.

---

## 분류 체계

RFP는 다음 축으로 분류하여 대응 전략과 자원 배분을 결정한다.

| 분류 축 | 값 | 영향 |
| --- | --- | --- |
| 발주 유형 | 공공 / 민간 / 준정부 | 평가·계약 방식 상이 |
| 사업 성격 | 신규 구축 / 고도화 / 운영 / 컨설팅 | 방법론·공수 |
| 배점 구조 | 기술 우위(70:30) / 가격 우위(60:40 등) | 윈 전략 방향 |
| 규모 | 소(<3억) / 중(3~10억) / 대(>10억) | 조직·게이트 강도 |
| 난이도 | 표준 / 복합 / 고난도 | 리스크 버퍼 |

---

## 품질 기준 / 게이트

| 게이트 | 위치 | 통과 조건 |
| --- | --- | --- |
| **G1 — Bid/No-Bid** | 2단계 후 | 4축 적합도 평균 60% 이상, 승산·수익성 양호 |
| **G2 — 분석 완결성** | 9단계 후 | 요구 추적성 100%, 컴플라이언스 항목 누락 0, 자체 채점 80% 이상 |

- 모든 강제 표현("필수/하여야 한다/shall/must")은 컴플라이언스 항목으로 승격되었는가
- 모든 요구가 추적 ID로 평가 배점에 연결되었는가
- 모호·상충 항목이 Q&A 후보로 분류되었는가
- 고위험(High) 리스크가 [32 의사결정 로그](../32_DECISION_LOG.md)에 기록되었는가

---

## 체크리스트

- [ ] RFP 원문·붙임·정정공고를 모두 확보했다
- [ ] 추적 ID 체계(R-NNN)를 부여했다
- [ ] 4렌즈 태깅을 완료했다
- [ ] Bid/No-Bid 게이트(G1)를 통과·기록했다
- [ ] 요구사항 매트릭스를 [RequirementExtraction](RequirementExtraction.md) 형식으로 작성했다
- [ ] 평가-요구 매핑을 [EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md) 형식으로 작성했다
- [ ] 숨은 기대·리스크·경쟁 분석을 보고서에 포함했다
- [ ] G2 게이트를 통과하고 [Proposal 전략](../Proposal/ProposalStrategy.md)으로 인계했다

---

## 예시 프롬프트

```
당신은 rfp-strategy-lead 에이전트다. 첨부된 RFP를 본 프레임워크의 1~9단계로 분석하라.
1) RFP 등록 카드 작성(예산·기간·배점·마감)
2) Bid/No-Bid 4축 채점과 결정(G1)
3) 문단 번호 부여 후 요구/평가/제약/의도 4렌즈 태깅
4) 요구사항 매트릭스(RequirementExtraction 형식)
5) 평가-요구 매핑표(EvaluationCriteriaAnalysis 형식)
6) 숨은 기대·리스크 레지스터·경쟁 포지셔닝
7) G2 게이트 자체 채점과 통합 RFP 분석 보고서
모든 고위험 결정은 32_DECISION_LOG에 기록할 항목으로 명시하라.
```

---

## 관련 골드위키 문서
- [03 RFP 대응 프레임워크](../03_RFP_FRAMEWORK.md) — 정본 상위 프레임워크.
- [04 RFP 심층 분석](../04_RFP_ANALYSIS.md) — 분석 플레이북.
- [RequirementExtraction](RequirementExtraction.md) — 요구사항 추출 방법.
- [EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md) — 평가기준 분석.
- [Proposal 전략](../Proposal/ProposalStrategy.md) — 9단계 인계 대상.
- [27 자동화 워크플로우](../27_AUTOMATION_WORKFLOW.md) — 21단계 파이프라인 정본.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/RFP/RequirementExtraction.md =====

# 요구사항 추출 (Requirement Extraction)

> 이 문서는 RFP에서 요구사항을 추출·분류·추적하는 표준 방법을 정의한다. 모든 에이전트는 추출 작업 전 [RFP 분석 프레임워크](RFPAnalysisFramework.md)와 [GoldWiki SSOT](../00_START_HERE.md)를 먼저 참조한다.

| 항목 | 내용 |
| --- | --- |
| **담당(Owner) 에이전트** | business-analysis-lead |
| **협업 에이전트** | rfp-strategy-lead, cto-reviewer, security-risk-lead, qa-lead |
| **정본 상위 문서** | [04 RFP 심층 분석](../04_RFP_ANALYSIS.md) |
| **연계 토픽** | [RFPAnalysisFramework](RFPAnalysisFramework.md), [EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md), [06 비즈니스 분석](../06_BUSINESS_ANALYSIS.md) |
| **최종 수정** | 2026-06-26 |

---

## 목적

RFP 문장에 흩어진 요구를 **단일 단위·추적 가능·검증 가능**한 요구사항 항목으로 변환한다. 추출된 각 항목은 평가 배점, 제안서 위치, 테스트 케이스, 담당 에이전트로 끝까지 추적된다(요구 → 설계 → 구현 → 검증 추적성).

---

## 언제 사용하는가

- RFP 분석 4단계(요구사항 추출)에서
- 컴플라이언스 매트릭스를 구성하기 직전
- 제안 범위(Scope)·공수 산정의 입력을 만들 때
- 변경(정정공고·Q&A)으로 요구가 추가·변경될 때

---

## 입력 정보

| 입력 | 출처 |
| --- | --- |
| 4렌즈 태깅된 RFP 원문 | [RFPAnalysisFramework](RFPAnalysisFramework.md) 3단계 |
| 과업지시서·기능명세·붙임 | 발주처 |
| 정정공고·질의응답 | 조달 공고 |
| 비기능 표준(WCAG/OWASP/성능) | [16 접근성](../16_ACCESSIBILITY.md), [24 보안](../24_SECURITY_GUIDE.md) |

---

## 처리 방식

### 추출 절차
1. **문장 단위 분해** — 한 문장에 복수 요구가 있으면 분리한다("그리고/및/또한"으로 연결된 복합 요구).
2. **추적 ID 부여** — `R-NNN`(요구), `NF-NNN`(비기능), `C-NNN`(제약), `CP-NNN`(컴플라이언스).
3. **강제성 판정** — 강제 표현("필수/하여야 한다/must/shall")은 `필수`, 권장("바람직/할 수 있다/should")은 `권장`, 정보성은 `참고`.
4. **분류 태깅** — 아래 분류 체계 적용.
5. **검증 가능성 확인** — "어떻게 충족을 증명하는가"를 명시(테스트·증빙). 모호하면 Q&A 후보로 분류.
6. **평가 연결** — [EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md)의 배점에 매핑.

### 분류 체계

| 코드 | 분류 | 정의 | 예 |
| --- | --- | --- | --- |
| F | 기능 | 시스템이 수행해야 할 동작 | 통합 검색, 민원 신청 |
| NF | 비기능 | 품질 속성·제약 | 성능, 가용성, 확장성 |
| UX | 사용성 | 사용 경험 요구 | 3클릭 이내 완료 |
| A11Y | 접근성 | WCAG 등 | WCAG 2.1 AA |
| SEC | 보안 | 보안·개인정보 | 암호화, 접근통제 |
| OPS | 운영 | 운영·이관 | 매뉴얼, 교육, 유지보수 |
| CP | 컴플라이언스 | 강제 규정·인증 | 정보보안 인증, 법규 |
| CON | 제약 | 예산·기간·기술 한계 | 특정 프레임워크 지정 |

---

## 출력 산출물 — 요구사항 매트릭스 템플릿

| ID | 출처(RFP 조항) | 분류 | 요구사항 | 강제성 | 검증 방법 | 평가 연결 | 담당 | 리스크 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | 3.1.2 | F | 통합 검색 및 자동완성 제공 | 필수 | 기능 테스트 | 기술 25 | frontend-lead | 중 |
| NF-014 | 4.2 | NF | 동시접속 5,000, 응답 < 2초 | 필수 | 부하 테스트 | 기술 15 | backend-lead | 고 |
| A11Y-021 | 5.1 | A11Y | WCAG 2.1 AA 전면 준수 | 필수 | 자동·수동 점검 | 품질 10 | publishing-lead | 중 |
| SEC-030 | 6.3 | SEC | 개인정보 암호화·접근통제 | 필수 | 보안 점검·감사 | 품질 10 | security-risk-lead | 고 |
| CP-002 | 7.1 | CP | 정보보안 관리체계 인증 대응 | 필수 | 증빙 제출 | 품질 5 | security-risk-lead | 중 |

### 추적성 매트릭스(RTM)

| 요구 ID | 제안서 위치 | 설계 산출물 | 구현 모듈 | 테스트 케이스 | 상태 |
| --- | --- | --- | --- | --- | --- |
| R-001 | 3장 2절 | IA·검색 플로우 | search-svc | TC-S-01~05 | 충족 |
| NF-014 | 4장 3절 | 아키텍처 설계 | api-gw | TC-P-01 | 충족 |
| A11Y-021 | 5장 1절 | 디자인 토큰 | 전 컴포넌트 | TC-A-01~12 | 충족 |

---

## 품질 기준

- 모든 강제 표현이 빠짐없이 `필수`로 추출되었는가(컴플라이언스 누락 0)
- 한 항목이 단일·원자적(검증 가능한 최소 단위)인가
- 모든 항목에 검증 방법이 명시되었는가
- 모든 항목이 평가 배점에 연결되었는가
- 모호·상충 항목이 Q&A 후보로 분류되었는가
- 변경 이력(정정공고 반영)이 기록되었는가

---

## 체크리스트

- [ ] 복합 문장을 단일 요구로 분해했다
- [ ] R/NF/C/CP 추적 ID를 부여했다
- [ ] 강제성(필수/권장/참고)을 판정했다
- [ ] 8개 분류 코드로 태깅했다
- [ ] 검증 방법을 모든 항목에 명시했다
- [ ] 요구사항 매트릭스와 RTM을 작성했다
- [ ] 평가 배점에 연결했다([EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md))

---

## 예시 — 공공포털 고도화 RFP 발췌 추출

> 원문: "노후 포털을 반응형으로 전면 개편하여야 하며, 민원 신청은 3클릭 이내로 완료되어야 하고, 동시접속 5,000명을 안정적으로 처리(평균 응답 2초 이내)하여야 한다. WCAG 2.1 AA를 100% 준수한다."

| ID | 분류 | 요구사항 | 강제성 | 검증 |
| --- | --- | --- | --- | --- |
| R-001 | F | 포털 반응형 전면 개편 | 필수 | 반응형 점검(3 breakpoint) |
| R-007 | UX | 민원 신청 3클릭 이내 완료 | 필수 | 과업 플로우 측정 |
| NF-018 | NF | 동시접속 5,000, 응답 ≤ 2초 | 필수 | 부하 테스트(JMeter) |
| A11Y-012 | A11Y | WCAG 2.1 AA 100% | 필수 | axe + 수동 점검 |

**해석**: R-007은 UX 배점과 직결되어 [13 사용자 여정](../13_USER_JOURNEY.md) 기반 페인 포인트 해소로 대응. NF-018은 최고 리스크로 [21 백엔드](../21_BACKEND_GUIDE.md) 캐싱·CDN 설계 전제.

---

## 예시 프롬프트

```
당신은 business-analysis-lead 에이전트다. 4렌즈 태깅된 RFP에서 요구사항을 추출하라.
- 복합 문장은 단일 요구로 분해
- R/NF/C/CP ID 부여, 강제성 판정, 8개 분류 태깅
- 각 항목에 검증 방법과 평가 배점 연결 명시
- 모호/상충 항목은 Q&A 후보로 별도 표기
산출: 요구사항 매트릭스 + 추적성 매트릭스(RTM). 컴플라이언스 누락 0을 보증하라.
```

---

## 관련 골드위키 문서
- [RFPAnalysisFramework](RFPAnalysisFramework.md) — 추출이 속한 4단계.
- [EvaluationCriteriaAnalysis](EvaluationCriteriaAnalysis.md) — 배점 매핑.
- [04 RFP 심층 분석](../04_RFP_ANALYSIS.md) — 추출 템플릿 정본.
- [06 비즈니스 분석](../06_BUSINESS_ANALYSIS.md) — 요구 정교화 인계.
- [16 접근성](../16_ACCESSIBILITY.md) · [24 보안 가이드](../24_SECURITY_GUIDE.md) — 비기능 표준.

> **거버넌스:** 본 문서에서 발생한 모든 의사결정은 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다.




===== 파일: GoldWiki/Research/README.md =====

# Research — 업종/시장 리서치 토픽

## 폴더 목적

RFP 분석·제안 전략·비즈니스 분석을 뒷받침하는 **업종 특성·시장 동향·사용자·경쟁 리서치**를 보관한다. 발주처의 숨은 기대를 해석하고, 윈 테마와 차별화의 사실 기반을 제공하는 토픽이다. 업종별 심층 자료는 [Industry](../Industry/) 토픽에 정리되어 있으며, 본 토픽은 리서치 방법·시장 분석·진입점을 관리한다.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| README.md | 리서치 토픽 개요·진입점 (이 문서) |
| (연계) [../Industry/](../Industry/README.md) | 업종별 심층 자료 모음 |

> 시장 동향·사용자 리서치·경쟁 분석 보조 문서가 추가될 경우 이 표에 등록한다.

## 업종 리서치 (Industry 연계)

발주처 업종에 맞는 리서치는 다음 Industry 문서를 우선 참조한다.

| 업종 | 문서 |
| --- | --- |
| 공공부문 | [../Industry/PublicSector.md](../Industry/PublicSector.md) |
| 금융 | [../Industry/Banking.md](../Industry/Banking.md) |
| 보험 | [../Industry/Insurance.md](../Industry/Insurance.md) |
| 커머스 | [../Industry/Commerce.md](../Industry/Commerce.md) |
| 통신 | [../Industry/Telecom.md](../Industry/Telecom.md) |
| 호텔·여행 | [../Industry/Hotel.md](../Industry/Hotel.md) |

## 관련 GoldWiki 토픽 / 번호 문서

- [Industry](../Industry/README.md) — 업종별 심층 자료 정본.
- [RFP](../RFP/README.md) — 숨은 기대 해석 입력.
- [Proposal](../Proposal/README.md) — 경쟁 시뮬레이션·차별화 근거.
- [Business](../Business/README.md) — 시장·사업성 분석.
- [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md) — 외부 베스트프랙티스·근거.

## 담당 에이전트

- **Owner**: industry-research-lead
- **협업**: business-analysis-lead, product-strategy-lead, proposal-lead, ux-research-lead

## 거버넌스

본 토픽의 모든 리서치 결정·인사이트는 [32 의사결정 로그](../32_DECISION_LOG.md), [35 프로젝트 메모리](../35_PROJECT_MEMORY.md), [37 베스트 프랙티스](../37_BEST_PRACTICES.md), [36 레퍼런스 라이브러리](../36_REFERENCE_LIBRARY.md)를 갱신한다. 업종 정본은 Industry 토픽이며 본 토픽은 방법·진입점·연계를 관리한다.




===== 파일: GoldWiki/Templates/README.md =====

# Templates — 템플릿 라이브러리 토픽

## 폴더 목적

ClubSchool AI OS의 모든 산출물이 일관된 구조·품질로 작성되도록 **표준 템플릿**을 제공한다. RFP 분석, 제안서, 경영 요약, UX 전략, IA·플로우·화면 목록, UI 콘셉트, WBS, 테스트 계획, 회의록, 릴리스 노트 등 핵심 산출물의 골격을 정의한다. GoldWiki SSOT의 템플릿 정본 토픽이다.

## 포함 문서 / 연계 정본

본 토픽은 다음 두 정본을 가리키는 인덱스 역할을 한다.

| 정본 | 설명 |
| --- | --- |
| [../../Templates/](../../Templates/) | ClubSchool 루트 템플릿 모음(실제 산출물 골격 파일) |
| [../38_TEMPLATE_LIBRARY.md](../38_TEMPLATE_LIBRARY.md) | 번호형 템플릿 라이브러리 정본(개요·카탈로그·사용 규칙) |

루트 템플릿 파일:

- [`RFP_Analysis_Report.md`](../../Templates/RFP_Analysis_Report.md) — RFP 분석 보고서
- [`Proposal.md`](../../Templates/Proposal.md) · [`Executive_Summary.md`](../../Templates/Executive_Summary.md) — 제안서·경영 요약
- [`UX_Strategy.md`](../../Templates/UX_Strategy.md) · [`IA_Sitemap.md`](../../Templates/IA_Sitemap.md) · [`User_Flow.md`](../../Templates/User_Flow.md) · [`Screen_List.md`](../../Templates/Screen_List.md) · [`UI_Concept_Brief.md`](../../Templates/UI_Concept_Brief.md) — UX/UI
- [`WBS.md`](../../Templates/WBS.md) — 작업분해구조
- [`Test_Plan.md`](../../Templates/Test_Plan.md) · [`Release_Notes.md`](../../Templates/Release_Notes.md) — QA·릴리스
- [`Meeting_Note.md`](../../Templates/Meeting_Note.md) — 회의록

## 관련 GoldWiki 토픽 / 번호 문서

- [../PMO/WBSGuide.md](../PMO/WBSGuide.md) — WBS 템플릿 작성 가이드
- [../QA/QualityReviewChecklist.md](../QA/QualityReviewChecklist.md) — 산출물 품질 검증
- [../Delivery/FinalDeliveryChecklist.md](../Delivery/FinalDeliveryChecklist.md) — 납품 산출물 형식
- [../PromptLibrary/](../PromptLibrary/) — 프롬프트 출력 형식 연계

## 담당 에이전트

- **주담당:** `documentation-lead` (템플릿 정본 관리)
- **협업:** 각 도메인 리드(자기 산출물 템플릿 제안·개선), `qa-lead`(템플릿 준수 검증)

## 거버넌스

모든 산출물은 본 토픽의 표준 템플릿으로 작성한다. 템플릿 신규·개정은 `documentation-lead`가 승인하며, 정본은 루트 `../../Templates/`에 둔다. 중복 템플릿은 금지한다.




===== 파일: GoldWiki/UI/README.md =====

# UI 토픽 — GoldWiki

화면 단위 시각 설계의 단일 진실 공급원(SSOT). UX 전략을 화면으로 구현하기 위한 그리드·타이포·색·상태·반응형 규칙을 모은다.

## 폴더 목적

- 일관·접근 가능·구현 가능한 화면 UI 규칙 제공
- 디자인 토큰을 화면에 적용하는 사용 규칙 규정
- 와이어프레임→UI→핸드오프의 시각 표준화

## 포함 문서

| 문서 | 내용 |
| --- | --- |
| [UIGuidelines.md](UIGuidelines.md) | UI 가이드라인(그리드·타이포·색·상태·반응형, Do/Don't) |

## 관련 GoldWiki 문서

- [08_UI_GUIDELINES](../08_UI_GUIDELINES.md) — UI 번호형 문서
- [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md) — 디자인 토큰(수치 단일 출처)
- [14_COMPONENT_LIBRARY](../14_COMPONENT_LIBRARY.md) — 컴포넌트 라이브러리
- [16_ACCESSIBILITY](../16_ACCESSIBILITY.md) — 접근성(WCAG 2.2 AA)
- [10_FIGMA_GUIDE](../10_FIGMA_GUIDE.md) — Figma 작업 표준

## 관련 토픽 폴더

- [../UX/README.md](../UX/README.md) · [../DesignSystem/README.md](../DesignSystem/README.md) · [../Brand/README.md](../Brand/README.md) · [../Publishing/README.md](../Publishing/README.md)

## 담당 에이전트

- 주관: `ui-design-lead`
- 협업: `bx-design-lead`, `design-system-lead`, `publishing-lead`, `frontend-lead`

## 거버넌스

모든 화면은 디자인 토큰을 단일 출처로 참조하고 WCAG 2.2 AA를 충족해야 한다. 임의 수치·HEX 하드코딩 금지. 변경은 [../DesignSystem/DesignSystemGuide.md](../DesignSystem/DesignSystemGuide.md) 거버넌스를 따른다.




===== 파일: GoldWiki/UI/UIGuidelines.md =====

# UI 가이드라인 (UI Guidelines)

Goldwiki Digital(골드위키 디지털)의 화면 단위 UI 설계 규칙. **그리드·타이포그래피·색상·상태·반응형**을 표준화하여 모든 화면이 일관·접근 가능·구현 가능하도록 한다.

> 이 문서를 쓰는 에이전트는 [08_UI_GUIDELINES](../08_UI_GUIDELINES.md), [07_UX_PRINCIPLES](../07_UX_PRINCIPLES.md), [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md)을 먼저 참조한다. 모든 수치는 디자인 토큰을 단일 출처로 사용한다.

---

## 목적

- 레이아웃·타이포·색·상태·반응형의 일관된 시각 규칙을 정의한다.
- 디자인 토큰([../DesignSystem/DesignSystemGuide](../DesignSystem/DesignSystemGuide.md))을 화면에 적용하는 규칙을 규정한다.
- 접근성([16_ACCESSIBILITY](../16_ACCESSIBILITY.md)) 기준을 시각 규칙에 내재화한다.

## 언제 사용하는가

| 시점 | 사용 목적 |
| --- | --- |
| 와이어프레임→UI | 시각 규칙 적용 |
| 컴포넌트 설계 | 상태·간격·타이포 정의 |
| 디자인 리뷰 | 일관성·접근성 점검 |
| 핸드오프 | 퍼블리싱/프런트 명세 |

## 입력 정보

- 유저 플로우·화면 목록: [../UX/UserFlowGuide](../UX/UserFlowGuide.md)
- 디자인 토큰: [15_DESIGN_TOKEN](../15_DESIGN_TOKEN.md)
- 브랜드 비주얼 아이덴티티: [../Brand/BXGuidelines](../Brand/BXGuidelines.md)
- 접근성 기준(WCAG 2.2 AA): [16_ACCESSIBILITY](../16_ACCESSIBILITY.md)

## 처리 방식

### 그리드 & 레이아웃
| 브레이크포인트 | 컬럼 | 거터 | 마진 |
| --- | --- | --- | --- |
| Mobile (<768px) | 4 | 16px | 16px |
| Tablet (768–1023) | 8 | 24px | 24px |
| Desktop (≥1024) | 12 | 24px | 자동(컨테이너 max 1200) |

- 간격은 4px 베이스 스케일(4/8/12/16/24/32/48/64) 토큰만 사용
- 시각적 위계: 8pt 리듬 유지, 요소 그룹 간 간격 > 그룹 내 간격

### 타이포그래피
| 토큰 | 용도 | 크기/행간 | 굵기 |
| --- | --- | --- | --- |
| `display` | 히어로 | 40/48 | 700 |
| `h1` | 페이지 제목 | 32/40 | 700 |
| `h2` | 섹션 | 24/32 | 600 |
| `body` | 본문 | 16/24 | 400 |
| `caption` | 보조 | 13/18 | 400 |

- 본문 최소 16px, 한 줄 45~75자
- 폰트는 브랜드 지정 서체만, 위계는 크기·굵기·색으로 표현

### 색상
- 시맨틱 토큰 사용: `color-primary`, `color-danger`, `color-success`, `color-surface`, `color-text`
- 명도 대비: 본문 ≥ 4.5:1, 큰 텍스트/UI ≥ 3:1 (WCAG 2.2 AA)
- 색만으로 의미 전달 금지(아이콘/텍스트 병행)

### 상태(State)
모든 인터랙티브 요소는 6개 상태를 정의한다.

| 상태 | 정의 |
| --- | --- |
| Default | 기본 |
| Hover | 마우스 오버 |
| Focus | 키보드 포커스(가시 링 필수) |
| Active/Pressed | 눌림 |
| Disabled | 비활성(대비 완화, 커서 not-allowed) |
| Loading | 처리 중(스피너/스켈레톤) |

추가 화면 상태: Empty(빈), Error(오류), Success(성공).

### 반응형
- 모바일 퍼스트로 설계, 우선순위 콘텐츠 먼저
- 터치 타깃 최소 44×44px
- 콘텐츠 리플로우: 320px 폭에서 가로 스크롤 없이 동작(WCAG 1.4.10)

## 출력 산출물

| 산출물 | 형식 |
| --- | --- |
| UI 컨셉/스타일 정의 | 문서 ([Templates/UI_Concept_Brief](../../Templates/UI_Concept_Brief.md)) |
| 화면 디자인 | Figma ([10_FIGMA_GUIDE](../10_FIGMA_GUIDE.md)) |
| 상태 명세표 | 표 |
| 반응형 사양 | 표 + 브레이크포인트 |
| 핸드오프 노트 | 문서 → [../Publishing/README](../Publishing/README.md) |

## 품질 기준 (Do / Don't)

| Do | Don't |
| --- | --- |
| 4px 베이스 토큰 간격 사용 | 임의 px(예: 13px, 7px) 직접 입력 |
| 시맨틱 색 토큰 참조 | HEX 하드코딩 |
| 모든 상태(6+3) 정의 | Default만 디자인 |
| 포커스 링 명시 | 포커스 아웃라인 제거 |
| 대비 4.5:1 검증 | 연한 회색 본문 |
| 색+아이콘 병행 | 색만으로 의미 전달 |

## 체크리스트

- [ ] 모든 간격이 토큰 스케일을 따르는가
- [ ] 타이포 위계가 토큰으로 정의되었는가
- [ ] 색 대비가 WCAG 2.2 AA를 충족하는가
- [ ] 인터랙티브 요소의 6개 상태가 있는가
- [ ] Empty/Error/Loading 화면 상태가 있는가
- [ ] 터치 타깃 ≥ 44px, 320px 리플로우 OK
- [ ] [08_UI_GUIDELINES](../08_UI_GUIDELINES.md)·토큰과 정합하는가

## 예시 프롬프트

```
역할: ui-design-lead. GoldWiki/UI/UIGuidelines.md를 따른다.
입력: 화면 목록(대시보드/설정), 디자인 토큰, 브랜드 컬러.
작업: 대시보드 화면 UI 사양 작성 — 12컬럼 그리드, 타이포 토큰, 시맨틱 색,
      모든 컴포넌트의 6개 상태 + Empty/Error/Loading.
출력: 상태 명세표, 반응형 사양, Do/Don't 점검. 대비 4.5:1 검증 포함.
```




===== 파일: GoldWiki/UX/InformationArchitectureGuide.md =====

# 정보 구조(IA) 가이드 (Information Architecture Guide)

Goldwiki Digital(골드위키 디지털)의 정보 구조 설계 표준. **콘텐츠 인벤토리 → 분류 → 카드소팅 → 사이트맵/내비게이션**의 흐름을 정의하여, 사용자가 원하는 정보를 최소 비용으로 찾도록 한다.

> 이 가이드를 쓰는 에이전트는 [07_UX_PRINCIPLES](../07_UX_PRINCIPLES.md)와 [11_INFORMATION_ARCHITECTURE](../11_INFORMATION_ARCHITECTURE.md)를 먼저 참조한다. IA는 UX 전략([UXStrategyFramework](UXStrategyFramework.md))에서 도출된 멘탈 모델을 구조로 옮긴 결과다.

---

## 목적

- 콘텐츠/기능을 사용자 멘탈 모델에 맞게 조직화하는 표준 절차를 제공한다.
- 분류 체계(taxonomy)·라벨링·내비게이션·검색 전략을 일관되게 설계한다.
- IA 결과를 사이트맵·화면목록([../UI/UIGuidelines](../UI/UIGuidelines.md))·유저플로우([UserFlowGuide](UserFlowGuide.md))로 연결한다.

## 언제 사용하는가

| 시점 | 사용 목적 |
| --- | --- |
| 신규 서비스 설계 | 0→1 구조 정의 |
| 리뉴얼/통합 | 기존 인벤토리 정비, 중복 제거 |
| 검색·내비게이션 개선 | 라벨·계층 재설계 |
| 다국어/멀티브랜드 | 공통 분류 체계 정의 |

## 입력 정보

- UX 전략·페르소나·JTBD: [UXStrategyFramework](UXStrategyFramework.md)
- 기존 콘텐츠/페이지 목록, CMS 구조
- 검색 로그(검색어, 무결과율), 내비 클릭 데이터
- 비즈니스 우선순위: [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md)
- 업종 관례: [../Industry/README](../Industry/README.md)

## 처리 방식

### 1. 콘텐츠 인벤토리
모든 페이지/콘텐츠를 표로 수집·평가한다(ROT: Redundant/Outdated/Trivial 식별).

| ID | 제목 | URL | 유형 | 소유 | 상태(유지/병합/삭제) |
| --- | --- | --- | --- | --- | --- |
| C-001 | 요금 안내 | /pricing | 마케팅 | 영업 | 유지 |
| C-002 | 구 요금표 | /price-old | 마케팅 | 영업 | 삭제(ROT) |

### 2. 분류 (Taxonomy)
- 조직화 체계 선택: 주제별 / 작업별 / 사용자유형별 / 시간순
- 라벨링 원칙: 사용자 용어 우선, 내부 용어 금지, 일관 대소문자/조사

### 3. 카드소팅
- 개방형(사용자가 그룹명 생성) → 멘탈 모델 발견
- 폐쇄형(주어진 카테고리에 배치) → 검증
- 표본 15~30명 권장, 유사도 매트릭스로 군집 분석

```mermaid
flowchart TD
  INV[콘텐츠 인벤토리] --> TAX[분류 체계 초안]
  TAX --> CS[카드소팅]
  CS --> SM[사이트맵]
  SM --> NAV[내비게이션 설계]
  NAV --> TT[트리 테스트 검증]
  TT -. 미달 .-> TAX
```

### 4. 사이트맵 & 내비게이션
- 깊이 ≤ 3 권장(중요 콘텐츠는 클릭 3회 이내)
- 글로벌/로컬/유틸리티/푸터 내비 역할 분리
- 트리 테스트로 탐색 성공률 검증(목표 ≥ 80%)

#### 사이트맵 예시
```
Home
├─ 서비스 (작업별)
│  ├─ 컨설팅
│  └─ 구축
├─ 사례
│  ├─ 업종별
│  └─ 규모별
├─ 가격
└─ 회사
   ├─ 소개
   └─ 채용
```

## 출력 산출물

| 산출물 | 형식 |
| --- | --- |
| 콘텐츠 인벤토리 시트 | 표 |
| 분류 체계/라벨 사전 | 문서 |
| 카드소팅 분석 리포트 | 문서 + 유사도 매트릭스 |
| 사이트맵 | 다이어그램([Templates/IA_Sitemap](../../Templates/IA_Sitemap.md)) |
| 내비게이션 사양 | 표 |
| 트리 테스트 결과 | 리포트 |

## 품질 기준

- [ ] 라벨이 사용자 용어 기반이며 카드소팅으로 검증되었다.
- [ ] 중요 콘텐츠 도달 깊이가 3 이하다.
- [ ] 트리 테스트 탐색 성공률이 80% 이상이다.
- [ ] ROT 콘텐츠가 식별·처리되었다.
- [ ] 사이트맵이 유저플로우·화면목록과 정합한다.

## 체크리스트

- [ ] 인벤토리에 모든 페이지가 포함되었는가
- [ ] 분류 기준이 단일하고 일관적인가
- [ ] 카드소팅 표본이 충분한가
- [ ] 내비게이션 역할(글로벌/로컬/유틸)이 구분되는가
- [ ] 검색 전략(파셋·자동완성·무결과 처리)이 있는가
- [ ] 결과를 [11_INFORMATION_ARCHITECTURE](../11_INFORMATION_ARCHITECTURE.md)에 반영했는가

## 예시 프롬프트

```
역할: information-architecture-lead. GoldWiki/UX/InformationArchitectureGuide.md를 따른다.
입력: 기존 페이지 120개 목록, 검색 로그(무결과율 18%), 페르소나 3종.
작업: 콘텐츠 인벤토리(ROT 평가)→분류 체계→폐쇄형 카드소팅 설계→사이트맵(깊이≤3) 작성.
출력: 인벤토리 표, 라벨 사전, mermaid 사이트맵, 트리 테스트 시나리오.
```




===== 파일: GoldWiki/UX/README.md =====

# UX 토픽 — GoldWiki

사용자 경험(UX) 전략·리서치·정보구조·플로우의 단일 진실 공급원(SSOT). 비즈니스 목표를 사용자 가치로 번역하고, 근거 기반으로 경험을 설계·측정하는 표준을 모은다.

## 폴더 목적

- 리서치 → 인사이트 → 전략 → 측정의 폐루프 운영
- 정보 구조(IA)와 유저 플로우의 설계 표준 제공
- UI·디자인 시스템·QA로 이어지는 상류 산출물 생산

## 포함 문서

| 문서 | 내용 |
| --- | --- |
| [UXStrategyFramework.md](UXStrategyFramework.md) | UX 전략 프레임워크(리서치→인사이트→전략→측정, HEART) |
| [InformationArchitectureGuide.md](InformationArchitectureGuide.md) | IA 가이드(인벤토리·분류·카드소팅·사이트맵) |
| [UserFlowGuide.md](UserFlowGuide.md) | 유저 플로우(표기법·유형·에러 경로·mermaid) |

## 관련 GoldWiki 문서

- [07_UX_PRINCIPLES](../07_UX_PRINCIPLES.md) — UX 원칙·휴리스틱(상위 헌법)
- [11_INFORMATION_ARCHITECTURE](../11_INFORMATION_ARCHITECTURE.md) — IA 번호형 문서
- [12_USER_FLOW](../12_USER_FLOW.md) — 유저 플로우 번호형 문서
- [13_USER_JOURNEY](../13_USER_JOURNEY.md) — 유저 여정
- [16_ACCESSIBILITY](../16_ACCESSIBILITY.md) — 접근성

## 관련 토픽 폴더

- [../UI/README.md](../UI/README.md) · [../DesignSystem/README.md](../DesignSystem/README.md) · [../Brand/README.md](../Brand/README.md)
- [../Research/README.md](../Research/README.md) · [../Industry/README.md](../Industry/README.md) · [../QA/README.md](../QA/README.md)

## 담당 에이전트

- 주관: `ux-research-lead`, `information-architecture-lead`
- 협업: `service-planning-lead`, `product-strategy-lead`, `ui-design-lead`, `data-analytics-lead`

## 거버넌스

모든 UX 산출물은 본 표준을 따르며, 인사이트는 근거(데이터)로 추적 가능해야 하고 결정은 [32_DECISION_LOG](../32_DECISION_LOG.md)·[35_PROJECT_MEMORY](../35_PROJECT_MEMORY.md)에 환류한다.




===== 파일: GoldWiki/UX/UXStrategyFramework.md =====

# UX 전략 프레임워크 (UX Strategy Framework)

Goldwiki Digital(골드위키 디지털)의 UX 전략 수립 표준. **리서치 → 인사이트 → 전략 → 측정**의 4단계 폐루프를 정의하여, 모든 프로젝트가 근거 기반으로 경험을 설계하고 효과를 검증하도록 한다.

> 이 문서를 사용하는 모든 에이전트는 산출 전에 [GoldWiki/00_START_HERE](../00_START_HERE.md)와 [07_UX_PRINCIPLES](../07_UX_PRINCIPLES.md)를 먼저 참조한다. UX 전략은 단일 진실 공급원(SSOT)에 정렬되어야 한다.

---

## 목적

- 프로젝트 비즈니스 목표를 사용자 경험 목표로 번역하는 표준 절차를 제공한다.
- 리서치 데이터에서 실행 가능한 인사이트와 설계 원칙을 도출하는 방법을 표준화한다.
- 경험 품질을 정량·정성 지표로 측정하고 다음 사이클에 환류하는 체계를 마련한다.
- RFP 분석([04_RFP_ANALYSIS](../04_RFP_ANALYSIS.md))과 제안 전략([05_PROPOSAL_STRATEGY](../05_PROPOSAL_STRATEGY.md))에 UX 근거를 공급한다.

## 언제 사용하는가

| 시점 | 사용 목적 |
| --- | --- |
| RFP 수령 직후 | 요구사항 이면의 사용자 니즈·기회를 정의하고 제안 차별화의 근거 마련 |
| 프로젝트 킥오프 | 경험 목표(Experience Goal)와 성공 지표(KPI/UX Metric) 합의 |
| 설계 착수 전 | 페르소나·핵심 시나리오·설계 원칙 확정 |
| 출시 후 | 측정 데이터로 가설 검증 및 개선 백로그 도출 |

## 입력 정보

- 비즈니스 목표·KPI: [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md)
- RFP 요구사항 및 숨은 기대: [04_RFP_ANALYSIS](../04_RFP_ANALYSIS.md)
- 업종 컨텍스트: [../Industry/README](../Industry/README.md)
- 기존 사용자 데이터: 인터뷰, 설문, 행동 로그(GA4 등), CS 문의, 리뷰
- 경쟁/벤치마크: [36_REFERENCE_LIBRARY](../36_REFERENCE_LIBRARY.md)
- 제약 조건: 일정, 예산, 기술 스택, 규제

## 처리 방식

### 1단계 · 리서치 (Discover)
- 리서치 질문 정의 → 방법 선택(정성/정량 혼합)
- 데스크 리서치 → 1차 데이터 수집(인터뷰 5~8명, 설문 n≥100 권장)
- 행동 데이터(퍼널, 이탈, 히트맵) 수집

| 방법 | 적합한 질문 | 산출 |
| --- | --- | --- |
| 심층 인터뷰 | "왜" 동기·맥락 | 인용문, 니즈 |
| 사용성 테스트 | "어디서" 막히는가 | 태스크 성공률, 마찰점 |
| 설문 | "얼마나" 보편적인가 | 정량 분포 |
| 행동 분석 | "무엇이" 실제 발생 | 퍼널 전환율 |

### 2단계 · 인사이트 (Define)
- 친화도 다이어그램(Affinity)으로 데이터 군집화
- 페르소나 2~4개 + 핵심 JTBD(Jobs To Be Done) 도출
- 기회 영역(Opportunity)과 우선순위(Impact × Confidence × Ease)
- 산출은 [13_USER_JOURNEY](../13_USER_JOURNEY.md)와 [11_INFORMATION_ARCHITECTURE](../11_INFORMATION_ARCHITECTURE.md)로 연결

### 3단계 · 전략 (Decide)
- 경험 원칙(Experience Principle) 3~5개 선언
- 경험 비전 문장(Experience Vision Statement) 정의
- 설계 가설(Design Hypothesis): "[사용자]가 [상황]에서 [해결책]을 쓰면 [지표]가 개선될 것"
- 로드맵 우선순위화 → [12_USER_FLOW](../12_USER_FLOW.md), [UI 가이드라인](../UI/UIGuidelines.md)으로 전달

### 4단계 · 측정 (Deliver & Measure)
- HEART 프레임워크로 지표 매핑

| HEART | 의미 | 예시 지표 |
| --- | --- | --- |
| Happiness | 만족 | NPS, CSAT, SUS |
| Engagement | 참여 | 세션당 행동수, 재방문율 |
| Adoption | 도입 | 신규 기능 사용률 |
| Retention | 유지 | 7/30일 잔존율 |
| Task success | 과업 성공 | 완료율, 소요시간, 오류율 |

- 측정 결과를 [35_PROJECT_MEMORY](../35_PROJECT_MEMORY.md)·[32_DECISION_LOG](../32_DECISION_LOG.md)에 환류

```mermaid
flowchart LR
  R[리서치] --> I[인사이트] --> S[전략] --> M[측정]
  M -. 환류 .-> R
```

## 출력 산출물

| 산출물 | 형식 | 저장 위치 |
| --- | --- | --- |
| UX 전략서 | 문서 | 프로젝트 폴더 / [../Templates/UXStrategy 참조](../38_TEMPLATE_LIBRARY.md) |
| 페르소나·JTBD | 문서/슬라이드 | UX 폴더 |
| 경험 원칙 선언문 | 1페이지 | 제안서 첨부 |
| 측정 대시보드 정의 | 표/스펙 | [Data 토픽](../Data/README.md) 연계 |
| 설계 가설 백로그 | 표 | PMO 백로그 |

## 품질 기준

- [ ] 모든 인사이트가 원천 데이터(인용/수치)로 추적 가능하다.
- [ ] 경험 원칙이 비즈니스 목표와 1:1로 연결된다.
- [ ] 각 설계 가설에 측정 가능한 지표와 목표치가 있다.
- [ ] 페르소나가 실제 인터뷰 근거에 기반한다(가공 인물 금지).
- [ ] 측정 계획이 출시 전에 수립되어 있다.

## 체크리스트

- [ ] 리서치 질문이 비즈니스 질문에서 도출되었는가
- [ ] 표본 수·방법이 신뢰 수준에 충분한가
- [ ] 인사이트 우선순위가 정량 근거로 정렬되었는가
- [ ] 전략이 IA·플로우·UI로 실행 경로를 갖는가
- [ ] 측정 지표·기준선·목표치가 정의되었는가
- [ ] 결과를 GoldWiki에 환류했는가

## 예시 프롬프트

```
역할: ux-research-lead. GoldWiki/UX/UXStrategyFramework.md를 따른다.
입력: 첨부 RFP, 02_BUSINESS_GOALS, GA4 퍼널 데이터.
작업: 리서치→인사이트→전략→측정 4단계로 UX 전략서를 작성하라.
요구: 페르소나 3개, 경험 원칙 4개, HEART 지표 매핑, 설계 가설 5개(각 목표치 포함).
출력: 마크다운 표·mermaid 포함. 모든 인사이트에 근거 표기.
```




===== 파일: GoldWiki/UX/UserFlowGuide.md =====

# 유저 플로우 가이드 (User Flow Guide)

Goldwiki Digital(골드위키 디지털)의 유저 플로우 설계 표준. 표기법·플로우 유형·에러/예외 경로·검증 방법을 정의하여, 화면 전환과 의사결정을 명확하게 문서화한다.

> 이 가이드를 쓰는 에이전트는 [12_USER_FLOW](../12_USER_FLOW.md)와 [InformationArchitectureGuide](InformationArchitectureGuide.md)를 먼저 참조한다. 플로우는 IA 구조 위에서 사용자의 실제 경로를 그린다.

---

## 목적

- 사용자 과업 완수 경로를 표준 표기법으로 시각화한다.
- 정상 경로(happy path)뿐 아니라 에러·예외·엣지 케이스를 빠짐없이 설계한다.
- 플로우를 화면목록·인터랙션·QA 시나리오([../QA/README](../QA/README.md))로 연결한다.

## 언제 사용하는가

| 시점 | 사용 목적 |
| --- | --- |
| 핵심 과업 설계 | 가입/결제/예약 등 전환 경로 정의 |
| IA 확정 후 | 화면 간 이동·분기 명세 |
| 와이어프레임 전 | 화면 단위 도출 근거 |
| QA 시나리오 작성 | 테스트 케이스의 출처 |

## 입력 정보

- 사이트맵·화면 목록: [InformationArchitectureGuide](InformationArchitectureGuide.md)
- 페르소나·핵심 시나리오: [UXStrategyFramework](UXStrategyFramework.md)
- 비즈니스 규칙·검증 조건(필수값, 권한, 결제 정책)
- 시스템 제약: 외부 API, 인증 방식 — [../Backend/README](../Backend/README.md)

## 처리 방식

### 표기법(Notation)
| 기호 | 의미 |
| --- | --- |
| ▭ 사각형 | 화면/페이지 |
| ◇ 마름모 | 분기(의사결정) |
| ⬭ 둥근 사각 | 시작/종료 |
| ▱ 평행사변형 | 입력/출력 데이터 |
| → 화살표 | 흐름 방향 |
| ⟂ 점선 | 시스템 처리/백그라운드 |

원칙: 한 화면 = 한 노드, 분기는 반드시 두 개 이상 출구, 모든 에러에 복구 경로.

### 플로우 유형
1. **태스크 플로우(Task Flow)**: 단일 경로, 분기 없음 — 최단 경험 점검
2. **유저 플로우(User Flow)**: 분기·조건 포함 — 표준
3. **와이어플로우(Wireflow)**: 플로우 + 와이어프레임 결합
4. **화면 플로우(Screen Flow)**: 실제 화면 썸네일 연결

### 에러·예외 경로 설계
- 입력 검증 실패(빈값/형식/중복)
- 권한 부족·세션 만료
- 네트워크/서버 오류(타임아웃, 5xx)
- 결제 실패·재시도
- 빈 상태(Empty State)·로딩·부분 실패

각 예외에 (1) 사용자 메시지 (2) 복구 행동 (3) 시스템 처리를 명시한다.

### 정상 경로 예시 (mermaid)
```mermaid
flowchart TD
  S((시작)) --> L[로그인 화면]
  L --> D{인증 성공?}
  D -- 예 --> H[대시보드]
  D -- 아니오 --> E[오류 메시지 표시]
  E --> L
  D -- 5회 실패 --> LOCK[계정 잠금 안내]
  H --> O((종료))
```

### 에러 경로 예시 (결제)
```mermaid
flowchart TD
  P[결제 화면] --> V{입력 유효?}
  V -- 아니오 --> P
  V -- 예 --> G[(PG 요청)]
  G --> R{승인?}
  R -- 승인 --> OK[완료 화면]
  R -- 거절 --> F[실패 사유 안내]
  F --> RT{재시도?}
  RT -- 예 --> P
  RT -- 아니오 --> CART[장바구니로]
  G -. 타임아웃 .-> TO[잠시 후 재시도 안내]
```

## 출력 산출물

| 산출물 | 형식 |
| --- | --- |
| 유저 플로우 다이어그램 | mermaid/Figma ([Templates/User_Flow](../../Templates/User_Flow.md)) |
| 화면 목록 도출 | 표 ([Templates/Screen_List](../../Templates/Screen_List.md)) |
| 분기/예외 명세 | 표 |
| QA 시나리오 시드 | 표 → [../QA/README](../QA/README.md) |

## 품질 기준

- [ ] 모든 핵심 과업에 happy path와 에러 경로가 함께 있다.
- [ ] 모든 분기가 두 개 이상 출구를 가진다(데드엔드 없음).
- [ ] 모든 에러에 사용자 메시지+복구 경로가 정의되었다.
- [ ] 플로우의 모든 화면이 화면 목록과 1:1 매칭된다.
- [ ] 빈 상태/로딩/권한 예외가 누락 없이 포함되었다.

## 체크리스트

- [ ] 표기법이 일관되게 적용되었는가
- [ ] 진입점·종료점이 명확한가
- [ ] 백그라운드 시스템 처리가 표시되었는가
- [ ] 세션 만료·권한·네트워크 예외가 포함되었는가
- [ ] 화면 목록·QA 시나리오로 연결되는가
- [ ] [12_USER_FLOW](../12_USER_FLOW.md)에 반영했는가

## 예시 프롬프트

```
역할: ux-research-lead/service-planning-lead. GoldWiki/UX/UserFlowGuide.md를 따른다.
입력: 사이트맵, 결제 비즈니스 규칙, PG 연동 사양.
작업: '구독 결제' 유저 플로우를 happy path + 에러 경로(검증/거절/타임아웃/세션만료)로 작성.
출력: mermaid 다이어그램 2개 이상, 화면 목록 표, 분기/예외 명세 표.
요구: 모든 분기 2출구, 모든 에러에 메시지+복구.
```

