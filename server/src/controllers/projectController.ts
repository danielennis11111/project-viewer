import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../config/logger';
import mongoose from 'mongoose';

// Mock project data
const dummyProjects = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Sentiment Analysis Model',
    description: 'A fine-tuned model for analyzing customer sentiment from reviews and feedback.',
    detailedDescription: 'This project uses a BERT architecture fine-tuned on customer reviews to accurately classify sentiment as positive, negative, or neutral. It achieves over 92% accuracy on benchmark datasets.',
    owner: {
      _id: new mongoose.Types.ObjectId('000000000000000000000001'),
      name: 'Demo User',
      email: 'demo@example.com'
    },
    status: 'Approved',
    tags: ['NLP', 'Sentiment', 'BERT'],
    previewImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    finetuningParameters: {
      learningRate: 0.00002,
      epochs: 4,
      batchSize: 16,
      warmupSteps: 500,
      weightDecay: 0.01
    },
    dataSources: [
      'https://huggingface.co/datasets/amazon_reviews_multi',
      'https://www.kaggle.com/datasets/bittlingmayer/amazonreviews'
    ],
    modelAccess: {
      apiEndpoint: 'https://api.example.com/models/sentiment-analysis',
      codeSnippets: [
        {
          language: 'python',
          code: 'import requests\n\nresponse = requests.post(\n    "https://api.example.com/models/sentiment-analysis",\n    json={"text": "I love this product!"}\n)\nprint(response.json())'
        }
      ]
    },
    evaluationMetrics: {
      accuracy: 0.924,
      f1_score: 0.918,
      precision: 0.935,
      recall: 0.901
    },
    createdAt: new Date('2023-01-15T10:30:00Z'),
    updatedAt: new Date('2023-03-22T14:15:00Z')
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Text Summarization Engine',
    description: 'An AI model that generates concise summaries of long documents.',
    owner: {
      _id: new mongoose.Types.ObjectId('000000000000000000000001'),
      name: 'Demo User',
      email: 'demo@example.com'
    },
    status: 'In Development',
    tags: ['NLP', 'Summarization', 'Transformers'],
    previewImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: new Date('2023-05-10T08:45:00Z'),
    updatedAt: new Date('2023-06-18T16:20:00Z')
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Image Generation for E-commerce',
    description: 'A specialized image generation model for creating product visualizations.',
    owner: {
      _id: new mongoose.Types.ObjectId('000000000000000000000002'),
      name: 'Marketing Team',
      email: 'marketing@example.com'
    },
    sharedBy: {
      _id: new mongoose.Types.ObjectId('000000000000000000000001'),
      name: 'Demo User',
      email: 'demo@example.com'
    },
    status: 'Ready for Review',
    tags: ['Image Generation', 'E-commerce', 'Diffusion Model'],
    previewImage: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: new Date('2023-07-22T13:10:00Z'),
    updatedAt: new Date('2023-08-05T09:45:00Z')
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Customer Support Chatbot',
    description: 'An AI assistant trained to handle common customer inquiries and issues.',
    owner: {
      _id: new mongoose.Types.ObjectId('000000000000000000000003'),
      name: 'Support Team',
      email: 'support@example.com'
    },
    sharedBy: {
      _id: new mongoose.Types.ObjectId('000000000000000000000001'),
      name: 'Demo User',
      email: 'demo@example.com'
    },
    status: 'Approved',
    tags: ['Chatbot', 'Customer Support', 'Conversational AI'],
    previewImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: new Date('2023-02-08T11:25:00Z'),
    updatedAt: new Date('2023-04-30T15:40:00Z')
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Medical Image Classification',
    description: 'A model trained to identify abnormalities in medical imaging.',
    owner: {
      _id: new mongoose.Types.ObjectId('000000000000000000000004'),
      name: 'Healthcare Research Team',
      email: 'healthcare@example.com'
    },
    status: 'In Development',
    tags: ['Healthcare', 'Image Classification', 'Computer Vision'],
    previewImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: new Date('2023-03-15T09:20:00Z'),
    updatedAt: new Date('2023-05-28T14:35:00Z')
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Financial Fraud Detection',
    description: 'An AI system for identifying potentially fraudulent financial transactions.',
    owner: {
      _id: new mongoose.Types.ObjectId('000000000000000000000005'),
      name: 'Security Team',
      email: 'security@example.com'
    },
    status: 'Approved',
    tags: ['Fraud Detection', 'Finance', 'Anomaly Detection'],
    previewImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    createdAt: new Date('2023-01-30T16:45:00Z'),
    updatedAt: new Date('2023-03-12T10:30:00Z')
  }
];

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      description,
      detailedDescription,
      tags,
      status,
      previewImage,
      finetuningParameters,
      dataSources,
      modelAccess,
      evaluationMetrics,
    } = req.body;

    const newProject = {
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
      detailedDescription,
      owner: {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        name: 'Demo User',
        email: 'demo@example.com'
      },
      status: status || 'In Development',
      tags: tags || [],
      previewImage,
      finetuningParameters,
      dataSources: dataSources || [],
      modelAccess,
      evaluationMetrics,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    dummyProjects.push(newProject);

    res.status(201).json({
      project: newProject,
      message: 'Project created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating project' });
  }
};

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const { filter, sort, page = 1, limit = 10, search, status, tag } = req.query;

    let filteredProjects = [...dummyProjects];
    
    if (status && status !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.status === status);
    }

    if (tag) {
      filteredProjects = filteredProjects.filter(p => p.tags.includes(tag as string));
    }

    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      filteredProjects = filteredProjects.filter(p => 
        searchRegex.test(p.name) || 
        searchRegex.test(p.description) || 
        p.tags.some(tag => searchRegex.test(tag))
      );
    }

    // Apply sorting
    switch (sort) {
      case 'name_asc':
        filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        filteredProjects.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'date_asc':
        filteredProjects.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'date_desc':
      default:
        filteredProjects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;
    const skip = (pageNum - 1) * limitNum;

    const paginatedProjects = filteredProjects.slice(skip, skip + limitNum);
    const total = filteredProjects.length;

    res.json({
      projects: paginatedProjects,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = dummyProjects.find(p => p._id.toString() === req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ 
      project,
      message: 'Project retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching project' });
  }
};

// Update project by ID
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const projectIndex = dummyProjects.findIndex(p => p._id.toString() === id);

    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updatedProject = {
      ...dummyProjects[projectIndex],
      ...req.body,
      updatedAt: new Date()
    };

    dummyProjects[projectIndex] = updatedProject;

    res.json({
      project: updatedProject,
      message: 'Project updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating project' });
  }
};

// Delete project by ID
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const projectIndex = dummyProjects.findIndex(p => p._id.toString() === id);

    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    dummyProjects.splice(projectIndex, 1);

    res.json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting project' });
  }
};

// Share project with users/teams
export const shareProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = dummyProjects.find(p => p._id.toString() === id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      message: 'Project shared successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while sharing project' });
  }
}; 