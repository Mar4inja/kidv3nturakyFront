import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const initialState = {
  loading: false,
  error: null,
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutPending());

  try {
    const { data } = await apiSlice.endpoints.logout();

    if (data) {
      localStorage.clear();
      dispatch(logoutSuccess());
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    dispatch(logoutFailure(error.message));
  }
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logoutPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logoutPending, logoutSuccess, logoutFailure } = logoutSlice.actions;

export default logoutSlice.reducer;
