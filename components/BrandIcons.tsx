import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const LinkedinIcon: React.FC<IconProps> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const GithubIcon: React.FC<IconProps> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const BehanceIcon: React.FC<IconProps> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={props.className}
    {...props}
  >
    <path d="M8.2 5c-1.8 0-3.2.4-4.2 1.2S2.5 8.7 2.5 10.3c0 1.6.4 2.8 1.3 3.6.9.8 2.2 1.1 4 .1.9 0 1.6-.2 2.2-.6.6-.4.9-1 1.1-1.7h-3c-.1.3-.3.6-.6.8s-.7.3-1.2.3c-.6 0-1.1-.2-1.4-.5-.3-.3-.5-.8-.5-1.5h7.2c0-.1.1-.3.1-.5 0-1.8-.4-3.1-1.2-4S8.9 5 8.2 5zm-.2 2.3c.5 0 .9.2 1.1.5.3.3.4.8.4 1.5H4.8c0-.7.1-1.2.4-1.5s.7-.5 1.8-.5zm12.3 3.9c-.8 0-1.4.2-1.8.6-.4.4-.6 1-.6 1.7h4.8c0-.7-.2-1.3-.6-1.7-.5-.4-1.1-.6-1.8-.6zm-.3-5.2c-1.6 0-2.8.5-3.6 1.4-.8.9-1.2 2.2-1.2 3.9 0 1.7.4 3 1.2 3.9.8.9 2 1.4 3.7 1.4 1.3 0 2.3-.3 3-.9.7-.6 1.1-1.5 1.2-2.7h-3.2c-.1.4-.3.7-.5.9-.3.2-.6.3-1.1.3-.5 0-.9-.2-1.1-.5s-.4-.8-.4-1.5h6.6c0-.2.1-.5.1-.7 0-1.7-.4-3-1.2-3.9s-2-1.1-3.7-1.1zm-.8 1.4h1.7v1.1h-1.7zm-9-1.4H5.3v2.8H8.2c.8 0 1.4-.2 1.7-.6.4-.4.6-1 .6-1.6s-.2-1.1-.6-1.4c-.4-.4-1-.6-1.7-.6z" />
  </svg>
);

export const DribbbleIcon: React.FC<IconProps> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M19.13 5.09A10 10 0 0 1 12 2c-.18 0-.36 0-.55.02a10.1 10.1 0 0 0 4.1 6.5 10 10 0 0 0 3.58-3.43zM11.45 2.02a10.1 10.1 0 0 1 4 6.47 10 10 0 0 1-5.17.65 10 10 0 0 1-4.7 4.1A10.1 10.1 0 0 1 2 12c0-.18.02-.36.02-.55a10 10 0 0 1 9.43-9.43zm-9.43 9.43a10.1 10.1 0 0 0 9.43 9.43c.18 0 .36 0 .55-.02a10.1 10.1 0 0 0-4.1-6.5 10 10 0 0 0-3.58 3.43zm9.43 9.43a10.1 10.1 0 0 1-4-6.47 10 10 0 0 1 5.17-.65 10 10 0 0 1 4.7-4.1A10.1 10.1 0 0 1 22 12c0 .18-.02.36-.02.55a10 10 0 0 1-9.43 9.43z" />
  </svg>
);

export const WhatsappIcon: React.FC<IconProps> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={props.className}
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
