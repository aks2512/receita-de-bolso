import { Fonts, Spacing, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Platform, Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

export type ThemedButtonProps = PressableProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "subtitle"
    | "link"
    | "linkPrimary"
    | "code";
  themeColor?: ThemeColor;
  children: string; // Obriga a passar um texto dentro do botão
};

export function ThemedButton({
  style,
  type = "title",
  themeColor = "primary",
  children,
  ...rest
}: ThemedButtonProps) {
  const theme = useTheme();

  const BackgroundColor = theme[themeColor ?? "primary"];

  return (
    <Pressable
      style={(state) => [
        styles.buttonBase,
        {
          backgroundColor: BackgroundColor,
        },
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      <ThemedText style={[{ color: "#ffffff" }, styles[type]]}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
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
