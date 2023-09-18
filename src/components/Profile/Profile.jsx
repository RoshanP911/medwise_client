import React from "react";
import {
  Avatar,
  Typography,
  Button,
  CardContent,
  Container,
  Paper,
  Card,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabContext } from "@mui/lab";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // console.log(user, "user from useSelectorrr from profile page");
  

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ padding: 6, textAlign: "center", mt: 4 }}>
          <Avatar
            alt="User"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Link to="/edit-profile" aria-label="Edit Profile">
              <IconButton aria-label="Edit Profile">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>

          <Typography variant="h6" component="div">
            Name: {`${user?.name} `}
          </Typography>

          <Typography color="textSecondary">Age: {`${user?.age} `}</Typography>

          <Typography variant="body2" sx={{ color: "grey" }}>
            Mobile: {`${user?.mobile} `}
          </Typography>

          <Box mt={2} sx={{ backgroundColor: "#b1ecf0", padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Email:
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">{`${user?.email} `}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Address:
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">{`${user?.address} `}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Gender:
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2">{`${user?.gender} `}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Profile;


