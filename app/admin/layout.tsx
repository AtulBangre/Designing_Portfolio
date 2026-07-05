import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS Admin | Atul Bangre Portfolio',
  description: 'Portfolio content management system',
  robots: { index: false, follow: false },
};

/**
 * Admin layout — intentionally does NOT include the main site's
 * Navbar or Footer, so the CMS is a completely separate experience.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
