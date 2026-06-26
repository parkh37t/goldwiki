# FAQ — 자주 묻는 질문

ClubSchool AI OS v1.0 설치·사용·운영에서 자주 나오는 질문을 묶었다. 더 깊은 내용은 각 답변의 링크를 따른다.

## 분류 색인

| 분류 | 질문 |
|---|---|
| 설치·시작 | Q1, Q2, Q3 |
| 기본 개념 | Q4, Q5, Q6 |
| 에이전트 사용 | Q7, Q8, Q9 |
| 파이프라인 실행 | Q10, Q11 |
| GoldWiki 운영 | Q12, Q13 |
| 커스터마이즈 | Q14, Q15 |
| 문제 해결 | Q16, Q17 |

---

## 설치·시작

### Q1. ClubSchool AI OS는 무엇인가?
Claude Code 위에서 동작하는 "AI 디지털 컨설팅 회사 운영체제"다. RFP 분석부터 납품까지 디지털 에이전시 전 공정을 22개 전문 에이전트와 GoldWiki(SSOT)로 수행한다. 개요는 루트 `README.md`, 구조는 [`ARCHITECTURE.md`](./ARCHITECTURE.md)를 본다.

### Q2. 어떻게 설치·시작하는가?
1. 리포지토리를 연다(`ClubSchool-AI-OS/`). 2. 루트 `INSTALL.md`의 절차를 따른다. 3. Claude Code가 `CLAUDE.md`와 `.claude/`를 자동 인식하는지 확인한다. 4. [`../GoldWiki/00_START_HERE.md`](../GoldWiki/00_START_HERE.md)로 시스템을 파악한다. 신규 합류자는 [`ONBOARDING.md`](./ONBOARDING.md)의 30분 빠른 시작을 권장한다.

### Q3. 설치가 잘 됐는지 어떻게 확인하는가?
다음을 점검한다.

- [ ] `GoldWiki/`에 41개 문서(`00_`~`40_`)가 있다
- [ ] `.claude/agents/`에 22개 에이전트 정의가 있다
- [ ] `.claude/commands/`에 커맨드(`analyze-rfp`, `generate-proposal`)가 있다
- [ ] `/analyze-rfp` 같은 슬래시 커맨드가 인식된다
- [ ] `Docs/`에 본 문서 계층이 있다

---

## 기본 개념

### Q4. GoldWiki가 정확히 무슨 역할인가?
조직의 단일 진실 공급원(SSOT)이자 두뇌다. 모든 표준·결정·기억이 여기에 모이며, 모든 에이전트는 작업 전 GoldWiki를 먼저 참조하고 작업 후 다시 기록한다. 상세는 [`GLOSSARY.md`](./GLOSSARY.md)와 [`GOVERNANCE.md`](./GOVERNANCE.md).

### Q5. "지식 중복 금지"가 왜 중요한가?
같은 지식이 여러 곳에 있으면 어느 것이 정본인지 모호해지고, 갱신 누락으로 충돌이 생긴다. 항상 한 곳(정본)에만 두고 나머지는 링크한다. 이것이 시스템의 일관성·추적성을 지킨다.

### Q6. Docs/와 GoldWiki/의 차이는?
GoldWiki는 "무엇을 만드는가"(실무 표준·산출물 지식)의 정본이고, Docs는 "이 시스템이 어떻게 굴러가는가"(아키텍처·용어·운영)를 설명한다. Docs는 GoldWiki를 대체하지 않고 참조·링크한다.

---

## 에이전트 사용

### Q7. 에이전트는 몇 개이고 어떻게 부르는가?
22개다. Claude Code에서 직무에 맞는 에이전트에게 작업을 위임하거나, 커맨드/워크플로우가 적절한 에이전트를 자동 선택하도록 한다. 로스터와 계층은 [`ARCHITECTURE.md`](./ARCHITECTURE.md) §2.2, 사람용 레지스트리는 `Agents/`에 있다.

### Q8. 여러 에이전트가 협업하는 작업은 누가 조율하는가?
주로 Project Director가 오케스트레이션한다. 단계·의존성·책임(RACI)에 따라 작업을 분배하고 품질 게이트를 통과한 산출물만 다음 단계로 넘긴다.

### Q9. 에이전트가 GoldWiki를 참조하지 않으면 어떻게 되나?
이는 행동강령 위반이다. 모든 에이전트는 의사결정 전 GoldWiki 우선 참조가 의무다([`../GoldWiki/28_SUBAGENT_RULES.md`](../GoldWiki/28_SUBAGENT_RULES.md)). 참조 없이 만든 산출물은 일관성·근거가 보장되지 않으므로 리뷰에서 반려한다.

---

## 파이프라인 실행

### Q10. RFP를 넣으면 어디까지 자동으로 되나?
21단계 파이프라인(읽기→…→경영 요약)을 통해 RFP 분석·제안 전략·IA·UX/UI·개발/QA 계획·경영 요약까지 산출물을 만든다. 정본은 [`../GoldWiki/27_AUTOMATION_WORKFLOW.md`](../GoldWiki/27_AUTOMATION_WORKFLOW.md). 시작은 `/analyze-rfp [RFP 파일 경로]`.

### Q11. 21단계를 한 번에 다 돌려야 하나?
아니다. 단계별로 끊어 실행하고 각 단계 산출물을 검토한 뒤 진행할 수 있다. 각 단계는 품질 게이트를 가지며, 통과하지 못하면 다음으로 넘기지 않는다([`../GoldWiki/29_QUALITY_CHECKLIST.md`](../GoldWiki/29_QUALITY_CHECKLIST.md)).

---

## GoldWiki 운영

### Q12. GoldWiki는 언제 갱신하나?
의미 있는 결정이 생길 때마다다. 의사결정 4문서 규칙에 따라 의사결정 로그(32)·프로젝트 메모리(35)·베스트 프랙티스(37)·레퍼런스 라이브러리(36)를 갱신한다. 상세는 [`GOVERNANCE.md`](./GOVERNANCE.md).

### Q13. 새 지식을 어디에 적어야 할지 모르겠다.
번호대 라우팅을 참고한다(RFP=03–06, 디자인=07–16, 개발=17–25 등, [`ARCHITECTURE.md`](./ARCHITECTURE.md) §2.1). 기존 정본이 있으면 그 문서를 갱신하고, 없으면 신설 대신 가장 가까운 정본에 절을 추가하는 것을 우선한다. 새 문서가 꼭 필요하면 [`CONTRIBUTING.md`](./CONTRIBUTING.md) 절차를 따른다.

---

## 커스터마이즈

### Q14. 새 커맨드/에이전트/템플릿을 추가하려면?
4개 확장 점이 있다(에이전트·커맨드·워크플로우·템플릿). 추가 위치와 동기화 대상은 [`ARCHITECTURE.md`](./ARCHITECTURE.md) §6 표를, 구체 절차·네이밍·리뷰는 [`CONTRIBUTING.md`](./CONTRIBUTING.md)를 본다. 모든 확장은 GoldWiki 동기화가 의무다.

### Q15. 우리 회사 맥락(브랜드·고객·톤)을 반영하려면?
회사 맥락은 [`../GoldWiki/01_COMPANY_CONTEXT.md`](../GoldWiki/01_COMPANY_CONTEXT.md), 고객 지식은 [`../GoldWiki/34_CLIENT_KNOWLEDGE.md`](../GoldWiki/34_CLIENT_KNOWLEDGE.md), 디자인 톤은 디자인 시스템(09)·토큰(15)에 반영한다. 이들 정본을 고치면 전 에이전트의 산출에 일관 반영된다.

---

## 문제 해결

### Q16. 산출물 품질이 들쭉날쭉하다. 어떻게 안정화하나?
세 가지를 확인한다. (1) 에이전트가 GoldWiki를 참조했는가, (2) 적절한 템플릿을 적용했는가, (3) 품질 게이트를 거쳤는가. 반복되는 실수는 [`../GoldWiki/39_COMMON_ERRORS.md`](../GoldWiki/39_COMMON_ERRORS.md)에 등록해 재발을 막는다.

### Q17. 커맨드가 인식되지 않거나 에러가 난다.
`.claude/commands/<name>.md`의 frontmatter(`description`, `argument-hint`) 형식과 파일명(kebab-case)을 확인한다. 그래도 안 되면 설치 점검(Q3)과 [`../GoldWiki/39_COMMON_ERRORS.md`](../GoldWiki/39_COMMON_ERRORS.md)를 참조한다.

## 관련 문서

- 온보딩: [`ONBOARDING.md`](./ONBOARDING.md)
- 시스템 구조: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 운영 원칙: [`GOVERNANCE.md`](./GOVERNANCE.md)
