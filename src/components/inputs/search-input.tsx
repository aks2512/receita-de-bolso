import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Image } from "expo-image";
import React, { ComponentProps } from "react";
import { Controller } from "react-hook-form";
import { Platform, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "../themed-view";

type Props = Omit<ComponentProps<typeof TextInput>, "style"> & {
  name: string;
  control: any;
};

export const SearchInput = ({ name, control, ...rest }: Props) => {
  const colors = useThemeColors();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ThemedView
          style={{
            ...styles.container,
            borderColor: colors.quaternary,
            backgroundColor: colors.background,
          }}
        >
          <TextInput
            placeholderTextColor={colors.quinary}
            style={{
              ...styles.input,
              color: colors.quaternary,
              backgroundColor: colors.background,
            }}
            onChangeText={field.onChange}
            value={field.value}
            {...rest}
          />
          <Image
            style={styles.image}
            alt="Pesquisar"
            source={require("@/assets/images/icons/search.svg")}
          />
        </ThemedView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderWidth: 1,
    borderRadius: Spacing.two,
    gap: Spacing.two,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "100%",
    fontSize: 14,
    fontWeight: "300",
    ...Platform.select({
      web: {
        outlineStyle: "none" as any,
      },
    }),
  },
  image: {
    width: Spacing.four,
    height: Spacing.four,
    position: "absolute",
    right: Spacing.three,
  },
});
