import mongoose from "mongoose";



const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming productId is of type ObjectId
    required: true,
  },
  // Add any other fields you need for the cart item
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
