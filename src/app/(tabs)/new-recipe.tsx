import { RecipeForm } from "@/components/forms/recipe-form";
import { processSharedImage } from "@/utils/extract-image-recipe";
import { processSharedLink } from "@/utils/extract-link-recipe";
import { IRecipeForm } from "@/validations/recipe-schema";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function NewRecipe() {
  const [formData, setFormData] = useState<Partial<IRecipeForm> | undefined>(
    undefined,
  );
  const { type, content } = useLocalSearchParams<{
    type?: string;
    content?: string;
  }>();

  useEffect(() => {
    (async () => {
      if (content && type === "photo") {
        const recipeData = await processSharedImage(content);
        setFormData(recipeData);
      } else if (content && type === "link") {
        const recipeData = await processSharedLink(content);
        setFormData(recipeData);
      }
    })();
  }, [content, type]);

  return <RecipeForm formData={formData} />;
}
