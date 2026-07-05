'use client';

import React, { useRef, useEffect } from 'react';
import { SkillCategory } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SkillsProps {
  skillsCategories: SkillCategory[];
}

// SVG ring progress component
const RingProgress: React.FC<{ level: number; size?: number }> = ({ level, size = 44 }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!circleRef.current) return;
    const el = circleRef.current;
    el.style.strokeDasharray = `${circumference}`;
    el.style.strokeDashoffset = `${circumference}`;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          strokeDashoffset: circumference * (1 - level / 100),
          duration: 1.4,
          ease: 'power2.out',
          delay: Math.random() * 0.3,
        });
      },
    });
    return () => trigger.kill();
  }, [level, circumference]);

  return (
    <svg width={size} height={size} viewBox="0 0 44 44" className="shrink-0 -rotate-90">
      <circle cx="22" cy="22" r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-border-line/30 dark:text-zinc-800" />
      <circle
        ref={circleRef}
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="url(#ring-grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Skills: React.FC<SkillsProps> = ({ skillsCategories }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Marquee strip of all tool names
  const allSkillNames = skillsCategories.flatMap(c => c.skills.map(s => s.name));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.skill-cat-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      // Animate skill progress bars
      sectionRef.current?.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach(bar => {
        const target = bar.dataset.level ?? '0';
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${target}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [skillsCategories]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 md:py-28 relative overflow-hidden bg-muted-light/20 dark:bg-zinc-950/10 border-y border-border-line/40"
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader
          title="Skills & Tools"
          subtitle="Expertise"
          description="My design capabilities and professional software proficiency levels."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {skillsCategories.map((category, catIdx) => (
            <div key={catIdx} className="skill-cat-card col-span-1 opacity-0">
              <Card
                variant="glass"
                className="p-6 md:p-8 h-full flex flex-col gap-6 animated-border border border-card-border/80"
                hoverEffect={false}
              >
                <h3 className="text-lg md:text-xl font-bold font-heading text-primary border-b border-border-line/40 pb-3">
                  {category.title}
                </h3>

                <div className="flex flex-col gap-5">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm font-medium font-sans">
                        <div className="flex items-center gap-2.5">
                          <RingProgress level={skill.level} size={36} />
                          <span className="text-primary">{skill.name}</span>
                        </div>
                        <span className="text-accent font-bold tabular-nums">{skill.level}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-1.5 w-full bg-border-line/30 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="skill-bar-fill h-full bg-gradient-to-r from-accent to-emerald-400 rounded-full"
                          data-level={skill.level}
                          style={{ width: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Marquee skills strip */}
        {allSkillNames.length > 0 && (
          <div className="mt-16 overflow-hidden py-4 border-y border-border-line/30">
            <div className="marquee-track gap-8 items-center">
              {[...allSkillNames, ...allSkillNames].map((name, i) => (
                <span
                  key={i}
                  className="text-sm font-medium text-muted-text/60 uppercase tracking-widest whitespace-nowrap px-4 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50 inline-block shrink-0" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
