import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { SkillCategoryModel } from '@/models/Skill';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    const data = await request.json();
    const skillCategory = await SkillCategoryModel.findByIdAndUpdate(id, data, { new: true });
    if (!skillCategory) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(skillCategory);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    const skillCategory = await SkillCategoryModel.findByIdAndDelete(id);
    if (!skillCategory) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 500 });
  }
}
