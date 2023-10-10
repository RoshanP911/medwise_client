import React, { useEffect, useState } from "react";
import axios from "../../services/axiosInterceptor.js";
import styled from "styled-components";
// import { toast } from "react-hot-toast";
import { Box,  Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import DialogBox from "../DialogBox.jsx";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import Loader from "../Loader.jsx";

const DoctorListContainer = styled.div`
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



const DoctorList = () => {
  const dispatch = useDispatch();

  const [doctors, setDoctor] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //modal state for approving

  const [openApproveBox, setOpenApproveBox] = useState(false); //to open and close ConfirmBox modal
  const [approveUserId, setApproveUserId] = useState(null); // Store user ID for action confirmation

  // Modal state for blocking
  const [openConfirmBox, setOpenConfirmBox] = useState(false); //to open and close ConfirmBox modal
  const [actionUserId, setActionUserId] = useState(null); // Store user ID for action confirmation

  // Fetch doctors data when component mounts or when 'refresh' changes.
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("admin/doctors");
        if (response.data.success) {
          setDoctor(response.data.doctorData); // Update the 'doctors' state with the fetched data.
        } else {
          console.error("API request failed with:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser(); // Calls the getUser function to fetch data when the component mounts.
    // console.log(refresh, "refresh usefecrt");
  }, [refresh]); // on each refresh or button click anywhere useEffect will work

  const refreshHandler = () => {
    setRefresh(!refresh)
    console.log(
      refresh,'refreshhhhh'
    );
  }

  // const openConfirmBlockModal = (userId) => {
  //   setActionUserId(userId); //userid passed is stored in actionUserId
  //   setOpenConfirmBox(true); //if true box open
  // };

  // const closeConfirmBlockModal = () => {
  //   setOpenConfirmBox(false);
  // };

 

  // const openApproveModal = (userId) => {
  //   setApproveUserId(userId); //stores id of user who is been clicked in 'approveUserId'
  //   setOpenApproveBox(true); //if true box open
  // };

  // const closeApproveModal = () => {
  //   setOpenApproveBox(false);
  // };



  return (
    <>
      <DoctorListContainer>
        <h1>Doctors List</h1>
        {doctors?.length === 0 ? (
          <Box display={"flex"} justifyContent={"center"}>
            <Typography fontWeight={400} variant="h6">
              Currently there are no new applications for doctor
            </Typography>
          </Box>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Mobile</TableHeader>
                <TableHeader>Action</TableHeader>
                <TableHeader>Details</TableHeader>
              </tr>
            </thead>
            <tbody>
              {doctors &&
                doctors?.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile}</TableCell>

                    <TableCell>
                      <DialogBox
                       refreshHandler= {refreshHandler}
                        name = {user.is_blocked ? "Unblock" : "Block"}
                        variant="contained"
                        col={user.is_blocked ? "success" : "error"}
                        id = {user._id} //to Open the confirmation modal
                      >
                        
                      </DialogBox>
                    </TableCell>

                    <TableCell>
                    <DialogBox
                       refreshHandler= {refreshHandler}
                        name = {'View'}
                        variant="contained"
                        col={'primary'}
                        id = {user._id} //to Open the confirmation modal
                      >
                        
                      </DialogBox>
                    </TableCell>
                  </TableRow>
                ))}
            </tbody>
          </Table>
        )}
      </DoctorListContainer>

      {/* Confirmation MODAL for blocking*/}

      {/* Confirmation Modal for APPROVING*/}

      {/* <Dialog open={openApproveBox} onClose={closeApproveModal}>
        <DialogTitle> Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to do this?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeApproveModal} color="primary">
            Cancel
          </Button>

         // on button click  confirmApprove function is called and approveUserId stored when clicking view is passed 
          <Button onClick={() => confirmApprove(approveUserId)} color="primary">
            Approve
          </Button>

          <Button onClick={() => handleDownload(approveUserId)} color="primary">
            Download
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default DoctorList;
