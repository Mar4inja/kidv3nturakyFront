import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';
import Navbar from '../navbar/Navbar';
import loginBackgroundImage from '../../assets/desk-office.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        const accessToken = result.payload.accessToken; // Atjaunināt uz accessToken
        const refreshToken = result.payload.refreshToken; // Atjaunināt uz refreshToken

        // Saglabāt tokenus (piemēram, localStorage vai cookies)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Pieslēgties lietotājam (piemēram, izsaukt 'login' funkciju, lai iestatītu sesiju)
        login(); // Izmantojiet jūsu konteksta funkciju, lai iestatītu sesiju

        // Pārvietojiet lietotāju uz profila lapu
        navigate('/profile');
      }
    });
  };
  
  return (
    <div className={styles['login-container']}>
      <Navbar />
      <div className={styles['background-container']}>
        <img
          src={loginBackgroundImage}
          alt="Background"
          className={styles['background-image']}
        />
      </div>
      <form className={styles['login-form']} onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className={styles['form-group']}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles['login-btn']} disabled={loading}>
          Login
        </button>
        {error && <p className={styles['error']}>{error}</p>}
      </form>
      <div className={styles['register-link']}>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
