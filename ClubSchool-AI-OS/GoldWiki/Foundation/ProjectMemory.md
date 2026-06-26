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
