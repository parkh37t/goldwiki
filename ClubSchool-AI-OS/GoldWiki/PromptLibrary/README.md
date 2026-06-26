# PromptLibrary — 프롬프트 라이브러리 토픽

## 폴더 목적

ClubSchool AI OS에서 반복 사용하는 **검증된 프롬프트(prompt)** 를 한곳에 모아 재사용·품질·일관성을 보장한다. RFP 요구사항 추출, 숨은 기대 탐지, 제안 스토리라인, IA·플로우·UI 생성, 디자인 토큰, HTML 프로토타입, 경쟁사 벤치마크, 리스크 탐지, 경영 요약, 코드 리뷰 등 핵심 작업의 표준 프롬프트를 제공한다. GoldWiki SSOT의 프롬프트 정본 토픽이다.

## 포함 문서 / 연계 정본

본 토픽은 다음 두 정본을 가리키는 인덱스 역할을 한다.

| 정본 | 설명 |
| --- | --- |
| [../40_PROMPT_LIBRARY.md](../40_PROMPT_LIBRARY.md) | 번호형 프롬프트 라이브러리 정본(개요·카탈로그·사용 규칙) |
| [../../.claude/prompts/](../../.claude/prompts/) | 실행 가능한 개별 프롬프트 파일 모음 |

개별 프롬프트 파일:

- [`rfp-requirement-extraction.md`](../../.claude/prompts/rfp-requirement-extraction.md) — RFP 요구사항 추출
- [`hidden-expectation-detection.md`](../../.claude/prompts/hidden-expectation-detection.md) — 숨은 기대 탐지
- [`proposal-storyline.md`](../../.claude/prompts/proposal-storyline.md) — 제안 스토리라인
- [`competitor-benchmark.md`](../../.claude/prompts/competitor-benchmark.md) — 경쟁사 벤치마크
- [`risk-detection.md`](../../.claude/prompts/risk-detection.md) — 리스크 탐지
- [`ia-generation.md`](../../.claude/prompts/ia-generation.md) · [`user-flow-generation.md`](../../.claude/prompts/user-flow-generation.md) · [`ui-concept.md`](../../.claude/prompts/ui-concept.md) — UX/UI 생성
- [`design-token-generation.md`](../../.claude/prompts/design-token-generation.md) · [`html-prototype.md`](../../.claude/prompts/html-prototype.md) — 디자인·퍼블리싱
- [`executive-summary.md`](../../.claude/prompts/executive-summary.md) · [`code-review.md`](../../.claude/prompts/code-review.md) — 보고·검토

## 관련 GoldWiki 토픽 / 번호 문서

- [../26_PROMPT_ENGINEERING.md](../26_PROMPT_ENGINEERING.md) — 프롬프트 엔지니어링 원칙
- [../28_SUBAGENT_RULES.md](../28_SUBAGENT_RULES.md) — 서브에이전트 규칙
- [../Templates/](../Templates/) — 산출물 템플릿(프롬프트 출력 형식 연계)

## 담당 에이전트

- **주담당:** `documentation-lead` (프롬프트 정본 관리)
- **협업:** 각 도메인 리드(자기 영역 프롬프트 제안·개선), `qa-lead`(프롬프트 출력 품질 검증)

## 거버넌스

프롬프트는 [26 프롬프트 엔지니어링](../26_PROMPT_ENGINEERING.md) 원칙을 따르고, 개선·신규 등록은 `documentation-lead`가 승인한다. 중복 프롬프트는 금지하며 정본은 항상 `.claude/prompts/`에 둔다.
