import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [food, setFood] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/food/${id}`);
        setFood(data);
      } catch (error) {
        console.error("Error fetching food item", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(food, qty);
    navigate('/cart');
  };

  const increaseQty = () => {
    setQty(prev => prev + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!food) {
    return <div className="container">Food item not found</div>;
  }

  return (
    <div className="food-details-page container">
      <div className="food-details-card glass-card">
        <div className="food-image-section">
          <img src={food.image} alt={food.name} />
        </div>
        
        <div className="food-info-section">
          <div className="food-header">
            {food.isVegetarian && <span className="veg-label">Vegetarian</span>}
            <h1 className="food-title">{food.name}</h1>
            <p className="restaurant-name">By {food.restaurant?.name}</p>
          </div>
          
          <div className="food-price-large">
            ${food.price.toFixed(2)}
          </div>
          
          <div className="food-description">
            <h3>Description</h3>
            <p>{food.description}</p>
          </div>
          
          <div className="purchase-section">
            <div className="quantity-selector">
              <button className="qty-btn" onClick={decreaseQty}><FaMinus /></button>
              <span className="qty-display">{qty}</span>
              <button className="qty-btn" onClick={increaseQty}><FaPlus /></button>
            </div>
            
            <button className="btn btn-primary add-to-cart-large" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart - ${(food.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
