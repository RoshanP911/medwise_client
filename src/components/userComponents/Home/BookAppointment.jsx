//USER BOOKING APPOINTMENT
import { Avatar, Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from '../../../services/axiosInterceptor';


const BookAppointment = () => {
    const {id}=useParams()

    const [doctor, setDoctor] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);


const fetchDctorDetails = async (id) => {
    try {
      const response = await axios.get(`/singleDoctorDetails/${id}`, {});
      console.log(response,'popopoo');
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } 
    catch (error) {
        console.log(error);
      }
}
    useEffect(()=>{
        fetchDctorDetails(id)
    },[])

    useEffect(() => {
        // When the 'doctor' state updates, set 'availableSlots' with 'doctor.availableSlots'
        setAvailableSlots(doctor?.availableSlots || []);
      }, [doctor]);

return(


<>
      <section style={{ marginTop: "50px", marginBottom: "80px" }}>
        <Box sx={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Typography
            variant="h5"
            sx={{ mb: 5, ml: 2, fontWeight: 500, letterSpacing: 2 }}
          >
            Schedule Your Session{" "}
          </Typography>
          <Box
            sx={{
              width: "100%",
              paddingLeft: "15px",
              paddingRight: "15px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ flex: { md: "0 0 25%" } }}>
                <Card
                  elevation={4}
                  sx={{
                    maxWidth: 445,
                    backgroundColor: "#eff2f7",
                    width: { xs: "320px" },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                      sx={{
                        objectFit: "cover",
                        width: "150px",
                        height: "150px",
                        mt: 5,
                      }}
                    //   alt={doctor?.name}
                    //   src={`${baseURL}${doctor?.profile}`}
                    src="https://as2.ftcdn.net/v2/jpg/02/60/04/09/1000_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
                    />
                  </Box>
                  <CardContent >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      {doctor?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {doctor?.qualification}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {doctor?.specialisation}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                    Fees: Rs{doctor?.videoCallFees}
                    </Typography>


                 



                  </CardContent>
                </Card>
              </Box>




              <Box sx={{ flex: { md: "0 0 75%" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginLeft: 4,
                    marginBottom: "1.5rem",
                  }}
                >
                  <Box sx={{ flex: "0 0 50%" }}>
               
                    <Typography variant="body1" sx={{ fontSize: 18 }}>
      
                    </Typography>
                  </Box>
                </Box>
      

                <Box
                  sx={{
                    display: "flex",
                    // flexWrap: "wrap",
                    // justifyContent: "right",
                    mr: 4,
                    mt: 5,
                    marginBottom: "1.5rem",
                  }}
                >
                       <Typography variant="body1" sx={{ fontSize: 16 }}>
                        Available Slots :
                        </Typography>
                    
                    {availableSlots.map((value)=>(
                 <Button variant="outlined" style={{ marginRight: '10px', marginBottom: '10px' }}>
                 {value} 
                </Button>
                  ))}
             
                </Box>
              
                <Box
                  sx={{
                    display: "flex",
                    // flexWrap: "wrap",
                    justifyContent: "center",
                    mr: 4,
                    mt: 5,
                    marginBottom: "1.5rem",
                  }}
                >
                      
                </Box>
              </Box>
            </Box>
            
          </Box>
        </Box>
      </section>
    </>


)

}


export default BookAppointment;