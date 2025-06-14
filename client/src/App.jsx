import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectListing from './components/ProjectListing';
import ProjectDetail from './components/ProjectDetail';
import Navbar from './components/Navbar';

/**
 * Main App Component
 * 
 * Root component that manages routing and overall layout
 * for the AI Project Hub prototype using React Router.
 */
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4">
          {/* Navigation */}
          <div className="mb-6">
            <Navbar />
          </div>

          {/* Main Content with Routes */}
          <main>
            <Routes>
              <Route path="/" element={<ProjectListing />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App; 