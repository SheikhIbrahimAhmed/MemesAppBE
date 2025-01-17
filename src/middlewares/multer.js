const multer = require('multer');
const storage = multer.diskStorage({

    // destination: function (req, file, cb) {
    //     return cb(null, "./uploads");
    // },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg or .png files are allowed!'), false);
        }
    },
});

module.exports = {
    upload
};