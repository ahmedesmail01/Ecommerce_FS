import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layout/AppLayout";
import CookieServices from "./services/CookieServices";
const App = () => {
  const token = CookieServices.get("jwt");
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Route>

        <Route path="/login" element={<LoginPage isAuthenticated={token} />} />
      </Routes>
    </>
  );
};

export default App;
