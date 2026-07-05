import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { SiteSettings } from '@/models/SiteSettings';

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();

    if (!settings || !settings.resumeFileData) {
      return new NextResponse('Resume not found', { status: 404 });
    }

    // resumeFileData is stored as a base64 string (e.g. data:application/pdf;base64,JVBERi0xLj...)
    const matches = settings.resumeFileData.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return new NextResponse('Invalid file data', { status: 500 });
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `inline; filename="${settings.resumeFileName || 'resume.pdf'}"`);

    return new NextResponse(buffer, { headers });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
