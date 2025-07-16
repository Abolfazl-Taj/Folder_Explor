import * as Yup from "yup";

const RegisterScheme = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can be at most 20 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[0-9]/, "Must have a number in it")
    .matches(/[@,#,$,!]/, "Must include one special character (@, #, $, !)")
    .required("Password is required"),

  confirmPass: Yup.string()
    .oneOf([Yup.ref("password")], "Dosent match password")
    .required("Confirm password is required!"),
});

export default RegisterScheme;
