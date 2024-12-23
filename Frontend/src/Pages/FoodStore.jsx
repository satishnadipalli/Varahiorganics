'use client';

import { useEffect, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './FoodStore.css';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

export default function FoodStore() {
  const [priceRange, setPriceRange] = useState([120, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [storeProducts,setStoreProducts] = useState([]);

  const categories = [
    { name: 'Healthy sweets and snacks', count: 23 },
    { name: 'Masala and Kaaram Powders', count: 19 },
    { name: 'Non-Vegetarian Pickles', count: 7 },
    { name: 'Vegetarian Pickles', count: 21 },
  ];

  const productTags = [
    'allam pachadi',
    'Amla Pickle',
    'andhra style veg pickles',
  ];

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

  // console.log(storeProducts)

  useEffect(()=>{
    const fetchProducts = async() =>{
      try {
        const response = await fetch(`https://varahiorganics.onrender.com/getRandomProducts`,{
          method : "GET"
        });
        const data = await response.json();
        if(data.products){
          console.log(data.products,"fsdfd");
          setStoreProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  },[]);



  const fetchProducts = async(sort) =>{
    console.log(sort,priceRange?.[0],priceRange?.[1])
    try {
      const response = await fetch(`https://varahiorganics.onrender.com/products/sort?sort=${sort}&minPrice=${priceRange?.[0]}&maxPrice=${priceRange?.[1]}&searchQuery=${searchQuery}`,{
        method : "GET"
      });
      const data = await response.json();
      console.log(data)
      if(data.products){
        console.log(data.products,"fsdfd sorting is working");
        setStoreProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlestartsorting = (e) =>{
    if(e.target.value){
      fetchProducts(e.target.value)

    }
    else{
      fetchProducts("asc");
    }
  }


  if(!storeProducts || storeProducts.length <=0){
    return <Loading/>
  }


  return (
    <div className="page-wrapper">
      <div className="container-st" style={{backgroundColor:"white",padding:"10px"}}>
        <div className="layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-content">
              <div className="widget">
                <h2 className="widget-title">Categories</h2>
                <ul className="category-list">
                  {categories.map((category) => (
                    <li key={category.name} className="category-item">
                      <span>{category.name}</span>
                      <span className="count">({category.count})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="widget">
                <h2 className="widget-title">Filter By</h2>
                <div className="price-filter">
                  <input
                    type="range"
                    min="120"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="price-range"
                  />
                  <div className="price-inputs">
                    <button className="filter-button" onClick={handlestartsorting}>Filter</button>
                    <span className="price-text">
                      Price: ₹{priceRange[0]} — ₹{priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="widget">
                <h2 className="widget-title">Product Tags</h2>
                <div className="tag-cloud">
                  {productTags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <main className="main-content">
            <div className="top-bar">
              <div className="search-box">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button onClick={handlestartsorting} className='search-btn'>Search</button>
              </div>
              <div className="sort-box">
                <select className="sort-select" onChange={(e)=>handlestartsorting(e)}>
                  <option>Default sorting</option>
                  <option>Sort by popularity</option>
                  <option value="asc" >Sort by price: low to high</option>
                  <option value="desc" >Sort by price: high to low</option>
                </select>
                <ChevronDown className="sort-icon" size={20} />
              </div>
            </div>
            <p className="results-text">Showing 1–12 of 70 results</p>
            <div className="product-grid">
              {storeProducts.map((product) => (
                <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
                  <div key={product.id} className="product-card" style={{textDecoration:"none"}}>
                  <div className="product-image-r">
                    <span className="sale-badge">Sale!</span>
                    <img src={product?.images[0] || "https://vamshifarms.com/cdn/shop/files/honey-collection-mockuop_1.jpg?v=1717574373&width=980"} alt={product.title} />
                  </div>
                  <a href="#" className="product-title-r">
                    {product.title}
                  </a>
                  <div className="price-range-r">
                    ₹{product?.price?.toFixed(2)}
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
          </main>
        </div>
      </div>
    </div>
  );
}
