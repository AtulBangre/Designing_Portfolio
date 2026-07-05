import { Metadata } from 'next';
import { 
  getHeroData, 
  getAboutData, 
  getServicesData, 
  getExperienceData, 
  getSkillsData, 
  getAllProjects, 
  getTestimonialsData, 
  getFaqData, 
  getContactData, 
  getSocialsData, 
  getSiteData,
  getSeoData
} from '@/lib/api';

// Sections
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Experience from '@/sections/Experience';
import Skills from '@/sections/Skills';
import PortfolioGrid from '@/sections/PortfolioGrid';
import Process from '@/sections/Process';
import Testimonials from '@/sections/Testimonials';
import FAQ from '@/sections/FAQ';
import Contact from '@/sections/Contact';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoData();
  const site = await getSiteData();
  const about = await getAboutData();
  const socials = await getSocialsData();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': site.name,
    'description': about.bio,
    'image': 'https://atulbangre.design/profile.jpg',
    'email': site.email,
    'telephone': site.phone,
    'url': 'https://atulbangre.design',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Bhopal',
      'addressRegion': 'Madhya Pradesh',
      'addressCountry': 'India'
    },
    'knowsAbout': [
      'Amazon A+ Content',
      'Amazon Brand Store Design',
      'Product Listing Images',
      'UI/UX Design',
      'Website Design',
      'Brand Identity',
      'Packaging Design'
    ],
    'sameAs': [
      socials.linkedin,
      socials.behance,
      socials.dribbble,
      socials.github
    ]
  };

  return {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      url: seo.canonicalUrl,
      siteName: seo.openGraph.siteName,
      locale: seo.openGraph.locale,
      type: 'website',
      images: seo.openGraph.images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt
      }))
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      site: seo.twitter.site,
      creator: seo.twitter.handle
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd)
    }
  };
}

export default async function Home() {
  // Fetch section data in parallel for optimal rendering speed
  const [
    siteInfo,
    heroInfo,
    aboutInfo,
    services,
    experience,
    skills,
    projects,
    testimonials,
    faq,
    contactInfo,
    socials
  ] = await Promise.all([
    getSiteData(),
    getHeroData(),
    getAboutData(),
    getServicesData(),
    getExperienceData(),
    getSkillsData(),
    getAllProjects(),
    getTestimonialsData(),
    getFaqData(),
    getContactData(),
    getSocialsData()
  ]);

  return (
    <>
      <main className="flex-1 w-full">
        {/* Sections layout */}
        <Hero heroInfo={heroInfo} achievements={aboutInfo.achievements} />
        <About aboutInfo={aboutInfo} siteInfo={siteInfo} />
        <Services services={services} />
        <Experience experience={experience} />
        <Skills skillsCategories={skills} />
        <PortfolioGrid projects={projects} />
        <Process />
        <Testimonials testimonials={testimonials} />
        <FAQ faq={faq} />
        <Contact contactInfo={contactInfo} socials={socials} />
      </main>
    </>
  );
}
