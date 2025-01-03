import React, { useEffect, useState } from 'react';
import './ProductView.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import ReviewCard from './Review';
import NewfeedBack from '../NewFeedBack/NewFeedBack';


export default function ProductView({homeProducts,setOpenCart}) {
  
  const [selectedProduct,setSelectedProduct] = useState(null);
  const [isLoading,setIsloading] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(selectedProduct?.weights?.[0]);
  const [selectedUnits, setSelectedUnits] = useState(1);
  const [isOpenReview,setIsOpenReview] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();


  console.log(selectedProduct?.weights?.[0],";;;;;;;;")

  function handleBuy() {
    // Check if selectedProduct is defined
    if (selectedProduct) {
        // If it's an object, stringify it
        localStorage.setItem('buyproduct', JSON.stringify(selectedProduct));

        navigate("/checkout");
    } else {
        // Handle the case when no product is selected
        console.log("No product selected");
    }
}


function handleAddToCart() {
  if (!selectedProduct) {
    toast.error("Please select a product first.", {
      autoClose: 3000,
      theme: "colored",
    });
    return;
  }

  if (!selectedQuantity) {
    toast.warning("Please select a weight before adding to cart.", {
      autoClose: 3000,
      theme: "colored",
    });
    return;
  }

  // Get the current cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product already exists in the cart
  const existingItemIndex = cart.findIndex((item) => 
    item._id === selectedProduct._id && item.weight === selectedQuantity
  );

  if (existingItemIndex >= 0) {
    // If the product already exists with the same weight, update its quantity
    cart[existingItemIndex].quantity =
      parseInt(cart[existingItemIndex].quantity) + parseInt(selectedUnits);
      setOpenCart(true)
  } else {
    // If it's a new product or new weight, add it to the cart
    cart.push({
      ...selectedProduct,
      weight: selectedQuantity,
      quantity: parseInt(selectedUnits),
    });
    setOpenCart(true)
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Show a success message
  toast.success(`${selectedProduct.name} (${selectedQuantity}) added to cart!`, {
    autoClose: 3000,
    theme: "colored",
  });
}


  
  

  useEffect(()=>{
    const fetchProduct = async() =>{
      handleClick()
      setIsloading(true)
      
      try {
        const response = await fetch( `https://varahiorganics.onrender.com/getproduct/${id}`,{
          method : "GET"
        });
  
        const data = await response.json();
        if(data.product){
          setSelectedProduct(data.product);
          setIsloading(false)
        }
      } catch (error) {
        setIsloading(false)
        console.log(error);
      }
    }
    fetchProduct();
  },[id]);


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


  console.log(selectedProduct)
  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"});
  },[]);

  function handleClick(){
    window.scrollTo({top:0,behavior:"smooth"});
  }
  
  if(!selectedProduct || isLoading){
    return <Loading/> 
  }

  function formatDescription(description) {
    // Split the description by periods and remove any extra empty strings
    const descriptionLines = description.split('.').filter(line => line.trim() !== '');
    
    // Return each line wrapped in a <p> tag
    return descriptionLines.map((line, index) => (
      <p key={index}>
        {line.trim()}.
      </p>
    ));
  }


    const handleAddToCartBelow = (product) => {
    // Retrieve current cart from local storage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    console.log(product,"product",cart,"-Below logs");

    // Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex((item) => item._id == product._id);

    if (existingItemIndex >= 0) {
      // If the product exists, update its quantity
      cart[existingItemIndex].quantity += 1;
      setOpenCart(true)
    } else {
      // If the product doesn't exist, add it with a quantity of 1
      cart.push({ ...product, quantity: 1 });
      setOpenCart(true)

    }

    localStorage.setItem("cart", JSON.stringify(cart));

  };

  return (
    <>
   { 
   <>
    <div className="containerr" style={{marginTop:"0px",width:"100%"}}>
      <div className="product-grid" style={{width:"90%",}}>
        <div className="product-image">
          <img
            src={"https://varahiorganics.onrender.com/"+selectedProduct?.image?.[0]}
            alt="Natural Honey"
            className='productveiw-img'
          />
        </div>
        <div className="product-details">
          <div>
            <div className="rating flex-col">
            <h1 className="product-title block">{selectedProduct?.name}</h1>
              <div className="stars items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
                <span className="reviews inline-block ml-2">61 reviews</span>
              </div>
              
            </div>
            <div className="price-rating -mt-4">
              <div className="price text-black">Rs. {selectedProduct?.price}</div>
              <div className="rating">
                <span className="star">★</span>
                <span>5.0 (61)</span>
              </div>
            </div>
          </div>

          <div className="stock-shipping">
            <div className="stock mt-3">
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
              <p className='mt-3 mb-3'>Free shipping On Orders Above 500/-</p>
              <p>Note: Please Click here for bulk orders</p>
            </div>
          </div>

          <div className="quantity-section">
          <div>
            <label className="quantity-label">QUANTITY</label>
            <div className="quantity-buttons">
              {selectedProduct?.weights?.map((qty, index) => (
                
                <button
                  key={qty}
                  className={`quantity-button text-nowrap ${selectedQuantity === qty ? 'active' : ''} ${index > 2 ? 'disabled' : ''}`}
                  onClick={() => setSelectedQuantity(qty)}
                  disabled={index > 2}
                >
                  {console.log(qty,selectedQuantity)}
                  {qty}
                </button>
              ))}
            </div>
          </div>

        </div>
          <div className="action-buttons">
            <button className="action-button" onClick={handleAddToCart}>ADD TO CART</button>
            <button className="action-button" onClick={handleBuy}>BUY IT NOW</button>
          </div>
          <button className='fedbak' onClick={()=>setIsOpenReview(true)}>
            Add a feedback about this product
          </button>
          {/* <div className="payment-icons">
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="Mastercard" />
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="Visa" />
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="American Express" />
            <img src="https://vamshifarms.com/cdn/shop/files/honey_187a8945-21f4-4ad4-b61a-34143ee13233.jpg?v=1717574377&width=88" alt="Apple Pay" />
          </div> */}

          <div className="product-description">
            <p>
              {/* dessc  */}
              {formatDescription(selectedProduct?.description)}
            </p>
          </div>
          <details className="additional-details">
            <summary>Additional Details</summary>
            <p>Additional product details and information can be added here.</p>
          </details>
        </div>
      </div>
  </div>
    
    <section className="related-products mt-10">
      <h2>Related products</h2>
      <div className="products-grid-r">
        {homeProducts.map((product,ele) => (
          <Link to={`/product/${product?._id}`} style={{textDecoration:"none"}}>
            <div key={product._id} className="product-cardss" style={{textDecoration:"none"}} onClick={handleClick}>
            <div className="product-image-r">
              <span className="sale-badge">{product?.badge || "Sale"}</span>
              <img src={"https://varahiorganics.onrender.com/"+product?.image?.[0]} alt={product.name} />
            </div>
            <a href="#" className="product-title-r">
              {product.title}
            </a>
            <div className="price-range-r">
              ₹{product?.price?.toFixed(2)} – ₹{product?.price?.toFixed(2)}
            </div>
            <button className="wishlist-button"
              onClick={() => handleAddToCartBelow(product)}
            >
              🛒
              Add to Cart
            </button>
          </div>
          </Link>
        ))}
      </div>
      <ToastContainer />
    </section>
    {
      selectedProduct?.feedbacks?.length > 0 && <h2 className='mt-10 text-lg text-black text-center' style={{fontFamily:"Manrope-Bold"}}>Customer feedbacks</h2>
    }
    {
      selectedProduct?.feedbacks?.map((product)=>{
        return <ReviewCard
          name={product?.user}
          avatarSrc="/placeholder.svg?height=100&width=100"
          review={product?.feed}
          rating={product?.rateGiven}
          date = {product?.date}
        />
      })
    }

    {isOpenReview && <NewfeedBack setIsOpen={setIsOpenReview} productId={selectedProduct?._id} />}
    </>
    }
  </>
  );
}