'use client';

import React, { useRef, useEffect } from 'react';
import { Search, PenTool, Palette, RefreshCw, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    { step: '01', title: 'Discovery & Strategy', description: 'Analyzing competitor listings, researching search queries, assessing target demographics, and outlining core USP goals.', icon: Search },
    { step: '02', title: 'Wireframing & Copy', description: 'Establishing grid blocks, placing text overlays, arranging content flows, and mapping out the benefit callouts.', icon: PenTool },
    { step: '03', title: 'High-Fidelity Design', description: 'Designing visual compositions in Photoshop, rendering packaging labels in CorelDRAW, or building UI layouts in Figma.', icon: Palette },
    { step: '04', title: 'Revision & Review', description: 'Gathering feedback on listing graphics, refining color contrast, testing mobile sizing, and finalizing copy grids.', icon: RefreshCw },
    { step: '05', title: 'Delivery & Launch', description: 'Exporting web/print-ready files, delivering vector packages, and uploading A+ layouts directly to Seller Central.', icon: CheckCircle },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards flip-up with rotateX
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll<HTMLElement>('.process-card');

        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, rotateX: 18, transformPerspective: 800 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );

        // Step number count up
        cards.forEach((card, idx) => {
          const numEl = card.querySelector<HTMLElement>('.step-num');
          if (!numEl) return;
          const target = idx + 1;
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 0.8,
            delay: idx * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
            onUpdate() {
              numEl.textContent = String(Math.round(counter.val)).padStart(2, '0');
            },
          });
        });
      }

      // Connector lines draw in
      if (connectorRef.current) {
        const lines = connectorRef.current.querySelectorAll<HTMLElement>('.connector-line');
        gsap.fromTo(
          lines,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: connectorRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-20 md:py-28 relative overflow-hidden bg-muted-light/30 dark:bg-zinc-950/20 border-y border-border-line/40"
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader
          title="My Creative Process"
          subtitle="Roadmap"
          description="How I take design projects from initial strategies to final conversion-focused deliverables."
        />

        {/* Connector track (desktop only) */}
        <div ref={connectorRef} className="hidden lg:flex items-center justify-between px-4 mb-4 relative">
          {steps.map((_, idx) => (
            <React.Fragment key={idx}>
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 z-10">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              {idx < steps.length - 1 && (
                <div className="connector-line flex-1 h-0.5 bg-gradient-to-r from-accent/40 to-accent/10 mx-1" style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Process Steps */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="process-card relative group opacity-0" style={{ transformStyle: 'preserve-3d' }}>
                <Card
                  variant="glass"
                  className="h-full p-6 flex flex-col justify-between gap-6 border border-card-border/80 animated-border"
                  hoverEffect
                >
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-accent/5 dark:bg-accent/15 text-accent border border-accent/10 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                        <Icon size={18} />
                      </div>
                      <span
                        className="step-num text-3xl font-bold font-heading text-border-line/80 dark:text-zinc-800/80 group-hover:text-accent/30 transition-colors duration-500 leading-none counter-number"
                      >
                        {item.step}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-base md:text-lg font-bold font-heading text-primary group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-text font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-accent to-emerald-400 rounded-full group-hover:w-full transition-all duration-500" />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
