'use client';

import React, { useRef, useEffect } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { ExperienceItem } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line drawing downward
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      if (!timelineRef.current) return;
      const cards = timelineRef.current.querySelectorAll<HTMLElement>('.exp-card');
      const dots = timelineRef.current.querySelectorAll<HTMLElement>('.exp-dot');

      cards.forEach((card, idx) => {
        const isEven = idx % 2 === 0;
        gsap.fromTo(
          card,
          { opacity: 0, x: isEven ? -60 : 60, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      dots.forEach(dot => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [experience]);

  return (
    <section ref={sectionRef} id="experience" className="py-20 md:py-28 relative overflow-hidden bg-background">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader
          title="Work Experience"
          subtitle="Timeline"
          description="My design career path working with digital agencies and printing firms."
        />

        <div className="relative max-w-4xl mx-auto" ref={timelineRef}>
          {/* Animated vertical timeline line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-transparent -translate-x-1/2 -z-10"
            style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
          />

          <div className="flex flex-col gap-12">
            {experience.map((job, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={job.id}
                  className={`flex flex-col md:flex-row items-stretch w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Card */}
                  <div className={`exp-card w-full md:w-[45%] flex flex-col justify-center pl-8 md:pl-0 opacity-0`}>
                    <Card
                      variant="glass"
                      className="p-6 md:p-8 flex flex-col gap-4 border border-card-border/80 animated-border"
                      hoverEffect
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
                          <Calendar size={12} />
                          <span>{job.duration}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold font-heading text-primary">{job.role}</h3>
                        <h4 className="text-sm font-semibold text-muted-text">{job.company}</h4>
                      </div>

                      <ul className="flex flex-col gap-2.5 mt-2">
                        {job.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-muted-text font-sans leading-relaxed flex items-start gap-2.5">
                            <span className="text-accent mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-accent" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {job.skillsLearned && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-line/40 mt-1">
                          {job.skillsLearned.map((skill, sIdx) => (
                            <Badge key={sIdx} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>

                  {/* Dot Node */}
                  <div className="exp-dot absolute left-4 md:left-1/2 w-9 h-9 rounded-full bg-background border-[3px] border-accent -translate-x-1/2 flex items-center justify-center shadow-lg z-10 -mt-2 md:mt-12 accent-glow-shadow opacity-0" style={{ scale: 0 }}>
                    <Briefcase size={13} className="text-accent" />
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-accent/30 animate-ping" style={{ animationDuration: '2.5s' }} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
