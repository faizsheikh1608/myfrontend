import { createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
  name : "product",
  initialState : [],
  reducers : {
    setData : (state,action) => {
      return action.payload;
    },
  }
})

export const {setData} = productSlice.actions;

export default productSlice.reducer;