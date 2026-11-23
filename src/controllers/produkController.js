
const produkRepository = require('../repositories/produkRepository');

class ProdukController {

    // GET /api/produk
    async getAll(req, res, next) {
        try {
            const result = await produkRepository.findAll();

            return res.status(200).json({
                status: 'success',
                message: 'Data produk berhasil ditampilkan',
                count: result.count,
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/produk/:id
    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const data = await produkRepository.findById(id);

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Produk tidak ditemukan'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Detail produk berhasil ditampilkan',
                data: data
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/kategori/:id/produk
    async getByCategory(req, res, next) {
        try {
            const kategoriId = req.params.id;

            const data = await produkRepository.findByCategory(kategoriId);

            return res.status(200).json({
                status: 'success',
                message: 'Data produk berdasarkan kategori berhasil ditampilkan',
                count: data.length,
                data: data
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/produk
    async create(req, res, next) {
        try {
            const data = await produkRepository.create(req.body);

            return res.status(201).json({
                status: 'success',
                message: 'Produk berhasil ditambahkan',
                data: data
            });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(409).json({
                    status: 'error',
                    message: 'Kode produk sudah digunakan'
                });
            }

            if (error.code === '23503') {
                return res.status(422).json({
                    status: 'error',
                    message: 'Kategori yang dipilih tidak ditemukan'
                });
            }

            next(error);
        }
    }

    // PUT /api/produk/:id
    async update(req, res, next) {
        try {
            const id = req.params.id;

            const data = await produkRepository.update(id, req.body);

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Produk tidak ditemukan'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Produk berhasil diperbarui',
                data: data
            });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(409).json({
                    status: 'error',
                    message: 'Kode produk sudah digunakan'
                });
            }

            if (error.code === '23503') {
                return res.status(422).json({
                    status: 'error',
                    message: 'Kategori yang dipilih tidak ditemukan'
                });
            }

            next(error);
        }
    }

    // PATCH /api/produk/:id
    async patch(req, res, next) {
        try {
            const id = req.params.id;

            const data = await produkRepository.patch(id, req.body);

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Produk tidak ditemukan'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Sebagian data produk berhasil diperbarui',
                data: data
            });
        } catch (error) {
            if (error.code === '23505') {
                return res.status(409).json({
                    status: 'error',
                    message: 'Kode produk sudah digunakan'
                });
            }

            if (error.code === '23503') {
                return res.status(422).json({
                    status: 'error',
                    message: 'Kategori yang dipilih tidak ditemukan'
                });
            }

            next(error);
        }
    }

    // DELETE /api/produk/:id
    async softDelete(req, res, next) {
        try {
            const id = req.params.id;

            const deleted = await produkRepository.softDelete(id);

            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Produk tidak ditemukan atau sudah dihapus'
                });
            }

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/produk/:id/restore
    async restore(req, res, next) {
        try {
            const id = req.params.id;

            const data = await produkRepository.restore(id);

            if (!data) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Produk tidak ditemukan atau belum dihapus'
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Produk berhasil dipulihkan',
                data: data
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProdukController();
