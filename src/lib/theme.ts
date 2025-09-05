/**
 * Grama Groceries Design System
 * Professional design system for Indian village grocery delivery
 */

export const appTheme = {
  colors: {
    // Primary palette - Fresh greens for agriculture
    primary: {
      50: '#E8F5E8',
      100: '#C8E6C9', 
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50',  // Main brand color
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',  // Dark green
      900: '#1B5E20'
    },
    
    // Secondary palette - Earth tones
    secondary: {
      50: '#EFEBE9',
      100: '#D7CCC8',
      200: '#BCAAA4',
      300: '#A1887F',
      400: '#8D6E63',
      500: '#795548',  // Brown earth
      600: '#6D4C41',
      700: '#5D4037',
      800: '#4E342E',
      900: '#3E2723'
    },
    
    // Accent colors
    accent: {
      blue: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        500: '#1976D2',  // Trust/reliability
        600: '#1565C0',
        700: '#0D47A1'
      },
      orange: {
        50: '#FFF3E0',
        100: '#FFE0B2',
        500: '#FF9800',  // Alerts/warnings
        600: '#F57C00',
        700: '#E65100'
      },
      red: {
        50: '#FFEBEE',
        100: '#FFCDD2',
        500: '#F44336',  // Errors/urgent
        600: '#E53935',
        700: '#C62828'
      },
      yellow: {
        50: '#FFFDE7',
        100: '#FFF9C4',
        500: '#FFC107',  // Highlights
        600: '#FFB300',
        700: '#FF8F00'
      }
    },
    
    // Neutral grays
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },

    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#1976D2'
  },
  
  // Typography system
  fonts: {
    heading: '"Poppins", system-ui, sans-serif',
    body: '"Roboto", system-ui, sans-serif',
    caption: '"Roboto", system-ui, sans-serif',
    mono: '"Roboto Mono", monospace'
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem'   // 36px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  
  // Spacing system (rem units)
  space: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem'      // 96px
  },
  
  // Component sizing
  sizes: {
    button: {
      small: '2rem',    // 32px
      medium: '2.5rem', // 40px
      large: '3rem'     // 48px
    },
    icon: {
      xs: '1rem',       // 16px
      sm: '1.25rem',    // 20px
      md: '1.5rem',     // 24px
      lg: '2rem',       // 32px
      xl: '2.5rem'      // 40px
    },
    input: {
      small: '2rem',    // 32px
      medium: '2.5rem', // 40px
      large: '3rem'     // 48px
    }
  },

  // Border radius system
  radii: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px'
  },

  // Shadow system
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  },

  // Z-index scale
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  },

  // Animation durations
  transitions: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms'
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
} as const;

// Export individual theme sections for convenience
export const colors = appTheme.colors;
export const fonts = appTheme.fonts;
export const fontSizes = appTheme.fontSizes;
export const space = appTheme.space;
export const sizes = appTheme.sizes;
export const radii = appTheme.radii;
export const shadows = appTheme.shadows;

// Brand specific color utilities
export const brandColors = {
  primary: appTheme.colors.primary[500],
  primaryDark: appTheme.colors.primary[700],
  primaryLight: appTheme.colors.primary[100],
  secondary: appTheme.colors.secondary[500],
  secondaryDark: appTheme.colors.secondary[700],
  success: appTheme.colors.accent.blue[500],
  warning: appTheme.colors.accent.orange[500],
  error: appTheme.colors.accent.red[500],
  info: appTheme.colors.accent.yellow[500]
};

export type AppTheme = typeof appTheme;