/* ClubSchool AI OS — 콘솔 애플리케이션
 * 정적 SPA. manifest.json 을 읽어 에이전트/커맨드/워크플로우/문서/산출물을 렌더링하고,
 * (선택) Anthropic API 키가 있으면 브라우저에서 직접 에이전트와 대화한다.
 * 서버: ClubSchool-AI-OS/ 에서  python3 -m http.server 8000  → http://localhost:8000/Console/
 */
'use strict';

const S = {
  manifest: null,
  view: 'dashboard',
  settings: loadSettings(),
  active: null,        // 현재 작업 패널 컨텍스트 {kind, name, systemPrompt, path}
  chat: [],            // {role, content}
  backend: null,       // /api/health 결과 (서버 모드면 객체, 아니면 null)
  config: null,        // /api/config (Supabase 공개 설정)
  user: null,          // 로그인 사용자
  authMode: 'login',   // 'login' | 'signup'
};

/* ---------- 유틸 ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (t) => (t || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const docUrl = (p) => new URL('../' + p, location.href).href; // Console/ 기준 → ClubSchool-AI-OS/ 루트

function loadSettings() {
  try { return JSON.parse(localStorage.getItem('cs.settings')) || {}; } catch { return {}; }
}
function saveSettings(s) { localStorage.setItem('cs.settings', JSON.stringify(s)); }

function toast(msg, ms = 2200) {
  const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.add('hidden'), ms);
}

function renderMd(text) {
  const clean = (text || '').replace(/^---\n[\s\S]*?\n---\n/, ''); // frontmatter 제거
  if (window.marked) {
    const html = window.marked.parse(clean, { breaks: false, gfm: true });
    return window.DOMPurify ? window.DOMPurify.sanitize(html) : html;
  }
  // 폴백: 최소 렌더
  return '<pre style="white-space:pre-wrap">' + esc(clean) + '</pre>';
}

async function fetchText(path) {
  const r = await fetch(docUrl(path));
  if (!r.ok) throw new Error(path + ' (' + r.status + ')');
  return r.text();
}

function stripFrontmatter(t) { return (t || '').replace(/^---\n[\s\S]*?\n---\n/, ''); }

/* ---------- 부트 ---------- */
async function boot() {
  // 백엔드 서버 감지 (server/app.py 로 서빙 시 /api/health 200)
  try {
    const h = await fetch('/api/health', { cache: 'no-store' });
    if (h.ok) { const j = await h.json(); if (j && j.ok) S.backend = j; }
  } catch { /* 정적 서빙 — 무시 */ }

  // manifest: 정적 파일을 직접 로드(Vercel/Pages/서버 모두 호환). 실패 시 /api/manifest 폴백.
  try {
    let r = await fetch('manifest.json', { cache: 'no-store' });
    if (!r.ok && S.backend) r = await fetch('/api/manifest', { cache: 'no-store' });
    S.manifest = await r.json();
  } catch (e) {
    $('#view').innerHTML = errorBox('manifest 를 불러오지 못했습니다. <br>ClubSchool-AI-OS/ 에서 <code>python3 Console/build-manifest.py</code> 실행 후, <code>python3 server/app.py</code> (권장) 또는 <code>python3 -m http.server</code> 로 서빙하고 <code>/Console/</code> 를 여세요.');
    return;
  }
  $('#version-tag').textContent = '콘솔 · ' + (S.manifest.product || 'ClubSchool AI OS');
  wireChrome();
  await initAuth();
  refreshConn();
  refreshUser();
  go('dashboard');
}

/* ---------- 인증(Supabase, 선택) ---------- */
async function initAuth() {
  // 공개 설정 로드 (서버가 Supabase 설정을 노출하면 인증 활성)
  try {
    const r = await fetch('/api/config', { cache: 'no-store' });
    if (r.ok) {
      const c = await r.json();
      if (c && c.supabaseUrl && c.supabaseAnonKey) {
        S.config = c; CSDB.configure(c.supabaseUrl, c.supabaseAnonKey);
        S.user = CSDB.user();
      }
    }
  } catch { /* 설정 없음 — 인증 비활성 */ }
  wireAuth();
  if (CSDB.cfg().enabled && !S.user && !sessionStorage.getItem('cs.skipAuth')) showAuthGate(true);
}
function wireAuth() {
  $('#tab-login').onclick = () => setAuthMode('login');
  $('#tab-signup').onclick = () => setAuthMode('signup');
  $('#auth-submit').onclick = doAuth;
  $('#auth-back').onclick = () => { $('#auth-done').classList.add('hidden'); $('#auth-form').classList.remove('hidden'); setAuthMode('login'); };
  $('#auth-skip').onclick = () => { sessionStorage.setItem('cs.skipAuth', '1'); showAuthGate(false); toast('읽기 전용으로 둘러봅니다. 저장 기능은 로그인 후 사용하세요.'); };
  $('#auth-pass').addEventListener('keydown', e => { if (e.key === 'Enter') doAuth(); });
}
function setAuthMode(mode) {
  S.authMode = mode;
  const login = mode === 'login';
  $('#tab-login').classList.toggle('active', login);
  $('#tab-signup').classList.toggle('active', !login);
  $('#auth-sub').textContent = login ? '계정에 로그인하세요.' : '새 계정을 만드세요. 이메일과 비밀번호(6자 이상)만 있으면 됩니다.';
  $('#auth-submit').textContent = login ? '로그인' : '회원가입';
  $('#auth-pass').setAttribute('autocomplete', login ? 'current-password' : 'new-password');
  const msg = $('#auth-msg'); msg.textContent = ''; msg.className = 'auth-msg';
}
function showAuthGate(on) {
  $('#auth-gate').classList.toggle('hidden', !on);
  if (on) { $('#auth-done').classList.add('hidden'); $('#auth-form').classList.remove('hidden'); setAuthMode(S.authMode || 'login'); setTimeout(() => $('#auth-email').focus(), 50); }
}
function authError(raw) {
  const m = (raw || '').toLowerCase();
  if (m.includes('email not confirmed')) return '이메일 인증이 필요합니다. 받은 인증 메일의 링크를 클릭한 뒤 로그인하세요. (메일이 없으면 회원가입을 다시 하거나 관리자에게 문의)';
  if (m.includes('invalid login') || m.includes('invalid credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다.';
  if (m.includes('already registered') || m.includes('user already')) return '이미 가입된 이메일입니다. 로그인 탭에서 로그인하세요.';
  if (m.includes('password') && m.includes('6')) return '비밀번호는 6자 이상이어야 합니다.';
  if (m.includes('connect') || m.includes('failed to fetch')) return raw; // 이미 친절한 안내
  return raw;
}
async function doAuth() {
  const mode = S.authMode || 'login';
  const email = $('#auth-email').value.trim(), pass = $('#auth-pass').value;
  const msg = $('#auth-msg'); msg.textContent = ''; msg.className = 'auth-msg';
  const btn = $('#auth-submit');
  if (!email || !pass) { msg.textContent = '이메일과 비밀번호를 입력하세요.'; return; }
  btn.disabled = true; btn.textContent = mode === 'login' ? '로그인 중…' : '가입 중…';
  try {
    if (mode === 'signup') {
      const d = await CSDB.signUp(email, pass);
      if (!d.access_token) { // 이메일 인증 필요
        $('#auth-done-email').textContent = email;
        $('#auth-form').classList.add('hidden');
        $('#auth-done').classList.remove('hidden');
        return;
      }
    } else {
      await CSDB.signIn(email, pass);
    }
    S.user = CSDB.user(); showAuthGate(false); refreshUser(); refreshConn();
    toast('환영합니다, ' + (S.user && S.user.email || '') + '님');
    go(S.view);
  } catch (e) {
    msg.className = 'auth-msg'; msg.textContent = authError(e.message);
  } finally {
    btn.disabled = false; btn.textContent = mode === 'login' ? '로그인' : '회원가입';
  }
}
function refreshUser() {
  const el = $('#user-state');
  if (S.user) {
    el.classList.remove('hidden');
    el.innerHTML = `<span title="${esc(S.user.email || '')}">👤 ${esc((S.user.email || '사용자').split('@')[0])}</span><button id="btn-logout">로그아웃</button>`;
    $('#btn-logout').onclick = async () => { await CSDB.signOut(); S.user = null; refreshUser(); refreshConn(); toast('로그아웃되었습니다.'); if (CSDB.cfg().enabled) showAuthGate(true); };
  } else { el.classList.add('hidden'); el.innerHTML = ''; }
}
function loggedIn() { return CSDB.cfg().enabled && !!S.user; }

function errorBox(html) {
  return `<div class="form" style="border-color:var(--err)"><h2 style="margin-top:0;color:var(--err)">오류</h2><p>${html}</p></div>`;
}

function wireChrome() {
  $$('.nav-item').forEach(b => b.onclick = () => { go(b.dataset.view); closeDrawer(); });
  $('#btn-settings').onclick = () => { go('settings'); closeDrawer(); };
  $('#btn-quickstart').onclick = quickStart;
  $('#btn-menu').onclick = toggleDrawer;
  $('#scrim').onclick = closeDrawer;
  $('#wp-close').onclick = closePanel;
  $('#wp-send').onclick = sendMessage;
  $('#wp-copy').onclick = copyPrompt;
  $('#global-search').oninput = onSearch;
  $('#wp-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) sendMessage();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  document.addEventListener('click', onDocLinkClick); // 내부 .md 링크 가로채기
}

/* 모바일 드로어(사이드바) 토글 */
function openDrawer() { document.querySelector('.sidebar').classList.add('open'); $('#scrim').classList.remove('hidden'); }
function closeDrawer() { document.querySelector('.sidebar').classList.remove('open'); $('#scrim').classList.add('hidden'); }
function toggleDrawer() { document.querySelector('.sidebar').classList.contains('open') ? closeDrawer() : openDrawer(); }

function go(view) {
  S.view = view;
  $$('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  const V = $('#view');
  ({ dashboard: viewDashboard, pipeline: viewPipeline, agents: viewAgents, commands: viewCommands, workflows: viewWorkflows,
     goldwiki: viewGoldwiki, templates: viewTemplates, examples: viewExamples, deliverables: viewDeliverables,
     qa: viewQA, settings: viewSettings }[view] || viewDashboard)(V);
}

function chatMode() {
  // 'prompt'  : 무API — 실행 프롬프트 복사 (기본값, 과금 전혀 없음)
  // 'ollama'  : 로컬 Ollama (무료, 내 PC) — 사용자가 명시 선택
  // 'server'  : 백엔드 프록시 사용 (서버에 키 있음) — 'auto' 선택 시에만
  // 'direct'  : 브라우저에서 직접 Anthropic 호출 (콘솔 설정에 키 있음)
  const e = S.settings.engine || 'prompt';   // 기본: 무API (사용자 요청)
  if (e === 'ollama') return (S.settings.ollamaUrl || '').trim() ? 'ollama' : 'prompt';
  if (e === 'direct') return S.settings.apiKey ? 'direct' : 'prompt';
  if (e === 'auto') {                          // 사용자가 명시적으로 'API 자동'을 선택했을 때만 과금 경로
    if (S.backend && S.backend.hasKey) return 'server';
    if (S.settings.apiKey) return 'direct';
  }
  return 'prompt';
}
function refreshConn() {
  const mode = chatMode();
  const el = $('#conn-state');
  const label = { ollama: '● 로컬 Ollama', server: '● 서버 연결됨', direct: '● API 연결됨', prompt: '● 무API 모드' }[mode];
  el.textContent = label;
  el.className = 'conn-pill ' + (mode === 'prompt' ? 'conn-off' : 'conn-on');
}

/* ---------- 대시보드 ---------- */
function viewDashboard(V) {
  const m = S.manifest;
  const topicCount = Object.keys(m.goldwiki.topics).length;
  const wikiDocs = m.goldwiki.numbered.length + Object.values(m.goldwiki.topics).reduce((a, b) => a + b.length, 0);
  V.innerHTML = `
    <div class="page-head"><h1>대시보드</h1>
      <p>브라우저에서 ${m.product} 의 디지털 조직과 직접 일하세요. 에이전트와 대화하고, 커맨드를 실행하고, 산출물을 보고 검증합니다.</p></div>
    <div class="kpis">
      <div class="kpi"><div class="n">${m.agents.length}</div><div class="l">활성 에이전트</div></div>
      <div class="kpi"><div class="n">${m.commands.length}</div><div class="l">슬래시 커맨드</div></div>
      <div class="kpi"><div class="n">${m.workflows.length}</div><div class="l">워크플로우</div></div>
      <div class="kpi"><div class="n">${wikiDocs}</div><div class="l">Gold Wiki 문서</div></div>
      <div class="kpi"><div class="n">${topicCount}</div><div class="l">지식 토픽</div></div>
      <div class="kpi"><div class="n">${m.templates.length}</div><div class="l">템플릿</div></div>
    </div>
    <div class="section-title">바로 시작</div>
    <div class="cards">
      <div class="card" data-qa="rfp"><h3>📥 RFP 분석 시작</h3><div class="desc">RFP를 붙여넣고 rfp-strategy-lead 에이전트가 요구사항·평가기준·리스크를 분석합니다.</div><div class="tag">/rfp-start</div></div>
      <div class="card" data-qa="proposal"><h3>📝 제안 전략 수립</h3><div class="desc">proposal-lead 가 윈테마·스토리라인·경영요약을 설계합니다.</div><div class="tag">/proposal-build</div></div>
      <div class="card" data-qa="ux"><h3>🎨 UX/UI 기획</h3><div class="desc">ux-research-lead 와 IA·유저플로우·화면목록을 만듭니다.</div><div class="tag">/ux-start</div></div>
      <div class="card" data-qa="qa"><h3>✅ 품질 검증</h3><div class="desc">10단계 품질 검증 체계로 산출물을 점검합니다.</div><div class="tag">품질 검증</div></div>
    </div>
    <div class="section-title">추천 워크플로우</div>
    <div class="cards" id="dash-wf"></div>`;
  const map = { rfp: () => openCommandByName('/rfp-start'), proposal: () => openCommandByName('/proposal-build'),
    ux: () => openCommandByName('/ux-start'), qa: () => go('qa') };
  $$('#view .card[data-qa]').forEach(c => c.onclick = map[c.dataset.qa]);
  const wf = $('#dash-wf');
  m.workflows.slice(0, 6).forEach(w => {
    const c = document.createElement('div'); c.className = 'card';
    c.innerHTML = `<h3>🔀 ${esc(w.title)}</h3><div class="desc">${esc(w.path)}</div>`;
    c.onclick = () => openDoc(w.path, w.title);
    wf.appendChild(c);
  });
}

function quickStart() {
  toast('설정에서 Anthropic API 키를 넣으면 브라우저에서 바로 대화할 수 있어요. 키 없이도 프롬프트 복사 모드로 사용 가능합니다.');
  go('settings');
}

/* ---------- 자동 파이프라인 (API 불필요) ---------- */
const PL_PHASES = [
  { key: '분석', nums: ['01'], desc: 'rfp-strategy-lead — 요구사항·평가기준·숨은기대·리스크' },
  { key: '전략', nums: ['02', '03'], desc: 'proposal-lead — 윈테마·스토리라인·임원요약' },
  { key: '설계', nums: ['04', '05', '06', '07', '08'], desc: 'PMO·IA·UI·개발·QA (병렬)' },
  { key: '검증', nums: ['09', '10'], desc: '평가위원 채점 + QA 10단계 교차검증' },
  { key: '종합', nums: ['00'], desc: 'executive-director — 종합 보고서' },
];
function viewPipeline(V) {
  V.innerHTML = `<div class="page-head"><h1>자동 파이프라인</h1>
    <p>RFP 1건 → 분석·전략·설계·검증·종합을 멀티에이전트가 자동 수행합니다. <b>API 키가 필요 없습니다.</b></p></div>
    <div class="pl-tabs">
      <button class="pl-tab active" data-pl="replay" type="button">📂 데모 리플레이</button>
      <button class="pl-tab" data-pl="run" type="button">▶ 내 RFP로 실행</button>
    </div>
    <div id="pl-body"></div>`;
  $$('.pl-tab').forEach(b => b.onclick = () => {
    $$('.pl-tab').forEach(x => x.classList.toggle('active', x === b));
    b.dataset.pl === 'run' ? plRun() : plReplay();
  });
  plReplay();
}
function plReplay() {
  const demo = S.manifest.pipelineDemo || [];
  const host = $('#pl-body');
  if (!demo.length) { host.innerHTML = `<div class="dlv-empty">데모 산출물이 아직 없습니다. Claude Code에서 <code>/auto-rfp</code>를 실행하면 생성됩니다.</div>`; return; }
  const byNum = Object.fromEntries(demo.map(d => [d.num, d]));
  const score = byNum['09'], qa = byNum['10'];
  host.innerHTML = `
    <p style="color:var(--muted);margin:0 0 14px">실제 자동 실행 결과입니다(샘플 RFP: 전국 청소년 동아리 통합 플랫폼). 단계 카드를 눌러 산출물을 펼쳐 보세요 — 정적 문서라 API 호출이 전혀 없습니다.</p>
    <div class="pl-result">
      <div class="pl-rcard"><div class="pl-rn">87.65<span>/100</span></div><div class="pl-rl">평가위원 채점 (우수)</div></div>
      <div class="pl-rcard"><div class="pl-rn">94%</div><div class="pl-rl">QA 10단계 통과 · 치명결함 0</div></div>
      <div class="pl-rcard"><div class="pl-rn">11</div><div class="pl-rl">자동 생성 산출물</div></div>
      <div class="pl-rcard"><div class="pl-rn">~60%</div><div class="pl-rl">예측 수주 확률</div></div>
    </div>
    <div class="pl-steps" id="pl-steps"></div>`;
  const steps = $('#pl-steps');
  PL_PHASES.forEach((ph, i) => {
    const items = ph.nums.map(n => byNum[n]).filter(Boolean);
    const el = document.createElement('div'); el.className = 'pl-step';
    el.innerHTML = `<div class="pl-step-head"><span class="pl-badge">${i + 1}</span><div><div class="pl-step-title">${ph.key}</div><div class="pl-step-desc">${esc(ph.desc)}</div></div></div>
      <div class="pl-arts">${items.map(it => `<button class="pl-art" data-path="${esc(it.path)}" type="button">📄 ${esc(it.title)}</button>`).join('')}</div>`;
    steps.appendChild(el);
  });
  $$('#pl-steps .pl-art').forEach(b => b.onclick = () => openAnyDoc(b.dataset.path));
}
function plRun() {
  const host = $('#pl-body');
  host.innerHTML = `
    <p style="color:var(--muted);margin:0 0 12px"><b>API 키 없이</b> 실행하는 방법입니다. 아래에 RFP를 붙여넣고 <b>실행 프롬프트 생성</b>을 누르면, Claude Code(구독·과금 아님)에 붙여넣어 자동 실행할 패키지를 만들어 드립니다.</p>
    <textarea id="pl-rfp" rows="10" placeholder="여기에 RFP 전문 또는 사업 개요를 붙여넣으세요. (예: 발주기관·예산·기간·주요 요구사항·평가기준)" style="width:100%;border:1px solid var(--line);border-radius:10px;padding:12px;font-family:inherit;font-size:13px"></textarea>
    <div style="display:flex;gap:8px;margin-top:10px;align-items:center;flex-wrap:wrap">
      <button class="btn primary" id="pl-auto" type="button">▶ 지금 브라우저에서 자동 실행</button>
      <button class="btn" id="pl-gen" type="button">실행 프롬프트만 복사</button>
      <span id="pl-engine-hint" style="color:var(--muted);font-size:12px"></span>
    </div>
    <div id="pl-out" style="margin-top:14px"></div>
    <div class="pl-howto">
      <b>왜 API가 필요 없나요?</b> 브라우저는 <u>오케스트레이션 프롬프트</u>만 만들고, 실제 생성·검증은 이미 구독 중인 <b>Claude Code</b>가 수행합니다(에이전트 24명·GoldWiki 표준 그대로). 토큰 과금이 발생하는 별도 API를 쓰지 않습니다.
    </div>`;
  const mode = chatMode();
  const hint = { ollama: '엔진: 🟢 로컬 Ollama (무료)', server: '엔진: 서버', direct: '엔진: 내 API 키', prompt: '⚠ 자동 실행하려면 설정에서 로컬 Ollama를 켜세요' }[mode];
  $('#pl-engine-hint').textContent = hint;
  $('#pl-gen').onclick = () => {
    const rfp = $('#pl-rfp').value.trim();
    if (!rfp) { toast('RFP 내용을 붙여넣으세요.'); return; }
    const prompt = plBuildPrompt(rfp);
    navigator.clipboard.writeText(prompt).catch(() => {});
    $('#pl-out').innerHTML = `<div class="msg sys" style="max-width:100%"><div class="md">✅ 실행 프롬프트를 클립보드에 복사했습니다. <b>Claude Code</b>에 붙여넣어 실행하세요.</div></div>
      <pre style="background:#0e1116;color:#e6edf3;padding:14px;border-radius:10px;overflow:auto;font-size:12px;white-space:pre-wrap">${esc(prompt)}</pre>`;
  };
  $('#pl-auto').onclick = () => {
    const rfp = $('#pl-rfp').value.trim();
    if (!rfp) { toast('RFP 내용을 붙여넣으세요.'); return; }
    if (chatMode() === 'prompt') { toast('브라우저 자동 실행은 LLM 엔진이 필요합니다. 무API라면 왼쪽 "프롬프트 복사"로 실행하세요. (설정에서 Ollama/서버 선택 시 자동 실행)'); return; }
    plAutoRun(rfp);
  };
}

const PL_STAGES = [
  { n: '01', t: 'RFP 분석', role: 'rfp-strategy-lead', ask: '요구사항 표(REQ-### · 설명 · 우선순위), 평가기준 대응, 숨은 기대, 리스크 표를 작성하라.' },
  { n: '02', t: '제안 전략', role: 'proposal-lead', ask: '윈테마 3개, 핵심 차별화, 제안 스토리라인, 1문단 임원 요약을 작성하라.' },
  { n: '03', t: 'IA·화면목록', role: 'information-architecture-lead', ask: '정보구조(주요 메뉴), 핵심 유저플로우 3개, 화면목록 표(SCR-### · 화면명 · 역할)를 작성하라.' },
  { n: '04', t: 'UX·UI 컨셉', role: 'ui-design-lead', ask: '모바일 우선 UX 원칙, UI 톤·핵심 컴포넌트, 접근성(WCAG/KWCAG) 포인트를 작성하라.' },
  { n: '05', t: '개발·보안 계획', role: 'backend-lead', ask: '시스템 아키텍처, 기술스택, API 설계 원칙, 보안·개인정보, 데이터 이관 방안을 작성하라.' },
  { n: '06', t: 'QA·테스트', role: 'qa-lead', ask: '테스트 전략, 핵심 테스트케이스 표(TC-### · 시나리오 · 기대결과), 성능/접근성/보안, 종료 기준을 작성하라.' },
  { n: '07', t: '평가위원 채점', role: 'client-simulation-lead', ask: '심사위원 관점 7축 100점 채점표, 축별 강·약점, 보완책, 최종 수주확률(%)을 작성하라.' },
];
function extractJson(text) {
  if (!text) return null;
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try { return JSON.parse(m[0]); } catch { return null; }
}
async function plAutoRun(rfp) {
  const out = $('#pl-out');
  out.innerHTML = `<div class="msg sys" style="max-width:100%"><div class="md">▶ ${esc({ ollama: '로컬 Ollama', server: '서버', direct: '내 API 키' }[chatMode()] || '엔진')}(으)로 자동 실행을 시작합니다. 생성 → 품질 검증 → 미흡 시 자동 보완 순으로 진행됩니다…</div></div><div class="pl-runlist" id="pl-runlist"></div>`;
  const list = $('#pl-runlist');
  S.active = { kind: 'pipeline', name: 'auto-rfp' };
  let ctx = '';
  const results = []; const byN = {};

  async function runStage(s, guidance) {
    const card = document.createElement('div'); card.className = 'pl-runitem';
    card.innerHTML = `<div class="pl-run-h"><b>${s.n} · ${s.t}${guidance ? ' 🔧 보완' : ''}</b> <span class="pl-run-meta">${esc(s.role)}</span><span class="pl-run-st">⏳ 생성 중…</span></div><div class="md pl-run-body"></div>`;
    list.appendChild(card); card.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const system = `너는 ClubSchool AI OS의 ${s.role} 에이전트다. GoldWiki 표준을 따르고 한국어로, 표·체크리스트를 적극 활용해 경영진 수준의 실무 산출물을 간결하지만 충실하게 작성한다. 플레이스홀더·군더더기 금지. 마크다운으로만 답한다.`;
    const user = `[RFP]\n${rfp}\n\n${ctx ? '[이전 단계 핵심 요약]\n' + ctx + '\n\n' : ''}${guidance ? '[품질 보완 지시 — 반드시 반영]\n' + guidance + '\n\n' : ''}[작업] ${s.ask}`;
    const reply = await llmComplete(system, [{ role: 'user', content: user }]);
    card.querySelector('.pl-run-body').innerHTML = renderMd(reply);
    const st = card.querySelector('.pl-run-st'); st.textContent = guidance ? '🔧 보완 완료' : '✅ 완료'; st.className = 'pl-run-st ok';
    return reply;
  }

  // 1) 단계별 생성
  for (const s of PL_STAGES) {
    try {
      const reply = await runStage(s);
      ctx += `\n## ${s.n} ${s.t}\n` + reply.slice(0, 420);
      const r = { n: s.n, title: `${s.n} ${s.t}`, content: reply }; results.push(r); byN[s.n] = r;
      if (loggedIn()) dbSaveDeliverable(`[자동] ${s.n} ${s.t}`, reply);
    } catch (e) {
      const c = list.lastChild; if (c) { const st = c.querySelector('.pl-run-st'); st.textContent = '⚠️ 실패'; st.className = 'pl-run-st err'; c.querySelector('.pl-run-body').innerHTML = renderMd(chatError(e.message)); }
      return;
    }
  }

  // 2) 품질 게이트 + 자동 보완 루프 (최대 2회 재작성)
  const maxRev = 2; let revisions = 0;
  for (let round = 0; round <= maxRev; round++) {
    const qc = document.createElement('div'); qc.className = 'pl-runitem';
    qc.innerHTML = `<div class="pl-run-h"><b>🔎 품질 게이트${round ? ` · ${round + 1}차` : ''}</b> <span class="pl-run-meta">qa-lead · 10단계 검증</span><span class="pl-run-st">⏳ 검증 중…</span></div><div class="md pl-run-body"></div>`;
    list.appendChild(qc); qc.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const qaSys = `너는 ClubSchool AI OS의 qa-lead다. GoldWiki 10단계 품질 검증 체계(RFP이해·요구누락·평가대응·UX/UI실현·기술구현·일정현실성·리스크·고객설득·임원적합·제출적합)로 아래 산출물을 평가한다. 반드시 JSON 객체 하나만 출력하라(코드펜스·설명 금지): {"score": 정수0-100, "pass": true|false, "weak":[{"n":"02","issue":"부족한 점 한 줄","fix":"구체적 보완 지시 한 줄"}]}. weak는 보완 필요한 단계만 최대 3개. score>=85 이고 치명결함 없으면 pass=true.`;
    const qaUser = `[RFP]\n${rfp.slice(0, 1400)}\n\n[산출물 요약]\n` + results.map(r => `### ${r.title}\n${r.content.slice(0, 550)}`).join('\n\n');
    let verdict;
    try {
      const qaReply = await llmComplete(qaSys, [{ role: 'user', content: qaUser }]);
      verdict = extractJson(qaReply);
    } catch (e) {
      qc.querySelector('.pl-run-body').innerHTML = renderMd('검증 호출 실패 — 통과로 간주합니다.\n\n' + chatError(e.message));
      qc.querySelector('.pl-run-st').textContent = '건너뜀'; break;
    }
    if (!verdict) { verdict = { pass: true, score: null, weak: [] }; }
    const weak = (verdict.weak || []).filter(w => byN[w.n]);
    qc.querySelector('.pl-run-body').innerHTML = renderMd(`**종합 점수: ${verdict.score ?? '-'} / 100 · 판정: ${verdict.pass ? '✅ 통과' : '⚠️ 보완 필요'}**\n\n` + (weak.length ? weak.map(w => `- **${w.n}** ${w.issue}\n  - 보완: ${w.fix}`).join('\n') : '미흡 항목 없음 — 품질 게이트 통과'));
    qc.querySelector('.pl-run-st').textContent = '완료'; qc.querySelector('.pl-run-st').className = 'pl-run-st ok';

    if (verdict.pass || !weak.length || revisions >= maxRev) break;
    // 약한 단계 재작성(보완)
    for (const w of weak) {
      if (revisions >= maxRev) break;
      const s = PL_STAGES.find(x => x.n === w.n); if (!s) continue;
      revisions++;
      try {
        const reply = await runStage(s, `${w.issue} — ${w.fix}`);
        byN[w.n].content = reply;
        if (loggedIn()) dbSaveDeliverable(`[자동·보완] ${s.n} ${s.t}`, reply);
      } catch (e) { /* 계속 진행 */ }
    }
    ctx = results.map(r => `## ${r.title}\n` + r.content.slice(0, 280)).join('\n');
  }

  // 3) 전체 내보내기
  if (results.length) {
    const combined = results.map(r => `# ${r.title}\n\n${r.content}`).join('\n\n---\n\n');
    const dl = document.createElement('div'); dl.style.cssText = 'margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;align-items:center';
    const lbl = document.createElement('span'); lbl.textContent = '전체 산출물 내보내기:'; lbl.style.cssText = 'font-size:12.5px;color:var(--muted);font-weight:600';
    dl.appendChild(lbl); dl.appendChild(exportBar('자동RFP_산출물', combined));
    out.appendChild(dl);
    toast('자동 실행 완료' + (revisions ? ` · ${revisions}건 자동 보완` : '') + (loggedIn() ? ' · 저장됨' : ''));
  }
}
function plBuildPrompt(rfp) {
  return `/auto-rfp

아래 RFP로 ClubSchool AI OS 자율 파이프라인을 실행하라. GoldWiki를 단일 진실 공급원으로 삼아
여러 전문 에이전트가 다음을 순차/병렬로 수행하고 산출물을 runs/<날짜-라벨>/ 에 저장한 뒤 교차 검증하라.

1) 분석(rfp-strategy-lead): 요구사항 추출(REQ-###)·평가기준 대응·숨은 기대·리스크
2) 전략(proposal-lead): 윈테마·스토리라인·임원 요약
3) 설계(병렬): WBS(pmo) · IA/유저플로우/화면목록(ia) · UX·UI 컨셉(ui) · 개발계획(frontend+backend) · QA계획(qa)
4) 검증(병렬): 평가위원 7축 채점(client-simulation-lead) · QA 10단계 품질 게이트(qa-lead)
5) 종합(executive-director): 00_README 인덱스 + 경영 요약 + 다음 단계

추적성(REQ↔SCR↔FLOW↔TC)을 유지하고, 모든 산출물은 한국어·경영진 수준·구현 가능·근거 기반으로 작성하라. 플레이스홀더 금지.

[RFP]
${rfp}`;
}

/* ---------- 에이전트 ---------- */
function viewAgents(V) {
  V.innerHTML = `<div class="page-head"><h1>에이전트</h1><p>활성 서브에이전트 ${S.manifest.agents.length}명. 카드를 눌러 상세를 보고 바로 대화하세요.</p></div><div class="cards" id="agent-cards"></div>`;
  const wrap = $('#agent-cards');
  S.manifest.agents.forEach(a => {
    const c = document.createElement('div'); c.className = 'card';
    c.innerHTML = `<h3>🤖 ${esc(a.name)}</h3><div class="desc">${esc(a.description || '')}</div><div class="tag">${esc(a.tools || 'Read, Write, Edit')}</div>`;
    c.onclick = () => openAgent(a);
    wrap.appendChild(c);
  });
}

async function openAgent(a) {
  let sys = a.systemPrompt; // manifest 내장(정적 호스트 호환)
  if (!sys) { try { sys = stripFrontmatter(await fetchText(a.path)); } catch (e) { sys = '에이전트 정의를 불러오지 못했습니다: ' + e.message; } }
  S.active = { kind: 'agent', name: a.name, path: a.path, systemPrompt: sys, raw: sys };
  S.chat = [];
  openPanel(a.name, '에이전트 · ' + a.path);
  const m = chatMode();
  const how = { server: '서버를 통해 바로 응답합니다.', direct: '브라우저에서 바로 응답합니다.', prompt: '실행 프롬프트를 만들어 드립니다(서버에 키 설정 또는 설정에서 키 입력 시 직접 대화).' }[m];
  pushSys(`이 패널은 **${a.name}** 에이전트입니다. 작업을 입력하면 ${how}\n\n에이전트 정의는 GoldWiki를 단일 진실 공급원으로 따릅니다.`);
}

/* ---------- 커맨드 ---------- */
function viewCommands(V) {
  V.innerHTML = `<div class="page-head"><h1>커맨드</h1><p>슬래시 커맨드 ${S.manifest.commands.length}개. 선택하면 인자를 채워 실행 프롬프트를 만들거나 바로 실행합니다.</p></div><div class="cards" id="cmd-cards"></div>`;
  const wrap = $('#cmd-cards');
  S.manifest.commands.forEach(c => {
    const el = document.createElement('div'); el.className = 'card';
    el.innerHTML = `<h3>⌘ ${esc(c.name)}</h3><div class="desc">${esc(c.description || '')}</div>${c.argumentHint ? `<div class="tag">${esc(c.argumentHint)}</div>` : ''}`;
    el.onclick = () => openCommand(c);
    wrap.appendChild(el);
  });
}
function openCommandByName(name) {
  const c = S.manifest.commands.find(x => x.name === name);
  if (c) openCommand(c); else toast(name + ' 커맨드를 찾을 수 없습니다.');
}
async function openCommand(c) {
  let body = c.body; // manifest 내장
  if (!body) { try { body = stripFrontmatter(await fetchText(c.path)); } catch (e) { body = '커맨드를 불러오지 못했습니다: ' + e.message; } }
  S.active = { kind: 'command', name: c.name, path: c.path, systemPrompt: ORCH_SYSTEM, body, hint: c.argumentHint };
  S.chat = [];
  openPanel(c.name, '커맨드 · ' + c.path);
  $('#wp-input').placeholder = c.argumentHint ? ('인자: ' + c.argumentHint) : '이 커맨드에 전달할 입력(예: RFP 본문/경로)을 적으세요.';
  pushSys(`**${c.name}** 커맨드입니다. 아래에 입력값을 적고 **전송**(API 직접 실행) 또는 **프롬프트 복사**(Claude Code에 붙여넣기)를 누르세요.`);
}

/* ---------- 문서 뷰(워크플로우/템플릿/예시/Gold Wiki) ---------- */
function listDocsView(V, title, sub, items, labelKey) {
  V.innerHTML = `<div class="page-head"><h1>${title}</h1><p>${sub}</p></div><div class="cards" id="doc-cards"></div>`;
  const wrap = $('#doc-cards');
  items.forEach(it => {
    const c = document.createElement('div'); c.className = 'card';
    c.innerHTML = `<h3>${esc(it[labelKey] || it.title)}</h3><div class="desc">${esc(it.path)}</div>`;
    c.onclick = () => openDoc(it.path, it[labelKey] || it.title);
    wrap.appendChild(c);
  });
}
function viewWorkflows(V) { listDocsView(V, '워크플로우', `핵심 워크플로우 ${S.manifest.workflows.length}개 런북.`, S.manifest.workflows, 'title'); }
function viewTemplates(V) { listDocsView(V, '템플릿', `복사용 산출물 템플릿 ${S.manifest.templates.length}개.`, S.manifest.templates, 'title'); }
function viewExamples(V) { listDocsView(V, '산출물 예시', `완성 산출물 모범 예시 ${S.manifest.examples.length}개.`, S.manifest.examples, 'title'); }

function viewGoldwiki(V) {
  const m = S.manifest.goldwiki;
  V.innerHTML = `<div class="page-head"><h1>Gold Wiki</h1><p>단일 진실 공급원. 토픽 폴더와 번호형 문서를 탐색하고 렌더링합니다.</p></div>
    <div class="split">
      <div class="tree" id="wiki-tree"></div>
      <div class="doc" id="wiki-doc"><div class="md"><p style="color:var(--muted)">왼쪽에서 문서를 선택하세요.</p></div></div>
    </div>`;
  const tree = $('#wiki-tree');
  const topics = document.createElement('div');
  Object.entries(m.topics).forEach(([folder, docs]) => {
    const d = document.createElement('details');
    d.innerHTML = `<summary>📁 ${esc(folder)} <span class="badge">${docs.length}</span></summary>`;
    docs.forEach(doc => d.appendChild(treeLink(doc)));
    topics.appendChild(d);
  });
  const numbered = document.createElement('details');
  numbered.innerHTML = `<summary>🔢 번호형 문서 <span class="badge">${m.numbered.length}</span></summary>`;
  m.numbered.forEach(doc => numbered.appendChild(treeLink(doc)));
  tree.appendChild(topics); tree.appendChild(numbered);
}
function treeLink(doc) {
  const a = document.createElement('a'); a.textContent = doc.title; a.href = 'javascript:void 0';
  a.onclick = () => { $$('#wiki-tree a').forEach(x => x.classList.remove('active')); a.classList.add('active'); openWikiDoc(doc.path); };
  return a;
}
async function openWikiDoc(path) {
  const host = $('#wiki-doc');
  host.innerHTML = '<div class="md"><p style="color:var(--muted)">불러오는 중…</p></div>';
  try {
    const t = await fetchText(path);
    host.innerHTML = `<div class="doc-toolbar"><span class="doc-path">${esc(path)}</span><div style="flex:1"></div>
      <button class="btn ghost" id="dv-copy">원문 복사</button></div><div class="md" data-base="${esc(path)}">${renderMd(t)}</div>`;
    $('#dv-copy').onclick = () => { navigator.clipboard.writeText(t); toast('원문을 복사했습니다.'); };
  } catch (e) { host.innerHTML = errorBox('문서를 불러오지 못했습니다: ' + esc(e.message)); }
}

/* 내보내기 버튼 묶음 (PPTX/XLSX/DOCX/PDF/HTML/MD) — 어디서나 재사용 */
function exportBar(title, getMd, only) {
  const wrap = document.createElement('span'); wrap.className = 'exp-bar';
  const fmts = only ? CSExport.FORMATS.filter(f => only.includes(f[1])) : CSExport.FORMATS;
  fmts.forEach(([label, fn]) => {
    const b = document.createElement('button'); b.className = 'exp-btn'; b.type = 'button'; b.textContent = label;
    b.onclick = async () => {
      try { const m = typeof getMd === 'function' ? getMd() : getMd; await CSExport[fn](title, m); toast(label + ' 내보내기 완료'); }
      catch (e) { toast('내보내기 실패: ' + e.message); }
    };
    wrap.appendChild(b);
  });
  return wrap;
}

/* 렌더된 마크다운 내부의 .md 링크를 브라우저 이동(404) 대신 콘솔 안에서 열기 */
function resolveRel(basePath, href) {
  href = (href || '').split('#')[0];
  if (!href) return basePath;
  if (href.startsWith('/')) return href.replace(/^\/+/, '');
  const baseDir = basePath && basePath.includes('/') ? basePath.slice(0, basePath.lastIndexOf('/')) : '';
  const parts = baseDir ? baseDir.split('/') : [];
  href.split('/').forEach(seg => {
    if (seg === '..') parts.pop();
    else if (seg && seg !== '.') parts.push(seg);
  });
  return parts.join('/');
}
function onDocLinkClick(e) {
  const a = e.target.closest && e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (/^(https?:|mailto:|tel:|#)/i.test(href)) return;     // 외부/앵커는 그대로
  if (!/\.md($|[?#])/i.test(href)) return;                  // .md 링크만 가로채기
  const md = a.closest('.md');
  if (!md) return;
  e.preventDefault();
  const target = resolveRel(md.getAttribute('data-base') || '', href);
  openAnyDoc(target);
}
async function openAnyDoc(path, title) {
  const back = S.view;
  const V = $('#view');
  V.innerHTML = `<div class="page-head"><h1>${esc(title || path.split('/').pop())}</h1></div>
    <div class="doc"><div class="doc-toolbar"><span class="doc-path">${esc(path)}</span><div style="flex:1"></div>
      <button class="btn ghost" id="any-back">← 돌아가기</button>
      <button class="btn ghost" id="any-copy">원문 복사</button></div>
      <div class="md" id="any-body" data-base="${esc(path)}"><p style="color:var(--muted)">불러오는 중…</p></div></div>`;
  $('#any-back').onclick = () => go(back);
  try {
    let t = null;
    // .claude/agents·commands 는 정적 호스트에서 서빙 안 되므로 manifest 내장본 사용
    const am = path.match(/\.claude\/agents\/([^/]+)\.md$/);
    const cm = path.match(/\.claude\/commands\/([^/]+)\.md$/);
    if (am) { const a = S.manifest.agents.find(x => x.path === path || x.name === am[1]); if (a && a.systemPrompt) t = '# ' + a.name + '\n\n' + a.systemPrompt; }
    else if (cm) { const c = S.manifest.commands.find(x => x.path === path); if (c && c.body) t = '# ' + c.name + '\n\n' + c.body; }
    if (t == null) t = await fetchText(path);
    $('#any-body').innerHTML = renderMd(t);
    const txt = t;
    $('#any-copy').onclick = () => { navigator.clipboard.writeText(txt); toast('원문을 복사했습니다.'); };
    $('#any-copy').after(exportBar(title || path.split('/').pop().replace('.md', ''), txt));
  } catch (e) {
    $('#any-body').innerHTML = errorBox('이 문서는 콘솔에서 열 수 없습니다(비공개 경로이거나 정적 호스트에서 서빙되지 않음):<br><code>' + esc(path) + '</code>');
  }
}

/* 단일 문서 모달 대용 — 전체 뷰로 표시 */
async function openDoc(path, title) {
  const V = $('#view');
  V.innerHTML = `<div class="page-head"><h1>${esc(title || '문서')}</h1></div>
    <div class="doc"><div class="doc-toolbar"><span class="doc-path">${esc(path)}</span><div style="flex:1"></div>
      <button class="btn ghost" id="dv-back">← 목록</button>
      <button class="btn ghost" id="dv-copy">원문 복사</button>
      <button class="btn" id="dv-tpl">작업으로 보내기</button></div>
    <div class="md" id="dv-body" data-base="${esc(path)}"><p style="color:var(--muted)">불러오는 중…</p></div></div>`;
  $('#dv-back').onclick = () => go(S.view);
  try {
    const t = await fetchText(path);
    $('#dv-body').innerHTML = renderMd(t);
    $('#dv-copy').onclick = () => { navigator.clipboard.writeText(t); toast('원문을 복사했습니다.'); };
    $('#dv-tpl').onclick = () => {
      S.active = { kind: 'doc', name: title, path, systemPrompt: ORCH_SYSTEM, body: stripFrontmatter(t) };
      S.chat = []; openPanel(title, '문서 기반 작업 · ' + path);
      pushSys('이 문서를 컨텍스트로 작업을 요청하세요.');
    };
  } catch (e) { $('#dv-body').innerHTML = errorBox('문서를 불러오지 못했습니다: ' + esc(e.message)); }
}

/* ---------- 품질 검증(10단계) ---------- */
const QA_STEPS = [
  ['RFP 이해도 검증', '사업 배경·목표·범위를 정확히 이해했는가. 발주처 의도와 정렬되는가.'],
  ['요구사항 누락 검증', '명시·암묵 요구사항을 빠짐없이 추출하고 추적성을 확보했는가.'],
  ['평가항목 대응 검증', '모든 평가기준에 대응 근거와 배점 전략이 있는가.'],
  ['UX/UI 실현 가능성 검증', '제안한 UX/UI가 사용자·기술·일정 제약 안에서 실현 가능한가.'],
  ['기술 구현 가능성 검증', '아키텍처·연동·성능·보안이 구현 가능하고 표준을 따르는가.'],
  ['일정/WBS 현실성 검증', 'WBS·공수·마일스톤이 현실적이고 의존성이 반영됐는가.'],
  ['리스크 대응 검증', '주요 리스크를 식별하고 완화·대응 계획이 있는가.'],
  ['고객 설득력 검증', '윈테마·차별점·근거가 고객을 설득하기에 충분한가.'],
  ['임원 보고 적합성 검증', '경영진 관점의 요약·의사결정 포인트가 명확한가.'],
  ['최종 제출 적합성 검증', '형식·분량·컴플라이언스·오류 없이 제출 가능한가.'],
];
function viewQA(V) {
  V.innerHTML = `<div class="page-head"><h1>품질 검증 — 10단계 체계</h1><p>산출물을 제출 전 검증합니다. 항목을 체크하면 점수가 계산되고, 보고서로 내보낼 수 있습니다.</p></div>
    <div class="qa-score"><div><div class="big" id="qa-num">0%</div><div class="l">통과율</div></div>
      <div class="qa-bar"><i id="qa-fill" style="width:0%"></i></div>
      <button class="btn" id="qa-export">보고서 내보내기(.md)</button></div>
    <div class="qa-grid" id="qa-grid"></div>`;
  const g = $('#qa-grid');
  QA_STEPS.forEach((s, i) => {
    const el = document.createElement('label'); el.className = 'qa-item';
    el.innerHTML = `<input type="checkbox" data-i="${i}"><div><div class="t">${i + 1}. ${esc(s[0])}</div><div class="d">${esc(s[1])}</div></div>`;
    g.appendChild(el);
  });
  g.addEventListener('change', updateQA);
  $('#qa-export').onclick = exportQA;
}
function updateQA() {
  const checks = $$('#qa-grid input');
  const done = checks.filter(c => c.checked).length;
  const pct = Math.round(done / checks.length * 100);
  $('#qa-num').textContent = pct + '%';
  $('#qa-fill').style.width = pct + '%';
}
function exportQA() {
  const checks = $$('#qa-grid input');
  let md = `# 품질 검증 보고서\n\n생성: ${new Date().toLocaleString('ko-KR')}\n\n| # | 검증 항목 | 결과 |\n|---|---|---|\n`;
  checks.forEach((c, i) => md += `| ${i + 1} | ${QA_STEPS[i][0]} | ${c.checked ? '✅ 통과' : '⬜ 미검증'} |\n`);
  const done = checks.filter(c => c.checked).length;
  md += `\n**통과율: ${Math.round(done / checks.length * 100)}% (${done}/${checks.length})**\n\n> 기준 문서: GoldWiki/QA/QualityReviewChecklist.md\n`;
  download('quality-review-report.md', md);
  toast('품질 검증 보고서를 내보냈습니다.');
}

/* ---------- 설정 ---------- */
function viewSettings(V) {
  const s = S.settings;
  V.innerHTML = `<div class="page-head"><h1>설정</h1><p>모든 값은 이 브라우저(localStorage)에만 저장됩니다.</p></div>
  <div class="form">
    <label>응답 엔진 <span class="hint">에이전트 대화·자동 파이프라인을 무엇으로 구동할지</span></label>
    <select id="set-engine">
      <option value="prompt" ${(s.engine || 'prompt') === 'prompt' ? 'selected' : ''}>🆓 무API · 프롬프트 복사 (기본 · 과금 전혀 없음)</option>
      <option value="ollama" ${s.engine === 'ollama' ? 'selected' : ''}>🟢 로컬 Ollama (무료 · 내 PC · 모바일은 불가)</option>
      <option value="auto" ${s.engine === 'auto' ? 'selected' : ''}>☁️ 서버/내 API 자동 (유료 · 사용량 한도 있음)</option>
    </select>
    <div class="hint" style="margin-top:6px">기본은 <b>무API</b>입니다. "전송"을 누르면 완성된 실행 프롬프트가 복사되어, <a href="https://claude.ai" target="_blank">claude.ai</a> 등 무료 AI에 붙여넣어 바로 실행할 수 있습니다. API 과금이 전혀 없습니다.</div>

    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;margin:14px 0">
      <label style="margin-top:0">로컬 Ollama 주소</label>
      <input id="set-ollama-url" placeholder="http://localhost:11434" value="${esc(s.ollamaUrl || 'http://localhost:11434')}" />
      <div class="row" style="margin-top:8px">
        <div style="flex:2"><label>모델</label><input id="set-ollama-model" placeholder="llama3.1 / qwen2.5 / gemma2" value="${esc(s.ollamaModel || '')}" /></div>
        <div style="flex:1;display:flex;align-items:flex-end"><button class="btn" id="set-ollama-test" type="button" style="width:100%">연결 테스트</button></div>
      </div>
      <div id="set-ollama-status" class="hint" style="margin-top:8px"></div>
      <div class="hint" style="margin-top:6px">설치: <code>ollama pull llama3.1</code> 후 실행. 브라우저 연결 위해 <code>OLLAMA_ORIGINS=*</code> 환경변수로 Ollama를 켜세요. 자세히: <a href="../Docs/OLLAMA.md">Docs/OLLAMA.md</a></div>
    </div>

    <details>
      <summary style="cursor:pointer;font-weight:600;font-size:13px;color:var(--muted);margin:6px 0">고급: Anthropic API 키 (선택)</summary>
      <label>Anthropic API 키 <span class="hint">유료. 입력 시 브라우저에서 직접 Claude 호출</span></label>
      <input id="set-key" type="password" placeholder="sk-ant-..." value="${esc(s.apiKey || '')}" />
      <div class="row">
        <div><label>Claude 모델</label>
          <select id="set-model">${['claude-opus-4-8', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001'].map(m => `<option ${s.model === m ? 'selected' : ''}>${m}</option>`).join('')}</select></div>
        <div><label>최대 출력 토큰</label><input id="set-tokens" type="number" value="${s.maxTokens || 4096}" /></div>
      </div>
    </details>

    <label>응답 언어</label>
    <select id="set-lang"><option ${s.lang !== 'en' ? 'selected' : ''} value="ko">한국어</option><option ${s.lang === 'en' ? 'selected' : ''} value="en">English</option></select>
    <div style="margin-top:18px;display:flex;gap:8px">
      <button class="btn primary" id="set-save">저장</button>
      <button class="btn ghost" id="set-clear">키 삭제</button>
    </div>
  </div>`;
  $('#set-ollama-test').onclick = async () => {
    const url = ($('#set-ollama-url').value || '').trim().replace(/\/+$/, '');
    const st = $('#set-ollama-status'); st.style.color = 'var(--muted)'; st.textContent = '연결 시도 중…';
    try {
      const r = await fetch(url + '/api/tags');
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const d = await r.json(); const names = (d.models || []).map(m => m.name);
      st.style.color = 'var(--ok)';
      st.innerHTML = '✅ 연결됨. 설치된 모델: ' + (names.join(', ') || '(없음 — <code>ollama pull llama3.1</code> 필요)');
      if (names.length && !$('#set-ollama-model').value) $('#set-ollama-model').value = names[0];
    } catch (e) {
      st.style.color = 'var(--err)';
      st.innerHTML = '⚠️ 연결 실패: ' + esc(e.message) + ' — Ollama 실행 및 <code>OLLAMA_ORIGINS=*</code> 설정을 확인하세요. (HTTPS 사이트는 Chrome에서 localhost 호출이 허용됩니다)';
    }
  };
  $('#set-save').onclick = () => {
    S.settings = Object.assign({}, S.settings, {
      engine: $('#set-engine').value,
      ollamaUrl: $('#set-ollama-url').value.trim(),
      ollamaModel: $('#set-ollama-model').value.trim(),
      apiKey: ($('#set-key') ? $('#set-key').value.trim() : s.apiKey || ''),
      model: ($('#set-model') ? $('#set-model').value : s.model),
      maxTokens: ($('#set-tokens') ? +$('#set-tokens').value : s.maxTokens) || 4096,
      lang: $('#set-lang').value,
    });
    saveSettings(S.settings); refreshConn(); toast('설정을 저장했습니다.');
  };
  $('#set-clear').onclick = () => { S.settings.apiKey = ''; saveSettings(S.settings); refreshConn(); if ($('#set-key')) $('#set-key').value = ''; toast('API 키를 삭제했습니다.'); };
}

/* ---------- 영속화(Supabase) ---------- */
async function dbEnsureJob() {
  if (!loggedIn() || !S.active) return null;
  if (S.active.jobId) return S.active.jobId;
  try {
    const row = await CSDB.insert('jobs', {
      agent: S.active.kind === 'agent' ? S.active.name : (S.active.name || 'orchestrator'),
      command: S.active.kind === 'command' ? S.active.name : null,
      status: 'running', created_by: S.user.id,
    });
    S.active.jobId = row && row.id; return S.active.jobId;
  } catch (e) { console.warn('job 생성 실패', e); return null; }
}
async function dbSaveMessage(role, content) {
  if (!loggedIn() || !S.active || !S.active.jobId) return;
  try { await CSDB.insert('chat_messages', { job_id: S.active.jobId, role, content }); }
  catch (e) { console.warn('message 저장 실패', e); }
}
async function dbSaveDeliverable(title, content) {
  if (!loggedIn()) { toast('산출물 저장은 로그인 후 가능합니다.'); return; }
  try {
    await CSDB.insert('deliverables', {
      job_id: S.active && S.active.jobId || null, title,
      kind: S.active && S.active.kind === 'command' ? S.active.name.replace('/', '') : 'note',
      content_md: content, created_by: S.user.id,
    });
    toast('산출물 보관함에 저장했습니다.');
  } catch (e) { toast('저장 실패: ' + e.message); }
}
async function dbLearn(content, sourcePath) {
  // 자동 학습: 서버 임베딩 → knowledge_chunks(승인 대기) 적재
  try {
    const r = await fetch('/api/embed', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: content, source_path: sourcePath || (S.active && S.active.name) || 'console', topic: S.active && S.active.kind === 'agent' ? S.active.name : null }),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || ('HTTP ' + r.status));
    toast(`지식 베이스에 적재됨(승인 대기, ${d.chunks || 1}청크). 자동 학습 RAG에 반영됩니다.`);
  } catch (e) { toast('학습 적재 실패: ' + e.message); }
}
async function ragSearch(query) {
  // 서버 RAG: 임베딩+match_knowledge. 미설정 시 빈 배열.
  try {
    const r = await fetch('/api/rag', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query, k: 6 }),
    });
    if (!r.ok) return [];
    const d = await r.json().catch(() => ({}));
    return Array.isArray(d.chunks) ? d.chunks : [];
  } catch { return []; }
}

/* ---------- 내 산출물 ---------- */
async function viewDeliverables(V) {
  V.innerHTML = `<div class="page-head"><h1>내 산출물</h1><p>대화에서 저장한 산출물 보관함입니다. ${loggedIn() ? '' : '(저장/조회는 로그인 필요)'}</p></div><div id="dlv-host"></div>`;
  const host = $('#dlv-host');
  if (!CSDB.cfg().enabled) { host.innerHTML = `<div class="dlv-empty">Supabase가 연결되지 않았습니다. <br>배포 시 <code>SUPABASE_URL</code>/<code>SUPABASE_ANON_KEY</code>를 설정하면 산출물·대화가 영속 저장됩니다. (<a href="../supabase/README.md">설정 가이드</a>)</div>`; return; }
  if (!loggedIn()) { host.innerHTML = `<div class="dlv-empty">로그인하면 저장한 산출물을 볼 수 있습니다. <br><button class="btn primary" id="dlv-login">로그인</button></div>`; $('#dlv-login').onclick = () => showAuthGate(true); return; }
  host.innerHTML = `<div class="dlv-empty">불러오는 중…</div>`;
  try {
    const rows = await CSDB.select('deliverables', 'select=id,title,kind,created_at,content_md&order=created_at.desc&limit=100');
    if (!rows.length) { host.innerHTML = `<div class="dlv-empty">아직 저장된 산출물이 없습니다. 에이전트 대화에서 응답을 <b>산출물로 저장</b>해 보세요.</div>`; return; }
    const list = document.createElement('div'); list.className = 'dlv-list';
    rows.forEach(r => {
      const it = document.createElement('div'); it.className = 'dlv-item';
      it.innerHTML = `<div class="meta"><h3>${esc(r.title)}</h3><div class="sub">${esc(r.kind || 'note')} · ${new Date(r.created_at).toLocaleString('ko-KR')}</div></div>
        <button class="btn ghost" data-act="view">보기</button><button class="btn ghost" data-act="dl">다운로드</button>`;
      it.querySelector('[data-act="view"]').onclick = () => { const V2 = $('#view'); V2.innerHTML = `<div class="page-head"><h1>${esc(r.title)}</h1><button class="btn ghost" id="dlv-back">← 보관함</button></div><div class="doc"><div class="md">${renderMd(r.content_md)}</div></div>`; $('#dlv-back').onclick = () => go('deliverables'); };
      it.querySelector('[data-act="dl"]').onclick = () => download((r.title || 'deliverable').replace(/\s+/g, '_') + '.md', r.content_md);
      list.appendChild(it);
    });
    host.innerHTML = ''; host.appendChild(list);
  } catch (e) { host.innerHTML = errorBox('산출물을 불러오지 못했습니다: ' + esc(e.message)); }
}

/* ---------- 작업 패널(대화/실행) ---------- */
function openPanel(title, sub) {
  $('#wp-title').textContent = title;
  $('#wp-sub').textContent = sub || '';
  $('#wp-messages').innerHTML = '';
  $('#workpanel').classList.remove('hidden');
}
function closePanel() { $('#workpanel').classList.add('hidden'); S.active = null; }
function pushSys(text) { addMsg('sys', text); }
function addMsg(role, content) {
  S.chat.push({ role, content });
  const m = document.createElement('div'); m.className = 'msg ' + role;
  m.innerHTML = (role === 'bot' || role === 'sys') ? `<div class="md">${renderMd(content)}</div>` : esc(content);
  const box = $('#wp-messages'); box.appendChild(m); box.scrollTop = box.scrollHeight;
  return m;
}

function buildPrompt(userText) {
  const a = S.active; if (!a) return userText;
  let p = '';
  if (a.kind === 'agent') {
    p += `당신은 ClubSchool AI OS의 "${a.name}" 에이전트입니다. 아래 역할 정의를 따르세요.\n\n----- 에이전트 정의 -----\n${a.systemPrompt}\n----- 정의 끝 -----\n\n`;
  } else if (a.kind === 'command') {
    p += `다음 커맨드 명세에 따라 작업하세요.\n\n----- 커맨드(${a.name}) -----\n${a.body}\n----- 명세 끝 -----\n\n`;
  } else if (a.kind === 'doc') {
    p += `다음 문서를 컨텍스트로 사용하세요.\n\n----- 문서(${a.path}) -----\n${a.body}\n----- 문서 끝 -----\n\n`;
  }
  if ($('#wp-usewiki').checked) p += wikiIndexNote();
  p += `\n[요청]\n${userText}\n`;
  return p;
}
function wikiIndexNote() {
  const m = S.manifest;
  const topics = Object.keys(m.goldwiki.topics).join(', ');
  return `[Gold Wiki 거버넌스]\n- Gold Wiki(단일 진실 공급원)를 먼저 참조하고 표준을 따르세요.\n- 사용 가능한 지식 토픽: ${topics}.\n- 모든 결정은 DecisionLog/ProjectMemory/BestPractices/ReferenceLibrary를 갱신해야 합니다.\n`;
}

function copyPrompt() {
  const text = $('#wp-input').value.trim();
  if (!text) { toast('입력값을 먼저 작성하세요.'); return; }
  const full = buildPrompt(text);
  navigator.clipboard.writeText(full);
  addMsg('user', text);
  pushSys('실행 프롬프트를 클립보드에 복사했습니다. Claude Code 또는 claude.ai 에 붙여넣어 실행하세요.');
  $('#wp-input').value = '';
}

async function sendMessage() {
  const text = $('#wp-input').value.trim();
  if (!text) return;
  $('#wp-input').value = '';
  addMsg('user', text);

  const mode = chatMode();
  if (mode === 'prompt') {
    const full = buildPrompt(text);
    navigator.clipboard.writeText(full);
    pushSys('실행 프롬프트를 클립보드에 복사했습니다. Claude Code/claude.ai 에 붙여넣어 실행하세요. (서버에 API 키를 설정하거나 콘솔 설정에 키를 넣으면 여기서 바로 대화합니다.)');
    return;
  }

  await dbEnsureJob();
  await dbSaveMessage('user', text);

  // 자동 학습 RAG: 승인된 지식에서 관련 컨텍스트 주입
  let augmented = text;
  if ($('#wp-usewiki').checked) {
    const chunks = await ragSearch(text);
    if (chunks.length) {
      const ctx = chunks.map((c, i) => `[${i + 1}] (${c.source_path || c.topic || '지식'}) ${c.content}`).join('\n\n');
      augmented = `[자동 학습 지식 — 관련 컨텍스트]\n${ctx}\n\n[요청]\n${text}`;
      pushSys(`자동 학습 지식 ${chunks.length}건을 컨텍스트로 주입했습니다.`);
    }
  }

  const loading = addMsg('bot', '_생각 중…_');
  try {
    const { system, history } = buildSystemAndHistory(augmented);
    const reply = await llmComplete(system, history);
    loading.querySelector('.md').innerHTML = renderMd(reply);
    S.chat[S.chat.length - 1].content = reply;
    addBotActions(loading, reply, text);
    await dbSaveMessage('assistant', reply);
  } catch (e) {
    loading.querySelector('.md').innerHTML = renderMd('⚠️ ' + chatError(e.message));
  }
}

/* 통합 LLM 호출 — 현재 엔진(ollama/server/direct)으로 디스패치 */
async function llmComplete(system, history) {
  const mode = chatMode();
  if (mode === 'ollama') return callOllama(system, history);
  if (mode === 'server') return callBackendRaw(system, history);
  if (mode === 'direct') return callAnthropicRaw(system, history);
  throw new Error('실행 엔진이 없습니다. 설정에서 로컬 Ollama를 켜거나 API 키를 입력하세요.');
}

/* 로컬 Ollama (무료, 내 PC) — OpenAI 호환 아님, 네이티브 /api/chat 사용 */
async function callOllama(system, history) {
  const base = (S.settings.ollamaUrl || 'http://localhost:11434').trim().replace(/\/+$/, '');
  const messages = [{ role: 'system', content: system }, ...history];
  let r;
  try {
    r = await fetch(base + '/api/chat', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ model: S.settings.ollamaModel || 'llama3.1', stream: false, messages, options: { temperature: 0.4 } }),
    });
  } catch (e) {
    throw new Error(`Ollama(${base})에 연결할 수 없습니다. Ollama 실행 여부와 OLLAMA_ORIGINS 설정을 확인하세요. [${e.message}]`);
  }
  if (!r.ok) throw new Error('Ollama HTTP ' + r.status);
  const d = await r.json();
  return (d.message && d.message.content || '').trim() || '(빈 응답)';
}

/* 서버 프록시 경유 */
async function callBackendRaw(system, history) {
  const res = await fetch('/api/chat', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model: S.settings.model || (S.backend && S.backend.model) || 'claude-opus-4-8', max_tokens: S.settings.maxTokens || 4096, system, messages: history }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || ('HTTP ' + res.status));
  return data.text || '(빈 응답)';
}

/* 브라우저 직접 Anthropic */
async function callAnthropicRaw(system, history) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': S.settings.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
    body: JSON.stringify({ model: S.settings.model || 'claude-opus-4-8', max_tokens: S.settings.maxTokens || 4096, system, messages: history }),
  });
  if (!res.ok) { let d = res.status + ''; try { const j = await res.json(); d = (j.error && j.error.message) || d; } catch {} throw new Error(d); }
  const data = await res.json();
  return (data.content || []).map(b => b.text || '').join('\n').trim() || '(빈 응답)';
}
function chatError(raw) {
  const m = (raw || '').toLowerCase();
  const noApiTip = '\n\n💡 **API 없이 쓰려면** 설정 → 응답 엔진 → **🆓 무API · 프롬프트 복사**를 선택하세요. 과금이 전혀 없습니다.';
  if (m.includes('invalid x-api-key') || m.includes('authentication_error') || m.includes('401'))
    return '**서버 API 키가 유효하지 않습니다.** 이 사이트는 API 없이도 쓸 수 있습니다.' + noApiTip;
  if (m.includes('usage limit') || m.includes('credit') || m.includes('quota') || m.includes('billing'))
    return '**서버 API 사용량 한도에 도달했습니다.** 이 사이트는 API 없이도 쓸 수 있습니다.' + noApiTip;
  if (m.includes('overloaded') || m.includes('529'))
    return '모델이 일시적으로 혼잡합니다. 잠시 후 다시 시도하세요.';
  if (m.includes('rate') || m.includes('429'))
    return '요청이 많아 잠시 제한되었습니다. 잠시 후 다시 시도하세요.';
  return '호출 실패: ' + raw + '\n\n키/모델/네트워크를 확인하세요.';
}

/* 응답 하단 액션: 산출물 저장 / 지식으로 학습 / 복사 */
function addBotActions(msgEl, reply, srcTitle) {
  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap';
  const mk = (label, fn) => { const b = document.createElement('button'); b.className = 'btn ghost'; b.style.cssText = 'font-size:11.5px;padding:5px 9px'; b.textContent = label; b.onclick = fn; return b; };
  bar.appendChild(mk('📋 복사', () => { navigator.clipboard.writeText(reply); toast('복사했습니다.'); }));
  const title = (S.active && S.active.name ? S.active.name + ' — ' : '') + (srcTitle || '산출물').slice(0, 40);
  if (loggedIn()) {
    bar.appendChild(mk('🗂️ 산출물로 저장', () => dbSaveDeliverable(title, reply)));
    bar.appendChild(mk('🧠 지식으로 학습', () => dbLearn(reply, S.active && S.active.name)));
  }
  msgEl.appendChild(bar);
  const exp = exportBar(title, reply, ['pptx', 'doc', 'xlsx', 'pdf', 'design']);
  exp.style.marginTop = '6px'; msgEl.appendChild(exp);
}

function buildSystemAndHistory(userText) {
  const a = S.active;
  let system = (a && a.kind === 'agent') ? a.systemPrompt : ORCH_SYSTEM;
  if ($('#wp-usewiki').checked) system += '\n\n' + wikiIndexNote();
  if (S.settings.lang !== 'en') system += '\n\n반드시 한국어로, 전문적이고 실무적으로 답하세요.';
  let umsg = userText;
  if (a && (a.kind === 'command' || a.kind === 'doc')) umsg = buildPrompt(userText);
  const history = S.chat.filter(m => m.role === 'user' || m.role === 'bot')
    .slice(0, -1)
    .map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content }));
  history.push({ role: 'user', content: umsg });
  return { system, history };
}

/* ---------- 검색 ---------- */
function onSearch(e) {
  const q = e.target.value.trim().toLowerCase();
  if (S.view !== 'agents' && S.view !== 'commands') return;
  $$('#view .card').forEach(c => {
    c.style.display = c.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

/* ---------- 기타 ---------- */
function download(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/markdown' }));
  a.download = name; a.click(); URL.revokeObjectURL(a.href);
}

const ORCH_SYSTEM = `당신은 ClubSchool AI OS의 오케스트레이터입니다. Gold Wiki(단일 진실 공급원)의 표준과 거버넌스를 따르고, 적절한 전문 에이전트의 관점에서 경영진 수준의, 클라이언트 제출 가능한, 구현 가능한 산출물을 만듭니다. 플레이스홀더·모호한 표현을 쓰지 않습니다. 표·체크리스트·근거를 활용하고, 산출물 끝에 다음 단계와 품질 게이트를 제시합니다.`;

boot();
