'use client';

/**
 * smoothScrollTo - Smoothly scrolls to a section by its ID.
 * Handles the fixed navbar offset automatically.
 */
export function smoothScrollTo(sectionId: string): void {
  const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
  const el = document.getElementById(id);
  if (!el) return;

  const navbarHeight = 80; // matches fixed navbar height
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * handleAnchorClick - Click event handler for anchor links.
 * Prevents default browser jump and smooth scrolls instead.
 */
export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  href: string
): void {
  if (href.startsWith('#')) {
    e.preventDefault();
    smoothScrollTo(href);
  }
}
