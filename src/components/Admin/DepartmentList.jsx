import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const DepartmentListContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 768px) {
    margin: 10px;
    padding: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
`;

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
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts or when 'refresh' changes.
    const getUser = async () => {
      try {
        const response = await axios.get("admin/departments");
        if (response.data.success) {
          setUsers(response.data.departmentData);
        } else {
          console.error("API request failed with:", response.data.message);
        }


      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, [refresh]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!users || !users.length) {
    return <div >No departments to display.</div>;
  }

  return (
    <>
      <DepartmentListContainer>
        <h1>Departments List</h1>
        <Link to={'/admin/add-department'} style={{ textDecoration: 'none' }}>
          <Typography
            sx={{ color: "#1959FD", cursor: "pointer" }}
            variant="h6"
            component="div"
          >
            Add Department
          </Typography>
        </Link>

        <Table>
          <thead>
            <tr>
              <TableHeader>Image</TableHeader>
              <TableHeader>Name</TableHeader>
              {/* <TableHeader>Action</TableHeader> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img src={user.image} alt={user.name} width="100" height="100" />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                {/* <TableCell>
                  <BlockButton>Block</BlockButton>
                </TableCell> */}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </DepartmentListContainer>
    </>
  );
};

export default DepartmentList;
















