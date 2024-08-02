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
export const fetchGamesByGameCategoryAndAgeGroup = createAsyncThunk(
    'games/fetchGamesByGameCategoryAndAgeGroup',
    async ({gameCategory, ageGroup }) => {
        const token = getToken(); // Get token
        const response = await axios.get(`${baseUrl}/byGameCategoryAndAgeGroup`, {
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
    gameCategory: null,  // Added to manage category selection
    ageGroup: null,      // Added to manage age group selection
};

// Slice
const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGameCategory: (state, action) => {
            state.gameCategory = action.payload;
        },
        setAgeGroup: (state, action) => {
            state.ageGroup = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch games by category and age group
            .addCase(fetchGamesByGameCategoryAndAgeGroup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGamesByGameCategoryAndAgeGroup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            .addCase(fetchGamesByGameCategoryAndAgeGroup.rejected, (state, action) => {
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

export const { setGameCategory, setAgeGroup } = gamesSlice.actions;
export default gamesSlice.reducer;
