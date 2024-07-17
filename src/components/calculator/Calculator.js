// src/components/Calculator.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOperation, setInput, calculateResult, clear } from '../../features/calculatorSlice/calculatorSlice';
import './calculator.module.css';

const Calculator = () => {
    const dispatch = useDispatch();
    const { input, operation, result } = useSelector((state) => state.calculator);

    const handleButtonClick = (value) => {
        if (['+', '-', '*', '/'].includes(value)) {
            dispatch(setOperation(value));
        } else if (value === '=') {
            dispatch(calculateResult());
        } else if (value === 'C') {
            dispatch(clear());
        } else {
            dispatch(setInput(input + value));
        }
    };

    return (
        <div className="calculator">
            <div className="display">
                <div>{input || '0'}</div>
                <div>{operation}</div>
                <div>{result}</div>
            </div>
            <div className="buttons">
                <button onClick={() => handleButtonClick('C')}>C</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('=')}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
