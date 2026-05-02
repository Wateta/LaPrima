import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    orderNum: '',
    customer: '',
    item: '',
    money: '',
    status: 'Now',
    timeOrdered: ''
  });
  const token = localStorage.getItem('token');

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/orders', newOrder, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
      setNewOrder({
        orderNum: '',
        customer: '',
        item: '',
        money: '',
        status: 'Now',
        timeOrdered: ''
      });
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (!token) {
    return <div className="orders">Please login to view orders.</div>;
  }

  return (
    <div className="orders">
      <h1>Orders</h1>
      <form onSubmit={handleAddOrder} className="add-order-form">
        <input
          type="number"
          placeholder="Order Number"
          value={newOrder.orderNum}
          onChange={(e) => setNewOrder({ ...newOrder, orderNum: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Customer"
          value={newOrder.customer}
          onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Item"
          value={newOrder.item}
          onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newOrder.money}
          onChange={(e) => setNewOrder({ ...newOrder, money: e.target.value })}
          required
        />
        <select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option value="Now">Now</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
        </select>
        <input
          type="text"
          placeholder="Time Ordered"
          value={newOrder.timeOrdered}
          onChange={(e) => setNewOrder({ ...newOrder, timeOrdered: e.target.value })}
          required
        />
        <button type="submit">Add Order</button>
      </form>
      <div className="order-items">
        {orders.map(order => (
          <div key={order._id} className="order-item">
            <h3>Order #{order.orderNum}</h3>
            <p>Customer: {order.customer}</p>
            <p>Item: {order.item}</p>
            <p>Price: ${order.money}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => handleDelete(order._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;