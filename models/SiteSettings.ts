import mongoose, { Schema, Document } from 'mongoose';
import { SiteInfo, HeroInfo, AboutInfo, ContactInfo, SocialLinks } from '@/types';

export interface SiteSettingsDocument extends Document {
  site: SiteInfo;
  hero: HeroInfo;
  about: AboutInfo;
  contact: ContactInfo;
  socials: SocialLinks;
  // We store the resume file data here for Vercel deployment compatibility
  resumeFileData?: string; 
  resumeFileName?: string;
}

const SiteSettingsSchema = new Schema<SiteSettingsDocument>({
  site: { type: Schema.Types.Mixed },
  hero: { type: Schema.Types.Mixed },
  about: { type: Schema.Types.Mixed },
  contact: { type: Schema.Types.Mixed },
  socials: { type: Schema.Types.Mixed },
  resumeFileData: { type: String }, // base64 encoded string
  resumeFileName: { type: String },
}, { timestamps: true });

export const SiteSettings = mongoose.models.SiteSettings || mongoose.model<SiteSettingsDocument>('SiteSettings', SiteSettingsSchema);
