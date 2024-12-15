import React, { useState, useEffect } from "react";
import "./BasketList.css";
import { useNavigate } from "react-router-dom";

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
                <table className="cart-items-table">
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
                      <tr key={index}>
                        <td className="product-cell">
                          <div className="product-details">
                            <img
                              src={item.images[0] || "https://via.placeholder.com/80"}
                              alt="Product"
                              className="product-images"
                            />
                            <span className="product-name">{item.name}</span>
                          </div>
                        </td>
                        <td className="price-cell">{item.price}</td>
                        <td className="quantity-cell">
                          <div className="quantity-controls">
                            <button className="quantity-btn">-</button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button className="quantity-btn">+</button>
                          </div>
                        </td>
                        <td className="subtotal-cell">{item.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Coupon Section */}
                <div className="coupon-section">
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Enter coupon code"
                  />
                  <div className="coupon-buttons">
                    <button className="apply-coupon">Apply Coupon</button>
                    <button className="update-basket">Update Basket</button>
                  </div>
                </div>
              </div>
            ) : (
              // Render mobile view if available
              <div className="product-item">
                {cartItems.map((item, index) => (
                  <div key={index} className="product-info">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt="Product"
                      className="product-image"
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
                        <div className="product-meta-row">
                          <p className="meta-label">Subtotal</p>
                          <span className="meta-value subtotal">{item.subtotal}</span>
                        </div>
                      </div>
                    </div>
                    <button className="remove-item">✖</button>
                  </div>
                ))}
                <div className="coupon-section">
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Enter coupon code"
                  />
                  <div className="coupon-buttons">
                    <button className="apply-coupon">Apply Coupon</button>
                    <button className="update-basket">Update Basket</button>
                  </div>
                </div>
              </div>
            )
          ) : (
            // Render "empty cart" message if no products in the cart
            <div className="empty-cart-message">
              <h3>Your cart is empty!</h3>
              <p>Looks like you haven't added any products yet. Start shopping now!</p>
              <img
                src="https://via.placeholder.com/150" // Replace with an attractive image if needed
                alt="Empty Cart"
                className="empty-cart-image"
              />
              <button className="shop-now-button">Shop Now</button>
            </div>
          )}

          {/* Basket Totals */}
          {cartItems.length > 0 && (
            <div className="basket-totals">
              <h2 className="totals-heading">Basket Totals</h2>
              <div className="totals-row">
                <span className="label">Subtotal:</span>
                <span className="value">₹360.00</span>
              </div>
              <div className="totals-row">
                <span className="label">Shipping:</span>
                <span className="value">Flat rate: ₹110.00</span>
              </div>
              <p className="shipping-address">
                Shipping to <b>Rajamundry, Andhra Pradesh</b>.{" "}
                <a href="#" className="change-address-link">Change address</a>
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
