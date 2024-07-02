// Logout.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());
    navigate('/');
  }, [dispatch, navigate]);

  return null; // Render nothing, as this is just for logging out
};

export default Logout;
