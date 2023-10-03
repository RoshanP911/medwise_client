import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
  } from "@mui/material";
import axios from '../../../services/axiosInterceptor';
import { Link } from "react-router-dom";

const FindDoctors = () => {


    const [doctor, setDoctor] = useState([]);

    const allDoctors = async () => {
    try {
    const response = await axios.get("/find-doctors", {});

    if (response.data.success) {
        setDoctor(response.data.allDoctors)
      }

     } catch (error) {
    console.log(error);
     }
    }

useEffect(()=>{allDoctors()},[]) //useeffect works when component loads

  return (
    <>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {doctor.map((value)=>(
          <Card
            elevation={2}
            sx={{ width: { xs: "95%", sm: 350 }, mt: { xs: 10 }, maxWidth: 400 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: 5,
              }}
            >
              <Avatar
                sx={{
                  height: { xs: 120 },
                  width: { xs: 120 },
                  objectFit: "cover",
                }}
                 src="https://as2.ftcdn.net/v2/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Dr {value.name} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.qualification}
                </Typography>
             
                <Typography variant="body2" color="text.secondary">
                {value.specialisation}
                </Typography>


              </CardContent>
            </Box>
            <CardContent>
              <Box>
                
              </Box>
            </CardContent>
            <CardActions>

                <Link to={ `/book-appointment/${value._id}`}  style={{ textDecoration: 'none' }}>
              <Button size="small">Book Now</Button>
              </Link>
             
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box>
       
      </Box>





    </>
  );
};

export default FindDoctors;


