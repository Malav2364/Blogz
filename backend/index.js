import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import connectDB from './config/db.js';
import { validateEnv } from './utils/validateEnv.js';

import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import overviewRoutes from './routes/overviewRoutes.js';
import exploreRoutes from './routes/exploreRoutes.js';
import authorRoutes from "./routes/authorRoutes.js";
import notificationRoutes from './routes/notificationRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import adminUserRoutes from "./routes/adminUserRoutes.js";
import { errorHandler, notFound } from './middlewares/errorHandler.js';

dotenv.config();

// Validate environment variables
validateEnv();

const app = express();

// Connect to MongoDB
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false, // Allow image embeds
  contentSecurityPolicy: false, // Disable CSP for development
}));
app.use(limiter);
app.use(cors({
  origin: [
    process.env.CLIENT_URL, 
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    process.env.VERCEL_URL
  ].filter(Boolean), // Remove any undefined values
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/overview', overviewRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/users',userRoutes);
app.use('/api/admin',adminRoutes);
app.use("/api/admin/users", adminUserRoutes);

app.get("/health", (req, res) => {
  console.log("🩺 Health check at:", new Date().toLocaleString());
  res.status(200).send("OK");
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
