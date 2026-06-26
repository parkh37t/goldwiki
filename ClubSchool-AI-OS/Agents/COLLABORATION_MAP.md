# COLLABORATION_MAP — 에이전트 간 인계(handoff) 흐름 (ClubSchool AI OS v1.0)

> "누가 누구에게 무엇을 넘기는가"를 정의한다. 각 인계는 **명확한 입력·출력 아티팩트**를 가지며,
> 받는 쪽은 작업 전 골드위키를 먼저 참조한다. 단계 정본은
> [27 자동화 워크플로우](../GoldWiki/27_AUTOMATION_WORKFLOW.md)다.

## 1. 인계 원칙

1. **구조화된 산출** — 모든 산출물은 다음 단계가 곧바로 입력으로 쓸 수 있게 구조화한다.
2. **DoD 충족 후 인계** — [29 품질 체크리스트](../GoldWiki/29_QUALITY_CHECKLIST.md)의 단계 DoD를 충족해야 넘긴다.
3. **골드위키 경유** — 산출물은 골드위키 해당 문서에 반영되고, 받는 쪽은 그 문서를 먼저 읽는다.
4. **게이트 통과 인계** — 게이트(A/B/C)는 Project Director 승인 후에만 다음 계층으로 인계한다.

---

## 2. 전체 인계 흐름도

```mermaid
flowchart TD
    RFP([RFP 수령]) --> SD["Sales Director<br/>go/no-go"]
    SD -->|수주 전략 브리프| BA["Business Analyst"]
    SD -->|윈테마 방향| PS["Proposal Strategist"]

    BA -->|요구사항·RTM·WBS근거| PS
    BA -->|요구사항 명세| PO["Product Owner"]
    PS -->|제안 전략·평가기준| GA{게이트 A<br/>PD 승인}
    SD -->|가격·차별화| GA

    GA -->|승인| PD["Project Director<br/>WBS·일정"]
    PD -->|작업 패키지| UXR["UX Researcher"]
    PD -->|작업 패키지| SP["Service Planner"]

    PO -->|백로그·인수기준| UXR
    UXR -->|인사이트·페르소나·여정| SP
    SP -->|IA·화면 목록·블루프린트| UID["UI Designer"]
    UXR -->|UX 전략| UID
    SP -->|유저 플로우| IXD["Interaction Designer"]

    UID -->|UI 컨셉·시안| BX["BX Designer"]
    BX -->|브랜드 언어·톤| UID
    UID -->|디자인 시스템·토큰·컴포넌트| IXD
    IXD -->|모션·상태 사양| UID
    UID -->|디자인 시스템| A11Y["Accessibility Specialist"]
    A11Y -->|접근성 적합성 피드백| UID

    UID --> GB{게이트 B<br/>PD+A11Y 승인}
    GB -->|승인: 확정 디자인·토큰| PUB["Publishing Engineer"]
    PUB -->|시맨틱 HTML/CSS 프로토타입| FE["Frontend Engineer"]
    FE -->|UI 데이터 요구| API["API Engineer"]
    API -->|API 계약(OpenAPI)| BE["Backend Engineer"]
    BE -->|데이터 요구| DB["Database Architect"]
    DB -->|스키마·마이그레이션| BE
    BE -->|보안 검토 요청| SEC["Security Engineer"]
    SEC -->|보안 통제·위협 모델| FE & BE & API & OPS["DevOps Engineer"]

    FE & BE & API & DB --> QA["QA Engineer"]
    QA -->|결함·품질 리포트| FE & BE
    QA --> GC{게이트 C<br/>PD+QA+SEC 승인}
    GC -->|승인| OPS
    OPS -->|배포·릴리스 노트| EXEC["경영 요약<br/>PD + CEO"]
    EXEC --> DELIV([클라이언트 납품])

    DOC["Documentation Specialist"] -. "전 단계 골드위키 동기화·중복 점검" .- RFP & GA & GB & GC & EXEC
    AIE["AI Engineer"] -. "오케스트레이션·RAG·프롬프트 품질" .- PD
```

---

## 3. 단계별 인계 명세(입력 → 산출물 → 받는 쪽)

### 제안 단계

| 인계 | 보내는 쪽 | 받는 쪽 | 핵심 아티팩트 | 골드위키 접점 |
|------|-----------|---------|----------------|----------------|
| 1→2 | Sales Director | Business Analyst | RFP 원문, 수주 전략 브리프, go/no-go 판정 | [03](../GoldWiki/03_RFP_FRAMEWORK.md) [34](../GoldWiki/34_CLIENT_KNOWLEDGE.md) |
| 2→3 | Business Analyst | Proposal Strategist | RFP 분석서(요구·제약·평가) | [04](../GoldWiki/04_RFP_ANALYSIS.md) |
| 3→4 | Proposal Strategist | Business Analyst, Product Owner | 요약·핵심 동인 정리 | [04](../GoldWiki/04_RFP_ANALYSIS.md) |
| 4→5 | Business Analyst | Proposal Strategist | 요구사항 목록, RTM 초안, 인수기준 | [06](../GoldWiki/06_BUSINESS_ANALYSIS.md) |
| 5→6 | Proposal Strategist | Business Analyst | 평가기준·배점 분석 | [05](../GoldWiki/05_PROPOSAL_STRATEGY.md) |
| 6→7 | Proposal Strategist | Project Director | 숨은 기대·암묵 요구 목록 | [04](../GoldWiki/04_RFP_ANALYSIS.md) |
| 7→8·9 | Project Director | BA·Service Planner / SP·UXR | 리스크 레지스터 | [35](../GoldWiki/35_PROJECT_MEMORY.md) |
| 8·9→10 | BA/SP/UXR | Proposal Strategist | 경쟁사·글로벌 BP 벤치마크 | [36](../GoldWiki/36_REFERENCE_LIBRARY.md) [37](../GoldWiki/37_BEST_PRACTICES.md) |
| 10→게이트 A | Proposal Strategist, Sales Director | Project Director | 제안 전략·윈테마·경영요약·컴플라이언스 매트릭스 | [05](../GoldWiki/05_PROPOSAL_STRATEGY.md) |

### 설계·디자인 단계

| 인계 | 보내는 쪽 | 받는 쪽 | 핵심 아티팩트 | 골드위키 접점 |
|------|-----------|---------|----------------|----------------|
| 게이트 A→11 | Project Director | (자체) | 승인된 제안 전략 | [32](../GoldWiki/32_DECISION_LOG.md) |
| 11→12 | Project Director | UX Researcher, Service Planner | WBS, 일정, 담당 매핑 | [27](../GoldWiki/27_AUTOMATION_WORKFLOW.md) |
| 12→13 | UXR, Service Planner | UX Researcher, Interaction Designer | IA(사이트맵·내비) | [11](../GoldWiki/11_INFORMATION_ARCHITECTURE.md) |
| 13→14 | UXR, Interaction Designer | Service Planner, UI Designer | 유저 플로우 다이어그램 | [12](../GoldWiki/12_USER_FLOW.md) |
| 14→15 | Service Planner, UI Designer | UX Researcher | 화면 목록(스크린 인벤토리) | [11](../GoldWiki/11_INFORMATION_ARCHITECTURE.md) |
| 15→16 | UX Researcher | UI Designer, BX Designer | UX 전략·원칙·여정 | [07](../GoldWiki/07_UX_PRINCIPLES.md) [13](../GoldWiki/13_USER_JOURNEY.md) |
| 16→17 | UI Designer, BX Designer | UI/IxD/A11y | UI 컨셉·시안·브랜드 언어 | [08](../GoldWiki/08_UI_GUIDELINES.md) |
| 17→게이트 B | UI Designer, IxD, A11y | Project Director | 디자인 시스템·토큰·컴포넌트·모션·접근성 적합성 | [09](../GoldWiki/09_DESIGN_SYSTEM.md) [14](../GoldWiki/14_COMPONENT_LIBRARY.md) [15](../GoldWiki/15_DESIGN_TOKEN.md) [16](../GoldWiki/16_ACCESSIBILITY.md) |

### 빌드·품질 단계

| 인계 | 보내는 쪽 | 받는 쪽 | 핵심 아티팩트 | 골드위키 접점 |
|------|-----------|---------|----------------|----------------|
| 게이트 B→18 | Project Director | Publishing Engineer, Frontend Engineer | 확정 디자인·토큰 | [17](../GoldWiki/17_HTML_GUIDE.md) [15](../GoldWiki/15_DESIGN_TOKEN.md) |
| 18→19 | Publishing Engineer | Frontend/Backend/API/DB | 시맨틱 HTML/CSS 프로토타입, 퍼블리싱 계획 | [18](../GoldWiki/18_CSS_GUIDE.md) [20](../GoldWiki/20_FRONTEND_GUIDE.md) |
| 19 내부 | API Engineer | Backend, Frontend | API 계약(OpenAPI) | [22](../GoldWiki/22_API_STANDARD.md) |
| 19 내부 | Database Architect | Backend | 데이터 모델·마이그레이션 | [23](../GoldWiki/23_DATABASE_GUIDE.md) |
| 19→20 | Frontend/Backend/API/DB | QA Engineer, Security Engineer | 개발 계획·아키텍처·구현 산출 | [21](../GoldWiki/21_BACKEND_GUIDE.md) [24](../GoldWiki/24_SECURITY_GUIDE.md) |
| 20→게이트 C | QA Engineer, Security Engineer | Project Director | 테스트 계획·종료기준·보안 검토 | [30](../GoldWiki/30_TEST_STRATEGY.md) [29](../GoldWiki/29_QUALITY_CHECKLIST.md) |
| 게이트 C→21 | Project Director | DevOps, CEO | 품질 통과 증거 | [31](../GoldWiki/31_RELEASE_PROCESS.md) |
| 21→납품 | Project Director, CEO | 클라이언트 | 경영 요약·납품 패키지 | [02](../GoldWiki/02_BUSINESS_GOALS.md) [35](../GoldWiki/35_PROJECT_MEMORY.md) |

---

## 4. 상시 협업 라인(단계 무관)

| 협업 라인 | 관계 | 인계/협의 내용 |
|-----------|------|----------------|
| Documentation Specialist ↔ 전 에이전트 | 거버넌스 | 모든 결정·학습을 골드위키에 환류, 중복·모순 점검 |
| AI Engineer ↔ Project Director | 오케스트레이션 | 에이전트 호출 체인·RAG·프롬프트 품질 조율 |
| Security Engineer ↔ Backend/API/DB/DevOps | 보안 내재화 | 위협 모델·통제를 설계 단계부터 협의(Shift-Left) |
| Accessibility Specialist ↔ UI/FE/QA | 접근성 내재화 | 설계·구현·검수 전 단계에서 WCAG 적합성 협의 |
| BX Designer ↔ UI Designer | 브랜드 일관성 | 모든 터치포인트의 톤·보이스·감성 일관성 유지 |

> 인계가 막히거나 산출물이 DoD 미달일 때는 [ESCALATION_POLICY.md](ESCALATION_POLICY.md)의
> 트리거·SLA에 따라 기능 리드 → Project Director로 에스컬레이션한다.
