import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { Ingredient } from "@/components/ingredient";
import { Step } from "@/components/step";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { generateRecipePDF } from "@/utils/export";
import { IRecipeForm } from "@/validations/recipe-schema";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const findRecipeById = useRecipeStore((state) => state.findRecipeById);
  const removeRecipe = useRecipeStore((state) => state.deleteRecipe);
  const recipe = findRecipeById(id) as IRecipeForm;
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.main}>
            <Header
              name={recipe.name}
              onBack={() => router.replace("/(tabs)")}
              onExport={async () => await generateRecipePDF(recipe)}
              onRemove={async () => {
                await removeRecipe(recipe.id as string);
                router.replace("/(tabs)");
              }}
              onEdit={() => router.replace(`/recipes/${id}/edit`)}
            />
            <Image
              style={styles.image}
              source={recipe.image}
              alt={recipe.name}
            />

            <ThemedText>{recipe.description}</ThemedText>
            <ThemedText type="subtitle">Ingredientes</ThemedText>
            <View style={styles.list}>
              {recipe.ingredients?.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  name={ingredient.name}
                  quantity={ingredient.quantity}
                />
              ))}
            </View>
            <ThemedText type="subtitle">Preparo</ThemedText>
            <View style={styles.list}>
              {recipe.steps?.map((step, index) => (
                <Step
                  key={index}
                  number={index + 1}
                  description={step.description}
                />
              ))}
            </View>
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    ...Platform.select({
      web: {
        paddingTop: Spacing.four,
      },
    }),
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    maxWidth: MaxContentWidth,
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {},
  main: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    gap: Spacing.four,
    width: "100%",
    backgroundColor: Colors.background,
  },
  image: {
    width: "100%",
    height: 304,
    borderRadius: Spacing.two,
  },
  list: {
    flexDirection: "column",
  },
});
