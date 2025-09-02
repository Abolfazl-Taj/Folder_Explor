import * as Yup from "yup";
const forgotPasswordScheme = Yup.object().shape({
  email: Yup.string().email("Email is invalid.").required("Email is required"),
});
export default forgotPasswordScheme;
