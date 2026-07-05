import { Project } from '@/types';

export const uiuxLandingProject: Project = {
  title: 'UI/UX Design — Shopify Store Redesign for Kinetix',
  slug: 'uiux-shopify-redesign-kinetix',
  category: 'UI/UX',
  description: 'Complete UI/UX redesign for a Shopify-based fitness wearables storefront — from UX audit and wireframing to pixel-perfect Figma prototypes handed off to developers.',
  coverImage: 'https://picsum.photos/seed/uiux-land/800/500',
  gallery: [
    'https://picsum.photos/seed/uiux-land-1/800/500',
    'https://picsum.photos/seed/uiux-land-2/800/500',
    'https://picsum.photos/seed/uiux-land-3/800/500',
  ],
  tools: ['Figma', 'Adobe Photoshop', 'FigJam'],
  year: 2024,
  client: 'Kinetix Wearables',
  services: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Design System', 'Figma Handoff'],
  challenge: "Kinetix's Shopify store had a 72% mobile bounce rate, a complicated checkout flow with 6 steps, and no brand consistency between product pages and the homepage. They needed a full redesign without disrupting live sales.",
  solution: "Conducted a comprehensive UX audit using heatmap data, then redesigned the full site across 18 screens in Figma — including a sticky product configurator on PDP, a simplified 3-step checkout, a brand video hero, and a design token system for easy developer implementation. Included accessibility WCAG 2.1 AA review.",
  results: [
    'Mobile bounce rate reduced from 72% to 41% within 2 weeks of launch.',
    'Checkout completion rate increased by 28%.',
    'Design system of 120+ components saved 40+ dev hours.',
  ],
  colors: ['#6366F1', '#F8FAFC', '#F59E0B'],
  tags: ['UI/UX Design', 'Shopify', 'Figma', 'E-Commerce', 'Design System'],
  featured: true,
  seo: {
    title: 'Kinetix Shopify UI/UX Redesign — Atul Bangre Portfolio',
    description: 'Full Shopify store UI/UX redesign for Kinetix Wearables by Atul Bangre — wireframes, Figma prototype, and developer handoff.',
    keywords: ['UI/UX designer India', 'Shopify redesign', 'Figma designer Bhopal'],
  },
};

export default uiuxLandingProject;
