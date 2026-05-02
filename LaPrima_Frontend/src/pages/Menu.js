import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Hot drinks',
    money: '',
    orderNumber: '',
    status: 'Active',
    timeOrdered: ''
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/menu', newItem, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu();
      setNewItem({
        name: '',
        category: 'Hot drinks',
        money: '',
        orderNumber: '',
        status: 'Active',
        timeOrdered: ''
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="menu">
      <h1>Menu</h1>
      {token && (
        <form onSubmit={handleAddItem} className="add-item-form">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          >
            <option value="Hot drinks">Hot drinks</option>
            <option value="Cold drinks">Cold drinks</option>
            <option value="Fast food">Fast food</option>
            <option value="Chinese">Chinese</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={newItem.money}
            onChange={(e) => setNewItem({ ...newItem, money: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Order Number"
            value={newItem.orderNumber}
            onChange={(e) => setNewItem({ ...newItem, orderNumber: e.target.value })}
            required
          />
          <select
            value={newItem.status}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Sold Out">Sold Out</option>
          </select>
          <input
            type="text"
            placeholder="Time Ordered"
            value={newItem.timeOrdered}
            onChange={(e) => setNewItem({ ...newItem, timeOrdered: e.target.value })}
            required
          />
          <button type="submit">Add Item</button>
        </form>
      )}
      <div className="menu-items">
        {menuItems.map(item => (
          <div key={item._id} className="menu-item">
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Price: ${item.money}</p>
            <p>Status: {item.status}</p>
            {token && (
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;