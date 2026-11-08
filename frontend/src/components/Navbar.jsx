import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUtensils, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?keyword=${searchTerm}`);
    } else {
      navigate('/');
    }
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="navbar glass-card">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <FaUtensils className="logo-icon" />
          <span>BiteDash</span>
        </Link>

        <form onSubmit={submitHandler} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search food or restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </form>

        <nav className="navbar-links">
          <Link to="/cart" className="cart-link">
            <div className="cart-icon-wrapper">
              <FaShoppingCart className="cart-icon" />
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
