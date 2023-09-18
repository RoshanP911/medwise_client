
import * as Yup from "yup";
export const changePasswordSchema = Yup.object().shape({
 currentPassword:Yup.string().required("Please enter your Current password"),
  password: Yup.string()
    .min(4, "password must be between 4-10")
    .max(10, "password must be between 4-10")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*_\-?])(?=.{4,10}$)/,
      ", One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Please enter your password"),
    cpassword: Yup.string()
.oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

