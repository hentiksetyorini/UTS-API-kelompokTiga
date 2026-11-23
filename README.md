# REST API Toko Online

## Deskripsi Proyek

Proyek ini merupakan REST API sederhana untuk mengelola data kategori dan produk toko online. API dibangun menggunakan Node.js, Express.js, dan PostgreSQL.

Proyek ini dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman API.

## Teknologi yang Digunakan

- Node.js
- Express.js
- PostgreSQL
- JavaScript
- Postman
- Visual Studio Code

## Fitur API

### 1. Kategori

- Menampilkan seluruh kategori.
- Menampilkan kategori berdasarkan ID.
- Menambahkan kategori baru.
- Menghapus kategori secara permanen.
- Menampilkan produk berdasarkan kategori.

### 2. Produk

- Menampilkan seluruh produk aktif.
- Menampilkan produk berdasarkan ID.
- Menampilkan produk berdasarkan kategori.
- Menambahkan produk baru.
- Mengubah seluruh data produk menggunakan PUT.
- Mengubah sebagian data produk menggunakan PATCH.
- Menghapus produk secara sementara (soft delete).
- Memulihkan produk yang sudah dihapus sementara (restore).

## Struktur Folder

```text
api-uts/
├── sql/
│   ├── schema.sql
│   └── seed.sql
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Persiapan Database

1. Pastikan PostgreSQL sudah terpasang.
2. Buat database dengan nama `db_uts`.
3. Jalankan file `sql/schema.sql` untuk membuat tabel.
4. Jalankan file `sql/seed.sql` untuk memasukkan data awal.

## Konfigurasi Environment

Buat file `.env` di folder utama proyek.

Contoh konfigurasi:

```env.example
PORT=[port running di server node.js]
DB_HOST=localhost [karena project running di local]
DB_PORT=[port db postgres]
DB_NAME=[nama database]
DB_USER=[user database]
DB_PASSWORD=[password db postgres]
```

Sesuaikan konfigurasi dengan PostgreSQL yang digunakan.

## Instalasi dan Menjalankan API

Buka terminal pada folder proyek, kemudian jalankan:

```bash
npm install
```

Untuk menjalankan server dalam mode pengembangan:

```bash
npm run dev
```

API berjalan pada alamat:

```text
http://localhost:3000
```

## Daftar Endpoint

### Kategori

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/kategori` | Menampilkan semua kategori |
| GET | `/api/kategori/:id` | Detail kategori |
| GET | `/api/kategori/:id/produk` | Produk berdasarkan kategori |
| POST | `/api/kategori` | Menambahkan kategori |
| DELETE | `/api/kategori/:id` | Menghapus kategori |

### Produk

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/produk` | Menampilkan produk aktif |
| GET | `/api/produk/:id` | Detail produk |
| POST | `/api/produk` | Menambahkan produk |
| PUT | `/api/produk/:id` | Mengubah seluruh data |
| PATCH | `/api/produk/:id` | Mengubah sebagian data |
| DELETE | `/api/produk/:id` | Menghapus sementara |
| PATCH | `/api/produk/:id/restore` | Memulihkan produk |

## Pengujian API

Pengujian dilakukan menggunakan Postman dengan dua kelompok skenario:

1. Alur utama (S01–S15).
2. Skenario error (N01–N14).

Pengujian mencakup metode GET, POST, PUT, PATCH, dan DELETE, validasi data, ID tidak ditemukan, kode duplikat, soft delete, restore, serta format JSON tidak valid.

## Penanganan Error

API menggunakan kode status HTTP untuk menunjukkan hasil permintaan, antara lain:

- `200 OK`: Permintaan berhasil.
- `201 Created`: Data berhasil dibuat.
- `204 No Content`: Penghapusan berhasil tanpa isi respons.
- `400 Bad Request`: Data atau format permintaan tidak valid.
- `404 Not Found`: Data atau endpoint tidak ditemukan.
- `409 Conflict`: Terjadi konflik data.
- `422 Unprocessable Entity`: Data merujuk pada kategori yang tidak tersedia.
- `500 Internal Server Error`: Terjadi kesalahan pada server.

## Konsep Soft Delete

Penghapusan produk dilakukan menggunakan soft delete dengan mengisi kolom `deleted_at` menggunakan waktu penghapusan.

Produk yang sudah dihapus sementara tidak ditampilkan dalam daftar produk aktif. Produk dapat dipulihkan melalui endpoint restore dengan mengubah nilai `deleted_at` menjadi `NULL`.

## Pengelolaan Repository

SQL untuk operasi database ditempatkan pada bagian repository. Controller bertugas mengatur proses request dan response, sedangkan routes mengatur alamat endpoint API.

Koneksi database menggunakan PostgreSQL Pool agar koneksi dapat dikelola secara efisien.

---

**Proyek UTS Pemrograman API — REST API Toko Online**