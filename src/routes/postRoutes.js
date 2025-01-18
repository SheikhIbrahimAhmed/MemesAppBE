const express = require('express');
const { getMemes, createMeme } = require('../controllers/postController');
const loginMiddleware = require('../middlewares/loginMiddleware');
const router = express.Router();

router.post('/create-post', loginMiddleware, createMeme);
router.get('/get-memes', loginMiddleware, getMemes);





module.exports = router;




