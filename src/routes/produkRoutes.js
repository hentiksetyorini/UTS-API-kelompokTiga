
const express = require('express');
const router = express.Router();

const produkController = require('../controllers/produkController');
const parseId = require('../middlewares/parseId');

const {
    checkBody,
    validateProduk,
    validateProdukPatch
} = require('../middlewares/validateProduk');

// GET produk berdasarkan kategori
router.get(
    '/:id/produk',
    parseId,
    require('../controllers/produkController').getByCategory
);

// GET semua produk
router.get('/', produkController.getAll);

// GET produk berdasarkan ID
router.get('/:id', parseId, produkController.getById);

// POST produk baru
router.post(
    '/',
    checkBody,
    validateProduk,
    produkController.create
);

// PUT mengganti seluruh data produk
router.put(
    '/:id',
    parseId,
    checkBody,
    validateProduk,
    produkController.update
);

// PATCH mengubah sebagian data produk
router.patch(
    '/:id',
    parseId,
    checkBody,
    validateProdukPatch,
    produkController.patch
);

// DELETE produk (soft delete)
router.delete(
    '/:id',
    parseId,
    produkController.softDelete
);

// PATCH mengembalikan produk
router.patch(
    '/:id/restore',
    parseId,
    produkController.restore
);

module.exports = router;
