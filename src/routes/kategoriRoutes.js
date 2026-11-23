
const express = require('express');
const router = express.Router();

const kategoriController = require('../controllers/kategoriController');
const produkController = require('../controllers/produkController');
const parseId = require('../middlewares/parseId');
const validateKategori = require('../middlewares/validateKategori');

// GET semua kategori
router.get('/', kategoriController.getAll);

// GET produk berdasarkan kategori
router.get('/:id/produk', parseId, produkController.getByCategory);

// GET kategori berdasarkan ID
router.get('/:id', parseId, kategoriController.getById);

// POST kategori baru
router.post('/', validateKategori, kategoriController.create);

// DELETE kategori
router.delete('/:id', parseId, kategoriController.delete);

module.exports = router;
