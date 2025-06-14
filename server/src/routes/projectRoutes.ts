import express from 'express';
import { check } from 'express-validator';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject,
  shareProject
} from '../controllers/projectController';

const router = express.Router();

/**
 * @route   POST api/projects
 * @desc    Create a new project
 * @access  Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  createProject
);

/**
 * @route   GET api/projects
 * @desc    Get all projects accessible to the user
 * @access  Public
 */
router.get('/', getProjects);

/**
 * @route   GET api/projects/:id
 * @desc    Get project by ID
 * @access  Public
 */
router.get('/:id', getProjectById);

/**
 * @route   PUT api/projects/:id
 * @desc    Update a project
 * @access  Public
 */
router.put(
  '/:id',
  [
    check('name', 'Name must not be empty if provided').optional().not().isEmpty(),
    check('description', 'Description must not be empty if provided').optional().not().isEmpty(),
  ],
  updateProject
);

/**
 * @route   DELETE api/projects/:id
 * @desc    Delete a project
 * @access  Public
 */
router.delete('/:id', deleteProject);

/**
 * @route   POST api/projects/:id/share
 * @desc    Share a project with users or teams
 * @access  Public
 */
router.post(
  '/:id/share',
  [
    check('userIds', 'userIds must be an array if provided').optional().isArray(),
    check('teamIds', 'teamIds must be an array if provided').optional().isArray(),
  ],
  shareProject
);

export default router; 