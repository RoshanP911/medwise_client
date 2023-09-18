import * as Yup from "yup";

export const DoctorDetailsSchema = Yup.object().shape({
    registrationNumber:Yup.string()
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .required("Please enter your name"),

    registrationCouncil:Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .required("Please enter your registration Council"),

    registrationYear:Yup.string()
    .matches(/^\d{4}$/, 'Registration year must be a 4-digit number')
    .required("Please enter your registration Year"),

    Qualification:Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .required("Please enter your Qualification"),

    videoCallFees: Yup.number()
  .typeError("Please enter a valid number")
  .required("Please enter your video Call Fees")
  .positive("Video Call Fees must be a positive number")
  .integer("Video Call Fees must be an integer"),


    Specialisation:Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .required("Please enter your Specialisation"),

    City:Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .required("Please enter your City"),

    gender:Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .required("Please enter your gender"),
});