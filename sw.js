// Service worker minimal : permet d'installer l'appli sur l'écran d'accueil.
// Il garde la page en mémoire pour un démarrage rapide, mais ne garde jamais les données du serveur.
const CACHE = 'festivites-v1';
const FICHIERS = ['./', './index.html', './manifest.webmanifest', './icones/icone-192.png', './icones/icone-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((cles) => Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   // le serveur Google n'est jamais mis en cache
  // Réseau d'abord (toujours la dernière version), mémoire si pas de réseau.
  e.respondWith(
    fetch(e.request).then((r) => {
      const copie = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copie));
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
