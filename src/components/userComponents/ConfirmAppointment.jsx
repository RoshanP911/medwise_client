import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { createCheckoutSession } from "../../services/APIs.js";


const ConfirmAppointment = () => {
  const location = useLocation(); // to access the current location in our application.
  const response = location.state ; //attempts to extract data named response from the state of the current location.


  const handleSubmit = async () => {
    try {
      const res = await createCheckoutSession(response)


      if (res.data.url) {
        window.location.href = res.data.url;
      }
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
              <Box textAlign={"center"}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 500, mb: 2, color: "#FD810F" }}
                >
                  Doctor Details
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 18 }}
                >
                  Dr {response.doctor.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: 18 }}
                >
                  {response.doctor.qualification}
                </Typography>
              </Box>

              <Box textAlign={"center"} marginTop={5}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 25, fontWeight: 500, color: "#FD810F" }}
                >
                  Appointment Time
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: 15, fontWeight: 500 }}
                >
                  {response.value}
                </Typography>
              </Box>
              <Box textAlign={"center"} marginTop={5}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 500, color: "#2c5a8f", mt: 5 }}
                ></Typography>
                <Typography></Typography>
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
                sx={{ fontSize: 18 }}
              >
                Mr {response.user.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 18 }}
              >
                {response.user.mobile}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 18 }}
              >
                {response.user.email}
              </Typography>

              <Typography
                variant="h6"
                sx={{ fontWeight: 500, mb: 2, color: "#FD810F", mt: 5 }}
              >
                Amount to pay: Rs {response.doctor.videoCallFees}
              </Typography>

              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ mt: 5 }}
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



