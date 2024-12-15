import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const ShoppingCartPopup = ({setIsCartOpen}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);


  const handleBuyCartItems = () =>{
    localStorage.removeItem("buyproduct");
    navigate("/checkout");
  }


  const handleBasket = () =>{
    navigate("/basket");
  }
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
    <>
      {/* Backdrop for semi-transparent overlay */}
      {isOpen && <div className="backdrop" onClick={() => setIsCartOpen(false)}></div>}

      <div className={`cart-popup ${isOpen ? "open" : ""}`}>
        <div className="cart-headers">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            &times;
          </button>
        </div>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={item.images[0] || "https://via.placeholder.com/50"}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <div className="item-quantity">
                  <button onClick={() => handleQuantityChange(item._id, "decrease")}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, "increase")}>
                    +
                  </button>
                </div>
              </div>
              <p className="item-price">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span className="price">₹{calculateSubtotal()}</span>
          </div>
          <button className="view-basket"  onClick={handleBasket}>View Basket</button>
          <button className="checkout" onClick={handleBuyCartItems}>Checkout</button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPopup;
