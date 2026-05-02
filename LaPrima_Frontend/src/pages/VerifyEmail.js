import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const VerifyEmail = () => {
  const [formData, setFormData] = useState({
    email: '',
    code: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/verify-email', formData);
      localStorage.setItem('token', response.data.token);
      setMessage('Email verified successfully!');
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="auth">
      <h1>Verify Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Verification Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;