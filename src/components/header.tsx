import { Colors } from "@/constants/theme";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { generateRecipePDF } from "@/utils/export";
import { RecipeForm } from "@/validations/recipe-schema";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./themed-text";

type Props = {
  recipe: RecipeForm;
  onBack: () => void;
  onExport: () => void;
};

export const Header = ({ recipe, onBack }: Props) => {
  const removeRecipe = useRecipeStore((state) => state.deleteRecipe);

  const scheme = useColorScheme();
  const colors =
    scheme === undefined || scheme === null ? Colors.light : Colors[scheme];

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
      <View style={styles.buttons}>
        <Pressable onPress={() => generateRecipePDF(recipe)}>
          <Image
            style={styles.image}
            source={require("@/assets/images/icons/export.svg")}
            alt="Exportar"
          />
        </Pressable>
        <Pressable
          style={{
            ...styles.button,
            backgroundColor: colors.warning,
          }}
          onPress={() => removeRecipe(recipe.id as string)}
        >
          <Image
            style={{ width: 16, height: 16 }}
            source={require("@/assets/images/icons/trash.svg")}
            alt="Deletar"
          />
        </Pressable>
      </View>
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
  button: {
    padding: 8,
    borderRadius: 8,
  },
  buttons: {
    gap: 8,
    flexDirection: "row",
  },
});
