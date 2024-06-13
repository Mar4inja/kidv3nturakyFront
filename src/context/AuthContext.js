import React, { createContext, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../features/userSlice';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; // Pārliecinieties, ka eksportējat AuthContext
