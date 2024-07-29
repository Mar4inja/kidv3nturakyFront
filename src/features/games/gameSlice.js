import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for the API
const baseUrl = 'http://localhost:8080/api/games';

// Helper function to get the token from localStorage
const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token to ensure it's being retrieved
    return token;
};

// Fetch games by category and age group
export const fetchGamesByCategoryAndAgeGroup = createAsyncThunk(
    'games/fetchGamesByCategoryAndAgeGroup',
    async ({ gameCategory, ageGroup }) => {
        const token = getToken(); // Get token
        const response = await axios.get(`${baseUrl}/byCategoryAndAgeGroup`, {
            params: {
                gameCategory,
                ageGroup,
            },
            headers: {
                'Authorization': `Bearer ${token}`, // Add authorization header
            },
        });
        return response.data;
    }
);

// Create a new game
export const createGame = createAsyncThunk(
    'games/createGame',
    async (gameData) => {
        const token = getToken(); // Get token
        const response = await axios.post(`${baseUrl}/create`, gameData, {
            headers: {
                'Authorization': `Bearer ${token}`, // Add authorization header
                'Content-Type': 'application/json', // Ensure proper content type
            },
        });
        return response.data;
    }
);

// Initial state
const initialState = {
    games: [],
    game: null,
    status: 'idle',
    error: null,
};

// Slice
const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch games by category and age group
            .addCase(fetchGamesByCategoryAndAgeGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGamesByCategoryAndAgeGroup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            .addCase(fetchGamesByCategoryAndAgeGroup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create a new game
            .addCase(createGame.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.game = action.payload; // Set the created game
            })
            .addCase(createGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default gamesSlice.reducer;
