import * as Yup from "yup";
export const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Your Name is too Short")
    .max(50, "Your Name is too long!")
    .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
    .required("Please enter your name")
    .test(
      "no-empty-spaces",
      "Name cannot be empty spaces",
      (value) => value && value.trim() !== ""
    )
    .required("Please enter your name"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email"),

  password: Yup.string()
    .min(4, "password must be between 4-10")
    .max(10, "password must be between 4-10")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*_\-?])(?=.{4,10}$)/,
      "One Uppercase, One Lowercase, One Number and One Special Character"
    )
    .required("Please enter your password"),

  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please enter your password"),

  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
    .max(5, "Same number repeating more than 5 times")
    .required("Please enter a Mobile Number"),
});
