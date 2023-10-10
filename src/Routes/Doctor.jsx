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
import PrivateRoute from "../components/Doctor/PrivateRoute.jsx";
import AddSlot from "../components/Doctor/AddSlot.jsx";



                                       /* DOCTOR ROUTES */
function Doctor() {
    
return (
    <>
    <DoctorNavbar />
    <Routes>
    <Route path="/register" element={<SignUp value={'doctor'}/>}/> 
    <Route path="/otp" element={<Otp value={'doctor'}/>}/> 
    <Route path="/resend-otp" element={<Otp value={'doctor'}/>}/>
    <Route path="/login" element={<Login value={'doctor'}/>}/>
    <Route path="/forgot-password" element={<DoctorForgotPassword value={'doctor'}/>}/>
    <Route path="/reset-password/:id/:token" element={<DoctorResetPassword value={'doctor'}/>}/>


    <Route path="" element={<PrivateRoute/>}> 
        <Route path="/home" element={<Banner />}/> 
        <Route path="/details" element={<DoctorDetails  />}/>
        <Route path="/add-slot" element={<AddSlot  />}/>
        
        


    </Route>

    </Routes>
    </>
)
}


//value={'doctor'}
//passing value as props
export default Doctor;