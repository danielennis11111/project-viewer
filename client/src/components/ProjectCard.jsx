import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

/**
 * ProjectCard Component
 * 
 * Displays information about a single AI project in a card format.
 * Supports both grid and list view modes with favorite functionality.
 */
const ProjectCard = ({ project, onToggleFavorite, viewMode = 'grid' }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ready for review':
        return 'bg-green-100 text-green-800';
      case 'in development':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Sentiment Analysis': 'bg-purple-100 text-purple-800',
      'Text Generation': 'bg-indigo-100 text-indigo-800',
      'Image Recognition': 'bg-pink-100 text-pink-800',
      'Customer Support': 'bg-teal-100 text-teal-800',
      'Medical Analysis': 'bg-red-100 text-red-800',
      'Financial Analysis': 'bg-emerald-100 text-emerald-800',
      'Natural Language Processing': 'bg-blue-100 text-blue-800',
      'Computer Vision': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start space-x-4">
          {/* Project Image */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {project.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link 
                  to={`/project/${project.id}`}
                  className="block group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {project.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {truncateText(project.description, 120)}
                </p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    Shared {formatDate(project.dateShared)} by {project.sharedBy}
                  </span>
                </div>
              </div>

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(project.id);
                }}
                className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title={project.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {project.isFavorite ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header with Favorite Button */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {project.name.charAt(0)}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(project.id);
          }}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title={project.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {project.isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>

      {/* Project Name */}
      <Link 
        to={`/project/${project.id}`}
        className="block group mb-2"
      >
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {project.name}
        </h3>
      </Link>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {truncateText(project.description, 120)}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
          {project.category}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 border-t pt-3">
        <div>Shared {formatDate(project.dateShared)}</div>
        <div>by {project.sharedBy}</div>
      </div>
    </div>
  );
};

export default ProjectCard; 