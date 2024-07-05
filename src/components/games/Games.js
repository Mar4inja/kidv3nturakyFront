import React, { useState, useEffect } from 'react';
import styles from './Games.module.css';
import Navbar from '../navbar/Navbar';
import gamesBackgroundImage from '../../assets/games/games3.jpg';
import geographyImage from '../../assets/games/geography.jpg';
import mathImage from '../../assets/games/math.jpg';
import fairytalesImage from '../../assets/games/fairytail1.jpg';

import preschoolImage from '../../assets/ageGroups/kindergarten.jpg';  // Добавьте изображение для дошкольников
import earlySchoolImage from '../../assets/ageGroups/firstClasses.jpg';  // Добавьте изображение для младших школьников
import middleSchoolImage from '../../assets/ageGroups/middleClasses.jpg';  // Добавьте изображение для средних школьников
import highSchoolImage from '../../assets/ageGroups/teenagers.jpg';  // Добавьте изображение для старших школьников

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Games = () => {
    const { t } = useTranslation();
    const [showCategories, setShowCategories] = useState(true);
    const [showAgeGroups, setShowAgeGroups] = useState(false);
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
            setShowAgeGroups(true);
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

    const handleAgeGroupClick = (ageGroup) => {
        // Логика для выбора возрастной группы
        console.log(`Выбран возрастной группы: ${ageGroup}`);
        // Вы можете добавить код для перехода к следующему экрану или выполнения других действий
    };

    const handleBackClick = () => {
        setShowCategories(true);
        setShowAgeGroups(false);
        setSelectedCategory('');
    };

    const renderCard = (category, image) => (
        <div
            className={styles.card}
            onClick={() => handleCardClick(category)}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className={styles.cardContent}>
                <span className={styles.geoTitle}>{t(`games.categories.${category}`)}</span>
            </div>
        </div>
    );

    const renderAgeGroupCard = (ageGroup, image) => (
        <div
            className={styles.card}
            onClick={() => handleAgeGroupClick(ageGroup)}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className={styles.cardContent}>
                <span className={styles.geoTitle}>{t(`games.ageGroups.${ageGroup}`)}</span>
            </div>
        </div>
    );

    return (
        <div className={styles.gamesContainer}>
            <Navbar/>
            <div className={styles.backgroundContainer}>
                <img src={gamesBackgroundImage} alt={t('games.backgroundAlt')} className={styles.backgroundImage}/>
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
                        {renderCard('geography', geographyImage)}
                        {renderCard('math', mathImage)}
                        {renderCard('fairytales', fairytalesImage)}
                    </div>
                </div>
            )}

            {showAgeGroups && !showLoginPrompt && (
                <div className={styles.cardContainer}>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        {t('games.backButton')}
                    </button>

                    {selectedCategory === 'geography' && (
                        <>

                            {renderAgeGroupCard('4 - 7 years', preschoolImage)}
                            {renderAgeGroupCard('7 - 10 years', earlySchoolImage)}
                            {renderAgeGroupCard('10 - 13 years', middleSchoolImage)}
                            {renderAgeGroupCard('13 - 16 years', highSchoolImage)}

                        </>
                    )}
                    {selectedCategory === 'math' && (
                        <>

                            {renderAgeGroupCard('4 - 7 years', preschoolImage)}
                            {renderAgeGroupCard('7 - 10 years', earlySchoolImage)}
                            {renderAgeGroupCard('10 - 13 years', middleSchoolImage)}
                            {renderAgeGroupCard('13 - 16 years', highSchoolImage)}

                        </>
                    )}
                    {selectedCategory === 'fairytales' && (
                        <>

                            {renderAgeGroupCard('4 - 7 years', preschoolImage)}
                            {renderAgeGroupCard('7 - 10 years', earlySchoolImage)}
                            {renderAgeGroupCard('10 - 13 years', middleSchoolImage)}
                            {renderAgeGroupCard('13 - 16 years', highSchoolImage)}

                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Games;
