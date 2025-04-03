module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14181b",
        bgprimary: "#14181b",
        color800: "#1c2428",
        color700: "#9ba5b7",
        color600: "#1e2428",
        "dar-gray": "#4b4b4b",
        "light-gray-0": "#eaeaea",
        "light-gray-1": "rgb(75,75,75)",
        "light-gray-2": "rgb(128,128,128)",
        "renderer-gray": "rgb(224, 224, 224)",
        red: "#e34850",
        "green-400": "#2d9d78",
        "green-500": "#268e6c",
      },
    },
  },
  variants: {},
  plugins: [],
};
