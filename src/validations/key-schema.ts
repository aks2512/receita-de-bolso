import * as yup from "yup";

export const KeySchema = yup.object({
  key: yup.string().required("Campo obrigatório"),
});

export type IKeyForm = yup.InferType<typeof KeySchema>;
