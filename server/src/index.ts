import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import logger from './config/logger';
// Remove auth routes
// import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import { notFound, errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Output the PORT value for debugging
const PORT = process.env.PORT || 5001;
logger.info(`PORT set to: ${PORT}`);

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '30mb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors()); // Enable CORS for all routes

// Custom logging middleware with Morgan
app.use(morgan('combined', {
  stream: {
    write: (message: string) => {
      logger.http(message.trim());
    },
  },
}));

// Set up API routes - removed auth routes for prototype
// app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler as express.ErrorRequestHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode - PROTOTYPE VERSION (NO AUTHENTICATION)`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`, { stack: err.stack });
  // Close server & exit process
  process.exit(1);
}); 