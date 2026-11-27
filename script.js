// === KERANJANG BELANJA ===
let keranjang = [];

// Ambil elemen DOM
const isiKeranjang = document.getElementById('isi-keranjang');
const jumlahKeranjang = document.getElementById('jumlah-keranjang');
const totalBelanja = document.getElementById('total');
const daftarTombolTambah = document.querySelectorAll('[data-id]');

// Muat keranjang dari localStorage saat halaman dibuka
muatKeranjang();

// Tambah produk ke keranjang
daftarTombolTambah.forEach(tombol => {
  tombol.addEventListener('click', () => {
    const id = tombol.dataset.id;
    const nama = tombol.dataset.nama;
    const harga = parseInt(tombol.dataset.harga);
    
    tambahKeKeranjang({ id, nama, harga });
    
    // Animasi sedikit saat diklik
    tombol.style.transform = 'scale(0.95)';
    setTimeout(() => tombol.style.transform = '', 150);
    
    // Scroll ke keranjang
    document.querySelector('#keranjang').scrollIntoView({ behavior: 'smooth' });
  });
});

function tambahKeKeranjang(produk) {
  const indeks = keranjang.findIndex(item => item.id === produk.id);
  
  if (indeks !== -1) {
    // Sudah ada, tambah jumlahnya
    keranjang[indeks].jumlah += 1;
  } else {
    // Produk baru
    keranjang.push({ ...produk, jumlah: 1 });
  }
  
  simpanKeranjang();
  renderKeranjang();
}

function ubahJumlah(id, operasi) {
  const indeks = keranjang.findIndex(item => item.id === id);
  
  if (indeks !== -1) {
    keranjang[indeks].jumlah += operasi;
    
    if (keranjang[indeks].jumlah <= 0) {
      keranjang.splice(indeks, 1);
    }
    
    simpanKeranjang();
    renderKeranjang();
  }
}

function hapusDariKeranjang(id) {
  keranjang = keranjang.filter(item => item.id !== id);
  simpanKeranjang();
  renderKeranjang();
}

function renderKeranjang() {
  // Update jumlah badge
  const totalItem = keranjang.reduce((sum, item) => sum + item.jumlah, 0);
  jumlahKeranjang.textContent = totalItem;
  
  // Update tabel
  if (keranjang.length === 0) {
    isiKeranjang.innerHTML = `
      <tr class="empty-cart">
        <td colspan="5">
          <div class="empty-state">
            <span class="empty-emoji">🛒✨</span>
            <p>Keranjangmu masih kosong, yuk pilih camilan favoritmu!</p>
          </div>
        </td>
      </tr>
    `;
    totalBelanja.textContent = 'Rp 0';
    return;
  }
  
  // Tampilkan daftar item
  isiKeranjang.innerHTML = keranjang.map(item => `
    <tr>
      <td><strong>${item.nama}</strong></td>
      <td>Rp ${item.harga.toLocaleString('id-ID')}</td>
      <td>
        <div class="quantity-control">
          <button class="qty-btn" onclick="ubahJumlah('${item.id}', -1)">−</button>
          <span class="qty-value">${item.jumlah}</span>
          <button class="qty-btn" onclick="ubahJumlah('${item.id}', 1)">+</button>
        </div>
      </td>
      <td><strong>Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}</strong></td>
      <td>
        <button class="remove-btn" onclick="hapusDariKeranjang('${item.id}')">🗑️ Hapus</button>
      </td>
    </tr>
  `).join('');
  
  // Hitung total
  const total = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
  totalBelanja.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function simpanKeranjang() {
  localStorage.setItem('ruangkunyah_keranjang', JSON.stringify(keranjang));
}

function muatKeranjang() {
  const tersimpan = localStorage.getItem('ruangkunyah_keranjang');
  if (tersimpan) {
    keranjang = JSON.parse(tersimpan);
  }
  renderKeranjang();
}

// === FORM KONTAK ===
const formKontak = document.getElementById('form-kontak');
const infoForm = document.getElementById('info-form');

formKontak.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();
  
  if (!nama || !email || !pesan) {
    infoForm.textContent = '⚠️ Mohon lengkapi semua kolom ya!';
    infoForm.className = 'info';
    return;
  }
  
  // Simulasi kirim sukses
  infoForm.textContent = '✅ Terima kasih! Pesanmu sudah terkirim~ Semoga harimu menyenangkan! 💛';
  infoForm.className = 'info sukses';
  
  // Reset form
  formKontak.reset();
  
  // Hilangkan pesan setelah 5 detik
  setTimeout(() => {
    infoForm.textContent = '';
    infoForm.className = 'info';
  }, 5000);
});