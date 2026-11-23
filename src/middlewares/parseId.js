
function parseId(req, res, next) {
    const id = req.params.id;

    // Memastikan ID hanya berisi angka positif
    if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
            status: 'error',
            message: 'ID harus berupa angka bulat positif'
        });
    }

    // Mengubah ID menjadi tipe Number
    req.params.id = Number(id);

    next();
}

module.exports = parseId;
