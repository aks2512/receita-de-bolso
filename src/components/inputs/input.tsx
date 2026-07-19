import { Colors } from "@/constants/theme";
import React, { ComponentProps } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";
import { ThemedText } from "../themed-text";

type Props = Omit<ComponentProps<typeof TextInput>, "style"> & {
  control: any;
  name: string;
  label?: string;
  description?: string;
  error?: string;
  maskFunction?: (value?: string) => string;
};

export const Input = ({
  control,
  name,
  label,
  error,
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
      render={({ field }) => (
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
          {error && (
            <ThemedText type="small" themeColor="warning">
              {error}
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
    gap: 8,
  },
  label_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
});
