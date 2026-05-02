import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('Password reset code sent to your email.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send reset code');
    }
  };

  return (
    <div className="auth">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Code</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;