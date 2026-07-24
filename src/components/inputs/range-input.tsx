import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import Slider from "@react-native-community/slider";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type Props = {
  name: string;
  label?: string;
  description?: string;
  control: any;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  unit?: string; // ex: "min", "kg", "°C"
};

export function RangeInput({
  name,
  label,
  control,
  description,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  unit = "",
}: Props) {
  const colors = useThemeColors();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <ThemedView style={styles.container}>
            <ThemedView style={styles.label_container}>
              {label && <ThemedText themeColor="terciary">{label}</ThemedText>}
              {description && (
                <ThemedText type="small" themeColor="quaternary">
                  {description}
                </ThemedText>
              )}
            </ThemedView>

            <ThemedView style={styles.value_row}>
              <ThemedText
                style={{ textAlign: "center" }}
                themeColor="quaternary"
              >
                {minimumValue}
                {unit}
              </ThemedText>
              <ThemedText style={{ textAlign: "center" }} themeColor="terciary">
                {field.value ?? minimumValue}
                {unit}
              </ThemedText>
              <ThemedText
                style={{ textAlign: "center" }}
                themeColor="quaternary"
              >
                {maximumValue}
                {unit}
              </ThemedText>
            </ThemedView>

            <Slider
              value={field.value ?? minimumValue}
              onValueChange={field.onChange}
              minimumValue={minimumValue}
              maximumValue={maximumValue}
              step={step}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.terciary}
              thumbTintColor={colors.primary}
            />

            {error && (
              <ThemedText type="small" themeColor="warning">
                {error.message}
              </ThemedText>
            )}
          </ThemedView>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  label_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },

  value_row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
