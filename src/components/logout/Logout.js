import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const { t } = useTranslation(); // Pareizi izmantojam t, lai iegūtu tulkojumu

  const navigate = useNavigate();

  useEffect(() => {
    // Noņemam autorizācijas datus no vietējā krātuves
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isLoggedIn');

    // Pāradresējam lietotāju uz pieteikšanās lapu
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
