const CACHE = 'fsgt-v2';
const FILES = [
  './index.html',
  './fiche_suivi_PE12.html',
  './fiche_suivi_PE20_N1.html',
  './fiche_suivi_PE40.html',
  './fiche_suivi_OWPA20.html',
  './fiche_suivi_PA20.html',
  './fiche_suivi_PA40.html',
  './fiche_suivi_PA60.html',
  './fiche_suivi_GP.html',
  './fiche_suivi_PE12_mobile.html',
  './fiche_suivi_PE20_mobile.html',
  './fiche_suivi_PE40_mobile.html',
  './fiche_suivi_OWPA20_mobile.html',
  './fiche_suivi_PA40_mobile.html',
  './fiche_suivi_PA60_mobile.html',
  './fiche_suivi_GP_mobile.html',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
