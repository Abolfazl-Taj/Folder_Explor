import { ReactNode } from "react";
import { FormikHelpers } from "formik";

export type FormikFormType<> = {
  initialState: any;
  schema: any;
  onSubmit: (values: any, formikHelpers?: FormikHelpers<any>) => void;
  children:
    | ReactNode
    | ((formik: FormikHelpers<any> & { values: any }) => ReactNode);
};
