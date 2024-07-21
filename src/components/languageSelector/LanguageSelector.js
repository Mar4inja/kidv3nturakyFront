// src/components/LanguageSelector.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './languageSelector.module.css';
import { FaGlobe } from 'react-icons/fa'; // Import Globe icon from react-icons

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = async (lng) => {
        try {
            await i18n.changeLanguage(lng);  // Wait until the language is changed
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <div className={styles.languageSelector}>
            <button className={styles.iconButton} onClick={() => setIsOpen(!isOpen)}>
                <FaGlobe className={styles.icon} />
            </button>
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <button className={styles.dropdownItem} onClick={() => changeLanguage('en')}>English</button>
                    <button className={styles.dropdownItem} onClick={() => changeLanguage('ru')}>Русский</button>
                    <button className={styles.dropdownItem} onClick={() => changeLanguage('de')}>Deutsch</button>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
