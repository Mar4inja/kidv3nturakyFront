import React, { useState, useEffect } from 'react';
import styles from './Games.module.css';
import Navbar from '../navbar/Navbar';
import gamesBackgroundImage from '../../assets/games/games3.jpg';
import geographyImage from '../../assets/games/geography.jpg';
import mathImage from '../../assets/games/math.jpg';
import fairytalesImage from '../../assets/games/fairytail1.jpg';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Clock from "../clock/Clock";

const Games = () => {
    const { t } = useTranslation();
    const [showCategories, setShowCategories] = useState(true);
    const [showFilterForm, setShowFilterForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            setShowLoginPrompt(false);
        }
    }, []);

    const handleCardClick = (category) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            setSelectedCategory(category);
            setShowCategories(false);
            setShowFilterForm(true);
        } else {
            setShowLoginPrompt(true);
        }
    };

    const handleLoginPromptOk = () => {
        navigate('/login?redirect=games');
    };

    const handleLoginPromptCancel = () => {
        setShowLoginPrompt(false);
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        console.log("Filter submitted:", {
            ageGroup: event.target.ageGroup.value,
            difficulty: event.target.difficulty.value,
            gameType: event.target.gameType.value
        });
    };

    const handleBackClick = () => {
        setShowCategories(true);
        setShowFilterForm(false);
        setSelectedCategory('');
    };

    return (
        <div className={styles.gamesContainer}>
            <Navbar />
            <Clock />
            <div className={styles.backgroundContainer}>
                <img src={gamesBackgroundImage} alt={t('games.backgroundAlt')} className={styles.backgroundImage} />
            </div>

            {showLoginPrompt && (
                <div className={styles.loginPrompt}>
                    <p className={styles.logWarning}>{t('games.loginPrompt.message')}</p>
                    <button onClick={handleLoginPromptOk}>{t('games.loginPrompt.login')}</button>
                    <button onClick={handleLoginPromptCancel}>{t('games.loginPrompt.cancel')}</button>
                </div>
            )}

            {showCategories && !showLoginPrompt && (
                <div className={styles.categoriesContainer}>
                    <h1>{t('games.categoriesHeader')}</h1>
                    <div className={styles.cardContainer}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.card} onClick={() => handleCardClick('geography')} style={{ backgroundImage: `url(${geographyImage})` }}>
                                <div className={styles.cardContent}>
                                    <span className={styles.geoTitle}>{t('games.categories.geography')}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardWrapper}>
                            <div className={styles.card} onClick={() => handleCardClick('math')} style={{ backgroundImage: `url(${mathImage})` }}>
                                <div className={styles.cardContent}>
                                    <span className={styles.geoTitle}>{t('games.categories.math')}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardWrapper}>
                            <div className={styles.card} onClick={() => handleCardClick('fairytales')} style={{ backgroundImage: `url(${fairytalesImage})` }}>
                                <div className={styles.cardContent}>
                                    <span className={styles.geoTitle}>{t('games.categories.fairytales')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showFilterForm && !showLoginPrompt && (
                <div className={styles.filterFormContainer}>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        {t('games.backButton')}
                    </button>
                    <h2 className={styles.categoryHeader}>{t(`games.categories.${selectedCategory}`)}</h2>
                    <form onSubmit={handleFilterSubmit}>
                        <div className={styles.filterGroup}>
                            <label className={styles.upperLabel} htmlFor="ageGroup">{t('games.filters.ageGroup')}</label>
                            <select id="ageGroup" name="ageGroup">
                                <option value="">{t('games.filters.chooseYourOption')}</option>
                                <option value="4-7">{t('games.filters.ageGroupOptions.4-7')}</option>
                                <option value="7-10">{t('games.filters.ageGroupOptions.7-10')}</option>
                                <option value="10-13">{t('games.filters.ageGroupOptions.10-13')}</option>
                                <option value="13-16">{t('games.filters.ageGroupOptions.13-16')}</option>
                            </select>
                        </div>
                        <div className={styles.filterGroup}>
                            <label className={styles.upperLabel} htmlFor="difficulty">{t('games.filters.difficulty')}</label>
                            <select id="difficulty" name="difficulty">
                                <option value="">{t('games.filters.chooseYourOption')}</option>
                                <option value="easy">{t('games.filters.difficultyOptions.easy')}</option>
                                <option value="medium">{t('games.filters.difficultyOptions.medium')}</option>
                                <option value="hard">{t('games.filters.difficultyOptions.hard')}</option>
                            </select>
                        </div>
                        <div className={styles.filterGroup}>
                            <label className={styles.upperLabel} htmlFor="gameType">{t('games.filters.gameType')}</label>
                            <select id="gameType" name="gameType">
                                <option value="">{t('games.filters.chooseYourOption')}</option>
                                <option value="educational">{t('games.filters.gameTypeOptions.educational')}</option>
                                <option value="fun">{t('games.filters.gameTypeOptions.fun')}</option>
                                <option value="both">{t('games.filters.gameTypeOptions.both')}</option>
                            </select>
                        </div>
                        <button type="submit">{t('games.filters.apply')}</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Games;
