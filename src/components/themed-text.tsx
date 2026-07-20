import { Platform, StyleSheet, Text, type TextProps } from "react-native";

import { Fonts, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

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
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? "text"] },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "small" && styles.small,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        type === "linkPrimary" && styles.linkPrimary,
        type === "code" && styles.code,
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
    lineHeight: 20,
    fontWeight: 300,
  },
  default: {
    fontFamily: Fonts.opensans_regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
  },
  title: {
    fontFamily: Fonts.poppins_semibold,
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: Fonts.poppins_semibold,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 600,
  },
  link: {
    fontFamily: Fonts.opensans_regular,
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    fontFamily: Fonts.opensans_regular,
    lineHeight: 30,
    fontSize: 14,
    color: "#3c87f7",
  },
  code: {
    fontFamily: Fonts.opensans_regular,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
