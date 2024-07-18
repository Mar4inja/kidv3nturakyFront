import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import About from "./pages/about_page/About";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Games from "./components/games/Games";
import { selectCurrentUser, selectIsLoggedIn } from "./features/auth/authSlice";
import Profile from "./pages/profile_page/Profile";
import { useTranslation } from 'react-i18next';
import Calculator from "./components/calculator/Calculator";

const MyRoutes = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { t } = useTranslation();

    return (
        <Router basename="/kidv3nturaky"> {/* Adjust basename as per your repo name */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:category/:ageGroup" element={<Games />} />
                <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />
                {!isLoggedIn && <Route path="*" element={<Login />} />}
            </Routes>
        </Router>
    );
};

export default MyRoutes;
