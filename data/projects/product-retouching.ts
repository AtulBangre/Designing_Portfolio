import { Project } from '@/types';

export const productRetouchingProject: Project = {
  title: 'Product Photo Retouching — Zeta Skincare',
  slug: 'product-retouching-zeta-skincare',
  category: 'Product Editing',
  description: 'High-end product photo retouching and compositing for a luxury skincare brand — 80+ SKU images optimised for Amazon, Nykaa, and brand website use.',
  coverImage: 'https://picsum.photos/seed/product-ret/800/500',
  gallery: [
    'https://picsum.photos/seed/product-ret-1/800/500',
    'https://picsum.photos/seed/product-ret-2/800/500',
    'https://picsum.photos/seed/product-ret-3/800/500',
    'https://picsum.photos/seed/product-ret-4/800/500',
  ],
  tools: ['Adobe Photoshop', 'Adobe Lightroom', 'Capture One'],
  year: 2024,
  client: 'Zeta Skincare',
  services: ['Product Retouching', 'Background Removal', 'Color Grading', 'Shadow Creation'],
  challenge: "Zeta Skincare had 80+ product SKUs photographed in-house with inconsistent lighting, visible dust, and off-brand background tones. Images were failing Amazon quality guidelines and looked amateurish compared to competitor listings.",
  solution: "Retouched all 80+ images with professional clipping paths, consistent white backgrounds meeting Amazon's 255/255/255 standard, specular highlight correction, label sharpening, and custom floating shadow composites for a premium tactile look. Delivered in 4 export variants per image (Amazon main, Amazon lifestyle, Nykaa square, WebP compressed).",
  results: [
    '80+ images fully approved by Amazon quality review on first submission.',
    'Average listing CTR improved by 31% after image upgrade.',
    'Brand reported 12% increase in Nykaa add-to-cart rate.',
  ],
  colors: ['#E8D5C4', '#2D2D2D', '#C9A882'],
  tags: ['Product Retouching', 'Amazon', 'Photo Editing', 'E-Commerce'],
  featured: false,
  seo: {
    title: 'Zeta Skincare Product Retouching — Atul Bangre',
    description: 'Professional product photo retouching for Zeta Skincare by Atul Bangre — 80+ SKUs optimised for Amazon, Nykaa, and web.',
    keywords: ['product photo retouching India', 'Amazon product images', 'e-commerce photo editing'],
  },
};

export default productRetouchingProject;
