# 36 · 레퍼런스 라이브러리(Reference Library)

| 항목 | 내용 |
| --- | --- |
| **목적** | 골드위키 디지털이 신뢰하는 외부 레퍼런스·표준을 분야별로 큐레이션하고, 각 자료의 중요성과 내부 문서와의 상호참조를 정리한다. |
| **대상 독자** | 전 직군·전 에이전트(근거 확인이 필요한 모든 작업) |
| **담당(Owner) 에이전트** | Documentation Specialist (분야별 검수: 각 도메인 리드) |
| **참조(상위 문서)** | [회사 컨텍스트](01_COMPANY_CONTEXT.md), [베스트 프랙티스](37_BEST_PRACTICES.md) |
| **연계(하위 문서)** | [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md) |
| **최종 수정** | 2026-06-26 |
| **상태** | 활성(Active) |

---

## 1. 사용 원칙

1. **표준을 근거로 말한다** — 주장에는 출처를 단다. 권위 있는 1차 표준을 우선한다.
2. **버전을 명시한다** — 표준·도구는 버전이 결정을 바꾼다(예: WCAG 2.2 vs 2.1).
3. **내부 적용처를 연결한다** — 외부 표준은 항상 그것을 적용하는 내부 골드위키 문서와 묶는다.
4. **링크가 아니라 이유를 기록한다** — "왜 이 자료가 중요한가"를 한 줄로 남긴다.

---

## 2. 분야별 레퍼런스

### 2.1 UX / 사용성
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| Nielsen Norman Group (NN/g) | 사용성 휴리스틱·리서치 방법론 | 사용성 평가의 사실상 표준 어휘 제공 | [UX 원칙](07_UX_PRINCIPLES.md) |
| Jakob Nielsen 10대 휴리스틱 | 인터페이스 평가 10원칙 | 휴리스틱 평가의 기준 프레임 | [UX 원칙](07_UX_PRINCIPLES.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| 《About Face》(Cooper) | 인터랙션 디자인 원론 | 목표 지향 설계의 이론적 토대 | [유저 플로우](12_USER_FLOW.md), [유저 저니](13_USER_JOURNEY.md) |

### 2.2 접근성 / WCAG
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| W3C WCAG 2.2 | 웹 접근성 국제 표준 | 전사 접근성 기준선(AA), 법적 방어선 | [접근성](16_ACCESSIBILITY.md), ADR-0002 |
| WAI-ARIA Authoring Practices | 위젯 접근성 구현 패턴 | 컴포넌트 접근성 구현의 정답지 | [컴포넌트 라이브러리](14_COMPONENT_LIBRARY.md) |
| 한국형 웹콘텐츠 접근성 지침(KWCAG) | 국내 공공 접근성 기준 | 국내 공공·금융 사업 필수 | [접근성](16_ACCESSIBILITY.md) |

### 2.3 디자인 시스템 / 토큰
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| W3C Design Tokens Community Group | 토큰 포맷 표준 초안 | 토큰 상호운용성 기준 | [디자인 토큰](15_DESIGN_TOKEN.md), ADR-0001 |
| Style Dictionary | 토큰 변환·빌드 도구 | 다중 플랫폼 토큰 배포 표준 도구 | [디자인 토큰](15_DESIGN_TOKEN.md) |
| Material Design / Apple HIG | 플랫폼 디자인 가이드 | 플랫폼 규범·관습의 기준점 | [UI 가이드라인](08_UI_GUIDELINES.md), [디자인 시스템](09_DESIGN_SYSTEM.md) |

### 2.4 웹 플랫폼 / 프론트엔드
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| MDN Web Docs | HTML/CSS/JS 권위 레퍼런스 | 프론트 구현의 1차 사실 출처 | [HTML](17_HTML_GUIDE.md), [CSS](18_CSS_GUIDE.md), [JS](19_JS_GUIDE.md) |
| web.dev (Core Web Vitals) | 성능·UX 지표 가이드 | 성능 목표(LCP/INP/CLS) 기준 | [프론트엔드 가이드](20_FRONTEND_GUIDE.md) |
| WHATWG HTML Living Standard | HTML 명세 원본 | 시맨틱·접근성 트리의 근거 | [HTML 가이드](17_HTML_GUIDE.md) |

### 2.5 API 설계
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| OpenAPI Specification 3.1 | REST API 기술 표준 | 전사 API 계약 표준 | [API 표준](22_API_STANDARD.md), ADR-0004 |
| RFC 9110 (HTTP Semantics) | HTTP 의미론 | 메서드·상태코드 사용의 근거 | [API 표준](22_API_STANDARD.md) |
| JSON:API / RFC 7807(Problem Details) | 응답·에러 포맷 규약 | 일관된 응답/에러 구조 | [API 표준](22_API_STANDARD.md), [백엔드 가이드](21_BACKEND_GUIDE.md) |

### 2.6 보안 / OWASP
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| OWASP Top 10 | 주요 웹 취약점 목록 | 보안 최소 점검 기준 | [보안 가이드](24_SECURITY_GUIDE.md) |
| OWASP ASVS | 애플리케이션 보안 검증 표준 | 보안 요구사항 레벨 정의 | [보안 가이드](24_SECURITY_GUIDE.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| OWASP Cheat Sheet Series | 주제별 보안 구현 가이드 | 실무 보안 구현 정답지 | [백엔드 가이드](21_BACKEND_GUIDE.md), [API 표준](22_API_STANDARD.md) |

### 2.7 테스트 / 품질
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| 테스트 피라미드(Cohn) | 단위/통합/E2E 비율 모델 | 테스트 투자 배분 기준 | [테스트 전략](30_TEST_STRATEGY.md) |
| ISTQB 용어집 | 테스트 표준 용어 | 품질 용어 통일 | [테스트 전략](30_TEST_STRATEGY.md), [품질 체크리스트](29_QUALITY_CHECKLIST.md) |
| axe-core / Lighthouse | 자동 접근성·품질 검사 도구 | 회귀 방지 자동화 | [접근성](16_ACCESSIBILITY.md), [프론트엔드 가이드](20_FRONTEND_GUIDE.md) |

### 2.8 AI / 프롬프팅
| 자료 | 무엇 | 중요성 | 내부 적용처 |
| --- | --- | --- | --- |
| Anthropic 프롬프트 엔지니어링 가이드 | Claude 프롬프트 설계 원칙 | 에이전트 프롬프트 품질 기준 | [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md), [프롬프트 라이브러리](40_PROMPT_LIBRARY.md) |
| Model Context Protocol(MCP) | 도구·컨텍스트 연결 프로토콜 | 에이전트-도구 연동 표준 | [AI 가이드](25_AI_GUIDE.md), [자동화 워크플로우](27_AUTOMATION_WORKFLOW.md) |
| OWASP Top 10 for LLM | LLM 애플리케이션 보안 위협 | 프롬프트 인젝션 등 방어 기준 | [AI 가이드](25_AI_GUIDE.md), [보안 가이드](24_SECURITY_GUIDE.md) |

---

## 3. 내부 상호참조 맵

외부 표준 → 그것을 규정·적용하는 골드위키 문서의 매핑이다.

| 외부 표준 | 표준화 ADR | 1차 적용 문서 | 검수 문서 |
| --- | --- | --- | --- |
| WCAG 2.2 AA | ADR-0002 | [16](16_ACCESSIBILITY.md) | [29](29_QUALITY_CHECKLIST.md) |
| Style Dictionary | ADR-0001 | [15](15_DESIGN_TOKEN.md) | [09](09_DESIGN_SYSTEM.md) |
| OpenAPI 3.1 | ADR-0004 | [22](22_API_STANDARD.md) | [30](30_TEST_STRATEGY.md) |
| OWASP Top 10 | — | [24](24_SECURITY_GUIDE.md) | [29](29_QUALITY_CHECKLIST.md) |
| Core Web Vitals | — | [20](20_FRONTEND_GUIDE.md) | [30](30_TEST_STRATEGY.md) |
| MCP | — | [25](25_AI_GUIDE.md) | [27](27_AUTOMATION_WORKFLOW.md) |

---

## 4. 자료 추가 규칙

- 새 자료는 분야·중요성·내부 적용처를 함께 기록한다.
- 결정에 영향을 준 자료는 해당 ADR에 역링크한다.
- 표준 버전 변경(예: WCAG 차기 버전) 시 [의사결정 로그](32_DECISION_LOG.md)에 재평가 ADR을 연다.

---

## 관련 골드위키 문서

- [베스트 프랙티스](37_BEST_PRACTICES.md) — 표준을 실행 규칙으로 번역한 계층
- [의사결정 로그](32_DECISION_LOG.md) — 표준 채택 결정의 근거 기록
- [접근성](16_ACCESSIBILITY.md) · [API 표준](22_API_STANDARD.md) · [보안 가이드](24_SECURITY_GUIDE.md) — 표준의 주 적용처
- [AI 가이드](25_AI_GUIDE.md) · [프롬프트 엔지니어링](26_PROMPT_ENGINEERING.md) — AI 분야 표준 적용처
- [프로젝트 메모리](35_PROJECT_MEMORY.md) — 표준 적용 상태 추적

> **거버넌스:** 골드위키 규칙에 따라, 본 문서에서 발생한 모든 의사결정은 [의사결정 로그](32_DECISION_LOG.md), [프로젝트 메모리](35_PROJECT_MEMORY.md), [베스트 프랙티스](37_BEST_PRACTICES.md), [레퍼런스 라이브러리](36_REFERENCE_LIBRARY.md)를 갱신한다.
