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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/verify-email', formData);
      localStorage.setItem('token', response.data.token);
      setMessage('Email verified successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Verify Your Email</h1>
          <p className="auth-subtitle">Enter the verification code sent to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">Verification Code</label>
            <input
              id="code"
              type="text"
              name="code"
              placeholder="Enter 6-digit code"
              value={formData.code}
              onChange={handleChange}
              required
              maxLength="6"
              className="form-input code-input"
            />
            <p className="form-hint">Check your email for the verification code (valid for 15 minutes)</p>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        {message && <p className={`auth-message ${message.includes('failed') || message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}

        <div className="auth-footer">
          <p>Didn't receive the code? <span className="resend-link">Resend Code</span></p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
