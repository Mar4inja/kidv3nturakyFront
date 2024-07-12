import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import {
    cameraOutline, diamondOutline, chatbubbleOutline,
    alarmOutline, gameControllerOutline, moonOutline,
    waterOutline, timeOutline, alertOutline
} from 'ionicons/icons';
import styles from './DotMenu.module.css';

// Icons to display instead of dots
const icons = [
    cameraOutline,
    diamondOutline,
    chatbubbleOutline,
    alarmOutline,
    gameControllerOutline,
    moonOutline,
    waterOutline,
    timeOutline,
    alertOutline
];

const DotMenu = () => {
    const [active, setActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);

    const handleToggle = () => {
        if (active) {
            // Reset to initial state when closing menu
            setActive(false);
            setCurrentIndex(0);
            setAnimationComplete(false);
        } else {
            // Activate menu
            setActive(true);
        }
    };

    useEffect(() => {
        let interval;
        if (active && !animationComplete) {
            interval = setInterval(() => {
                setCurrentIndex(prevIndex => {
                    if (prevIndex < icons.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        setAnimationComplete(true);
                        return prevIndex;
                    }
                });
            }, 1000);  // Transition speed: 1 second
        }

        return () => clearInterval(interval);
    }, [active, animationComplete]);

    return (
        <div className={styles.main} onClick={handleToggle}>
            <div className={`${styles.navigation} ${active ? styles.active : ''}`}>
                {icons.map((icon, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index <= currentIndex ? styles.dotActive : ''}`}
                        style={{
                            '--i': index,
                            '--x': Math.cos((index / icons.length) * 2 * Math.PI),
                            '--y': Math.sin((index / icons.length) * 2 * Math.PI),
                        }}
                    >
                        {index <= currentIndex && (
                            <IonIcon icon={icon} />
                        )}
                    </span>
                ))}
            </div>
            <div className={`${styles.close} ${active ? styles.closeActive : ''}`}>
                <IonIcon icon="close-outline" />
            </div>
        </div>
    );
}

export default DotMenu;
