import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
import styled from 'styled-components';
import AdminNavbar from './AdminNavbar.jsx';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { showLoading,hideLoading } from "../../redux/AlertSlice.js";


// Define a styled container for your component
const UserListContainer = styled.div`
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






const UserList = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
//BLOCKHANDLER

const blockHandler=async(doctorId)=>{
  try {
    // dispatch(showLoading());
    console.log(doctorId,'doctorIddoctorId');
    const response=await axios.post('/admin/blockDoctor',{ doctorId:doctorId})
    // dispatch(hideLoading());
    console.log(response,'respopopo'); 


    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }

  } catch (error) {
    console.log(error);
  }
}




  useEffect(() => {
    // Fetch user data when the component mounts or when 'refresh' changes.
    const getUser = async () => {
      try {
        const response = await axios.get("admin/users");
        console.log(response, 'admin response');
        if (response.data.success) {
          setUsers(response.data.userData); // Update the 'users' state with the fetched data.
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser(); // Call the getUser function to fetch data when the component mounts.

  }, [refresh]);

  if (!users || !users.length) {
    return <div>No users to display.</div>;
  }

  return (
    <>
  
    <AdminNavbar />
    <UserListContainer> {/* Apply the container style */}
      <h1>User List</h1>
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
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.mobile}</TableCell>
              {/* <TableCell>{user._id}</TableCell> */}

              <TableCell>
                {/* <BlockButton >Block</BlockButton>  */}

                <Button
                variant="contained"
                color="error"
                onClick={()=>blockHandler(user._id)}
                >Block</Button>

                <Button
                variant="contained"
                color="success"
                >Unblock</Button>
              </TableCell>

              



            </TableRow>
          ))}
        </tbody>
      </Table>
    </UserListContainer>
    </>
  );
};

export default UserList;
