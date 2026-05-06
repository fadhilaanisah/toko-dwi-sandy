# Struktur File Toko Dwi Sandy

Halaman telah dipisah sesuai dengan fungsinya. Berikut adalah struktur file yang baru:

## File HTML (Halaman)

- **index.html** - Halaman Beranda (Home)
  - Hero section dengan promosi
  - Kategori produk
  - Daftar produk
  - Informasi toko

- **keranjang.html** - Halaman Keranjang Belanja
  - Daftar item di keranjang
  - Ringkasan pesanan
  - Pilihan metode pembayaran (Cash / QRIS)
  - Tombol checkout

- **checkout.html** - Halaman Checkout
  - Ringkasan pesanan akhir
  - Detail pembayaran
  - Status pengiriman pesanan
  - Tombol konfirmasi pembayaran

- **pesanan.html** - Halaman Pesanan Saya
  - Daftar semua pesanan
  - Status pesanan real-time
  - Detail pembayaran tiap pesanan

- **admin.html** - Dashboard Admin
  - Dashboard dengan statistik
  - Kelola produk (CRUD)
  - Tambah produk baru

## File Static

- **styles.css** - File CSS untuk semua halaman
  - Semua styling (dark mode, responsive, animasi, dll)
  - Dapat diakses oleh semua halaman

- **script.js** - File JavaScript untuk semua halaman
  - Semua fungsi shared (data, auth, cart, checkout, dll)
  - Dapat diakses oleh semua halaman

## Navigasi Antar Halaman

Navigasi dilakukan menggunakan:
- `window.location.href` untuk pindah halaman
- `navigateTo()` function untuk navigasi yang aman
- Navigation bar dan sidebar untuk navigasi utama

## Catatan Penting

1. **LocalStorage**: Data disimpan di localStorage sehingga konsisten antar halaman
2. **Session Data**: Pembayaran method disimpan di sessionStorage untuk saat checkout
3. **Admin Login**: 
   - Email: `fadhilaanisah@gmail.com`
   - Password: `dhila2006`

## Cara Menggunakan

1. Buka `index.html` sebagai halaman utama
2. Navigasi menggunakan menu bar atau sidebar
3. Semua file CSS dan JS otomatis ter-load di setiap halaman

---

File lama `halaman.html` sudah tidak digunakan lagi dan dapat dihapus.
