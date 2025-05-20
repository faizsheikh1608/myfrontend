import { createSlice } from "@reduxjs/toolkit";


const totalSlice = createSlice({
  name : "total",
  initialState : 0,
  reducers : {
    addTotal : (state,action) => {
    return state + action.payload;
    }
  }
})

export const {addTotal} = totalSlice.actions;

export default totalSlice.reducer;