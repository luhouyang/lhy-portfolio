/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class', // Kept for dark mode support
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // 1. The Base Canvas
        paper: {
          DEFAULT: '#f5f2eb', // Warm cream background
          dark: '#e8e4d9',    // Slightly deeper cream for card backgrounds/borders
        },
        // 2. The Typography (Low eye strain)
        slate: {
          900: '#1e293b', // Headers (h1, h2)
          700: '#334155', // Primary paragraph text
          500: '#64748b', // Meta text (dates, tags)
        },
        // 3. Warm Pastels (Passive UI elements, inactive chips, graph baselines)
        pastel: {
          sand: '#e5d9c5', // Warm sand for secondary buttons
          sage: '#c1c9ba', // Muted green for successful build tags
          rose: '#ddb3b4', // Soft red for warning/error tags
        },
        // 4. Interactive Highlights (Vivid, only for active states & math canvas)
        accent: {
          DEFAULT: '#0ea5e9', // Bright Sky Blue (Primary Interactive)
          hover: '#0284c7',   // Deep Sky Blue (Hover states)
          emerald: '#10b981', // Bright Green (Run simulation button)
          amber: '#f59e0b',   // Bright Orange (Active slider thumb)
          neon: '#22d3ee',    // Cyan (WebGL 3D particle highlights)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [typography],
}