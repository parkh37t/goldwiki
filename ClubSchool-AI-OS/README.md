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
