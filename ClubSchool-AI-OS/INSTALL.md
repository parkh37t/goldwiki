# INSTALL.md — ClubSchool AI OS v1.0 설치 가이드

이 문서는 ClubSchool AI OS를 Claude Code 환경에 설치·구성·검증하는 절차를 설명한다.

---

## 1. 사전 요구사항

| 항목 | 권장 |
|------|------|
| Claude Code | 최신 버전 (CLI / 데스크톱 / 웹 / IDE 확장) |
| 모델 | Claude Opus 4.8 (복잡한 분석·전략), Sonnet 4.6 (대량 실행) |
| Git | 2.30 이상 |
| 셸 | bash/zsh |
| (선택) MCP | Figma, GitHub 등 — 디자인·협업 자동화 시 |

---

## 2. 설치

```bash
# 1) 저장소 클론 (또는 이 OS가 포함된 저장소로 이동)
git clone <repo-url>
cd <repo>/ClubSchool-AI-OS

# 2) 디렉터리 구조 확인
ls -la
#   GoldWiki/ .claude/ Agents/ Workflows/ Templates/ Examples/ Docs/
#   README.md CLAUDE.md INSTALL.md ROADMAP.md CHANGELOG.md
```

> **중요:** Claude Code는 작업 루트의 `.claude/`에서 에이전트·커맨드를 자동 인식한다.
> ClubSchool AI OS의 자산은 `ClubSchool-AI-OS/.claude/`에 있으므로, **반드시
> `ClubSchool-AI-OS/`를 작업 디렉터리로 열어야** `/analyze-rfp` 등 커맨드와 22개
> 서브에이전트가 활성화된다.

---

## 3. 구성 검증 체크리스트

```bash
# GoldWiki 41개 문서 확인
ls GoldWiki | wc -l        # 기대값: 41

# 에이전트 22개 확인
ls .claude/agents | wc -l  # 기대값: 22

# 커맨드 확인
ls .claude/commands
```

- [ ] `GoldWiki/` 41개 문서 존재 (`00_`~`40_`)
- [ ] `.claude/agents/` 22개 에이전트 존재
- [ ] `.claude/commands/` 슬래시 커맨드 10종 존재
- [ ] `.claude/workflows/`, `.claude/prompts/`, `.claude/templates/` 채워짐
- [ ] `Agents/`, `Workflows/`, `Templates/`, `Examples/`, `Docs/` 문서 존재
- [ ] [CLAUDE.md](CLAUDE.md) 정독 완료

---

## 4. 첫 실행 (Hello, ClubSchool)

```text
# Claude Code 세션에서
1. CLAUDE.md 와 GoldWiki/00_START_HERE.md 를 읽게 한다.
2. 샘플 RFP로 파이프라인을 시험한다:
   /analyze-rfp Examples/01_RFP_Analysis.md
3. 전체 파이프라인을 실행한다:
   /run-pipeline [당신의 RFP 경로]
```

산출물은 [Templates/](Templates/README.md) 형식을 따르며, 완성 모범 예시는
[Examples/](Examples/README.md)에서 확인한다.

---

## 5. 커스터마이즈

| 목적 | 위치 | 방법 |
|------|------|------|
| 지식·표준 수정 | `GoldWiki/` | 정본 문서 수정 후 의사결정 로그 갱신 (SSOT 유지) |
| 에이전트 추가/수정 | `.claude/agents/` | [Docs/CONTRIBUTING.md](Docs/CONTRIBUTING.md) 규칙 준수 |
| 커맨드 추가 | `.claude/commands/` | frontmatter + 한국어 본문, GoldWiki 참조 명시 |
| 템플릿 추가 | `Templates/`, `.claude/templates/` | [GoldWiki/38_TEMPLATE_LIBRARY.md](GoldWiki/38_TEMPLATE_LIBRARY.md) 일관성 |

변경 시 반드시 [Docs/GOVERNANCE.md](Docs/GOVERNANCE.md)의 SSOT·중복금지·두뇌 갱신 규칙을 따른다.

---

## 6. 문제 해결

| 증상 | 원인 | 해결 |
|------|------|------|
| 커맨드/에이전트가 안 보임 | 작업 루트가 상위 폴더 | `ClubSchool-AI-OS/`를 작업 디렉터리로 다시 연다 |
| 링크가 깨짐 | 폴더 이동/이름 변경 | `/goldwiki-sync`로 무결성 점검 |
| 산출물 품질 미달 | 품질 게이트 미실행 | [GoldWiki/29_QUALITY_CHECKLIST.md](GoldWiki/29_QUALITY_CHECKLIST.md) 적용 |

자세한 FAQ: [Docs/FAQ.md](Docs/FAQ.md).
