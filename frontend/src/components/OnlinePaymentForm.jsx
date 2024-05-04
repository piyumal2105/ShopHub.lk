import React, { useState } from "react";
import Header from "./Header/Header"; // Adjust the path as necessary
import Footer from "./Footer/Footer"; // Adjust the path as necessary
import "../components/OnlinePaymentForm.css"; // Import CSS file

const OnlinePaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    orderId: "", // Assuming orderId is fetched from elsewhere
    amount: "",
    paymentMethod: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/payment/makePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      });
      if (!response.ok) {
        throw new Error("Failed to make payment");
      }
      const data = await response.json();
      console.log(data.message);
      // Reset form data after successful payment
      setPaymentData({
        orderId: "",
        amount: "",
        paymentMethod: ""
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Header /> {/* Include the Header component */}
      <div className="payment-container">
        <h2>Online Payment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Payment Method:</label>
            <select
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>
          {/* Add more form fields as needed */}
          <button type="submit">Make Payment</button>
        </form>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default OnlinePaymentForm;
