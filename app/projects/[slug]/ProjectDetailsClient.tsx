'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { Project } from '@/types';
import Lightbox from '@/components/Lightbox';

interface ProjectDetailsClientProps {
  project: Project;
}

export const ProjectDetailsClient: React.FC<ProjectDetailsClientProps> = ({ project }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Group cover image and gallery images for the lightbox sliding list
  const allImages = [project.coverImage, ...project.gallery];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Render Cover image first */}
        <div 
          onClick={() => handleOpenLightbox(0)}
          className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted-light dark:bg-zinc-900 border border-card-border/60 shadow-sm cursor-zoom-in group select-none"
        >
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(max-w-768px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="p-2 rounded-full bg-white/90 text-black shadow-md">
              <Eye size={16} />
            </div>
          </div>
        </div>

        {/* Render Gallery images */}
        {project.gallery.map((img, idx) => (
          <div 
            key={idx}
            onClick={() => handleOpenLightbox(idx + 1)}
            className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted-light dark:bg-zinc-900 border border-card-border/60 shadow-sm cursor-zoom-in group select-none"
          >
            <Image
              src={img}
              alt={`${project.title} gallery detail ${idx + 1}`}
              fill
              sizes="(max-w-768px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="p-2 rounded-full bg-white/90 text-black shadow-md">
                <Eye size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox for zooming details */}
      <Lightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default ProjectDetailsClient;
