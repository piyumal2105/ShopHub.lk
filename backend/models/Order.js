import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [String],
  totalAmount: Number,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
