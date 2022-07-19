import configureFonts from "./fonts";
import type { Theme } from "../types";
import { colors } from "./colors";

const DefaultTheme: Theme = {
  dark: false,
  roundness: 8,
  colors: colors,
  textInput: {
    mode: "filled",
    shape: "rounded",
  },
  button: {
    variant: "primary",
    shape: "rounded",
    size: "md",
  },
  tag: {
    variant: "primary",
    size: "md",
    shape: "rounded",
  },
  alert: {
    variant: "info",
    type: "basic",
  },
  chip: {
    variant: "filled",
    shape: "rounded",
  },
  toast: {
    variant: "neutral",
    shape: "rect",
  },
  skeleton: {
    animation: "pulse",
    borderRadius: 8,
  },
  toolbar:{
    elevation: 4,
    size: "sm"
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
