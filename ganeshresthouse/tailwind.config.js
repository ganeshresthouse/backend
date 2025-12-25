/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a56db',
                    dark: '#1e40af',
                },
                secondary: '#f97316',
            }
        },
    },
    plugins: [],
}
