import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import FoodCard from '../components/FoodCard';
import './Restaurant.css';

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(data.restaurant);
        setMenu(data.menu);
      } catch (error) {
        console.error("Error fetching restaurant", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="container">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-page container">
      <div className="restaurant-banner glass-card">
        <div className="banner-img">
          <img src={restaurant.image} alt={restaurant.name} />
        </div>
        <div className="banner-info">
          <h1>{restaurant.name}</h1>
          <p className="categories-list">{restaurant.categories.join(' • ')}</p>
          <div className="meta-info">
            <div className="meta-item">
              <FaStar className="icon-star" />
              <span>{restaurant.rating} Rating</span>
            </div>
            <div className="meta-item">
              <FaMapMarkerAlt className="icon-primary" />
              <span>{restaurant.location}</span>
            </div>
            <div className="meta-item">
              <FaClock className="icon-primary" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-section">
        <h2>Menu</h2>
        {menu.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          <div className="grid foods-grid">
            {menu.map((food) => (
              <FoodCard key={food._id} food={{ ...food, restaurant }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
