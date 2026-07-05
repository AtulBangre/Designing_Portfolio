import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    // There is only one settings document. We update it or create if it doesn't exist.
    const settings = await SiteSettings.findOneAndUpdate({}, data, { new: true, upsert: true });
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Update failed' }, { status: 500 });
  }
}
