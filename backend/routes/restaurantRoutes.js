import express from 'express';
import Restaurant from '../models/Restaurant.js';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

// @desc    Fetch all restaurants
// @route   GET /api/restaurants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const restaurants = await Restaurant.find({ ...keyword });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch single restaurant with its menu
// @route   GET /api/restaurants/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      const menu = await FoodItem.find({ restaurant: restaurant._id });
      res.json({ restaurant, menu });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
