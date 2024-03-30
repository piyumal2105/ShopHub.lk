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
import Cart from "./components/Cart/Cart";
import {CartProvider} from "./components/Cart/CartContext.jsx";



function App() {
  const queryClient = new QueryClient();



  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
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
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      </CartProvider >
    </QueryClientProvider>
  );
}

export default App;
