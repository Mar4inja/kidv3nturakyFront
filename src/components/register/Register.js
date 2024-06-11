import React, { useState } from 'react';
import styles from './Register.module.css';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import registerBackgroundImage from "../../assets/desk-office.jpg"


const Register = () => {
  // Define state variables for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [country, setCountry] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', { firstName, lastName, email, birthYear, country });
  };

  return (
    <div className={styles['register-container']}>
      <Navbar />
      <div className={styles["background-container"]}>
        <img
          src={registerBackgroundImage}
          alt="Background"
          className={styles["background-image"]} // Izmantojiet klases no CSS moduļa
        />
      </div>
      <form className={styles['register-form']} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className={styles['form-group']}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="birthYear">Birth Year:</label>
          <input
            type="text"
            id="birthYear"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles['register-btn']}>Register</button>
      </form>
      <div className={styles['register-link']}>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
