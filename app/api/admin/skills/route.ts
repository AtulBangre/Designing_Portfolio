import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { SkillCategoryModel } from '@/models/Skill';

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await SkillCategoryModel.find().lean();
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const skillCategory = await SkillCategoryModel.create(data);
    return NextResponse.json(skillCategory, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create skill category' }, { status: 500 });
  }
}
