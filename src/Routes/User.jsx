import {React,Suspense} from "react";
import { Routes, Route } from "react-router-dom";


import LandingPage from "../pages/User/LandingPage";
import SignupPage from "../pages/SignupPage";
import Otp from "../components/Otp/Otp.jsx";
import Login from "../components/Login/Login.jsx";
import ForgotPassword from "../components/Forgot Password/ForgotPassword.jsx";
import ResetPassword from "../components/Reset Password/ResetPassword.jsx";
import Profile from "../components/Profile/Profile.jsx";
import EditProfile from "../components/Profile/EditProfile.jsx";
import Navbar from "../components/Navbar/Navbar";
import PrivateRoute from "../components/userComponents/Home/PrivateRoute";
import Loader from "../components/Loader";
import FindDoctors from "../components/userComponents/Home/FindDoctors";
import BookAppointment from '../components/userComponents/Home/BookAppointment'

                                       /* USER ROUTES */
function User() {
return (
    <>
    <Navbar/>
    <Suspense fallback={<Loader />}> 
    <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/register" element={<SignupPage/>}/>
    <Route path="/otp" element={<Otp/>}/>
    <Route path="/resend-otp" element={<Otp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>

     {/* PRIVATE ROUTES */}
    <Route path="" element={<PrivateRoute/>}>
       <Route path="/home" element={<LandingPage/>}/>  
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/edit-profile" element={<EditProfile/>}/>
       <Route path="/find-doctors" element={<FindDoctors/>}/>
       <Route path="/book-appointment/:id" element={<BookAppointment/>}/>
       


    </Route>

    
    </Routes>
    </Suspense>
    </>
)
}


export default User;