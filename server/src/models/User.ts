import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Interfaces for type safety
type Document = any;
type ObjectId = string;

// Enum for user roles
export enum UserRole {
  USER = 'user',
  DEVELOPER = 'developer',
  REVIEWER = 'reviewer',
  ADMIN = 'admin'
}

// User interface
interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  teams: mongoose.Types.ObjectId[];
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER
    },
    teams: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Team',
      default: []
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

// Hash password before saving - we use 'function' syntax to preserve 'this' context
userSchema.pre('save', async function(this: any, next: any) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) return next();

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    const err = error as Error;
    next(err);
  }
});

// Method to compare password - we use 'function' syntax to preserve 'this' context
userSchema.methods.comparePassword = async function(this: any, candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

const User = mongoose.models.User || mongoose.model<UserDoc>('User', userSchema);

export default User; 