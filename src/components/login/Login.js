import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import styles from './Login.module.css';
import Navbar from '../navbar/Navbar';
import loginBackgroundImage from '../../assets/login/login.jpg';
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
            if (redirect === 'games') {
                navigate('/profile');
            } else {
                navigate('/profile');
            }
        } catch (error) {
            if (!error?.originalStatus) {
                setErrorMessage(t('login.noResponse'));  // Aizvietots ar tulkoto tekstu
            } else if (error.originalStatus === 400) {
                setErrorMessage(t('login.missingEmailOrPassword'));  // Aizvietots ar tulkoto tekstu
            } else if (error.originalStatus === 401) {
                setErrorMessage(t('login.unauthorized'));  // Aizvietots ar tulkoto tekstu
            } else {
                setErrorMessage(t('login.loginFailed'));  // Aizvietots ar tulkoto tekstu
            }
            errRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleUserInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    return (
        <div className={styles['login-container']}>
            <Navbar />
            <div className={styles['background-container']}>
                <img
                    src={loginBackgroundImage}
                    alt={t('login.backgroundAlt')}  // Aizvietots ar tulkoto tekstu
                    className={styles['background-image']}
                />
            </div>
            <form className={styles['login-form']} onSubmit={handleSubmit}>
                <h2 className={styles['form-title']}>{t('login.formTitle')}</h2>  {/* Aizvietots ar tulkoto tekstu */}
                <div className={styles['form-group']}>
                    <input
                        type="email"
                        placeholder={t('login.emailPlaceholder')}  // Aizvietots ar tulkoto tekstu
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className={styles['form-group']}>
                    <input
                        type="password"
                        placeholder={t('login.passwordPlaceholder')}  // Aizvietots ar tulkoto tekstu
                        value={password}
                        onChange={handlePasswordInput}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={styles['login-btn']}
                    disabled={isLoading}
                >
                    {isLoading ? t('login.loggingIn') : t('login.login')}  {/* Aizvietots ar tulkoto tekstu */}
                </button>
                {errorMessage && (
                    <p ref={errRef} className={styles['error']} aria-live="assertive">
                        {errorMessage}  {/* Kļūdas ziņojums paliek dinamisks */}
                    </p>
                )}
            </form>
            <div className={styles['register-link']}>
                <p>
                    {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>  {/* Aizvietots ar tulkoto tekstu */}
                </p>
            </div>
        </div>
    );
};

export default Login;
