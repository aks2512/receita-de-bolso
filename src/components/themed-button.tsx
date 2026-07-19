import { Fonts, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Platform, Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

export type ThemedButtonProps = PressableProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "smallBold"
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: "#3c87f7",
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: "700" as const }) ?? "500",
    fontSize: 12,
  },
});
