import * as Yup from "yup";
const settingScheme = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password is at least 8 charecters ")
    .max(20, "Password at most is 20 charecters"),
  oldPassword: Yup.string()
    .min(8, "previouse Password is at least 8 charecters ")
    .max(20, "Password at most is 20 charecters"),
  // .required("Previous password is required in order to change password"),
  Username: Yup.string()
    .min(4, "User name is at least 4 charecters ")
    .max(20, "User name at most is 20 charecters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
export default settingScheme;
