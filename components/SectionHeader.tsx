'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = false,
  className,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16, clipPath: 'inset(0 0 100% 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.out' }
        );
      }

      if (titleRef.current) {
        // Split title into words for stagger
        const words = title.split(' ');
        titleRef.current.innerHTML = words
          .map(w => `<span class="split-word" style="display:inline-block;overflow:hidden;"><span class="split-inner" style="display:inline-block;">${w}&nbsp;</span></span>`)
          .join('');

        const inners = titleRef.current.querySelectorAll('.split-inner');
        tl.fromTo(
          inners,
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.07,
            ease: 'power4.out',
          },
          '-=0.3'
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'mb-12 md:mb-16 max-w-3xl flex flex-col',
        centered ? 'mx-auto items-center text-center' : 'items-start text-left',
        className
      )}
      {...props}
    >
      {subtitle && (
        <span
          ref={subtitleRef}
          className="text-xs md:text-sm font-semibold tracking-widest text-accent uppercase mb-3 opacity-0"
        >
          {subtitle}
        </span>
      )}
      <h2
        ref={titleRef}
        className="text-3xl md:text-5xl font-bold font-heading tracking-tight text-primary leading-tight"
      >
        {title}
      </h2>
      {description && (
        <p
          ref={descRef}
          className="mt-4 text-base md:text-lg text-muted-text font-sans leading-relaxed opacity-0"
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
