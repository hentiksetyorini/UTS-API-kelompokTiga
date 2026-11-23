
INSERT INTO kategori (nama_kategori, deskripsi)
VALUES
('Elektronik', 'Produk elektronik'),
('Pakaian', 'Produk pakaian pria dan wanita'),
('Makanan', 'Produk makanan dan minuman');

INSERT INTO produk
(kategori_id, kode_produk, nama_produk, harga, stok)
VALUES
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Elektronik'),
    'ELK001', 'Mouse Wireless', 75000, 20
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Elektronik'),
    'ELK002', 'Keyboard Mechanical', 250000, 15
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Pakaian'),
    'PKN001', 'Kaos Polos', 50000, 30
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Pakaian'),
    'PKN002', 'Jaket Hoodie', 150000, 10
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Makanan'),
    'MKN001', 'Keripik Singkong', 20000, 50
);
