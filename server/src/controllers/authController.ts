import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import logger from '../config/logger';
import { validationResult } from 'express-validator';

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register a new user
export const register = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation error on user registration', { errors: errors.array() });
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      logger.warn(`Registration attempt with existing email: ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role: role || undefined // Use default if not provided
    });

    // Save user
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        logger.info(`New user registered: ${email} with role ${user.role}`);
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    logger.error(`Registration error: ${(error as Error).message}`);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn('Validation error on user login', { errors: errors.array() });
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      logger.warn(`Failed login attempt for user: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        logger.info(`User logged in: ${email}`);
        res.json({ token });
      }
    );
  } catch (error) {
    logger.error(`Login error: ${(error as Error).message}`);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // Get user from database but exclude the password
    const user = await User.findById(req.user?.id).select('-password');

    if (!user) {
      logger.warn(`User not found with id: ${req.user?.id}`);
      return res.status(404).json({ message: 'User not found' });
    }

    logger.debug(`Current user data retrieved for: ${user.email}`);
    res.json(user);
  } catch (error) {
    logger.error(`Error fetching current user: ${(error as Error).message}`);
    res.status(500).json({ message: 'Server error while fetching user data' });
  }
}; 