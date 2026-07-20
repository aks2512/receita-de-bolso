/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#000000",
    background: "#F9F9F9",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    primary: "#FFA807",
    secondary: "#EFF1ED",
    terciary: "#171D1C",
    quaternary: "#7A7D7D",
    quinary: "#74776B",
    white: "#ffffff",
    success: "#16D76C",
    warning: "#D71616",
    blue: "#16A3D7",
  },
  dark: {
    text: "#000000",
    background: "#F9F9F9",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    primary: "#FFA807",
    secondary: "#EFF1ED",
    terciary: "#171D1C",
    quaternary: "#7A7D7D",
    quinary: "#74776B",
    white: "#ffffff",
    success: "#16D76C",
    warning: "#D71616",
    blue: "#16A3D7",
  },
  background: "#F9F9F9",
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    poppins_semibold: "Poppins_600SemiBold",
    opensans_regular: "OpenSans_400Regular",
    opensans_light: "OpenSans_300Light",
  },
  default: {
    poppins_semibold: "Poppins_600SemiBold",
    opensans_regular: "OpenSans_400Regular",
    opensans_light: "OpenSans_300Light",
  },
  web: {
    poppins_semibold: "var(--font-poppins_semibold)",
    opensans_regular: "var(--font-opensans_regular)",
    opensans_light: "var(--font-opensans_light)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const MaxContentWidth = 800;
