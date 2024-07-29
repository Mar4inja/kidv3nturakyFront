import { useEffect, useState } from 'react';
import styles from './games.module.css';
import gamesBackgroundImage from '../../assets/games/games3.jpg';
import geographyImage from '../../assets/games/geography.jpg';
import mathImage from '../../assets/games/math.jpg';
import fairytalesImage from '../../assets/games/fairytail1.jpg';
import age4Image from '../../assets/ageGroups/4+.jpg';
import age6Image from '../../assets/ageGroups/6+.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGamesByCategoryAndAgeGroup } from '../../features/games/gameSlice'; // Import function with correct name
import { selectIsLoggedIn } from '../../features/auth/authSlice'; // Assuming you have this selector

const Games = () => {
    const { t } = useTranslation();
    const [showCategories, setShowCategories] = useState(true);
    const [showAgeGroups, setShowAgeGroups] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showAddGameModal, setShowAddGameModal] = useState(false);
    const [newGame, setNewGame] = useState({
        title: '',
        description: '',
        difficulty: '',
        type: '',
        content: '',
        correctAnswer: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn); // Use a Redux selector to get the login status
    const games = useSelector(state => state.games.games);
    const gameStatus = useSelector(state => state.games.status);
    const gameError = useSelector(state => state.games.error);

    useEffect(() => {
        console.log('Selected Category:', selectedCategory);
        console.log('Selected Age Group:', selectedAgeGroup);

        if (selectedCategory && selectedAgeGroup) {
            dispatch(fetchGamesByCategoryAndAgeGroup({ gameCategory: selectedCategory, ageGroup: selectedAgeGroup }));
        }
    }, [selectedCategory, selectedAgeGroup, dispatch]);

    const handleCardClick = (category) => {
        if (isLoggedIn) {
            setSelectedCategory(category);
            setShowCategories(false);
            setShowAgeGroups(true);
        } else {
            setShowLoginPrompt(true);
        }
    };

    const handleAgeGroupClick = (ageGroup) => {
        setSelectedAgeGroup(ageGroup);
        setShowAgeGroups(false);
    };

    const handleBackClick = () => {
        setShowCategories(true);
        setShowAgeGroups(false);
        setSelectedCategory('');
        setSelectedAgeGroup('');
    };

    const handleLoginPromptOk = () => {
        navigate('/login');
    };

    const handleLoginPromptCancel = () => {
        setShowLoginPrompt(false);
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

    const handleSubmitNewGame = (e) => {
        e.preventDefault();
        // TODO: Dispatch the action to create a new game
        console.log('New Game:', newGame);
    };

    return (
        <div className={styles.gamesContainer}>
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

            {showAgeGroups && !showLoginPrompt && (
                <div className={styles.ageGroupsContainer}>
                    <button className={styles.backButton} onClick={handleBackClick}>{t('games.backButton')}</button>
                    <h1>{t('games.ageGroupsHeader')}</h1>
                    <div className={styles.cardContainer}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.card} onClick={() => handleAgeGroupClick('kindergarten')} style={{ backgroundImage: `url(${age4Image})` }}>
                                <div className={styles.cardContent}>
                                    <span className={styles.geoTitle}>{t('games.ageGroups.kindergarten')}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardWrapper}>
                            <div className={styles.card} onClick={() => handleAgeGroupClick('firstClass')} style={{ backgroundImage: `url(${age6Image})` }}>
                                <div className={styles.cardContent}>
                                    <span className={styles.geoTitle}>{t('games.ageGroups.firstClass')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!showLoginPrompt && (
                <div className={styles.playGamesContainer}>
                    <button className={styles.backButton} onClick={handleBackClick}>{t('games.backButton')}</button>
                    <h1>{t('games.playGamesHeader')}</h1>
                    {gameStatus === 'loading' && <p>{t('games.loading')}</p>}
                    {gameStatus === 'failed' && <p>{gameError}</p>}
                    {gameStatus === 'succeeded' && games.length === 0 && <p>{t('games.noGames')}</p>}
                    {gameStatus === 'succeeded' && games.length > 0 && (
                        <div className={styles.cardContainer}>
                            {games.map((game) => (
                                <div key={game.id} className={styles.cardWrapper}>
                                    <div className={styles.card}>
                                        <div className={styles.cardContent}>
                                            <span className={styles.geoTitle}>{game.title}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <button onClick={handleAddGameClick}>{t('games.addGameButton')}</button>

            {showAddGameModal && (
                <div className={styles.addGameModal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={handleAddGameModalClose}>X</button>
                        <h2>{t('games.addGameModal.title')}</h2>
                        <form onSubmit={handleSubmitNewGame}>
                            <label>
                                {t('games.addGameModal.titleLabel')}
                                <input type="text" name="title" value={newGame.title} onChange={handleNewGameChange} required />
                            </label>
                            <label>
                                {t('games.addGameModal.descriptionLabel')}
                                <textarea name="description" value={newGame.description} onChange={handleNewGameChange} required />
                            </label>
                            <label>
                                {t('games.addGameModal.difficultyLabel')}
                                <input type="text" name="difficulty" value={newGame.difficulty} onChange={handleNewGameChange} required />
                            </label>
                            <label>
                                {t('games.addGameModal.typeLabel')}
                                <input type="text" name="type" value={newGame.type} onChange={handleNewGameChange} required />
                            </label>
                            <label>
                                {t('games.addGameModal.contentLabel')}
                                <textarea name="content" value={newGame.content} onChange={handleNewGameChange} required />
                            </label>
                            <label>
                                {t('games.addGameModal.correctAnswerLabel')}
                                <input type="text" name="correctAnswer" value={newGame.correctAnswer} onChange={handleNewGameChange} required />
                            </label>
                            <button type="submit">{t('games.addGameModal.submitButton')}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Games;
