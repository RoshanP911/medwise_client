import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { createCheckoutSession } from "../../services/APIs.js";
import { useEffect, useState } from "react";
import axios from "../../services/axiosInterceptor.js";
import toast from "react-hot-toast";


const ConfirmAppointment = () => {
  const location = useLocation(); // to access the current location in our application.
  const navigate = useNavigate();

  const response = location.state; //attempts to extract data named response from the state of the current location.
  const [paymentMode, setPaymentMode] = useState("");
  const [total, setTotal] = useState(0);

const userId= response.user._id
const docFees=response.doctor.videoCallFees
const docId=response.doctor._id
const slot=response.value




useEffect(() => {
  // if (!localStorage.getItem("token")) {
  //   navigate("/login");
  // }

  //WALLET REDUCTION CALCULATION
  const fetchAppointments = async () => {
    try {
//NEW WALLET DATA FROM BACKEND
    const response = await axios.post("/fetch-wallet-balance", {
        userId,
      });

setTotal(response.data.user.wallet)
     
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  fetchAppointments();
}, [total]);














  const handleSubmit = async () => {
    try {
      if (paymentMode === "Stripe") {
        const res = await createCheckoutSession(response);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } else if (paymentMode === "Wallet") {
        const response=await axios.post('/wallet-payment',{total,docFees,userId,docId,slot})

        if(response.data.success===true){
          navigate('/success')
        }
        else{
          toast.error(response.data.message);
        }


      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentModeChange = async (event) => {
    try {
      setPaymentMode(event.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 500, mt: 10, fontSize: { xs: "20px", sm: "35px" } }}
        >
          Your appointment details
        </Typography>
      </Box>

      <Box marginTop={5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {/* LEFT CARD DOCTOR DETAILS*/}
          <Card
            elevation={5}
            sx={{
              width: { xs: "95%" },
              maxWidth: 500,
              marginBottom: { xs: 5, sm: 5 },
              backgroundColor: "beige",
            }}
          >
            <CardContent>
              <Box textAlign={"center"} marginTop={5}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 500, mb: 2, color: "#FD810F" }}
                >
                  Doctor Details
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 20, fontWeight: 500 }}
                >
                  Dr {response.doctor.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 20, fontWeight: 500 }}
                >
                  {response.doctor.qualification}
                </Typography>
              </Box>

              <Box textAlign={"center"} marginTop={10}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 21, fontWeight: 500, color: "#FD810F" }}
                >
                  Appointment Time
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: 23, fontWeight: 500 }}
                >
                  {response.value}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* RIGHT CARD PATIENT DETAILS*/}

          <Card
            elevation={5}
            sx={{
              width: { xs: "95%" },
              maxWidth: 500,
              marginBottom: { xs: 5, sm: 5 },
              backgroundColor: "beige",
              justifyContent: "center",
            }}
          >
            <Box textAlign={"center"} marginTop={5}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, mb: 2, color: "#FD810F", mt: 5 }}
              >
                Patient Details
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 20, fontWeight: 500 }}
              >
                Mr {response.user.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 20, fontWeight: 500 }}
              >
                {response.user.mobile}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 20, fontWeight: 500 }}
              >
                {response.user.email}
              </Typography>

              <Typography
                variant="h6"
                sx={{ fontWeight: 500, mb: 2, color: "#FD810F", mt: 5 }}
              >
                Amount to pay:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                ₹ {response.doctor.videoCallFees}
              </Typography>

              <Typography
                variant="h6"
                sx={{ fontWeight: 500, mb: 2, color: "#FD810F", mt: 5 }}
              >
                Mode of payment:
              </Typography>

              {/* RADIO BUTTONS */}
              <RadioGroup
                aria-label="payment-mode"
                name="payment-mode"
                value={paymentMode}
                onChange={handlePaymentModeChange}
                sx={{ pl: 24, mb: 2 }}
              >
                <FormControlLabel
                  value="Wallet"
                  control={<Radio />}
                  label="Wallet"
                />
                     <Typography
                variant="h6"
                // sx={{ fontWeight: 50}}
              >
                Wallet balance:₹ {total}
              </Typography>


                <FormControlLabel
                  value="Stripe"
                  control={<Radio />}
                  label="Stripe"
                />
              </RadioGroup>

              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ mb: 3, mr: 4 }}
                  onClick={() => handleSubmit()}
                  color="success"
                >
                  Confirm
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmAppointment;
