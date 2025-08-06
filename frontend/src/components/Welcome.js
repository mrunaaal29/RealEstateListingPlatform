import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Welcome.css';
import bg from '../assets/bg.jpg';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="welcome-page">
      <div
        className="welcome-container"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="welcome-overlay" />
        <div className="welcome-content">
          <h1>Welcome to Real Estate Listing Platform</h1>
          <p>Your one-stop destination to sell and browse real estate listings.</p>
          <div className="welcome-buttons">
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/login')}>User Login</button>
            <button onClick={() => navigate('/admin/login')}>Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
