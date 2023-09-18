import {
    Box,
    Typography,
  } from "@mui/material";
import React, { useState } from 'react';
import './Otp.css'; 
import axios from '../../services/axiosInterceptor.js'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types'
import Navbar from "../Navbar/Navbar";
import DoctorNavbar from '../Doctor/DoctorNavbar';


const Otp=({value})=>{


    // console.log(value,'valueee from otp pageeeeee');

    const navigate=useNavigate()
const [otp,setOtp]=useState(["","","",""]) // State to hold OTP digits
//This function is used to update the otp state when a user enters a digit in one of the input fields.

const {state}=useLocation()
console.log(state,'___id');
const handleOtpChange=(index, value)=>{
    if (value.match(/^\d*$/)) {
        const newOtpDigits=[...otp] //creating copy of otp arra
        newOtpDigits[index]=value
        setOtp(newOtpDigits)
    }
}

const handleOtpSubmit=async(e)=>{
    e.preventDefault()
    try {
        let ootp=otp.join('')
        const response= await axios.post(value==='doctor'?"doctor/otp":"/otp",{ootp,state})

        console.log(response,'response of the otp sep 9');
        if(response.data.success){
            toast.success(response.data.message);
            if(value==='doctor'){
                navigate('/doctor/login') 
            }else{
               navigate('/login') 
            }
          }
          else{     
            toast.error(response.data.message)
          }
    } catch (error) {
        console.log(error.response.data,'errr');
        
        console.error('Error registering:', error);
        // helpers.setErrors({ submit: error.message });
        toast.error("something went wrong");
    }
}

const handleOtpResend=async(e)=>{
    e.preventDefault()
    try {
        const response= await axios.post(value==='doctor'?"doctor/resend-otp":"/resend-otp",{state})
        if(response.data.success){
            setCounter(59);
          }
          else{     
            toast.error(response.data.message)
          }

          
    } catch (error) {
        console.log(error.response.data,'errrrrrrrrrr');
        console.error('Error registering:', error);
        // helpers.setErrors({ submit: error.message });
        toast.error("something went wrong");
    }
}


//OTP COUNNTDOWN TIMER
const [counter, setCounter] = React.useState(59)
React.useEffect (() =>{
const timer =
counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
return () => clearInterval(timer);
},[counter]);
 
 //PROPS
 Otp.propTypes = {
    value: PropTypes.string
  } 

return(
   <>
 {/* {value === 'doctor' ? <DoctorNavbar /> : <Navbar />} */}
 <Navbar />

   <div className="row">
    <div className='col text-center'>

    <p>Enter the OTP to verify your identity</p>

    {
        otp.map((digit,index)=>{
            return (

                  <input className="otp-field"
                    type="text" 
                    name="otp"
                    maxLength="1" //to limit input to a single character.
                    key={index} // to help React efficiently update the components.
                    value={digit} //displays the entered digit in field
                    onChange={(e)=>handleOtpChange(index, e.target.value)}
                    //onChange is set to a callback function that invokes handleOtpChange when the input value changes.
                    // onFocus={e=>e.target.select()} 
    />
            )
        })
    }


    <div className='d-flex justify-content-center gap-2 mt-4'>
        <button className='btn btn-primary' onClick={handleOtpSubmit}>Verify OTP</button>
        <button className='btn btn-primary'  disabled={counter > 0} onClick={handleOtpResend}>Resend OTP</button>
        
    </div>

    <Box mt={3} ><Typography fontWeight={500} align="center" color='textSecondary'> Resend ОТР in <span style={{color: "green",fontWeight: "bold"}}> 00:{counter}</span> </Typography></Box>
</div>
   </div>
   </> 
)

}

export default Otp










