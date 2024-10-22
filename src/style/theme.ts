import { DefaultTheme } from "styled-components/dist/types";
import { media } from "./media";

const colors = {
  gray: {
    0: "#FFFFFF",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  main: {
    100: "#DFDDFF",
    200: "#BCB8FF",
    300: "#948EFF",
    400: "#736BFF",
  },
};

export const texts = {
  display1: {
    fontSize: "56px",
    lineHeight: "72px",
    letterSpacing: "-0.0319em",
  },
  display2: {
    fontSize: "40px",
    lineHeight: "52px",
    letterSpacing: "-0.0282em",
  },
  title1: {
    fontSize: "36px",
    lineHeight: "48px",
    letterSpacing: "-0.027em",
  },
  title2: {
    fontSize: "28px",
    lineHeight: "38px",
    letterSpacing: "-0.0236em",
  },
  title3: {
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.023em",
  },
  heading1: {
    fontSize: "22px",
    lineHeight: "30px",
    letterSpacing: "-0.0194em",
  },
  heading2: {
    fontSize: "20px",
    lineHeight: "28px",
    letterSpacing: "-0.012em",
  },
  headline1: {
    fontSize: "18px",
    lineHeight: "26px",
    letterSpacing: "-0.002em",
  },
  headline2: {
    fontSize: "17px",
    lineHeight: "24px",
    letterSpacing: "0em",
  },
  body1Normal: {
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.0057em",
  },
  body1Reading: {
    fontSize: "16px",
    lineHeight: "26px",
    letterSpacing: "0.0057em",
  },
  body2Normal: {
    fontSize: "15px",
    lineHeight: "22px",
    letterSpacing: "0.0096em",
  },
  body2Reading: {
    fontSize: "15px",
    lineHeight: "24px",
    letterSpacing: "0.0096em",
  },
  label1Normal: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.0145em",
  },
  label1Reading: {
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "0.0145em",
  },
  label2: {
    fontSize: "13px",
    lineHeight: "18px",
    letterSpacing: "0.0194em",
  },
  caption1: {
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.0252em",
  },
  caption2: {
    fontSize: "11px",
    lineHeight: "14px",
    letterSpacing: "0.0311em",
  },
};

export type ColorTypes = typeof colors;

export type TextTypes = typeof texts;

const theme: DefaultTheme = {
  colors,
  texts,
  media,
};

export default theme;
