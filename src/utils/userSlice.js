import { createSlice } from "@reduxjs/toolkit";

const initialState =  null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
     // localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    removeUsers: () => {
     // localStorage.removeItem("user"); // ✅ actually remove it
      return null;
    },
  },
});

export const { addUser, removeUsers } = userSlice.actions;

export default userSlice.reducer;
