# Goldwiki Digital — AI 증강 컨설팅 워크스페이스

> RFP 분석, 제안서 생성, UX/UI 기획, 인터페이스 디자인, HTML 프로토타입 퍼블리싱, 개발 지원,
> QA를 **Gold Wiki(골드위키)**를 조직의 두뇌로 삼아 수행하는, 완전하고 프로덕션 수준의
> 자율 디지털 컨설팅 회사로서의 Claude Code 워크스페이스입니다.

## 무엇인가

이 저장소는 Claude Code를 멀티에이전트 소프트웨어/디자인 조직으로 전환합니다. 다음을 포함합니다:

- **Gold Wiki(골드위키)** — 회사 컨텍스트, 방법론, 디자인 시스템, 엔지니어링 표준, AI
  워크플로우, QA, 조직 기억의 단일 진실 공급원인 41개 문서 지식베이스(`/GoldWiki`).
- **22개 전문 서브에이전트**(`/.claude/agents`) — CEO부터 Documentation Specialist까지,
  각각 미션·책임·의사결정/협업/에스컬레이션 규칙·프롬프트 템플릿·예시를 보유.
- **자율 RFP → 납품 파이프라인** — RFP 업로드부터 클라이언트 제출용 경영 요약까지 상호 링크된 21단계.

## 시작점

| 당신이… | 읽을 문서 |
|---------|-----------|
| 워크스페이스가 처음이라면 | [GoldWiki/00_START_HERE.md](GoldWiki/00_START_HERE.md) |
| 작업을 맡은 AI 에이전트라면 | [CLAUDE.md](CLAUDE.md) → [00_START_HERE](GoldWiki/00_START_HERE.md) |
| RFP에 대응한다면 | [27_AUTOMATION_WORKFLOW.md](GoldWiki/27_AUTOMATION_WORKFLOW.md) |
| 표준을 찾는다면 | 엔지니어링 17–24, 디자인 07–16 |
| 템플릿/프롬프트를 찾는다면 | [38_TEMPLATE_LIBRARY](GoldWiki/38_TEMPLATE_LIBRARY.md), [40_PROMPT_LIBRARY](GoldWiki/40_PROMPT_LIBRARY.md) |

## 한 줄 거버넌스

모든 에이전트는 결정 전 골드위키를 참조하고, 골드위키가 단일 진실 공급원이며, 지식 중복을
금지하고, 모든 결정은 의사결정 로그·프로젝트 메모리·베스트 프랙티스·레퍼런스 라이브러리를
갱신합니다. [CLAUDE.md](CLAUDE.md) 참조.

## 구조

```
GoldWiki/         41개 지식 문서 (00–40)
.claude/agents/   22개 전문 에이전트 정의
CLAUDE.md         모든 에이전트를 위한 운영 계약서
```
