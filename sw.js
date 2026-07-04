const CACHE_NAME = 'infinity-care-v20-1-daily-hub-20260704';
const ASSETS = [
  './', './index.html', './styles.css', './app.js', './manifest.webmanifest',
  './assets/icon-192.svg', './assets/icon-512.svg', './assets/app-icon-192.png', './assets/app-icon-512.png', './assets/apple-touch-icon.png', './assets/favicon-32.png',
  './assets/characters/haruka.png', './assets/characters/akane.png', './assets/characters/masumi.png', './assets/characters/hin.png',
  './assets/backgrounds/01-sharehouse-living.jpg', './assets/backgrounds/02-haruka-room.jpg', './assets/backgrounds/03-akane-room.jpg', './assets/backgrounds/04-masumi-room.jpg', './assets/backgrounds/05-hin-room.jpg', './assets/backgrounds/06-minaho-room.jpg', './assets/backgrounds/07-wish-pillar.jpg', './assets/backgrounds/08-sougetsukan-lobby.jpg', './assets/backgrounds/09-hien-shrine.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
    return response;
  }).catch(() => caches.match('./index.html'))));
});
