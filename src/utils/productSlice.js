import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    isSearching: false,
  },
  reducers: {
    setData: (state, action) => {
      state.items = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
  },
});

export const { setData, setIsSearching } = productSlice.actions;

export default productSlice.reducer;
