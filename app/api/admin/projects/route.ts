import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Project } from '@/models/Project';

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find().sort({ year: -1 }).lean();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const project = await Project.create(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
  }
}
