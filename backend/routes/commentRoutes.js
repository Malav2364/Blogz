import express from 'express';
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from '../controllers/commentController.js';
import { protect, checkBanStatus } from '../middlewares/authMiddleware.js';
import { validate, schemas } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', protect, checkBanStatus, validate(schemas.createComment), createComment);
router.get('/:postId', getCommentsByPost);
router.delete('/:id', protect, deleteComment);

export default router;