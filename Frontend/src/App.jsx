import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import BasketList from "./Pages/BasketList";
import SubHeader from "./components/Header/SubHeader";
import Header from "./components/Header/Header";
import ProductView from "./components/ProductView/ProductView";
import Footer from "./components/Footer/Footer";
import AboutUs from "./Pages/AboutUs";
import Admin from "./Pages/Admin";
import Dashboard from "./Dashboard/Dashboard";
import "./index.css";
import CheckoutPage from "./Pages/CheckoutPage";
import DeliveryDashboard from "./components/DeliveryDashboard/Delivery";
import OrderList from "./components/OrderList/OrderList";
import FoodStore from "./Pages/FoodStore";
import Loading from "./components/Loading/Loading";
import LoginForm from "./Pages/AdminLogin";
import NotFound from "./Pages/NotFound";

const App = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // New state for admin login

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://varahiorganics.onrender.com/getproducts`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.products) {
          setHomeProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleAdminLogin = (isLoggedIn) => {
    setIsAdminLoggedIn(isLoggedIn); // Update the login state
  };

  const dummyOrder = {
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zipCode: "62704",
        country: "USA",
      },
    },
    products: [
      {
        productId: "64bdfc94789d6a001b1c23a8",
        quantity: 2,
        price: 19.99,
      },
      {
        productId: "64bdfc94789d6a001b1c23a9",
        quantity: 1,
        price: 49.99,
      },
    ],
    orderNotes: "Please deliver between 10 AM and 2 PM.",
    totalAmount: 89.97,
    paymentStatus: "Pending",
    orderStatus: "Pending",
    paymentMethod: "UPI",
    orderDate: new Date(),
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
  };

  if (!homeProducts || homeProducts.length <= 0) {
    return <Loading height={"100vh"} />;
  }

  return (
    <Router>
      <SubHeader />
      <Header />
      <Routes>
        <Route path="/" element={<Home homeProducts={homeProducts} />} />
        <Route path="/basket" element={<BasketList />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/product/:id" element={<ProductView homeProducts={homeProducts}/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/store" element={<FoodStore />} />
        <Route path="/orderlist/:id" element={<DeliveryDashboard order={dummyOrder} />} />
        <Route path="adminlogin" element={<LoginForm handleAdminLogin={handleAdminLogin} />} />
        
        {/* Protected Admin Routes */}
        <Route
          path="/orderlist"
          element={isAdminLoggedIn ? <OrderList /> : <Navigate to="/adminlogin" />}
        />
        <Route
          path="/admin"
          element={isAdminLoggedIn ? <Admin /> : <Navigate to="/adminlogin" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
