// Memanggil fungsi registerSW
registerSW(); 

// Fungsi async untuk mendaftarkan Service Worker
async function registerSW() {
  // Mengecek apakah browser mendukung fitur Service Worker
  if ('serviceWorker' in navigator) {
    try {
      // Mendaftarkan file "sw.js" sebagai Service Worker
      const registration = await navigator.serviceWorker.register("sw.js");       
    } catch (error) {
      // Menangkap dan menampilkan error
      showResult("Error while registering: " + error.message);
    }    
  } else {
    // Menampilkan pesan jika Service Worker tidak didukung
    showResult("Service workers API not available");
  }
}

// Fungsi untuk menampilkan pesan
function showResult(text) {
  document.querySelector("output").innerHTML = text;
}
// IndexedDB setup
let db;
const request = indexedDB.open("dbPendaftaran", 1);

request.onerror = e => console.error("DB Error:", e);
request.onsuccess = e => { db = e.target.result; };

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("pendaftar", { keyPath: "email" });
};

// Tangani submit form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPendaftaran");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = {
        nama: document.getElementById("nama").value,
        email: document.getElementById("email").value,
        telepon: document.getElementById("telepon").value,
        prodi: document.getElementById("prodi").value
      };
      const tx = db.transaction("pendaftar", "readwrite");
      tx.objectStore("pendaftar").add(data);
      tx.oncomplete = () => {
        alert("Pendaftaran berhasil disimpan offline.");
        form.reset();
      };
    });
  }
});

// Tampilkan data
function tampilkanPendaftar() {
  const tbody = document.getElementById("tabelPendaftar");
  if (!db) {
    const req = indexedDB.open("dbPendaftaran", 1);
    req.onsuccess = () => {
      db = req.result;
      tampilkanPendaftar();
    };
    return;
  }
  const tx = db.transaction("pendaftar", "readonly");
  const store = tx.objectStore("pendaftar");
  const reqCursor = store.openCursor();
  reqCursor.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      const { nama, email, telepon, prodi } = cursor.value;
      const row = `<tr><td>${nama}</td><td>${email}</td><td>${telepon}</td><td>${prodi}</td></tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
      cursor.continue();
    }
  };
}