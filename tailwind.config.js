/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FBF9F5',
          alt: '#F4F0E7',
        },
        surface: '#FFFFFF',
        card: {
          DEFAULT: '#F6F2EA',
          hover: '#F1ECE1',
        },
        line: {
          DEFAULT: '#E7E0D2',
          strong: '#D6CCB7',
        },
        ink: {
          DEFAULT: '#15120E',
          soft: '#2B2620',
          muted: '#6A6154',
          faint: '#948B7B',
        },
        gold: {
          DEFAULT: '#B9853E',
          soft: '#D8B078',
          deep: '#8E6229',
          wash: '#F0E4CE',
        },
        night: {
          DEFAULT: '#131110',
          soft: '#1D1A17',
          line: '#302B25',
        },
      },
      fontFamily: {
        sans: ['Monsterat', 'Poppins', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        '10xl': ['7.5rem', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
        '9xl': ['6rem', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        '8xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '7xl': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '6xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        tightest: '-0.045em',
        eyebrow: '0.2em',
      },
      maxWidth: {
        shell: '76rem',
        prose: '38rem',
      },
      borderRadius: {
        card: '1.25rem',
        panel: '1.75rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        lift: '0 18px 40px -24px rgba(21, 18, 14, 0.28)',
        panel: '0 2px 0 0 rgba(21, 18, 14, 0.04)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
      },
    },
  },
  plugins: [],
}
