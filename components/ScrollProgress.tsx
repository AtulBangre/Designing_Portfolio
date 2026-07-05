'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * ScrollProgress — GSAP-driven accent bar + section indicator dots.
 * The bar fills via scrub ScrollTrigger for buttery smooth momentum.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const ctx = gsap.context(() => {
      // GSAP scrub ScrollTrigger for perfect momentum
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3, // 0.3s lag = smooth momentum feel
          onUpdate: self => {
            // Move glow dot along the bar
            if (glowRef.current) {
              glowRef.current.style.left = `${self.progress * 100}%`;
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      {/* Progress bar — scales from 0 to 1 via GSAP */}
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-accent via-violet-500 to-emerald-400 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
      {/* Moving glow dot */}
      <div
        ref={glowRef}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(59,130,246,0.8)]"
        style={{ left: '0%' }}
      />
    </div>
  );
}
