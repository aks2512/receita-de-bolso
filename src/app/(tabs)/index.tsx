import { Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Categories } from "@/components/categories";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/inputs/search-input";
import { Recipes } from "@/components/recipes";
import { ThemedView } from "@/components/themed-view";
import { RECIPE_CATEGORIES } from "@/constants/categories";
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme";
import { useDebounce } from "@/hooks/use-debounce";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { SearchForm, SearchSchema } from "@/validations/search-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

export default function HomeScreen() {
  const { control, watch } = useForm<SearchForm>({
    mode: "onChange",
    resolver: yupResolver(SearchSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");
  const debouncedSearchValue = useDebounce(searchValue, 600);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const recipes = useRecipeStore(
    useShallow((state) =>
      state.recipes.filter((recipe) => {
        const matchesSearch = recipe?.name
          ?.toLowerCase()
          ?.includes(debouncedSearchValue?.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" ||
          recipe.category.value === selectedCategory;

        return matchesSearch && matchesCategory;
      }),
    ),
  );

  const handleCategory = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.main}>
            <Header name="Home" />
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
  );
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
});
