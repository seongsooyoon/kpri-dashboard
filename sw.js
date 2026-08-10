// kpri-dashboard 폐지 (2026-08-10) — 구 서비스워커 자폭 스크립트.
// 구형 PWA가 캐시된 옛 화면을 계속 보여주는 것을 막고 새 주소로 넘긴다.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  await self.registration.unregister();
  const cs = await self.clients.matchAll({type: 'window'});
  cs.forEach(c => c.navigate('https://seongsooyoon.github.io/kpri-board/'));
})()));
