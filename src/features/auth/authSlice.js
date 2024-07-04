// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from '../profile/profileSlice';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false  // Jaunais stāvoklis, lai pārvaldītu ielogojuma statusu
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;  // Ielogošanas statusa atjaunināšana uz true
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;  // Ielogošanas statusa atjaunināšana uz false pēc iziešanas
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const { firstName, lastName } = action.payload;
      if (firstName) state.user.firstName = firstName;
      if (lastName) state.user.lastName = lastName;
    });
  }
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;  // Selectors for isLoggedIn
