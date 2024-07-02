// profileSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for profile updates
export const updateProfile = createAsyncThunk('profile/updateProfile', async (formData, thunkAPI) => {
    try {
        // Simulate a backend request
        // You can replace this with an actual API call
        return formData; // Simulating a successful response
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        profilePhoto: '',
        updateLoading: false,
        updatedProfile: null,
    },
    reducers: {
        setProfilePhoto: (state, action) => {
            state.profilePhoto = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updatedProfile = action.payload;
            })
            .addCase(updateProfile.rejected, (state) => {
                state.updateLoading = false;
            });
    },
});

export const { setProfilePhoto } = profileSlice.actions;

export const selectCurrentUser = (state) => state.profile;

export const selectUpdateLoading = (state) => state.profile.updateLoading;

export const selectUpdatedProfile = (state) => state.profile.updatedProfile;

export const selectProfilePhoto = (state) => state.profile.profilePhoto;

export default profileSlice.reducer;
