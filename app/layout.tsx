import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { getSiteData, getSocialsData } from '@/lib/api';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import WhatsAppButton from '@/components/WhatsAppButton';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch global footer and header configurations at server level
  const [siteInfo, socials] = await Promise.all([
    getSiteData(),
    getSocialsData()
  ]);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Navbar siteInfo={siteInfo} />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer siteInfo={siteInfo} socials={socials} />
          <WhatsAppButton phoneNumber="916266531716" />
        </ThemeProvider>
      </body>
    </html>
  );
}
