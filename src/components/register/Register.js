import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../features/register/registerSlice";
import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import registerBackgroundImage from "../../assets/login/a.jpg";
import { selectRegisterLoading, selectRegisterError } from "../../features/register/registerSlice";
import { useTranslation } from "react-i18next";

const Register = () => {
    const { t } = useTranslation(); // Initialize translation hook

    // State to hold form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: 0,
        gender: "",
        email: "",
        password: "",
    });

    const { firstName, lastName, age, gender, email, password } = formData;

    // Redux hooks
    const dispatch = useDispatch();
    const loading = useSelector(selectRegisterLoading);
    const error = useSelector(selectRegisterError);
    const navigate = useNavigate();

    // Clear error when component unmounts or formData changes
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData)).then((action) => {
            if (!action.error) {
                navigate("/login");
            }
        });
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.backgroundContainer}>
                <img
                    src={registerBackgroundImage}
                    alt={t("games.backgroundAlt")} // Translation for background alt text
                    className={styles.backgroundImage}
                />
            </div>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <h2>{t("register.formTitle")}</h2> {/* Form title */}
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">{t("register.firstName")}:</label> {/* First name label */}
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastName">{t("register.lastName")}:</label> {/* Last name label */}
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="age">{t("register.age")}:</label> {/* Age label */}
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="gender">{t("register.gender")}:</label> {/* Gender label */}
                    <select
                        id="gender"
                        value={gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">{t("register.selectGender")}</option>
                        <option value="male">{t("register.male")}</option>
                        <option value="female">{t("register.female")}</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">{t("register.email")}:</label> {/* Email label */}
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">{t("register.password")}:</label> {/* Password label */}
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
                    className={styles.registerBtn}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? t("register.registering") : t("register.register")}
                </button>
                {error && <p className={styles.error}>{t(`register.${error}`)}</p>} {/* Display error message */}
            </form>
            <div className={styles.registerLink}>
                <p>
                    {t("login.noAccount")} <Link to="/login">{t("login.register")}</Link> {/* Link to login */}
                </p>
            </div>
        </div>
    );
};

export default Register;
