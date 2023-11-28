import React, { useEffect } from "react";
import {
  Avatar,
  Typography,
  Container,
  Paper,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } 
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={24}
        sx={{ padding: 4, textAlign: "center", mt: 4, marginBottom: 4 }}
      >
        <Avatar
          alt="User"
          src={user?.image}
          sx={{ width: 170, height: 170, marginBottom: 2 }}
        />

        <Box display="flex" justifyContent="flex-end">
          <Link to="/edit-profile" aria-label="Edit Profile">
            <IconButton aria-label="Edit Profile">
              <EditIcon />
            </IconButton>
          </Link>
        </Box>
        <Typography variant="h4" component="div" sx={{ color: "primary" }}>
          Profile
        </Typography>

        <Typography variant="h6" component="div">
          <strong>Name:</strong> {user?.name}
        </Typography>

        <Typography variant="body2">
          <strong>Age:</strong> {user?.age}
        </Typography>

        <Typography variant="body2">
          <strong>Mobile:</strong> {user?.mobile}
        </Typography>

        <Box
          mt={2}
          sx={{ backgroundColor: "#f5f5f5", padding: 2, borderRadius: 4 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                <strong>Email:</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">{user?.email}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                <strong>Address:</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">{user?.address}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                <strong>Gender:</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">{user?.gender}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
