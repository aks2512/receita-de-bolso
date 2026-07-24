import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  description: string;
};

export const Ingredient = ({ description }: Props) => {
  const colors = useThemeColors();
  return (
    <ThemedView style={{ ...styles.container, borderColor: colors.secondary }}>
      <ThemedText themeColor="terciary">{description}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    borderBottomWidth: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
