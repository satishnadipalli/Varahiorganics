import React, { useState, useEffect } from "react";
import "./BasketList.css";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Bag } from "../../Heroicons";

const BasketList = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const navigate = useNavigate();


  const handleCheckout = () =>{
    localStorage.removeItem('buyproduct');
    navigate("/checkout");
  }

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 728);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulate loading cart items from localStorage (or API)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart); // Set cart items from localStorage
  }, []);


  
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  return (
    <>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <p>varahifoods / cart</p>
      </div>
      
      <div className="cart-page">
        <div className="cart-container">
          {/* Product Table */}
          {cartItems.length > 0 ? (
            // Render cart items if available
            !isMobile ? (
              <div className="cart-table">
                <table className="cart-items-table text-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="relative">
                        <td className="product-cell">
                          <div className="product-detailsss">
                            <img
                              src={"https://varahiorganics.onrender.com/"+item.image[0] }
                              // alt="Product"
                              className="product-images"
                            />
                            <span className="product-name">{item.name}</span>
                          </div>
                        </td>
                        <td className="price-cell">{item.price}</td>
                        <td className="quantity-cell">
                          <div className="item-quantity">
                            <button onClick={() => handleQuantityChange(item._id, "decrease")}>
                              <Minus size={16} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => handleQuantityChange(item._id, "increase")}>
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td>
                          {item.price}
                        </td>
                        <td className="subtotal-cell">
                          {item.subtotal}
                        </td>
                        <td>
                          <button className="remove-btns " onClick={() => handleRemoveItem(item._id)}>
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              // Render mobile view if available
              <div className="product-item">
                {cartItems.map((item, index) => (
                  <div key={index} className="product-info">
                    <img
                      src={"https://varahiorganics.onrender.com/"+item.image[0]}
                      alt="Product"
                      className="item-image"
                    />
                    <div className="product-details">
                      <h3 className="product-title">{item.name}</h3>
                      <div className="product-meta">
                        <div className="product-meta-row">
                          <p className="meta-label">Price</p>
                          <span className="meta-value">{item.price}</span>
                        </div>
                        <div className="product-meta-row">
                          <p className="meta-label">Quantity</p>
                          <div className="quantity-controls">
                            <button className="quantity-btn">-</button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button className="quantity-btn">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="remove-btn mt-8 mr-3" onClick={() => handleRemoveItem(item._id)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Render "empty cart" message if no products in the cart
            <div className="empty-cart-message shadow-none">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your Cart is Empty</h3>
              <p>It looks like you haven't added any products yet.</p>
              <button className="shop-now-button" onClick={() => (window.location.href = "/shop")}>
                Start Shopping
              </button>
            </div>

          )}

          {/* Basket Totals */}
          {cartItems.length > 0 && (
            <div className="basket-totalss min-w-[400px] bg-white">
              <h2 className="totals-heading">Basket Totals</h2>
              <div className="totals-row">
                <span className="label">Subtotal:</span>
                <span className="value">₹360.00</span>
              </div>
              <div className="totals-row">
                <span className="label">Shipping:</span>
                <span className="value">Flat rate: ₹110.00</span>
              </div>
              <p className="shipping-address text-left">
                Shipping to <b>Andhra Pradesh</b>.{" "}
              </p>
              <div className="totals-row total">
                <span className="label">Total:</span>
                <span className="value total-value">₹470.00</span>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BasketList;
