const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multer');
const cloudinary = require('../../cloudinary');

const app = express();


app.use(express.urlencoded({ extended: true }));



router.post('/upload-image', upload.single('memeImage'), async (req, res) => {
    try {
        const file = req.file;
        console.log("file", file)
        const fileName = file.originalname
        console.log("fileName", fileName)
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
        });
        //Commented lines of code which can be used for bulk upload.
        // const resulta = await cloudinary.api.resources({
        //     type: 'upload',
        //     max_results: 500  // Fetch up to 500 images
        // });
        // console.log("results", resulta)
        const imageUrl = result.secure_url;

        res.json({ message: 'Image uploaded successfully', imageUrl, fileName });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: "Error uploading image", error });
    }
});





module.exports = router;
