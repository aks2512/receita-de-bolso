import { RECIPE_CATEGORIES_OPTIONS } from "@/constants/categories";
import { Option } from "@/types/option";
import { IRecipeForm } from "@/validations/recipe-schema";
import { useQuery } from "@tanstack/react-query";
import { and, eq, like } from "drizzle-orm";
import { db } from "../../db/client";
import { recipeTable } from "../../db/schema";

export function useGetRecipes(params: {
  search?: string;
  selectedCategory: string;
}) {
  return useQuery({
    queryKey: ["get-recipes", params],
    queryFn: async () => {
      try {
        const data = await db
          .select()
          .from(recipeTable)
          .where(
            params?.selectedCategory === "all"
              ? like(recipeTable.name, `%${params?.search}%`)
              : and(
                  eq(recipeTable.category, params.selectedCategory),
                  like(recipeTable.name, `%${params?.search}%`),
                ),
          );

        const recipes = data.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description || undefined,
          image: item.filePath,
          time: item?.time?.toString(),
          category: RECIPE_CATEGORIES_OPTIONS.find(
            (category) => category.value === item.category,
          ) as Option,
          ingredients: item.ingredients.map((ingredient) => ({
            description: ingredient,
          })),
          steps: item.steps.map((step) => ({
            description: step,
          })),
        })) as IRecipeForm[];
        return recipes;
      } catch (error) {
        console.error("Erro ao pegar receitas:", error);
        return [];
      }
    },
    initialData: [],
  });
}

export function useGetRecipe(id: string) {
  return useQuery({
    queryKey: ["get-recipe", id],
    queryFn: async () => {
      try {
        const data = await db
          .select()
          .from(recipeTable)
          .where(eq(recipeTable.id, id))
          .limit(1);
        const userData = data?.[0];

        return userData
          ? ({
              id: userData.id,
              name: userData.name,
              description: userData.description || undefined,
              image: userData.filePath,
              time: userData?.time?.toString(),
              category: RECIPE_CATEGORIES_OPTIONS.find(
                (category) => category.value === userData.category,
              ) as Option,
              ingredients: userData.ingredients.map((ingredient) => ({
                description: ingredient,
              })),
              steps: userData.steps.map((step) => ({
                description: step,
              })),
            } as IRecipeForm)
          : undefined;
      } catch (error) {
        console.error("Erro ao pegar receita:", error);
        return undefined;
      }
    },
  });
}
