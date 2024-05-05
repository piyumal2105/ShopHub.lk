import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "react-query";
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
import MemberRegistration from "./pages/MemberRegistration";
import ManageMember from "./components/ManageMember/ManageMember";
import RequstedMember from "./components/ManageMember/RequstedMember";
import ShopMemberLogin from "./components/ShopMemberLogin/ShopMemberLogin";
import ShopMemberProfile from "./components/ShopMemberProfile/ShopMemberProfile";
import ShopMemberNavbar from "./components/ShopMemberNavbar/ShopMemberNavBar";
import Inventory from "./components/Inventory/Inventory";
import AllProducts from "./components/AllProducts/AllProducts";
import ContactUs from "./components/ContsctUs/ContsctUs";
import Aboutus from "./components/AboutUs/Aboutus";
import AdminShopLogin from "./components/AdminShopLogin/AdminShopLogin";
import InventoryCharts from "./components/InventoryCharts/InventoryCharts";
import Logins from "./components/Logins/logins";
import LuckyWheel from "./components/LoyaltyPoints/LuckyWheel";
import LoyaltyPointPage from "./components/LoyaltyPoints/LoyaltyPointsPage";
import LP_admin from "./components/LoyaltyPoints/LP_admin";
import Faq from "./components/Faq/Faq";
import Rvw from "./components/Rvw/Rvw";
import AllFaqs from "./components/Faq/Faquser.jsx";

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
          <Route path="/memberRegistration" element={<MemberRegistration />} />
          <Route path="/manageMember" element={<ManageMember />} />
          <Route path="/requestedMember" element={<RequstedMember />} />
          <Route path="/shopMember/login" element={<ShopMemberLogin />} />
          <Route path="/shopProfile/:id" element={<ShopMemberProfile />} />
          <Route path="/shopMemberNavbar" element={<ShopMemberNavbar />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/adminshoplogin" element={<AdminShopLogin />} />
          <Route path="/inventorycharts" element={<InventoryCharts />} />
          <Route path="/logins" element={<Logins />} />
          <Route path="/LuckyWheel" element={<LuckyWheel />} />
          <Route path="/LoyaltyPointsPage" element={<LoyaltyPointPage />} />
          <Route path="/LoyaltyRewordManagement" element={<LP_admin />} /><Route path="/faq" element={<Faq/>} />
        <Route path="/rvw" element={<Rvw/>} />
        <Route path="/faquser" element={<AllFaqs/>} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
