import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order" // Assuming you have an Order model for orders
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Net Banking"], // Add more payment methods as needed
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending"
  },
  // Add more fields as needed
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
