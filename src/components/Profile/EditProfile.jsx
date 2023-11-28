import React, { useRef, useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import axios from "../../services/axiosInterceptor.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editProfileSchema } from "../../validation/editProfileValidation.js";
import { setUser } from "../../redux/UserSlice.js";
import Avatar from "@mui/material/Avatar";

import { uploadImage } from "../../services/APIs.js";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);  //TAKING FROM REDUX SAVED DURING LOGIN

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const imageInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      age: user ? user.age : "",
      mobile: user ? user.mobile : "",
      email: user ? user.email : "",
      address: user ? user.address : "",
      gender: user ? user.gender : "",
      image: image ? user.image : "",
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      try {
        const requestData = {
          ...values,
          imageUrl: imageUrl?imageUrl:user.image,
          userId: user._id,
        };

        if (imageUrl || user.image) {
          const response = await axios.post("/edit-profile", requestData);

          if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setUser(response.data.user));
          } else {
            toast.error(response.data.message);
          }
        }
      } 
      catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });

  const handleImageChange = async(e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);  //stores the new selected image


    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "wjdg6veo");
    formData.append("cloud_name", "dipnk9uvd");

    const response= await uploadImage(formData)

    //To Create a URL for the selected image and set it in the state
    // const imageUrl = URL.createObjectURL(selectedImage);
    setImageUrl(response.data.secure_url); //stores in imageUrl state
  };

  const handleImageClick = () => {
    // Triggers the click event on the file input when the image is clicked
    // imageInputRef.current.click();
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ padding: 6, textAlign: "center", mt: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            {/* FILE INPUT FOR PROFILE PHOTO*/}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputRef} // Reference to the input element
              style={{ display: "none" }} // hides select image box
            />

            {/* Display the selected image as a clickable preview */}

            <label
              htmlFor="image"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            >
              {/* Display the selected image as a preview */}
              {imageUrl && (
                <img src={imageUrl} alt="Selected" width="150" height="150" />
              )}

              {/* Display the current user image and if no cureent selected image */}
              {!imageUrl && user.image && (
                <img src={user.image} alt="Current" width="150" height="150" />
              )}
            </label>

            {/* <img src={user.image} alt=""  width="150" height="150" /> */}

            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              error={formik.errors.name}
              helperText={formik.errors.name}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Age"
              name="age"
              type="number"
              value={formik.values.age}
              error={formik.errors.age}
              helperText={formik.errors.age}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                id="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.errors.gender}
                sx={{ "& .MuiSelect-select": { textAlign: "left" } }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Mobile"
              name="mobile"
              value={formik.values.mobile}
              error={formik.errors.mobile}
              helperText={formik.errors.mobile}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              error={formik.errors.email}
              helperText={formik.errors.email}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
            />

            <div className="d-flex justify-content-center gap-2 mt-4">
              
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>

              <Link to="/profile">
                <Button variant="contained" color="primary">
                  Go Back
                </Button>
              </Link>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default EditProfile;








