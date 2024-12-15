import React, { useState } from 'react';
import './Admin.css';
import { Home, Package, Settings } from 'lucide-react';

export default function Admin() {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    oldPrice: '',
    newPrice: '',
    quantity: '',
    description: '',
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = [...productData.images];
      newImages[index] = files[0];
      setProductData((prevData) => ({ ...prevData, images: newImages }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting product data:', productData);
    setProductData({
      name: '',
      category: '',
      oldPrice: '',
      newPrice: '',
      quantity: '',
      description: '',
      images: [],
    });
  };

  return (
    <div className='main-admin-wraper'>
    <div class="sidebar">
      <div class="header">
        <h1 class="title">Admin Dashboard</h1>
      </div>
      <nav class="navigation">
        <a href="/admin" class="nav-link">
          <Home class="icon" size={20} />
          Dashboard
        </a>
        <a href="/admin/add-product" class="nav-link">
          <Package class="icon" size={20} />
          Add Product
        </a>
        <a href="/admin/settings" class="nav-link">
          <Settings class="icon" size={20} />
          Settings
        </a>
      </nav>
    </div>
    <div class="container">
      <h1 class="title">Add New Product</h1>
      <form class="form" onSubmit={handleSubmit}>
        <div class="formGroup">
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={productData.name}
            onChange={handleInputChange}
            required 
          />
        </div>

        <div class="formGroup">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            name="category" 
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            <option value="sweets">Sweets</option>
            <option value="millets">Millets</option>
            <option value="oils">Oils</option>
            <option value="spices">Spices</option>
            <option value="grains">Grains</option>
          </select>
        </div>
        <div class="formRow">
          <div class="formGroup">
            <label htmlFor="oldPrice">Old Price</label>
            <input 
              type="number" 
              id="oldPrice" 
              name="oldPrice" 
              value={productData.oldPrice}
              onChange={handleInputChange}
              step="0.01" 
            />
          </div>

          <div class="formGroup">
            <label htmlFor="newPrice">New Price</label>
            <input 
              type="number" 
              id="newPrice" 
              name="newPrice" 
              value={productData.newPrice}
              onChange={handleInputChange}
              step="0.01" 
              required 
            />
          </div>
        </div>

        <div class="formGroup">
          <label htmlFor="quantity">Quantity</label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={productData.quantity}
            onChange={handleInputChange}
            required 
          />
        </div>

        <div class="formGroup">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={productData.description}
            onChange={handleInputChange}
            rows={4}
          ></textarea>
        </div>

        <div class="formGroup">
          <label>Product Images</label>
          <div class="imageUploadContainer">
            {[...Array(5)].map((_, index) => (
              <div key={index} class="imageUpload">
                <input 
                  type="file" 
                  id={`image${index}`} 
                  name={`image${index}`} 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, index)}
                />
                <label htmlFor={`image${index}`}>
                  <span>+</span>
                  <span>Upload Image</span>
                </label>
                {productData.images[index] && (
                  <p class="fileName">{productData.images[index].name}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" class="submitButton">Add Product</button>
      </form>
    </div>
    </div>
  );
}