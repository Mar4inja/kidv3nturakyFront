import React from "react";
import "./Services.css"
import Navbar from "../../components/navbar/Navbar";
import backgroundImage from "../../assets/joanna-kosinska-1_CMoFsPfso-unsplash.jpg";

const Services = () => {

    return (
        <div className="services-container">
        <Navbar />
        <h1 className="service">SERVICES</h1>
        <div className="background-container">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
      </div>
        <h1>SERVICES</h1>
   </div>
  
    )
}

export default Services;