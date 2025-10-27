import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
      navigate('/login');
      return;
    }
    
    if (userRole !== 'Admin') {
      navigate('/user-dashboard');
      return;
    }

    // Fetch products
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/all');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
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
    <div className="container" style={{ maxWidth: '1000px' }}>
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {userName}!</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Product Inventory</h2>
      
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          No products available.
        </p>
      )}
    </div>
  );
}

export default AdminDashboard;