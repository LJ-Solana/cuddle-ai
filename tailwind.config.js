
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./_App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your custom background colors here
        // Example colors:
        base: '#F8C35A',
        feature1: '#FF1D58',
        feature2: '#FFF685',
        feature3: '#0049B7',
        // You can also use different color variants like shades and tints
      }
    }
  }
}