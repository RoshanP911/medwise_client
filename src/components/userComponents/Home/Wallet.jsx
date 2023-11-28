import React, { useEffect, useState } from "react";
import axios from "../../../services/axiosInterceptor";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setWallet } from "../../../redux/WalletSlice";


function Wallet(props) {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const userData = useSelector((state) => state.user);
  // const walletData = useSelector((state) => state.wallet);

  const userId = userData.user._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();




  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    //WALLET REDUCTION CALCULATION
    const fetchAppointments = async () => {
      try {
//NEW WALLET DATA FROM BACKEND
      const response = await axios.post("/fetch-wallet-balance", {
          userId,
        });
console.log(response,'rrrrr');

        console.log(response.data.user.wallet,'jjjjjjjjjjjjjj')

setTotal(response.data.user.wallet)


        // const response = await axios.post("/get-appointments-cancelled", {
        //   userId,
        // });
        // console.log(response,'responseeee');
        // const updatedAppointments = [...response.data.appointments];
        // setAppointments(updatedAppointments);

        // Calculating total after updating appointments
        // const afterDeduction = updatedAppointments.reduce(
        //   (accumulator, appointment) => {
        //     return accumulator + Number((appointment.amount_paid * 60) / 100);
        //   },
        //   0
        // );

        // setTotal(afterDeduction);
        // console.log(total,'toalllll walletttt');
        // console.log(walletData,'waletdattata');

      //  dispatch(walletData(total))
      //  const updateWallet = (total) => {
      //   console.log(total,'recgggg');
      //   // dispatch(walletData(total))
      //   dispatch(setWallet(total));

      // };
      // updateWallet(total)

      //  console.log(walletData,'waletdattata 2');


       
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [total]);


//UPDATE BACKEND
// const response1=axios.post("/wallet-update",{total,userId})

// console.log(response1,'response11111');


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

//    dispatch(walletData(total))
// console.log(walletData,'walletstdata');

  return (
    <Grid
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"whitesmoke"}
    >
      <Grid
        width={"90%"}
        height={"90vh"}
        m={2}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"white"}
        borderRadius={5}
      >
        <Grid
          width={"96%"}
          height={"95%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"whitesmoke"}
          borderRadius={5}
        >
          <Grid
            width={"96%"}
            height={"95%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={5}
          >
            <Paper
              sx={{
                width: "97%",
                height: "5rem",
                m: "2px",
                backgroundColor: "#E9FBFF",
              }}
            >
              <Typography variant="h4" color={"black"} ml={"2rem"}>
                Wallet
              </Typography>
            </Paper>
            <Grid
              display={"flex"}
              bgcolor={"white"}
              width={"97%"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={1}
              gap={3}
            >
              <Paper
                sx={{
                  width: "65%",
                  height: "6rem",
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Grid ml={5}>
                  <Grid>
                    <Typography fontSize={18} varient={"subtitle1"}>
                      Current amount
                    </Typography>
                  </Grid>
                  <Grid display={"flex"}>
                    <AccountBalanceWalletIcon sx={{ fontSize: "2rem" }} />
                    <Typography fontSize={"2rem"} ml={"1rem"}>
                      ₹{total}
                    </Typography>
                  </Grid>
                </Grid>
                {/* <Grid display={"flex"} alignItems={"center"} mr={2}>
                  <Button variant="contained">Withdraw</Button>
                </Grid> */}
              </Paper>
              {/* <Paper
                sx={{ width: "35%", height: "6rem", mt: 1, mb: 1 }}
              ></Paper> */}
            </Grid>
            <Paper
              sx={{
                minWidth: "97%",
                height: "50rem",
                m: "2px",
                mt: 1,
                borderRadius: 2,
              }}
            >
              <TableContainer
                sx={{ minHeight: "40vh", bgcolor: "rgba(255,255,255,0.6)" }}
              >
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Image</TableCell>
                      <TableCell align="right">Name&nbsp;</TableCell>
                      <TableCell align="right">Email&nbsp;</TableCell>
                      <TableCell align="right">Amount&nbsp;</TableCell>
                      <TableCell align="right">Status&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            mt: 3,
                          }}
                        >
                          <TableCell align="right">
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                objectPosition: "center",
                                marginLeft: "auto",
                              }}
                              //   src={`${row.userId.image}`}
                              src="https://as2.ftcdn.net/v2/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
                              alt=""
                            />
                          </TableCell>
                          <TableCell align="right">
                            Dr {row.doctorId.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.doctorId.email}
                          </TableCell>
                          <TableCell align="right">
                            {(row.amount_paid * 60) / 100}
                          </TableCell>
                          <TableCell align="right" sx={{ color: "green" }}>
                            <Button
                              sx={{
                                color: "white",
                                backgroundColor: "green",
                                borderRadius: 2,
                                fontSize: 12,
                              }}
                            >
                              Credited
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* } */}
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={appointments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Wallet;
