import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import cloudinary from '../config/cloudinaryConfig.js';
import {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
} from '../controllers/postController.js';
import { protect, checkBanStatus } from '../middlewares/authMiddleware.js';
import { validate, schemas } from '../middlewares/validation.js';

const router = express.Router();

// Cross-platform temp directory with file size limit
const upload = multer({ 
  dest: os.tmpdir(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Upload image to Cloudinary (cover image or in-editor)
router.post('/upload-image', protect, upload.single('image'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'writewave-posts',
      transformation: [{ width: 1024, crop: 'limit' }],
    });

    await fs.unlink(req.file.path); // remove temp file
    res.json({ url: result.secure_url });
  } catch (err) {
    // Clean up temp file on error
    if (req.file?.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkErr) {
        console.error('Failed to clean up temp file:', unlinkErr);
      }
    }
    next(err); // Pass to error handler
  }
});

// Post routes
router.route('/').get(getAllPosts).post(protect, checkBanStatus, validate(schemas.createPost), createPost);
router.route('/my-posts').get(protect, getUserPosts);
router.route('/:id').get(getPostById).put(protect, validate(schemas.updatePost), updatePost).delete(protect, deletePost);
router.route('/:id/like').patch(protect, checkBanStatus, toggleLike);

export default router;
