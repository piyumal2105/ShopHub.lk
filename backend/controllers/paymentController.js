import Payment from "../models/Payment.js";

const paymentController = {
  makePayment: async (req, res) => {
    try {
      // Extract payment data from request body
      const { orderId, amount, paymentMethod } = req.body;
      
      // Create new payment record
      const newPayment = new Payment({
        orderId,
        amount,
        paymentMethod
      });

      // Save payment record to the database
      await newPayment.save();

      // Send success response
      res.status(201).json({ message: "Payment successful" });
    } catch (error) {
      // Send error response
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default paymentController;
