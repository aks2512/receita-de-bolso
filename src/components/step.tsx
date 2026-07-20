import { Colors, Spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  number: number;
  description: string;
};

export const Step = ({ number, description }: Props) => {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];
  return (
    <View style={{ ...styles.container, borderColor: colors.secondary }}>
      <ThemedText
        themeColor="white"
        style={{ ...styles.number, backgroundColor: colors.primary }}
      >
        {number}
      </ThemedText>
      <ThemedText style={styles.description} themeColor="quinary">
        {description}
      </ThemedText>
    </View>
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
    justifyContent: "center",
    alignSelf: "center",
  },
  description: {
    flexShrink: 1,
    width: "100%",
    lineHeight: 18,
  },
});
