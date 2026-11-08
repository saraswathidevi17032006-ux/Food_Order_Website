import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import './Order.css';

const Order = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const deliveryFee = cartItems.length > 0 ? 5.00 : 0;
  const itemsPrice = getCartTotal();
  const grandTotal = itemsPrice + deliveryFee;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:5000/api/orders', {
        orderItems: cartItems,
        customer,
        itemsPrice,
        deliveryFee,
        totalPrice: grandTotal
      });

      setOrderId(data._id);
      setOrderSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="order-page container">
        <div className="success-card glass-card">
          <FaCheckCircle className="success-icon" />
          <h2>Order Confirmed!</h2>
          <p>Thank you for your order, {customer.name}.</p>
          <p className="order-id">Order ID: <strong>{orderId}</strong></p>
          <p>Your delicious food is being prepared and will be delivered to <em>{customer.address}</em> soon.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page container">
      <h1 className="page-title">Checkout</h1>
      
      <div className="order-layout">
        <div className="checkout-form-section">
          <form className="glass-card form-card" onSubmit={placeOrderHandler}>
            <h2>Delivery Details</h2>
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                className="input-field"
                value={customer.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                className="input-field"
                value={customer.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                className="input-field"
                value={customer.phone}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea 
                name="address" 
                className="input-field"
                rows="3"
                value={customer.address}
                onChange={handleChange}
                required 
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary place-order-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="glass-card summary-card">
            <h2>Order Summary</h2>
            <div className="order-items-list">
              {cartItems.map((item, index) => (
                <div key={index} className="order-item-mini">
                  <span>{item.qty} x {item.name}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
