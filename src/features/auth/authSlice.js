import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from '../profile/profileSlice';

const initialState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user; // Ensure user includes firstName and lastName if needed
      state.token = accessToken;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.user = action.payload; // Update the user info after profile update
        });
  }
});

export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
