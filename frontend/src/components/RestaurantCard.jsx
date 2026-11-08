import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="restaurant-card glass-card">
      <div className="img-container">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="time-badge">{restaurant.deliveryTime}</div>
      </div>
      <div className="card-body">
        <div className="card-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="rating">
            <FaStar className="star-icon" />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        <p className="categories">{restaurant.categories.join(', ')}</p>
        <div className="card-footer">
          <div className="location">
            <FaMapMarkerAlt />
            <span>{restaurant.location}</span>
          </div>
          <div className="fee">
            Delivery: ${restaurant.deliveryFee.toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
