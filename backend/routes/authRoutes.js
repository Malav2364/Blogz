import express from 'express';
import { register, login, logout, getProfile } from '../controllers/authController.js';
import { validate, schemas } from '../middlewares/validation.js';

const router = express.Router();

router.post('/register', validate(schemas.register), register);
router.post('/login', validate(schemas.login), login);
router.post('/logout', logout);
router.get('/profile', getProfile);

export default router;
