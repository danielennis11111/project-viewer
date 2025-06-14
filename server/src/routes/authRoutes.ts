import express from 'express';
import { check } from 'express-validator';
import { register, login, getCurrentUser } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

/**
 * @route   POST api/auth/register
 * @desc    Register a user
 * @access  Public
 */
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

/**
 * @route   POST api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

/**
 * @route   GET api/auth
 * @desc    Get authenticated user
 * @access  Private
 */
router.get('/', auth, getCurrentUser);

export default router; 