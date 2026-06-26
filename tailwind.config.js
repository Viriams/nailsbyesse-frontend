/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                'esse-noir': '#1A1A1A',
                'esse-fuchsia': '#C2185B',
                'esse-violet': '#4A148C',
                'esse-or': '#F9A825',
                'esse-creme': '#F5F5F5',
            },
            fontFamily: {
                script: ['"Great Vibes"', 'cursive'],
                serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
                display: ['"Playfair Display"', 'serif'],
                sans: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
}