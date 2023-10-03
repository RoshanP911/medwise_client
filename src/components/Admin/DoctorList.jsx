import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
import styled from 'styled-components';
import AdminNavbar from './AdminNavbar.jsx';
import { showLoading,hideLoading } from "../../redux/AlertSlice.js";
import { toast } from "react-hot-toast";
import { Button, Typography } from '@mui/material';
import { useDispatch } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';






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


  const [doctors,setDoctor]=useState([])
  const [refresh, setRefresh] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);



// Fetch doctors data when component mounts or when 'refresh' changes.
  useEffect(() => {
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

  }, [refresh]); // on each refresh or button click anywhere useEffect will work


// Modal state for blocking
const[openConfirmBox,setOpenConfirmBox]=useState(false)  //to open and close ConfirmBox modal
const [actionUserId,setActionUserId]=useState(null) // Store user ID for action confirmation

const openConfirmBlockModal =(userId)=>{
setActionUserId(userId) //userid passed is stored in actionUserId
setOpenConfirmBox(true) //if true box open
}

const closeConfirmBlockModal=()=>{
setOpenConfirmBox(false)
}

const confirmBlockAction=async(doctorId)=>{

    try {
      dispatch(showLoading());
      const response=await axios.post('/admin/blockDoctor',{ doctorId:doctorId})
      dispatch(hideLoading());
  
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


  closeConfirmBlockModal()
}






//modal state for approving

const[openApproveBox,setOpenApproveBox]=useState(false)  //to open and close ConfirmBox modal
const [approveUserId,setApproveUserId]=useState(null) // Store user ID for action confirmation


const openApproveModal =(userId)=>{
  setApproveUserId(userId)//stores id of user who is been clicked in 'approveUserId'
  setOpenApproveBox(true) //if true box open 
  }
  
  const closeApproveModal=()=>{
    setOpenApproveBox(false)
  }

    //'approveUserId' is passed into confirmApprove and recieved as doctorId
  const confirmApprove=async(doctorId)=>{

    try {
      dispatch(showLoading());
      const response=await axios.post('/admin/approveDoctor',{ doctorId:doctorId})
      dispatch(hideLoading());
  
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


  closeApproveModal()
}





  // Function to trigger PDF download from Cloudinary
  const handleDownload = async (approveUserId) => {
    try {

        const response=await axios.post('/admin/doc-document',{doctorId:approveUserId})
      const dataa=response.data.data
                const response1 = await fetch(`${dataa}`);
        const blob = await response1.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download =`image`;
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        console.log('error downloaddd');
    }
  } 




  






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
            <TableHeader>Details</TableHeader>
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
              onClick={()=>openConfirmBlockModal(user._id)}  //to Open the confirmation modal
              >Unblock</Button>

                : 
              
                <Button
                variant="contained"
                color="error"
                onClick={()=>openConfirmBlockModal(user._id)}  //to Open the confirmation modal
                >Block</Button>
          }

              </TableCell>

              <TableCell>
                <Button variant="contained"
              color="primary"
              onClick={()=>openApproveModal(user._id)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </tbody>
      </Table>
    </DoctorListContainer>


    






      {/* Confirmation MODAL for blocking*/}

      <Dialog open={openConfirmBox} onClose={closeConfirmBlockModal}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmBlockModal} color="primary">
          Cancel
          </Button>

          <Button onClick={() => confirmBlockAction(actionUserId)} color="primary">
           Confirm
           </Button>

        </DialogActions>
      </Dialog>








          {/* Confirmation Modal for APPROVING*/}

          <Dialog open={openApproveBox} onClose={closeApproveModal}>
        <DialogTitle> Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to do this?
          </DialogContentText>
        </DialogContent>
        <Typography>
        {/* {doctors.map((user, index) => (
        <TableRow key={index}>
          <TableCell>{user.registrationNumber}</TableCell>
          <TableCell>{user.registrationCouncil}</TableCell>
          <TableCell>{user.qualification}</TableCell>
        </TableRow>
        ))} */}
        </Typography>

        <DialogActions>
          <Button onClick={closeApproveModal} color="primary">
          Cancel
          </Button>

         
{/* on button click  confirmApprove function is called and approveUserId stored when clicking view is passed */}
         <Button onClick={() => confirmApprove(approveUserId)} color="primary">
          Approve
          </Button>

          <Button onClick={() => handleDownload(approveUserId)} color="primary">
            Download
          </Button>


        </DialogActions>
      </Dialog>

    </>
  );
};

export default DoctorList;














