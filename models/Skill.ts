import mongoose, { Schema, Document } from 'mongoose';
import { SkillCategory, SkillItem } from '@/types';

export interface SkillCategoryDocument extends Document, SkillCategory {}

const SkillItemSchema = new Schema<SkillItem>({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
});

const SkillCategorySchema = new Schema<SkillCategoryDocument>({
  title: { type: String, required: true },
  skills: [SkillItemSchema],
}, { timestamps: true });

export const SkillCategoryModel = mongoose.models.SkillCategory || mongoose.model<SkillCategoryDocument>('SkillCategory', SkillCategorySchema);
