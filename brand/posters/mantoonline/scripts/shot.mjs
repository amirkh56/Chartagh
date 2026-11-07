// Fresh hero of mantoonline.com into assets/: `node scripts/shot.mjs` (desktop 1440x900@2x) or `node scripts/shot.mjs mobile` (390x844@3x)
const M = process.argv[2] === 'mobile';
// Dismisses the welcome notice, then waits for the slider to settle before capturing.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=9333', '--hide-scrollbars', `--user-data-dir=${tmpdir()}/manto-shot`, 'about:blank']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(1500);
const [page] = (await (await fetch('http://127.0.0.1:9333/json')).json()).filter((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = {};
ws.onmessage = (e) => { const m = JSON.parse(e.data); pending[m.id]?.(m.result); };
const send = (method, params = {}) => new Promise((r) => { pending[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
await send('Emulation.setDeviceMetricsOverride', M ? { width: 390, height: 844, deviceScaleFactor: 3, mobile: true } : { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
await send('Page.enable');
await send('Page.navigate', { url: 'https://mantoonline.com/' });
await sleep(3000);
// the notice shows up at a different moment on each viewport, so poll for it
const dismiss = `(() => { const b = [...document.querySelectorAll('button,a')].find(b => b.textContent.trim() === 'متوجه شدم' && b.offsetParent); b?.click(); return !!b; })()`;
for (let i = 0; i < 40; i++) { await sleep(250); if ((await send('Runtime.evaluate', { expression: dismiss, returnByValue: true })).result.value) break; }
await sleep(800);
// wait for the slider to switch slides, then let that slide's text animation finish (+1s margin)
const active = `(document.querySelector('main section, section')?.innerHTML.match(/class="[^"]*active[^"]*"/g) || []).join()`;
const first = (await send('Runtime.evaluate', { expression: active, returnByValue: true })).result.value;
for (let i = 0; i < 40; i++) { await sleep(250); if ((await send('Runtime.evaluate', { expression: active, returnByValue: true })).result.value !== first) break; }
await sleep(2200);
const { data } = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(new URL(M ? '../assets/mobile-hero.png' : '../assets/desktop-hero.png', import.meta.url), Buffer.from(data, 'base64'));
ws.close(); chrome.kill();
