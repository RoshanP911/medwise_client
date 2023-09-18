import { createSlice } from "@reduxjs/toolkit"; //createSlice function is used to create a Redux slice named userSlice.

export const userSlice=createSlice({
    name: 'user',
    initialState:{
        user: null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
    }
})

export const {setUser}= userSlice.actions