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
