const CACHE = 'my-finance-shell-v1';
const SHELL = ['./','./index.html','./firebase-config.js','./manifest.webmanifest','./icon.svg','https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(async cache => { await cache.addAll(SHELL.filter(x=>x.startsWith('./'))); await Promise.allSettled(SHELL.filter(x=>x.startsWith('https:')).map(x=>cache.add(x))); }).then(()=>self.skipWaiting())); });
self.addEventListener('activate', event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch', event=>{
  if(event.request.method!=='GET')return;
  const u=new URL(event.request.url);
  if(u.origin!==self.location.origin && !(u.hostname==='www.gstatic.com' && u.pathname.startsWith('/firebasejs/')))return;
  event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response;}catch(e){const saved=await cache.match(event.request);if(saved)return saved;if(event.request.mode==='navigate'){const page=await cache.match('./index.html');if(page)return page;}throw e;}})());
});