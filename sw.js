/* ==========================================================================
   AuraID Studio Pro v4.0 — Network-First Dev & Offline AI Service Worker
   ========================================================================== */

const CACHE_VERSION = 'auraid-pro-v4.0.0';
const APP_SHELL_CACHE = `${CACHE_VERSION}-shell`;
const CDN_ASSET_CACHE = `${CACHE_VERSION}-cdn`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== APP_SHELL_CACHE && key !== CDN_ASSET_CACHE) {
            return caches.delete(key);
          }
          return null;
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isCdnAsset =
    url.hostname.includes('cdn.jsdelivr.net') ||
    url.hostname.includes('staticimgly.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com');

  // Cache-First for heavy ONNX / MediaPipe AI models and fonts
  if (isCdnAsset) {
    event.respondWith(
      caches.open(CDN_ASSET_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          return cached || new Response('Offline CDN asset unavailable', { status: 503 });
        }
      })
    );
    return;
  }

  // Network-First for local HTML/CSS/JS so updates on 127.0.0.1:5500 never get stuck!
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(APP_SHELL_CACHE).then(async (cache) => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          const cached = await cache.match(request);
          return cached || new Response('Offline', { status: 503 });
        }
      })
    );
  }
});