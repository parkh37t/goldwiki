-- ClubSchool AI OS — Supabase(Postgres) 스키마
-- 목적: 웹 콘솔의 영속 계층 + Gold Wiki v2.0(자동 학습/QA 루프/프로젝트 메모리) 데이터 모델.
-- 적용: Supabase 대시보드 → SQL Editor 에 붙여넣어 실행. (pgvector 확장 사용)

-- 확장
create extension if not exists "pgcrypto";
create extension if not exists vector;     -- 자동 학습 임베딩 인덱스

-- 프로젝트(엔게이지먼트)
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  client      text,
  industry    text,                         -- GoldWiki/Industry 와 연계
  status      text not null default 'active',
  created_by  uuid,                          -- auth.users.id
  created_at  timestamptz not null default now()
);

-- 작업(Job) — 콘솔/오케스트레이터 실행 단위 (Docs/architecture-v2/05 의 상태머신)
create table if not exists jobs (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references projects(id) on delete cascade,
  agent       text not null,                 -- .claude/agents 의 name
  command     text,                          -- 슬래시 커맨드(선택)
  input       text,
  status      text not null default 'queued',-- queued|running|review|done|failed
  qa_score    int,                           -- QA 루프 채점(0~100)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 대화 메시지(에이전트 세션)
create table if not exists chat_messages (
  id          uuid primary key default gen_random_uuid(),
  job_id      uuid references jobs(id) on delete cascade,
  role        text not null,                 -- user|assistant|system
  content     text not null,
  created_at  timestamptz not null default now()
);

-- 산출물(딜리버러블) — 검증/승인 대상
create table if not exists deliverables (
  id           uuid primary key default gen_random_uuid(),
  job_id       uuid references jobs(id) on delete set null,
  project_id   uuid references projects(id) on delete cascade,
  title        text not null,
  kind         text,                         -- proposal|wbs|ia|ui|qa-report ...
  content_md   text not null,                -- 마크다운 본문
  qa_passed    boolean default false,
  approved_by  uuid,
  version      int not null default 1,
  created_at   timestamptz not null default now()
);

-- 의사결정 로그(ADR) — GoldWiki/Foundation/DecisionLog 의 영속화
create table if not exists decisions (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references projects(id) on delete cascade,
  title       text not null,
  context     text,
  decision    text not null,
  consequences text,
  status      text not null default 'accepted',
  created_at  timestamptz not null default now()
);

-- 자동 학습 지식 청크 — RAG/임베딩 인덱스 (Docs/architecture-v2/01_AutoLearning)
create table if not exists knowledge_chunks (
  id          uuid primary key default gen_random_uuid(),
  source_path text,                          -- 출처(GoldWiki 문서/산출물)
  topic       text,                          -- GoldWiki 토픽 폴더
  content     text not null,
  embedding   vector(1536),                  -- 임베딩 차원(사용 모델에 맞게 조정)
  approved    boolean default false,         -- 휴먼 인 더 루프 승인 게이트
  created_at  timestamptz not null default now()
);

-- 임베딩 유사도 인덱스(승인된 청크 대상 검색)
create index if not exists knowledge_chunks_embedding_idx
  on knowledge_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- 의미 검색 함수(자동 학습/RAG 조회)
create or replace function match_knowledge(query_embedding vector(1536), match_count int default 8)
returns table (id uuid, source_path text, topic text, content text, similarity float)
language sql stable as $$
  select id, source_path, topic, content,
         1 - (embedding <=> query_embedding) as similarity
  from knowledge_chunks
  where approved = true
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- (권장) RLS: 운영 배포 시 활성화하고 프로젝트 멤버십 기반 정책을 추가하라.
-- alter table projects      enable row level security;
-- alter table jobs          enable row level security;
-- alter table deliverables  enable row level security;
-- 예) create policy "project members read" on deliverables for select using (auth.uid() is not null);
