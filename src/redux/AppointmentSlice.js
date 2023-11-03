import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice=createSlice({
    name: 'appointment',
    initialState:{
        appointment: {},
    },
    reducers:{
        setDoctor:(state,action)=>{
            state.appointment = action.payload;
        },
       
    }
})

export const {setAppointment}= doctorSlice.actions