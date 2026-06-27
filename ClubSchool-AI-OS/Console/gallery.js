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
    name: '예시 — 청소년 동아리 통합 플랫폼',
    tag: '레퍼런스',
    items: [
      { icon: '🎨', title: '제안 경영요약 (1p 디자인)', desc: '프리미엄 1페이지 디자인 산출물.', kind: 'design', path: 'Examples/design-onepager.html', thumb: 'thumbs/onepager.png' },
      { icon: '📋', title: 'RFP 심층 분석 보고서', desc: '요구·평가·리스크 분석.', kind: 'md', path: 'Examples/01_RFP_Analysis.md', thumb: 'thumbs/ex-rfp.png' },
      { icon: '📄', title: '제안 경영 요약', desc: 'Executive Summary.', kind: 'md', path: 'Examples/02_Proposal_Executive_Summary.md', thumb: 'thumbs/ex-prop.png' },
    ],
  },
  {
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

/* 갤러리 렌더 */
function renderGallery() {
  const m = $('#g-main');
  const hero = `<section class="g-hero">
    <div class="g-hero-k">DELIVERABLES</div>
    <h1>산출물 쇼룸</h1>
    <p>ClubSchool AI OS가 만든 산출물을 열람하고 <b>PDF·PPTX·DOCX</b>로 내려받을 수 있습니다. 설치·로그인 없이 바로 사용하세요.</p>
  </section>`;
  const groups = GROUPS.map(g => `
    <section class="g-group">
      <div class="g-group-head"><h2>${esc(g.name)}</h2><span class="g-tag">${esc(g.tag)}</span></div>
      <div class="g-cards">
        ${g.items.map((it, i) => cardHtml(g, i, it)).join('')}
      </div>
    </section>`).join('');
  m.innerHTML = hero + groups;
  m.querySelectorAll('[data-open]').forEach(b => b.onclick = () => openItem(JSON.parse(b.dataset.open)));
}
function badge(kind) { return { md: '문서', design: '디자인', proto: '프로토타입' }[kind] || ''; }
function primaryLabel(kind) { return { md: '보기', design: '열기', proto: '실행 ▶' }[kind] || '열기'; }
function cardHtml(g, i, it) {
  const data = esc(JSON.stringify(it));
  const thumb = it.thumb
    ? `<img src="${esc(it.thumb)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><span class="g-thumb-fallback" style="display:none">${it.icon}</span>`
    : `<span class="g-thumb-fallback" style="display:grid">${it.icon}</span>`;
  return `<div class="g-card">
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
