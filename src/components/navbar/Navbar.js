import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item"><Link to="/">Home</Link></li>
                <li className="navbar-item"><Link to="/about">About</Link></li>
                <li className="navbar-item"><Link to="/services">Services</Link></li>
                <li className="navbar-item"><Link to="/contact">Contact</Link></li>
                <li className="navbar-item"><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}
 export default Navbar;