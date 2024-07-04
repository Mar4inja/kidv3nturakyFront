import React, { useState, useEffect } from 'react';
import styles from './Games.module.css';
import Navbar from '../navbar/Navbar';
import gamesBackgroundImage from '../../assets/games/games3.jpg';
import geographyImage from '../../assets/games/geography.jpg';
import mathImage from '../../assets/games/math.jpg';
import fairytalesImage from '../../assets/games/fairytail1.jpg';
import geographyQuestionImage from '../../assets/games/geoGREEN.jpg';
import mathQuestionImage from '../../assets/games/mathBLUE.jpg';
import fairytalesQuestionImage from '../../assets/games/fairytaleVIOLET.jpg';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Games = () => {
    const { t } = useTranslation();  // Pareizi izmantojam t
    const [showQuestions, setShowQuestions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
            setShowQuestions(true);
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

    const handleBackClick = () => {
        setShowQuestions(false);
        setSelectedCategory('');
        setCurrentQuestionIndex(0);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions[selectedCategory].length);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) =>
            (prevIndex - 1 + questions[selectedCategory].length) % questions[selectedCategory].length
        );
    };

    const questions = {
        geography: [
            { question: t('games.geographyQuestions.0.question'), answer: t('games.geographyQuestions.0.answer') },
            { question: t('games.geographyQuestions.1.question'), answer: t('games.geographyQuestions.1.answer') },
            { question: t('games.geographyQuestions.2.question'), answer: t('games.geographyQuestions.2.answer') },
            { question: t('games.geographyQuestions.3.question'), answer: t('games.geographyQuestions.3.answer') },
            { question: t('games.geographyQuestions.4.question'), answer: t('games.geographyQuestions.4.answer') },
            { question: t('games.geographyQuestions.5.question'), answer: t('games.geographyQuestions.5.answer') },
            { question: t('games.geographyQuestions.6.question'), answer: t('games.geographyQuestions.6.answer') },
            { question: t('games.geographyQuestions.7.question'), answer: t('games.geographyQuestions.7.answer') },
            { question: t('games.geographyQuestions.8.question'), answer: t('games.geographyQuestions.8.answer') },
            { question: t('games.geographyQuestions.9.question'), answer: t('games.geographyQuestions.9.answer') },
        ],
        math: [
            { question: t('games.mathQuestions.0.question'), answer: t('games.mathQuestions.0.answer') },
            { question: t('games.mathQuestions.1.question'), answer: t('games.mathQuestions.1.answer') },
            { question: t('games.mathQuestions.2.question'), answer: t('games.mathQuestions.2.answer') },
            { question: t('games.mathQuestions.3.question'), answer: t('games.mathQuestions.3.answer') },
            { question: t('games.mathQuestions.4.question'), answer: t('games.mathQuestions.4.answer') },
            { question: t('games.mathQuestions.5.question'), answer: t('games.mathQuestions.5.answer') },
            { question: t('games.mathQuestions.6.question'), answer: t('games.mathQuestions.6.answer') },
            { question: t('games.mathQuestions.7.question'), answer: t('games.mathQuestions.7.answer') },
            { question: t('games.mathQuestions.8.question'), answer: t('games.mathQuestions.8.answer') },
            { question: t('games.mathQuestions.9.question'), answer: t('games.mathQuestions.9.answer') },
        ],
        fairytales: [
            { question: t('games.fairytalesQuestions.0.question'), answer: t('games.fairytalesQuestions.0.answer') },
            { question: t('games.fairytalesQuestions.1.question'), answer: t('games.fairytalesQuestions.1.answer') },
            { question: t('games.fairytalesQuestions.2.question'), answer: t('games.fairytalesQuestions.2.answer') },
            { question: t('games.fairytalesQuestions.3.question'), answer: t('games.fairytalesQuestions.3.answer') },
            { question: t('games.fairytalesQuestions.4.question'), answer: t('games.fairytalesQuestions.4.answer') },
            { question: t('games.fairytalesQuestions.5.question'), answer: t('games.fairytalesQuestions.5.answer') },
            { question: t('games.fairytalesQuestions.6.question'), answer: t('games.fairytalesQuestions.6.answer') },
            { question: t('games.fairytalesQuestions.7.question'), answer: t('games.fairytalesQuestions.7.answer') },
            { question: t('games.fairytalesQuestions.8.question'), answer: t('games.fairytalesQuestions.8.answer') },
            { question: t('games.fairytalesQuestions.9.question'), answer: t('games.fairytalesQuestions.9.answer') },
        ],
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

    return (
        <div className={styles.gamesContainer}>
            <Navbar />
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

            {!showQuestions && !showLoginPrompt && (
                <div className={styles.cardContainer}>
                    {renderCard('geography', geographyImage)}
                    {renderCard('math', mathImage)}
                    {renderCard('fairytales', fairytalesImage)}
                </div>
            )}

            {showQuestions && (
                <div className={styles.questionsContainer}>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        {t('games.backButton')}
                    </button>
                    <div className={styles.questionDisplay}>
                        <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePreviousQuestion}>
                            <FaArrowLeft />
                        </button>
                        <div
                            className={styles.questionCard}
                            style={{
                                backgroundImage: `url(${
                                    selectedCategory === 'geography'
                                        ? geographyQuestionImage
                                        : selectedCategory === 'math'
                                            ? mathQuestionImage
                                            : fairytalesQuestionImage
                                })`
                            }}
                        >
                            <div className={styles.questionContent}>
                                <h2>{questions[selectedCategory][currentQuestionIndex].question}</h2>
                                <p>{questions[selectedCategory][currentQuestionIndex].answer}</p>
                            </div>
                        </div>
                        <button className={`${styles.navButton} ${styles.next}`} onClick={handleNextQuestion}>
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Games;
