import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { Experience } from '@/models/Experience';
import { SkillCategoryModel } from '@/models/Skill';
import { SiteSettings } from '@/models/SiteSettings';

// Import all static data
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { skillsData } from '@/data/skills';
import { siteData } from '@/data/site';
import { heroData } from '@/data/hero';
import { aboutData } from '@/data/about';
import { contactData } from '@/data/contact';
import { socialsData } from '@/data/socials';

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Clear existing data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await SkillCategoryModel.deleteMany({});
    await SiteSettings.deleteMany({});

    // 2. Insert Projects
    await Project.insertMany(projectsData);

    // 3. Insert Experience (removing 'id' as MongoDB handles _id)
    const expData = experienceData.map(({ id, ...rest }) => rest);
    await Experience.insertMany(expData);

    // 4. Insert Skills
    await SkillCategoryModel.insertMany(skillsData);

    // 5. Insert Site Settings
    await SiteSettings.create({
      site: siteData,
      hero: heroData,
      about: aboutData,
      contact: contactData,
      socials: socialsData,
    });

    return NextResponse.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
