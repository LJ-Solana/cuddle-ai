
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./_App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your custom background colors here
        // Example colors:
        primary: '#FCE4B4',
        secondary: '#007BFF',
        customBackground: '#ABCDEF',
        // You can also use different color variants like shades and tints
      }
    }
  }
}