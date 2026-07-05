'use client';

import React, { useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { ServiceItem } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ServicesProps {
  services: ServiceItem[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    const LucideIcon = (Icons as any)[iconName];
    if (LucideIcon) return <LucideIcon size={24} className="text-accent group-hover:text-white transition-colors duration-500" />;
    return <Icons.HelpCircle size={24} className="text-accent" />;
  };

  useEffect(() => {
    const cleanups = new Map<HTMLElement, () => void>();
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll<HTMLElement>('.service-card');

      // ScrollTrigger batch for staggered entrance
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        onEnter: batch => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',
            }
          );
        },
        once: true,
      });

      // 3D tilt effect per card
      cards.forEach(card => {
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
          const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
          gsap.to(card, {
            rotationX: rx,
            rotationY: ry,
            transformPerspective: 800,
            duration: 0.4,
            ease: 'power2.out',
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          });
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanups.set(card, () => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });
    }, sectionRef);

    return () => {
      cleanups.forEach(cleanup => cleanup());
      ctx.revert();
    };
  }, [services]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 md:py-28 relative overflow-hidden bg-muted-light/30 dark:bg-zinc-950/20 border-y border-border-line/40"
    >
      {/* Decorative orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader
          title="My Services"
          subtitle="Offerings"
          description="High-fidelity visual design tailored for premium brands and e-commerce conversions."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map(service => (
            <div key={service.id} className="service-card tilt-card opacity-0" style={{ transformStyle: 'preserve-3d' }}>
              <Card
                variant="glass"
                className="h-full p-6 md:p-8 flex flex-col items-start gap-5 group animated-border border border-card-border/80"
                hoverEffect
              >
                {/* Icon */}
                <div className="p-3.5 rounded-2xl bg-accent/5 dark:bg-accent/15 border border-accent/10 group-hover:scale-110 group-hover:bg-accent transition-all duration-500">
                  {getIcon(service.iconName)}
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-lg md:text-xl font-bold font-heading text-primary group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-text font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover shimmer line */}
                <div className="w-0 h-0.5 bg-gradient-to-r from-accent to-emerald-400 rounded-full mt-auto group-hover:w-full transition-all duration-500" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
