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
