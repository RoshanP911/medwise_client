import { useCallback, useEffect, useState } from "react";
import { Appointments } from "../../../services/APIs.js";
import { cancelAppointment } from "../../../services/APIs.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useSocket } from "../../../context/SocketProvider.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader.jsx";
import { setAppointment } from "../../../redux/AppointmentSlice.js";



import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { setSlot } from "../../../redux/ConsultSlice.js";


const Appointment = () => {
  const [refresh, setRefresh] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useSelector((state) => state.user);
  const socket = useSocket()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const email  = user.email

  const cancelHandler = async (apptId) => {
    try {
      const response = await cancelAppointment(apptId);

      if (response.data.success) {
        toast.success(response.data.message);
        // setAppointment((prevAppointments) =>prevAppointments.filter((appt) => appt._id !== apptId));
        setRefresh(!refresh);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const userId = user._id;
        const response = await Appointments(userId);

        // console.log(response.data.appointments, "response of appointments ");

        if (response.data.success) {
          setAppointment(response.data.appointments);
          dispatch( setSlot(response.data.appointments))
          

        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getAppointments();
  }, [refresh, user._id]);








//to send backend
  const callHandler = useCallback((roomId) => {
    const room = roomId
    socket.emit("room:join", {  email,room }) //18:26
}, [socket,email])


const handleJoinRoom=useCallback((data)=>{
  const { email,room}=data
   navigate(`/call/${room}`)
},[navigate])


useEffect(()=>{
  socket.on('room:join',handleJoinRoom)
  return ()=>{
    socket.off('room:join',handleJoinRoom)
  }
},[socket,handleJoinRoom])



useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);

if (isLoading) {
  return <Loader />;
}

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: "80%",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
              Appointment History
            </Typography>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 540 }}>
                <Table stickyHeader aria-label="sticky table">
                  {appointment && appointment.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell>Doctor Name</TableCell>
                          <TableCell>Appointment Time</TableCell>
                          <TableCell>Booked on</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell>Action</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointment.map((value) => (
                          <TableRow key={value._id}>
                            <TableCell>{value?.doctorId?.name}</TableCell>
                            <TableCell>{value?.slot}</TableCell>
                            <TableCell>
                              {new Date(value?.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                }
                              )}
                            </TableCell>
                            <TableCell>
                              {value?.isCancelled ? "Cancelled" : "Confirmed"}
                            </TableCell>
                            <TableCell>
                              {
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => cancelHandler(value?._id)}
                                  disabled={value?.isCancelled}
                                >
                                  Cancel
                                </Button>
                              }
                            </TableCell>
                            <TableCell>
                              {
                                  <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => callHandler(value?._id + value?.userId?.name)}
                                  disabled={value?.isCancelled}
                                >
                                  Call
                                </Button>
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  ) : (
                    <Box>
                      <Box display={"flex"} justifyContent={"center"}>
                        <Typography
                          fontWeight={400}
                          variant="h6"
                          textAlign={"center"}
                        >
                          No appointments
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Appointment;
