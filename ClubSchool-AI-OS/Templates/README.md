# Templates — 산출물 템플릿 라이브러리

이 디렉터리는 ClubSchool AI OS의 컨설턴트가 **복사해서 바로 채워 쓰는** 산출물 템플릿 모음이다. 각 템플릿은 상단의 사용 안내(설명 + 작성 팁)와 실제 채울 수 있는 구조화된 본문(섹션·표·체크리스트·`{플레이스홀더}`)으로 구성된다. 사람이 직접 편집하는 용도이며, 에이전트가 자동 생성하는 기계용 템플릿은 `../.claude/templates/`에 따로 둔다.

> 정본 거버넌스는 GoldWiki(SSOT)에 있다. 본 디렉터리는 GoldWiki 38(템플릿 라이브러리)과 일관되며, 독립적으로도 사용 가능하다.
> 관련: [`../GoldWiki/38_TEMPLATE_LIBRARY.md`](../GoldWiki/38_TEMPLATE_LIBRARY.md)

---

## 사용 규칙

1. **복사 후 작성**: 템플릿을 프로젝트 작업 폴더로 복사한 뒤 채운다. 본 디렉터리의 원본은 수정하지 않는다.
2. **파일명 규칙**: `{프로젝트코드}_{문서종류}_{YYYYMMDD}_v{버전}.md` 형식을 권장한다. 예: `ACME_Proposal_20260626_v1.0.md`.
3. **플레이스홀더 제거**: `{...}` 형태의 플레이스홀더는 빈칸 없이 모두 실제 값으로 치환한다. "추후 작성", "TODO", "미정" 같은 모호한 표현을 남기지 않는다. 결정이 필요하면 의사결정 로그에 항목을 만들고 링크한다.
4. **근거 기반**: 주장·수치·일정에는 근거(출처, 가정, 참조 GoldWiki 문서)를 명시한다.
5. **SSOT 갱신**: 산출물에서 내린 결정·교훈·참조 자료는 GoldWiki의 의사결정 로그(32)·프로젝트 메모리(35)·베스트 프랙티스(37)·레퍼런스 라이브러리(36)에 반영한다.
6. **버전 관리**: 외부 제출/배포 시 버전을 올리고 각 문서 하단의 변경 이력 표를 갱신한다.
7. **언어**: 본문은 한국어로 작성한다. 표준명(WCAG/OWASP/REST/SemVer 등)·코드·식별자만 영문을 유지한다.

---

## 템플릿 인덱스

| # | 파일 | 용도 | 주 사용 에이전트 | 관련 GoldWiki |
|---|------|------|------------------|----------------|
| 1 | [README.md](README.md) | 템플릿 인덱스 및 사용 규칙 | 전체 | [38](../GoldWiki/38_TEMPLATE_LIBRARY.md) |
| 2 | [Proposal.md](Proposal.md) | 제안서 | Proposal Strategist, Sales Director | [05](../GoldWiki/05_PROPOSAL_STRATEGY.md) |
| 3 | [Executive_Summary.md](Executive_Summary.md) | 경영 요약 (1~2p) | Project Director, CEO | [05](../GoldWiki/05_PROPOSAL_STRATEGY.md), [02](../GoldWiki/02_BUSINESS_GOALS.md) |
| 4 | [RFP_Analysis_Report.md](RFP_Analysis_Report.md) | RFP 분석 보고서 | Proposal Strategist, Business Analyst | [03](../GoldWiki/03_RFP_FRAMEWORK.md), [04](../GoldWiki/04_RFP_ANALYSIS.md) |
| 5 | [WBS.md](WBS.md) | 작업 분해 구조 | Project Director, Product Owner | [27](../GoldWiki/27_AUTOMATION_WORKFLOW.md), [06](../GoldWiki/06_BUSINESS_ANALYSIS.md) |
| 6 | [IA_Sitemap.md](IA_Sitemap.md) | 정보구조·사이트맵 | Service Planner, Product Owner | [11](../GoldWiki/11_INFORMATION_ARCHITECTURE.md) |
| 7 | [User_Flow.md](User_Flow.md) | 유저 플로우 | UX Researcher, Service Planner | [12](../GoldWiki/12_USER_FLOW.md), [13](../GoldWiki/13_USER_JOURNEY.md) |
| 8 | [Screen_List.md](Screen_List.md) | 화면 목록 | Service Planner, Product Owner | [11](../GoldWiki/11_INFORMATION_ARCHITECTURE.md), [12](../GoldWiki/12_USER_FLOW.md) |
| 9 | [UX_Strategy.md](UX_Strategy.md) | UX 전략 | UX Researcher | [07](../GoldWiki/07_UX_PRINCIPLES.md), [13](../GoldWiki/13_USER_JOURNEY.md) |
| 10 | [UI_Concept_Brief.md](UI_Concept_Brief.md) | UI 컨셉 브리프 | UI Designer, BX Designer | [08](../GoldWiki/08_UI_GUIDELINES.md), [09](../GoldWiki/09_DESIGN_SYSTEM.md) |
| 11 | [Test_Plan.md](Test_Plan.md) | 테스트 계획 | QA Engineer | [29](../GoldWiki/29_QUALITY_CHECKLIST.md), [30](../GoldWiki/30_TEST_STRATEGY.md) |
| 12 | [Release_Notes.md](Release_Notes.md) | 릴리스 노트 | DevOps Engineer, Documentation Specialist | [31](../GoldWiki/31_RELEASE_PROCESS.md) |
| 13 | [Meeting_Note.md](Meeting_Note.md) | 회의록 | Documentation Specialist, 전체 | [33](../GoldWiki/33_MEETING_NOTE.md) |

---

## 산출물 흐름 (21단계 파이프라인 대응)

```
RFP 수신
  └─ RFP_Analysis_Report ─ Proposal ─ Executive_Summary       (수주)
        └─ WBS                                                 (착수)
             └─ IA_Sitemap ─ User_Flow ─ Screen_List          (설계)
                  └─ UX_Strategy ─ UI_Concept_Brief           (UX/UI)
                       └─ (디자인 시스템 → 퍼블리싱 → 개발)
                            └─ Test_Plan ─ Release_Notes       (QA/납품)
Meeting_Note 는 전 단계에서 상시 작성한다.
```

각 산출물의 결정 사항은 상위 GoldWiki 문서를 참조하고, 결과는 의사결정 로그(32)에 회신한다.
