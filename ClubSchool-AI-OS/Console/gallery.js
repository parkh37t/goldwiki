/* ClubSchool AI OS — 산출물 쇼룸(갤러리)
 * 클라이언트용: 로그인·설정 없이 산출물을 보고 PDF/PPTX/DOCX로 내보낸다.
 * 의존: marked, DOMPurify, CSExport (export.js)
 */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const esc = (t) => (t || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const docUrl = (p) => new URL('../' + p.replace(/^\/+/, ''), location.href).href;

function toast(msg, ms = 2200) {
  const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.add('hidden'), ms);
}

/* 큐레이션된 산출물 목록 */
const GROUPS = [
  {
    id: 'ambassador', icon: '🏨', client: '엠배서더호텔 그룹', period: '12억 · 10~11개월 · 분석',
    name: '엠배서더호텔 그룹 — 홈페이지 재구축',
    tag: '제안 분석 · 대외비',
    items: [
      { icon: '🏨', title: 'RFP 분석 (디자인본)', desc: 'D2C·부킹엔진·클라우드·보안 — 요구·리스크·일정·Bid 권고(70%).', kind: 'design', path: 'Examples/Ambassador_RFP_Brief.html', thumb: 'thumbs/amb-rfp.png' },
      { icon: '📋', title: 'RFP 분석 패키지', desc: 'FNR 11영역·NFR·리스크 레지스터·WBS·임원 요약.', kind: 'md', path: 'Examples/Ambassador_RFP_Analysis.md', thumb: 'thumbs/amb-analysis.png' },
    ],
  },
  {
    id: 'meritz', icon: '🛡️', client: '메리츠화재 TM사업부문', period: '2년 운영 · 평가 80:20 · 제안',
    name: '메리츠화재 — 인터넷 마케팅 플랫폼 운영 제안',
    tag: '제안 패키지',
    items: [
      { icon: '📊', title: '경영 요약 (프리미엄 디자인)', desc: 'A4 3페이지 · 윈테마·배점·KPI·Bid 권고. 클라이언트 제출용.', kind: 'design', path: 'Examples/Meritz_Executive_Brief.html', thumb: 'thumbs/exec.png' },
      { icon: '📋', title: 'RFP 분석 (디자인본)', desc: '요구·평가배점·페인·윈테마·리스크·일정. 자체 88점·Bid 권고.', kind: 'design', path: 'Examples/Meritz_RFP_Brief.html', thumb: 'thumbs/rfp.png' },
      { icon: '📄', title: '제안서 본문', desc: 'RFP 필수 목차·평가 80:20 대응·조직 운영방안.', kind: 'md', path: 'Examples/Meritz_제안서_본문.md', thumb: 'thumbs/proposal.png' },
      { icon: '🎯', title: '별첨4 서비스 개선 (디자인본)', desc: '① 보장분석 전환율 ② 펫보험 이탈율 — AS-IS·TO-BE·KPI.', kind: 'design', path: 'Examples/Meritz_별첨4_Brief.html', thumb: 'thumbs/annex4.png' },
      { icon: '📱', title: '보장분석 동작 프로토타입', desc: '5화면 클릭 시연 (모바일).', kind: 'proto', path: 'Examples/prototypes/meritz-bojang-analysis.html', thumb: 'thumbs/proto-bojang.png' },
      { icon: '📱', title: '펫보험 동작 프로토타입', desc: '6화면 클릭 시연 (모바일).', kind: 'proto', path: 'Examples/prototypes/meritz-pet-insurance.html', thumb: 'thumbs/proto-pet.png' },
    ],
  },
  {
    id: 'demo', icon: '🎓', client: '데모 · 레퍼런스', period: '모범 산출물 예시',
    name: '예시 — 청소년 동아리 통합 플랫폼',
    tag: '레퍼런스',
    items: [
      { icon: '🎨', title: '제안 경영요약 (1p 디자인)', desc: '프리미엄 1페이지 디자인 산출물.', kind: 'design', path: 'Examples/design-onepager.html', thumb: 'thumbs/onepager.png' },
      { icon: '📋', title: 'RFP 심층 분석 보고서', desc: '요구·평가·리스크 분석.', kind: 'md', path: 'Examples/01_RFP_Analysis.md', thumb: 'thumbs/ex-rfp.png' },
      { icon: '📄', title: '제안 경영 요약', desc: 'Executive Summary.', kind: 'md', path: 'Examples/02_Proposal_Executive_Summary.md', thumb: 'thumbs/ex-prop.png' },
    ],
  },
  {
    id: 'kb', icon: '📚', client: '내부 지식', period: '단일 진실 공급원',
    name: '지식베이스',
    tag: 'GoldWiki',
    items: [
      { icon: '📚', title: 'GoldWiki 통합본', desc: '전체 지식 105개 문서 통합 (NotebookLM 소스용).', kind: 'md', path: 'Examples/GoldWiki_Combined.md', thumb: 'thumbs/goldwiki.png' },
    ],
  },
];

/* 테마 */
function applyTheme(t) { document.documentElement.setAttribute('data-theme', t); const b = $('#g-theme'); if (b) b.textContent = t === 'light' ? '🌙' : '☀️'; }
function toggleTheme() { const n = (localStorage.getItem('cs.theme') || 'light') === 'light' ? 'dark' : 'light'; localStorage.setItem('cs.theme', n); applyTheme(n); }

function renderMd(text) {
  const clean = (text || '').replace(/^---\n[\s\S]*?\n---\n/, '');
  if (window.marked) { const h = window.marked.parse(clean, { gfm: true, breaks: false }); return window.DOMPurify ? window.DOMPurify.sanitize(h) : h; }
  return '<pre style="white-space:pre-wrap">' + esc(clean) + '</pre>';
}

/* 갤러리 렌더 — 프로젝트 레일 + 콘텐츠 */
function renderGallery() {
  const m = $('#g-main');
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);
  const railItems = [`<button class="g-proj on" data-pid="all"><span class="g-proj-ic">🗂️</span><span class="g-proj-t"><b>전체 산출물</b><i>${total}개</i></span></button>`]
    .concat(GROUPS.map(g => `<button class="g-proj" data-pid="${esc(g.id)}"><span class="g-proj-ic">${g.icon || '📁'}</span><span class="g-proj-t"><b>${esc(g.client || g.name)}</b><i>${g.items.length}개 · ${esc((g.period || '').split(' · ').pop())}</i></span></button>`));
  const rail = `<aside class="g-rail"><div class="g-rail-h">프로젝트</div>${railItems.join('')}</aside>`;

  const hero = `<section class="g-hero">
    <div class="g-hero-k">DELIVERABLES</div>
    <h1 id="g-h1">산출물 쇼룸</h1>
    <p id="g-sub">ClubSchool AI OS가 만든 산출물을 프로젝트별로 열람하고 <b>PDF·PPTX·DOCX</b>로 내려받으세요. 설치·로그인 없이 바로 사용.</p>
  </section>`;
  const controls = `<div class="g-controls">
    <input id="g-search" class="g-search" type="search" placeholder="산출물 검색…" />
    <div class="g-filters">
      ${[['all', '전체'], ['design', '디자인'], ['md', '문서'], ['proto', '프로토타입']].map(([k, l], i) =>
        `<button class="g-filter${i === 0 ? ' on' : ''}" data-kind="${k}">${l}</button>`).join('')}
    </div>
  </div>`;
  const groups = GROUPS.map(g => `
    <section class="g-group" data-group data-gid="${esc(g.id)}">
      <div class="g-group-head"><h2>${esc(g.name)}</h2><span class="g-tag">${esc(g.tag)}</span></div>
      ${g.client ? `<div class="g-group-meta">${esc(g.client)} · ${esc(g.period || '')}</div>` : ''}
      <div class="g-cards">${g.items.map((it, i) => cardHtml(g, i, it)).join('')}</div>
    </section>`).join('');
  const content = `<div class="g-content">${hero}${controls}${groups}<div id="g-empty" class="g-empty hidden">검색 결과가 없습니다.</div></div>`;

  m.innerHTML = `<div class="g-shell">${rail}${content}</div>`;
  m.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openItem(JSON.parse(b.dataset.open)));
  $('#g-search').addEventListener('input', applyView);
  m.querySelectorAll('.g-filter').forEach(b => b.onclick = () => {
    m.querySelectorAll('.g-filter').forEach(x => x.classList.remove('on')); b.classList.add('on'); applyView();
  });
  m.querySelectorAll('.g-proj').forEach(b => b.onclick = () => {
    m.querySelectorAll('.g-proj').forEach(x => x.classList.remove('on')); b.classList.add('on'); applyView();
    m.querySelector('.g-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function applyView() {
  const q = ($('#g-search') ? $('#g-search').value : '').trim().toLowerCase();
  const kindBtn = document.querySelector('.g-filter.on');
  const kind = kindBtn ? kindBtn.dataset.kind : 'all';
  const projBtn = document.querySelector('.g-proj.on');
  const pid = projBtn ? projBtn.dataset.pid : 'all';
  let shown = 0;
  document.querySelectorAll('.g-group[data-group]').forEach(g => {
    const inProj = pid === 'all' || g.dataset.gid === pid;
    let any = false;
    g.querySelectorAll('.g-card').forEach(card => {
      const ok = inProj && (kind === 'all' || card.dataset.kind === kind) && (!q || (card.dataset.text || '').toLowerCase().includes(q));
      card.classList.toggle('hidden', !ok); if (ok) { any = true; shown++; }
    });
    g.classList.toggle('hidden', !any);
  });
  // 헤더: 단일 프로젝트 선택 시 제목 갱신
  const g1 = $('#g-h1'), sub = $('#g-sub');
  if (g1) {
    const proj = GROUPS.find(x => x.id === pid);
    if (pid !== 'all' && proj) { g1.textContent = proj.client || proj.name; sub.innerHTML = `${esc(proj.name)} · <b>${proj.items.length}개 산출물</b>`; }
    else { g1.textContent = '산출물 쇼룸'; sub.innerHTML = 'ClubSchool AI OS가 만든 산출물을 프로젝트별로 열람하고 <b>PDF·PPTX·DOCX</b>로 내려받으세요.'; }
  }
  const empty = $('#g-empty'); if (empty) empty.classList.toggle('hidden', shown > 0);
}
function badge(kind) { return { md: '문서', design: '디자인', proto: '프로토타입' }[kind] || ''; }
function primaryLabel(kind) { return { md: '보기', design: '열기', proto: '실행 ▶' }[kind] || '열기'; }
function cardHtml(g, i, it) {
  const data = esc(JSON.stringify(it));
  const thumb = it.thumb
    ? `<img src="${esc(it.thumb)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="g-thumb-fallback" style="display:none">${it.icon}</span>`
    : `<span class="g-thumb-fallback" style="display:grid">${it.icon}</span>`;
  return `<div class="g-card" data-kind="${esc(it.kind)}" data-text="${esc(it.title + ' ' + it.desc)}">
    <div class="g-thumb">${thumb}<span class="g-kind">${badge(it.kind)}</span></div>
    <div class="g-card-b">
      <h3>${esc(it.title)}</h3>
      <p>${esc(it.desc)}</p>
      <div class="g-card-act"><button class="btn primary" data-open='${data}'>${primaryLabel(it.kind)}</button></div>
    </div>
  </div>`;
}

/* 항목 열기 */
function openItem(it) {
  if (it.kind === 'proto' || it.kind === 'design') { window.open(docUrl(it.path), '_blank', 'noopener'); return; }
  openViewer(it);
}

async function openViewer(it) {
  const v = $('#g-viewer'); v.classList.remove('hidden'); document.body.style.overflow = 'hidden';
  $('#gv-title').textContent = it.title;
  $('#gv-exports').innerHTML = '';
  $('#gv-body').innerHTML = '<div class="gv-loading">불러오는 중…</div>';
  let md = '';
  try {
    const r = await fetch(docUrl(it.path), { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    md = await r.text();
  } catch (e) {
    $('#gv-body').innerHTML = `<div class="gv-loading">문서를 불러오지 못했습니다: ${esc(e.message)}</div>`;
    return;
  }
  $('#gv-body').innerHTML = `<article class="md doc-render">${renderMd(md)}</article>`;
  // 내보내기 버튼
  const exps = [['PDF', 'pdf'], ['PPTX', 'pptx'], ['DOCX', 'doc'], ['XLSX', 'xlsx'], ['MD', 'md']];
  const host = $('#gv-exports');
  exps.forEach(([label, fn]) => {
    const b = document.createElement('button'); b.className = 'btn'; b.textContent = label;
    b.onclick = () => { try { CSExport[fn](it.title, md); } catch (e) { toast('내보내기 실패: ' + e.message); } };
    host.appendChild(b);
  });
  $('#gv-body').scrollTop = 0;
}
function closeViewer() { $('#g-viewer').classList.add('hidden'); document.body.style.overflow = ''; }

/* 부트 */
function boot() {
  applyTheme(localStorage.getItem('cs.theme') || 'light');
  $('#g-theme').onclick = toggleTheme;
  $('#gv-back').onclick = closeViewer;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeViewer(); });
  renderGallery();
}
document.addEventListener('DOMContentLoaded', boot);
