import { RecipeForm } from "@/components/forms/recipe-form";
import { useGetRecipe } from "@/requests/get-recipe";
import { useLocalSearchParams } from "expo-router";

export default function EditRecipe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: recipe } = useGetRecipe(id);

  return recipe ? <RecipeForm type="edit" formData={recipe} /> : null;
}
