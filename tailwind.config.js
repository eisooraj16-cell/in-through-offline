/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom design system colors
        'cream-base': '#FDF8F3',
        'cream-card': '#FFFFFF',
        'cream-sidebar': '#F5F0EB',
        'cream-hover': '#EDE6DE',
        'terracotta': {
          50: '#FBF0EC',
          100: '#F5DDD6',
          200: '#E8BBAE',
          500: '#C17767',
          600: '#A85F4F',
          700: '#8B4D40',
        },
        'text-primary': '#2D2A26',
        'text-secondary': '#5C5752',
        'text-muted': '#8A847C',
        'text-disabled': '#B5AFA7',
        'success': '#5B8C6F',
        'success-bg': '#E8F2EC',
        'warning': '#C4933F',
        'warning-bg': '#FDF3E0',
        'danger': '#B85C5C',
        'danger-bg': '#F8E5E5',
        'info': '#5A7D8F',
        'info-bg': '#E5EEF2',
        'neutral': '#8A847C',
        'neutral-bg': '#F0EDEA',
      },
      fontFamily: {
        'georgia': ['Georgia', 'serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 2px rgba(45, 42, 38, 0.04)',
        'card': '0 1px 3px rgba(45, 42, 38, 0.06), 0 4px 12px rgba(45, 42, 38, 0.04)',
        'card-hover': '0 2px 6px rgba(45, 42, 38, 0.08), 0 8px 24px rgba(45, 42, 38, 0.06)',
        'dropdown': '0 4px 16px rgba(45, 42, 38, 0.12)',
        'sidebar': '2px 0 8px rgba(45, 42, 38, 0.04)',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
