import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import Navbar from "../components/navbar/Navbar"; // Pievienojiet savu Navbar ceļu atkarībā no reālā projekta struktūras

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    return (
        token
        ? (
            <>
                <Navbar />
                <Outlet />
            </>
        )
        : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
