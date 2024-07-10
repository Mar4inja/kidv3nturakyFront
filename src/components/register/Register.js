import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../features/register/RegisterSlice";
import styles from "./Register.module.css";
import Navbar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import registerBackgroundImage from "../../assets/login/login.jpg";
import { selectRegisterLoading, selectRegisterError } from "../../features/register/RegisterSlice";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, age, gender, email, password } = formData;

  const dispatch = useDispatch();
  const loading = useSelector(selectRegisterLoading);
  const error = useSelector(selectRegisterError);
  const navigate = useNavigate();

  useEffect(() => {
    // Notīrīt kļūdu, kad komponents tiek atvienots vai formData mainās
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((action) => {
      if (!action.error) {
        navigate("/login");
      }
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
              alt={t("login.backgroundAlt")}
              className={styles["background-image"]}
          />
        </div>
        <form className={styles["register-form"]} onSubmit={handleSubmit}>
          <h2>{t("register.formTitle")}</h2>
          <div className={styles["form-group"]}>
            <label htmlFor="firstName">{t("profile.firstName")}:</label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleChange}
                required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="lastName">{t("profile.lastName")}:</label>
            <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleChange}
                required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="age">{t("profile.age")}:</label>
            <input
                type="number"
                id="age"
                value={age}
                onChange={handleChange}
                required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="gender">{t("profile.gender")}:</label>
            <select
                id="gender"
                value={gender}
                onChange={handleChange}
                required
            >
              <option value="">{t("profile.gender")}</option>
              <option value="male">{t("profile.male")}</option>
              <option value="female">{t("profile.female")}</option>
            </select>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">{t("profile.email")}:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">{t("login.passwordPlaceholder")}:</label>
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
            {loading ? t("login.loggingIn") : t("register.formTitle")}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <div className={styles.registerLink}>
          <p>
            {t("login.noAccount")} <Link to="/login">{t("register.login")}</Link>
          </p>
        </div>
      </div>
  );
};

export default Register;
