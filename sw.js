const C="kpri-2026-06-14_1953_KST";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()).catch(()=>{}));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;e.respondWith(caches.match(r).then(cached=>{const net=fetch(r).then(resp=>{if(resp&&resp.status===200){const cp=resp.clone();caches.open(C).then(c=>c.put(r,cp));}return resp;}).catch(()=>cached);return cached||net;}));});
