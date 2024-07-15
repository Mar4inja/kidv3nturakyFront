// Importējiet nepieciešamos komponentus
import { useState, useEffect } from 'react';
import styles from './games.module.css';
import gamesBackgroundImage from '../../assets/games/games3.jpg';
import geographyImage from '../../assets/games/geography.jpg';
import mathImage from '../../assets/games/math.jpg';
import fairytalesImage from '../../assets/games/fairytail1.jpg';
import age4Image from '../../assets/ageGroups/4+.jpg';
import age6Image from '../../assets/ageGroups/6+.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Clock from "../clock/Clock";

const Games = () => {
    const { t } = useTranslation();
    const [showCategories, setShowCategories] = useState(true);
    const [showAgeGroups, setShowAgeGroups] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showAddGameModal, setShowAddGameModal] = useState(false);  // Jauns stāvokļa mainīgais
    const [newGame, setNewGame] = useState({
        title: '',
        description: '',
        difficulty: '',
        type: '',
        content: '',
        correctAnswer: ''
    });  // Jaunas spēles dati
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

    const handleBackClick = () => {
        setShowCategories(true);
        setShowAgeGroups(false);
        setSelectedCategory('');
    };

    const handleAgeGroupClick = (ageGroup) => {
        navigate(`/games/${selectedCategory}/${ageGroup}`);
    };

    const handleAddGameClick = () => {
        setShowAddGameModal(true);
    };

    const handleAddGameModalClose = () => {
        setShowAddGameModal(false);
    };

    const handleNewGameChange = (e) => {
        const { name, value } = e.target;
        setNewGame((prevGame) => ({
            ...prevGame,
            [name]: value
        }));
    };

    const handleAddGameSubmit = (e) => {
        e.preventDefault();
        // Šeit varat veikt AJAX pieprasījumu, lai saglabātu spēles datus
        console.log(newGame);
        setNewGame({
            title: '',
            description: '',
            difficulty: '',
            type: '',
            content: '',
            correctAnswer: ''
        });
        setShowAddGameModal(false);
    };

    return (
        <div className={styles.gamesContainer}>
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
                    <button className={styles.addGameButton} onClick={handleAddGameClick}>
                        {t('games.addNewGameButton')}
                    </button>
                </div>
            )}

            {showAgeGroups && !showLoginPrompt && (
                <div className={styles.ageGroupsContainer}>
                    <h2>{t('games.ageGroupsHeader')}</h2>
                    <div className={styles.ageCardContainer}>
                        <div className={styles.ageCardWrapper}>
                            <div className={styles.ageCard} onClick={() => handleAgeGroupClick('4+')}
                                 style={{backgroundImage: `url(${age4Image})`}}>
                                <div className={styles.cardContent}>
                                    <span className={styles.geoTitle}>{t('games.ageGroups.age4')}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ageCardWrapper}>
                            <div className={styles.ageCard} onClick={() => handleAgeGroupClick('6+')}
                                 style={{backgroundImage: `url(${age6Image})`}}>
                                <div className={styles.cardContent}>
                                    <span className={styles.geoTitle}>{t('games.ageGroups.age6')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.backButton} onClick={handleBackClick}>{t('games.ageGroups.backButton')}</button>
                </div>
            )}

            {showAddGameModal && (
                <div className={styles.addGameModal}>
                    <div className={styles.modalContent}>
                        <h2>{t('games.addNewGameModal.title')}</h2>
                        <form onSubmit={handleAddGameSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="title">{t('games.addNewGameModal.titleLabel')}</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newGame.title}
                                    onChange={handleNewGameChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="description">{t('games.addNewGameModal.descriptionLabel')}</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newGame.description}
                                    onChange={handleNewGameChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="difficulty">{t('games.addNewGameModal.difficultyLabel')}</label>
                                <input
                                    type="text"
                                    id="difficulty"
                                    name="difficulty"
                                    value={newGame.difficulty}
                                    onChange={handleNewGameChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="type">{t('games.addNewGameModal.typeLabel')}</label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={newGame.type}
                                    onChange={handleNewGameChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="content">{t('games.addNewGameModal.contentLabel')}</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={newGame.content}
                                    onChange={handleNewGameChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="correctAnswer">{t('games.addNewGameModal.correctAnswerLabel')}</label>
                                <input
                                    type="text"
                                    id="correctAnswer"
                                    name="correctAnswer"
                                    value={newGame.correctAnswer}
                                    onChange={handleNewGameChange}
                                />
                            </div>
                            <button type="submit">{t('games.addNewGameModal.submitButton')}</button>
                            <button type="button" onClick={handleAddGameModalClose}>{t('games.addNewGameModal.cancelButton')}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Games;
