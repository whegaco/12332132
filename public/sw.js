// HSE Service Worker for Offline Support
const CACHE_NAME = 'hse-v2';
const RUNTIME_CACHE = 'hse-runtime-v2';

// Cache static assets
const CACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo.svg',
  // Add other static assets as needed
];

// Cache API responses pattern
const API_CACHE_PATTERN = /\/api\//;

self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching app shell');
      return cache.addAll(CACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Network-first strategy for API requests, Cache-first for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // API requests - Network first, then cache
  if (API_CACHE_PATTERN.test(url.pathname)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful GET API responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request).then((cached) => {
            if (cached) {
              console.log('[SW] Serving API from cache:', url.pathname);
              return cached;
            }
            // Return offline response for API
            return new Response(
              JSON.stringify({
                error: 'offline',
                message: 'لا يوجد اتصال بالإنترنت. البيانات قد تكون قديمة.',
                cached: false,
              }),
              {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
              }
            );
          });
        })
    );
    return;
  }

  // Static assets - Cache first, then network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        console.log('[SW] Serving from cache:', url.pathname);
        return cached;
      }
      return fetch(event.request).then((response) => {
        // Cache successful GET requests
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    })
  );
});

self.addEventListener('message', (event) => {
  console.log('[SW] Received message:', event.data);
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      })
    );
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

async function syncOfflineForms() {
  // Get all offline forms from IndexedDB and try to submit them
  // This would be implemented with IndexedDB in the app
  console.log('[SW] Syncing offline forms...');
}
