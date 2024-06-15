// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import registerReducer, { registerUser } from './features/registerSlice'; // noteikti importet registerUser

export default configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
  },
});
