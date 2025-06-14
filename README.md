# AI Project Hub - Frontend Prototype

A React + Tailwind CSS prototype for an AI project sharing platform that allows team members to discover and access AI fine-tuning projects shared with them.

## Features

### 🎯 Project Listing
- **Responsive Grid Layout**: Displays projects in a responsive grid (1 column on mobile, 2 on tablet, 3 on desktop)
- **Advanced Filtering**: Search by project name, description, category, or shared by
- **Category Filtering**: Filter projects by AI categories (Sentiment Analysis, Text Generation, etc.)
- **Flexible Sorting**: Sort by date shared (newest/oldest) or project name (A-Z/Z-A)
- **Favorites System**: Heart icon to mark/unmark projects as favorites
- **Empty State**: Helpful messaging when no projects match filters

### 📋 Project Detail View
- **Comprehensive Information**: Detailed project descriptions and metadata
- **API Access**: Copy-to-clipboard API endpoints with usage examples
- **Performance Metrics**: Visual display of model accuracy, precision, recall, F1-score
- **Fine-tuning Parameters**: Complete parameter specifications in an organized layout
- **Data Sources**: Clickable links to training datasets
- **Usage Guidelines**: Detailed instructions, best practices, and limitations

### 🎨 Design Features
- **Modern UI**: Clean, professional design using Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, transitions, and intuitive user interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Professional Typography**: Clear hierarchy and readable text

## Technology Stack

- **Frontend**: React 19 with functional components and hooks
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Heroicons for consistent iconography
- **State Management**: React useState and useMemo for local state
- **Data**: Mock data embedded in components (no backend required)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

**⚠️ IMPORTANT: This is a frontend-only prototype. Run from the `client` directory, NOT the root directory.**

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to `http://localhost:3000`

### ❌ Common Mistake
**DO NOT** run `npm start` from the root directory - this will try to start the old server which is not needed for this prototype.

**✅ Correct way:**
```bash
cd client
npm start
```

**❌ Wrong way:**
```bash
npm start  # This tries to start the server from root directory
```

## Project Structure

```
client/src/
├── components/
│   ├── ProjectListing.jsx    # Main project listing with filters
│   ├── ProjectCard.jsx       # Individual project card component
│   ├── ProjectDetail.jsx     # Detailed project view
│   └── Navbar.jsx           # Simple navigation component
├── App.jsx                  # Main app component with view switching
├── index.css               # Tailwind CSS imports and base styles
└── index.js               # React app entry point
```

## Sample Data

The prototype includes 6 sample AI projects covering different categories:
- Sentiment Analysis Model
- Text Summarization Engine  
- Medical Image Classifier
- Financial Fraud Detection
- Customer Support Chatbot
- E-commerce Image Generator

Each project includes realistic metadata, performance metrics, and usage guidelines.

## Prototype Features

- **View Switching**: Toggle between Project Listing and Project Detail views
- **No Backend Required**: All data is embedded in the frontend
- **Fully Interactive**: All UI elements are functional (search, filter, sort, favorites)
- **Production-Ready Styling**: Professional appearance suitable for stakeholder demos

## Future Enhancements

- React Router for proper navigation
- Backend API integration
- User authentication
- Real-time collaboration features
- Advanced filtering options
- Project creation and editing
- Team management
- Notification system

## Development Notes

This is a frontend-only prototype designed for design iteration and stakeholder feedback. The focus is on UI/UX rather than backend functionality. All interactions work as expected, but data is not persisted between sessions.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

Built with ❤️ using React and Tailwind CSS 