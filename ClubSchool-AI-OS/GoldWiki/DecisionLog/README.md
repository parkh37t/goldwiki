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
