import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for the API
const baseUrl = 'http://localhost:8080/api/games';

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Async thunks for each backend method
export const fetchAllGames = createAsyncThunk('games/fetchAllGames', async () => {
    const response = await axios.get(baseUrl);
    return response.data;
});

export const fetchGamesByCategoryAndAge = createAsyncThunk('games/fetchGamesByCategoryAndAge', async ({ category, ageGroup }) => {
    const response = await axios.get(`${baseUrl}?category=${category}&age=${ageGroup}`);
    return response.data;
});

export const fetchGameById = createAsyncThunk('games/fetchGameById', async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
});

export const createGame = createAsyncThunk('games/createGame', async (game, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}/create`, game, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateGame = createAsyncThunk('games/updateGame', async ({ id, game }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${baseUrl}/update/${id}`, game, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteGame = createAsyncThunk('games/deleteGame', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

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
            // Fetch all games
            .addCase(fetchAllGames.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            .addCase(fetchAllGames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Fetch games by category and age group
            .addCase(fetchGamesByCategoryAndAge.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGamesByCategoryAndAge.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload;
            })
            .addCase(fetchGamesByCategoryAndAge.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Fetch game by ID
            .addCase(fetchGameById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGameById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.game = action.payload;
            })
            .addCase(fetchGameById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create game
            .addCase(createGame.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createGame.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games.push(action.payload);
            })
            .addCase(createGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            // Update game
            .addCase(updateGame.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateGame.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.games.findIndex(game => game.id === action.payload.id);
                if (index !== -1) {
                    state.games[index] = action.payload;
                }
            })
            .addCase(updateGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            // Delete game
            .addCase(deleteGame.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = state.games.filter(game => game.id !== action.payload);
            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            });
    },
});

export default gamesSlice.reducer;
