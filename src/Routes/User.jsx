import {React} from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/User/LandingPage";
import Otp from "../components/Otp/Otp.jsx";
import Login from "../components/Login/Login.jsx";
import ForgotPassword from "../components/Forgot Password/ForgotPassword.jsx";
import ResetPassword from "../components/Reset Password/ResetPassword.jsx";
import Profile from "../components/Profile/Profile.jsx";
import EditProfile from "../components/Profile/EditProfile.jsx";
import Navbar from "../components/Navbar/Navbar";
import PrivateRoute from "../components/userComponents/Home/PrivateRoute";
import FindDoctors from "../components/userComponents/Home/FindDoctors";
import BookAppointment from '../components/userComponents/Home/BookAppointment'
import ConfirmAppointment from "../components/userComponents/ConfirmAppointment";
import Success from "../components/userComponents/Home/Success";
import Cancel from "../components/userComponents/Home/Cancel";
import SignUp from "../components/Signup/Signup";
import Appointments from "../components/userComponents/Home/Appointments";
import VideoCall from "../components/VideoCall";
import Prescription from "../components/userComponents/Home/Prescription";
import Reviews from "../components/userComponents/Home/Reviews";
import Wallet from "../components/userComponents/Home/Wallet.jsx";

                                       /* USER ROUTES */
function User() {
    
return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/register" element={<SignUp value={'user'}/>}/>
    <Route path="/otp" element={<Otp value={'user'}/>}/>
    <Route path="/resend-otp" element={<Otp value={'user'}/>}/>
    <Route path="/login" element={<Login value={'user'}/>}/> 
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/>
    <Route path="/find-doctors" element={<FindDoctors/>}/>
       

     {/* PRIVATE ROUTES */}
    <Route path="" element={<PrivateRoute/>}>
       <Route path="/home" element={<LandingPage/>}/>  
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/edit-profile" element={<EditProfile/>}/>
       <Route path="/book-appointment/:id" element={<BookAppointment/>}/>
       <Route path="/confirm-appointment" element={<ConfirmAppointment/>}/>
       <Route path="/success" element={<Success value={'user'}/>}/>
       <Route path="/cancel" element={<Cancel/>}/>
       <Route path="/appointments" element={<Appointments/>}/>
       <Route path="/call/:room" element={<VideoCall value={'user'}/>}/>
       <Route path='/prescription' element={<Prescription />} />
       <Route path='/review' element={<Reviews />} />
       <Route path='/wallet' element={<Wallet />} />




    </Route>
    </Routes>
    </>
)
}


export default User;