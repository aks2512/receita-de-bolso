import { Platform, StyleSheet, Text, type TextProps } from "react-native";

import { Fonts, ThemeColor } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useConfigStore } from "@/stores/useConfigStore";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "subtitle"
    | "link"
    | "linkPrimary"
    | "code";
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) {
  const config = useConfigStore((state) => state.config);
  const fontSizeMult = config.font_size / 100;
  const fontWeight =
    config.font_weight !== "default"
      ? config.font_weight
      : styles[type].fontWeight;
  const colors = useThemeColors();

  return (
    <Text
      style={[
        { color: colors[themeColor ?? "text"] },
        {
          ...styles[type],
          fontSize: styles[type].fontSize * fontSizeMult,
          lineHeight: styles[type].lineHeight * fontSizeMult,
          fontWeight: fontWeight,
          textTransform: config.letter_case,
          flex: 1,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts.opensans_light,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 300,
  },
  default: {
    fontFamily: Fonts.opensans_regular,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 400,
  },
  title: {
    fontFamily: Fonts.poppins_semibold,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: 600,
  },
  subtitle: {
    fontFamily: Fonts.poppins_semibold,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 600,
  },
  link: {
    fontFamily: Fonts.opensans_regular,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 400,
  },
  linkPrimary: {
    fontFamily: Fonts.opensans_regular,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 400,
  },
  code: {
    fontFamily: Fonts.opensans_regular,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
    lineHeight: 22,
  },
});
