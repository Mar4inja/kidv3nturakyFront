import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './authSlice'; // Ensure correct path
import NavigationPanel from "../../components/navigationPanel/NavigationPanel";

const RequireAuth = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const location = useLocation();

    return isLoggedIn ? (
        <>
            <NavigationPanel />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
