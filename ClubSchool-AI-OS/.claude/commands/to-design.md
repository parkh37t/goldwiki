---
description: 산출물(또는 디자인 HTML)을 Figma 또는 Claude Design(Adobe Express)로 만들어 보낸다. Claude Code의 MCP 연동을 사용한다.
argument-hint: [산출물/HTML 파일 경로] [figma|claude-design]
---

# /to-design — 산출물 → Figma / 클로드디자인 (Claude Code MCP)

웹 콘솔의 "DESIGN" 내보내기는 **디자인용 HTML**을 만든다. 이 커맨드는 그 HTML(또는 임의 산출물)을
**실제 Figma 파일** 또는 **Claude Design(Adobe Express)** 문서로 변환한다. 토큰 과금 API가 아니라
Claude Code에 연결된 MCP 도구를 사용한다.

## 입력
- `$1` = 디자인 소스 경로 (예: `runs/<라벨>/06_UX_UI_Concept.md` 또는 콘솔에서 내보낸 `*_design.html`)
- `$2` = 대상: `figma`(기본) 또는 `claude-design`

## 절차
1. 소스를 Read로 읽는다. 마크다운이면 핵심 구조(섹션·표·화면 목록)를 디자인 의도로 정리한다.
2. **대상이 figma 인 경우** — Figma MCP 사용:
   - 먼저 `/figma-use` 스킬을 읽고 규칙을 따른다(필수).
   - `mcp__Figma__create_new_file` 또는 `use_figma`/`generate_figma_design` 으로 화면/컴포넌트를 생성한다.
   - GoldWiki [09 디자인시스템](../../GoldWiki/DesignSystem/DesignSystemGuide.md)·[15 디자인토큰](../../GoldWiki/15_DESIGN_TOKEN.md)의 토큰/컴포넌트 표준을 반영한다.
   - 결과 Figma URL을 보고한다.
3. **대상이 claude-design 인 경우** — Adobe Express(클로드디자인) MCP 사용:
   - `html_export_readiness_skill` 로 HTML 적합성을 점검한 뒤 `export_html_to_express` 로 변환한다.
   - 콘솔의 `*_design.html`(자기완결 HTML)을 입력으로 쓰면 가장 매�끄럽다.
   - 결과 편집 URL을 보고한다.
4. 산출물·결정은 [DecisionLog](../../GoldWiki/Foundation/DecisionLog.md)에 기록한다.

## 출력
- 생성된 Figma/Express 문서 URL + 무엇을 만들었는지 요약.

## 참고
- 이 변환은 **Claude Code 안에서** 동작한다(웹앱이 아님). MCP(Figma/Adobe)가 세션에 연결돼 있어야 한다.
- 빠른 무API 경로가 필요하면, 웹 콘솔에서 **DESIGN(.html)**로 내보내 그대로 공유·인쇄·가져오기 하면 된다.
