const express = require('express');
const { getMemes, createMeme } = require('../controllers/postController');
const router = express.Router();

router.post('/create-post', createMeme);
router.get('/get-memes', getMemes);





module.exports = router;




