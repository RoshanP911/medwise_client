import React from "react";
import { Routes, Route } from "react-router-dom";



import LandingPage from "../pages/User/LandingPage";
import SignupPage from "../pages/SignupPage";
import Otp from "../components/Otp/Otp.jsx";
import Login from "../components/Login/Login.jsx";
import ForgotPassword from "../components/Forgot Password/ForgotPassword.jsx";
import ResetPassword from "../components/Reset Password/ResetPassword.jsx";
import Profile from "../components/Profile/Profile.jsx";
import EditProfile from "../components/Profile/EditProfile.jsx";

                                       /* USER ROUTES */
function User() {
return (
    <>
    <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/register" element={<SignupPage/>}/>
    <Route path="/otp" element={<Otp/>}/>
    <Route path="/resend-otp" element={<Otp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/home" element={<LandingPage/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/edit-profile" element={<EditProfile/>}/>

    </Routes>
    </>
)
}


export default User;