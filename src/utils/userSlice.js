import { createSlice } from "@reduxjs/toolkit";


 const userSlice = createSlice({
  name : "user",
  initialState : null,
  reducers :{
    addUser : (state,action) => {
      return action.payload;
    },
    removeUsers : () => {
      return null;
    }
  }
})

export const {addUser,removeUsers} = userSlice.actions;

export default userSlice.reducer;

