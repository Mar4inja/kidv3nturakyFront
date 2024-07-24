import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from '../profile/profileSlice';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const { firstName, lastName, age, gender, email, profilePhoto } = action.payload;
      if (state.user) {
        if (firstName) state.user.firstName = firstName;
        if (lastName) state.user.lastName = lastName;
        if (age) state.user.age = age;
        if (gender) state.user.gender = gender;
        if (email) state.user.email = email;
        if (profilePhoto) state.user.profilePhoto = profilePhoto;
      }
    });
  }
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
