import mongoose, { Schema, Document } from 'mongoose';
import { ExperienceItem } from '@/types';

export interface ExperienceDocument extends Document, Omit<ExperienceItem, 'id'> {}

const ExperienceSchema = new Schema<ExperienceDocument>({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: [{ type: String }],
  skillsLearned: [{ type: String }],
}, { timestamps: true });

export const Experience = mongoose.models.Experience || mongoose.model<ExperienceDocument>('Experience', ExperienceSchema);
