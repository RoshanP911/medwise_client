//DOCTOR DASHBOARD
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "../../services/axiosInterceptor";
import BarChart from "../../components/BarChart";
import PieChart from "../PieChart";

const DoctorHome = () => {
  
  const doctorData = useSelector((state) => state.doctor.doctor);
  const [amount,setAmount]=useState(0)
  const [appointCount, setAppointCount] = useState(0);
  const [appoint, setAppoint] = useState([]);
  const [confirmedCount,setConfirmedCount]=useState([])
  const [attendedCount,setAttendedCount]=useState([])
  const [cancelledCount,setCancelledCount]=useState([])


//Amount Recieved
useEffect(() => {
  const fetchAmount = async () => {
    await axios.get(`/doctor/amount-received/${doctorData._id}`).then((res) => { setAmount(res.data)  }).catch();
  }
  fetchAmount()
}, [])


//TOTAL APPOINTMENT COUNT 
useEffect(() => {
  const fetchCount = async () => {
    await axios.get(`/doctor/total-appointments/${doctorData?._id}`).then((res) => { setAppointCount(res.data) }).catch();
  }
  fetchCount()
}, [])


//BAR CHART
useEffect(() => {
  const fetchAppoint = async () => {
    await axios.get(`/doctor/appointment-list/${doctorData._id}`).then((res) => { setAppoint(res.data)  }).catch();
  }
  fetchAppoint()
}, [])




//PIE CHART
useEffect(() => {
  const fetchAppoint = async () => {

    const response=await axios.get(`/doctor/appt-status-count/${doctorData._id}`)


    setConfirmedCount(response.data.totalConfirmedCount)
    setAttendedCount(response.data.totalAttendedCount)
    setCancelledCount(response.data.totalCancelledCount)


  }
  fetchAppoint()
}, [])







  return (
        <>
          <Box>
            <Grid container display={'flex'} flexDirection={'column'}>
              <Grid>
                <Typography variant="h3" textAlign={'center'} mt={5}>Your Dashboard</Typography>
              </Grid>
              <Grid display={'flex'} justifyContent={'space-around'}>
                <Grid>
                  <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width: 250, height: 200, boxShadow: 5, ml: 5, mt: 5 }}>
                    <Typography variant="h4" textAlign={'center'} >Amount Recieved</Typography>
                    <Typography variant="h4" textAlign={'center'} mt={2}>₹ {amount}</Typography>
                  </Paper>
                </Grid>
                <Grid>
                <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width: 250, height: 200, boxShadow: 5, ml: 5, mt: 5 }}>
                    <Typography variant="h4" textAlign={'center'} >Total Appointments</Typography>
                    <Typography variant="h4" textAlign={'center'} mt={2}>{appointCount}</Typography>
                  </Paper>
                  </Grid>
                </Grid>




                <Grid display={'flex'} justifyContent={'center'}>
                <Grid  display={'flex'} justifyContent={'center'}>
                  <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width:600, height: 600, boxShadow: 5, ml: 5, mt: 5,p:5,mb:5 }}>
                    <BarChart appoints={appoint}/>
                  </Paper>
                 </Grid>


                  <Grid display={'flex'} justifyContent={'center'}>
                  <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "center", width:600, height: 600, boxShadow: 5, ml: 5, mt: 5,p:5,mb:5 }}>
                  <PieChart confirmedCount={confirmedCount} attendedCount={attendedCount} cancelledCount={cancelledCount} />
                  </Paper>
                  </Grid>

                  </Grid>



            </Grid>
            
          </Box>
        </>
  );
  }
  
  
  export default DoctorHome;