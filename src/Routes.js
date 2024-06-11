import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/home/Home"; // Šeit esmu mainījis importēšanu uz defaulth
import Login from "./components/login/Login"; // Šeit esmu mainījis importēšanu uz defaulth
import About from './pages/about_page/About';
import Profile from './pages/profile_page/Profile';
import Register from './components/register/Register';
import AuthContext from './context/AuthContext';


export const MyRoutes = () => {
  const { isLoggedIn } = React.useContext(AuthContext); // Saņem autentifikācijas kontekstu

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        {/* Parāda maršrutu uz sadaļu "Profile" tikai tad, ja lietotājs ir ielogojies */}
        {isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          // Ja lietotājs nav ielogojies, novirza uz sākumlapu (Home)
          <Route path="/profile" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
};
