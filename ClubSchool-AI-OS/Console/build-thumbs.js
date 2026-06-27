#!/usr/bin/env node
/* ClubSchool AI OS — 갤러리 썸네일 자동 생성
 *
 * 갤러리(gallery.js)의 GROUPS를 단일 진실로 읽어, 각 산출물의 썸네일을
 * Console/thumbs/<name>.png 로 (재)생성한다. 산출물이 바뀌면 이 스크립트만 다시 실행.
 *
 * 사용법 (ClubSchool-AI-OS/ 에서):
 *   npm i -D playwright            # 최초 1회 (브라우저 포함)
 *   node Console/build-thumbs.js   # 정적 서버를 자동 기동/종료하고 썸네일 생성
 *
 * 동작: 정적 HTTP 서버를 8099에 띄우고 → 갤러리에서 GROUPS를 읽어 →
 *   design/proto/html 항목은 해당 페이지를 직접 캡처, md 항목은 갤러리 뷰어로 렌더 후 캡처.
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

let pw;
try { pw = require('playwright'); }
catch { try { pw = require('/opt/node22/lib/node_modules/playwright'); } catch { console.error('playwright 필요: npm i -D playwright'); process.exit(1); } }

const ROOT = path.resolve(__dirname, '..');          // ClubSchool-AI-OS/
const OUT = path.join(__dirname, 'thumbs');           // Console/thumbs
const PORT = 8099;
const BASE = `http://localhost:${PORT}`;

function thumbName(it) {                               // thumb 경로의 파일명, 없으면 path 기반
  if (it.thumb) return path.basename(it.thumb);
  return it.path.replace(/[^a-z0-9]+/gi, '_').slice(0, 40) + '.png';
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 1200));

  const browser = await pw.chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 820, height: 512 }, deviceScaleFactor: 1.4 });
  const page = await ctx.newPage();

  // 갤러리에서 GROUPS(단일 진실)를 읽는다
  await page.goto(`${BASE}/Console/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const items = await page.evaluate(() => GROUPS.flatMap(g => g.items));
  console.log(`산출물 ${items.length}개 → 썸네일 생성`);

  let ok = 0;
  for (const it of items) {
    const file = path.join(OUT, thumbName(it));
    try {
      if (it.kind === 'md') {
        await page.goto(`${BASE}/Console/index.html`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(300);
        await page.evaluate((pp) => {
          let item = null;
          GROUPS.forEach(g => g.items.forEach(x => { if (x.path === pp) item = x; }));
          if (item) openViewer(item);
        }, it.path);
        await page.waitForTimeout(900);
        const body = await page.$('#gv-body');
        await (body || page).screenshot({ path: file });
      } else {
        const url = BASE + '/' + it.path.split('/').map(encodeURIComponent).join('/');
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(700);
        await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 820, height: 512 } });
      }
      ok++; console.log('  ✓', path.basename(file));
    } catch (e) { console.log('  ✗', it.path, e.message); }
  }

  await browser.close();
  srv.kill();
  console.log(`완료: ${ok}/${items.length}`);
})();
