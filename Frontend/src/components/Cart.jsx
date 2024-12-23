import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ChevronRight, ShoppingCart } from 'lucide-react';
import "./Cart.css";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   images: string[];
// }

// interface ShoppingCartPopupProps {
//   setIsCartOpen: (isOpen: boolean) => void;
// }

const ShoppingCartPopup= ({ setIsCartOpen }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const handleBuyCartItems = () => {
    localStorage.removeItem("buyproduct");
    navigate("/checkout");
  };

  const handleBasket = () => {
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
    <AnimatePresence>
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
            {/* <span className="item-count">{cartItems.length}</span> */}
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
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  className="item-image"
                />
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
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

