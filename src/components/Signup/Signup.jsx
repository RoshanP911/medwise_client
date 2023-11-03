import React, { useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userSchema } from "../../validation/userSignupValidation";
import { useDispatch } from "react-redux";
import axios from '../../services/axiosInterceptor.js'
import { hideLoading } from "../../redux/AlertSlice";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/UserSlice";
import PropTypes from 'prop-types'
import { Register } from "../../services/APIs";

const SignUp = ({value}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      navigate("/");
    } 
  },);



  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      cpassword: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, helpers) => {
      try {    //in axios.post wer posting directly to backend server 

        // const response = await axios.post(value==='doctor'?"/doctor/register":"/register", 
        //   values
        // );
        const response = await Register(value, 
        values
      );



        console.log(response,'response from signuppppp');


        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
   
          console.log(response.data,'values from response.datares');

          // dispatch(setUser(values));
          // dispatch(setUser(response))
          console.log( response.data,'response.data from otp submnitn');
          const id=response.data.user._id
          // dispatch(setUser(id)) 

            // Redirect based on user's role
            if (value === "doctor") {
                   navigate('/doctor/otp',{state:id}) // Redirect to doctor OTP
            }else{
              navigate('/otp',{state:id}) // Redirect to user OTP
            }
        } else {
          toast.error(response.data.message);
        }
      } 


      catch (error) {
        helpers.setErrors({ submit: error.message });
        toast.error("something went wrong");
      }
    },
  });


  //PROPS
  SignUp.propTypes = {
    value: PropTypes.string

  } 



  return (
    <div>
     
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            backgroundColor: "#fafaf0",
            display: "flex",
            flexDirection: "column",
            width:{xs:"75%",sm:500},
            maxWidth: 500,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginY: {xs:10,sm:14.5,md:26.3,lg:10},
            padding: 3,
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Box mt={2}>

          </Box>
          <Typography variant="h4" padding={3} textAlign="center">
            Sign up 
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white"}}
                margin="normal"
                type={"text"}
                label="Name"
                name="name"
                value={formik.values.name}
                error={formik.errors.name}
                helperText={formik.errors.name}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Mobile"
                name="mobile"
                value={formik.values.mobile}
                error={formik.errors.mobile}
                helperText={formik.errors.mobile}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                sx={{ backgroundColor: "white" ,width: "100%"}}
                margin="normal"
                type={"email"}
                name="email"
                value={formik.values.email}
                error={formik.errors.email}
                helperText={formik.errors.email}
                onChange={formik.handleChange}
                label="Email"
                variant="outlined"
              />
            </Grid>
           
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"password"}
                label="Password"
                name="password"
                value={formik.values.password}
                error={formik.errors.password}
                helperText={formik.errors.password}
                onChange={formik.handleChange}
                // error={}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"password"}
                name="cpassword"
                value={formik.values.cpassword}
                error={formik.errors.cpassword}
                helperText={formik.errors.cpassword}
                onChange={formik.handleChange}
                label="Confirm Password"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="warning"
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            name="submit"
          >
            Sign up
          </Button>
          
          <Typography mt={2}>
            
            Have an Account?&nbsp;<Link to={"/login"}style={{ textDecoration: 'none' }}>Log in</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Are you a doctor?&nbsp;<Link to={"/doctor/register"}style={{ textDecoration: 'none' }}>Register Here</Link>
 
          </Typography>
        </Box>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default SignUp;
