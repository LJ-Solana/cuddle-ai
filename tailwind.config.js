
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./_App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your custom background colors here
        // Example colors:
        base: '#F8C35A',
        main: '#FCE4B4',
        accentone: '#5AEDF8',
        accenttwo: '#845AF8',
        // You can also use different color variants like shades and tints
      }
    }
  }
}