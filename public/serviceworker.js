const CACHE_NAME = "recipify-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "src/assets/header-image.png",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
  "/manifest.json",
  "/src/main.tsx",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
