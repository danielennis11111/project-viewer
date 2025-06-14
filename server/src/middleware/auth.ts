import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User';
import logger from '../config/logger';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Authentication middleware
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
      logger.warn('No authentication token provided');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { user: { id: string; role: UserRole } };
    req.user = decoded.user;

    logger.debug(`User ${req.user.id} authenticated successfully`);
    next();
  } catch (error) {
    logger.error(`Authentication error: ${(error as Error).message}`);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin authorization middleware
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== UserRole.ADMIN) {
    logger.warn(`Unauthorized access attempt by user ${req.user?.id} - Admin privileges required`);
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  
  logger.debug(`Admin access granted to user ${req.user.id}`);
  next();
};

// Developer authorization middleware
export const developerAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== UserRole.DEVELOPER && req.user?.role !== UserRole.ADMIN) {
    logger.warn(`Unauthorized access attempt by user ${req.user?.id} - Developer privileges required`);
    return res.status(403).json({ message: 'Access denied. Developer privileges required.' });
  }
  
  logger.debug(`Developer access granted to user ${req.user.id}`);
  next();
};

// Reviewer authorization middleware
export const reviewerAuth = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.user?.role !== UserRole.REVIEWER && 
    req.user?.role !== UserRole.DEVELOPER && 
    req.user?.role !== UserRole.ADMIN
  ) {
    logger.warn(`Unauthorized access attempt by user ${req.user?.id} - Reviewer privileges required`);
    return res.status(403).json({ message: 'Access denied. Reviewer privileges required.' });
  }
  
  logger.debug(`Reviewer access granted to user ${req.user.id}`);
  next();
}; 