'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, MessageSquare } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './BrandIcons';
import { SiteInfo, SocialLinks } from '@/types';
import Button from './Button';

interface FooterProps {
  siteInfo: SiteInfo;
  socials: SocialLinks;
}

export const Footer: React.FC<FooterProps> = ({ siteInfo, socials }) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Mapping Lucide icons for social handles
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <LinkedinIcon className="w-[18px] h-[18px]" />;
      case 'github':
        return <GithubIcon className="w-[18px] h-[18px]" />;
      case 'whatsapp':
        return <MessageSquare size={18} />;
      default:
        return null;
    }
  };

  return (
    <footer className="border-t border-border-line/60 bg-background/30 backdrop-blur-sm relative z-10 py-12 md:py-16">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center md:flex-row md:items-start justify-between gap-10">
        
        {/* Branding Profile */}
        <div className="text-center md:text-left max-w-sm">
          <Link href="#hero" className="inline-block select-none mb-3">
            <span className="text-xl font-bold font-heading text-primary tracking-tight">
              {siteInfo.name}
            </span>
          </Link>
          <p className="text-sm text-muted-text font-sans leading-relaxed">
            {siteInfo.title}
          </p>
          <p className="text-xs text-muted-text/80 mt-2 font-sans">
            Based in {siteInfo.location}
          </p>
        </div>

        {/* Sitemap Navigation */}
        <div className="flex gap-16 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-heading">
              Sitemap
            </span>
            <a href="#about" className="text-sm text-muted-text hover:text-accent transition-colors">About</a>
            <a href="#services" className="text-sm text-muted-text hover:text-accent transition-colors">Services</a>
            <a href="#experience" className="text-sm text-muted-text hover:text-accent transition-colors">Experience</a>
            <a href="#portfolio" className="text-sm text-muted-text hover:text-accent transition-colors">Portfolio</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-primary tracking-widest uppercase font-heading">
              Contact
            </span>
            <a href="mailto:atuloscp@gmail.com" className="text-sm text-muted-text hover:text-accent transition-colors">
              atuloscp@gmail.com
            </a>
            <span className="text-sm text-muted-text">{siteInfo.phone}</span>
            <a href="#faq" className="text-sm text-muted-text hover:text-accent transition-colors">FAQ</a>
            <a href="#contact" className="text-sm text-muted-text hover:text-accent transition-colors">Get In Touch</a>
          </div>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-5">
          <div className="flex gap-3">
            <a 
              href={socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted-light border border-border-line hover:border-accent/40 text-muted-text hover:text-accent transition-all duration-300"
              aria-label="LinkedIn"
            >
              {renderSocialIcon('linkedin')}
            </a>
            <a 
              href={socials.behance} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted-light border border-border-line hover:border-accent/40 text-muted-text hover:text-accent transition-all duration-300 text-sm font-semibold flex items-center justify-center font-sans tracking-tight"
              aria-label="Behance"
            >
              Be
            </a>
            <a 
              href={socials.dribbble} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted-light border border-border-line hover:border-accent/40 text-muted-text hover:text-accent transition-all duration-300 text-sm font-semibold flex items-center justify-center font-sans tracking-tight"
              aria-label="Dribbble"
            >
              Dr
            </a>
            <a 
              href={socials.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted-light border border-border-line hover:border-accent/40 text-muted-text hover:text-accent transition-all duration-300"
              aria-label="GitHub"
            >
              {renderSocialIcon('github')}
            </a>
            <a 
              href={socials.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-muted-light border border-border-line hover:border-accent/40 text-muted-text hover:text-accent transition-all duration-300"
              aria-label="WhatsApp"
            >
              {renderSocialIcon('whatsapp')}
            </a>
          </div>

          <Button 
            onClick={handleScrollToTop} 
            variant="secondary" 
            size="sm" 
            className="p-3 rounded-full hover:text-accent"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-10 pt-6 border-t border-border-line/40 flex flex-col md:flex-row items-center justify-between text-xs text-muted-text/80 gap-4">
        <p>© {currentYear} {siteInfo.name}. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Designed with Apple & Framer Aesthetics</span>
          <span>•</span>
          <span>Next.js App Router & Tailwind</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
