import React from 'react'
import { Box, Button, TextField, Typography} from "@mui/material";
import axios from '../../services/axiosInterceptor.js'
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading } from "../../redux/AlertSlice.js";
import Navbar from "../Navbar/Navbar.jsx";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { resetPassSchema } from '../../validation/resetPasswordValidation.js';




const ResetPassword = () => {
    const {id,token}=useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate()


const formik=useFormik({
  initialValues: {
        email: "",
      },
      validationSchema:resetPassSchema,
      onSubmit:async(values,helpers)=>{
        try {
          const response= await axios.post(`doctor/reset-password/${id}/${token}`,values)
          console.log(response,'responsessssssssss');
          dispatch(hideLoading());
          if(response.data.success){
            toast.success(response.data.message)
            navigate('/doctor/login')

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
            {"Reset Password"}
          </Typography>

          <Typography variant="h6" padding={3} textAlign="center"> 
            Welcome Back
          </Typography>

     

<TextField
            size="small"
            fullWidth
            sx={{ backgroundColor: "white" }}
            margin="normal"
            type={"password"}
            label="Password"
            name='password'
            value={formik.values.password} //values
            error={formik.errors.password}
            helperText={formik.errors.password}  
            onChange={formik.handleChange}

            variant="outlined"
          />

          <Button
            variant="contained"
            color="warning"
            name="submit"
            type='submit'
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ResetPassword;
