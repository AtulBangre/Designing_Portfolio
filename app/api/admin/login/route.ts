import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
    }

    if (password !== correctPassword) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    // Set session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
