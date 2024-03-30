import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Customers from "./components/Customers/Customers";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Login from "./pages/customers/Login";
import Register from "./pages/customers/Register";
import CustomerProfile from "./pages/customers/CustomerProfile";
import LuckyWheel from "./components/LoyaltyPoints/LuckyWheel";
import LoyaltyPointPage from "./components/LoyaltyPoints/LoyaltyPointsPage";
import LP_admin from "./components/LoyaltyPoints/LP_admin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/LuckyWheel" element={<LuckyWheel />} />
                <Route
                    path="/LoyaltyPointsPage"
                    element={<LoyaltyPointPage />}
                />

                <Route path="/LoyaltyRewordManagement" element={<LP_admin />} />
                <Route path="/customers/login" element={<Login />} />

                <Route path="/customers/register" element={<Register />} />
                <Route
                    path="/customers/profile/:customerId"
                    element={<CustomerProfile />}
                />
                <Route path="/admin/login" element={<AdminLogin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
