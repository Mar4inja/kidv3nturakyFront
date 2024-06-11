import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Jauns imports, kas iekļauj useNavigate
import styles from "./Login.module.css";
import Navbar from "../navbar/Navbar";
import loginBackgroundImage from "../../assets/desk-office.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Izmantojam useNavigate vietā useHistory

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Logging in with:", { username, password });
    // Pēc veiksmīgas pieteikšanās novirza uz profila lapu
    navigate("/profile");
  };

  return (
    <div className={styles["login-container"]}>
      <Navbar />
      <div className={styles["background-container"]}>
        <img
          src={loginBackgroundImage}
          alt="Background"
          className={styles["background-image"]}
        />
      </div>
      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className={styles["form-group"]}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles["login-btn"]}>
          Login
        </button>
      </form>
      <div className={styles["register-link"]}>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
