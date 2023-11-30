//USER BOOKING APPOINTMENT
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Paper,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { singleDoctorDetails } from "../../../services/APIs.js";
import axios from "../../../services/axiosInterceptor.js";
import ErrorPage from "../../../pages/404/ErrorPage.js";

const BookAppointment = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [ratings, setratings] = useState([]);
  const [avgReview, setavgReview] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`/get-rating/${id}`, {
          params: { page, limit },
        });
        setratings(response.data.allRatings);
        setavgReview(response.data.averageRating);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchMoreRatings = async () => {
    try {
      setPage(page + 1);
      const response = await axios.get(`/get-ratings/${id}`, {
        params: { page: page + 1, limit },
      });

      setratings((prevRatings) => [
        ...prevRatings,
        ...response.data.allRatings,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeMore = () => {
    setPage(page + 1);
    fetchMoreRatings();
  };

  //new slot select fn
  const slotSelect = async (value) => {
    try {
      navigate("/confirm-appointment", { state: { doctor, user, value } });
    } catch (error) {
      console.log(error);
    }
  };


  //
  const fetchDctorDetails = async (id) => {
    try {
      const response = await singleDoctorDetails(id);

      if (response.data.success) {
        setDoctor(response.data.data);
      }
      else{
        console.log(response.data.message);
      }
    } catch (error) {
      navigate("/*");
      console.log(error);
    }

    if(!doctor){
      return <redirect to="/error" />;
    }
  };
  useEffect(() => {
    fetchDctorDetails(id);
  }, [id]);

  useEffect(() => {
    setAvailableSlots(doctor?.availableSlots || []);
  }, [doctor]);

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <section>
        <Box sx={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Typography
            variant="h5"
            sx={{
              mb: 5,
              ml: 2,
              fontWeight: 500,
              letterSpacing: 2,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Schedule Your Session{" "}
          </Typography>
          <Box
            sx={{
              width: "100%",
              // paddingLeft: "15px",
              // paddingRight: "15px",
              marginLeft: "auto",
              marginRight: "auto",
              // backgroundColor: "green",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ flex: { md: "0 0 25%" } }}>
                <Card
                  elevation={4}
                  sx={{
                    maxWidth: 445,
                    backgroundColor: "#eff2f7",
                    width: { xs: "320px" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      // backgroundColor: "orange",
                    }}
                  >
                    <Avatar
                      sx={{
                        objectFit: "cover",
                        width: "150px",
                        height: "150px",
                        mt: 5,
                      }}
                      //   alt={doctor?.name}
                      //   src={`${baseURL}${doctor?.profile}`}
                      src="https://as2.ftcdn.net/v2/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
                    />
                  </Box>
                  <CardContent
                    // sx={{
                    //   backgroundColor: "grey",
                    // }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      {doctor?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {doctor?.qualification}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {doctor?.specialisation}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      Fees: Rs{doctor?.videoCallFees}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: { md: "0 0 75%" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginLeft: 4,
                    marginBottom: "1.5rem",
                  }}
                >
                  <Box sx={{ flex: "0 0 50%" }}>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: 18 }}
                    ></Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    // alignItems: "center",

                    // justifyContent: "space-between",
                    // justifyContent: "right",
                    // mr: 4,
                    // mt: 5,
                    // width: "140vh", // Set the width to your desired value
                    // height: "5vh",
                    // marginBottom: "1.5rem",
                    // backgroundColor: "pink",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 16 }}
                  >
                    Available Slots :
                  </Typography>

                  <Grid >
                    {availableSlots.length > 0 ? (
                      availableSlots.map((value) => (
                        <Button
                          key={value}
                          variant="outlined"
                          onClick={() => slotSelect(value)}
                          style={{ marginRight: "10px", marginBottom: "10px" }}
                        >
                          {value}
                        </Button>
                      ))
                    ) : (
                      <p> No slots</p>
                    )}
                  </Grid>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    // flexWrap: "wrap",
                    justifyContent: "center",
                    mr: 4,
                    mt: 5,
                    marginBottom: "1.5rem",
                  }}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Box>




        <Grid
        display={"flex"}
        sx={{
          justifyContent: "center",
          flexWrap: "wrap",
          // backgroundColor: "cyan",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "100%" : 900,
            m: 3,
            boxShadow: 4,
          }}
        >
          <Typography variant="h4" ml={2} mt={2}>
            Ratings & Reviews
          </Typography>
          <Divider sx={{ mx: 2, mt: 1 }} />
          <Grid display={"flex"}>
            <Typography variant="h5" ml={2} mt={1.8}>
              {avgReview}
            </Typography>
            <Rating
              sx={{ ml: 1, mt: 2 }}
              name="half-rating-read"
              value={avgReview}
              precision={0.5}
              readOnly
            />
          </Grid>
          {ratings.length === 0 ? (
            <Grid>
              <Typography variant="button" sx={{ ml: 2, mt: 2, fontSize: 20 }}>
                No Rating yet
              </Typography>
            </Grid>
          ) : (
            ratings &&
            ratings.map((element) => {
              return (
                <Grid key={element._id} marginTop={1} marginBottom={1.5}>
                  <Typography variant="button" sx={{ ml: 2, fontSize: 15 }}>
                    {element.userId.name}
                  </Typography>
                  <Typography variant="h5" sx={{ ml: 2, fontSize: 12 }}>
                    {element.createdAt}
                  </Typography>
                  <Typography variant="h5" sx={{ ml: 2, fontSize: 13 }}>
                    "{element.feedback}"
                  </Typography>
                </Grid>
              );
            })
          )}
          {ratings.length !== 0 ? (
            <Grid textAlign={"center"} mb={3}>
              {/* <Button onClick={handleSeeMore} variant="contained" color="primary">see more</Button> */}
            </Grid>
          ) : null}
        </Paper>
      </Grid>




      </section>


    </>
  );
};

export default BookAppointment;
