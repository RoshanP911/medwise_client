import * as Yup from "yup";
export const userLoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email Required"),
    password: Yup.string().required("Password required")
})