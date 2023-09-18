import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
import styled from 'styled-components';
import AdminNavbar from './AdminNavbar.jsx';
import { showLoading,hideLoading } from "../../redux/AlertSlice.js";
import { toast } from "react-hot-toast";
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { setDoctor} from "../../redux/DoctorSlice.js"

import confirmModal from './confirmModal.jsx';



// Define a styled container for your component
const DoctorListContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
`;

// Define a styled table for your component
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Define a styled table header for your component
const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

// Define a styled table row for your component
const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

// Define a styled table cell for your component
const TableCell = styled.td`
  padding: 10px;
`;





const DoctorList = () => {
  const dispatch = useDispatch();


  const [doctors,setDoctor]=useState([])
  const [refresh, setRefresh] = useState(false);




//BLOCK HANDLER DOCTOR
const blockHandler=async(doctorId)=>{

  try {
    dispatch(showLoading());
    console.log(doctorId,'doctorIddoctorId');
    const response=await axios.post('/admin/blockDoctor',{ doctorId:doctorId})
    dispatch(hideLoading());
    console.log(response,'respopopo'); 

    setRefresh(!refresh)

    if(response.data.success){
      toast.success(response.data.message)
      dispatch(setDoctor(response.data.data))

    }
    else{
      toast.error(response.data.message)
    }

  } catch (error) {
    console.log(error);
  }
}



  useEffect(() => {
    // Fetch doctors data when component mounts or when 'refresh' changes.
    const getUser = async () => {
      try {
        const response = await axios.get("admin/doctors");
        if (response.data.success) {
          setDoctor(response.data.doctorData); // Update the 'doctors' state with the fetched data.
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser(); // Calls the getUser function to fetch data when the component mounts.

  }, [refresh]); // on each rfresh use effect wil work

  if (!doctors || !doctors.length) {
    return <div>No users to display.</div>;
  }

  return (
    <>
  
    <AdminNavbar />
    <DoctorListContainer> 
      <h1>Doctors List</h1>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Mobile</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {doctors.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>



              <TableCell>                

                {user.is_blocked ? 
              <Button
              variant="contained"
              color="success"
              onClick={()=>blockHandler(user._id)}
              >Unblock</Button>

                : 
              
                <Button
                variant="contained"
                color="error"
                onClick={()=>blockHandler(user._id)}
                >Block</Button>
          }

              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </DoctorListContainer>
    </>
  );
};

export default DoctorList;
