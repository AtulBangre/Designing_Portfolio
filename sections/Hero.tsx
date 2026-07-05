'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { HeroInfo } from '@/types';
import Button from '@/components/Button';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface HeroProps {
  heroInfo: HeroInfo;
  achievements: { count: string; label: string }[];
}

export const Hero: React.FC<HeroProps> = ({ heroInfo, achievements }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // ─── Neural Network Canvas ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      alpha: number;
      targetAlpha: number;
      life: number;
      spawnBurst: number;
    };

    const MAX_NODES = 120;
    const CONNECT_DIST = 130;
    const BASE_COUNT = 55;

    const makeNode = (x?: number, y?: number): Node => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.8 + 0.8,
      alpha: 0,
      targetAlpha: Math.random() * 0.55 + 0.2,
      life: 0,
      spawnBurst: 0,
    });

    const nodes: Node[] = Array.from({ length: BASE_COUNT }, () => {
      const n = makeNode();
      n.alpha = n.targetAlpha;
      n.life = 1;
      return n;
    });

    const mouse = { x: -9999, y: -9999 };
    let spawnCooldown = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', onMouseMove);
    parent?.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (spawnCooldown > 0) spawnCooldown--;

      if (spawnCooldown === 0 && mouse.x > 0 && nodes.length < MAX_NODES) {
        let closestDist = Infinity;
        let closestNode: Node | null = null;
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < closestDist) { closestDist = d; closestNode = n; }
        }
        if (closestNode && closestDist < 80) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.6 + 0.3;
          const child = makeNode(closestNode.x, closestNode.y);
          child.vx = Math.cos(angle) * speed;
          child.vy = Math.sin(angle) * speed;
          child.spawnBurst = 1;
          nodes.push(child);
          closestNode.spawnBurst = 0.6;
          spawnCooldown = 28;
        }
      }

      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        n.life = Math.min(1, n.life + 0.015);
        n.alpha += (n.targetAlpha * n.life - n.alpha) * 0.06;
        if (n.spawnBurst > 0) n.spawnBurst = Math.max(0, n.spawnBurst - 0.025);

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;

        if (n.spawnBurst > 0) {
          const rippleR = (1 - n.spawnBurst) * 28 + n.r;
          ctx.beginPath();
          ctx.arc(n.x, n.y, rippleR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59,130,246,${n.spawnBurst * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grad.addColorStop(0, `rgba(59,130,246,${n.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,155,255,${n.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const lineAlpha = (1 - d / CONNECT_DIST) * Math.min(a.alpha, b.alpha) * 0.55;
            const lg = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            lg.addColorStop(0, `rgba(59,130,246,${lineAlpha})`);
            lg.addColorStop(0.5, `rgba(100,160,255,${lineAlpha * 0.5})`);
            lg.addColorStop(1, `rgba(59,130,246,${lineAlpha})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lg;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      if (mouse.x > 0) {
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
        cg.addColorStop(0, 'rgba(99,155,255,0.09)');
        cg.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      parent?.removeEventListener('mousemove', onMouseMove);
      parent?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // ─── GSAP Hero Timeline ─────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Subtitle pill
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      // Tagline word-by-word reveal
      if (taglineRef.current) {
        const words = (heroInfo.tagline ?? '').split(' ');
        taglineRef.current.innerHTML = words
          .map(w => {
            const lower = w.toLowerCase();
            const isHighlight = lower.includes('e-commerce') || lower.includes('ui/ux') || lower.includes('experiences');
            return `<span style="display:inline-block;overflow:hidden;"><span class="split-inner${isHighlight ? ' gradient-text' : ''}" style="display:inline-block;">${w}&nbsp;</span></span>`;
          })
          .join('');

        tl.fromTo(
          taglineRef.current.querySelectorAll('.split-inner'),
          { y: '110%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.07,
            ease: 'power4.out',
          },
          '-=0.2'
        );
      }

      // Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // Stats bar
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [heroInfo.tagline]);

  // ─── Counter Roll-up ────────────────────────────────────────────────
  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          counterRefs.current.forEach((el, i) => {
            if (!el) return;
            const raw = achievements[i]?.count ?? '';
            const numMatch = raw.match(/[\d.]+/);
            if (!numMatch) return;
            const target = parseFloat(numMatch[0]);
            const suffix = raw.replace(numMatch[0], '');
            const counter = { val: 0 };
            gsap.to(counter, {
              val: target,
              duration: 2,
              delay: i * 0.12,
              ease: 'power2.out',
              onUpdate() {
                if (el) el.textContent = Math.round(counter.val) + suffix;
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [achievements]);

  // ─── Magnetic Buttons ───────────────────────────────────────────────
  useEffect(() => {
    const magnets = sectionRef.current?.querySelectorAll<HTMLElement>('.magnetic-btn');
    if (!magnets) return;

    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    magnets.forEach(el => {
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
      };
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      handlers.push({ el, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden bg-grid-pattern"
    >
      {/* Particle Canvas — must be absolute so it doesn't participate in flex layout */}
      <canvas
        ref={canvasRef}
        id="hero-canvas"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Background glow elements */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 md:left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full glow-blur -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-10 md:right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full glow-blur -z-10"
      />

      {/* Rotating ring decoration */}
      <div className="absolute top-1/3 right-[5%] w-48 h-48 md:w-64 md:h-64 opacity-[0.04] dark:opacity-[0.06] pointer-events-none spin-slow">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Tagline Pill */}
          <div
            ref={subtitleRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs md:text-sm font-medium text-accent border border-accent/20 mb-6 opacity-0"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>{heroInfo.subtitle}</span>
          </div>

          {/* Heading */}
          <h1
            ref={taglineRef}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tight leading-[1.1] text-primary"
          >
            {heroInfo.tagline ?? ''}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className="mt-6 text-lg sm:text-xl text-muted-text font-sans leading-relaxed max-w-2xl opacity-0"
          >
            {heroInfo.description}
          </p>

          {/* CTA Group */}
          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto opacity-0"
          >
            <div className="magnetic-btn">
              <Button href="#portfolio" variant="primary" className="gap-2 group w-full sm:w-auto accent-glow-shadow">
                <span>{heroInfo.ctaTextPrimary}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="magnetic-btn">
              <Button href="#contact" variant="glass" className="gap-2 w-full sm:w-auto">
                <MessageSquare size={16} />
                <span>{heroInfo.ctaTextSecondary}</span>
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            ref={statsRef}
            className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 w-full glass p-6 md:p-8 rounded-2xl border border-card-border opacity-0"
          >
            {achievements.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 text-center border-r last:border-0 border-border-line/40 col-span-1"
              >
                <span
                  className="text-2xl sm:text-3xl font-bold font-heading text-accent leading-none counter-number"
                  ref={el => { counterRefs.current[idx] = el; }}
                >
                  {stat.count}
                </span>
                <span className="text-xs text-muted-text mt-2 font-medium font-sans uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-muted-text font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-8 bg-gradient-to-b from-accent to-transparent rounded-full"
        />
      </div>
    </section>
  );
};

export default Hero;
