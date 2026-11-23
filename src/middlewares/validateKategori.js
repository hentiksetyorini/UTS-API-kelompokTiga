
function validateKategori(req, res, next) {
    const errors = [];

    const { nama_kategori, deskripsi } = req.body;

    // Validasi nama kategori
    if (
        typeof nama_kategori !== 'string' ||
        nama_kategori.trim() === ''
    ) {
        errors.push({
            field: 'nama_kategori',
            message: 'Nama kategori wajib diisi'
        });
    } else if (nama_kategori.trim().length > 50) {
        errors.push({
            field: 'nama_kategori',
            message: 'Nama kategori maksimal 50 karakter'
        });
    }

    // Validasi deskripsi
    if (
        deskripsi !== undefined &&
        deskripsi !== null &&
        typeof deskripsi !== 'string'
    ) {
        errors.push({
            field: 'deskripsi',
            message: 'Deskripsi harus berupa teks'
        });
    } else if (
        typeof deskripsi === 'string' &&
        deskripsi.length > 200
    ) {
        errors.push({
            field: 'deskripsi',
            message: 'Deskripsi maksimal 200 karakter'
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validasi data gagal',
            errors: errors
        });
    }

    req.body.nama_kategori = nama_kategori.trim();

    if (typeof deskripsi === 'string') {
        req.body.deskripsi = deskripsi.trim();
    }

    next();
}

module.exports = validateKategori;
