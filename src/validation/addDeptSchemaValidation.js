import * as Yup from "yup";
export const addDeptSchema = Yup.object().shape({
  departmentName: Yup.string()
    .min(2, "Your Name is too Short")
    .max(50, "Your Name is too long!")
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .required("Please enter your department name"),
});