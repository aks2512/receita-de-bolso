import { generateRecipePDF, RecipeData } from "@/utils/export";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  recipe: RecipeData;
  onBack: () => void;
  onExport: () => void;
};

export const Header = ({ recipe, onBack }: Props) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack}>
        <Image
          style={styles.image}
          source={require("@/assets/images/icons/back_arrow.svg")}
          alt="Voltar"
        />
      </Pressable>
      <ThemedText type="title">{recipe.name}</ThemedText>
      <Pressable onPress={() => generateRecipePDF(recipe)}>
        <Image
          style={styles.image}
          source={require("@/assets/images/icons/export.svg")}
          alt="Exportar"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 40,
    height: 40,
  },
});
