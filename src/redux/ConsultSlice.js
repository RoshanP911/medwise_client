import { createSlice } from "@reduxjs/toolkit";

export const consultSlice = createSlice({
  name: "consult",
  initialState: {
    slot: "",
  },
  reducers: {
    setSlot: (state, action) => {
      state.slot = action.payload;
    },
  },
});

export const { setSlot } = consultSlice.actions;
