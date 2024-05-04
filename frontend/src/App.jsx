import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Customers from "./components/Customers/Customers";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Faq from "./components/Faq/Faq";
import Rvw from "./components/Rvw/Rvw";
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
  
  const queryClient = new QueryClient();

  return ( 
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/faq" element={<Faq/>} />
        <Route path="/rvw" element={<Rvw/>} />
        


      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
