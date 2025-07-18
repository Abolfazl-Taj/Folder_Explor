export type inputType = {
  labelName: string;
  type: "text" | "password" | "confirmPassword";
  placeHolder: string;
  name: string;
  inputClass?: string;
  labelClass?: string;
  icon?: React.ReactNode;
  strengthBar?: boolean;
};
