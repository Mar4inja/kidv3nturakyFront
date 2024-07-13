
import React, { useState } from 'react';
import styles from './dotMenu.module.css';
import { IonIcon } from '@ionic/react';
import { cameraOutline, diamondOutline, chatbubbleOutline, alarmOutline, gameControllerOutline, moonOutline, waterOutline, timeOutline, closeOutline } from 'ionicons/icons';

const DotMenu = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.main}>
            <div
                className={`${styles.navigation} ${isActive ? styles.active : ''}`}
                onClick={() => setIsActive(true)}
            >
        <span style={{ '--i': 0, '--x': -1, '--y': 0 }}>
          <IonIcon icon={cameraOutline} />
        </span>
                <span style={{ '--i': 1, '--x': 1, '--y': 0 }}>
          <IonIcon icon={diamondOutline} />
        </span>
                <span style={{ '--i': 2, '--x': 0, '--y': -1 }}>
          <IonIcon icon={chatbubbleOutline} />
        </span>
                <span style={{ '--i': 3, '--x': 0, '--y': 1 }}>
          <IonIcon icon={alarmOutline} />
        </span>
                <span style={{ '--i': 4, '--x': -1, '--y': 1 }}>
          <IonIcon icon={gameControllerOutline} />
        </span>
                <span style={{ '--i': 5, '--x': -1, '--y': -1 }}>
          <IonIcon icon={moonOutline} />
        </span>
                <span style={{ '--i': 6, '--x': 1, '--y': -1 }}>
          <IonIcon icon={waterOutline} />
        </span>
                <span style={{ '--i': 7, '--x': 1, '--y': 1 }}>
          <IonIcon icon={timeOutline} />
        </span>
            </div>
            <div
                className={`${styles.close} ${isActive ? styles.showClose : ''}`}
                onClick={() => setIsActive(false)}
            >
                <IonIcon icon={closeOutline} />
            </div>
        </div>
    );
};

export default DotMenu;
