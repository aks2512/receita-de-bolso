import * as yup from "yup";

export const SearchSchema = yup.object({
  search: yup.string().required("Campo obrigatório"),
});

export type SearchForm = yup.InferType<typeof SearchSchema>;
