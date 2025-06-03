import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    isSearching: false,
    totalPage: 1,
    currentPage: 1,
  },
  reducers: {
    setData: (state, action) => {
      state.items = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setcurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
});

export const { setData, setIsSearching, setcurrentPage, setTotalPage } =
  productSlice.actions;

export default productSlice.reducer;
