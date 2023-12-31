import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../redux/AdminSlice";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin); //admintoken from admin redux state
  const [open, setOpen] = useState(false);

  console.log(admin, "addmin token frm Admin navbarrr");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setAdmin(null));
    setAnchorEl(null);
    navigate("/admin/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{ backgroundColor: "#E9FBFF", position: "sticky" }}
          elevation={0}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
              >
                <Button onClick={() => setOpen(true)}>
                  <MenuIcon sx={{ color: "#000000" }} />
                </Button>
                <Drawer anchor="left" open={open} onClose={handleCloseDrawer}>
                  <Box
                    role="presentation"
                    onClick={handleCloseDrawer}
                    onKeyDown={handleCloseDrawer}
                    marginTop={4}
                    marginLeft={2}
                    gap={333}
                    sx={{ width: 200 }}
                  >
                    <Typography
                      sx={{
                        color: "#FD810F",
                        m: 2,
                      }}
                      variant="h5"
                    >
                      MEDWISE
                    </Typography>
                    <Link
                      to={"/admin/dashboard"}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{ color: "black" }}
                        variant="h6"
                        margin={2}
                      >
                        Dashboard
                      </Typography>
                    </Link>

                    <Link
                      to={"/admin/departments"}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{ color: "black" }}
                        variant="h6"
                        margin={2}
                      >
                        Departments
                      </Typography>
                    </Link>

                    <Link
                      to={"/admin/users"}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{ color: "black" }}
                        variant="h6"
                        margin={2}
                      >
                        Users
                      </Typography>
                    </Link>

                    <Link
                      to={"/admin/doctors"}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{ color: "black" }}
                        variant="h6"
                        margin={2}
                      >
                        Doctors
                      </Typography>
                    </Link>

                  </Box>
                </Drawer>
              </IconButton>
              <Link
                  to={"/admin/dashboard"}
                  style={{ textDecoration: "none" }}
                >
              <Typography
                sx={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  fontSize: "36px",
                  color: "#215acc",
                  letterSpacing: "1px",
                  marginBottom: "10px",
                  textAlign: "center",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                variant="h5"
              >
                MEDWISE
              </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: { sm: "flex", xs: "none" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2.25rem",
                  marginRight: 3,
                }}
              >
                <Link
                  to={"/admin/departments"}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{ color: "#1959FD", cursor: "pointer" }}
                    variant="h6"
                    component="div"
                  >
                    Departments
                  </Typography>
                </Link>

                <Link to={"/admin/users"} style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{ color: "#1959FD", cursor: "pointer" }}
                    variant="h6"
                    component="div"
                  >
                    Users
                  </Typography>
                </Link>

                <Link to={"/admin/doctors"} style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{ color: "#1959FD", cursor: "pointer" }}
                    variant="h6"
                    component="div"
                  >
                    Doctors
                  </Typography>
                </Link>
              </Box>

              <Box
                sx={{
                  display: { sm: "none", xs: "flex" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2.25rem",
                  marginRight: 3,
                }}
              >
                <Link to={"/user_notification"}>
                  <Typography
                    sx={{ color: "black", mt: 1 }}
                    variant="h6"
                    component="div"
                  >
                    <NotificationsIcon />
                  </Typography>
                </Link>
              </Box>
              {console.log(admin, "admin val1 frm admin navbarrrrr down")}

              {admin && admin ? (
                <Box sx={{ display: { sm: "flex", xs: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="black"
                  >
                    <Avatar sx={{ height: 30, width: 30 }} alt={admin?.name} />
                    {/* <Avatar sx={{height:30,width:30}} alt={user?.fName} src={`${baseURL}${user?.profile}`} /> */}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                        style={{
                          color: "black",
                          fontSize: 18,
                          textDecoration: "none",
                        }}
                        to={"/admin/profile"}
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: { sm: "flex", xs: "none" } }}>
                  <Typography
                    onClick={handleMenu}
                    sx={{
                      color: "white",
                      backgroundColor: "#1959FD",
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      ":hover": { color: "#1959FD", backgroundColor: "white" },
                    }}
                  >
                    Login
                  </Typography>
                  <Menu
                    id="menu-appba"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                        style={{
                          color: "black",
                          fontSize: 18,
                          textDecoration: "none",
                        }}
                        to={"/login"}
                      >
                        User Login
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        style={{
                          color: "black",
                          fontSize: 18,
                          textDecoration: "none",
                        }}
                        to={"/doctor/login"}
                      >
                        Doctor Login
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AdminNavbar;
