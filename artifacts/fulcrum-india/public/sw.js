// Basic Service Worker for PWA installability
const CACHE_NAME = 'fulcrum-india-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through fetch (no offline caching for now, just enough for installability)
  event.respondWith(fetch(event.request).catch(() => new Response("Network error occurred")));
});
