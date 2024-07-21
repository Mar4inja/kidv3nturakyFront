import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css'; // Import module styles
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsLoggedIn, logoutUser } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
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
            <NavLink
                to="/"
                className={({isActive}) => isActive ? `${styles.navbarItem} ${styles.active} ${styles.homeButton}` : `${styles.navbarItem} ${styles.homeButton}`}
            >
              <i className='bx bxs-home'></i>
            </NavLink>
            <NavLink
                to="/games"
                className={({isActive}) => isActive ? `${styles.navbarItem} ${styles.active} ${styles.joystickButton}` : `${styles.navbarItem} ${styles.joystickButton}`}
            >
              <i className='bx bx-joystick-alt'></i>
            </NavLink>
            <NavLink
                to="/about"
                className={({isActive}) => isActive ? `${styles.navbarItem} ${styles.active} ${styles.aboutButton}` : `${styles.navbarItem} ${styles.aboutButton}`}
            >
              <i className='bx bx-message-square'></i>
            </NavLink>
            {!isLoggedIn ? (
                <NavLink
                    to="/login?redirect=games"
                    className={({isActive}) => isActive ? `${styles.navbarItem} ${styles.active} ${styles.loginButton}` : `${styles.navbarItem} ${styles.loginButton}`}
                >
                  <i className='bx bxs-log-in'></i>
                </NavLink>
            ) : (
                <>
                  <NavLink
                      to="/profile"
                      className={({isActive}) => isActive ? `${styles.navbarItem} ${styles.active} ${styles.profileButton}` : `${styles.navbarItem} ${styles.profileButton}`}
                  >
                    <i className='bx bxs-user'></i>
                    <span className={styles.userText}>{user?.firstName}</span>
                  </NavLink>
                  <button
                      className={styles.logoutButton}
                      onClick={handleLogout}
                  >
                    <i className='bx bxs-log-out'></i>
                  </button>
                </>
            )}
            <LanguageSelector />
          </div>
        </nav>
      </div>
  );
};

export default Navbar;
