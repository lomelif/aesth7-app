/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5e81ac",
        secondary: "#80a1c1",
        alternative: "#485f7a"
      },
    },
  },
}

