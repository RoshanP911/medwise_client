import * as Yup from "yup";
export const editProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your Name is too Short")
    .max(50, "Your Name is too long!")
    .required("Required"),

  email: Yup.string().email("Invalid email format").required("Required"),

  age: Yup.number()
    .integer("Please enter a valid age")
    .min(18, "You must be at least 18 years old")
,

  mobile: Yup.string()
    .required("Please enter your phone number")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please enter a valid number"
    ),

  address: Yup.string()
    .min(20, "20 letters minimum required"),
});
