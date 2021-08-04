const pagesToCache = ["index.html", "offline.html"];
const cache__name = "v2";

//install sw
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cache__name).then((cache) => {
      console.log("Opened Cached");
      return cache.addAll(pagesToCache);
    })
  );
});
//request

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((_) => {
      return fetch(event.request).catch((er) => caches.match("offline.html"));
    })
  );
});
//activate

self.addEventListener("activate", (event) => {
  const cacheList = [];
  cacheList.push(cache__name);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
