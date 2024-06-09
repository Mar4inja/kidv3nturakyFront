import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";
import About from './pages/about_page/About';
import Contact from './pages/contact_page/Contact';
import Services from './pages/service_page/Services';
import Profile from './pages/profile_page/Profile';

export const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} /> {/* Pievienojiet šo maršrutu */}
      </Routes>
    </Router>
  );
};