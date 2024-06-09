import React from "react";
import "./About.css"
import Navbar from "../../components/navbar/Navbar";
import backgroundImage from "../../assets/joanna-kosinska-1_CMoFsPfso-unsplash.jpg";


const About = () => {
  return (
    <div className="about-container">
         <Navbar />
         <h1 className="about-heading">ABOUT</h1>
         <div className="background-container">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
      </div>
      
    </div>
  );
};

export default About;
