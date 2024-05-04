import mongoose from "mongoose";



const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming productId is of type ObjectId
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }

  // Add any other fields you need for the cart item
});

const CartItem = mongoose.model("onpickups", cartItemSchema);

export default CartItem;
