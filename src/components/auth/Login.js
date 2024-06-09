import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../navbar/Navbar";

export const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    navigate('/profile'); // Redirect user to profile page after successful login
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  const handleInputChange = (e, setter, labelId) => {
    setter(e.target.value);
    const label = document.getElementById(labelId);
    if (e.target.value) {
      label.classList.add("active");
    } else {
      label.classList.remove("active");
    }
  };

  return (
    <div className="login-page container">
      <Navbar />
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-header">
            <h1>{isLogin ? "Login" : "Register"}</h1>
          </div>
          <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail, "email-label")}
                required
              />
              <label
                htmlFor="email"
                id="email-label"
                className={email ? "active" : ""}
              >
                Email
              </label>
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword, "password-label")}
                required
              />
              <label
                htmlFor="password"
                id="password-label"
                className={password ? "active" : ""}
              >
                Password
              </label>
            </div>
            {!isLogin && (
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => handleInputChange(e, setUsername, "username-label")}
                  required
                />
                <label
                  htmlFor="username"
                  id="username-label"
                  className={username ? "active" : ""}
                >
                  Username
                </label>
              </div>
            )}
            <button type="submit" className="submit-btn">
              {isLogin ? "Login" : "Register"}
            </button>
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span onClick={handleToggle}>
                {isLogin ? "Register" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
