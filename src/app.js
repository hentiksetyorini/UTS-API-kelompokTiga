
const express = require('express');

const app = express();

// Mengimpor routes
const kategoriRoutes = require('./routes/kategoriRoutes');
const produkRoutes = require('./routes/produkRoutes');

// Membaca JSON dari request
app.use(express.json());

// Endpoint utama untuk mengecek API
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'REST API Toko Online berjalan'
    });
});

// Menghubungkan routes kategori dan produk
app.use('/api/kategori', kategoriRoutes);
app.use('/api/produk', produkRoutes);

// Menangani alamat yang tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route tidak ditemukan'
    });
});

// Menangani kesalahan JSON yang tidak valid
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            status: 'error',
            message: 'Format JSON tidak valid'
        });
    }

    // Menampilkan detail kesalahan hanya di terminal
    console.error(err);

    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan pada server'
    });
});

module.exports = app;
