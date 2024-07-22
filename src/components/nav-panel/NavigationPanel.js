import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navigationPanel.module.css"; // Import styles as CSS module
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons"; // Import menu icons
import logo from '../../assets/logo/logo.png'; // Import your logo image
import kidventure from "../../assets/logo/kidLogoCopy-Photoroom.png"; // Import your kidventure logo image
import navBg from "../../assets/logo/vol.png"; // Import the image to be used as a full-width element
import puffBg from "../../assets/logo/puff.png"; // Import puff background image
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsLoggedIn, logoutUser } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../languageSelector/LanguageSelector';

function NavigationPanel() {
    const [click, setClick] = useState(false);
    const { t } = useTranslation();
    const user = useSelector(selectCurrentUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.removeItem("isLoggedIn");
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <img src={navBg} alt="Background" className={styles.navBg} />
                <img src={puffBg} alt="Puff Background" className={styles.puffBg} />

                <NavLink exact to="/" className={styles.kidLogo}>
                    <img src={kidventure} alt="Kidv3nturaky Logo2" className={styles.kidventure} />
                </NavLink>
                <NavLink exact to="/" className={styles.navLogo}>
                    <img src={logo} alt="Kidv3nturaky Logo" className={styles.logo} />
                </NavLink>

                <ul className={click ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
                    <li className={styles.navItem}>
                        <NavLink
                            exact
                            to="/"
                            activeClassName={styles.active}
                            className={styles.navLinks}
                            onClick={handleClick}
                        >
                            {t('Home')}
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            exact
                            to="/games"
                            activeClassName={styles.active}
                            className={styles.navLinks}
                            onClick={handleClick}
                        >
                            {t('Games')}
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            exact
                            to="/about"
                            activeClassName={styles.active}
                            className={styles.navLinks}
                            onClick={handleClick}
                        >
                            {t('About')}
                        </NavLink>
                    </li>
                    <li className={styles.navItem}>
                        <NavLink
                            exact
                            to={isLoggedIn ? "#" : "/login"}
                            activeClassName={styles.active}
                            className={styles.navLinks}
                            onClick={isLoggedIn ? handleLogout : handleClick}
                        >
                            {isLoggedIn ? t('Logout') : t('Login')}
                        </NavLink>
                    </li>
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

                {/* Language Selector */}
                <LanguageSelector />
            </div>
        </nav>
    );
}

export default NavigationPanel;
