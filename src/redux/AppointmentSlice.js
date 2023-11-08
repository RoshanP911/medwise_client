import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice=createSlice({
    name: 'appointment',
    initialState:{
        appointment: null,
    },
    reducers:{
        appointmentData:(state,action)=>{
            state.appointment = action.payload;
        },
    }
})

export const {appointmentData}= appointmentSlice.actions