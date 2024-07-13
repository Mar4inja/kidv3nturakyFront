// RequireAuth.jsx

import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../features/auth/authSlice';
import Navbar from '../navbar/Navbar';

const RequireAuth = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const location = useLocation();

    return isLoggedIn ? (
        <>
            <Navbar />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
