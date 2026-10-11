// node snyat.mjs - снять все обложки 1280x720 из shablon.html
import { spawn } from "node:child_process"; import http from "node:http"; import { readFileSync, writeFileSync, mkdtempSync, existsSync } from "node:fs"; import { tmpdir } from "node:os"; import { join, extname } from "node:path";
const V = [
 ["1","Поддержка","часть 1","1-U-4.png","1-U-6.png"],["2","Поддержка","часть 2","2-U-3.png","2-U-6.png"],
 ["3","Тревога","часть 1","3-U-3.png","3-N-1.png"],["4","Тревога","часть 2","4-U-3.png","4-N-3.png"],
 ["5","Агрессия","часть 1","5-U-4.png","5-N-5.png"],["6","Агрессия","часть 2","6-U-2.png","5-N-5.png"],
 ["7","Любовь к себе","","7-U-6.png","7-N.png"]];
const T = { ".html":"text/html; charset=utf-8", ".png":"image/png", ".woff2":"font/woff2" };
const srv = http.createServer((q,s)=>{ const f="."+decodeURIComponent(new URL(q.url,"http://x").pathname); if(!existsSync(f)){s.statusCode=404;return s.end();} s.setHeader("content-type",T[extname(f)]||"application/octet-stream"); s.end(readFileSync(f)); }).listen(8766);
const port=9352; const chrome=spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",["--headless=new",`--remote-debugging-port=${port}`,`--user-data-dir=${mkdtempSync(join(tmpdir(),"chr-"))}`,"about:blank"]);
const pauza=(ms)=>new Promise(r=>setTimeout(r,ms));
let ws; for(let i=0;i<40;i++){try{const l=await(await fetch(`http://127.0.0.1:${port}/json`)).json();const p=l.find(t=>t.type==="page");if(p){ws=new WebSocket(p.webSocketDebuggerUrl);break;}}catch{} await pauza(250);}
await new Promise(r=>ws.addEventListener("open",r));
let id=0;const zh=new Map(); ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&zh.has(m.id)){zh.get(m.id)(m.result);zh.delete(m.id);}});
const cdp=(method,params={})=>new Promise(r=>{const n=++id;zh.set(n,r);ws.send(JSON.stringify({id:n,method,params}));});
await cdp("Emulation.setDeviceMetricsOverride",{width:1280,height:720,deviceScaleFactor:1,mobile:false});
for(const [n,t,c,u,nn] of V){
  await cdp("Page.navigate",{url:`http://localhost:8766/shablon.html?n=${n}&u=${u}&nn=${nn}&t=${encodeURIComponent(t)}&c=${encodeURIComponent(c)}`}); await pauza(1800);
  const s=await cdp("Page.captureScreenshot",{format:"png"}); writeFileSync(`oblozhka-${n}.png`,Buffer.from(s.data,"base64")); console.log("готова",n,t,c);
}
ws.close(); chrome.kill(); srv.close();
