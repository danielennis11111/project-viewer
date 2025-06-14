import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './config/logger';

// Load environment variables
dotenv.config();

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-project-hub';

async function testMongoConnection() {
  try {
    logger.info('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    logger.info('MongoDB connection successful! Database is available.');
    await mongoose.connection.close();
    logger.info('Connection closed. You can now run the server.');
    process.exit(0);
  } catch (error) {
    const err = error as Error;
    logger.error(`MongoDB connection test failed: ${err.message}`);
    logger.error('Please ensure MongoDB is running on your system.');
    logger.error('For local development, you can install and start MongoDB:');
    logger.error('1. Install: https://docs.mongodb.com/manual/installation/');
    logger.error('2. Start: brew services start mongodb-community (macOS) or systemctl start mongod (Linux)');
    process.exit(1);
  }
}

// Run the test
testMongoConnection(); 