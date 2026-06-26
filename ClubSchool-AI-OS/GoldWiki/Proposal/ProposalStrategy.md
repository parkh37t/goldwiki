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
