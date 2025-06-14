import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

interface AppError extends Error {
  statusCode?: number;
  errors?: any[];
}

// Not Found Error Middleware
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as AppError;
  error.statusCode = 404;
  logger.warn(`404 Error: ${req.originalUrl}`);
  next(error);
};

// Global Error Handler
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  // Log error
  if (statusCode >= 500) {
    logger.error(`Server Error: ${err.message}`, { stack: err.stack });
  } else {
    logger.warn(`Client Error: ${err.message}`);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors,
    });
  }

  // Mongoose duplicate key error
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    return res.status(409).json({
      message: 'Duplicate key error',
    });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired',
    });
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}; 