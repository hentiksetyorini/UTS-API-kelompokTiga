
const kategoriRepository = require('../repositories/kategoriRepository');

class KategoriController {

    // GET /api/kategori
    async getAll(req, res, next) {
        try {
            const data = await kategoriRepository.findAll();

            return res.status(200).json({
                status: 'success',
                message: 'Data kategori berhasil ditampilkan',
                count: data.length,
                data: data
            });

        } catch (error) {
            next(error);
        }
    }

    // GET /api/kategori/:id
    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const data = await kategoriRepository.findById(id);

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Kategori tidak ditemukan'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Detail kategori berhasil ditampilkan',
                data: data
            });

        } catch (error) {
            next(error);
        }
    }

    // POST /api/kategori
    async create(req, res, next) {
        try {
            const data = await kategoriRepository.create(req.body);

            return res.status(201).json({
                status: 'success',
                message: 'Kategori berhasil ditambahkan',
                data: data
            });

        } catch (error) {

            // Nama kategori sudah digunakan
            if (error.code === '23505') {
                return res.status(409).json({
                    status: 'error',
                    message: 'Nama kategori sudah digunakan'
                });
            }

            next(error);
        }
    }

    // DELETE /api/kategori/:id
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const deleted = await kategoriRepository.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Kategori tidak ditemukan'
                });
            }

            return res.status(204).send();

        } catch (error) {

            // Menampilkan detail error di terminal VS Code
            console.log('===== ERROR DELETE KATEGORI =====');
            console.log('Error code:', error.code);
            console.log('Error message:', error.message);
            console.log('Error detail:', error.detail);

            // Kategori masih digunakan oleh produk
            if (error.code === '23503' || error.code === '23001') {
                return res.status(409).json({
                    status: 'error',
                    message: 'Kategori tidak dapat dihapus karena masih digunakan oleh produk'
                });
            }

            next(error);
        }
    }
}

module.exports = new KategoriController();
