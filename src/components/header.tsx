import { Colors, Spacing } from "@/constants/theme";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  name: string;
  onBack?: () => void;
  onExport?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
};

export const Header = ({ name, onExport, onEdit, onRemove, onBack }: Props) => {
  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, borderColor: colors.secondary }}>
        {onBack && (
          <Pressable onPress={onBack}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("@/assets/images/icons/back_arrow.svg")}
              alt="Voltar"
            />
          </Pressable>
        )}
        <ThemedText type="title" style={styles.title}>
          {name}
        </ThemedText>
      </View>
      <View style={styles.buttons}>
        {onEdit && (
          <Pressable
            style={{
              ...styles.button,
              backgroundColor: colors.blue,
            }}
            onPress={onEdit}
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
          >
            <Image
              style={{ width: 24, height: 24 }}
              source={require("@/assets/images/icons/trash.svg")}
              alt="Deletar"
            />
          </Pressable>
        )}
        {onExport && (
          <Pressable onPress={onExport}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("@/assets/images/icons/export.svg")}
              alt="Exportar"
            />
          </Pressable>
        )}
      </View>
    </View>
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
