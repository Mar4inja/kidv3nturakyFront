// Navbar.js

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { logoutUser } from '../../features/auth/authSlice';

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        {!user ? (
          <li className="navbar-item">
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
        ) : (
          <li className="navbar-item">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
