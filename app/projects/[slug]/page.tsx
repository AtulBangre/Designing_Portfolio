import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, ShoppingBag, Wrench, ChevronRight, Award } from 'lucide-react';
import { getProjectBySlug, getRelatedProjects } from '@/lib/api';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import ProjectDetailsClient from './ProjectDetailsClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  if (!project) {
    return {
      title: 'Project Not Found | Atul Bangre Portfolio',
    };
  }

  return {
    title: `${project.seo.title} | Atul Bangre Design`,
    description: project.seo.description,
    keywords: project.seo.keywords.join(', '),
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      type: 'article',
      images: [
        {
          url: project.coverImage,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.slug, project.category, 3);

  return (
    <div className="py-24 md:py-32 relative bg-background">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/#portfolio" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-text hover:text-accent transition-colors font-sans select-none"
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Project Header Banner */}
        <div className="mb-12">
          <div className="flex flex-col gap-3 max-w-3xl mb-8">
            <span className="text-xs md:text-sm font-semibold tracking-widest text-accent uppercase font-heading">
              {project.category} Case Study
            </span>
            <h1 className="text-3xl md:text-6xl font-bold font-heading tracking-tight text-primary leading-tight">
              {project.title}
            </h1>
          </div>

          {/* Large cover image view */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted-light dark:bg-zinc-900 border border-card-border/80 shadow-lg">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
          
          {/* Main Case Study Text Column */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* The Challenge */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-primary border-b border-border-line/40 pb-2">
                The Challenge
              </h2>
              <p className="text-sm md:text-base text-muted-text font-sans leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-primary border-b border-border-line/40 pb-2">
                The Solution & Process
              </h2>
              <p className="text-sm md:text-base text-muted-text font-sans leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* The Results */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-primary border-b border-border-line/40 pb-2">
                Key Deliverable Results
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {project.results.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl glass border border-card-border/40">
                    <div className="p-2.5 rounded-lg bg-accent/5 dark:bg-accent/15 text-accent border border-accent/10 shrink-0">
                      <Award size={18} />
                    </div>
                    <p className="text-sm md:text-base text-primary font-medium font-sans mt-1">
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive gallery showcasing details (Client side Lightbox loader wrapper) */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-primary border-b border-border-line/40 pb-2">
                Design Gallery Showcase
              </h2>
              <p className="text-xs md:text-sm text-muted-text font-sans mb-2">
                Click on any design below to examine details inside our zoom lightbox view.
              </p>
              
              {/* Client Component */}
              <ProjectDetailsClient project={project} />
            </div>
          </div>

          {/* Quick Specifications Metadata Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-8 sticky top-28">
            <Card variant="glass" className="p-6 md:p-8 flex flex-col gap-6 border border-card-border/80" hoverEffect={false}>
              <h3 className="text-lg font-bold font-heading text-primary border-b border-border-line/40 pb-3">
                Project Specifications
              </h3>
              
              <div className="flex flex-col gap-5">
                {/* Client info */}
                <div className="flex items-start gap-3">
                  <User size={18} className="text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col font-sans">
                    <span className="text-[10px] text-muted-text uppercase font-semibold">Client</span>
                    <span className="text-sm font-medium text-primary">{project.client}</span>
                  </div>
                </div>

                {/* Year info */}
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col font-sans">
                    <span className="text-[10px] text-muted-text uppercase font-semibold">Year</span>
                    <span className="text-sm font-medium text-primary">{project.year}</span>
                  </div>
                </div>

                {/* Services info */}
                <div className="flex items-start gap-3">
                  <ShoppingBag size={18} className="text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col font-sans">
                    <span className="text-[10px] text-muted-text uppercase font-semibold">Services</span>
                    <div className="flex flex-col gap-1 mt-1">
                      {project.services.map((srv, idx) => (
                        <span key={idx} className="text-sm font-medium text-primary flex items-center gap-1.5">
                          <ChevronRight size={12} className="text-accent" />
                          <span>{srv}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tools info */}
                <div className="flex items-start gap-3">
                  <Wrench size={18} className="text-accent shrink-0 mt-0.5" />
                  <div className="flex flex-col font-sans">
                    <span className="text-[10px] text-muted-text uppercase font-semibold">Design Tools Used</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tools.map((tool, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Colors palette */}
                <div className="flex flex-col gap-2 pt-4 border-t border-border-line/40">
                  <span className="text-[10px] text-muted-text uppercase font-semibold font-sans">Brand Color Palette</span>
                  <div className="flex items-center gap-2 mt-1">
                    {project.colors.map((hex, idx) => (
                      <div 
                        key={idx} 
                        className="w-8 h-8 rounded-full border border-card-border shadow-sm flex items-center justify-center font-sans text-[8px]"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick WhatsApp / Hire info */}
            <Card variant="glass" className="p-6 md:p-8 flex flex-col gap-4 border border-card-border/85" hoverEffect={false}>
              <h4 className="text-base font-bold font-heading text-primary">Interested in similar designs?</h4>
              <p className="text-xs text-muted-text font-sans leading-relaxed">
                Contact Atul Bangre to start wireframing your brand storefront design or A+ catalog layouts.
              </p>
              <Button href="#contact" variant="primary" size="sm" className="w-full justify-center">
                Hire Atul Bangre
              </Button>
            </Card>
          </div>
        </div>

        {/* Related Projects Carousel Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 border-t border-border-line/40 pt-16">
            <h3 className="text-xl md:text-3xl font-bold font-heading text-primary mb-8">
              Related Case Studies
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relProject) => (
                <Link key={relProject.slug} href={`/projects/${relProject.slug}`}>
                  <Card variant="glass" className="group h-full flex flex-col cursor-pointer border border-card-border/80" hoverEffect>
                    <div className="relative aspect-video w-full overflow-hidden bg-muted-light dark:bg-zinc-900 border-b border-border-line/40">
                      <Image
                        src={relProject.coverImage}
                        alt={relProject.title}
                        fill
                        sizes="(max-w-768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] text-accent uppercase font-bold tracking-wider">{relProject.category}</span>
                        <h4 className="text-sm md:text-base font-bold font-heading text-primary group-hover:text-accent transition-colors">
                          {relProject.title}
                        </h4>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
