import { Spacing, ThemeColor } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Image } from "expo-image";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

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
  image?: any;
  children: string;
};

export function ThemedButton({
  style,
  type = "subtitle",
  themeColor = "primary",
  children,
  image,
  ...rest
}: ThemedButtonProps) {
  const colors = useThemeColors();

  const BackgroundColor = colors[themeColor ?? "primary"];

  return (
    <Pressable
      style={(state) => [
        styles.button_base,
        {
          backgroundColor: BackgroundColor,
        },
        typeof style === "function" ? style(state) : style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={children}
      {...rest}
    >
      <ThemedView
        style={[styles.button_container, { backgroundColor: BackgroundColor }]}
      >
        {image && (
          <Image
            style={{ width: 24, height: 24, tintColor: colors.white }}
            source={image}
            alt={children}
          />
        )}
        <ThemedText type={type} style={{ flex: 0 }} themeColor="white">
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button_base: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  button_container: {
    gap: Spacing.two,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
