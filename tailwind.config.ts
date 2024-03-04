import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: '1rem',

      // default breakpoints but with 40px removed
      screens: {
        sm: '100%',
        md: '700px',
        lg: '1000px',
        xl: '1280px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'uss-phosphor-green': 'rgb(125, 250, 0)',
        'uss-phosphor-green-10': 'rgba(125, 250, 0, 0.1)',
        'uss-green': 'rgb(95, 237, 0)',
        'uss-green-10': 'rgba(95, 237, 0, 0.6)',
        'uss-gray-10': 'rgb(240, 240, 240)',
        'uss-gray-30': 'rgb(220, 220, 220)',
        'uss-gray-50': 'rgb(190, 190, 190)',
        'uss-black': '#333',
      },
      fontFamily: {
        'marselis-pro': ['Marselis-Pro', 'sans-serif'],
        'marselis-slab': ['Marselis-Slab', 'sans-serif'],
        'lyon': ['Lyon', 'sans-serif'],
        'lyon-text': ['Lyon-Text', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
