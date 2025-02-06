const express = require('express');
const { getMemes, createMeme, getCategories } = require('../controllers/postController');
const router = express.Router();

router.post('/create-post', createMeme);
router.get('/get-memes', getMemes);
router.get('/get-categories', getCategories);




module.exports = router;




