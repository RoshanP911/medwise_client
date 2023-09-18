import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/Signup/Signup.jsx";
import Otp from "../components/Otp/Otp.jsx";
import Login from "../components/Login/Login.jsx";
import Banner from "../components/userComponents/Home/Banner.jsx";
import DoctorDetails from "../components/Doctor/DoctorDetails.jsx";
import DoctorForgotPassword from "../components/Forgot Password/DoctorForgotPassword.jsx";
import DoctorResetPassword from "../components/Reset Password/DoctorResetPassword.jsx";
import DoctorNavbar from "../components/Doctor/DoctorNavbar.jsx";



                                       /* DOCTOR ROUTES */
function Doctor() {
    
return (
    <>
    {/* <DoctorNavbar /> */}
    <Routes>
    <Route path="/register" element={<SignUp value={'doctor'}/>}/> 
    <Route path="/otp" element={<Otp value={'doctor'}/>}/> 
    <Route path="/resend-otp" element={<Otp value={'doctor'}/>}/>
    <Route path="/login" element={<Login value={'doctor'}/>}/>
    <Route path="/home" element={<Banner value={'doctor'}/>}/>
    <Route path="/details" element={<DoctorDetails value={'doctor'} />}/>
    <Route path="/forgot-password" element={<DoctorForgotPassword value={'doctor'}/>}/>
    <Route path="/reset-password/:id/:token" element={<DoctorResetPassword value={'doctor'}/>}/>
    </Routes>
    </>
)
}

//passing value as props
export default Doctor;