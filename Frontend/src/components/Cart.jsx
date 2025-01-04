import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';
import "./Cart.css";

const ShoppingCartPopup = ({ setIsCartOpen, setOpenCart, }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isBlinking, setIsBlinking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").reverse();
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    if (isBlinking) {
      const timer = setTimeout(() => {
        setIsBlinking(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isBlinking]);

  const handleBuyCartItems = () => {
    setIsCartOpen(false);
    setOpenCart(false)
    localStorage.removeItem("buyproduct");
    navigate("/checkout");
  };

  const handleBasket = () => {
    setIsCartOpen(false);
    setOpenCart(false)
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

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const blinkingAnimation = `
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    .blinking {
      animation: blink 0.5s ease-in-out 2;
    }
  `;

  return (
    <AnimatePresence className="motion-presence">
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
          <button className="close-btn" onClick={() =>{ 
            setIsCartOpen(false)
            setOpenCart(false)
          }}>
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
            cartItems.map((item, index) => (
              <motion.div
                className={`cart-item ${index === 0 && isBlinking ? 'blinking' : ''}`}
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={
                    item.image && item.image[0]
                      ? "http://localhost:3000/" + item.image[0]
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
                  <div className="item-price">₹{item.price?.toFixed(2)}</div>
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
                <div className="item-total">₹{(item.price * item.quantity)?.toFixed(2)}</div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))
          )}
          <button
            className="start-shoppings mt-0 flex items-center m-auto bg-transparent text-black justify-center gap-2"
            onClick={() => {
              navigate("/store")
              setOpenCart(false)
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
              <span className="price">₹{calculateSubtotal()?.toFixed(2)}</span>
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
      <style>{blinkingAnimation}</style>
    </AnimatePresence>
  );
};

export default ShoppingCartPopup;

