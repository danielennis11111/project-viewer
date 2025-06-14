import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon, ShareIcon, DocumentTextIcon, CpuChipIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

/**
 * ProjectDetail Component
 * 
 * Displays comprehensive information about a specific AI project
 * including fine-tuning parameters, performance metrics, and usage guidelines.
 */
const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Enhanced project data - in a real app, this would be fetched based on the ID
  const projectsData = {
    1: {
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
      lastUpdated: "2024-01-15",
      fineTuningParameters: {
        learningRate: "2e-5",
        batchSize: 32,
        epochs: 3,
        maxSequenceLength: 512,
        warmupSteps: 500,
        weightDecay: 0.01,
        optimizer: "AdamW",
        scheduler: "Linear with warmup"
      },
      performanceMetrics: {
        accuracy: "94.2%",
        precision: "93.8%",
        recall: "94.6%",
        f1Score: "94.2%",
        inferenceTime: "85ms",
        throughput: "1,200 requests/min"
      },
      dataSources: [
        "https://dataset.example.com/ecommerce-reviews-500k",
        "https://dataset.example.com/customer-feedback-multilingual",
        "https://dataset.example.com/social-media-sentiment"
      ],
      apiEndpoints: {
        prediction: "https://api.aiprojecthub.com/v1/sentiment/predict",
        batch: "https://api.aiprojecthub.com/v1/sentiment/batch",
        health: "https://api.aiprojecthub.com/v1/sentiment/health"
      },
      usageGuidelines: "This model is optimized for customer review analysis in e-commerce contexts. Input text should be preprocessed to remove HTML tags and normalized for best results. The model supports text up to 512 tokens. For batch processing, use the batch endpoint with up to 100 texts per request. Rate limiting is set to 1000 requests per minute per API key.",
      technicalSpecs: {
        framework: "PyTorch 2.0",
        baseModel: "RoBERTa-large",
        hardware: "NVIDIA A100 GPU",
        deployment: "Docker container on Kubernetes",
        monitoring: "Prometheus + Grafana"
      }
    },
    2: {
      id: 2,
      name: "Legal Document Summarization Engine",
      description: "Specialized text summarization model trained on 100K legal documents including contracts, court filings, and regulatory texts. Uses extractive and abstractive techniques to generate concise summaries while preserving critical legal terminology and context.",
      category: "Text Generation",
      dateShared: "2024-01-12",
      sharedBy: "Michael Rodriguez",
      status: "In Development",
      isFavorite: false,
      tags: ["Legal Tech", "Document Processing", "Summarization", "Enterprise"],
      modelSize: "2.8GB",
      accuracy: "89.7%",
      trainingTime: "32 hours",
      lastUpdated: "2024-01-12",
      fineTuningParameters: {
        learningRate: "1e-4",
        batchSize: 16,
        epochs: 5,
        maxSequenceLength: 1024,
        warmupSteps: 1000,
        weightDecay: 0.005,
        optimizer: "AdamW",
        scheduler: "Cosine annealing"
      },
      performanceMetrics: {
        rougeL: "89.7%",
        bleuScore: "85.3%",
        bertScore: "91.2%",
        humanEvaluation: "88.5%",
        processingTime: "2.3s per document",
        compressionRatio: "15:1"
      },
      dataSources: [
        "https://dataset.example.com/legal-contracts-100k",
        "https://dataset.example.com/court-filings-dataset",
        "https://dataset.example.com/regulatory-documents"
      ],
      apiEndpoints: {
        summarize: "https://api.aiprojecthub.com/v1/legal/summarize",
        extract: "https://api.aiprojecthub.com/v1/legal/extract-key-points",
        analyze: "https://api.aiprojecthub.com/v1/legal/analyze-clauses"
      },
      usageGuidelines: "Designed for legal professionals to quickly summarize lengthy legal documents. Input documents should be in plain text format. The model preserves legal terminology and key clauses. Maximum document length is 50,000 characters. Results should always be reviewed by qualified legal professionals.",
      technicalSpecs: {
        framework: "Transformers 4.21",
        baseModel: "BART-large",
        hardware: "NVIDIA V100 GPU cluster",
        deployment: "AWS SageMaker",
        monitoring: "CloudWatch + Custom dashboards"
      }
    },
    3: {
      id: 3,
      name: "Medical Image Classification - Radiology",
      description: "Deep learning model for automated detection of abnormalities in chest X-rays, CT scans, and MRI images. Trained on 250K anonymized medical images from 15 hospitals. Supports detection of pneumonia, fractures, tumors, and other pathologies.",
      category: "Medical Analysis",
      dateShared: "2024-01-10",
      sharedBy: "Dr. Emily Watson",
      status: "Approved",
      isFavorite: true,
      tags: ["Healthcare", "Computer Vision", "FDA Compliant", "Critical Care"],
      modelSize: "4.1GB",
      accuracy: "96.8%",
      trainingTime: "72 hours",
      lastUpdated: "2024-01-08",
      fineTuningParameters: {
        learningRate: "1e-3",
        batchSize: 64,
        epochs: 100,
        imageSize: "512x512",
        augmentation: "Advanced medical imaging augmentation",
        optimizer: "SGD with momentum",
        scheduler: "Step decay"
      },
      performanceMetrics: {
        sensitivity: "96.8%",
        specificity: "95.2%",
        auc: "0.987",
        precision: "94.7%",
        recall: "96.8%",
        processingTime: "1.2s per image"
      },
      dataSources: [
        "https://dataset.example.com/chest-xrays-250k-anonymized",
        "https://dataset.example.com/ct-scans-hospital-consortium",
        "https://dataset.example.com/mri-images-validated"
      ],
      apiEndpoints: {
        classify: "https://api.aiprojecthub.com/v1/medical/classify-image",
        batch: "https://api.aiprojecthub.com/v1/medical/batch-classify",
        report: "https://api.aiprojecthub.com/v1/medical/generate-report"
      },
      usageGuidelines: "FDA-compliant model for radiological analysis. Images must be DICOM format or high-resolution PNG/JPEG. Model provides probability scores for various conditions. Results are for diagnostic assistance only and must be reviewed by licensed radiologists. Complies with HIPAA and medical device regulations.",
      technicalSpecs: {
        framework: "TensorFlow 2.8",
        baseModel: "EfficientNet-B7",
        hardware: "NVIDIA A100 GPU cluster",
        deployment: "HIPAA-compliant cloud infrastructure",
        monitoring: "Medical-grade monitoring and alerting"
      }
    }
  };

  // Get project data based on ID, fallback to first project if not found
  const project = projectsData[id] || projectsData[1];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'ready for review':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in development':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Project List
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
            <HeartIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-200">
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{project.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="text-sm text-gray-500">
                Shared by {project.sharedBy} on {formatDate(project.dateShared)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {project.name.charAt(0)}
            </span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{project.accuracy}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CpuChipIcon className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Model Size</p>
              <p className="text-2xl font-bold text-gray-900">{project.modelSize}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <ClockIcon className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Training Time</p>
              <p className="text-2xl font-bold text-gray-900">{project.trainingTime}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Category</p>
              <p className="text-lg font-bold text-gray-900">{project.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fine-tuning Parameters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fine-tuning Parameters</h2>
          <dl className="space-y-3">
            {Object.entries(project.fineTuningParameters).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                <dt className="text-sm font-medium text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="text-sm text-gray-900 font-mono">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Metrics</h2>
          <dl className="space-y-3">
            {Object.entries(project.performanceMetrics).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                <dt className="text-sm font-medium text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="text-sm text-gray-900 font-mono">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">API Endpoints</h2>
        <div className="space-y-3">
          {Object.entries(project.apiEndpoints).map(([key, url]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <span className="text-sm font-medium text-gray-900 capitalize">{key}</span>
                <p className="text-xs text-gray-500 mt-1">
                  {key === 'prediction' && 'Real-time single prediction endpoint'}
                  {key === 'batch' && 'Batch processing for multiple inputs'}
                  {key === 'health' && 'Health check and status monitoring'}
                  {key === 'summarize' && 'Document summarization endpoint'}
                  {key === 'extract' && 'Key point extraction'}
                  {key === 'analyze' && 'Clause analysis and categorization'}
                  {key === 'classify' && 'Single image classification'}
                  {key === 'report' && 'Generate detailed analysis report'}
                </p>
              </div>
              <code className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded font-mono">
                {url}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data Sources</h2>
        <ul className="space-y-2">
          {project.dataSources.map((url, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <a 
                href={url} 
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-mono"
                target="_blank"
                rel="noopener noreferrer"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Usage Guidelines */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Usage Guidelines</h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">{project.usageGuidelines}</p>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(project.technicalSpecs).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <dt className="text-sm font-medium text-gray-500 capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Project List
        </Link>
        
        <div className="text-sm text-gray-500">
          Last updated: {formatDate(project.lastUpdated)}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 