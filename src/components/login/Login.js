import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import styles from './login.module.css';
import loginBackgroundImage from '../../assets/login/a.jpg';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { t } = useTranslation();
    const userRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
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
            dispatch(setCredentials(userData));
            setEmail("");
            setPassword("");
            localStorage.setItem("isLoggedIn", "true");

            const redirect = new URLSearchParams(location.search).get('redirect');
            navigate(redirect === 'games' ? '/profile' : '/profile');

        } catch (error) {
            console.log("Error details:", error);

            const errorMessage = error?.data?.message || t('login.defaultError');

            if (error?.status === 401) {
                switch (errorMessage) {
                    case "Email is incorrect.":
                        setErrorMessage(t('login.emailIncorrect'));
                        break;
                    case "Password is incorrect.":
                        setErrorMessage(t('login.passwordIncorrect'));
                        break;
                    case "Email confirmation was not completed.":
                        setErrorMessage(t('login.emailNotConfirmed'));
                        break;
                    default:
                        setErrorMessage(t('login.wrongEmailOrPassword'));
                }
            } else if (error?.status === 500) {
                setErrorMessage(t('login.serverError'));
            } else if (!error?.status) {
                setErrorMessage(t('login.noResponse'));
            } else {
                setErrorMessage(t('login.loginFailed'));
            }
            errRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleUserInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.backgroundContainer}>
                <img
                    src={loginBackgroundImage}
                    alt={t('login.backgroundAlt')}
                    className={styles.backgroundImage}
                />
            </div>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>{t('login.formTitle')}</h2>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        placeholder={t('login.emailPlaceholder')}
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        placeholder={t('login.passwordPlaceholder')}
                        value={password}
                        onChange={handlePasswordInput}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={styles.loginBtn}
                    disabled={isLoading}
                >
                    {isLoading ? t('login.loggingIn') : t('login.login')}
                </button>
                {errorMessage && (
                    <p ref={errRef} className={styles.error} aria-live="assertive">
                        {errorMessage}
                    </p>
                )}
            </form>
            <div className={styles.registerLink}>
                <p>
                    {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
