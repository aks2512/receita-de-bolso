import { MutationProps } from "@/types/mutation-props";
import { useMutation } from "@tanstack/react-query";
import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { recipeTable } from "../../db/schema";

export function useDeleteRecipe(props?: MutationProps) {
  return useMutation({
    mutationKey: ["delete-recipe"],
    mutationFn: async (id: string) => {
      await db.delete(recipeTable).where(eq(recipeTable.id, id));
    },
    ...props,
  });
}
