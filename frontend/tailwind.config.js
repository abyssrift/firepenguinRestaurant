/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Outfit', 'sans-serif'],
            },
            colors: {
                background: '#09090b', // Zinc 950
                surface: '#18181b', // Zinc 900
                primary: {
                    DEFAULT: '#f97316', // Orange 500
                    hover: '#ea580c', // Orange 600
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#27272a', // Zinc 800
                    foreground: '#fafafa', // Zinc 50
                },
                accent: {
                    DEFAULT: '#eab308', // Yellow 500
                },
                glass: 'rgba(255, 255, 255, 0.05)',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('light', '.light-theme &');
        }
    ],
}
