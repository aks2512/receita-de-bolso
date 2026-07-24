import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  number: number;
  description: string;
};

export const Step = ({ number, description }: Props) => {
  const colors = useThemeColors();
  return (
    <ThemedView style={{ ...styles.container, borderColor: colors.secondary }}>
      <Text
        style={{
          ...styles.number,
          backgroundColor: colors.primary,
          color: colors.white,
        }}
      >
        {number}
      </Text>
      <ThemedText style={styles.description} themeColor="quinary">
        {description}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.two,
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.two,
  },
  number: {
    borderRadius: 1000,
    width: Spacing.four,
    textAlign: "center",
    height: Spacing.four,
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    justifyContent: "center",
    alignSelf: "center",
  },
  description: {
    flexShrink: 1,
    width: "100%",
    lineHeight: 18,
  },
});
