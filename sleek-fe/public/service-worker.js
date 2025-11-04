self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sleekroad-cache').then((cache) => {
      return Promise.all([
        cache.add('/').catch((error) => console.error('Failed to cache /:', error)),
        cache.add('/manifest.json').catch((error) => console.error('Failed to cache /manifest.json:', error)),
        cache.add('/logo.png').catch((error) => console.error('Failed to cache /logo.png:', error))
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});