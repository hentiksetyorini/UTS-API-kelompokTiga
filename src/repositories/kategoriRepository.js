
const pool = require('../config/db');

class KategoriRepository {

    // Mengambil semua kategori
    async findAll() {
        const result = await pool.query(
            `SELECT id, nama_kategori, deskripsi, created_at
             FROM kategori
             ORDER BY id ASC`
        );

        return result.rows;
    }

    // Mengambil kategori berdasarkan ID
    async findById(id) {
        const result = await pool.query(
            `SELECT id, nama_kategori, deskripsi, created_at
             FROM kategori
             WHERE id = $1`,
            [id]
        );

        return result.rows[0] || null;
    }

    // Menambahkan kategori baru
    async create(data) {
        const { nama_kategori, deskripsi } = data;

        const result = await pool.query(
            `INSERT INTO kategori (nama_kategori, deskripsi)
             VALUES ($1, $2)
             RETURNING id, nama_kategori, deskripsi, created_at`,
            [nama_kategori, deskripsi || null]
        );

        return result.rows[0];
    }

    // Menghapus kategori secara permanen
    async delete(id) {
        const result = await pool.query(
            `DELETE FROM kategori
             WHERE id = $1
             RETURNING id`,
            [id]
        );

        return result.rowCount > 0;
    }
}

// Membuat satu instance repository
module.exports = new KategoriRepository();
