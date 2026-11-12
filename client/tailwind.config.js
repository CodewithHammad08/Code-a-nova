/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /* ── Custom screens (mobile-first) ─────────────────────── */
    screens: {
      xs:  '480px',
      sm:  '640px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl': '1536px',
    },
    extend: {
      /* ── Brand colours ─────────────────────────────────────── */
      colors: {
        brand: {
          primary: '#17243A',
          hover:   '#243653',
          bg:      '#F7F7F4',
          surface: '#FFFFFF',
          text:    '#20242B',
          muted:   '#6B7280',
          border:  '#E5E7EB',
          accent:  '#D6A64F',
          success: '#21845B',
          error:   '#C44545',
        },
      },

      /* ── Font families ─────────────────────────────────────── */
      fontFamily: {
        sans:    ['Inter',    'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope',  'Inter',     'system-ui',     'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },

      /* ── Typography scale ──────────────────────────────────── */
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs:    ['0.75rem',  { lineHeight: '1.125rem' }],
        sm:    ['0.875rem', { lineHeight: '1.375rem' }],
        base:  ['1rem',     { lineHeight: '1.625rem' }],
        md:    ['1.0625rem',{ lineHeight: '1.675rem' }],
        lg:    ['1.125rem', { lineHeight: '1.75rem'  }],
        xl:    ['1.25rem',  { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem',   { lineHeight: '2rem'     }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem'  }],
        '4xl': ['2.25rem',  { lineHeight: '2.625rem' }],
        '5xl': ['3rem',     { lineHeight: '3.5rem'   }],
        '6xl': ['3.75rem',  { lineHeight: '4.25rem'  }],
      },

      /* ── Font weights ──────────────────────────────────────── */
      fontWeight: {
        normal:    '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
        extrabold: '800',
      },

      /* ── Spacing scale (extends Tailwind's default) ────────── */
      spacing: {
        '4.5':  '1.125rem',
        '5.5':  '1.375rem',
        '6.5':  '1.625rem',
        '7.5':  '1.875rem',
        '13':   '3.25rem',
        '15':   '3.75rem',
        '17':   '4.25rem',
        '18':   '4.5rem',
        '22':   '5.5rem',
        '26':   '6.5rem',
        '30':   '7.5rem',
        '34':   '8.5rem',
        '68':   '17rem',
        '76':   '19rem',
        '84':   '21rem',
        '88':   '22rem',
        '92':   '23rem',
        '100':  '25rem',
        '104':  '26rem',
        '112':  '28rem',
        '120':  '30rem',
        '128':  '32rem',
        '144':  '36rem',
      },

      /* ── Border radius ─────────────────────────────────────── */
      borderRadius: {
        'none':  '0',
        'sm':    '3px',
        'btn':   '5px',   /* rectangular — 4-6 px */
        'input': '5px',
        'card':  '7px',
        'modal': '8px',
        'DEFAULT': '5px',
        'md':    '6px',
        'lg':    '8px',
        'xl':    '10px',
      },

      /* ── Box shadow tokens ─────────────────────────────────── */
      boxShadow: {
        'card':
          '0 1px 2px rgba(23,36,58,0.04), 0 4px 8px -2px rgba(23,36,58,0.08)',
        'card-hover':
          '0 4px 6px -1px rgba(23,36,58,0.06), 0 10px 20px -4px rgba(23,36,58,0.10)',
        'dropdown':
          '0 4px 6px -1px rgba(23,36,58,0.08), 0 12px 24px -4px rgba(23,36,58,0.12)',
        'modal':
          '0 20px 40px -8px rgba(23,36,58,0.20), 0 8px 16px -4px rgba(23,36,58,0.10)',
        'input-focus':
          '0 0 0 3px rgba(23,36,58,0.10)',
        'accent-focus':
          '0 0 0 3px rgba(214,166,79,0.35)',
        'inner-sm':
          'inset 0 1px 2px rgba(23,36,58,0.06)',
        'none': 'none',
      },

      /* ── Transition tokens ─────────────────────────────────── */
      transitionDuration: {
        '0':   '0ms',
        '75':  '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
      },
      transitionTimingFunction: {
        'ease-spring':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-smooth':     'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-expo':    'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'ease-out-expo':   'cubic-bezier(0.19, 1, 0.22, 1)',
        'ease-in-out-back':'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },

      /* ── Animation keyframes ───────────────────────────────── */
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        skeletonPulse: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        badgePulse: {
          '0%':   { transform: 'scale(1)',   opacity: '0.8' },
          '70%':  { transform: 'scale(1.9)', opacity: '0'   },
          '100%': { transform: 'scale(1.9)', opacity: '0'   },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      /* ── Animation utilities ───────────────────────────────── */
      animation: {
        'fadeIn':       'fadeIn 0.4s ease both',
        'slideUp':      'slideUp 0.4s ease both',
        'slideInLeft':  'slideInLeft 0.4s ease both',
        'slideInRight': 'slideInRight 0.4s ease both',
        'skeleton':     'skeletonPulse 1.6s ease-in-out infinite',
        'badge-pulse':  'badgePulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer':      'shimmer 2s linear infinite',
        /* speed variants */
        'fadeIn-fast':  'fadeIn 0.2s ease both',
        'slideUp-slow': 'slideUp 0.6s ease both',
      },
    },
  },
  plugins: [],
}
