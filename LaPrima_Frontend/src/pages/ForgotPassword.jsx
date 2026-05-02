import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('Password reset code sent to your email!');
      setTimeout(() => navigate('/reset-password'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send reset code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Reset Password</h1>
          <p className="auth-subtitle">Enter your email to receive a reset code</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>

        {message && <p className={`auth-message ${message.includes('Failed') || message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}

        <div className="auth-footer">
          <p><Link to="/login" className="auth-link">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
