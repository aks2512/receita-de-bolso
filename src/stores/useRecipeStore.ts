import { STORAGE_KEYS } from "@/utils/storage-keys";
import { IRecipeForm } from "@/validations/recipe-schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type RecipeState = {
  recipes: IRecipeForm[];
  addRecipe: (recipe: Omit<IRecipeForm, "id">) => void;
  editRecipe: (recipe: IRecipeForm) => void;
  findRecipeById: (id: string) => IRecipeForm | undefined;
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
      editRecipe: (updatedRecipe) =>
        set((state) => ({
          recipes: [
            ...state.recipes.map((recipe) =>
              recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
            ),
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
      name: STORAGE_KEYS.recipes,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
