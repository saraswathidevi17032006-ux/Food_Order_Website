import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';
import './Home.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const urlSuffix = keyword ? `?keyword=${keyword}` : '';
        const [restRes, foodRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/restaurants${urlSuffix}`),
          axios.get(`http://localhost:5000/api/food${urlSuffix}`)
        ]);
        setRestaurants(restRes.data);
        setFoods(foodRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keyword]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="home container">
      {!keyword && (
        <section className="hero-section glass-card">
          <div className="hero-content">
            <h1>Craving something?</h1>
            <p>Get the best food from top restaurants delivered to your door.</p>
            <button className="btn btn-primary" onClick={() => window.scrollTo(0, 500)}>Explore Now</button>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" alt="Delicious Food" />
          </div>
        </section>
      )}

      {keyword && (
        <h2 className="search-results-title">Search Results for "{keyword}"</h2>
      )}

      <section className="section">
        <h2 className="section-title">Popular Restaurants</h2>
        {restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <div className="grid restaurants-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2 className="section-title">Popular Food Items</h2>
        {foods.length === 0 ? (
          <p>No food items found.</p>
        ) : (
          <div className="grid foods-grid">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
