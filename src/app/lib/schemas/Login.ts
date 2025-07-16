import * as Yup from "yup";
const LoginScheme = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password is at least 8 charecters ")
    .max(20, "Password at most is 20 charecters")
    .required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
export default LoginScheme;
