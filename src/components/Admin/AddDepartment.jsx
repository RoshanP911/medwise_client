import React, { useState } from 'react';
import axios from '../../services/axiosInterceptor.js';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
 import { addDeptSchema } from '../../validation/addDeptSchemaValidation.js';
import { showLoading, hideLoading } from '../../redux/AlertSlice.js';
import { toast } from 'react-hot-toast';
import { TextField, Typography, Button, Card, CardContent, Container } from '@mui/material';

const AddDepartment = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      departmentName: '',
    },
    validationSchema: addDeptSchema,
    onSubmit: async (values) => {
      try {
        dispatch(showLoading());

        // To Upload the image to Cloudinary
        console.log(image,'imageee');
        if (image) {

          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', 'wjdg6veo'); 
          formData.append('cloud_name', 'dipnk9uvd'); 

          console.log(formData,'formdataaaa');
          const response = await Axios.post(`https://api.cloudinary.com/v1_1/dipnk9uvd/image/upload`, formData);
          if (response.data.secure_url) {

            const imageUrl = response.data.secure_url;

            const departmentData = {
              departmentName: values.departmentName,
              imageUrl: imageUrl, 
            };
            
            const departmentResponse = await axios.post('admin/add_department', departmentData);

            dispatch(hideLoading());
            if (departmentResponse.data.success) {
              toast.success(departmentResponse.data.message);
            }
          }
        } else {
          dispatch(hideLoading());
          toast.error('Please select an image.');
        }



        
      } catch (error) {
        dispatch(hideLoading());
        console.error(error);
        toast.error('Something went wrong');
      }
    },
  });





  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };








  return (
    <>

      <Typography variant="h6" padding="3" textAlign="center">
        Add Department
      </Typography>

      
      <Container
        maxWidth="sm" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '40vh', 
        }}
      >
        <Card elevation={3}>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                size="small"
                fullWidth
                sx={{ backgroundColor: 'white' }}
                margin="normal"
                name="departmentName"
                id="departmentName"
                value={formik.values.departmentName} //values
                error={formik.errors.departmentName}
                helperText={formik.errors.departmentName}
                onChange={formik.handleChange}
                type={'text'}
                label="Department Name"
                variant="outlined"
              />

              {/* File input for image */}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />

              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>

            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AddDepartment;













