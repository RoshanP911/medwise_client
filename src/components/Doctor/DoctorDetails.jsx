import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormLabel,
} from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userSchema } from "../../validation/userSignupValidation";
import { useDispatch } from "react-redux";
import axios from "../../services/axiosInterceptor.js";
import Axios from "axios";
import { hideLoading } from "../../redux/AlertSlice";
import { toast } from "react-hot-toast";
import { setDoctor } from "../../redux/DoctorSlice";

import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";
import DoctorNavbar from "../Doctor/DoctorNavbar";
import { Container } from "@mui/material";
import { DoctorDetailsSchema } from "../../validation/doctorDetailsValidation";
import { useLocation } from 'react-router-dom';




const DoctorDetails = ({ value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  

const location = useLocation();
const docData = location.state && location.state.docData;

// Now you can access docData in your component
console.log(docData,'docData from doc/detils'); // This will give you access to the passed docData



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "wjdg6veo"); 
      formData.append("cloud_name", "dipnk9uvd");
      console.log(formData,'formDataformDataformData if dog detilas');

      try {
        const response = await Axios.post(
          `https://api.cloudinary.com/v1_1/dipnk9uvd/image/upload`,
          formData
        );
        console.log(response, "responseeee");
        console.log("File uploaded:", selectedFile);

        if (response.data.secure_url) {
          // Get the uploaded image URL from Cloudinary
          const fileUrl = response.data.secure_url;
        

        

        // after uploading the file, proceed with form submission
        const formValues = formik.values; // to get form data from formik
        formValues.file = selectedFile; // add the uploaded file to the form data
        const doccData=docData._id
        const allData={doccData,...formValues,fileUrl}

        const formResponse = await axios.post(
           "/doctor/details",
           allData
        );
 
        // console.log(formResponse, "response from /doctor/detaildetails");

        dispatch(hideLoading());
        if (formResponse.data.success) {
          navigate('/doctor/login')
          toast.success(formResponse.data.message);

          console.log(
            formResponse.data,
            "values from formResponse.dataresponse.dataresponse.data"
          );

          // const id = formResponse.data.user._id;

          // if (value === "doctor") {
          //   navigate("/doctor/otp", { state: id }); 
          // } else {
          //   navigate("/otp", { state: id }); 
          // }
        } else {
          toast.error(formResponse.data.message);
        }
      }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Something went wrong");
      }
    } else {
      alert("Please select a file first.");
    }
  };

  const formik = useFormik({
    initialValues: {
      registrationNumber: "",
      registrationCouncil: "",
      registrationYear: "",
      qualification: "",
      videoCallFees: "",
      specialisation: "",
      city: "",
      gender: "",
    },
    validationSchema: DoctorDetailsSchema,
    onSubmit: () => {
    },
  });

  // PROPS
  DoctorDetails.propTypes = {
    value: PropTypes.string,
  };












  return (
    <>
      <DoctorNavbar />
      <Container maxWidth="sm">
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Let's complete your registration, {docData.name} 
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Registration Number"
                name="registrationNumber"
                value={formik.values.registrationNumber}
                error={formik.errors.registrationNumber}
                helperText={formik.errors.registrationNumber}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Registration Council"
                name="registrationCouncil"
                value={formik.values.registrationCouncil}
                error={formik.errors.registrationCouncil}
                helperText={formik.errors.registrationCouncil}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Registration Year"
                name="registrationYear"
                value={formik.values.registrationYear}
                error={formik.errors.registrationYear}
                helperText={formik.errors.registrationYear}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Qualification"
                name="qualification"
                value={formik.values.qualification}
                error={formik.errors.qualification}
                helperText={formik.errors.qualification}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Video Call Fees"
                name="videoCallFees"
                value={formik.values.videoCallFees}
                error={formik.errors.videoCallFees}
                helperText={formik.errors.videoCallFees}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Specialisation"
                name="specialisation"
                value={formik.values.specialisation}
                error={formik.errors.specialisation}
                helperText={formik.errors.specialisation}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="City"
                name="city"
                value={formik.values.city}
                error={formik.errors.city}
                helperText={formik.errors.city}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>

                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={formik.values.gender || ""}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <div>
                <p>File Upload</p>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileChange}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
export default DoctorDetails;
