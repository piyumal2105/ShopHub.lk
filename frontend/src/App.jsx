import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Customers from "./components/Customers/Customers";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
