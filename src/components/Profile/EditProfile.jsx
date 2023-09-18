import React from 'react';
import { Container, Paper, TextField, Button,FormControl, InputLabel,Select,MenuItem} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import axios from '../../services/axiosInterceptor.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { editProfileSchema } from '../../validation/editProfileValidation.js';
import { showLoading, hideLoading } from '../../redux/AlertSlice';
import { setUser } from '../../redux/UserSlice.js';
import Navbar from '../Navbar/Navbar.jsx';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const { user } = useSelector((state) => state.user);


  console.log(user,'user from useSelectorrr');

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : '',
      age: user ? user.age : '',
      mobile: user ? user.mobile : '',
      email: user ? user.email : '',
      address: user ? user.address : '',
      gender: user ? user.gender : ''
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {

      try {
        dispatch(showLoading());
       
        console.log(user._id,'user._iddddd');

      const requestData = {
        ...values,
        userId: user._id, 
      };
        

        const response = await axios.post('/edit-profile', requestData);

        dispatch(hideLoading());

        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(setUser(response.data.user));
        } else {
          console.log('hereee');
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        toast.error('Something went wrong');
      }
    },
  });

  return (
    <>
  <Navbar />
    <Container maxWidth="sm">
      <Paper elevation={24} sx={{ padding: 6, textAlign: 'center', mt: 4 }}>
        <form onSubmit={formik.handleSubmit}>
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


          <div className='d-flex justify-content-center gap-2 mt-4'>
        
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>

          <Link to="/profile">
            <Button  variant="contained" color="primary">
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
