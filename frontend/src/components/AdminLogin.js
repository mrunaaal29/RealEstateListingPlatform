import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password
      });

      // Axios only enters this block on 2xx status
      if (res.status === 200 && res.data.admin) {
        alert(res.data.message); // "Admin login successful"
        onLogin(res.data.admin); // Pass admin data to parent
      } else {
        alert('Unexpected response from server.');
      }

    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Invalid credentials!!');
      } else {
        console.error('Login Error:', err);
        alert('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h3 className="mb-3">Admin Login</h3>

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          className="form-control"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}

export default AdminLogin;
