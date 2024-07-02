import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import styles from "./Login.module.css";
import Navbar from "../navbar/Navbar";
import loginBackgroundImage from "../../assets/desk-office.jpg";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...userData, email }));
            setEmail("");
            setPassword("");
            navigate("/profile");
        } catch (error) {
            if (!error?.originalStatus) {
                setErrorMessage("Wrong email or password");
            } else if (error.originalStatus === 400) {
                setErrorMessage("Missing Email or Password");
            } else if (error.originalStatus === 401) {
                setErrorMessage("Unauthorized");
            } else {
                setErrorMessage("Login Failed");
            }
            errRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleUserInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className={styles["login-container"]}>
            <Navbar />
            <div className={styles["background-container"]}>
                <img
                    src={loginBackgroundImage}
                    alt="Background"
                    className={styles["background-image"]}
                />
            </div>
            <form className={styles["login-form"]} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className={styles["form-group"]}>
                    <input
                        type="text"
                        placeholder="Email"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className={styles["form-group"]}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordInput}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={styles["login-btn"]}
                    disabled={isLoading}
                >
                    Login
                </button>
                {errorMessage && (
                    <p ref={errRef} className={styles["error"]} style={{ color: "red" }} aria-live="assertive">
                        {errorMessage}
                    </p>
                )}
            </form>
            <div className={styles["register-link"]}>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );

    return content;
};

export default Login;
