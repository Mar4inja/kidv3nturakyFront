import React, { useState } from 'react';
import styles from '../games/Games.module.css';
import Navbar from "../navbar/Navbar";
import gamesBackgroundImage from "../../assets/games/games3.jpg";

const Games = () => {
    const [showQuestions, setShowQuestions] = useState(false); // Stāvokļa mainīgais, kas kontrolē jautājumu kartīšu redzamību

    const handleCardClick = () => {
        setShowQuestions(true); // Rāda jautājumu kartītes
    };

    const handleBackClick = () => {
        setShowQuestions(false); // Paslēpj jautājumu kartītes
    };

    return (
        <div className={styles.gamesContainer}>
            <Navbar />
            <div className={styles.backgroundContainer}>
                <img
                    src={gamesBackgroundImage}
                    alt="Background"
                    className={styles.backgroundImage}
                />
            </div>
            {/* Galvenā kartīte un jautājumu kartītes tiek rādītas atkarībā no stāvokļa */}
            {!showQuestions ? (
                <div className={styles.card} onClick={handleCardClick}>
                    <h1>Geography</h1>
                    <h3>What do you know about countries?</h3>
                    <p>Click to see questions!</p>
                </div>
            ) : (
                <div className={styles.questionsContainer}>
                    <button className={styles.backButton} onClick={handleBackClick}>Back</button>
                    <div className={styles.questionsRow}>
                        <div className={styles.questionCard}>
                            <h2>Question 1</h2>
                            <p>What do you know about countries?</p>
                            <p>Answer: The United States</p>
                        </div>
                        <div className={styles.questionCard}>
                            <h2>Question 2</h2>
                            <p>In which country is New York?</p>
                            <p>Answer: The United States</p>
                        </div>
                        <div className={styles.questionCard}>
                            <h2>Question 3</h2>
                            <p>Which continent is Australia in?</p>
                            <p>Answer: Australia</p>
                        </div>
                        {/* Pievienojiet vairāk jautājumu kartīšu pēc nepieciešamības */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Games;
