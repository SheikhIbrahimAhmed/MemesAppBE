const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/multer');
const cloudinary = require('../../cloudinary');
// const loginMiddleware = require('../middlewares/loginMiddleware');
const app = express();


app.use(express.urlencoded({ extended: true }));


router.post('/upload-user-image', upload.single('profileImage'), async (req, res) => {
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



//Cloudinaray setup for multiple images upload
// router.post('/upload-images', loginMiddleware, upload.array('images', 10), async (req, res) => {
//     try {
//         const files = req.files;
//         console.log("req.files", req.files);

//         const uploadPromises = files.map(file => {
//             return cloudinary.uploader.upload(file.path, {
//                 resource_type: 'auto',
//             });
//         });

//         const results = await Promise.all(uploadPromises);
//         const imageUrls = results.map(result => result.secure_url);

//         res.json({ message: 'Images uploaded successfully', imageUrls });
//     } catch (error) {
//         console.error('Error uploading images:', error);
//         res.status(500).json({ message: "Error uploading images", error });
//     }
// });


// router.post("/uploadPostImage", upload.single("profileImage"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send('No file uploaded');
//         }
//         const ImagePath = `/uploads/${req.file.filename}`;
//         res.status(200).json({
//             message: 'File uploaded successfully',
//             ImagePath,
//         });
//     } catch (error) {
//         console.error('Error uploading file or updating user:', error);
//         res.status(500).send('Server error');
//     }
// });
module.exports = router;
