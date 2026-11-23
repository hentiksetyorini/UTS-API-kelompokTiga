
const pool = require('../config/db');

class ProdukRepository {

    // Mengambil semua produk yang masih aktif
    async findAll() {
        const countResult = await pool.query(
            `SELECT COUNT(*) AS total
             FROM produk
             WHERE deleted_at IS NULL`
        );

        const result = await pool.query(
            `SELECT id, kategori_id, kode_produk, nama_produk,
                    harga, stok, created_at
             FROM produk
             WHERE deleted_at IS NULL
             ORDER BY id ASC`
        );

        return {
            count: Number(countResult.rows[0].total),
            rows: result.rows
        };
    }

    // Mengambil produk berdasarkan ID (hanya produk aktif)
    async findById(id) {
        const result = await pool.query(
            `SELECT id, kategori_id, kode_produk, nama_produk,
                    harga, stok, created_at
             FROM produk
             WHERE id = $1 AND deleted_at IS NULL`,
            [id]
        );

        return result.rows[0] || null;
    }

    // Mengambil produk berdasarkan kategori
    async findByCategory(kategoriId) {
        const result = await pool.query(
            `SELECT id, kategori_id, kode_produk, nama_produk,
                    harga, stok, created_at
             FROM produk
             WHERE kategori_id = $1
             AND deleted_at IS NULL
             ORDER BY id ASC`,
            [kategoriId]
        );

        return result.rows;
    }

    // Menambahkan produk baru
    async create(data) {
        const {
            kategori_id,
            kode_produk,
            nama_produk,
            harga,
            stok
        } = data;

        const result = await pool.query(
            `INSERT INTO produk
             (kategori_id, kode_produk, nama_produk, harga, stok)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, kategori_id, kode_produk, nama_produk,
                       harga, stok, created_at`,
            [kategori_id, kode_produk, nama_produk, harga, stok]
        );

        return result.rows[0];
    }

    // Mengubah seluruh data produk (PUT)
    async update(id, data) {
        const {
            kategori_id,
            kode_produk,
            nama_produk,
            harga,
            stok
        } = data;

        const result = await pool.query(
            `UPDATE produk
             SET kategori_id = $1,
                 kode_produk = $2,
                 nama_produk = $3,
                 harga = $4,
                 stok = $5
             WHERE id = $6 AND deleted_at IS NULL
             RETURNING id, kategori_id, kode_produk, nama_produk,
                       harga, stok, created_at`,
            [kategori_id, kode_produk, nama_produk, harga, stok, id]
        );

        return result.rows[0] || null;
    }

    // Mengubah sebagian data produk (PATCH)
    async patch(id, data) {
        const allowedFields = [
            'kategori_id',
            'kode_produk',
            'nama_produk',
            'harga',
            'stok'
        ];

        const fields = [];
        const values = [];

        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(data, field)) {
                values.push(data[field]);
                fields.push(`${field} = $${values.length}`);
            }
        }

        if (fields.length === 0) {
            return null;
        }

        values.push(id);

        const result = await pool.query(
            `UPDATE produk
             SET ${fields.join(', ')}
             WHERE id = $${values.length}
             AND deleted_at IS NULL
             RETURNING id, kategori_id, kode_produk, nama_produk,
                       harga, stok, created_at`,
            values
        );

        return result.rows[0] || null;
    }

    // Menghapus produk sementara (soft delete)
    async softDelete(id) {
        const result = await pool.query(
            `UPDATE produk
             SET deleted_at = NOW()
             WHERE id = $1
             AND deleted_at IS NULL
             RETURNING id`,
            [id]
        );

        return result.rowCount > 0;
    }

    // Mengembalikan produk yang sudah dihapus (restore)
    async restore(id) {
        const result = await pool.query(
            `UPDATE produk
             SET deleted_at = NULL
             WHERE id = $1
             AND deleted_at IS NOT NULL
             RETURNING id, kategori_id, kode_produk, nama_produk,
                       harga, stok, created_at`,
            [id]
        );

        return result.rows[0] || null;
    }
}

// Membuat satu instance repository
module.exports = new ProdukRepository();
