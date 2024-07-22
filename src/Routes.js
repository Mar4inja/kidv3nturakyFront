import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import About from "./components/about_page/About";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Games from "./components/games/Games";
import { selectIsLoggedIn } from "./features/auth/authSlice";
import Profile from "./components/profile_page/Profile";

const MyRoutes = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <Routes>
            {/* Define more specific routes first */}
            <Route path="/games/:category/:ageGroup" element={<Games />} />
            <Route path="/games" element={<Games />} />

            {/* Define protected routes */}
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login />} />

            {/* Define other routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />

            {/* Catch-all route for undefined paths */}
            <Route path="*" element={isLoggedIn ? <Home /> : <Login />} />
        </Routes>
    );
};

export default MyRoutes;
