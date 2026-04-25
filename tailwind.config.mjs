/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  // --- TEMA ABSOLUTAMENTE CUSTOMIZADO — "BLACK MODE" ---
  // Nenhuma cor padrão do Tailwind é utilizada. Apenas os tokens abaixo.
  theme: {
    // Sobrescrevemos TUDO — sem herdar cores padrão
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Paleta "Cinematic Canvas"
      void:    '#000000',       // Fundo absoluto — o cânone
      depth: {
        1:     '#0A0A0A',       // Profundidade sutil — seções alternadas
        2:     '#111111',       // Cards, containers
        3:     '#1A1A1A',       // Borders invisíveis
      },
      surface: '#FFFFFF',       // Texto principal
      muted:   '#8A8A8A',       // Texto secundário
      accent:  '#C9A96E',       // Gold discreto — CTAs, destaques
      white:   '#FFFFFF',       // Alias semântico
      black:   '#000000',       // Alias semântico
    },

    // --- TIPOGRAFIA ---
    fontFamily: {
      serif: ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
      sans:  ['"Inter"', 'system-ui', 'sans-serif'],
    },

    fontWeight: {
      extralight: '200',
      light:      '300',
      normal:     '400',
      medium:     '500',
      semibold:   '600',
      bold:       '700',
    },

    // --- ESCALA DE FONTE CINEMATOGRÁFICA ---
    fontSize: {
      'xxs':  ['0.6rem',  { lineHeight: '1' }],
      'xs':   ['0.65rem', { lineHeight: '1.2' }],
      'sm':   ['0.875rem',{ lineHeight: '1.5' }],
      'base': ['1rem',    { lineHeight: '1.7' }],
      'lg':   ['1.125rem',{ lineHeight: '1.6' }],
      'xl':   ['1.25rem', { lineHeight: '1.5' }],
      '2xl':  ['1.5rem',  { lineHeight: '1.4' }],
      '3xl':  ['1.875rem',{ lineHeight: '1.3' }],
      '4xl':  ['2.25rem', { lineHeight: '1.2' }],
      '5xl':  ['3rem',    { lineHeight: '1.1' }],
      '6xl':  ['4rem',    { lineHeight: '1' }],
      '7xl':  ['5rem',    { lineHeight: '0.95' }],
      '8xl':  ['7rem',    { lineHeight: '0.9' }],
      '9xl':  ['9rem',    { lineHeight: '0.85' }],
      '10xl': ['11rem',   { lineHeight: '0.82' }],
      '11xl': ['14rem',   { lineHeight: '0.8' }],
    },

    letterSpacing: {
      tightest: '-0.04em',
      tighter:  '-0.02em',
      tight:    '-0.01em',
      normal:   '0',
      wide:     '0.05em',
      wider:    '0.1em',
      widest:   '0.2em',
      ultra:    '0.3em',
    },

    // --- ESPAÇAMENTO GENEROSO ---
    extend: {
      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // --- GRADIENTES DO PROJETO ---
      backgroundImage: {
        'gradient-void':   'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
        'gradient-depth':  'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'gradient-accent': 'linear-gradient(135deg, #C9A96E 0%, #A0784A 100%)',
        'gradient-glow':   'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
        'noise':           "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },

      // --- ANIMAÇÕES CSS PURAS ---
      animation: {
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },

      // --- SOMBRAS DO PROJETO ---
      boxShadow: {
        'ambient':      '0 40px 120px rgba(0,0,0,0.9)',
        'gold-glow':    '0 0 60px rgba(201,169,110,0.08)',
        'glass':        '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        'deep':         '0 25px 80px rgba(0,0,0,0.8)',
      },

      // --- BACKDROP BLUR ---
      backdropBlur: {
        'glass': '16px',
      },

      // --- PERSPECTIVA 3D ---
      perspective: {
        '800':  '800px',
        '1200': '1200px',
        '2000': '2000px',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
