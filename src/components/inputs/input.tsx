import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import React, { ComponentProps, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

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
  const colors = useThemeColors();
  const [inputHeight, setInputHeight] = useState(51);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <ThemedView
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          {label && (
            <ThemedView
              style={[
                styles.label_container,
                { width: "100%", backgroundColor: colors.background },
              ]}
            >
              {label && <ThemedText themeColor="terciary">{label}</ThemedText>}
              {description && (
                <ThemedText type="small" themeColor="quaternary">
                  {description}
                </ThemedText>
              )}
            </ThemedView>
          )}
          <TextInput
            multiline
            placeholderTextColor={colors.quinary}
            onContentSizeChange={(event) => {
              setInputHeight(event.nativeEvent.contentSize.height);
            }}
            style={{
              ...styles.input,
              color: colors.quinary,
              borderColor: colors.quaternary,
              height: Math.max(51, inputHeight),
              backgroundColor: colors.background,
            }}
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
        </ThemedView>
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
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.two,
  },
});
