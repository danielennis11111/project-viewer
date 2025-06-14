import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar Component
 * 
 * Navigation bar that provides links to switch between
 * the Project Listing and Project Detail pages using React Router.
 */
const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="flex justify-between items-center bg-white shadow-sm border border-gray-200 p-4 rounded-lg mb-6">
      <div className="flex space-x-6">
        <Link 
          to="/" 
          className="font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors duration-200"
        >
          🤖 AI Project Hub
        </Link>
        <div className="flex space-x-4 items-center">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              location.pathname === '/' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            Browse Projects
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">
            {location.pathname.startsWith('/project/') ? 'Project Details' : 'Project Listing'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-500">
          Prototype Mode
        </div>
        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" title="Live Demo"></div>
      </div>
    </nav>
  );
};

export default Navbar; 