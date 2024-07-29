import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navigationPanel.module.css"; // Import styles as CSS module
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons"; // Import menu icons
import logo from '../../assets/logo/logo.png'; // Import logo
import kidventure from "../../assets/logo/kidLogoCopy-Photoroom.png"; // Import Kidventure logo
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectCurrentUser, logoutUser } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../languageSelector/LanguageSelector';
import { FaUser } from 'react-icons/fa'; // Import user icon

function NavigationPanel() {
    const [click, setClick] = useState(false);
    const { t } = useTranslation();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectCurrentUser); // Get current user data
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Current user:', user);
    }, [user]);

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("isLoggedIn");
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <NavLink exact to="/" className={styles.kidLogo}>
                    <img src={kidventure} alt="Kidventure Logo" className={styles.kidventure} />
                </NavLink>
                <NavLink exact to="/" className={styles.navLogo}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                </NavLink>

                <ul className={click ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
                    <li className={styles.navItem}>
                        <NavLink
                            exact
                            to="/"
                            className={styles.navLinks}
                            onClick={handleClick}
                        >
                            {t('navigationPanel.home')}
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            exact
                            to="/games"
                            className={styles.navLinks}
                            onClick={handleClick}
                        >
                            {t('navigationPanel.games')} {/* Changed from services to games */}
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            exact
                            to="/about"
                            className={styles.navLinks}
                            onClick={handleClick}
                        >
                            {t('navigationPanel.about')}
                        </NavLink>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li className={styles.navItem}>
                                <NavLink
                                    exact
                                    to="/profile"
                                    className={styles.navLinks}
                                    onClick={handleClick}
                                >
                                    <FaUser className={styles.userIcon} />
                                    <span className={styles.userName}>
                                        {user.firstName ? user.firstName.trim() : 'User'}
                                    </span>
                                </NavLink>
                            </li>
                            <li className={styles.navItem}>
                                <NavLink
                                    exact
                                    to="#"
                                    className={styles.navLinks}
                                    onClick={handleLogout}
                                >
                                    {t('navigationPanel.logout')}
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li className={styles.navItem}>
                            <NavLink
                                exact
                                to="/login"
                                className={styles.navLinks}
                                onClick={handleClick}
                            >
                                {t('navigationPanel.login')}
                            </NavLink>
                        </li>
                    )}
                </ul>

                <div className={styles.navIcon} onClick={handleClick}>
                    {click ? (
                        <span className={styles.icon}>
                            <HamburgetMenuClose />
                        </span>
                    ) : (
                        <span className={styles.icon}>
                            <HamburgetMenuOpen />
                        </span>
                    )}
                </div>

                <LanguageSelector />
            </div>
        </nav>
    );
}

export default NavigationPanel;
