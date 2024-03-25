import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Customers from "./components/Customers/Customers";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import LuckyWheel from "./components/LoyaltyPoints/LuckyWheel";
import LoyaltyPointPage from "./components/LoyaltyPoints/LoyaltyPointsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/Wheel" element={<LuckyWheel />} />
                <Route path="/Wheel1" element={<LoyaltyPointPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
