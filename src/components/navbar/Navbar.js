import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css'; // Import module styles
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsLoggedIn, logoutUser } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import userIcon from '../../assets/profilePhoto/userIcon.png';
import LanguageSelector from '../languageSelector/LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsOpen(prev => !prev);
  };

  return (
      <div className={styles.navbarWrapper}>
        <button
            className={styles.toggleButton}
            onClick={toggleNavbar}
        >
          ☰
        </button>
        <nav className={`${styles.navbar} ${isOpen ? styles.open : styles.closed}`}>
          <div className={styles.navbarContent}>
            <ul className={styles.navbarMenuLeft}>
              <li className={styles.navbarItem}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? `${styles.navbarItem} ${styles.active}` : styles.navbarItem)}
                >
                  {t('navbar.home')}
                </NavLink>
              </li>
              <li className={styles.navbarItem}>
                <NavLink
                    to="/games"
                    className={({ isActive }) => (isActive ? `${styles.navbarItem} ${styles.active}` : styles.navbarItem)}
                >
                  {t('navbar.games')}
                </NavLink>
              </li>
            </ul>
            <ul className={styles.navbarMenuRight}>
              <li className={styles.navbarItem}>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? `${styles.navbarItem} ${styles.active}` : styles.navbarItem)}
                >
                  {t('navbar.about')}
                </NavLink>
              </li>
              {!isLoggedIn ? (
                  <li className={styles.navbarItem}>
                    <NavLink
                        to="/login?redirect=games"
                        className={({ isActive }) => (isActive ? `${styles.navbarItem} ${styles.active}` : styles.navbarItem)}
                    >
                      {t('navbar.login')}
                    </NavLink>
                  </li>
              ) : (
                  <>
                    <li className={`${styles.navbarItem} ${styles.userIconContainer}`}>
                      <NavLink to="/profile" className={styles.navbarItem}>
                        <img
                            src={userIcon}
                            alt="User Icon"
                            className={styles.userIcon}
                        />
                        <span className={styles.userText}>{user?.firstName}</span>
                      </NavLink>
                    </li>
                    <li className={styles.navbarItem}>
                      <button
                          className={styles.logoutButton}
                          onClick={handleLogout}
                      >
                        {t('navbar.logout')}
                      </button>
                    </li>
                  </>
              )}
              <li className={styles.navbarItem}>
                <LanguageSelector />
              </li>
            </ul>
          </div>
        </nav>
      </div>
  );
};

export default Navbar;
