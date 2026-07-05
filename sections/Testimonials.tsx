'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialItem } from '@/types';
import SectionHeader from '@/components/SectionHeader';
import Card from '@/components/Card';
import { gsap } from '@/lib/gsap';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const quoteSvgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const timer = setInterval(() => handleNext(), 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Quote SVG draw-in on mount
  useEffect(() => {
    if (!quoteSvgRef.current) return;
    const path = quoteSvgRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power2.out',
      delay: 0.3,
    });
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } },
    exit: (dir: number) => ({ x: dir < 0 ? 80 : -80, opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: 'easeIn' } }),
  };

  const current = testimonials[currentIndex];

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <SectionHeader
          title="What Clients Say"
          subtitle="Testimonials"
          description="Feedback from founders and marketing executives on visual design collaborations."
          centered
        />

        <div className="relative max-w-3xl mx-auto flex items-center justify-center min-h-[380px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <Card variant="glass" className="p-8 md:p-12 relative border border-card-border/80 overflow-hidden" hoverEffect={false}>
                {/* Animated SVG quote mark */}
                <div className="absolute top-6 right-8 opacity-10 pointer-events-none">
                  <svg width="80" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      ref={quoteSvgRef}
                      d="M0 50C0 22.4 22.4 0 50 0h10v20H50C33.4 20 20 33.4 20 50v30H0V50zm60 0C60 22.4 82.4 0 110 0h10v20h-10C93.4 20 80 33.4 80 50v30H60V50z"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-accent"
                    />
                  </svg>
                </div>

                {/* Gradient bg shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />

                <div className="flex flex-col gap-6 relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.06, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                      >
                        <Star
                          size={16}
                          className={idx < current.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300 dark:text-zinc-600'}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-lg md:text-xl font-sans italic text-primary leading-relaxed">
                    "{current.content}"
                  </p>

                  {/* Client info */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 text-accent font-bold flex items-center justify-center font-heading border border-accent/20 shrink-0">
                      {current.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex flex-col font-sans">
                      <span className="font-bold text-sm md:text-base text-primary">{current.name}</span>
                      <span className="text-xs text-muted-text">
                        {current.role}, <span className="font-medium text-accent">{current.company}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full glass border border-border-line hover:border-accent/40 text-muted-text hover:text-accent transition-all duration-300 active:scale-90 cursor-pointer hover:shadow-md"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                className={`h-2 rounded-full transition-all duration-400 cursor-pointer ${
                  idx === currentIndex ? 'bg-accent w-8 accent-glow-shadow' : 'bg-border-line hover:bg-muted-text w-2.5'
                }`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full glass border border-border-line hover:border-accent/40 text-muted-text hover:text-accent transition-all duration-300 active:scale-90 cursor-pointer hover:shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
