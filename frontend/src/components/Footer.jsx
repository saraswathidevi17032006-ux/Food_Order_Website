import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} BiteDash. All rights reserved.</p>
        <p className="made-with">
          Made with <FaHeart className="heart-icon" /> for 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
