const CACHE = 'fsgt-v3';
const FILES = [
  './index.html',
  './fiche%20suivi%20PE12.html',
  './fiche%20suivi%20PE20%20N1.html',
  './fiche%20suivi%20PE40.html',
  './fiche%20suivi%20OWPA20.html',
  './fiche%20suivi%20PA20.html',
  './fiche%20suivi%20PA40.html',
  './fiche%20suivi%20PA60.html',
  './fiche%20suivi%20GP.html',
  './fiche%20suivi%20PE12%20mobile.html',
  './fiche%20suivi%20PE20%20mobile.html',
  './fiche%20suivi%20PE40%20mobile.html',
  './fiche%20suivi%20OWPA20%20mobile.html',
  './fiche%20suivi%20PA40%20mobile.html',
  './fiche%20suivi%20PA60%20mobile.html',
  './fiche%20suivi%20GP%20mobile.html',
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
