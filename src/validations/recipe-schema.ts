import { Option } from "@/types/option";
import * as yup from "yup";

const IngredientSchema = yup.object({
  description: yup.string().required("Campo obrigatório"),
});

const StepSchema = yup.object({
  description: yup.string().required("Campo obrigatório"),
});

export const RecipeSchema = yup.object({
  id: yup.string().optional(),
  image: yup.string().nullable(),
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: yup
    .string()
    .optional()
    .max(100, "A descrição não pode passar de 100 caracteres"),
  time: yup.string().optional(),
  category: yup.mixed<Option>().required("Campo obrigatório"),
  ingredients: yup.array(IngredientSchema).min(1, "Mínimo de um ingrediente"),
  steps: yup.array(StepSchema).min(1, "Mínimo de um passo"),
});

export type IRecipeForm = yup.InferType<typeof RecipeSchema>;
