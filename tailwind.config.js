module.exports = {
  darkMode: "class",
  content: [
    "./api/**/*.php",
    "./public/js/**/*.js"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1DA1F2",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#1A1A24",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#1A1A24",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
};
