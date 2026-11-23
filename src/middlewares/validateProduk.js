
const allowedFields = [
    'kategori_id',
    'kode_produk',
    'nama_produk',
    'harga',
    'stok'
];

// Memeriksa nilai setiap kolom produk
function checkProductField(field, value, errors) {

    if (field === 'kategori_id') {
        if (
            !Number.isInteger(value) ||
            value <= 0
        ) {
            errors.push({
                field: field,
                message: 'Kategori ID harus berupa angka bulat positif'
            });
        }
    }

    if (field === 'kode_produk') {
        if (
            typeof value !== 'string' ||
            value.trim() === ''
        ) {
            errors.push({
                field: field,
                message: 'Kode produk wajib diisi'
            });
        } else if (value.trim().length > 20) {
            errors.push({
                field: field,
                message: 'Kode produk maksimal 20 karakter'
            });
        }
    }

    if (field === 'nama_produk') {
        if (
            typeof value !== 'string' ||
            value.trim() === ''
        ) {
            errors.push({
                field: field,
                message: 'Nama produk wajib diisi'
            });
        } else if (value.trim().length > 100) {
            errors.push({
                field: field,
                message: 'Nama produk maksimal 100 karakter'
            });
        }
    }

    if (field === 'harga') {
        if (
            !Number.isInteger(value) ||
            value <= 0
        ) {
            errors.push({
                field: field,
                message: 'Harga harus berupa angka bulat lebih dari 0'
            });
        }
    }

    if (field === 'stok') {
        if (
            !Number.isInteger(value) ||
            value < 0
        ) {
            errors.push({
                field: field,
                message: 'Stok harus berupa angka bulat minimal 0'
            });
        }
    }
}

// Memastikan body berupa objek JSON
function checkBody(req, res, next) {
    if (
        !req.body ||
        typeof req.body !== 'object' ||
        Array.isArray(req.body)
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Body harus berupa objek JSON'
        });
    }

    next();
}

// Validasi POST dan PUT: semua kolom wajib ada
function validateProduk(req, res, next) {
    const errors = [];
    const data = req.body;

    const requiredFields = allowedFields;

    for (const field of requiredFields) {
        if (!Object.prototype.hasOwnProperty.call(data, field)) {
            errors.push({
                field: field,
                message: `${field} wajib diisi`
            });
        } else {
            checkProductField(field, data[field], errors);
        }
    }

    const unknownFields = Object.keys(data).filter(
        field => !allowedFields.includes(field)
    );

    for (const field of unknownFields) {
        errors.push({
            field: field,
            message: `Field ${field} tidak dikenal`
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validasi data produk gagal',
            errors: errors
        });
    }

    // Membersihkan teks dari spasi berlebih
    data.kode_produk = data.kode_produk.trim();
    data.nama_produk = data.nama_produk.trim();

    next();
}

// Validasi PATCH: minimal satu kolom harus dikirim
function validateProdukPatch(req, res, next) {
    const errors = [];
    const data = req.body;

    const fields = Object.keys(data);

    if (fields.length === 0) {
        errors.push({
            field: 'body',
            message: 'Minimal satu data produk harus diisi'
        });
    }

    for (const field of fields) {
        if (!allowedFields.includes(field)) {
            errors.push({
                field: field,
                message: `Field ${field} tidak dikenal`
            });
        } else {
            checkProductField(field, data[field], errors);
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validasi data produk gagal',
            errors: errors
        });
    }

    // Membersihkan teks jika dikirim
    if (typeof data.kode_produk === 'string') {
        data.kode_produk = data.kode_produk.trim();
    }

    if (typeof data.nama_produk === 'string') {
        data.nama_produk = data.nama_produk.trim();
    }

    next();
}

// Memasang pemeriksaan body sebelum validasi
module.exports = {
    checkBody,
    validateProduk,
    validateProdukPatch
};
