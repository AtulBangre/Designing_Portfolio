import { 
  SiteInfo, 
  HeroInfo, 
  AboutInfo, 
  ExperienceItem, 
  SkillCategory, 
  ServiceItem, 
  Project, 
  TestimonialItem, 
  FaqItem, 
  ContactInfo, 
  SocialLinks, 
  SeoConfig 
} from '@/types';

// Import MongoDB connection and models
import connectToDatabase from '@/lib/mongodb';
import { Project as ProjectModel } from '@/models/Project';
import { Experience as ExperienceModel } from '@/models/Experience';
import { SkillCategoryModel } from '@/models/Skill';
import { SiteSettings as SiteSettingsModel } from '@/models/SiteSettings';

// Fallback static data sources for things not in DB yet
import { siteData } from '../data/site';
import { heroData } from '../data/hero';
import { aboutData } from '../data/about';
import { servicesData } from '../data/services';
import { testimonialsData } from '../data/testimonials';
import { faqData } from '../data/faq';
import { contactData } from '../data/contact';
import { socialsData } from '../data/socials';
import { seoData } from '../data/seo';

// Helper to sanitize MongoDB documents for Next.js Client Components
function sanitizeDocs(docs: any[]) {
  return JSON.parse(JSON.stringify(docs.map(doc => {
    const { _id, __v, createdAt, updatedAt, ...rest } = doc;
    return { ...rest, id: _id?.toString() || rest.id };
  })));
}

function sanitizeDoc(doc: any) {
  if (!doc) return doc;
  const { _id, __v, createdAt, updatedAt, ...rest } = doc;
  return JSON.parse(JSON.stringify({ ...rest, id: _id?.toString() || rest.id }));
}

// Helper to get Site Settings from DB
async function getSiteSettingsFromDB() {
  await connectToDatabase();
  const settings = await SiteSettingsModel.findOne().lean();
  return sanitizeDoc(settings);
}

export async function getSiteData(): Promise<SiteInfo> {
  const settings = await getSiteSettingsFromDB();
  if (settings && settings.site) {
    const site = settings.site as SiteInfo;
    // Append the dynamic resume URL if we have one in DB
    if (settings.resumeFileData) {
      site.resumeUrl = '/api/resume'; // We will create this route
    }
    return site;
  }
  return siteData;
}

export async function getHeroData(): Promise<HeroInfo> {
  const settings = await getSiteSettingsFromDB();
  // Merge DB hero over static defaults so any field added later is never undefined
  return settings?.hero ? { ...heroData, ...(settings.hero as Partial<HeroInfo>) } : heroData;
}

export async function getAboutData(): Promise<typeof aboutData> {
  const settings = await getSiteSettingsFromDB();
  return settings?.about ? (settings.about as AboutInfo) : aboutData;
}

export async function getExperienceData(): Promise<ExperienceItem[]> {
  try {
    await connectToDatabase();
    const exps = await ExperienceModel.find().sort({ createdAt: -1 }).lean();
    if (exps.length > 0) {
      return sanitizeDocs(exps) as ExperienceItem[];
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function getSkillsData(): Promise<SkillCategory[]> {
  try {
    await connectToDatabase();
    const skills = await SkillCategoryModel.find().lean();
    if (skills.length > 0) {
      return sanitizeDocs(skills) as SkillCategory[];
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function getServicesData(): Promise<ServiceItem[]> {
  return servicesData;
}

export async function getTestimonialsData(): Promise<TestimonialItem[]> {
  return testimonialsData;
}

export async function getFaqData(): Promise<FaqItem[]> {
  return faqData;
}

export async function getContactData(): Promise<ContactInfo> {
  const settings = await getSiteSettingsFromDB();
  return settings?.contact ? (settings.contact as ContactInfo) : contactData;
}

export async function getSocialsData(): Promise<SocialLinks> {
  const settings = await getSiteSettingsFromDB();
  return settings?.socials ? (settings.socials as SocialLinks) : socialsData;
}

export async function getSeoData(): Promise<SeoConfig> {
  return seoData;
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    await connectToDatabase();
    const projects = await ProjectModel.find().sort({ year: -1 }).lean();
    if (projects.length > 0) {
      return sanitizeDocs(projects) as unknown as Project[];
    }
  } catch (error) {
    console.error(error);
  }
  return [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((project: Project) => project.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    await connectToDatabase();
    const project = await ProjectModel.findOne({ slug }).lean();
    if (project) {
      return sanitizeDoc(project) as unknown as Project;
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
}

export async function getRelatedProjects(slug: string, category: string, limit = 3): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects
    .filter((project: Project) => project.slug !== slug && project.category === category)
    .slice(0, limit);
}
