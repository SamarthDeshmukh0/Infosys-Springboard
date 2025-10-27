import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container home-container">
      <h1>🎉 Welcome!</h1>
      <p>
        Welcome to our User Management System. Please login or signup to continue.
      </p>
      
      <button onClick={() => navigate('/login')}>
        Login
      </button>
      
      <button 
        className="btn-secondary" 
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Home;