import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsLoggedIn, logoutUser } from '../../features/auth/authSlice';
import { useTranslation } from 'react-i18next';
import userIcon from '../../assets/profilePhoto/userIcon.png'; // Pievienojiet ceļu uz ikonas attēlu
import LanguageSelector from '../languageSelector/LanguageSelector'; // Pievienots importētājs

const Navbar = () => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("isLoggedIn"); // Remove isLoggedIn flag on logout
    navigate('/login');
  };

  return (
      <nav className="navbar">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'navbar-item active' : 'navbar-item')}
            >
              {t('navbar.home')}
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
                to="/games"
                className={({ isActive }) => (isActive ? 'navbar-item active' : 'navbar-item')}
            >
              {t('navbar.games')}
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'navbar-item active' : 'navbar-item')}
            >
              {t('navbar.about')}
            </NavLink>
          </li>
          {!isLoggedIn ? (
              <li className="navbar-item">
                <NavLink
                    to="/login?redirect=games"
                    className={({ isActive }) => (isActive ? 'navbar-item active' : 'navbar-item')}
                >
                  {t('navbar.login')}
                </NavLink>
              </li>
          ) : (
              <>
                <li className="navbar-item user-icon-container">
                  <NavLink to="/profile" className="navbar-item">
                    <img
                        src={userIcon}
                        alt="User Icon"
                        className="user-icon"
                    />
                    <span className="user-text">{user?.firstName}</span> {/* Pievienots lietotāja vārds */}
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <button
                      className="logout-button"
                      onClick={handleLogout}
                  >
                    {t('navbar.logout')}
                  </button>
                </li>
              </>
          )}
        </ul>
        <div className="languageSelector">
          <LanguageSelector />
        </div>
      </nav>
  );
};

export default Navbar;
