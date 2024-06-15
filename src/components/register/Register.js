import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/registerSlice";
import styles from "./Register.module.css";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import registerBackgroundImage from "../../assets/desk-office.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.register);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className={styles["register-container"]}>
      <Navbar />
      <div className={styles["background-container"]}>
        <img
          src={registerBackgroundImage}
          alt="Background"
          className={styles["background-image"]}
        />
      </div>
      <form className={styles["register-form"]} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className={styles["form-group"]}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className={styles["register-btn"]}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className={styles["error"]}>{error}</p>}
      </form>
      <div className={styles["register-link"]}>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
