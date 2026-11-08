import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    location: { type: String, required: true },
    categories: [{ type: String, required: true }],
    deliveryTime: { type: String, required: true },
    deliveryFee: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
