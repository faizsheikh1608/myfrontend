import { createSlice } from "@reduxjs/toolkit";


const totalSlice = createSlice({
  name : "total",
  initialState : 0,
  reducers : {
    addTotal : (state,action) => {
      return action.payload
    }
  }
})

export const {addTotal,getTotal} = totalSlice.actions;

export default totalSlice.reducer;