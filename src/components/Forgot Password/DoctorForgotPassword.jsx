import React from 'react'
import { Box, Button, TextField, Typography} from "@mui/material";
import axios from '../../services/axiosInterceptor.js'
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading } from "../../redux/AlertSlice.js";
import Navbar from "../Navbar/Navbar";
import { forgotPassSchema } from '../../validation/forgotPasswordValidation.js';




const ForgotPassword = () => {
  const dispatch = useDispatch();

const formik=useFormik({
  initialValues: {
        email: "",
      },
      validationSchema:forgotPassSchema,
      onSubmit:async(values,helpers)=>{
        try {
          const response= await axios.post("doctor/forgot-password",values)
          console.log(response,'responsessssssssss');
          dispatch(hideLoading());
          if(response.data.success){
            toast.success(response.data.message)
          }else {
          toast.error(response.data.message);
        }
        } catch (error) {
          console.error(error); 
          helpers.setErrors({ submit: error.message });
                toast.error("something went wrong");
        }
      }
})


  return (
    <div>
       <Navbar />
        <form action="" onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            backgroundColor: "#d8edf0", //card colour 
            display: "flex",
            flexDirection: "column",
            width:{xs:"75%",sm:500},
            maxWidth: 500,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            padding: 3,
            marginY: {xs:10,sm:14.5,md:26.3,lg:10},
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >

          <Typography variant="h4" padding={1} textAlign="center">
           {/* HEADINGS */}
            {"Forgot Password"}
          </Typography>

          <Typography variant="h6" padding={3} textAlign="center"> 
            Welcome Back
          </Typography>

          <TextField
            size="small"
            fullWidth
            sx={{ backgroundColor: "white" }}
            margin="normal"
            name="email"
            value={formik.values.email} //values
            error={formik.errors.email}
            helperText={formik.errors.email}
            onChange={formik.handleChange}

            type={"email"}
            label="Email"
            variant="outlined"
          />

          <Button
            variant="contained"
            color="warning"
            name="submit"
            type='submit'
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Send
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ForgotPassword;
