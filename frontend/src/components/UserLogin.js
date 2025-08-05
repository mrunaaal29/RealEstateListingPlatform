import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.data.user) {
        const user = response.data.user;
        const { id, role } = user;

        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', id);
        localStorage.setItem('role', role);

        if (role === 'owner') {
          localStorage.setItem('ownerId', id); // specifically for AddListing.js
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
    }
  };

  return (
    <div className="container">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
