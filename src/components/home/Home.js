import React, { useEffect } from "react";
import styles from "./home.module.css"; // Import CSS module


const Home = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = "visible";
        };
    }, []);

    return (
        <div className={styles.homeContainer}>
    
        </div>
    );
};

export default Home;
