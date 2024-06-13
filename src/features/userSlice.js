import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Asinhrona darbība autentifikācijas pieprasījumam
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.error || 'Failed to login');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
