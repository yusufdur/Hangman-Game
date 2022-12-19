const cacheName = 'words-v1'
const staticAssets = [
    "./index.html",
    "./src/style.css",
    "./src/script.js",
    "./assets/images/logo.png",
    "./assets/words/animals.txt",
    "./assets/words/fruits.txt",
    "./assets/words/countries.txt",
    "./assets/words/animals2.txt",
]

// "/Hangman_Game/index.html",
// "/Hangman_Game/src/style.css",
// "/Hangman_Game/src/script.js",
// "/Hangman_Game/assets/images/logo.png",
// "/Hangman_Game/assets/words/animals.txt",
// "/Hangman_Game/assets/words/fruits.txt",
// "/Hangman_Game/assets/words/countries.txt",
// "/Hangman_Game/assets/words/animals2.txt",

self.addEventListener("install", async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
})

self.addEventListener("activate", e => {
    self.clients.claim();
})

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

