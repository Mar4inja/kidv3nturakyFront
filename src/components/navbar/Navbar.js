import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logoutUser } from '../../features/auth/authSlice';
import {useTranslation} from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("isLoggedIn"); // Remove isLoggedIn flag on logout
    navigate('/login'); // Redirect to login
  };

  return (
      <nav className="navbar">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'navbar-item active' : 'navbar-item')}>
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
          {!user ? (
              <li className="navbar-item">
                <NavLink
                    to="/login?redirect=games"  // Adding query param to redirect to games after login
                    className={({ isActive }) => (isActive ? 'navbar-item active' : 'navbar-item')}
                >
                  {t('navbar.login')}
                </NavLink>
              </li>
          ) : (
              <li className="navbar-item">
                <button className="logout-button" onClick={handleLogout}>
                  {t('navbar.logout')}
                </button>
              </li>
          )}
        </ul>
      </nav>
  );
};

export default Navbar;
