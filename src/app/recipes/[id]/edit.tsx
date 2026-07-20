import { RecipeForm } from "@/components/forms/recipe-form";
import { useRecipeStore } from "@/stores/useRecipeStore";
import { IRecipeForm } from "@/validations/recipe-schema";
import { useLocalSearchParams } from "expo-router";

export default function EditRecipe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const findRecipeById = useRecipeStore((state) => state.findRecipeById);
  const recipe = findRecipeById(id) as IRecipeForm;

  return <RecipeForm type="edit" formData={recipe} />;
}
