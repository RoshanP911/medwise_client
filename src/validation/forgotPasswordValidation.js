import * as Yup from "yup";
export const forgotPassSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email Required"),
})