/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'py': '3rem',
        'px': '5rem',
      },
      screens: {
        's450': '450px',     // Customizing sm breakpoint
        'sm': '640px',     // Customizing sm breakpoint
        'md': '770px',     // Customizing md breakpoint
        's900': '900px',     // Customizing md breakpoint
        's1000': '1000px',     // Customizing md breakpoint
        's1100': '1100px',     // Customizing md breakpoint
        'lg': '1024px',    // Customizing lg breakpoint
        'xl': '1280px',    // Customizing xl breakpoint
        '2xl': '1536px',   // Customizing 2xl breakpoint
      },
      colors: {
        primary: {
          color: '#FF779F',
          textColor: '#000914',
          textColor2: '#555B62',
          background: '#FEFBF7',
          deepRed: '#752C49',
        },
      },
    },
  },
  plugins: [],
}
