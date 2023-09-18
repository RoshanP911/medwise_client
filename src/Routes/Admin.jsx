import React from "react";
import {  Routes, Route } from "react-router-dom";


import Login from '../components/Login/Login.jsx'
import Dashboard from "../components/Admin/Dashboard.jsx";
import UserList from "../components/Admin/UserList.jsx";
import DoctorList from "../components/Admin/DoctorList.jsx";
import DepartmentList from "../components/Admin/DepartmentList.jsx";
import AddDepartment from "../components/Admin/AddDepartment.jsx";


                               /* ADMIN ROUTES */
function Admin() {
return (
    <>
    <Routes>
                <Route path="/login" element={<Login value={'admin'}/>}/>
                <Route path="/dashboard" element={<Dashboard value={'admin'}/>}/>
                <Route path="/users" element={<UserList value={'admin'}/>}/>
                <Route path="/doctors" element={<DoctorList value={'admin'}/>}/>
                <Route path="/departments" element={<DepartmentList value={'admin'}/>}/>
                <Route path="/add_department" element={<AddDepartment value={'admin'}/>}/>
    </Routes>
    </>
)
}


export default Admin;