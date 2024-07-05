import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for the API
const baseUrl = 'http://localhost:8080/api/tasks';


// Async thunks for each backend method
export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
    const response = await axios.get(`${baseUrl}/getAllTasks`);
    return response.data;
});

export const fetchTaskById = createAsyncThunk('tasks/fetchTaskById', async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
});

export const fetchTasksByDifficulty = createAsyncThunk('tasks/fetchTasksByDifficulty', async (difficulty) => {
    const response = await axios.get(`${baseUrl}/difficulty`, { params: { difficulty } });
    return response.data;
});

export const fetchTasksByType = createAsyncThunk('tasks/fetchTasksByType', async (type) => {
    const response = await axios.get(`${baseUrl}/type`, { params: { type } });
    return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
    const response = await axios.post(`${baseUrl}/create`, task);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
    const response = await axios.put(`${baseUrl}/update/${id}`, task);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    await axios.delete(`${baseUrl}/delete/${id}`);
    return id;
});

// Initial state
const initialState = {
    tasks: [],
    task: null,
    status: 'idle',
    error: null,
};

// Slice
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all tasks
            .addCase(fetchAllTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchAllTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Fetch task by ID
            .addCase(fetchTaskById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.task = action.payload;
            })
            .addCase(fetchTaskById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Fetch tasks by difficulty
            .addCase(fetchTasksByDifficulty.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksByDifficulty.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasksByDifficulty.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Fetch tasks by type
            .addCase(fetchTasksByType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasksByType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasksByType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create task
            .addCase(createTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks.push(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Update task
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Delete task
            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default tasksSlice.reducer;
