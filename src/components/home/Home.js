import React, { useEffect } from "react";
import styles from "./home.module.css"; // Import CSS module
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation(); // Translation function

    useEffect(() => {
        document.body.style.overflow = "hidden";

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = "visible";
        };
    }, []);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.card}>
                <div className={styles.image_box}></div>
                <div className={styles.content}>
                    {/* Content goes here */}
                </div>
            </div>
        </div>
    );
};

export default Home;
