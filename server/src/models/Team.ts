import mongoose from 'mongoose';

// Interfaces for type safety
type Document = any;
type ObjectId = string;

// Team interface
export interface ITeam extends Document {
  name: string;
  description: string;
  members: ObjectId[];
  admin: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface TeamDoc extends mongoose.Document {
  name: string;
  description?: string;
  leader: mongoose.Schema.Types.ObjectId | any;
  members: mongoose.Schema.Types.ObjectId[] | any[];
  createdAt: Date;
  updatedAt: Date;
}

// Team schema
const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: []
    }
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model<TeamDoc>('Team', teamSchema);

export default Team; 