// Untuk tahap instalasi service worker
self.addEventListener("install", async event => {
  // Membuka (atau membuat) cache bernama "pwa-assets"
  const cache = await caches.open("pwa-assets");

  // Menyimpan seluruh aset
  cache.addAll([
    "index.html",        // Halaman utama
    "pendaftaran.html",  // Halaman pendaftaran
    "berita-api.js",    // File API
    "app.js",            // File JavaScript
    "manifest.json",      // File manifest
    "style.css",         // File CSS 
    "img/kampus.png"     // Gambar logo
  ]); 
});
 
// Untuk menangani semua permintaan jaringan (fetch)
self.addEventListener("fetch", event => {
  event.respondWith(
    // Mencocokkan permintaan dengan aset yang sudah disimpan
    caches.match(event.request).then(cachedResponse => {
      // Jika ditemukan di cache, maka ambil dari cache
      // Jika tidak ditemukan, ambil dari jaringan (fetch online)
      return cachedResponse || fetch(event.request);
    })
  )
});