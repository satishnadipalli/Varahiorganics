import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ChevronRight, ShoppingCart } from 'lucide-react';
import "./Cart.css";

const ShoppingCartPopup = ({ setIsCartOpen }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent scrolling when the popup is open
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when the popup closes
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const handleBuyCartItems = () => {
    setIsCartOpen(false);
    localStorage.removeItem("buyproduct");
    navigate("/checkout");
  };

  const handleBasket = () => {
    setIsCartOpen(false);
    navigate("/basket");
  };

  const handleQuantityChange = (id, type) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        const updatedQuantity =
          type === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence className="motion-presence ">
      <motion.div
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
      />
      <motion.div
        className="cart-popup"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="cart-header">
          <h2>
            <ShoppingBag size={24} />
            Your Cart
          </h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="cart-items">
          {cartItems.length <= 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={64} />
              <p>Your cart is empty</p>
              <button className="start-shopping" onClick={() => setIsCartOpen(false)}>
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <motion.div
                className="cart-item"
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={
                    item.image && item.image[0]
                      ? "https://varahiorganics.onrender.com/" + item.image[0]
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.name}
                  className="item-image"
                  style={{ marginTop: "-13px" }}
                />
                <div className="item-details">
                  <h3 className="item-name" style={{ fontSize: "13px" }}>
                    {item.name}
                  </h3>
                  <div className="item-price">₹{item.price.toFixed(2)}</div>
                  <div className="item-quantity">
                    <button onClick={() => handleQuantityChange(item._id, "decrease")}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, "increase")}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
              </motion.div>
            ))
          )}
          <button
            className="start-shoppings mt-0 flex items-center m-auto bg-transparent text-black justify-center gap-2"
            onClick={() => {
              navigate("/store");
              setIsCartOpen(false);
            }}
          >
            <ShoppingCart color="black" size={30} /> Shop More
          </button>
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span className="price">₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <button className="view-basket" onClick={handleBasket}>
              View Basket
              <ChevronRight size={20} />
            </button>
            <button className="checkout" onClick={handleBuyCartItems}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ShoppingCartPopup;
