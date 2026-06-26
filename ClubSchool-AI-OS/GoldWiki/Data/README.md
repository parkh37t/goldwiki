# Data — 데이터/분석 지식 폴더

> ClubSchool AI OS GoldWiki(SSOT)의 토픽 폴더. 데이터·지표 작업 전 이 README와 핵심 가이드를 먼저 참조한다.

## 폴더 목적

신뢰할 수 있는 데이터로 의사결정을 지원하는 **데이터·분석 표준**을 관리한다. 데이터 모델링(메달리온·차원 모델), 단일 지표 정의, 분석 파이프라인, 대시보드, 데이터 거버넌스를 다룬다. 운영 DB는 번호형 [23_DATABASE_GUIDE](../23_DATABASE_GUIDE.md)와 연계하며, 본 폴더는 그 위의 **분석 계층(Gold 마트·지표·BI)**을 책임진다.

## 개요 — 데이터 모델링·지표·분석 파이프라인

- **데이터 모델링**: 운영 데이터(Bronze) → 정제(Silver) → 분석 마트(Gold: 팩트/차원). 스타 스키마 우선.
- **지표**: "한 번 정의, 한 곳 관리" 원칙의 지표 사전. 전환율·리드타임·재작업률 등.
- **분석 파이프라인**: 수집→적재→변환→테스트→서빙→모니터링. 데이터 테스트를 CI에 통합.

## 포함 문서

| 문서 | 설명 |
| --- | --- |
| [DataAnalyticsGuide.md](DataAnalyticsGuide.md) | 데이터 분석/지표 정의/대시보드 가이드(8섹션, SQL 예제 포함) |

## 관련 GoldWiki 토픽 / 번호형 문서

- 토픽: [Backend](../Backend/BackendGuide.md), [AI](../AI/AIAutomationGuide.md), [PMO](../PMO/README.md)
- 번호형: [02_BUSINESS_GOALS](../02_BUSINESS_GOALS.md), [06_BUSINESS_ANALYSIS](../06_BUSINESS_ANALYSIS.md), [23_DATABASE_GUIDE](../23_DATABASE_GUIDE.md), [24_SECURITY_GUIDE](../24_SECURITY_GUIDE.md), [29_QUALITY_CHECKLIST](../29_QUALITY_CHECKLIST.md)

## 담당 에이전트

- **주담당**: `data-analytics-lead`
- **협업**: `backend-lead`, `product-strategy-lead`, `business-analysis-lead`, `ai-automation-lead`, `security-risk-lead`

## 거버넌스

모든 지표는 단일 정의로 관리하고 대시보드 수치는 원천과 대사 일치해야 하며, PII는 마스킹·접근 통제하고 지표 정의 변경은 [의사결정 로그](../DecisionLog/README.md)에 기록한다.
