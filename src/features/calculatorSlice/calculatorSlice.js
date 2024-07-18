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
                const inputValue = parseFloat(state.input);
                const currentResult = parseFloat(state.result);

                switch (state.operation) {
                    case '+':
                        state.result = currentResult + inputValue;
                        break;
                    case '-':
                        state.result = currentResult - inputValue;
                        break;
                    case '*':
                        state.result = currentResult * inputValue;
                        break;
                    case '/':
                        state.result = currentResult / inputValue;
                        break;
                    default:
                        state.result = 'Error';
                        break;
                }

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
