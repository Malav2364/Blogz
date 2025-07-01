
const express = require('express');
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
