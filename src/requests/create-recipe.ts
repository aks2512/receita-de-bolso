import { MutationProps } from "@/types/mutation-props";
import { IRecipeForm } from "@/validations/recipe-schema";
import { useMutation } from "@tanstack/react-query";
import * as Crypto from "expo-crypto";
import { db } from "../../db/client";
import { recipeTable } from "../../db/schema";

export function useCreateRecipe(props?: MutationProps) {
  return useMutation({
    mutationKey: ["create-recipe"],
    mutationFn: async (form: IRecipeForm) => {
      try {
        const data = await db.insert(recipeTable).values({
          id: Crypto.randomUUID(),
          filePath: form.image,
          name: form.name,
          description: form?.description,
          category: form?.category?.value as string,
          time: form?.time ? Number(form?.time) : undefined,
          ingredients: form?.ingredients?.map((i) => i.description) ?? [],
          steps: form?.steps?.map((s) => s.description) ?? [],
        });
      } catch (error) {
        console.error("Erro ao criar receita:", error);
        throw error;
      }
    },
    ...props,
  });
}
