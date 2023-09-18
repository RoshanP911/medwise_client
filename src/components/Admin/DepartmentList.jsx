import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
import styled from 'styled-components';
import AdminNavbar from './AdminNavbar.jsx';
import { Button} from "@mui/material";

// Define a styled container for your component
const DepartmentListContainer = styled.div`
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

// Define a styled button for your component
const BlockButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const DepartmentList = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts or when 'refresh' changes.
    const getUser = async () => {
      try {
        const response = await axios.get("admin/departments");
        console.log(response, 'admin response');
        if (response.data.success) {
          setUsers(response.data.departmentData); // Update the 'users' state with the fetched data.
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
    <DepartmentListContainer> 
      <h1>Departments List</h1>
      {/* <Button  variant="contained" color="primary">
          Add Department
        </Button> */}
        <a href="add_department">Add Department</a>

      <Table>
        <thead>
          <tr>
          <TableHeader>Image</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Action</TableHeader>

          </tr>
        </thead>

           <tbody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img src={user.image} alt={user.name} width="100" height="100" />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <BlockButton>Block</BlockButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
      </Table>
    </DepartmentListContainer>
    </>
  );
};

export default DepartmentList;
