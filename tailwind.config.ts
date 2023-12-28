import type { Config } from 'tailwindcss'

const { addDynamicIconSelectors } = require('@iconify/tailwind');

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    // Add the @iconify/tailwind plugin
    addDynamicIconSelectors(),
  ],
} satisfies Config
