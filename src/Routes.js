import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import About from "./pages/about_page/About";
import Register from "./components/register/Register";
import Profile from "./pages/profile_page/Profile";
import Logout from "./components/logout/Logout"; // Import Logout component
import { selectCurrentUser } from "./features/auth/authSlice";

const MyRoutes = () => {
    const user = useSelector(selectCurrentUser);

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
            {/* Protected routes */}
            {user && <Route path="/profile" element={<Profile />} />}
        </Routes>
    );
};

export default MyRoutes; // Ensure MyRoutes is exported as default
