import { Project } from '@/types';

export const printMediaProject: Project = {
  title: 'Print Media Suite — TechSummit India 2024',
  slug: 'print-media-techsummit-2024',
  category: 'Print',
  description: 'End-to-end print media design for a large-scale technology conference — event brochures, speaker banners, roll-ups, stage backdrops, and badge systems.',
  coverImage: 'https://picsum.photos/seed/print-med/800/500',
  gallery: [
    'https://picsum.photos/seed/print-med-1/800/500',
    'https://picsum.photos/seed/print-med-2/800/500',
    'https://picsum.photos/seed/print-med-3/800/500',
  ],
  tools: ['Adobe InDesign', 'Adobe Illustrator', 'Adobe Photoshop', 'CorelDRAW'],
  year: 2023,
  client: 'Fakhri IT Services India Pvt. Ltd.',
  services: ['Print Design', 'Event Collateral', 'Roll-Up Banners', 'Brochure Design'],
  challenge: "TechSummit India 2024 needed a complete visual system for a 2-day conference hosting 1,200+ attendees with 40+ speakers. The challenge was creating a unified print system from A4 brochures to 12×8 ft stage backdrops that all maintained visual consistency under tight 5-day delivery deadlines.",
  solution: "Designed a modular visual system based on a geometric pattern language that scaled from business card to billboard. Delivered 24 distinct print files including 6 roll-up banner variants, 4 brochure formats, 3 stage backdrop sizes, directional signage, and delegate badge templates — all print-vendor ready.",
  results: [
    'All 24 print files delivered 12 hours before deadline.',
    'Zero revision requests from print vendor on final artwork.',
    '100% consistency maintained across all print sizes and formats.',
  ],
  colors: ['#2563EB', '#111827', '#FFFFFF'],
  tags: ['Print Design', 'Event Branding', 'InDesign', 'Large Format'],
  featured: false,
  seo: {
    title: 'TechSummit India 2024 Print Design — Atul Bangre',
    description: 'Complete print media design suite for TechSummit India 2024 conference by Atul Bangre — banners, brochures, backdrops.',
    keywords: ['print media designer', 'event branding India', 'conference design'],
  },
};

export default printMediaProject;
