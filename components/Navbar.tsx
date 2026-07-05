'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@wrksz/themes/client';
import { Sun, Moon, Menu, X, ArrowDownToLine } from 'lucide-react';
import { SiteInfo } from '@/types';
import { cn } from '@/lib/utils';
import { smoothScrollTo } from '@/lib/smoothScroll';
import Button from './Button';

interface NavbarProps {
  siteInfo: SiteInfo;
}

export const Navbar: React.FC<NavbarProps> = ({ siteInfo }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Basic Scroll Spy to highlight active navigation link
      const sections = ['hero', 'about', 'services', 'experience', 'portfolio', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-40 transition-all duration-300',
      scrolled 
        ? 'glass-nav py-3 shadow-sm' 
        : 'bg-transparent py-5 border-b border-transparent'
    )}>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); smoothScrollTo('#hero'); }}
          className="flex flex-col select-none group cursor-pointer"
        >
          <span className="text-lg md:text-xl font-bold font-heading text-primary tracking-tight">
            {siteInfo.name}
          </span>
          <span className="text-[10px] text-muted-text -mt-1 tracking-wider uppercase font-sans font-medium group-hover:text-accent transition-colors duration-300">
            Portfolio
          </span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href); }}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent font-sans cursor-pointer',
                activeSection === link.id ? 'text-accent' : 'text-muted-text'
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Panel */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-muted-light border border-transparent hover:border-border-line text-muted-text hover:text-primary transition-all duration-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* CV Button */}
          <Button href={siteInfo.resumeUrl} variant="glass" size="sm" className="gap-2" external>
            <ArrowDownToLine size={14} />
            <span>Resume</span>
          </Button>
        </div>

        {/* Mobile Navbar Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-muted-light text-muted-text hover:text-primary transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-muted-light text-muted-text hover:text-primary transition-colors cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border-line/40 py-6 px-4 animate-in slide-in-from-top-4 duration-300 absolute top-full left-0 right-0 z-30 shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(link.href); setMobileMenuOpen(false); }}
                className={cn(
                  'text-base font-semibold py-2 px-3 rounded-lg hover:bg-muted-light transition-all cursor-pointer',
                  activeSection === link.id ? 'text-accent bg-accent/5' : 'text-muted-text'
                )}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-border-line my-2" />
            <Button 
              href={siteInfo.resumeUrl} 
              variant="primary" 
              size="md" 
              className="w-full gap-2 justify-center" 
              external
              onClick={() => setMobileMenuOpen(false)}
            >
              <ArrowDownToLine size={16} />
              <span>Download Resume</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
