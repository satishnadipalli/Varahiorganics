import React, { useEffect, useState } from 'react';
import './ProductView.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ProductView() {
  const [selectedProduct,setSelectedProduct] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState('1.3 kgs');
  const [selectedUnits, setSelectedUnits] = useState('1');
  const navigate = useNavigate();
  const {id} = useParams();


  function handleBuy() {
    // Check if selectedProduct is defined
    if (selectedProduct) {
        // If it's an object, stringify it
        localStorage.setItem('buyproduct', JSON.stringify(selectedProduct));
        
        // Log for debugging
        console.log(selectedProduct, "selected product added to localStorage");

        // Navigate to the checkout page
        navigate("/checkout");
    } else {
        // Handle the case when no product is selected
        console.log("No product selected");
    }
}


  function handleAddToCart() {
    if (selectedProduct) {
      // Get the current cart from localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Check if the product already exists in the cart
      const existingItemIndex = cart.findIndex((item) => item._id === selectedProduct._id);
  
      if (existingItemIndex >= 0) {
        // If the product already exists, update its quantity
        cart[existingItemIndex].quantity =
          parseInt(cart[existingItemIndex].quantity) + parseInt(selectedUnits);
      } else {
        // If it's a new product, add it to the cart with the selected quantity
        cart.push({
          ...selectedProduct,
          quantity: parseInt(selectedUnits), // Add quantity to the new item
        });
      }
  
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Optionally show a success message or notification
      alert(`${selectedProduct.name} added to cart!`);
    }
  }
  
  

  useEffect(()=>{
    const fetchProduct = async() =>{
      try {
        const response = await fetch( `http://localhost:3000/getproduct/${id}`,{
          method : "GET"
        });
  
        const data = await response.json();
        if(data.product){
          console.log(data.product);
          setSelectedProduct(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  },[]);


  const products = [
    {
      id: 1,
      title: 'Mango Pickle',
      image: '/placeholder.svg?height=300&width=300',
      minPrice: 135.00,
      maxPrice: 510.00,
    },
    {
      id: 2,
      title: 'Amla Pickle (Without Garlic)',
      image: '/placeholder.svg?height=300&width=300',
      minPrice: 135.00,
      maxPrice: 510.00,
    },
    {
      id: 3,
      title: 'Chicken Boneless Pickle',
      image: '/placeholder.svg?height=300&width=300',
      minPrice: 350.00,
      maxPrice: 1430.00,
    },
    {
      id: 4,
      title: 'Chicken Bone Pickle',
      image: '/placeholder.svg?height=300&width=300',
      minPrice: 250.00,
      maxPrice: 1000.00,
    },
  ];

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  },[]);

  function handleClick(){
    window.scrollTo({top:0,behavior:"smooth"});
  }
  

  return (
    <>
      <div className="containerr" style={{marginTop:"0px",width:"100%"}}>
      <div className="product-grid" style={{width:"90%",}}>
        <div className="product-image">
          <img
            src={selectedProduct?.images[0]}
            alt="Natural Honey"
          />
        </div>

        <div className="product-details">
          <div>
            <div className="rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <span className="reviews">61 reviews</span>
            </div>
            <h1 className="product-title">{selectedProduct?.name}</h1>
            <div className="price-rating">
              <div className="price">Rs. {selectedProduct?.price}</div>
              <div className="rating">
                <span className="star">★</span>
                <span>5.0 (61)</span>
              </div>
            </div>
          </div>

          <div className="stock-shipping">
            <div className="stock">
              <div className="stock-dot"></div>
              <p style={{}}>Item is in stock</p>
            </div>
            <div className="shipping">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <p>Free shipping On Orders Above 500/-</p>
            </div>
          </div>

          <div className="quantity-section">
          <div>
            <label className="quantity-label">QUANTITY</label>
            <div className="quantity-buttons">
              {['1.3 kgs', '950 gm', '700 gm', '500 gm', '400 gm'].map((qty, index) => (
                <button
                  key={qty}
                  className={`quantity-button ${selectedQuantity === qty ? 'active' : ''} ${index > 2 ? 'disabled' : ''}`}
                  onClick={() => setSelectedQuantity(qty)}
                  disabled={index > 2}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>

          <div style={{marginTop:"10px"}}>
            <label className="units-label">NO OF UNITS</label>
            <div className="units-select-container">
              <select
                className="units-select"
                value={selectedUnits}
                onChange={(e) => setSelectedUnits(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
          <div className="action-buttons">
            <button className="action-button" onClick={handleAddToCart}>ADD TO CART</button>
            <button className="action-button" onClick={handleBuy}>BUY IT NOW</button>
          </div>

          <div className="payment-icons">
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="Mastercard" />
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="Visa" />
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="American Express" />
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="Apple Pay" />
          </div>

          <div className="product-description">
            <p>
              Introducing Vamshi Farms Natural Honey! Experience the pure goodness of unfiltered and unpasteurized honey, that retains its rich flavor and nutritional benefits. Packed with vitamins, minerals, and antioxidants, our honey is a natural powerhouse.
            </p>
            <p>
              Whether enjoyed on toast, drizzled over yogurt, or used as a natural sweetener in your favorite recipes, our honey adds a touch of wholesome goodness to every bite.
            </p>
            <p>
              Taste the difference that comes from nature's own creation and experience the delight of this golden treasure today.
            </p>
            <p className="note">
              Note : The thickness, color and taste will vary depending on season and flowering source available.
            </p>
          </div>

          <details className="additional-details">
            <summary>Additional Details</summary>
            <p>Additional product details and information can be added here.</p>
          </details>
        </div>
      </div>
    </div>
    
    <section className="related-products">
      <h2>Related products</h2>
      <div className="products-grid-r">
        {products.map((product,ele) => (
          <Link to={`/product/${ele}`} style={{textDecoration:"none"}}>
            <div key={product.id} className="product-card" style={{textDecoration:"none"}} onClick={handleClick}>
            <div className="product-image-r">
              <span className="sale-badge">Sale!</span>
              <img src={"https://vamshifarms.com/cdn/shop/files/honey-collection-mockuop_1.jpg?v=1717574373&width=980"} alt={product.title} />
            </div>
            <a href="#" className="product-title-r">
              {product.title}
            </a>
            <div className="price-range-r">
              ₹{product.minPrice.toFixed(2)} – ₹{product.maxPrice.toFixed(2)}
            </div>
            <button className="wishlist-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Add to Wishlist
            </button>
          </div>
          </Link>
        ))}
      </div>
    </section>
  </>
  );
}