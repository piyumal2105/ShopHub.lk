// controllers/orderController.js

import Order from "../models/Order.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, itemId, itemName, quantity, totalAmount } = req.body;

    const newOrder = new Order({
      user: userId,
      itemId,
      itemName,
      quantity,
      totalAmount
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { placeOrder };
