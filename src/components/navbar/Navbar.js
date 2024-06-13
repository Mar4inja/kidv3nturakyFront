import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext'; // Importējiet AuthContext

const Navbar = () => {
    const { isLoggedIn } = useContext(AuthContext); // Saņem autentifikācijas kontekstu

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item"><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li className="navbar-item"><NavLink to="/about" activeClassName="active">About</NavLink></li>
                {/* Parāda "Login" sadaļu tikai tad, ja lietotājs nav ielogojies */}
                {!isLoggedIn && <li className="navbar-item"><NavLink to="/login" activeClassName="active">Login</NavLink></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
