# Industry — 업종 지식 인덱스

> ClubSchool AI OS GoldWiki의 **업종(도메인) 지식 베이스**. 제안·기획·설계·구축 의사결정 전, 해당 업종 문서를 먼저 참조해 업종 특성·규제·Pain Point·차별화 포인트를 반영한다. 업종 지식의 단일 진실 공급원(SSOT).

## 폴더 목적

RFP/제안 대상이 속한 업종의 **현실 맥락**(한국 시장·규제·사용자·기술)을 표준화해, 모든 에이전트가 동일한 업종 인사이트 위에서 작업하도록 한다. 각 문서는 동일한 9섹션 형식(업종 특성 / 주요 사용자 / 주요 Pain Point / 일반적인 RFP 요구사항 / UX·UI 핵심 전략 / 기술 고려사항 / 제안서 차별화 포인트 / 리스크 / 체크리스트)을 따른다.

## 포함 문서 (10)

| # | 업종 | 문서 | 핵심 규제/키워드 |
|---|---|---|---|
| 1 | 은행/금융 | [Banking.md](./Banking.md) | 전자금융감독규정·금소법·망분리·FDS·마이데이터 |
| 2 | 보험 | [Insurance.md](./Insurance.md) | 금소법 설명의무·민감정보 동의·전자청약·간편청구 |
| 3 | 호텔/호스피탤리티 | [Hotel.md](./Hotel.md) | 다이렉트 부킹·PMS·다국어/다통화·PCI-DSS |
| 4 | 이커머스/리테일 | [Commerce.md](./Commerce.md) | 전자상거래법·전환율·피크 트래픽·간편결제 |
| 5 | 공공 | [PublicSector.md](./PublicSector.md) | 웹 접근성 의무(KWCAG 2.2)·표준프레임워크·감리·GPKI |
| 6 | 통신 | [Telecom.md](./Telecom.md) | 단통법·요금제 시뮬레이터·본인확인·대규모 트래픽 |
| 7 | 대기업 포털/인트라넷 | [EnterprisePortal.md](./EnterprisePortal.md) | SSO·HR 연동·RBAC·DLP·통합검색 |
| 8 | CRM/고객관리 | [CRM.md](./CRM.md) | 360° 뷰·CDP·마케팅 동의/수신거부·여정 자동화 |
| 9 | AI 서비스/플랫폼 | [AIService.md](./AIService.md) | RAG·가드레일·환각 관리·비용/지연·평가(eval) |
| 10 | 멤버십/구독 | [Membership.md](./Membership.md) | 정기결제·간편 해지·Churn/LTV·dunning |

## 사용법

1. **RFP 착수 시**: 발주처 업종을 식별하고 해당 문서를 정독한다(없으면 가장 가까운 문서 + 보완 리서치).
2. **제안/기획 단계**: "제안서 차별화 포인트"와 "주요 Pain Point"를 제안 핵심 메시지로 활용한다.
3. **설계/구축 단계**: "UX/UI 핵심 전략"·"기술 고려사항"을 설계 결정의 근거로 인용한다.
4. **품질 게이트**: 각 문서 말미 "체크리스트"를 제안·산출물 검수에 적용한다.
5. **갱신**: 신규 프로젝트에서 얻은 업종 인사이트·규제 변경은 해당 문서에 반영하고 [../DecisionLog](../DecisionLog/)에 결정을 남긴다. 지식 중복 금지.

## RFP 분석 연계

업종 문서는 RFP 분석의 입력으로 사용된다. RFP 분석 프레임워크에서 업종 식별 → 본 인덱스에서 해당 문서 로드 → 요구사항/리스크/차별화에 반영한다.

- RFP 분석 프레임워크: [../RFP/RFPAnalysisFramework.md](../RFP/RFPAnalysisFramework.md)
- 번호형 RFP 문서: [../03_RFP_FRAMEWORK.md](../03_RFP_FRAMEWORK.md) · [../04_RFP_ANALYSIS.md](../04_RFP_ANALYSIS.md)
- 제안 전략: [../05_PROPOSAL_STRATEGY.md](../05_PROPOSAL_STRATEGY.md)

## 관련 GoldWiki 토픽

- 보안/리스크: [../24_SECURITY_GUIDE.md](../24_SECURITY_GUIDE.md)
- 웹 접근성: [../16_ACCESSIBILITY.md](../16_ACCESSIBILITY.md)
- 정보구조(IA): [../11_INFORMATION_ARCHITECTURE.md](../11_INFORMATION_ARCHITECTURE.md)
- UX 원칙: [../07_UX_PRINCIPLES.md](../07_UX_PRINCIPLES.md)
- AI 가이드: [../25_AI_GUIDE.md](../25_AI_GUIDE.md)

## 담당 에이전트

- **주관**: `industry-research-lead`(업종 리서치) — 업종 지식 작성·갱신·검증 책임.
- **협업**: `rfp-strategy-lead`(RFP 연계), `proposal-lead`(차별화 메시지), `security-risk-lead`(규제/리스크), `ux-research-lead`·`service-planning-lead`(전략 반영).

## 거버넌스

모든 에이전트는 업종 의사결정 전 본 인덱스와 해당 업종 문서를 먼저 참조하며, 새로 검증된 업종 인사이트는 중복 없이 해당 문서에 반영하고 DecisionLog를 갱신한다.
