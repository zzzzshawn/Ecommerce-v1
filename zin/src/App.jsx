import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./zin-frontend/components/ScrollToTop";
import UserAuthProvider from "./zin-frontend/context/UserAuthProvider";
import CartProvider from "./zin-frontend/context/CartContext";
import RootLayout from "./zin-frontend/_root/RootLayout";
import Home from "./zin-frontend/_root/pages/Home";
import ProductDetails from "./zin-frontend/components/ProductDetails";
import AllProducts from "./zin-frontend/_root/pages/AllProducts";
import FAQ from "./zin-frontend/components/FAQ";
import PrivacyPolicy from "./zin-frontend/components/PrivacyPolicy";
import ShippingReturnPolicy from "./zin-frontend/components/Shipping";
import TermsConditions from "./zin-frontend/components/Terms";
import About from "./zin-frontend/components/About";
import UserAuthLayout from "./zin-frontend/_auth/UserAuthLayout";
import UserLogin from "./zin-frontend/_auth/forms/UserLogin";
import UserSignup from "./zin-frontend/_auth/forms/UserSignup";
import Verification from "./zin-frontend/_auth/forms/Verification";
import AdminAuthProvider from "./zin-admin/context/AdminAuthProvider";
import AdminAuthLayout from "./zin-admin/_auth/AdminAuthLayout";
import AdminLogin from "./zin-admin/_auth/forms/AdminLogin";
import AdminSignUp from "./zin-admin/_auth/forms/AdminSignUp";
import AdminRootLayout from "./zin-admin/_root/AdminRootLayout";
import AdminDashboard from "./zin-admin/_root/pages/AdminDashboard";
import Product from "./zin-admin/_root/pages/Product";
import AddProducts from "./zin-admin/_root/pages/AddProducts";
import ProductList from "./zin-admin/components/ProductList";
import ProductProfile from "./zin-admin/_root/pages/ProductProfile";
import Users from "./zin-admin/_root/pages/Users";
import Admins from "./zin-admin/_root/pages/Admins";
import Configs from "./zin-admin/_root/pages/Configs";
import AddVariant from "./zin-admin/_root/pages/AddVariant";


function App() {
  return (
    <main className="min-h-screen min-w-screen bg-dark-2 text-light-2">
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          element={
            <UserAuthProvider>
              <CartProvider>
                <RootLayout />
              </CartProvider>
            </UserAuthProvider>
          }
        >
          <Route path="/" element={<Home   />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/shipping" element={<ShippingReturnPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route
          element={
            <UserAuthProvider>
              <CartProvider>
                <UserAuthLayout />
              </CartProvider>
            </UserAuthProvider>
          }
        >
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/verify" element={<Verification />} />
        </Route>

        {/* Admin Routes wrapped with AdminAuthProvider */}
        <Route
          element={
            <AdminAuthProvider>
              <AdminAuthLayout />
            </AdminAuthProvider>
          }
        >
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
        </Route>

        <Route
          element={
            <AdminAuthProvider>
              <AdminRootLayout />
            </AdminAuthProvider>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<Product />} />
          <Route path="/admin/addproducts" element={<AddProducts />} />
          <Route path="/admin/updateproducts" element={<ProductList />} />
          <Route path="/admin/deleteproducts" element={<ProductList />} />
          <Route path="/admin/productslist" element={<ProductProfile />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/admin-users" element={<Admins />} />
          <Route path="/admin/configs" element={<Configs />} />
          <Route path="/admin/addvariant" element={<AddVariant />} />
          <Route path="/admin/updatevariant" element={<AddVariant />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
