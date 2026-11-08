import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus, FaArrowRight } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const deliveryFee = cartItems.length > 0 ? 5.00 : 0;
  const grandTotal = getCartTotal() + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container">
        <div className="empty-cart glass-card">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" />
          <h2>Your cart is empty!</h2>
          <p>Add some delicious food to your cart to checkout.</p>
          <Link to="/" className="btn btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="page-title">Your Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item.foodItem} className="cart-item glass-card">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <Link to={`/food/${item.foodItem}`}>
                  <h3>{item.name}</h3>
                </Link>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.foodItem, item.qty - 1)}><FaMinus /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(item.foodItem, item.qty + 1)}><FaPlus /></button>
                </div>
                <div className="item-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.foodItem)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-section">
          <div className="summary-card glass-card">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-primary checkout-btn" 
              onClick={() => navigate('/order')}
            >
              Proceed to Checkout <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
