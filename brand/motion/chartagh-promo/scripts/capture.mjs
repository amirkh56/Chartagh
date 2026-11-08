// Footage from the live chartagh.agency: `node scripts/capture.mjs` → assets/site/*.png
// Each page: one viewport frame and one full-page strip (scrolled first so reveal animations fire).
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';

const BASE = 'https://chartagh.agency';
const PAGES = [
  ['home', '/'], ['work', '/work'], ['web', '/work/web'], ['poster', '/work/poster'], ['seo', '/work/seo'],
  ['amiri', '/work/web/amirimusic'], ['zhoan', '/work/web/zhoan'], ['manto', '/work/web/mantoonline'], ['about', '/about'],
];
const out = new URL('../assets/site/', import.meta.url);
mkdirSync(out, { recursive: true });

const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=9334', '--hide-scrollbars', `--user-data-dir=${tmpdir()}/chartagh-cap`, 'about:blank']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(1500);
const [page] = (await (await fetch('http://127.0.0.1:9334/json')).json()).filter((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = {};
ws.onmessage = (e) => { const m = JSON.parse(e.data); pending[m.id]?.(m.result); };
const send = (method, params = {}) => new Promise((r) => { pending[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

await send('Page.enable');
for (const [mode, w, h, dsf] of [['m', 390, 844, 3], ['d', 1440, 900, 1.5]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dsf, mobile: mode === 'm' });
  for (const [name, path] of PAGES) {
    if (mode === 'd' && !['home', 'work', 'amiri', 'zhoan'].includes(name)) continue;
    await send('Page.navigate', { url: BASE + path });
    await sleep(4000);
    const top = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(new URL(`${name}-${mode}.png`, out), Buffer.from(top.data, 'base64'));
    // hide the fixed preloader/overlays, walk the page so reveals settle, then shoot the whole strip
    await ev(`[...document.querySelectorAll('body *')].forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'&&(e.innerText||'').includes('صبر'))e.style.display='none'})`);
    await ev(`(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0);await new Promise(r=>setTimeout(r,800));return 1})()`);
    const H = Math.min(await ev('document.documentElement.scrollHeight'), mode === 'm' ? 7000 : 4200);
    const full = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: H, scale: 1 } });
    writeFileSync(new URL(`${name}-${mode}-full.jpg`, out), Buffer.from(full.data, 'base64'));
    console.log(name, mode, H);
  }
}
ws.close(); chrome.kill();
