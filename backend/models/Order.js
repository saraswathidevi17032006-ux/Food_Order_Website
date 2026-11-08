import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'FoodItem',
        },
      },
    ],
    itemsPrice: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      default: 'Placed',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
