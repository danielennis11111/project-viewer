import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, Squares2X2Icon } from '@heroicons/react/24/outline';

/**
 * ProjectListing Component
 * 
 * Main component that displays a list of AI projects with filtering,
 * sorting, and search functionality. Supports both grid and list views.
 */
const ProjectListing = () => {
  // Enhanced project data with much more realistic content
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Customer Sentiment Analysis v2.1",
      description: "Advanced sentiment analysis model fine-tuned on 500K customer reviews from e-commerce platforms. Achieves 94.2% accuracy on multi-class sentiment classification (positive, negative, neutral, mixed). Optimized for real-time inference with sub-100ms response times. Includes custom preprocessing pipeline for handling emojis, slang, and domain-specific terminology.",
      category: "Sentiment Analysis",
      dateShared: "2024-01-15",
      sharedBy: "Sarah Chen",
      status: "Ready for Review",
      isFavorite: true,
      tags: ["NLP", "Customer Experience", "Real-time", "Production-ready"],
      modelSize: "1.2GB",
      accuracy: "94.2%",
      trainingTime: "18 hours",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Legal Document Summarization Engine",
      description: "Specialized text summarization model trained on 100K legal documents including contracts, court filings, and regulatory texts. Uses extractive and abstractive techniques to generate concise summaries while preserving critical legal terminology and context. Integrated with legal citation parsing and key clause identification.",
      category: "Text Generation",
      dateShared: "2024-01-12",
      sharedBy: "Michael Rodriguez",
      status: "In Development",
      isFavorite: false,
      tags: ["Legal Tech", "Document Processing", "Summarization", "Enterprise"],
      modelSize: "2.8GB",
      accuracy: "89.7%",
      trainingTime: "32 hours",
      lastUpdated: "2024-01-12"
    },
    {
      id: 3,
      name: "Medical Image Classification - Radiology",
      description: "Deep learning model for automated detection of abnormalities in chest X-rays, CT scans, and MRI images. Trained on 250K anonymized medical images from 15 hospitals. Supports detection of pneumonia, fractures, tumors, and other pathologies. FDA compliance documentation included. Achieves radiologist-level accuracy on validation datasets.",
      category: "Medical Analysis",
      dateShared: "2024-01-10",
      sharedBy: "Dr. Emily Watson",
      status: "Approved",
      isFavorite: true,
      tags: ["Healthcare", "Computer Vision", "FDA Compliant", "Critical Care"],
      modelSize: "4.1GB",
      accuracy: "96.8%",
      trainingTime: "72 hours",
      lastUpdated: "2024-01-08"
    },
    {
      id: 4,
      name: "Multilingual Customer Support Chatbot",
      description: "Conversational AI model supporting 12 languages with context-aware responses for customer service scenarios. Fine-tuned on 2M customer support conversations across telecommunications, banking, and retail sectors. Includes intent classification, entity extraction, and escalation detection. Integrated with knowledge base retrieval system.",
      category: "Customer Support",
      dateShared: "2024-01-08",
      sharedBy: "Alex Thompson",
      status: "Ready for Review",
      isFavorite: false,
      tags: ["Multilingual", "Conversational AI", "Customer Service", "Knowledge Base"],
      modelSize: "3.5GB",
      accuracy: "91.4%",
      trainingTime: "45 hours",
      lastUpdated: "2024-01-07"
    },
    {
      id: 5,
      name: "Financial Fraud Detection System",
      description: "Real-time fraud detection model analyzing transaction patterns, user behavior, and network effects. Trained on 10M anonymized financial transactions with advanced feature engineering for temporal patterns, geographic anomalies, and merchant risk scoring. Reduces false positives by 60% compared to rule-based systems.",
      category: "Financial Analysis",
      dateShared: "2024-01-05",
      sharedBy: "Jennifer Liu",
      status: "In Development",
      isFavorite: true,
      tags: ["Fintech", "Anomaly Detection", "Real-time", "Risk Management"],
      modelSize: "1.8GB",
      accuracy: "97.3%",
      trainingTime: "28 hours",
      lastUpdated: "2024-01-04"
    },
    {
      id: 6,
      name: "E-commerce Product Image Generator",
      description: "Generative AI model for creating high-quality product images from text descriptions. Trained on 5M product images across fashion, electronics, and home goods categories. Supports style transfer, background removal, and multi-angle generation. Includes brand consistency controls and automated quality scoring.",
      category: "Image Recognition",
      dateShared: "2024-01-03",
      sharedBy: "David Park",
      status: "Approved",
      isFavorite: false,
      tags: ["E-commerce", "Generative AI", "Product Photography", "Brand Consistency"],
      modelSize: "6.2GB",
      accuracy: "88.9%",
      trainingTime: "96 hours",
      lastUpdated: "2024-01-02"
    },
    {
      id: 7,
      name: "Code Review Assistant - Python/JavaScript",
      description: "AI-powered code review system that identifies bugs, security vulnerabilities, performance issues, and style violations. Trained on 500K code repositories with expert annotations. Supports Python, JavaScript, TypeScript, and React codebases. Integrates with GitHub, GitLab, and Bitbucket workflows.",
      category: "Natural Language Processing",
      dateShared: "2024-01-01",
      sharedBy: "Rachel Kim",
      status: "Ready for Review",
      isFavorite: true,
      tags: ["DevOps", "Code Quality", "Security", "CI/CD"],
      modelSize: "2.1GB",
      accuracy: "92.6%",
      trainingTime: "38 hours",
      lastUpdated: "2023-12-30"
    },
    {
      id: 8,
      name: "Supply Chain Demand Forecasting",
      description: "Time series forecasting model for predicting product demand across multiple channels and geographic regions. Incorporates seasonal patterns, promotional effects, economic indicators, and external events. Trained on 3 years of retail data from 500+ stores. Reduces inventory costs by 25% while maintaining 99.2% service levels.",
      category: "Financial Analysis",
      dateShared: "2023-12-28",
      sharedBy: "Mark Johnson",
      status: "Approved",
      isFavorite: false,
      tags: ["Supply Chain", "Forecasting", "Retail", "Optimization"],
      modelSize: "1.4GB",
      accuracy: "93.8%",
      trainingTime: "22 hours",
      lastUpdated: "2023-12-27"
    },
    {
      id: 9,
      name: "Autonomous Vehicle Object Detection",
      description: "Real-time object detection and tracking system for autonomous vehicles. Detects pedestrians, vehicles, traffic signs, and road hazards with 360-degree coverage. Trained on 1M annotated driving scenarios including adverse weather conditions. Optimized for edge deployment with NVIDIA Jetson hardware.",
      category: "Computer Vision",
      dateShared: "2023-12-25",
      sharedBy: "Lisa Zhang",
      status: "In Development",
      isFavorite: true,
      tags: ["Autonomous Vehicles", "Real-time", "Edge Computing", "Safety Critical"],
      modelSize: "3.9GB",
      accuracy: "98.1%",
      trainingTime: "84 hours",
      lastUpdated: "2023-12-24"
    },
    {
      id: 10,
      name: "Social Media Content Moderation",
      description: "Multi-modal content moderation system for detecting harmful content across text, images, and videos. Identifies hate speech, misinformation, spam, and inappropriate imagery. Trained on diverse datasets with cultural sensitivity considerations. Supports 25 languages with real-time processing capabilities.",
      category: "Natural Language Processing",
      dateShared: "2023-12-22",
      sharedBy: "Carlos Martinez",
      status: "Ready for Review",
      isFavorite: false,
      tags: ["Content Moderation", "Multi-modal", "Social Media", "Safety"],
      modelSize: "5.3GB",
      accuracy: "95.4%",
      trainingTime: "56 hours",
      lastUpdated: "2023-12-21"
    }
  ]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('dateShared-desc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Get unique categories and statuses for filter options
  const categories = ['All Categories', ...new Set(projects.map(p => p.category))];
  const statuses = ['All Statuses', ...new Set(projects.map(p => p.status))];

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All Categories' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All Statuses' || project.status === selectedStatus;
      const matchesFavorites = !showFavoritesOnly || project.isFavorite;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesFavorites;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'dateShared-asc':
          return new Date(a.dateShared) - new Date(b.dateShared);
        case 'dateShared-desc':
          return new Date(b.dateShared) - new Date(a.dateShared);
        case 'accuracy-desc':
          return parseFloat(b.accuracy) - parseFloat(a.accuracy);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchTerm, selectedCategory, selectedStatus, sortBy, showFavoritesOnly]);

  // Toggle favorite status
  const handleToggleFavorite = (projectId) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, isFavorite: !project.isFavorite }
          : project
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Project Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover and access AI fine-tuning projects shared with your team. 
          Browse through cutting-edge models, review implementation details, and integrate proven solutions.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, descriptions, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="dateShared-desc">Newest First</option>
            <option value="dateShared-asc">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="accuracy-desc">Highest Accuracy</option>
          </select>
        </div>

        {/* Additional Filters and View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show favorites only</span>
            </label>
            <div className="text-sm text-gray-500">
              {filteredAndSortedProjects.length} of {projects.length} projects
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">View:</span>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                title="Grid view"
              >
                <Squares2X2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                title="List view"
              >
                <Bars3Icon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid/List */}
      {filteredAndSortedProjects.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredAndSortedProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleFavorite={handleToggleFavorite}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <AdjustmentsHorizontalIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Categories');
              setSelectedStatus('All Statuses');
              setShowFavoritesOnly(false);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectListing; 