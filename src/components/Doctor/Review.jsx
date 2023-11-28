import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Pagination,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../../services/axiosInterceptor";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

function Reviews() {
  const doctorData = useSelector((state) => state.doctor);
  const [doctorReview, setDoctorReview] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      navigate("/login");
    }  

    (async () => {
      try {
        const res = await axios.get(`/doctor/review/${doctorData.doctor._id}`);
        console.log(res,'review of doktorrrrrrrrrrrr');
        setDoctorReview(res.data);
      } catch {
      }
    })();
  }, []);

  const totalPages = Math.ceil(doctorReview.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentReviews = doctorReview.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
      <Box container flexDirection={"column"}>
        <Grid display={"flex"} justifyContent={"center"}>
          <Typography mt={5} variant="h4">
            Your Reviews
          </Typography>
        </Grid>

        {doctorReview &&
          currentReviews.map((item, i) => (
            <Grid display={"flex"} justifyContent={"center"} margin={2}>
              <Paper sx={{ width: 550, display: "flex" }}>
                <Grid
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  marginLeft={2}
                >
                  <img
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: "50%",
                      ml: 2,
                    }}
                    src={item.userId.image}
                    alt=""
                  />
                </Grid>
                <Grid
                  display={"flex"}
                  flexDirection={"column"}
                  marginLeft={5}
                  marginTop={2}
                  marginBottom={3}
                >
                  <Grid display={"flex"}>
                    <Typography sx={{ fontSize: 15, mt: 1.8 }} variant="button">
                      {item.rating}
                    </Typography>
                    <Rating sx={{ m: 2 }} value={item.rating} readOnly />
                  </Grid>
                  <Grid>
                    <Typography sx={{ fontSize: 15, mt: 1.8 }} variant="button">
                      {item.userId.name}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography
                      sx={{ fontSize: 14, mt: 1.8 }}
                      variant="subtitle2"
                    >
                      {item.feedback}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography
                      sx={{ fontSize: 12, mt: 1.8 }}
                      variant="subtitle2"
                    >
                      on:{item.createdAt.split("T")[0]}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        {/* </>)} */}

        <Grid display={"flex"} justifyContent={"center"} marginBottom={2}>
          <Pagination
            variant="outlined"
            size="large"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
      </Box>
    </>
  );
}

export default Reviews;
