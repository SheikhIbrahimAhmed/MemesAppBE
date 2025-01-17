const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middlewares/loginMiddleware');
const { createUser, loginUser } = require('../controllers/authController');
const { createPost } = require('../controllers/postController');
// const { createPost, getPosts } = require('../controllers/');


router.post('/create-user', createUser);
router.post('/login', loginUser);
// router.post('/posts', getPosts);

module.exports = router;
