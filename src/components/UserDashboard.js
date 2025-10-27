import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      navigate('/login');
      return;
    }
    
    if (userRole !== 'User') {
      navigate('/admin-dashboard');
      return;
    }

    // Fetch product summary
    fetchSummary();
  }, [navigate]);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/summary');
      setSummary(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Welcome, {userName}!</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Inventory Summary</h2>
      
      {summary && (
        <div className="summary-cards">
          <div className="summary-card">
            <h3>{summary.productCount}</h3>
            <p>Total Product Types</p>
          </div>
          
          <div className="summary-card">
            <h3>{summary.totalItems}</h3>
            <p>Total Items in Stock</p>
          </div>
          
          <div className="summary-card">
            <h3>₹{summary.totalPrice.toFixed(2)}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>
      )}

      {!summary && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          No data available.
        </p>
      )}
    </div>
  );
}

export default UserDashboard;