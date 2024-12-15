
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BasketList from "./Pages/BasketList";
import SubHeader from "./components/Header/SubHeader";
import Header from "./components/Header/Header";
import ProductView from "./components/ProductView/ProductView";
import Footer from "./components/Footer/Footer";
import AboutUs from "./Pages/AboutUs";
import Admin from "./Pages/Admin";
import Dashboard from "./Dashboard/Dashboard";
import "./index.css"
import CheckoutPage from "./Pages/CheckoutPage";
import DeliveryDashboard from "./components/DeliveryDashboard/Delivery";


const App = () => {

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
  
return (
    <Router>
      <SubHeader/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<BasketList />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/delivery" element={<DeliveryDashboard order={dummyOrder} />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App