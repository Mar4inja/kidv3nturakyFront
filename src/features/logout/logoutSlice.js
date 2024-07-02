// logoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logoutUser(state) {
      state.loggedIn = false;
    },
  },
});

export const { logoutUser } = logoutSlice.actions;
export default logoutSlice.reducer;
