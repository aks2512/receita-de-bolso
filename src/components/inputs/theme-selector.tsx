import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Controller } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type Props = {
  name: string;
  label?: string;
  description?: string;
  control: any;
};

export function ThemeSelector({ name, label, control, description }: Props) {
  const colors = useThemeColors();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <ThemedView style={styles.container}>
            <ThemedView style={styles.label_container}>
              {label && (
                <ThemedText themeColor={"terciary"}>{label}</ThemedText>
              )}
              {description && (
                <ThemedText type="small" themeColor="quaternary">
                  {description}
                </ThemedText>
              )}
            </ThemedView>

            <ScrollView
              showsVerticalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.scroll_view}
            >
              {["Light", "Dark"].map((item) => (
                <ThemedView
                  key={item}
                  style={[
                    styles.scroll_content,
                    {
                      backgroundColor:
                        field.value === item.toLowerCase()
                          ? colors.primary
                          : colors.background,
                      borderColor: colors.quinary,
                    },
                  ]}
                >
                  <Pressable onPress={() => field.onChange(item.toLowerCase())}>
                    <ThemedText
                      style={{ textAlign: "center" }}
                      themeColor={
                        field.value === item.toLowerCase() ? "white" : "quinary"
                      }
                    >
                      {item}
                    </ThemedText>
                  </Pressable>
                </ThemedView>
              ))}
            </ScrollView>

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
  scroll_view: {
    gap: Spacing.two,
  },
  scroll_content: {
    width: 120,
    justifyContent: "center",
    borderRadius: Spacing.two,
    borderWidth: 1,
    padding: Spacing.one,
  },
  button: {
    position: "absolute",
    top: Spacing.two,
    right: Spacing.two,
    padding: Spacing.two,
    borderRadius: Spacing.two,
  },
});
