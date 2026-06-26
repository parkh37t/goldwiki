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
