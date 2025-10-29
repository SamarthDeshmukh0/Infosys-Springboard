import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAdd = (product) => {
    const newCart = { ...cart };
    if (newCart[product.id]) {
      newCart[product.id].quantity += 1;
    } else {
      newCart[product.id] = { ...product, quantity: 1 };
    }
    setCart(newCart);
    calculateTotal(newCart);
  };

  const handleDelete = (product) => {
    const newCart = { ...cart };
    if (newCart[product.id] && newCart[product.id].quantity > 0) {
      newCart[product.id].quantity -= 1;
      if (newCart[product.id].quantity === 0) {
        delete newCart[product.id];
      }
    }
    setCart(newCart);
    calculateTotal(newCart);
  };

  const calculateTotal = (cartData) => {
    let total = 0;
    Object.values(cartData).forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalBill(total);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const goToInventory = () => {
    navigate('/inventory');
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h2>🛒 Smart Inventory System</h2>
        <div className="nav-actions">
          {(user.role === 'Admin' || user.role === 'Store Manager') && (
            <button className="btn btn-secondary" onClick={goToInventory}>
              Manage Inventory
            </button>
          )}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-message">
          <h1>Welcome, {user.fullName}! 👋</h1>
          <p>You have successfully logged in.</p>
        </div>

        <div className="products-section">
          <h2>Available Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/150'} 
                  alt={product.name}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <div className="product-actions">
                  <button className="btn btn-add" onClick={() => handleAdd(product)}>
                    Add
                  </button>
                  <button className="btn btn-delete" onClick={() => handleDelete(product)}>
                    Delete
                  </button>
                </div>
                {cart[product.id] && (
                  <p className="quantity">Quantity: {cart[product.id].quantity}</p>
                )}
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="no-products">No products available. Please add products from inventory.</p>
          )}
        </div>

        <div className="bill-section">
          <h2>Total Bill</h2>
          <div className="bill-amount">₹{totalBill.toFixed(2)}</div>
          {Object.keys(cart).length > 0 && (
            <div className="cart-items">
              <h3>Cart Items:</h3>
              {Object.values(cart).map((item) => (
                <div key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;