const cacheName = 'words-v1'
const staticAssets = [
    "./index.html",
    "./src/style.css",
    "./src/script.js",
    "./assets/images/logo.jpg",
    "./assets/words/animals.txt",
    "./assets/words/fruits.txt",
    "./assets/words/countries.txt",
    "./assets/words/animals2.txt",
]

self.addEventListener("install", async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
})

self.addEventListener("activate", e => {
    self.clients.claim();
})

// function isHtmlRequest(request) {
//     return request.headers.get('Accept').indexOf('text/html') !== -1;
// }


// function isBlacklisted(url) {
//     return urlBlacklist.filter(bl => url.indexOf(bl) == 0).length > 0;
// }


// function isCachableResponse(response) {
//     return response && response.ok;
// }

// self.addEventListener('fetch', event => {
//     let request = event.request;

//     if (request.method !== 'GET') {

//         if (!navigator.onLine && isHtmlRequest(request)) {
//             return event.respondWith(caches.match(request));
//         }
//         return;
//     }

//     if (isHtmlRequest(request)) {

//         event.respondWith(
//             fetch(request)
//                 .then(response => {
//                     if (isCachableResponse(response) && !isBlacklisted(response.url)) {
//                         let copy = response.clone();
//                         caches.open(cacheName).then(cache => cache.put(request, copy));
//                     }
//                     return response;
//                 })
//                 .catch(() => {
//                     return caches.match(request)
//                         .then(response => {
//                             if (!response && request.mode == 'navigate') {
//                                 return caches.match(request);
//                             }
//                             return response;
//                         });
//                 })
//         );
//     } else {
//         if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin')
//             return
//         event.respondWith(
//             caches.match(request)
//                 .then(response => {
//                     return response || fetch(request)
//                         .then(response => {
//                             if (isCachableResponse(response)) {
//                                 let copy = response.clone();
//                                 caches.open(cacheName).then(cache => cache.put(request, copy));
//                             }
//                             return response;
//                         })
//                 })
//         );
//     }
// });


self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);
    if (url.origin = location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});


async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}
async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}

