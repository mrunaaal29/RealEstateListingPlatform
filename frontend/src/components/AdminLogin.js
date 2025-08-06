import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css'; // Make sure this path is correct

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password
      });

      if (res.status === 200 && res.data.admin) {
        onLogin(res.data.admin);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg('Unexpected response from server.');
      }

    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMsg('Invalid username or password!');
      } else {
        console.error('Login Error:', err);
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
  <h2>Admin Login</h2>
  <input
    type="text"
    placeholder="Enter your username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button onClick={handleLogin} disabled={loading}>
    {loading ? 'Logging in...' : 'Login'}
  </button>
</div>

  );
}

export default AdminLogin;
