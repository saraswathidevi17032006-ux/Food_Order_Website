import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent link navigation if button is clicked
    addToCart(food, 1);
  };

  return (
    <Link to={`/food/${food._id}`} className="food-card glass-card">
      <div className="food-img-container">
        <img src={food.image} alt={food.name} />
        {food.isVegetarian && <div className="veg-badge">Veg</div>}
      </div>
      <div className="food-card-body">
        <h4 className="food-name">{food.name}</h4>
        <p className="food-restaurant">{food.restaurant?.name || 'Local Restaurant'}</p>
        <div className="food-footer">
          <span className="food-price">${food.price.toFixed(2)}</span>
          <button 
            className="btn-icon add-cart-btn" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
