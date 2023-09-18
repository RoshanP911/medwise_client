import * as Yup from "yup";
export const resetPassSchema = Yup.object().shape({
    password: Yup.string()
    .min(4, "password must be between 4-10")
    .max(10, "password must be between 4-10")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*_\-?])(?=.{4,10}$)/,
      "One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please enter your password")
})