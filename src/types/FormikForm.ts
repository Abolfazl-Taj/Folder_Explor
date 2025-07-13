import { ReactNode } from "react";
import * as Yup from "yup";

export type FormikFormType<T> = {
  children: ReactNode;
  schema: Yup.AnyObjectSchema;
  initialState: object;
  onSubmit: any
};
