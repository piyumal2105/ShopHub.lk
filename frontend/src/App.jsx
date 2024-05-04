import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "./pages/LandingPage";
import Customers from "./components/Customers/Customers";
import AdminLogin from "./components/AdminLogin/AdminLogin";
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

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/admin/login" element={<AdminLogin />} />
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
