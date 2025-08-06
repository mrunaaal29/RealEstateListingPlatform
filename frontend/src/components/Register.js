import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'; // Ensure this file is styled as discussed

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer',
    phone: '',
    address: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);

      if (response.status === 201) {
        setSuccessMsg('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="owner">Owner</option>
          <option value="buyer">Buyer</option>
        </select>

        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
