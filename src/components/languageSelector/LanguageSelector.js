// src/components/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = async (lng) => {
        try {
            await i18n.changeLanguage(lng);  // Gaida, līdz valoda tiek mainīta
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <div className={styles.languageSelector}>
            <select
                className={styles.select}
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
            >
                <option value="en">English</option>
                <option value="ru">Русский</option>
                <option value="de">Deutsch</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
