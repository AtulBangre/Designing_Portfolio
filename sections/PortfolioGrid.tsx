'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Lightbox from '@/components/Lightbox';
import { gsap } from '@/lib/gsap';

interface PortfolioGridProps {
  projects: Project[];
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects }) => {
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleOpenLightbox = (project: Project) => {
    setActiveProject(project);
    setLightboxOpen(true);
  };

  // Set the first project as hovered when the filter changes
  useEffect(() => {
    if (filteredProjects.length > 0) {
      setHoveredProject(filteredProjects[0]);
    } else {
      setHoveredProject(null);
    }
  }, [activeFilter, projects, filteredProjects]);

  const listRef = useRef<HTMLDivElement>(null);

  // List entrance animation on filter change
  useEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      const items = listRef.current!.querySelectorAll('.portfolio-row');
      gsap.fromTo(
        items,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Floating bg orbs */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader
          title="Featured Works"
          subtitle="Portfolio"
          description="A selection of conversion-focused designs, brand identities, and premium web layouts."
        />

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap gap-2 justify-start md:justify-center mb-16 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer select-none border whitespace-nowrap active:scale-95 ${
                activeFilter === cat
                  ? 'bg-primary text-background border-transparent shadow-md'
                  : 'bg-muted-light border-border-line hover:border-accent/40 text-muted-text hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* New Layout: Interactive List (Left) + Sticky Image (Right) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative min-h-[600px]">
          
          {/* Left Column: Projects List */}
          <div className="w-full lg:w-[55%] flex flex-col" ref={listRef}>
            {filteredProjects.map((project, idx) => (
              <div
                key={project.slug}
                onMouseEnter={() => setHoveredProject(project)}
                onClick={() => handleOpenLightbox(project)}
                className="portfolio-row group border-b border-border-line/50 first:border-t py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer relative"
              >
                {/* Hover Background Fill */}
                <div className="absolute inset-0 bg-muted-light/40 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out -z-10 rounded-xl"></div>

                {/* Left Side: Number + Title */}
                <div className="flex flex-col gap-2 relative z-10 px-2 md:px-4">
                  <span className="text-xs font-medium text-accent tracking-widest uppercase font-sans">
                    {String(idx + 1).padStart(2, '0')} — {project.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-primary group-hover:translate-x-3 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                </div>

                {/* Right Side: Client + Icon */}
                <div className="flex items-center gap-6 relative z-10 px-2 md:px-4 mt-2 md:mt-0">
                  <span className="text-sm text-muted-text font-medium hidden md:block group-hover:text-primary transition-colors duration-300">
                    {project.client}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-border-line flex items-center justify-center group-hover:bg-primary group-hover:text-background group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight size={20} className="transform group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* Mobile Image (Visible only on screens < lg) */}
                <div className="lg:hidden mt-6 w-full aspect-video relative rounded-2xl overflow-hidden border border-border-line/30 shadow-sm">
                  <Image
                    src={project.coverImage}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={project.title}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="backdrop-blur-md bg-black/50 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      View Project
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Image Gallery (Desktop Only) */}
          <div className="hidden lg:block w-[45%] relative">
            <div className="sticky top-32 h-[650px] w-full rounded-3xl overflow-hidden border border-border-line/30 bg-muted-light/20 shadow-2xl">
              <AnimatePresence mode="wait">
                {hoveredProject && (
                  <motion.div
                    key={hoveredProject.slug}
                    initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
                    animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                    exit={{ clipPath: 'inset(0 0 100% 0)', scale: 0.95 }}
                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={hoveredProject.coverImage}
                      fill
                      className="object-cover"
                      alt={hoveredProject.title}
                      priority
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Project info inside the image box */}
                    <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-3">
                      <div className="flex gap-2 flex-wrap">
                        {hoveredProject.tools.slice(0, 3).map((tool, i) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full border border-white/20 text-white backdrop-blur-sm">
                            {tool}
                          </span>
                        ))}
                      </div>
                      <p className="text-white/90 font-medium text-lg leading-snug line-clamp-2 pr-4">
                        {hoveredProject.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        images={activeProject ? [activeProject.coverImage, ...activeProject.gallery] : []}
        currentIndex={0}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        project={activeProject}
      />
    </section>
  );
};

export default PortfolioGrid;
