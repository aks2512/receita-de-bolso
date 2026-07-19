import { Option } from "@/types/option";
import * as yup from "yup";

const IngredientSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  quantity: yup.string().required("Campo obrigatório"),
});

const StepSchema = yup.object({
  description: yup.string().required("Campo obrigatório"),
});

export const RecipeSchema = yup.object({
  id: yup.string().optional(),
  image: yup.string().optional(),
  name: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: yup
    .string()
    .optional()
    .max(100, "A descrição não pode passar de 100 caracteres"),
  time: yup.string().required("Campo obrigatório"),
  category: yup.mixed<Option>().required("Campo obrigatório"),
  ingredients: yup.array(IngredientSchema).min(1, "Mínimo de um ingrediente"),
  steps: yup.array(StepSchema).min(1, "Mínimo de um passo"),
});

export type RecipeForm = yup.InferType<typeof RecipeSchema>;
