// Service worker de l'appli : installation sur l'écran d'accueil + notifications (OneSignal).
try {
  importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');   // reçoit et affiche les notifications
} catch (e) { /* hors ligne au premier lancement : l'appli marche, les notifications viendront ensuite */ }

// La page est gardée en mémoire pour un démarrage rapide ; les données du serveur jamais.
const CACHE = 'festivites-v2';
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
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   // serveur Google et OneSignal : jamais en cache
  e.respondWith(
    fetch(e.request).then((r) => {
      const copie = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copie));
      return r;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
