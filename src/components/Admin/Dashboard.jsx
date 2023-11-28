//ADMIN DASHBOARD

import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import DashBoardCard from "../../components/DashBoardCard";
import axios from "../../services/axiosInterceptor";
import { Box, Grid, Paper, Typography } from "@mui/material";
import BarChart from "../../components/BarChart";
import PieChart from "../PieChart";



const Dashboard = () => {
  const [userCount, setuserCount] = useState(null)
  const [docCount, setdocCount] = useState(null)
  const [revenue, setRevenue] = useState(null)
  const [appoint,setAppoint]=useState([])
  const [confirmedCount,setConfirmedCount]=useState([])
  const [attendedCount,setAttendedCount]=useState([])
  const [cancelledCount,setCancelledCount]=useState([])



  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await axios.get('/admin/user-count');
        setuserCount(res.data)

      } catch (error) {

      }
    }

    fetchUserCount()
  }, [])
  useEffect(() => {
    const fetchDoctorCount = async () => {
      await axios.get('/admin/doctor-count').then((res) => { setdocCount(res.data) })
    }
    fetchDoctorCount()
  }, [])

  useEffect(() => {
    const totalRevenue = async () => {
      await axios.get('/admin/total-revenue').then((res) => { setRevenue(res.data.totalAmountPaid) })
    }
    totalRevenue()
  }, [])
  useEffect(() => {
    const totalAppointments = async () => {
      await axios.get('/admin/all-bookings').then((res) => { setAppoint(res.data)})
    }
    totalAppointments()
  }, [])
  const title = 'Total Users'





  useEffect(() => {
    const totalAppointmentsStatusCount = async () => {
      console.log('t-status-count');
     const response= await axios.get('/admin/appt-status-count')
    //  .then((res) => { setAppointStatusCount(res.data)})
    console.log(response,'totalAppointmentsStatusCount');
    setConfirmedCount(response.data.totalConfirmedCount)
    setAttendedCount(response.data.totalAttendedCount)
    setCancelledCount(response.data.totalCancelledCount)
    }
    totalAppointmentsStatusCount()
  }, [])



  return (
    <>
      <Box >
        <Grid container display={"flex"} flexDirection={'column'}>
          <Grid>
            <Typography variant="h3" textAlign={'center'} mt={5}>
              Your Dashboard
            </Typography>
          </Grid>
          <Grid display={'flex'} flexWrap={'wrap'} justifyContent={'space-around'}>
            <DashBoardCard title={title} count={userCount} color={'#fac5e7'} />
            <DashBoardCard title={'Total Doctors'} count={docCount} color={'#caedeb'}/>
            <DashBoardCard title={"Total Revenue"} count={revenue} color={'#d9f7d5'}/>
          </Grid>



          <Grid display={'flex'} justifyContent={'center'}>
          <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', width:600, height: 600, boxShadow: 5, ml: 5, mt: 5,p:5,mb:5 }}>
              <BarChart appoints={appoint} />
            </Paper>


            <Grid display={'flex'} justifyContent={'center'}>
          <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', width:600, height: 600, boxShadow: 5, ml: 5, mt: 5,p:5,mb:5 }}>
<PieChart confirmedCount={confirmedCount} attendedCount={attendedCount} cancelledCount={cancelledCount} />
            </Paper>

          </Grid>
          </Grid>




        </Grid>
      </Box>
    </>

  );
};

export default Dashboard;
