import React from "react";
import "./Contact.css"
import Navbar from "../../components/navbar/Navbar";
import backgroundImage from "../../assets/joanna-kosinska-1_CMoFsPfso-unsplash.jpg";

const Contact = () => {
    return (
        <div className="contact-container">
         <Navbar />
         <h1 className="contact">CONTACT</h1>
         <div className="background-container">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
      </div>
    </div>
    )
}
export default Contact;