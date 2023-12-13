import * as Yup from "yup";
export const editProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your Name is too Short")
    .max(50, "Your Name is too long!")
    .matches(/^\S.*\S$/, 'Name cannot start or end with blankspace')
    .required("Please enter your name"),

  email: Yup.string().email("Invalid email format").required("Please enter your email"),

  age: Yup.number()
    .integer("Please enter a valid age")
    .min(18, "You must be at least 18 years old")
    .max(115,"Age cannot be more than 120")
    .required("Please enter your age"),

  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
    .required("Please enter a Mobile Number"),

  address: Yup.string()
    .min(20, "20 letters minimum required")
    .matches(/^\S.*\S$/, 'Address cannot start or end with blankspace')
    .required("Please enter your address"),

});
