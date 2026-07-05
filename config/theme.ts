export const themeTokens = {
  colors: {
    primary: {
      light: '#111111',
      dark: '#FFFFFF',
    },
    accent: '#2563EB',
    background: {
      light: '#FFFFFF',
      dark: '#0B0B0B',
    },
    card: {
      light: 'rgba(255, 255, 255, 0.7)',
      dark: 'rgba(20, 20, 20, 0.6)',
    },
    border: {
      light: 'rgba(0, 0, 0, 0.06)',
      dark: 'rgba(255, 255, 255, 0.06)',
    },
    text: {
      light: '#1F2937',
      dark: '#F9FAFB',
      mutedLight: '#6B7280',
      mutedDark: '#9CA3AF',
    }
  },
  spacing: {
    container: 'max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto',
    sectionPadding: 'py-20 md:py-28',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  shadow: {
    glassLight: '0 4px 30px rgba(0, 0, 0, 0.03)',
    glassDark: '0 4px 30px rgba(0, 0, 0, 0.5)',
  },
  typography: {
    fontSans: 'var(--font-sans)',
    fontHeading: 'var(--font-heading)',
  },
  animations: {
    transitionFast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transitionNormal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transitionSlow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  }
};
