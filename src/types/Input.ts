export type inputType = {
  labelName: string;
  type: "text" | "password" | "confirmPassword" | "file";
  placeHolder: string;
  name: string;
  inputClass?: string;
  labelClass?: string;
  icon?: React.ReactNode;
  strengthBar?: boolean;
  defaultValue? :string
  className?: string
};
