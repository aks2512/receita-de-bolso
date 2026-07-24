import { Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  name: string;
  onBack?: () => void;
  onExport?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
};

export const Header = ({ name, onExport, onEdit, onRemove, onBack }: Props) => {
  const colors = useThemeColors();

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedView
        style={{
          ...styles.header,
          borderColor: colors.secondary,
          backgroundColor: colors.background,
        }}
      >
        {onBack && (
          <Pressable
            onPress={onBack}
            accessibilityLabel="Voltar"
            accessibilityRole="button"
          >
            <Image
              style={{ width: 40, height: 40, tintColor: colors.terciary }}
              source={require("@/assets/images/icons/back_arrow.svg")}
              alt="Voltar"
            />
          </Pressable>
        )}
        <ThemedText type="title" style={styles.title}>
          {name}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.buttons}>
        {onEdit && (
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: colors.blue,
            }}
            onPress={onEdit}
            accessibilityLabel="Editar"
            accessibilityRole="button"
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("@/assets/images/icons/edit.svg")}
              alt="Editar"
            />
          </Pressable>
        )}
        {onRemove && (
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: colors.warning,
            }}
            onPress={onRemove}
            accessibilityLabel="Deletar"
            accessibilityRole="button"
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("@/assets/images/icons/trash.svg")}
              alt="Deletar"
            />
          </Pressable>
        )}
        {onExport && (
          <Pressable
            style={{ ...styles.button, backgroundColor: colors.white }}
            onPress={onExport}
            accessibilityLabel="Exportar"
            accessibilityRole="button"
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("@/assets/images/icons/export.svg")}
              alt="Exportar"
            />
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.two,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: Spacing.two,
    borderBottomWidth: 1,
  },
  title: {
    width: "100%",
  },
  button: {
    width: 40,
    height: 40,
    padding: Spacing.two,
    borderRadius: Spacing.two,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: Spacing.two,
    flexDirection: "row",
  },
});
