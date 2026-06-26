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

  return { md, html, doc, pdf, xlsx, pptx,
    FORMATS: [['PPTX', 'pptx'], ['XLSX', 'xlsx'], ['DOCX', 'doc'], ['PDF', 'pdf'], ['HTML', 'html'], ['MD', 'md']] };
})();
window.CSExport = CSExport;
