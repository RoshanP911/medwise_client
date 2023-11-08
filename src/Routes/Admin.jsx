import {React} from "react";
import {  Routes, Route } from "react-router-dom";
import Login from '../components/Login/Login.jsx'
import Dashboard from "../components/Admin/Dashboard.jsx";
import UserList from "../components/Admin/UserList.jsx";
import DoctorList from "../components/Admin/DoctorList.jsx";
import DepartmentList from "../components/Admin/DepartmentList.jsx";
import AddDepartment from "../components/Admin/AddDepartment.jsx";
import PrivateRoute from "../components/Admin/PrivateRoute.jsx";
import AdminNavbar from "../components/Admin/AdminNavbar.jsx";

                               /* ADMIN ROUTES */
function Admin() {

return (
    <>    
    <AdminNavbar />
    <Routes>

                <Route path="/login" element={<Login value={'admin'}/>}/>
          
                {/* PRIVATE ROUTES */}
                <Route path="" element={<PrivateRoute/>}>
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/users" element={<UserList />}/>
                    <Route path="/doctors" element={<DoctorList />}/>
                    <Route path="/departments" element={<DepartmentList />}/>
                    <Route path="/add-department" element={<AddDepartment />}/>


                </Route>


    </Routes>
    {/* </Suspense> */}
    </>
)
}


export default Admin;