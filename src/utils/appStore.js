import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import totalReducer from './totalSlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    total : totalReducer,
  },
});

export default appStore;
