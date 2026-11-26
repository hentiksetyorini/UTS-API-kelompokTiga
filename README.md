# REST API Toko Online

## 1. Deskripsi Proyek

Proyek ini merupakan REST API sederhana untuk mengelola data kategori dan produk toko online. API dibangun menggunakan Node.js, Express.js, dan PostgreSQL.

Proyek ini dibuat untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman API.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- PostgreSQL
- JavaScript
- Postman
- Visual Studio Code

## 3. Fitur API

### Kategori
- Menampilkan seluruh kategori.
- Menampilkan kategori berdasarkan ID.
- Menambahkan kategori baru.
- Menghapus kategori secara permanen.
- Menampilkan produk berdasarkan kategori.

### Produk
- Menampilkan seluruh produk aktif.
- Menampilkan produk berdasarkan ID.
- Menambahkan produk baru.
- Mengubah seluruh data produk menggunakan PUT.
- Mengubah sebagian data produk menggunakan PATCH.
- Menghapus produk secara sementara (soft delete).
- Memulihkan produk yang sudah dihapus sementara (restore).

## 4. Struktur Folder

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

## 5. Rancangan Database

Database yang digunakan bernama `db_uts`, dengan dua tabel utama, yaitu `kategori` dan `produk`.

### A. Tabel kategori

Tabel kategori digunakan untuk menyimpan data kategori produk.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | SERIAL | Primary Key |
| nama_kategori | VARCHAR | Nama kategori |
| deskripsi | TEXT | Deskripsi kategori |
| created_at | TIMESTAMP | Waktu data dibuat |

### B. Tabel produk

Tabel produk digunakan untuk menyimpan data produk toko online.

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | SERIAL | Primary Key |
| kategori_id | INTEGER | Foreign Key ke tabel kategori |
| kode_produk | VARCHAR | Kode unik produk |
| nama_produk | VARCHAR | Nama produk |
| harga | NUMERIC | Harga produk |
| stok | INTEGER | Jumlah stok |
| created_at | TIMESTAMP | Waktu data dibuat |
| deleted_at | TIMESTAMP | Waktu produk dihapus sementara |

### C. Relasi Antar Tabel

Relasi antara tabel `kategori` dan `produk` adalah **One-to-Many (1:N)**.

Artinya:
- Satu kategori dapat memiliki banyak produk.
- Satu produk hanya memiliki satu kategori.
- Kolom `kategori_id` pada tabel produk menjadi Foreign Key yang mengacu pada kolom `id` pada tabel kategori.

Ilustrasi relasi:

```text
KATEGORI
--------
id (PK)
nama_kategori
deskripsi
    |
    | 1
    |
    | N
PRODUK
------
id (PK)
kategori_id (FK)
kode_produk
nama_produk
harga
stok
deleted_at
```

Foreign Key digunakan untuk menjaga hubungan data agar produk tidak mengacu pada kategori yang tidak tersedia.

## 6. Persiapan Database

1. Pastikan PostgreSQL sudah terpasang.
2. Buat database dengan nama `db_uts`.
3. Jalankan file `sql/schema.sql` untuk membuat tabel.
4. Jalankan file `sql/seed.sql` untuk memasukkan data awal.

## 7. Konfigurasi Environment

Buat file `.env` di folder utama proyek.

Contoh konfigurasi:

```env
PORT=[port running di server node.js]
DB_HOST=localhost [karena project running di local]
DB_PORT=[port db postgres]
DB_NAME=[nama database]
DB_USER=[user database]
DB_PASSWORD=[password db postgres]
```

Sesuaikan nilai konfigurasi dengan PostgreSQL yang digunakan. Ganti `password_postgresql` dengan password PostgreSQL milik sendiri.

File `.env` tidak boleh diunggah ke GitHub karena berisi informasi konfigurasi dan password database.

## 8. Instalasi dan Menjalankan API

Buka terminal pada folder proyek, kemudian jalankan perintah berikut:

### Instalasi dependency

```bash
npm install
```

### Menjalankan server dalam mode pengembangan

```bash
npm run dev
```

Jika server berhasil berjalan, API dapat diakses melalui:

```text
http://localhost:3000
```

Alamat tersebut menggunakan port 3000 sesuai konfigurasi contoh. Jika port di `.env` berbeda, gunakan port yang sudah dikonfigurasi.

## 9. Daftar Endpoint API

### A. Endpoint Kategori

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/kategori` | Menampilkan semua kategori |
| GET | `/api/kategori/:id` | Menampilkan detail kategori |
| GET | `/api/kategori/:id/produk` | Menampilkan produk berdasarkan kategori |
| POST | `/api/kategori` | Menambahkan kategori |
| DELETE | `/api/kategori/:id` | Menghapus kategori secara permanen |

#### Contoh Body POST Kategori

```json
{
  "nama_kategori": "Elektronik",
  "deskripsi": "Perangkat elektronik dan gadget"
}
```

### B. Endpoint Produk

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/produk` | Menampilkan produk aktif |
| GET | `/api/produk/:id` | Menampilkan detail produk |
| POST | `/api/produk` | Menambahkan produk |
| PUT | `/api/produk/:id` | Mengubah seluruh data produk |
| PATCH | `/api/produk/:id` | Mengubah sebagian data produk |
| DELETE | `/api/produk/:id` | Menghapus produk sementara |
| PATCH | `/api/produk/:id/restore` | Memulihkan produk |

#### Contoh Body POST Produk

```json
{
  "kategori_id": 1,
  "kode_produk": "PRD-UTS-002",
  "nama_produk": "Rak Serbaguna",
  "harga": 125000,
  "stok": 15
}
```

#### Contoh Body PUT Produk

PUT digunakan untuk mengubah seluruh data produk yang dapat diperbarui.

```json
{
  "kode_produk": "PRD-UTS-006",
  "nama_produk": "Rak Serbaguna Besar",
  "harga": 150000,
  "stok": 20
}
```

#### Contoh Body PATCH Produk

PATCH digunakan untuk mengubah sebagian data saja. Contohnya mengubah stok produk:

```json
{
  "stok": 30
}
```

#### Contoh Endpoint Restore

```text
PATCH /api/produk/:id/restore
```

Endpoint restore digunakan untuk mengembalikan produk yang sebelumnya dihapus sementara. Tidak memerlukan body jika implementasinya memang tidak meminta data tambahan.

## 10. Keputusan Desain API

### A. Alasan Memilih PUT dan PATCH

PUT dan PATCH digunakan karena keduanya mempunyai fungsi pembaruan data yang berbeda.

**PUT (Full Update)**

PUT digunakan ketika ingin mengubah seluruh data produk yang dapat diperbarui. Dengan PUT, client mengirimkan seluruh field yang diperlukan untuk pembaruan.

Contohnya mengubah kode produk, nama produk, harga, dan stok sekaligus.

**PATCH (Partial Update)**

PATCH digunakan ketika hanya ingin mengubah sebagian data tanpa harus mengirimkan seluruh data produk.

Contohnya hanya mengubah stok produk dari 20 menjadi 30.

Pemisahan ini membuat proses pembaruan data lebih jelas dan sesuai dengan fungsi masing-masing metode HTTP.

### B. Perilaku Soft Delete terhadap UNIQUE dan Foreign Key

Penghapusan produk menggunakan metode soft delete, yaitu dengan mengisi kolom `deleted_at` menggunakan waktu penghapusan.

Data produk tidak benar-benar dihapus dari tabel database.

**Pengaruh terhadap UNIQUE**

Karena data produk masih tersimpan, nilai pada kolom yang memiliki constraint UNIQUE, seperti `kode_produk`, tetap dianggap digunakan oleh PostgreSQL.

Artinya, kode produk dari data yang sudah di-soft delete tidak otomatis dapat digunakan kembali oleh produk baru.

Hal ini mencegah terjadinya penggunaan kode yang sama selama data lama masih tersimpan.

**Pengaruh terhadap Foreign Key**

Soft delete tidak menghapus baris produk dari database. Oleh karena itu, relasi Foreign Key antara tabel `produk` dan `kategori` tetap terjaga.

Nilai `kategori_id` tetap tersimpan dan tidak terputus hanya karena produk dihapus sementara.

### C. Alasan Hard Delete pada Tabel Induk Kategori

Tabel kategori merupakan tabel induk yang berhubungan dengan tabel produk melalui Foreign Key.

Penghapusan kategori dilakukan menggunakan hard delete, yaitu menghapus data kategori secara permanen.

Namun, kategori yang masih digunakan oleh produk tidak boleh dihapus.

Jika kategori masih memiliki produk yang mengacu kepadanya, API menolak penghapusan dan memberikan respons `409 Conflict`.

Keputusan ini digunakan untuk menjaga integritas relasi database agar data produk tidak kehilangan kategori yang menjadi acuannya.

Kategori sementara yang tidak digunakan oleh produk dapat dihapus secara permanen.

## 11. Pengujian API

Pengujian API dilakukan menggunakan Postman dengan tiga kelompok Collection:

1. **Folder 1 – Alur Utama:** menguji proses utama API, seperti GET, POST, PUT, PATCH, DELETE, soft delete, dan restore.
2. **Folder 2 – Skenario Error:** menguji kondisi kesalahan, seperti data tidak valid, data duplikat, ID tidak ditemukan, dan format JSON yang salah.
3. **Folder 3 – Bukti Delete:** menguji dan membuktikan kondisi data sebelum dan sesudah proses penghapusan.

Pengujian dilakukan untuk memastikan setiap endpoint memberikan respons yang sesuai dengan kondisi permintaan.

## 12. Penanganan Error

API menggunakan kode status HTTP untuk menunjukkan hasil permintaan.

| Status | Keterangan |
|---|---|
| 200 OK | Permintaan berhasil |
| 201 Created | Data berhasil dibuat |
| 204 No Content | Penghapusan berhasil tanpa isi respons |
| 400 Bad Request | Data atau format permintaan tidak valid |
| 404 Not Found | Data atau endpoint tidak ditemukan |
| 409 Conflict | Terjadi konflik data |
| 422 Unprocessable Entity | Data merujuk pada kategori yang tidak tersedia |
| 500 Internal Server Error | Terjadi kesalahan pada server |

## 13. Pengelolaan Repository

SQL untuk operasi database ditempatkan pada bagian repository.

Pembagian tugas setiap bagian adalah:

- **Routes:** mengatur alamat endpoint API.
- **Controllers:** mengatur proses request dan response.
- **Repositories:** menjalankan query SQL untuk berinteraksi dengan database.
- **Middlewares:** menangani validasi dan pemeriksaan request.
- **Config:** mengatur koneksi database PostgreSQL.

Koneksi database menggunakan PostgreSQL Pool agar koneksi dapat dikelola secara efisien.

---

**Proyek UTS Pemrograman API — REST API Toko Online**
