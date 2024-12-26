import React, { useEffect, useState } from "react";
import "./Home.css";
import ReviewsSection from "../components/ReviewSection";
import { ShoppingCart } from "lucide-react";
import ShoppingCartPopup from "../components/Cart";
import { Link } from "react-router-dom";
import PremiumResponsiveHero from "../components/HeroSection/HeroSection";
import Loading from "../components/Loading/Loading";

const Home = ({homeProducts}) => {
  

  const categories = [
    {
      image : "https://i0.wp.com/foodonfarmpickles.com/wp-content/uploads/2024/10/sweets-snacks-cover-psd.webp?w=1024&ssl=1"
    },
    {
      image : "https://i0.wp.com/foodonfarmpickles.com/wp-content/uploads/2024/07/nonveg-pickles-cover_.webp?w=1024&ssl=1"
    },
    {
      image : "https://i0.wp.com/foodonfarmpickles.com/wp-content/uploads/2024/07/Veg-pickles-cover.webp?w=1024&ssl=1"
    },
    {
      image : "https://i0.wp.com/foodonfarmpickles.com/wp-content/uploads/2024/07/Powders-masalas-cover_.webp?w=1024&ssl=1"
    }
  ]

  // console.log(process.env.REACT_APP_BACKEND_URL)




  const handleAddToCart = (product) => {
    // Retrieve current cart from local storage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex((item) => item._id === product._id);

    if (existingItemIndex >= 0) {
      // If the product exists, update its quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // If the product doesn't exist, add it with a quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optional: Provide feedback to the user
    alert(`${product.name} added to cart!`);
  };


  console.log(homeProducts)






  return (
    <div className="home-page">
      <PremiumResponsiveHero/>
      <section className="features-section">
        <div className="feature">
          <span>Home Delivery</span>
        </div>
        <div className="separator"></div>
        <div className="feature">
          <span>Email & WhatsApp Support</span>
        </div>
        <div className="separator"></div>
        <div className="feature">
          <span>Secure Payment</span>
        </div>
        <div className="separator"></div>
        <div className="feature">
          <span>Pure Authentic Flavors</span>
        </div>
      </section>

      {/* Shop By Category */}
      {/* <section className="shop-by-category">
        <h2 className="section-title">Shop By Category</h2>
        <div className="categories-grid">
          {
            categories.map((item)=>{
              return(
                <img className="category-item" src={item.image} alt="" />
              )
            })
          }
        </div>
      </section> */}

      <section className="new-arrivals">
        <h2 className="section-title">New Arrivals</h2>
        <div className="product-grid-h">
          {
            homeProducts.map((ele,id)=>{
              
              return(
                <Link to={`/product/${ele._id}`} style={{textDecoration:"none"}}>
                  <div className="product-cards" key={id}>
                    <div className="image-container" style={{marginBottom:"-10px"}}>
                      <img 
                        src={"https://varahiorganics.onrender.com/"+ele?.image?.[0]} 
                        alt="Gorumitilu" 
                        className="product-imagess" 
                      />
                      <span className="sale-badge">Sale</span>
                      <div className="gradient-overlay">
                        <button className="quick-view-btn">👁 Quick View</button>
                      </div>
                    </div>
                    <div className="product-info" style={{display:"grid",gap:"0px"}}>
                      <h3 className="product-title">{ele.name}</h3>
                      <p className="product-price">Price: ₹{ele.price}</p>
                      <div className="button-container">
                        <button className="wishlist-btn">♡ Wishlist</button>
                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(ele)}>🛒 Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </section>
      <ReviewsSection/>
    </div>
  );
};

export default Home;
