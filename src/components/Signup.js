import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  
  // Indian cities for warehouse location
  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
    department: '',
    phoneNumber: '',
    warehouseLocation: 'Mumbai'
  });
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      setMessageType('error');
      return;
    }
    
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long!');
      setMessageType('error');
      return;
    }
    
    if (formData.phoneNumber.length !== 10) {
      setMessage('Phone number must be exactly 10 digits!');
      setMessageType('error');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      console.log('Sending signup request with data:', formData);
      
      const response = await axios.post(
        'http://localhost:8080/api/auth/signup',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Signup response:', response.data);
      
      setMessage(response.data);
      setMessageType('success');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('Signup error:', error);
      
      let errorMessage = 'Signup failed. Please try again.';
      
      if (error.response) {
        // Server responded with error
        console.error('Error response:', error.response);
        errorMessage = error.response.data || errorMessage;
      } else if (error.request) {
        // Request was made but no response
        console.error('No response received:', error.request);
        errorMessage = 'Cannot connect to server. Please check if backend is running.';
      } else {
        // Something else happened
        console.error('Error:', error.message);
        errorMessage = error.message;
      }
      
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      
      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

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
            minLength="6"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
            placeholder="Re-enter your password"
          />
        </div>

        <div className="form-group">
          <label>Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="form-group">
          <label>Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="e.g., Sales, IT, Logistics"
          />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="10-digit phone number"
          />
        </div>

        <div className="form-group">
          <label>Warehouse Location *</label>
          <select
            name="warehouseLocation"
            value={formData.warehouseLocation}
            onChange={handleChange}
            required
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
        
      <p className="link-text">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default Signup;