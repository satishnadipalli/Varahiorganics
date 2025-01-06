import React, { useEffect, useState } from "react";
import "./Home.css";
import ReviewsSection from "../components/ReviewSection";
import { ShoppingCart } from "lucide-react";
import ShoppingCartPopup from "../components/Cart";
import { Link } from "react-router-dom";
import PremiumResponsiveHero from "../components/HeroSection/HeroSection";
import Loading from "../components/Loading/Loading";

const Home = ({homeProducts,setOpenCart}) => {
  

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

  

  const handleAddToCart = (product) => {
    // Retrieve current cart from local storage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [] ;

    // Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex((item) => item._id === product._id);

    if (existingItemIndex >= 0) {
      // If the product exists, update its quantity
      cart[existingItemIndex].quantity += 1;
      setOpenCart(true)
    } else {
     console.log({ ...product,price:product?.weightPrices?.[0]?.price,weight: product?.weightPrices?.[0].weight, quantity: 1 })
      cart.push({ ...product,price:product?.weightPrices?.[0]?.price,weight: product?.weightPrices?.[0].weight, quantity: 1 });
      setOpenCart(true)
    }

    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

  };


  return (
    <div className="home-page">
      <PremiumResponsiveHero setOpenCart={setOpenCart}/>
      {/* <section className="features-section">
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
      </section> */}


      <section className="new-arrivals">
        <h2 className="section-title">New Arrivals</h2>
        <div className="product-grid-h">
          {
            homeProducts.map((ele,id)=>{
              
              return(
                
                  <div className="product-cardsrr" key={id}>
                    <Link to={`/product/${ele._id}`} style={{textDecoration:"none"}}>
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
                    </Link>
                    <div className="product-info" style={{display:"grid",gap:"0px"}}>
                      <h3 className="product-title ooo">{ele.name}</h3>
                      <p className="product-price">Price: ₹{ele?.weightPrices?.[0]?.price} - {ele?.weightPrices?.[ele?.weightPrices?.length -1]?.price} </p>
                      <div className="button-container">
                        <button className="wishlist-btn">♡ Watch</button>
                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(ele)}>🛒 Add to Cart</button>
                      </div>
                    </div>
                  </div>
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
