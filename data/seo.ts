import { SeoConfig } from '@/types';

export const seoData: SeoConfig = {
  defaultTitle: 'Atul Bangre | Senior E-commerce Brand & UI/UX Designer',
  titleTemplate: '%s | Atul Bangre Design',
  defaultDescription: 'Portfolio of Atul Bangre, Senior E-commerce Brand Designer with 2+ years of experience. Specializing in Amazon A+ Content (EBC), Brand Stores, Product Listing Images, and Web UI/UX Design.',
  canonicalUrl: 'https://atulbangre.design',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Atul Bangre Portfolio',
    images: [
      {
        url: 'https://atulbangre.design/projects/featured-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Atul Bangre Portfolio - E-commerce Brand & UI/UX Design',
      }
    ]
  },
  twitter: {
    handle: '@atuloscp',
    site: '@atuloscp',
    cardType: 'summary_large_image',
  }
};
