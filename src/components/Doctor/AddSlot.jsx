//DOCTOR ADDING SLOTS 
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import axios from '../../services/axiosInterceptor';
import "react-datepicker/dist/react-datepicker.css";
import { setDoctor} from "../../redux/DoctorSlice.js"
import DeleteIcon from '@mui/icons-material/Delete';

const AddSlot = () => {
    const { doctor } = useSelector((state) => state.doctor); //taking from doctor redux 

    const timeSlots=['9.00 AM', '9.30 AM', '10.00 AM', '10.30 AM', "11.00 AM", "11.30 AM", "12.00 PM", '12.30 PM', '1.00 PM', '1.30 PM', '2.00 PM', '2.30 PM', '3.00 PM', '3.30 PM', '4.00 PM', '4.30 PM', '5.00 PM', '5.30 PM', '6.00 PM', '6.30 PM', '7.00 PM', '7.30 PM', '8.00 PM']
    const [selectedDate,setSelectedDate]=useState(null)    //for date
    const [selectedTime,setSelectedTime]=useState('9.00 AM')   //for time
    const [addedDates, setAddedDates] = useState(doctor?.availableSlots);

    const dispatch = useDispatch();

   


//ADD SLOT
    const handleAdd = async () => {
        if (selectedDate) {
            const dateAndTime= `${selectedDate.toDateString()} ${selectedTime}`; //"Tue Oct 10 2023 9.00 AM".

        
        try {
            const response = await axios.post("/doctor/add-slot", {doctorData:doctor,selectedDate: dateAndTime})

            if(response.data.success){         
                setAddedDates([...addedDates, dateAndTime ]);
                toast.success(response.data.message);
                // dispatch(setDoctor(response.data.newDoctor))
                setSelectedDate(null);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);

        }
    }
    }





    //DELETE SLOT
const handleDelete = async (index) => {

     try {
        const slotToDelete = addedDates[index];
        const response = await axios.delete("/doctor/delete-slot", {
            data: { doctorData: doctor, slotToDelete: slotToDelete }
          })
        if(response.data.success){     
            setAddedDates([...response.data.updatedDoctor.availableSlots]);
                            dispatch(setDoctor(response.data.updatedDoctor))

            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error);

    }



        
  
}

    return(
        <>
         <Container maxWidth="sm"  style={{ backgroundColor:'gainsboro', padding: '100px'}}>
         <Grid container spacing={2}>
         <Grid item xs={12} style={{ backgroundColor: 'grey'}}>
            <Typography variant="h6" align="center">
            Add your Available Slots
            </Typography>
         </Grid>

         <Grid item xs={12} style={{backgroundColor:'darkgray',padding: '100px'}}>
         <DatePicker
            label="Controlled picker"
             selected={selectedDate}
            onChange={(date) => setSelectedDate(date)} //date 
           placeholderText="Select Date"
         />
        
         <select 
         value={selectedTime}
         onChange={(e)=>setSelectedTime(e.target.value)}  
         >
            {timeSlots?.map((value,index)=>(
                       <option key={index} value={value}>
                       {value}
                     </option>
            ))}
         </select>

         
            <Grid item xs={12} style={{  padding: "10px" }}>
            <Button  variant="contained" onClick={handleAdd} color="success">
              Add
          </Button>
          </Grid>

        </Grid>

     

        <Grid style={{backgroundColor:'white',padding: '50px'}}>
            <h4>Your Slots</h4>
            <ul>
            {addedDates?.map((slot, index) => (
                <li key={index}>
                  {slot}
                
                 <IconButton aria-label="delete"  onClick={()=>handleDelete(index)} >
                 <DeleteIcon />
                 </IconButton>

                </li>
              ))}
            </ul>
        </Grid>
      


          </Grid>
         </Container>
        </>
    )
}




export default AddSlot;

















