import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/register/RegisterSlice";
import styles from "./Register.module.css";
import Navbar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom"; // Importējam useNavigate no react-router-dom
import registerBackgroundImage from "../../assets/desk-office.jpg";
import { selectRegisterLoading, selectRegisterError } from "../../features/register/RegisterSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    password: "",
  });

  const { firstName, lastName, age, gender,  email, password } = formData;

  const dispatch = useDispatch();
  const loading = useSelector(selectRegisterLoading);
  const error = useSelector(selectRegisterError);
  const navigate = useNavigate(); // Izmantojam useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then(() => {
      // Pēc veiksmīgas reģistrācijas veicam navigāciju uz ielogojuma lapu
      navigate("/login");
    });
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
          <label htmlFor="age">Age:</label>
          <input
              type="number"
              id="age"
              value={age}
              onChange={handleChange}
              required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="gender">Gender:</label>
          <select
              id="gender"
              value={gender}
              onChange={handleChange}
              required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
