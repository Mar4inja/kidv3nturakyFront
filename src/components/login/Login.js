import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import styles from './login.module.css';
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
            // Izsauc login funkciju un iegūst lietotāja datus
            const userData = await login({ email, password }).unwrap();
            dispatch(setCredentials(userData));
            setEmail("");
            setPassword("");
            localStorage.setItem("isLoggedIn", "true");

            const redirect = new URLSearchParams(location.search).get('redirect');
            navigate(redirect === 'games' ? '/profile' : '/profile');

        } catch (error) {
            console.log("Error details:", error);  // Pārbaudiet, vai `error` satur `status` un `data`

            // Iegūstiet kļūdas ziņojumu no `error.data`
            const errorMessage = error?.data?.message || t('login.defaultError');  // Iegūstiet kļūdas ziņojumu no `error.data.message` vai tulkojiet kļūdu ziņojumu

            if (error?.status === 401) {
                // Apstrādā servera atbildes ziņojumus
                switch (errorMessage) {
                    case "Email is incorrect.":
                        setErrorMessage(t('login.emailIncorrect'));  // **401** kļūda: "Email is incorrect."
                        break;
                    case "Password is incorrect.":
                        setErrorMessage(t('login.passwordIncorrect'));  // **401** kļūda: "Password is incorrect."
                        break;
                    case "Email confirmation was not completed.":
                        setErrorMessage(t('login.emailNotConfirmed'));  // **401** kļūda: "Email confirmation was not completed."
                        break;
                    default:
                        setErrorMessage(t('login.wrongEmailOrPassword'));  // Ja citi **401** kļūdu scenāriji
                }
            } else if (error?.status === 500) {
                setErrorMessage(t('login.serverError'));  // **500** kļūda: "Server error, please try again later."
            } else if (!error?.status) {
                setErrorMessage(t('login.noResponse'));  // Ja nav atbildes no servera
            } else {
                setErrorMessage(t('login.loginFailed'));  // Citas kļūdas: "Login failed, please try again."
            }
            errRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleUserInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    return (
        <div className={styles['login-container']}>
            <div className={styles['background-container']}>
                <img
                    src={loginBackgroundImage}
                    alt={t('login.backgroundAlt')}
                    className={styles['background-image']}
                />
            </div>
            <form className={styles['login-form']} onSubmit={handleSubmit}>
                <h2 className={styles['form-title']}>{t('login.formTitle')}</h2>
                <div className={styles['form-group']}>
                    <input
                        type="email"
                        placeholder={t('login.emailPlaceholder')}
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className={styles['form-group']}>
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
                    className={styles['login-btn']}
                    disabled={isLoading}
                >
                    {isLoading ? t('login.loggingIn') : t('login.login')}
                </button>
                {errorMessage && (
                    <p ref={errRef} className={styles['error']} aria-live="assertive">
                        {errorMessage}
                    </p>
                )}
            </form>
            <div className={styles['register-link']}>
                <p>
                    {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
