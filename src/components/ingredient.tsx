import { Colors, Spacing } from "@/constants/theme";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  name: string;
  amount: string;
};

export const Ingredient = ({ name, amount }: Props) => {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];
  return (
    <View style={{ ...styles.container, borderColor: colors.secondary }}>
      <ThemedText themeColor="terciary">{name}</ThemedText>
      <ThemedText themeColor="quinary">{amount}</ThemedText>
    </View>
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
