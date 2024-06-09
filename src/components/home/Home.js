import React from "react";
import "./Home.css";
import backgroundImage from "../../assets/joanna-kosinska-1_CMoFsPfso-unsplash.jpg";
import Clock from "../clock/Clock";
import Navbar from "../navbar/Navbar";


export const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Clock />
      <div className="background-container">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
      </div>

      <div className="card">
        <div className="image_box"></div>
        <div className="content"></div>
      </div>
    </div>
  );
};
