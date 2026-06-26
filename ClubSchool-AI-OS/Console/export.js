/* ClubSchool AI OS — 산출물 내보내기 (클라이언트, 무료, 무API)
 * 마크다운 → PPTX / XLSX / DOCX(.doc) / PDF / HTML / MD
 * 의존: marked, DOMPurify, XLSX(SheetJS), PptxGenJS  (모두 vendor 로컬 로드)
 */
'use strict';
const CSExport = (() => {
  const esc = s => (s || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const fname = (title, ext) => (title || 'export').replace(/[\\/:*?"<>|#]/g, '').replace(/\s+/g, '_').slice(0, 60) + '.' + ext;
  function dl(blob, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  }
  function bodyHtml(markdown) {
    const raw = window.marked ? window.marked.parse(markdown, { gfm: true }) : ('<pre>' + esc(markdown) + '</pre>');
    return window.DOMPurify ? window.DOMPurify.sanitize(raw) : raw;
  }
  function fullHtml(title, markdown) {
    return `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><title>${esc(title)}</title>
<style>body{font-family:'Malgun Gothic','Apple SD Gothic Neo','Noto Sans KR',sans-serif;max-width:860px;margin:40px auto;padding:0 24px;line-height:1.7;color:#14161a}
h1{border-bottom:2px solid #C9A227;padding-bottom:8px}h2{border-bottom:1px solid #e5e5e5;padding-bottom:6px;margin-top:30px}
table{border-collapse:collapse;width:100%;margin:14px 0}th,td{border:1px solid #ccc;padding:8px;text-align:left}th{background:#f6f6f6}
code{background:#f3f3f3;padding:1px 5px;border-radius:4px}pre{background:#0e1116;color:#e6edf3;padding:12px;border-radius:8px;overflow:auto}
blockquote{border-left:4px solid #C9A227;background:#fffdf5;padding:8px 14px;margin:12px 0;color:#5b4a12}
@media print{body{margin:0}}</style></head><body>${bodyHtml(markdown)}</body></html>`;
  }

  function md(title, markdown) { dl(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }), fname(title, 'md')); }
  function html(title, markdown) { dl(new Blob([fullHtml(title, markdown)], { type: 'text/html;charset=utf-8' }), fname(title, 'html')); }
  function doc(title, markdown) { dl(new Blob(['﻿' + fullHtml(title, markdown)], { type: 'application/msword' }), fname(title, 'doc')); }
  function pdf(title, markdown) {
    const w = window.open('', '_blank');
    if (!w) { alert('PDF 저장을 위해 팝업을 허용해 주세요.'); return; }
    w.document.write(fullHtml(title, markdown)); w.document.close();
    setTimeout(() => { try { w.focus(); w.print(); } catch (e) {} }, 600);
  }

  // 마크다운 표 → 2차원 배열들
  function parseTables(markdown) {
    const lines = markdown.split('\n'); const tables = []; let cur = null;
    const isRow = l => /^\s*\|.*\|\s*$/.test(l);
    const isSep = l => /^\s*\|?[\s:|-]+\|?\s*$/.test(l) && l.includes('-');
    const cells = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
    for (const l of lines) {
      if (isRow(l)) { if (isSep(l)) continue; if (!cur) { cur = []; tables.push(cur); } cur.push(cells(l)); }
      else cur = null;
    }
    return tables.filter(t => t.length);
  }
  function xlsx(title, markdown) {
    if (!window.XLSX) { alert('xlsx 라이브러리 로드 실패'); return; }
    const wb = XLSX.utils.book_new();
    const tables = parseTables(markdown);
    if (tables.length) tables.forEach((t, i) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(t), '표' + (i + 1)));
    else XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(markdown.split('\n').map(l => [l])), '내용');
    XLSX.writeFile(wb, fname(title, 'xlsx'));
  }

  // 마크다운 헤딩 → 슬라이드
  function splitSections(markdown) {
    const lines = markdown.split('\n'); const out = []; let cur = { title: '', body: '' };
    for (const l of lines) {
      const m = l.match(/^#{1,3}\s+(.*)/);
      if (m) { if (cur.title || cur.body.trim()) out.push(cur); cur = { title: m[1].trim(), body: '' }; }
      else cur.body += l + '\n';
    }
    if (cur.title || cur.body.trim()) out.push(cur);
    return out;
  }
  async function pptx(title, markdown) {
    if (!window.PptxGenJS) { alert('pptx 라이브러리 로드 실패'); return; }
    const p = new PptxGenJS(); p.layout = 'LAYOUT_WIDE';
    let cover = p.addSlide(); cover.background = { color: '14161A' };
    cover.addText(title || 'ClubSchool AI OS', { x: 0.6, y: 2.1, w: 12, h: 1.4, fontSize: 34, bold: true, color: 'F4E9C6' });
    cover.addText('ClubSchool AI OS · 자동 생성 산출물', { x: 0.6, y: 3.5, w: 12, fontSize: 15, color: 'C9A227' });
    splitSections(markdown).forEach(sec => {
      const sl = p.addSlide();
      sl.addText(sec.title || '내용', { x: 0.5, y: 0.35, w: 12.3, h: 0.8, fontSize: 22, bold: true, color: '14161A' });
      sl.addShape('line', { x: 0.5, y: 1.15, w: 12.3, h: 0, line: { color: 'C9A227', width: 1.5 } });
      const items = sec.body.split('\n').map(l => l.trim()).filter(Boolean)
        .filter(l => !/^\|/.test(l)).slice(0, 11)
        .map(l => ({ text: l.replace(/^[-*>#\s]+/, '').replace(/\*\*/g, ''), options: { bullet: true, fontSize: 13, color: '2A2F3A', paraSpaceAfter: 4 } }));
      if (items.length) sl.addText(items, { x: 0.7, y: 1.4, w: 12, h: 5.6, valign: 'top' });
    });
    await p.writeFile({ fileName: fname(title, 'pptx') });
  }

  // 디자인 HTML — 프리미엄 자기완결 디자인 산출물(Claude Design/Express HTML 가져오기 호환)
  function designHtml(title, markdown) {
    const secs = splitSections(markdown);
    const intro = secs.length && !secs[0].title ? secs.shift() : null;
    const cards = secs.map((s, i) => `
      <section class="cs-sec">
        <div class="cs-no">${String(i + 1).padStart(2, '0')}</div>
        <h2>${esc(s.title || '내용')}</h2>
        <div class="cs-body">${bodyHtml(s.body)}</div>
      </section>`).join('');
    return `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<style>
:root{--gold:#E7C65A;--gold2:#C9A227;--ink:#0c0e12;--surf:#15171e;--line:#262b36;--mut:#9aa2b1}
*{box-sizing:border-box}body{margin:0;font-family:'Pretendard','Apple SD Gothic Neo','Noto Sans KR',system-ui,sans-serif;background:#0b0d11;color:#e9ecf3;line-height:1.7}
.cs-hero{padding:64px 48px;background:radial-gradient(800px 400px at 80% -20%,rgba(231,198,90,.18),transparent),linear-gradient(160deg,#14161d,#0a0c10);border-bottom:1px solid var(--line)}
.cs-kicker{color:var(--gold);font-size:13px;letter-spacing:.22em;text-transform:uppercase;font-weight:700}
.cs-hero h1{font-size:44px;margin:14px 0 10px;line-height:1.15;letter-spacing:-.02em;background:linear-gradient(90deg,#fff,#cdd3df);-webkit-background-clip:text;background-clip:text;color:transparent}
.cs-hero p{color:var(--mut);font-size:16px;max-width:680px;margin:0}
.cs-wrap{max-width:980px;margin:0 auto;padding:36px 24px 80px}
.cs-sec{background:var(--surf);border:1px solid var(--line);border-radius:18px;padding:28px 30px;margin:18px 0;position:relative;overflow:hidden}
.cs-sec::after{content:"";position:absolute;right:-40px;top:-40px;width:140px;height:140px;background:rgba(231,198,90,.10);border-radius:50%;filter:blur(30px)}
.cs-no{font-family:ui-monospace,monospace;color:var(--gold2);font-weight:800;font-size:13px;letter-spacing:.1em}
.cs-sec h2{font-size:23px;margin:6px 0 14px;color:#fff}
.cs-body{color:#c3cad7;font-size:14.5px}
.cs-body h3{color:var(--gold);font-size:16px;margin:18px 0 8px}
.cs-body table{border-collapse:collapse;width:100%;margin:12px 0;font-size:13px}
.cs-body th,.cs-body td{border:1px solid var(--line);padding:9px 11px;text-align:left}.cs-body th{background:#222734;color:#fff}
.cs-body code{background:#222734;color:var(--gold);padding:1px 6px;border-radius:5px}
.cs-body blockquote{border-left:3px solid var(--gold);background:rgba(231,198,90,.08);margin:12px 0;padding:8px 14px;border-radius:0 8px 8px 0}
.cs-foot{color:var(--mut);font-size:12px;text-align:center;padding:24px}
@media print{body{background:#fff;color:#111}.cs-sec{background:#fff;border-color:#ddd}.cs-hero{background:#faf6e8}.cs-hero h1{color:#1a1500;-webkit-text-fill-color:#1a1500}}
</style></head><body>
<div class="cs-hero"><div class="cs-kicker">ClubSchool AI OS</div><h1>${esc(title)}</h1>${intro ? `<p>${esc(intro.body.replace(/[#>*`-]/g, '').trim().slice(0, 220))}</p>` : ''}</div>
<div class="cs-wrap">${cards}</div>
<div class="cs-foot">Generated by ClubSchool AI OS · 자율 멀티에이전트 산출물</div>
</body></html>`;
  }
  function design(title, markdown) { dl(new Blob([designHtml(title, markdown)], { type: 'text/html;charset=utf-8' }), fname(title + '_design', 'html')); }

  return { md, html, doc, pdf, xlsx, pptx, design,
    FORMATS: [['PPTX', 'pptx'], ['XLSX', 'xlsx'], ['DOCX', 'doc'], ['PDF', 'pdf'], ['DESIGN', 'design'], ['HTML', 'html'], ['MD', 'md']] };
})();
window.CSExport = CSExport;
