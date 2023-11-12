import { useCallback, useEffect, useState } from "react";
import { docAppointments } from "../../services/APIs.js";
import { cancelDocAppointment } from "../../services/APIs.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

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
import { useSocket } from "../../context/SocketProvider.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader.jsx";

const DocAppointment = () => {
  const [refresh, setRefresh] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const { doctor } = useSelector((state) => state.doctor);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const email = doctor.email;

  const socket = useSocket();

  const cancelHandler = async (apptId) => {
    try {
      const response = await cancelDocAppointment(apptId);

      if (response.data.success) {
        toast.success(response.data.message);
        setRefresh(!refresh);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  //to send backend
  const callHandler = useCallback(
    (roomId) => {
      const room = roomId;
      socket.emit("room:join", { email, room }); //18:26
    },
    [socket, email]
  );

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const doctorId = doctor._id;
        const response = await docAppointments(doctorId);

        if (response.data.success) {
          setAppointment(response.data.appointments);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getAppointments();
  }, [refresh, doctor._id]);

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email, "emaill");
      console.log(room, "romm");
      navigate(`/doctor/call/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  //15 mins before enable call button
  const isTimeUp = (timeslot) => {
    const parts = timeslot.split(" ");

    let timePart = parts[4];

    if (timePart.includes(".")) {
      const [hours, minutes] = timePart.split(".");
      timePart = `${hours}:${minutes.padStart(2, "0")}`;
    }

    parts[4] = timePart;

    const formattedTimeslot = parts.join(" ");
    const originalDate = new Date();

    const hours = originalDate.getHours() % 12 || 12;
    const ampm = originalDate.getHours() < 12 ? "AM" : "PM";

    const formattedDateString = `${originalDate.toDateString()} ${hours}:${originalDate
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${ampm}`;

    const timeslotDate = new Date(formattedTimeslot);
    const currentDate = new Date(formattedDateString);
    // Checking if the difference is less than 15 minutes
    const timeDifference = timeslotDate.getTime() - currentDate.getTime();
    const fifteenMinutesInMillis = 15 * 60 * 1000;
    if (timeDifference < fifteenMinutesInMillis && timeDifference > 0) {
      console.log("Less than 15 minutes remaining.");
      return true;
    } else {
      console.log("More than 15 minutes remaining.");
      return false;
    }
  };

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
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Appointment Time</TableCell>
                          <TableCell>Booked on</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell>Prescription</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appointment.map((value) => (
                          <TableRow key={value._id}>
                            <TableCell>{value?.userId?.name}</TableCell>
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
                              {value?.isCancelled
                                ? "Cancelled"
                                : value.isAttended
                                ? "Completed"
                                : "Confirmed"}
                            </TableCell>
                            <TableCell>
                              {
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() => cancelHandler(value?._id)}
                                  disabled={
                                    value?.isCancelled || value?.isAttended
                                  }
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
                                  onClick={() => {
                                    callHandler(
                                      value?._id + value?.userId?.name
                                    );
                                  }}
                                  disabled={
                                    value?.isCancelled ||
                                    value?.isAttended ||
                                    !isTimeUp(value?.slot)
                                  }
                                >
                                  Call
                                </Button>
                              }
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                  navigate("/doctor/create-prescription", {
                                    state: { value },
                                  });
                                }}
                                disabled={
                                  value?.isCancelled || !value?.isAttended
                                }
                              >
                                Create
                              </Button>
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

export default DocAppointment;
