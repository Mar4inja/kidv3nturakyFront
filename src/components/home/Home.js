import React, { useEffect } from "react";
import styles from "./Home.module.css"; // Importējiet CSS moduli

import Navbar from "../navbar/Navbar";
import SlideCards from "../cards/SlideCards";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();  // Tulkotāja funkcija

    useEffect(() => {
        document.body.style.overflow = "hidden";

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = "visible";
        };
    }, []);

    return (
        <div className={styles.homeContainer}>
            <Navbar />
            <SlideCards />
            <div className={styles.card}>
                <div className={styles.image_box}></div>
                <div className={styles.content}>
                    {/* Izmantojiet t, lai pievienotu tulkotu tekstu */}
                    <h1>{t('home.welcome')}</h1>
                    <p>{t('home.description')}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
