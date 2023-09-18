import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice=createSlice({
    name: 'doctor',
    initialState:{
        doctor: null,
    },
    reducers:{
        setDoctor:(state,action)=>{
            state.doctor = action.payload;
        },
       
    }
})

export const {setDoctor}= doctorSlice.actions