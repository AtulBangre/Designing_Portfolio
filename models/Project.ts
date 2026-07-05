import mongoose, { Schema, Document } from 'mongoose';
import { Project as IProject } from '@/types';

// Omit the types we don't want strictly from the interface, or just redefine in Mongoose schema
export interface ProjectDocument extends Document, Omit<IProject, 'seo'> {
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const ProjectSchema = new Schema<ProjectDocument>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  gallery: [{ type: String }],
  tools: [{ type: String }],
  year: { type: Number, required: true },
  client: { type: String },
  services: [{ type: String }],
  challenge: { type: String },
  solution: { type: String },
  results: [{ type: String }],
  colors: [{ type: String }],
  tags: [{ type: String }],
  featured: { type: Boolean, default: false },
  projectUrl: { type: String },
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }],
  },
}, { timestamps: true });

// Delete the cached model to ensure hot-reload updates the schema with the new projectUrl field
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

export const Project = mongoose.model<ProjectDocument>('Project', ProjectSchema);
