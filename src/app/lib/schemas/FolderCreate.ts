import * as Yup from "yup";
const CreateFolderScheme = Yup.object().shape({
  name: Yup.string()
    .min(4, "Folder name is at least 4 charecters ")
    .max(20, "Folder name at most is 20 charecters")
    .required("This field is required"),
});
export default CreateFolderScheme;

export const CreateFileSchema = Yup.object({
  name: Yup
    .string()
    .trim()
    .required("File name is required")
    .matches(/^[^\\/:*?"<>|]+$/, "Invalid characters in filename"),
  content: Yup.string().optional(),
});