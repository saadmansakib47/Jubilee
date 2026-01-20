/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    deep: "#5B2D8B",
                    DEFAULT: "#5B2D8B",
                    light: "#E6D9F5",
                },
                secondary: {
                    deep: "#3F1D5C",
                    DEFAULT: "#3F1D5C",
                    light: "#F2ECFA",
                },
                neutral: {
                    white: "#FFFFFF",
                    offWhite: "#FAF9FC",
                    text: "#2A2433",
                    muted: "#6B6475",
                    border: "#E3DDF0",
                },
                status: {
                    success: "#4C9A7D",
                    warning: "#C9A24D",
                    danger: "#B84C5A",
                },
            },
            fontFamily: {
                display: ["Outfit", "sans-serif"],
                body: ["Inter", "sans-serif"],
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "fade-up": "fadeUp 0.8s ease-out",
                "slide-in": "slideIn 0.5s ease-out",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideIn: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(91, 45, 139, 0.3)" },
                    "100%": { boxShadow: "0 0 40px rgba(91, 45, 139, 0.6)" },
                },
            },
        },
    },
    plugins: [],
}