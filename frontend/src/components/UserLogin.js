import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/UserLogin.css'; // 👈 Make sure this CSS file exists

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.data.user) {
        const user = response.data.user;
        const { id, role } = user;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', id);
        localStorage.setItem('role', role);

        if (role === 'owner') {
          localStorage.setItem('ownerId', id);
          navigate('/owner/dashboard');
        } else if (role === 'buyer') {
          navigate('/buyer/dashboard');
        } else {
          setErrorMsg('Invalid user role');
        }
      } else {
        setErrorMsg('Login failed');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-container">
      <h2>User Login</h2>

      <form className="user-login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
