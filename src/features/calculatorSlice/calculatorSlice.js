// src/features/calculator/calculatorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: { input: '', operation: '', result: '' },
    reducers: {
        setInput(state, action) {
            state.input = action.payload;
        },
        setOperation(state, action) {
            state.operation = action.payload;
        },
        calculateResult(state) {
            try {
                // Lielākā daļa cilvēku izmanto eval, bet šis ir ļoti bīstams, tāpēc reālas aplikācijās labāk izmantot drošākus risinājumus
                state.result = eval(state.input + state.operation + state.result);
                state.input = '';
                state.operation = '';
            } catch (error) {
                state.result = 'Error';
            }
        },
        clear(state) {
            state.input = '';
            state.operation = '';
            state.result = '';
        }
    }
});

export const { setInput, setOperation, calculateResult, clear } = calculatorSlice.actions;
export default calculatorSlice.reducer;
