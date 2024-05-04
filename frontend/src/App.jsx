import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Customers from "./components/Customers/Customers";
import AdminLogin from "./components/AdminLogin/AdminLogin";
// import OnlinePaymentForm from "./components/OnlinePaymentForm"; // Import the OnlinePaymentForm component
// import OrderForm from "./components/OrderForm"; // Import the OrderForm component
import OnPickupRegistrationForm from "./components/OnPickupRegistration/OnPickupRegistrationForm";
import OnpickUpLandingPage from "./components/OnPickupLandingPage/OnpickUpLandingPage";
import OnPickupCart from "./components/OnPickupCart/OnPickupCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/onpickup/registration" element={<OnPickupRegistrationForm />} />
        {/* <Route path="/online-payment" element={<OnlinePaymentForm />} />  */}
        <Route path="/onpickuplandingpage" element={<OnpickUpLandingPage />} />
        {/* Add a route for the OrderForm */}
        {/* <Route path="/place-order" element={<OrderForm />} /> */}
        <Route path="/onpickupcart" element={<OnPickupCart/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
