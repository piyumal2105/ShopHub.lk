import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider,QueryClient } from "react-query";
import LandingPage from "./pages/LandingPage";
import Customers from "./components/Customers/Customers";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Promotions from "./components/Promotions/Promotions";
import AdminPromotions from "./components/Promotions/AdminPromotions";
import AdminEvent from "./components/Events/AdminEvents";
import MyCalendar from "./components/Events/events";
import Login from "./pages/customers/Login";
import Register from "./pages/customers/Register";
import CustomerProfile from "./pages/customers/CustomerProfile";


function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/login" element={<Login />} />
        <Route path="/customers/register" element={<Register />} />
        <Route
          path="/customers/profile/:customerId"
          element={<CustomerProfile />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/adminpromotions" element={<AdminPromotions />} />
        <Route path="/adminevents" element={<AdminEvent />} />
        <Route path="/events" element={<MyCalendar />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
