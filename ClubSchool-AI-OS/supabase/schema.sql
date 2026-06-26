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
  created_by  uuid,                          -- auth.users.id (소유자, RLS 기준)
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
-- 이미 생성된 테이블 보정(재실행 안전)
alter table jobs add column if not exists created_by uuid;

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
  created_by   uuid,                          -- auth.users.id (소유자, RLS 기준)
  approved_by  uuid,
  version      int not null default 1,
  created_at   timestamptz not null default now()
);
-- 이미 생성된 테이블 보정(부분 실행 후 재실행 안전)
alter table deliverables add column if not exists created_by uuid;

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

-- ===== RLS(행 수준 보안) — 브라우저가 사용자 JWT로 직접 접근하므로 반드시 활성화 =====
-- 소유자(created_by) 기반 기본 정책. 팀 공유가 필요하면 멤버십 테이블로 확장하라.

alter table projects      enable row level security;
alter table jobs          enable row level security;
alter table chat_messages enable row level security;
alter table deliverables  enable row level security;
alter table decisions     enable row level security;
-- knowledge_chunks 는 service_role(서버 /api/embed,/api/rag)만 접근 → RLS 활성 + 정책 없음(차단)
alter table knowledge_chunks enable row level security;

-- projects: 본인이 만든 프로젝트만
drop policy if exists "own projects" on projects;
create policy "own projects" on projects
  for all using (created_by = auth.uid()) with check (created_by = auth.uid());

-- jobs: 본인 소유
drop policy if exists "own jobs" on jobs;
create policy "own jobs" on jobs
  for all using (created_by = auth.uid()) with check (created_by = auth.uid());

-- chat_messages: 본인 소유 job 의 메시지
drop policy if exists "own messages" on chat_messages;
create policy "own messages" on chat_messages
  for all using (exists (select 1 from jobs j where j.id = chat_messages.job_id and j.created_by = auth.uid()))
  with check (exists (select 1 from jobs j where j.id = chat_messages.job_id and j.created_by = auth.uid()));

-- deliverables: 본인 소유
drop policy if exists "own deliverables" on deliverables;
create policy "own deliverables" on deliverables
  for all using (created_by = auth.uid()) with check (created_by = auth.uid());

-- decisions: 로그인 사용자 읽기, 본인 프로젝트에 쓰기
drop policy if exists "read decisions" on decisions;
create policy "read decisions" on decisions for select using (auth.uid() is not null);
drop policy if exists "write decisions" on decisions;
create policy "write decisions" on decisions for insert
  with check (exists (select 1 from projects p where p.id = decisions.project_id and p.created_by = auth.uid()));

-- 참고: chat_messages/jobs/deliverables 에 created_by 가 필요. jobs/deliverables 는 이미 보유.
-- chat_messages 는 job_id 로 소유권을 상속한다.
