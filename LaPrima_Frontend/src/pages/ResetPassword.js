import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    new_password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/reset-password', formData);
      setMessage('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="auth">
      <h1>Reset Password</h1>
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
          placeholder="Reset Code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={formData.new_password}
          onChange={handleChange}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;