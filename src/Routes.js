import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import About from './pages/about_page/About';
import Profile from './pages/profile_page/Profile';
import Register from './components/register/Register';
import { useAuth } from './context/AuthContext';

export const MyRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      {isLoggedIn ? (
        <Route path="/profile" element={<Profile />} />
      ) : (
        <Route path="/profile" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};
