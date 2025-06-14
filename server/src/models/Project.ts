import mongoose from 'mongoose';

// Interfaces for type safety
type Document = any;
type ObjectId = string;

// Enum for project status
export enum ProjectStatus {
  IN_DEVELOPMENT = 'In Development',
  READY_FOR_REVIEW = 'Ready for Review',
  APPROVED = 'Approved',
  ARCHIVED = 'Archived'
}

// Project interface
interface ProjectDoc extends mongoose.Document {
  name: string;
  description: string;
  detailedDescription?: string;
  owner: mongoose.Schema.Types.ObjectId | any;
  status: ProjectStatus;
  tags: string[];
  previewImage?: string;
  sharedWith: mongoose.Schema.Types.ObjectId[] | any[];
  sharedWithTeams: mongoose.Schema.Types.ObjectId[] | any[];
  sharedBy?: mongoose.Schema.Types.ObjectId | any;
  versions: {
    version: string;
    description: string;
    changes: string;
    date: Date;
  }[];
  finetuningParameters?: any;
  dataSources?: string[];
  modelAccess?: {
    apiEndpoint?: string;
    codeSnippets?: {
      language: string;
      code: string;
    }[];
  };
  evaluationMetrics?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Project schema
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    detailedDescription: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.IN_DEVELOPMENT,
    },
    tags: {
      type: [String],
      default: [],
    },
    previewImage: {
      type: String,
    },
    sharedWith: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    sharedWithTeams: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Team',
      default: [],
    },
    sharedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    versions: {
      type: [
        {
          version: String,
          description: String,
          changes: String,
          date: Date,
        },
      ],
      default: [],
    },
    finetuningParameters: {
      type: mongoose.Schema.Types.Mixed,
    },
    dataSources: {
      type: [String],
      default: [],
    },
    modelAccess: {
      apiEndpoint: String,
      codeSnippets: [
        {
          language: String,
          code: String,
        },
      ],
    },
    evaluationMetrics: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

// Add text index for search
projectSchema.index(
  { name: 'text', description: 'text', tags: 'text' },
  { weights: { name: 10, description: 5, tags: 3 } }
);

const Project = mongoose.models.Project || mongoose.model<ProjectDoc>('Project', projectSchema);

export default Project; 