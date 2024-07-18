import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOperation, setInput, calculateResult, clear } from '../../features/calculatorSlice/calculatorSlice';
import styles from './calculator.module.css'; // Правильный импорт CSS модуля

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

    // Функция для отрисовки кнопок калькулятора
    const renderButtons = () => {
        // Массив кнопок
        const buttons = [
            'C', '/', '*', '-', '+',
            '0', '1', '2', '3', '4',
            '5', '6', '7', '8', '9',
            '='
        ];

        // Отображение кнопок
        return buttons.map((button) => (
            <button key={button} onClick={() => handleButtonClick(button)}>{button}</button>
        ));
    };

    return (
        <div className={styles.calculator}>
            <div className={styles.display}>
                <div>{input || '0'}</div>
                <div>{operation}</div>
                <div>{result}</div>
            </div>
            <div className={styles.buttons}>
                {renderButtons()} {/* Вызов функции для отрисовки кнопок */}
            </div>
        </div>
    );
};

export default Calculator;
