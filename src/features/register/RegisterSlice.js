
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Piemēra asinhronās darbības funkcija reģistrēšanai
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 409) {
        return rejectWithValue('Email already exists');
      }

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Definējam registerSlice
const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    registeredUser: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registeredUser = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.registeredUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registeredUser = null;
      });
  },
});

// Exportējam darbības un reducera darbības
export const { clearError } = registerSlice.actions;

// Selectors, lai atlasītu stāvokļus no register reducer
export const selectRegisterLoading = (state) => state.register.loading;
export const selectRegisterError = (state) => state.register.error;
export const selectRegisteredUser = (state) => state.register.registeredUser;

// Exportējam reduceru
export default registerSlice.reducer;
