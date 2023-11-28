import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import axios from '../../services/axiosInterceptor';
import DatePicker from "react-datepicker";
import DeleteIcon from '@mui/icons-material/Delete';
import { setDoctor } from "../../redux/DoctorSlice.js";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const AddSlot = () => {
  const { doctor } = useSelector((state) => state.doctor);
  const timeSlots = [
    '9.00 AM', '9.30 AM', '10.00 AM', '10.30 AM', '11.00 AM', '11.30 AM', '12.00 PM',
    '12.30 PM', '1.00 PM', '1.30 PM', '2.00 PM', '2.30 PM', '3.00 PM', '3.30 PM',
    '4.00 PM', '4.30 PM', '5.00 PM', '5.30 PM', '6.00 PM', '6.30 PM', '7.00 PM',
    '7.30 PM', '8.00 PM',
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('9.00 AM');
  const [addedDates, setAddedDates] = useState(doctor?.availableSlots);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleAdd = async () => {
    if (selectedDate) {
      const dateAndTime = `${selectedDate.toDateString()} ${selectedTime}`;
      try {
        const response = await axios.post("/doctor/add-slot", { doctorData: doctor, selectedDate: dateAndTime });
        if (response.data.success) {
          setAddedDates([...addedDates, dateAndTime]);
          toast.success(response.data.message);
          setSelectedDate(null);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (index) => {
    try {
      const slotToDelete = addedDates[index];
      const response = await axios.delete("/doctor/delete-slot", {
        data: { doctorData: doctor, slotToDelete: slotToDelete },
      });
      if (response.data.success) {
        setAddedDates([...response.data.updatedDoctor.availableSlots]);
        dispatch(setDoctor(response.data.updatedDoctor));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentDate = new Date();


  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', margin: '20px', borderRadius: '10px', backgroundColor: "#f9f9f9" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Your Available Slots
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ marginBottom: '16px' }}>
            <DatePicker
              label="Select Date"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Date"
minDate={currentDate}
              fullWidth
            />
{console.log(selectedDate,'seelected dateee')}
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {timeSlots.map((value, index) => (
                  <MenuItem key={index} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAdd} color="primary" fullWidth>
              Add Slot
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px', borderRadius: '10px', backgroundColor: "#f9f9f9" }}>
        <Typography variant="h5" gutterBottom>
          Your Slots
        </Typography>
        <ul>
          {addedDates.map((slot, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', borderBottom: '1px solid #ccc' }}>
              {slot}
              <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
};

export default AddSlot;
