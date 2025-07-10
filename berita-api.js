// Menyimpan API key dari layanan GNews
const API_KEY = "b01d52bf12334a1f37a46c79cb702e9a";

// Menampilkan berita 
function tampilkanBerita() {
  // Mengambil elemen container tempat berita
  const beritaContainer = document.getElementById("beritaContainer");

  // Jika elemen tidak ditemukan, fungsi dihentikan
  if (!beritaContainer) return;

  // Melakukan permintaan fetch ke API GNews
  fetch(`https://gnews.io/api/v4/search?q=teknologi&lang=id&country=id&max=5&apikey=${API_KEY}`)
    .then(response => response.json()) // Mengubah respon menjadi format JSON
    .then(data => {
      // Melakukan iterasi pada berita yang diperoleh dari API
      data.articles.forEach(berita => {
        // Membuat elemen div baru untuk setiap berita
        const card = document.createElement("div");
        card.className = "card mb-3 shadow-sm"; // Memberikan class Bootstrap

        // Mengatur isi HTML dari elemen card dengan struktur layout berita
        card.innerHTML = `
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${berita.image}" class="img-fluid rounded-start object-fit-cover" style="height: 100%; max-height: 180px;" alt="${berita.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title"><a href="${berita.url}" target="_blank" class="text-decoration-none">${berita.title}</a></h5>
                <p class="card-text">${berita.description || ''}</p>
                <p class="card-text">
                  <small class="text-muted">${berita.source.name} • ${new Date(berita.publishedAt).toLocaleDateString("id-ID")}</small>
                </p>
              </div>
            </div>
          </div>
        `;

        // Menambahkan card berita ke dalam container
        beritaContainer.appendChild(card);
      });
    })
    .catch(error => {
      // Jika terjadi error saat mengambil data dari API
      console.error("Gagal mengambil berita:", error);
    });
}

// Menjalankan fungsi tampilkanBerita setelah seluruh dokumen HTML dimuat
document.addEventListener("DOMContentLoaded", tampilkanBerita);
