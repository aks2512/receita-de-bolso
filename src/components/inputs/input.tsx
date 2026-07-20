import { Colors, Spacing } from "@/constants/theme";
import React, { ComponentProps } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text";

type Props = Omit<ComponentProps<typeof TextInput>, "style"> & {
  control: any;
  name: string;
  label?: string;
  description?: string;
  maskFunction?: (value?: string) => string;
};

export const Input = ({
  control,
  name,
  label,
  description,
  maskFunction,
  ...rest
}: Props) => {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <View style={styles.container}>
          <View style={styles.label_container}>
            {label && <ThemedText themeColor="terciary">{label}</ThemedText>}
            {description && (
              <ThemedText type="small" themeColor="quaternary">
                {description}
              </ThemedText>
            )}
          </View>
          <TextInput
            placeholderTextColor={colors.quinary}
            style={{ ...styles.input, borderColor: colors.quaternary }}
            onChangeText={(e) =>
              field.onChange(maskFunction ? maskFunction(e) : e)
            }
            value={field.value}
            {...rest}
          />
          {error?.message && (
            <ThemedText type="small" themeColor="warning">
              {error.message}
            </ThemedText>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.two,
  },
  label_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.two,
    backgroundColor: "#ffffff",
  },
});
