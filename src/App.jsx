import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// import Login from "./components/Login/Login.jsx";
// import SignupPage from "./pages/SignupPage.js";
// import Otp from "./components/Otp/Otp.jsx";
 
// import LandingPage from "./pages/User/LandingPage.js";
// import SignUp from "./components/Signup/Signup.jsx";
// import Banner from "./components/userComponents/Home/Banner.jsx";
// import Dashboard from "./components/Admin/Dashboard.jsx";
// import ForgotPassword from "./components/Forgot Password/ForgotPassword.jsx";
// import DoctorForgotPassword from "./components/Forgot Password/DoctorForgotPassword.jsx";

// import ResetPassword from "./components/Reset Password/ResetPassword.jsx";
// import DoctorResetPassword from "./components/Reset Password/DoctorResetPassword.jsx";

// import Profile from "./components/Profile/Profile.jsx";
// import EditProfile from "./components/Profile/EditProfile.jsx";
// import UserList from "./components/Admin/UserList.jsx";
// import DoctorList from "./components/Admin/DoctorList.jsx";
// import DepartmentList from "./components/Admin/DepartmentList.jsx";

// import DoctorDetails from "./components/Doctor/DoctorDetails.jsx";
// import AddDepartment from "./components/Admin/AddDepartment.jsx";



import { Toaster } from "react-hot-toast";



import Admin from './Routes/Admin.jsx'
import User from './Routes/User.jsx'
import Doctor from "./Routes/Doctor.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <Routes>
          {/* FRONTEND  */}
          {/* USER ROUTES */}
          {/* <Route path="/" element={<LandingPage/>}/> */}
          {/* <Route path="/register" element={<SignupPage/>}/> */}
          {/* <Route path="/otp" element={<Otp/>}/> */}
          {/* <Route path="/resend-otp" element={<Otp/>}/> */}
          {/* <Route path="/login" element={<Login/>}/> */}
          {/* <Route path="/home" element={<LandingPage/>}/> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword/>}/> */}
          {/* <Route path="/reset-password/:id/:token" element={<ResetPassword/>}/> */}
          {/* <Route path="/profile" element={<Profile/>}/> */}
          {/* <Route path="/edit-profile" element={<EditProfile/>}/> */}


          <Route path='/*' element={<User />} />

 

          {/* DOCTOR ROUTES */}
          {/* <Route path="doctor/register" element={<SignUp value={'doctor'}/>}/> */}
          {/* <Route path="doctor/otp" element={<Otp value={'doctor'}/>}/>          */}
          {/* <Route path="doctor/resend-otp" element={<Otp value={'doctor'}/>}/> */}
          {/* <Route path="doctor/login" element={<Login value={'doctor'}/>}/> */}
          {/* <Route path="doctor/home" element={<Banner value={'doctor'}/>}/> */}
          {/* <Route path="doctor/details" element={<DoctorDetails value={'doctor'}/>}/> */}
          {/* <Route path="doctor/forgot-password" element={<DoctorForgotPassword value={'doctor'}/>}/> */}
          {/* <Route path="doctor/reset-password/:id/:token" element={<DoctorResetPassword value={'doctor'}/>}/> */}

          <Route path='/doctor/*' element={<Doctor />} />



          {/* ADMIN ROUTES */}
          {/* <Route path="admin/login" element={<Login value={'admin'}/>}/> */}
          {/* <Route path="admin/dashboard" element={<Dashboard value={'admin'}/>}/> */}
          {/* <Route path="admin/users" element={<UserList value={'admin'}/>}/> */}
          {/* <Route path="admin/doctors" element={<DoctorList value={'admin'}/>}/> */}
          {/* <Route path="admin/departments" element={<DepartmentList value={'admin'}/>}/> */}
          {/* <Route path="admin/add_department" element={<AddDepartment value={'admin'}/>}/> */}


          <Route path='/admin/*' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;



