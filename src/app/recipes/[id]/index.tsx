import { Alert, Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/header";
import { Ingredient } from "@/components/ingredient";
import { Step } from "@/components/step";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useDeleteRecipe } from "@/requests/delete-recipe";
import { useGetRecipe } from "@/requests/get-recipe";
import { generateRecipePDF } from "@/utils/export";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function RecipeScreen() {
  const colors = useThemeColors();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate: deleteMutate } = useDeleteRecipe({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-recipes"] });
      router.replace("/(tabs)");
      Alert.alert("Sucesso", "Receita deletada com sucesso!");
    },
    onError: () => {
      Alert.alert("Erro", "Houve um erro ao deletar a receita!");
    },
  });
  const { data: recipe, isPending } = useGetRecipe(id);
  const router = useRouter();

  return !isPending ? (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll_view}
          contentContainerStyle={styles.scroll_content}
          showsVerticalScrollIndicator={false}
        >
          {recipe ? (
            <ThemedView
              style={[styles.main, { backgroundColor: colors.background }]}
            >
              <Header
                name={recipe.name}
                onBack={() => router.replace("/(tabs)")}
                onExport={async () => await generateRecipePDF(recipe)}
                onRemove={async () => await deleteMutate(recipe.id as string)}
                onEdit={() => router.replace(`/recipes/${id}/edit`)}
              />
              <Image
                style={styles.image}
                source={recipe.image || require("@/assets/images/no-image.png")}
                alt={recipe.name}
              />

              <ThemedText>{recipe.description}</ThemedText>
              <ThemedText type="subtitle">Ingredientes</ThemedText>
              <ThemedView style={styles.list}>
                {recipe.ingredients?.map((ingredient, index) => (
                  <Ingredient
                    key={index}
                    description={ingredient.description}
                  />
                ))}
              </ThemedView>
              <ThemedText type="subtitle">Preparo</ThemedText>
              <ThemedView style={styles.list}>
                {recipe.steps?.map((step, index) => (
                  <Step
                    key={index}
                    number={index + 1}
                    description={step.description}
                  />
                ))}
              </ThemedView>
            </ThemedView>
          ) : (
            <ThemedText>Nenhum dado da receita foi encontrado!</ThemedText>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  ) : null;
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
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    maxWidth: MaxContentWidth,
  },
  scroll_view: {
    width: "100%",
  },
  scroll_content: {},
  main: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flex: 1,
    gap: Spacing.four,
    width: "100%",
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
