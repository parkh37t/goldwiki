# goldwiki MCP 커넥터 — claude.ai/Claude Code에서 내 지식을 세컨드 브레인으로

goldwiki(단일 진실 공급원)를 **원격 MCP 서버**로 노출합니다. 영상의 *Relay.md + MCP* 패턴과 동일하게,
**구독 상태의 claude.ai / Claude Code / 커서** 등 어디서든 내 지식을 검색·열람할 수 있습니다.
종량제 API 없이 동작하며, **읽기 전용**(쓰기·비밀 없음)입니다.

## 엔드포인트

```
https://goldwiki.vercel.app/api/mcp
```

전송: MCP **Streamable HTTP**(JSON-RPC 2.0 over POST). 인증 없음(공개 읽기 전용).

## 제공 도구

| 도구 | 설명 |
| --- | --- |
| `search_goldwiki(query)` | 에이전트·커맨드·문서·예시를 키워드로 검색 |
| `read_document(path)` | 문서 원문(markdown) 읽기 (예: `GoldWiki/00_START_HERE.md`) |
| `list_documents(type?)` | 목록 나열 (type: agent·command·workflow·template·example·goldwiki) |

---

## A) Claude Code에 연결 (가장 확실)

Claude Code는 원격 HTTP MCP를 바로 지원합니다.

```bash
claude mcp add --transport http goldwiki https://goldwiki.vercel.app/api/mcp
```

이후 채팅에서: *"goldwiki에서 메리츠 RFP 분석 찾아서 요약해줘"* → `search_goldwiki` → `read_document` 자동 호출.

확인: `claude mcp list` 에 `goldwiki` 가 보이면 성공.

## B) claude.ai 웹앱에 커스텀 커넥터로 연결

1. claude.ai → 좌측 하단 이름 → **Settings(설정)**
2. **Connectors** → **Add custom connector**
3. 이름 `goldwiki`, **URL**: `https://goldwiki.vercel.app/api/mcp` → **Add**
4. 새 채팅의 도구 메뉴(🔌)에 `goldwiki` 가 보이면 사용 가능

> 참고: 일부 플랜·정책에서 커스텀 커넥터가 **OAuth 인증을 요구**할 수 있습니다. 이 서버는 무인증 공개
> 읽기 전용이라, claude.ai가 무인증 커넥터 추가를 막는 경우에는 **A)안(Claude Code)**을 사용하세요(동일 기능).

---

## 동작 원리

```
claude.ai / Claude Code ──MCP(JSON-RPC/HTTP)──▶ /api/mcp (Vercel)
                                                     │ 정적 파일 읽기(HTTP)
                                                     ▼
                                  manifest.json + GoldWiki/Examples/*.md (SSOT)
```

- 콘텐츠는 같은 배포의 정적 파일(`/Console/manifest.json`, `/GoldWiki/...`)을 읽어 반환.
- 쓰기/삭제 도구 없음 — 안전한 읽기 전용 브레인.

## 로컬에서 테스트

```bash
# 정적 서버
python3 -m http.server 8099            # ClubSchool-AI-OS/ 에서
# MCP 핸들러(다른 터미널) — CS_BASE로 정적 서버 지정
CS_BASE=http://localhost:8099 python3 -c "from http.server import HTTPServer; import sys; sys.path.insert(0,'api'); import mcp; HTTPServer(('127.0.0.1',8077),mcp.handler).serve_forever()"
# JSON-RPC 호출
curl -s localhost:8077 -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

관련: [CLAUDE_BRIDGE.md](CLAUDE_BRIDGE.md) · [DEPLOYMENT.md](DEPLOYMENT.md)
