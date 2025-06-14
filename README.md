# AI Project Hub - Prototype

A modern, responsive web application for sharing and managing AI fine-tuning projects within teams. Built with React, Tailwind CSS, and React Router.

## 🚀 Live Demo

**[View Live Demo](https://danielennis11111.github.io/project-viewer)**

## ✨ Features

- **Project Listing**: Browse AI projects with responsive grid/list views
- **Advanced Filtering**: Search by name, description, tags, category, and status
- **Project Details**: Comprehensive project information including:
  - Fine-tuning parameters and performance metrics
  - API endpoints and usage guidelines
  - Technical specifications and data sources
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Navigation**: React Router for smooth page transitions
- **Favorites**: Mark and filter favorite projects

## 🛠️ Technology Stack

- **Frontend**: React 18, JavaScript (JSX)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Heroicons
- **Deployment**: GitHub Pages with GitHub Actions

## 📱 Sample Data

The prototype includes 10 realistic AI projects across various domains:
- Customer Sentiment Analysis
- Legal Document Summarization
- Medical Image Classification
- Multilingual Customer Support Chatbot
- Financial Fraud Detection
- E-commerce Product Image Generator
- Code Review Assistant
- Supply Chain Demand Forecasting
- Autonomous Vehicle Object Detection
- Social Media Content Moderation

## 🚀 Automatic Deployment

This project is configured for automatic deployment to GitHub Pages:
- Every push to `main` branch triggers a new deployment
- GitHub Actions builds and deploys the React application
- Live site updates automatically within minutes

## 💻 Local Development

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/danielennis11111/project-viewer.git
cd project-viewer

# Install dependencies
cd client
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
project-viewer/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ProjectListing.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   └── Navbar.jsx
│   │   ├── App.jsx         # Main app component
│   │   └── index.js        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Dependencies and scripts
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml          # Deployment workflow
└── README.md
```

## 🎯 Use Cases

This prototype demonstrates a platform for:
- **AI Teams**: Share fine-tuned models within organizations
- **Research Groups**: Collaborate on AI projects and experiments
- **Enterprise**: Manage AI model deployments and documentation
- **Education**: Showcase AI projects and learning resources

## 🔄 Continuous Deployment

The project uses GitHub Actions for CI/CD:
- Builds React application on every push
- Deploys to GitHub Pages automatically
- Monitors build status and deployment health

---

**Built with ❤️ for AI project collaboration** 