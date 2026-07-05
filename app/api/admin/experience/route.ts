import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Experience } from '@/models/Experience';

export async function GET() {
  try {
    await connectToDatabase();
    const experiences = await Experience.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const exp = await Experience.create(data);
    return NextResponse.json(exp, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create experience' }, { status: 500 });
  }
}
