const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multer');
const cloudinary = require('../../cloudinary');

const app = express();


app.use(express.urlencoded({ extended: true }));



router.post('/upload-image', upload.single('memeImage'), async (req, res) => {
    try {
        const file = req.file;



        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
        });

        const imageUrl = result.secure_url;

        res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: "Error uploading image", error });
    }
});




module.exports = router;
