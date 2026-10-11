const CACHE='my-finance-shell-v3';
const LOCAL=['./','./index.html','./firebase-config.js','./manifest.webmanifest','./icon.svg'];
const CDN=['https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js'];
self.addEventListener('install',e=>e.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(LOCAL);
  await Promise.allSettled(CDN.map(url=>cache.add(url)));
  await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  await Promise.all((await caches.keys()).filter(k=>k.startsWith('my-finance-shell-')&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const isLocal=u.origin===self.location.origin;
  const isFirebaseSDK=u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/10.14.1/');
  if(!isLocal&&!isFirebaseSDK)return;
  // Preserve all personal finance data in localStorage, never cache API or auth requests.
  e.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const offline=await cache.match(e.request);
    if(e.request.mode==='navigate'){
      try {
        const response=await fetch(e.request);
        if(response.ok)await cache.put('./index.html',response.clone());
        return response;
      }catch(err){
        return offline || await cache.match('./index.html') || Response.error();
      }
    }
    if(offline)return offline;
    try {
      const response=await fetch(e.request);
      if(response.ok)await cache.put(e.request,response.clone());
      return response;
    }catch(err){return Response.error();}
  })());
});