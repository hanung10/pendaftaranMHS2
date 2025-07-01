const API_KEY = "b01d52bf12334a1f37a46c79cb702e9a";

function tampilkanBerita() {
  const beritaContainer = document.getElementById("beritaContainer");
  if (!beritaContainer) return;

  fetch(`https://gnews.io/api/v4/search?q=teknologi&lang=id&country=id&max=5&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      data.articles.forEach(berita => {
        const card = document.createElement("div");
        card.className = "card mb-3 shadow-sm";
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
        beritaContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Gagal mengambil berita:", error);
    });
}

document.addEventListener("DOMContentLoaded", tampilkanBerita);
