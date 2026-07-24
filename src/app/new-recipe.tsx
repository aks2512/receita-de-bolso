import { RecipeForm } from "@/components/forms/recipe-form";
import { LoadingOverlay } from "@/components/loading-overlay";
import { processSharedImage } from "@/utils/extract-image-recipe";
import { processSharedLink } from "@/utils/extract-link-recipe";
import { IRecipeForm } from "@/validations/recipe-schema";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function NewRecipe() {
  const [formData, setFormData] = useState<Partial<IRecipeForm> | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { type, content } = useLocalSearchParams<{
    type?: string;
    content?: string;
  }>();

  useEffect(() => {
    if (!content) return;

    (async () => {
      setIsLoading(true);
      try {
        if (type === "photo") {
          const recipeData = await processSharedImage(content);
          setFormData(recipeData);
        } else if (type === "link") {
          const recipeData = await processSharedLink(content);
          setFormData(recipeData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados compartilhados:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [content, type]);

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <RecipeForm formData={formData} />
    </>
  );
}
