import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';

// Load environment variables
dotenv.config();

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-project-hub';

// Function to connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    logger.info('Connecting to MongoDB...');
    
    await mongoose.connect(MONGODB_URI);
    
    logger.info('MongoDB connected successfully');
  } catch (error) {
    const err = error as Error;
    logger.error(`MongoDB connection error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB error: ${err.message}`);
});

// Handle application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed due to app termination');
  process.exit(0);
});

export default { connectDB }; 