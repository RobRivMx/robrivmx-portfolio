/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#0A0A0F',
                surface: '#0F1117',
                card: '#1A1D2E',
                text: '#F0F4FF',
                muted: '#8B95B0',
                blue: {
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                },
                emerald: { 400: '#34D399', 500: '#10B981' },
                amber: { 400: '#FBBF24', 500: '#F59E0B' },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            borderRadius: {
                card: '8px',
                'card-lg': '12px',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                float: 'float 6s ease-in-out infinite',
                glow: 'glow 2s ease-in-out infinite alternate',
                blob: 'blob 6s ease-in-out infinite',
                wave: 'wave 4s ease-in-out infinite',
                'wave-slow': 'wave 6s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(59,130,246,0.15), 0 0 20px rgba(59,130,246,0.05)' },
                    '100%': { boxShadow: '0 0 10px rgba(59,130,246,0.3), 0 0 30px rgba(59,130,246,0.1)' },
                },
                blob: {
                    '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'scale(1)' },
                    '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%', transform: 'scale(1.05)' },
                },
                wave: {
                    '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
                    '50%': { transform: 'scale(1.15)', opacity: 0.3 },
                }
            },
        },
    },
    plugins: [],
};