import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Experience } from '@/models/Experience';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    const data = await request.json();
    const exp = await Experience.findByIdAndUpdate(id, data, { new: true });
    if (!exp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(exp);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    const exp = await Experience.findByIdAndDelete(id);
    if (!exp) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Delete failed' }, { status: 500 });
  }
}
