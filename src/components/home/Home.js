import React, { useEffect } from "react";
import styles from "./Home.module.css"; // Importējiet CSS moduli

import Navbar from "../navbar/Navbar";

import SlideCards from "../cards/SlideCards";

const Home = () => {
  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <div className={styles["home-container"]}>
      <Navbar />
      <SlideCards />
      <div className={styles["card"]}>
        <div className={styles["image_box"]}></div>
        <div className={styles["content"]}></div>
      </div>
    </div>
  );
};

export default Home;
