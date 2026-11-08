import express from 'express';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

// @desc    Fetch all food items (useful for search)
// @route   GET /api/food
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

    const category = req.query.category ? { category: req.query.category } : {};

    const foodItems = await FoodItem.find({ ...keyword, ...category }).populate('restaurant', 'name');
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch single food item
// @route   GET /api/food/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const foodItem = await FoodItem.findById(req.params.id).populate('restaurant', 'name location');
    if (foodItem) {
      res.json(foodItem);
    } else {
      res.status(404).json({ message: 'Food item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
