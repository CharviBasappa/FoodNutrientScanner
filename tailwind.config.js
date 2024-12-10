/** @type {import('tailwindcss').Config} */
//module.exports = {
//  content: ["./app/**/*.{js,jsx,ts,tsx}"],
//  theme: {
//    extend: {},
//  },
//  plugins: [],
//}


module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
