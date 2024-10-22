/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "gray-100",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      text: {
        display1: ["56px", { lineHeight: "72px", letterSpacing: "-0.0319em" }],
        display2: ["40px", { lineHeight: "52px", letterSpacing: "-0.0282em" }],
        title1: ["36px", { lineHeight: "48px", letterSpacing: "-0.027em" }],
        title2: ["28px", { lineHeight: "38px", letterSpacing: "-0.0236em" }],
        title3: ["24px", { lineHeight: "32px", letterSpacing: "-0.023em" }],
        heading1: ["22px", { lineHeight: "30px", letterSpacing: "-0.0194em" }],
        heading2: ["20px", { lineHeight: "28px", letterSpacing: "-0.012em" }],
        headline1: ["18px", { lineHeight: "26px", letterSpacing: "-0.002em" }],
        headline2: ["17px", { lineHeight: "24px", letterSpacing: "0em" }],
        body1Normal: [
          "16px",
          { lineHeight: "24px", letterSpacing: "0.0057em" },
        ],
        body1Reading: [
          "16px",
          { lineHeight: "26px", letterSpacing: "0.0057em" },
        ],
        body2Normal: [
          "15px",
          { lineHeight: "22px", letterSpacing: "0.0096em" },
        ],
        body2Reading: [
          "15px",
          { lineHeight: "24px", letterSpacing: "0.0096em" },
        ],
        label1Normal: [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.0145em" },
        ],
        label1Reading: [
          "14px",
          { lineHeight: "22px", letterSpacing: "0.0145em" },
        ],
        label2: ["13px", { lineHeight: "18px", letterSpacing: "0.0194em" }],
        caption1: ["12px", { lineHeight: "16px", letterSpacing: "0.0252em" }],
        caption2: ["11px", { lineHeight: "14px", letterSpacing: "0.0311em" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
