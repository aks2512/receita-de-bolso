import { RecipeForm } from "@/validations/recipe-schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type RecipeState = {
  recipes: RecipeForm[];
  addRecipe: (recipe: Omit<RecipeForm, "id">) => void;
  findRecipeById: (id: string) => RecipeForm | undefined;
  deleteRecipe: (id: string) => void;
};

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: [],
      addRecipe: (newRecipe) =>
        set((state) => ({
          recipes: [
            { id: Date.now().toString(), ...newRecipe },
            ...state.recipes,
          ],
        })),
      findRecipeById: (id) => {
        return get().recipes.find((recipe) => recipe.id === id);
      },
      deleteRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
        })),
    }),
    {
      name: "APP_RECIPES",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
