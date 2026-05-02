import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to La Prima</h1>
      <p>Your favorite restaurant for delicious meals.</p>
      <div className="home-content">
        <h2>Features</h2>
        <ul>
          <li>Browse our menu</li>
          <li>Place orders</li>
          <li>Track your orders</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;