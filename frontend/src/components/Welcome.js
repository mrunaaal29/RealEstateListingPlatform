// src/components/Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Real Estate Listing Platform</h1>
      <p>Your one-stop destination to buy, sell, or browse real estate listings.</p>
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/register')} style={{ margin: '10px', padding: '10px 20px' }}>Register</button>
        <button onClick={() => navigate('/login')} style={{ margin: '10px', padding: '10px 20px' }}>User Login</button>
        <button onClick={() => navigate('/admin/login')} style={{ margin: '10px', padding: '10px 20px' }}>Admin</button>
      </div>
    </div>
  );
};

export default Welcome;
