const CACHE='box-workout-v3.1';
const FILES=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./assets/curl-1.webp','./assets/curl-2.webp','./assets/curl-3.webp','./assets/curl-strip.webp','./assets/hammer-strip.webp','./assets/concentration-strip.webp','./assets/reverse-strip.webp','./assets/triceps-extension-strip.webp','./assets/triceps-pushdown-strip.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
