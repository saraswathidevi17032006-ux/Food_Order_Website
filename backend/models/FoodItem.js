import mongoose from 'mongoose';

const foodItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
    },
    isVegetarian: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
