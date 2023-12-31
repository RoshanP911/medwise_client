import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  FormLabel,
  MenuItem,
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
import { Container } from "@mui/material";
import { DoctorDetailsSchema } from "../../validation/doctorDetailsValidation";
import { useLocation } from "react-router-dom";
import { getSpecialisations } from "../../services/APIs.js";

const DoctorDetails = ({ value }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [specialisations, setSpecialisations] = useState([]);

  const location = useLocation(); // to access the current location in our application.
  const docData = location.state && location.state.docData; //attempts to extract data named docData from the state of the current location.
  //If the state contains docData, it is assigned to the docData variable.

  const fetchSpecialisations = async () => {
    try {
      const response = await getSpecialisations();
      if (response.data.success) {
        setSpecialisations(response.data.departmentNames);
      }
    } catch (error) {
      console.error("Error fetching specialisations:", error);
    }
  };

  useEffect(() => {
    fetchSpecialisations();
  }, []);

  //Handling File Upload
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

      try {
        const response = await Axios.post(
          `https://api.cloudinary.com/v1_1/dipnk9uvd/image/upload`,
          formData
        );

        if (response.data.secure_url) {
          // Getting the uploaded image URL from Cloudinary
          const fileUrl = response.data.secure_url;

          // after uploading the file, proceed with form submission
          const formValues = formik.values; // to get form data from formik
          formValues.file = selectedFile; // add the uploaded file to the form data
          const doccData = docData._id;
          const allData = { doccData, ...formValues, fileUrl };

          const formResponse = await axios.post("/doctor/details", allData);

          dispatch(hideLoading());
          if (formResponse.data.success) {
            navigate("/doctor/home");
            toast.success(formResponse.data.message);

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
    onSubmit: () => {},
  });

  // PROPS
  DoctorDetails.propTypes = {
    value: PropTypes.string,
  };

  return (
    <>
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
              <select
                name="specialisation"
                value={formik.values.specialisation}
                onChange={formik.handleChange}
              >
                <option value="">Select Specialisation</option>
                {specialisations.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
