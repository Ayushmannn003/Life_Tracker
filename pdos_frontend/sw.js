// The name of your cache. Change the version number if you make massive updates!
const CACHE_NAME = 'system-os-cache-v1';

// The critical files your phone needs to save locally to work offline
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/analyzer.html',
    '/academics.html',
    '/health.html',
    '/todo.html',
    '/manifest.json',
    '/js/sidebar.js',
    '/js/api.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// STEP 1: Install the Service Worker & save the files to the phone's memory
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// STEP 2: Intercept network requests (The "Offline" Magic)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return the cached file if we have it
            if (cachedResponse) {
                return cachedResponse;
            }
            // Otherwise, fetch it from the internet
            return fetch(event.request);
        })
    );
});

// STEP 3: Clean up old caches when you update your app
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});