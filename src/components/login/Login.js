import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import styles from './login.module.css';
import loginBackgroundImage from '../../assets/login/a.jpg';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation(); // Hook for translation
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation(); // Hook for location
    const [login, { isLoading }] = useLoginMutation(); // Mutation hook for login
    const dispatch = useDispatch(); // Hook for dispatching actions

    useEffect(() => {
        userRef.current.focus(); // Focus on the email input field on mount
    }, []);

    useEffect(() => {
        setErrorMessage(""); // Reset error message when email or password changes
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const userData = await login({ email, password }).unwrap(); // Attempt login
            dispatch(setCredentials(userData)); // Store user data in the Redux store
            setEmail(""); // Clear email field
            setPassword(""); // Clear password field
            localStorage.setItem("isLoggedIn", "true"); // Set login status in local storage

            const redirect = new URLSearchParams(location.search).get('redirect'); // Check for redirect query param
            navigate(redirect === 'games' ? '/profile' : '/profile'); // Navigate to the appropriate page

        } catch (error) {
            console.log("Error details:", error); // Log error details

            const errorMessage = error?.data?.message || t('login.defaultError'); // Determine error message

            if (error?.status === 401) {
                switch (errorMessage) {
                    case "Email is incorrect.":
                        setErrorMessage(t('login.emailIncorrect')); // Set specific error message for incorrect email
                        break;
                    case "Password is incorrect.":
                        setErrorMessage(t('login.passwordIncorrect')); // Set specific error message for incorrect password
                        break;
                    case "Email confirmation was not completed.":
                        setErrorMessage(t('login.emailNotConfirmed')); // Set error message for unconfirmed email
                        break;
                    default:
                        setErrorMessage(t('login.wrongEmailOrPassword')); // Set general error message for wrong email or password
                }
            } else if (error?.status === 500) {
                setErrorMessage(t('login.serverError')); // Set error message for server error
            } else if (!error?.status) {
                setErrorMessage(t('login.noResponse')); // Set error message for no server response
            } else {
                setErrorMessage(t('login.loginFailed')); // Set general login failed error message
            }
            errRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to error message
        }
    };

    const handleUserInput = (e) => setEmail(e.target.value); // Handle email input changes
    const handlePasswordInput = (e) => setPassword(e.target.value); // Handle password input changes

    return (
        <div className={styles.loginContainer}>
            <div className={styles.backgroundContainer}>
                <img
                    src={loginBackgroundImage}
                    alt={t('login.backgroundAlt')} // Alt text for the background image
                    className={styles.backgroundImage}
                />
            </div>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>{t('login.formTitle')}</h2> {/* Form title */}
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        placeholder={t('login.emailPlaceholder')} // Placeholder text for email input
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder={t('login.passwordPlaceholder')} // Placeholder text for password input
                        value={password}
                        onChange={handlePasswordInput}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={styles.loginBtn}
                    disabled={isLoading} // Disable button when loading
                >
                    {isLoading ? t('login.loggingIn') : t('login.login')} {/* Button text */}
                </button>
                {errorMessage && (
                    <p ref={errRef} className={styles.error} aria-live="assertive">
                        {errorMessage} {/* Display error message */}
                    </p>
                )}
            </form>
            <div className={styles.registerLink}>
                <p>
                    {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link> {/* Link to registration page */}
                </p>
            </div>
        </div>
    );
};

export default Login;
