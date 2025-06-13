import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        // Improved colors for Sonlife City Church
        sonlife: {
          blue: "rgba(22, 78, 142, <alpha-value>)", // Deeper, more authoritative blue
          lightblue: "rgba(86, 158, 242, <alpha-value>)", // Brighter accent blue
          gold: "rgba(214, 174, 44, <alpha-value>)", // Richer gold
          lightgold: "rgba(247, 223, 88, <alpha-value>)", // Brighter accent gold
        },
        // Refined palette with proper opacity support
        college: { blue: "rgba(12, 28, 68, <alpha-value>)" }, // Darker, more readable
        persian: { blue: "rgba(22, 78, 142, <alpha-value>)" }, // More dominant primary blue
        middle: { blue: "rgba(175, 231, 242, <alpha-value>)" }, // Softer middle tone
        morning: { blue: "rgba(242, 250, 255, <alpha-value>)" }, // Cleaner white-blue
        picton: { blue: "rgba(56, 149, 229, <alpha-value>)" }, // More vibrant accent blue
        yellow: { banana: "rgba(247, 223, 88, <alpha-value>)" }, // Brighter gold for better contrast
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px) translateX(5px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          'to': { transform: 'scale(4)', opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 8s ease-in-out infinite",
        "wave": "wave 3s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "ripple": "ripple 0.6s linear",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addBase, theme }) => {
      addBase({
        ":root": {
          "--gradient-background-start": theme("colors.college.blue"),
          "--gradient-background-end": theme("colors.persian.blue"),
          "--first-color": theme("colors.picton.blue"),
          "--second-color": theme("colors.yellow.banana"),
          "--third-color": theme("colors.morning.blue"),
          "--fourth-color": theme("colors.middle.blue"),
          "--fifth-color": theme("colors.persian.blue"),
          "--pointer-color": theme("colors.morning.blue"),
        },
      });
    }),
  ],
} satisfies Config;

export default config;
