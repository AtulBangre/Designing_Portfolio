'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle2, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import { AboutInfo, SiteInfo } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface AboutProps {
  aboutInfo: AboutInfo & { education: string };
  siteInfo: SiteInfo;
}

export const About: React.FC<AboutProps> = ({ aboutInfo, siteInfo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInnerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo parallax on scroll
      if (photoRef.current && photoInnerRef.current) {
        gsap.to(photoInnerRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Photo card entrance
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, x: -60, rotationY: 8 },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Experience badge pop
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.5, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'back.out(2)',
          delay: 0.4,
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Bio block
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      // Highlight points — stagger with clip reveal
      if (highlightsRef.current) {
        const items = highlightsRef.current.querySelectorAll('.highlight-item');
        gsap.fromTo(
          items,
          { opacity: 0, x: -30, clipPath: 'inset(0 100% 0 0)' },
          {
            opacity: 1,
            x: 0,
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Meta info row
      if (metaRef.current) {
        const items = metaRef.current.querySelectorAll('.meta-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: metaRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Subtle bg accent */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="Biography"
          description="A design generalist with an e-commerce branding mindset."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Photo */}
          <div ref={photoRef} className="lg:col-span-5 flex justify-center opacity-0">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl overflow-hidden glass p-3 border border-card-border/80 group animated-border">
              <div ref={photoInnerRef} className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-tr from-accent/20 to-primary/10">
                <Image
                  src="https://picsum.photos/seed/atul-portrait/400/400"
                  alt={siteInfo.name}
                  fill
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Experience Badge */}
              <div
                ref={badgeRef}
                className="absolute bottom-6 right-6 glass px-4 py-2.5 rounded-xl border border-accent/20 shadow-lg flex items-center gap-2 select-none accent-glow-shadow opacity-0"
              >
                <span className="text-2xl font-bold text-accent font-heading leading-none">
                  {aboutInfo.yearsOfExperience}+
                </span>
                <span className="text-[10px] text-muted-text uppercase font-semibold leading-tight font-sans">
                  Years of<br />Experience
                </span>
              </div>
            </div>
          </div>

          {/* Bio Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div ref={bioRef} className="flex flex-col gap-4 opacity-0">
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-primary leading-tight">
                Designing visual experiences that turn clicks into conversions.
              </h3>
              <p className="text-base text-muted-text font-sans leading-relaxed">
                {aboutInfo.bio}
              </p>
            </div>

            {/* Highlights */}
            <div ref={highlightsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              {aboutInfo.highlightPoints.map((point, idx) => (
                <div key={idx} className="highlight-item flex items-start gap-3 opacity-0">
                  <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={18} />
                  <span className="text-sm font-medium font-sans text-primary">{point}</span>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div ref={metaRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border-line/60 pt-6 mt-2">
              {[
                { icon: <MapPin size={18} className="text-accent/80 shrink-0" />, content: <span>{siteInfo.location}</span> },
                { icon: <GraduationCap size={18} className="text-accent/80 shrink-0" />, content: <span>{aboutInfo.education}</span> },
                { icon: <Mail size={18} className="text-accent/80 shrink-0" />, content: <a href={`mailto:${siteInfo.email}`} className="hover:text-accent transition-colors">{siteInfo.email}</a> },
                { icon: <Phone size={18} className="text-accent/80 shrink-0" />, content: <span>{siteInfo.phone}</span> },
              ].map((item, i) => (
                <div key={i} className="meta-item flex items-center gap-3 text-sm text-muted-text opacity-0">
                  {item.icon}
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
