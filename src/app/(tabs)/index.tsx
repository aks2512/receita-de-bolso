import { Platform, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Categories } from "@/components/categories";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/inputs/search-input";
import { Recipes } from "@/components/recipes";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { RECIPE_CATEGORIES } from "@/constants/categories";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useDebounce } from "@/hooks/use-debounce";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useGetRecipes } from "@/requests/get-recipe";
import { ISearchForm, SearchSchema } from "@/validations/search-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function HomeScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const { control, watch } = useForm<ISearchForm>({
    mode: "onChange",
    resolver: yupResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");
  const debouncedSearchValue = useDebounce(searchValue, 600);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: recipes, isPending } = useGetRecipes({
    search: debouncedSearchValue,
    selectedCategory,
  });

  const handleCategory = (value: string) => {
    setSelectedCategory(value);
  };

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
          <ThemedView
            style={[styles.main, { backgroundColor: colors.background }]}
          >
            <Header name="Home" />
            <Pressable onPress={() => router.replace("/new-recipe")}>
              <ThemedView type="primary" style={styles.button}>
                <Image
                  style={{ width: 24, height: 24, tintColor: colors.white }}
                  source={require("@/assets/images/icons/recipe.svg")}
                  alt="Adicionar receita"
                />
                <ThemedText themeColor="white" style={{ flex: 0 }}>
                  Adicionar Receita
                </ThemedText>
              </ThemedView>
            </Pressable>
            <SearchInput
              name="search"
              control={control}
              placeholder="Buscar receita"
            />

            <Categories
              categories={RECIPE_CATEGORIES}
              selected={selectedCategory}
              onChange={handleCategory}
            />
            <Recipes recipes={recipes} />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    ...Platform.select({
      web: {
        paddingTop: 100,
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
  button: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.two,
  },
});
