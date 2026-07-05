'use client';

import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex: initialIndex,
  isOpen,
  onClose,
  project
}) => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, index]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between p-4 md:p-6 text-white/70 z-10 shrink-0">
        <span className="text-sm font-medium font-sans bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          {index + 1} / {images.length}
        </span>
        <button 
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer backdrop-blur-md"
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center px-4 md:px-16 min-h-0">
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/10 active:scale-95 z-20"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/10 active:scale-95 z-20"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-300">
          <Image
            src={images[index]}
            alt={`Gallery showcase image ${index + 1}`}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Footer (Project Details & Actions) */}
      <div className="w-full shrink-0 flex flex-col items-center gap-4 pb-6 pt-4 px-4 bg-gradient-to-t from-black/80 to-transparent z-10">
        
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 max-w-full overflow-x-auto p-1 scrollbar-none mb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  idx === index ? 'border-accent scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Project Info Bar */}
        {project && (
          <div className="w-full max-w-3xl glass px-6 py-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
            <div className="flex flex-col text-center md:text-left gap-1">
              <h3 className="text-xl md:text-2xl font-bold font-heading text-white">{project.title}</h3>
              <p className="text-sm text-white/60 font-medium tracking-wide">
                {project.category} • {project.year}
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              {project.projectUrl && (
                <a 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
                >
                  <span>Visit Project</span>
                  <ExternalLink size={16} />
                </a>
              )}
              <Link
                href="#contact"
                onClick={onClose}
                className="flex-1 md:flex-none flex items-center justify-center px-6 py-2.5 rounded-full bg-accent hover:bg-accent/90 text-white text-sm font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]"
              >
                Hire Me
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
