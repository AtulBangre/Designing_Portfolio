export interface SocialLinks {
  linkedin: string;
  behance: string;
  dribbble: string;
  github: string;
  whatsapp: string;
}

export interface SiteInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
}

export interface HeroInfo {
  tagline: string;
  subtitle: string;
  description: string;
  ctaTextPrimary: string;
  ctaTextSecondary: string;
}

export interface AboutInfo {
  bio: string;
  yearsOfExperience: number;
  highlightPoints: string[];
  education?: string;
  achievements?: {
    count: string;
    label: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  skillsLearned?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Project {
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  gallery: string[];
  tools: string[];
  year: number;
  client: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  colors: string[]; // hex codes for project palette
  tags: string[];
  featured: boolean;
  seo: ProjectSEO;
  projectUrl?: string; // external link e.g. Behance
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number; // 1-5
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

export interface SeoConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  canonicalUrl: string;
  openGraph: {
    type: string;
    locale: string;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
}
