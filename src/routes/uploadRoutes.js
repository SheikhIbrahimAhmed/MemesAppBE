const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multer');
const cloudinary = require('../../cloudinary');
const loginMiddleware = require('../middlewares/loginMiddleware');
// const loginMiddleware = require('../middlewares/loginMiddleware');
const app = express();


app.use(express.urlencoded({ extended: true }));


router.post('/upload-user-image', loginMiddleware, upload.single('profileImage'), async (req, res) => {
    try {
        const file = req.file;
        console.log("Uploaded file:", file);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
        });

        // Get the image URL from the result
        const imageUrl = result.secure_url;

        res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: "Error uploading image", error });
    }
});



router.post('/upload-image', upload.single('memeImage'), async (req, res) => {
    try {
        const file = req.file;
        console.log("req.file", req.file);


        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
        });

        const imageUrl = result.secure_url; // Single image URL

        res.json({ message: 'Image uploaded successfully', imageUrl });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: "Error uploading image", error });
    }
});




module.exports = router;
