/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        accent1: "var(--color-accent1)",
        accent2: "var(--color-accent2)",
      },
      fontFamily: {
        comic: "var(--font-comic) !important",
        didact: "var(--font-didact) !important",
      },
      boxShadow: {
        shadow1: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
    },
  },
  plugins: [],
};
