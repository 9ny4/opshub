/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#DBEAFE',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
        },
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.1)',
        dropdown: '0 10px 15px rgba(0,0,0,0.1)',
        modal: '0 20px 25px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
