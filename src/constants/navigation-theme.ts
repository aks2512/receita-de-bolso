import { Colors, Fonts } from "@/constants/theme";
import { Theme } from "@react-navigation/native";

const navigationFonts: Theme["fonts"] = {
  regular: {
    fontFamily: Fonts.opensans_regular,
    fontWeight: "400",
  },
  medium: {
    fontFamily: Fonts.opensans_regular,
    fontWeight: "500",
  },
  bold: {
    fontFamily: Fonts.poppins_semibold,
    fontWeight: "600",
  },
  heavy: {
    fontFamily: Fonts.poppins_semibold,
    fontWeight: "700",
  },
};

export const CustomLightTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.backgroundElement,
    text: Colors.light.text,
    border: Colors.light.backgroundSelected,
    notification: Colors.light.warning,
  },
  fonts: navigationFonts,
};

export const CustomDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.backgroundElement,
    text: Colors.dark.text,
    border: Colors.dark.backgroundSelected,
    notification: Colors.dark.warning,
  },
  fonts: navigationFonts,
};
