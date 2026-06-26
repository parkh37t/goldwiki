# Supabase 연동 — ClubSchool AI OS 영속 계층

Supabase(Postgres + Auth + Storage + pgvector)는 ClubSchool AI OS의 **데이터 두뇌**입니다.
정적 콘솔 + Vercel 서버리스(`/api/chat`) 조합에 Supabase를 더하면, 대화·산출물·의사결정·학습
지식을 **영속화**하고 **인증**과 **의미 검색(RAG)**까지 갖춘 실제 SaaS가 됩니다.

## 무엇을 저장하는가

| 테이블 | 역할 | v2.0 연계 |
|--------|------|-----------|
| `projects` | 엔게이지먼트(고객/업종/상태) | 멀티 프로젝트 격리 |
| `jobs` | 작업 실행 단위·상태·QA 점수 | [05 오케스트레이션](../Docs/architecture-v2/05_Orchestration_and_Console.md) |
| `chat_messages` | 에이전트 세션 로그 | 콘솔 대화 영속화 |
| `deliverables` | 산출물(검증/승인/버전) | [03 QA 루프](../Docs/architecture-v2/03_QALoop.md) |
| `decisions` | 의사결정(ADR) | [Foundation/DecisionLog](../GoldWiki/Foundation/DecisionLog.md) |
| `knowledge_chunks` | 임베딩 지식(pgvector) | [01 자동 학습](../Docs/architecture-v2/01_AutoLearning.md) |

## 설치

1. [supabase.com](https://supabase.com) → New project 생성.
2. SQL Editor 에 [`schema.sql`](schema.sql) 붙여넣어 실행(pgvector 확장 포함).
3. Project Settings → API 에서 `Project URL`, `anon key`, `service_role key` 확보.
4. Vercel 프로젝트 환경변수에 추가:
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`(서버 함수용), `SUPABASE_ANON_KEY`(클라이언트용).

## 권장 아키텍처 (Vercel + Supabase)

```
브라우저(콘솔, 정적)  ──fetch──▶  Vercel 함수 /api/*  ──▶  Anthropic API
        │                              │
        │                              └──▶  Supabase (jobs/deliverables/chat 저장, RAG 조회)
        └───────── Supabase Auth(로그인) ─────────┘
```

- **인증**: Supabase Auth(이메일/OAuth)로 콘솔 접근 제어 → 공개 배포 안전.
- **영속화**: `/api/chat` 응답을 `chat_messages`·`deliverables`에 저장(후속 함수 `/api/jobs` 확장 지점).
- **자동 학습(v2.0)**: 승인된 산출물을 임베딩해 `knowledge_chunks`에 적재, `match_knowledge()`로 RAG.

## 단계적 도입

1. **지금**: 인증 없이 Vercel + `/api/chat`만으로 동작(현재 구현). 
2. **1단계**: Supabase Auth 추가 → 콘솔 로그인 게이트.
3. **2단계**: `jobs`/`chat_messages`/`deliverables` 저장 함수 추가 → 작업 이력·산출물 보관.
4. **3단계**: `knowledge_chunks` + 임베딩 파이프라인 → 자동 학습/RAG([01_AutoLearning](../Docs/architecture-v2/01_AutoLearning.md)).

> 자세한 단계는 [Docs/DEPLOYMENT.md](../Docs/DEPLOYMENT.md)와 v2.0 아키텍처 문서를 참조.
