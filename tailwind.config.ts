import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        'background-100': "var(--color-background-100)",
        'background-200': "var(--color-background-200)",
        'background-300': "var(--color-background-300)",
        foreground: "var(--color-foreground)",
        'foreground-100': "var(--color-foreground-100)",
        'foreground-200': "var(--color-foreground-200)",
        'foreground-300': "var(--color-foreground-300)",
        primary: "var(--color-primary)",
        'primary-100': "var(--color-primary-100)",
        'primary-200': "var(--color-primary-200)",
        secondary: "var(--color-secondary)",
        'secondary-100': "var(--color-secondary-100)",
        'secondary-200': "var(--color-secondary-200)",
        danger: "var(--color-danger)",
        'danger-100': "var(--color-danger-100)",
        'danger-200': "var(--color-danger-200)",
        success: "var(--color-success)",
        'success-100': "var(--color-success-100)",
        'success-200': "var(--color-success-200)",
        neutralWhite: 'var(--color-neutral-white)'
      },
    },
  },
  plugins: [],
} satisfies Config;
