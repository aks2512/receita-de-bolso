import { Option } from "@/types/option";
import * as yup from "yup";

export const ConfigSchema = yup.object({
  theme: yup
    .mixed<"light" | "dark">()
    .default("light")
    .required("Campo obrigatório"),
  font_size: yup.number().default(100).required("Campo obrigatório"),
  letter_case: yup
    .mixed<"uppercase" | "lowercase" | "capitalize" | "none">()
    .default("none")
    .required("Campo obrigatório"),
  font_weight: yup
    .mixed<"light" | "regular" | "medium" | "semibold" | "bold" | "default">()
    .default("default")
    .required("Campo obrigatório"),
  language: yup.mixed<Option>().required("Campo obrigatório"),
  gemini_api_key: yup.string().required("Campo obrigatório"),
});

export type IConfigForm = yup.InferType<typeof ConfigSchema>;
