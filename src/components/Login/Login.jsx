import React,{useEffect} from 'react'
import { Box, Button, TextField, Typography} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../services/axiosInterceptor.js'
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/UserSlice.js"
import { setDoctor} from "../../redux/DoctorSlice.js"
import { setAdmin} from "../../redux/AdminSlice.js"
import { useDispatch } from "react-redux";
import { hideLoading } from "../../redux/AlertSlice.js";
import { userLoginSchema } from "../../validation/userLoginValidation.js"; 
import PropTypes from 'prop-types'
import Navbar from "../Navbar/Navbar";
import DoctorNavbar from '../Doctor/DoctorNavbar.jsx';




const Login = ({value}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('usertoken')){
      navigate('/home')
    }
    else if(localStorage.getItem('doctortoken')){
      navigate('/doctor/home')
    }
    else if(localStorage.getItem('admintoken')){
      navigate('/admin/dashboard')
    }
  },[])

const formik=useFormik({
  initialValues: {
        email: "",
        password: "",
      },
      validationSchema: userLoginSchema,
      onSubmit:async(values,helpers)=>{
        try {
          const response= await axios.post(value==='doctor'?"/doctor/login":value==='admin'?"/admin/login":"/login" ,values)
          dispatch(hideLoading());
          // console.log(response,'this is resposne from login pagffffffffffe');
          // console.log(response.data,'this is response from login page');
           console.log(response.data.isUserr,'this is is_approved');
           console.log(response.data.success,'this is itttt');
           const docData=response.data.isUserr



          if(response.data.success){
            toast.success(response.data.message)
         

            if(value==='doctor'){         
              localStorage.setItem("doctortoken",response.data.token)
              dispatch(setDoctor(response.data.token))
              dispatch(setDoctor(response.data.isUserr))
              navigate("/doctor/home")
            }
            else if(value==='admin'){
              localStorage.setItem("admintoken",response.data.token)
              dispatch(setAdmin(response.data.token))              
              navigate("/admin/dashboard")  
            } 
            else{ 
               localStorage.setItem("usertoken",response.data.token)
               dispatch(setUser(response.data.token))
               dispatch(setUser(response.data.isUser))
               navigate("/home");
            }
          }
          else if(!response.data.isUserr.is_approved){
            console.log('reachinh here admin not aprrobew');
            toast.success(response.data.message)
            console.log(docData,'this is docDataaa');
            navigate("/doctor/details",{ state: { docData } });
          }
          else {
          toast.error(response.data.message);
        }
        } catch (error) {
          console.error(error); 
          helpers.setErrors({ submit: error.message });
          // toast.error("something went wrong");
          toast.error(`${error.response.data.message}`)
        }
      }
})



  //PROPS
  Login.propTypes = {
    value: PropTypes.string
  } 


  return (
    <div>
      
        {value === 'doctor' ? <DoctorNavbar /> : <Navbar />}
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
            padding: 3,
            marginY: {xs:10,sm:14.5,md:26.3,lg:10},
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Box mt={2}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
                    
            </Box>
          </Box>
          <Typography variant="h4" padding={3} textAlign="center">
           {/* HEADINGS */}
            {value==="doctor"? "Doctor Login": value==='admin'? "Admin Login":"User Login"}
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
            Login
          </Button>


<Typography mt={2}>


  {value === "doctor" ? (
    <>
Are you new user? <Link to={"/register"}style={{ textDecoration: 'none' }}>Click Here </Link>
If User <Link to={"/login"}style={{ textDecoration: 'none' }}>Click Here </Link>
<br />
 Forgot Doctor Password? <Link to={"/doctor/forgot-password"} style={{ textDecoration: 'none' }}>Click Here</Link>
    </>
  ) : value==="admin"?(
    <>
    </>
  ):(
    <>
 Are you new user? <Link to={"/register"}style={{ textDecoration: 'none' }}>Click Here </Link>
 &nbsp; &nbsp; &nbsp;
If Doctor <Link to={"/doctor/login"}style={{ textDecoration: 'none' }}>Click Here </Link>
<br />
      Forgot User Password? <Link to={"/forgot-password"} style={{ textDecoration: 'none' }}>Click Here</Link>
    </>
  )}
</Typography>


          
        </Box>
      </form>
    </div>
  );
};

export default Login;




