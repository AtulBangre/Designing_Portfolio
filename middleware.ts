import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware — protects /admin/dashboard from unauthenticated access.
 * The login page at /admin is always accessible.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const sessionCookie = request.cookies.get('admin_session');

    if (!sessionCookie || sessionCookie.value !== 'authenticated') {
      // Redirect to login page
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
