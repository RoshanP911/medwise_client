import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { userList } from "../../services/APIs.js";
import Loader from "../Loader.jsx";

const UserListContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
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

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the component mounts or when 'refresh' changes.
    const getUser = async () => {
      try {
        const response = await userList();

        if (response.data.success) {
          setUsers(response.data.userData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [refresh]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }



//   const userBlock=(userId)=>{
// console.log(userId,'ddddddddddddddd');
//   }


  return (
    <>
      <UserListContainer>
        {" "}
        {/* Apply the container style */}
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

                  {/* <Button variant="contained" color="error" onClick={userBlock(user._id)}>
                    Block
                  </Button> */}
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
