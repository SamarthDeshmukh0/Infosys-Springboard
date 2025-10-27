import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        formData
      );
      
      const { message, role, fullName, email } = response.data;
      
      if (message === 'Login successful') {
        // Store user info in localStorage
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', email);
        
        setMessage('Login successful! Redirecting...');
        setMessageType('success');
        
        // Redirect based on role
        setTimeout(() => {
          if (role === 'Admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard');
          }
        }, 1500);
      }
      
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
      setMessageType('error');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      
      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
      
      <p className="link-text">
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

export default Login;