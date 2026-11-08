import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Order from './pages/Order';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/food/:id" element={<FoodDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </CartProvider>
  );
};

export default App;
