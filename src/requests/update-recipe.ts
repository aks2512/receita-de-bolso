import { MutationProps } from "@/types/mutation-props";
import { IRecipeForm } from "@/validations/recipe-schema";
import { useMutation } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { recipeTable } from "../../db/schema";

export function useUpdateRecipe(props?: MutationProps) {
  return useMutation({
    mutationKey: ["update-recipe"],
    mutationFn: async (form: IRecipeForm) => {
      try {
        await db
          .update(recipeTable)
          .set({
            filePath: form.image,
            name: form.name,
            description: form?.description,
            category: form?.category?.value as string,
            time: form?.time ? Number(form?.time) : undefined,
            ingredients: form?.ingredients?.map(
              (ingredient) => ingredient.description,
            ),
            steps: form?.steps?.map((step) => step.description),
          })
          .where(eq(recipeTable.id, form.id as string));
      } catch (error) {
        console.error("Erro ao criar receita:", error);
        throw error;
      }
    },
    ...props,
  });
}
