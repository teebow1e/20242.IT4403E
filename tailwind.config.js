/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
    },
    plugins: [],
}

// theme: {
//     extend: {
//         colors: {
//             primary: '#006241',
//             secondary: '#d50032',
//             extra: '#d4e9e2',
//         }
//     },
//     fontSize: {
//         'sm': '14px',
//         'md': '28px',
//         'lg': '32px',
//         'xl': '40px',
//     },
//     screens: {
//         'sm': '640px',
//         'md': '768px',
//         'lg': '960px',
//         'xl': '1440px',
//     },
// },
