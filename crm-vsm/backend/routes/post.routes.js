const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Post = require('../models/Post');
const postController = require('../controllers/post.controller');

// Thiết lập multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// GET all + GET by ID
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// POST tạo bài viết kèm thumbnail
router.post('/', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, shortDescription, content, author, category, tags } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const post = new Post({
      title,
      shortDescription,
      content,
      author,
      category,
      tags: tags?.split(',').map(t => t.trim()),
      thumbnail: imagePath
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT + DELETE
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
