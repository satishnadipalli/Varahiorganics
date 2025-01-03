'use client'

import React, { useState } from 'react'
import { FaFileUpload, FaTag, FaDollarSign, FaImage, FaPlus, FaTimes } from 'react-icons/fa'
import { AiOutlineFileText } from 'react-icons/ai'
import { RiGalleryLine } from 'react-icons/ri'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const NewProduct = ({ setIsAdd }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [weights, setWeights] = useState([])
  const [weight, setWeight] = useState("")
  
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: [],
    category: "",
    image_small: "",
    attribute: "",
    brand: "",
    subCategory: "",
    description: "",
    avgRating: 0,
    ratings: 0,
    price: '',
    oldPrice: '',
    badge: "",
    quantity: 1
  })

  function handleDetails(event) {
    const { value, name } = event.target
    setProductDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleUpload(e) {
    const selectedFiles = Array.from(e.target.files)
    setProductDetails(prev => ({
      ...prev,
      image: [...prev.image, ...selectedFiles]
    }))
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const formData = new FormData();
  
      // Append non-image product details
      Object.keys(productDetails).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, productDetails[key]);
        }
      });
  
      // Append image files
      productDetails.image.forEach((img) => formData.append('image', img));
  
      // Append weights as a JSON string
      formData.append('weights', JSON.stringify(weights));
  
      const response = await fetch("https://varahiorganics.onrender.com/addproduct", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success("Product successfully added!", {
          autoClose: 3000,
          theme: "colored",
        });
  
        // Reset form states
        setProductDetails({
          name: "",
          image: [],
          category: "",
          image_small: "",
          attribute: "",
          brand: "",
          subCategory: "",
          description: "",
          avgRating: 0,
          ratings: 0,
          price: '',
          oldPrice: '',
          badge: "",
          quantity: 1,
        });
        setWeights([]);
  
        setIsLoading(false);
      } else {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  
  const handleAddWeight = (e) => {
    e.preventDefault()
    if (weight.trim() !== "") {
      setWeights(prev => [...prev, weight.trim()])
      setWeight('')
    }
  }

  const handleRemoveWeight = (index) => {
    setWeights(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='flex absolute w-full justify-center p-10 bg-gray-100'>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">Add New Product</h2>
          <button onClick={() => setIsAdd(false)} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
              <AiOutlineFileText className="text-gray-500 mr-2" /> Product name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={productDetails.name}
              onChange={handleDetails}
              placeholder="Enter product name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 flex items-center">
              <FaTag className="text-gray-500 mr-2" /> Product Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={productDetails.brand}
              onChange={handleDetails}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Brand</option>
              <option value="Varahi">Varahi</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center">
              <AiOutlineFileText className="text-gray-500 mr-2" /> Product Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productDetails.description}
              onChange={handleDetails}
              placeholder="Enter product description"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 flex items-center">
              <FaImage className="text-gray-500 mr-2" /> Upload Product Image
            </label>
            <input
              id="image"
              type="file"
              multiple
              onChange={handleUpload}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 flex items-center">
                <RiGalleryLine className="text-gray-500 mr-2" /> Category
              </label>
              <select
                id="category"
                name="category"
                value={productDetails.category}
                onChange={handleDetails}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select Category</option>
                <option value="Sweets">Sweets</option>
                <option value="Millets">Millets</option>
                <option value="Hots">Hots</option>
                <option value="Pickels">Pickels</option>
                <option value="Deals">Deals</option>
              </select>
            </div>

            <div>
              <label htmlFor="badge" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaTag className="text-gray-500 mr-2" /> Badge
              </label>
              <select
                id="badge"
                name="badge"
                value={productDetails.badge}
                onChange={handleDetails}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select Badge</option>
                <option value="Choice">Choice</option>
                <option value="Limited">Limited</option>
                <option value="Seller">Seller</option>
              </select>
            </div>

            <div>
              <label htmlFor="attribute" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaTag className="text-gray-500 mr-2" /> Attribute Keyword
              </label>
              <input
                id="attribute"
                name="attribute"
                type="text"
                value={productDetails.attribute}
                onChange={handleDetails}
                placeholder="Search keyword"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaDollarSign className="text-gray-500 mr-2" /> Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={productDetails.price}
                onChange={handleDetails}
                placeholder="Price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaDollarSign className="text-gray-500 mr-2" /> Old Price
              </label>
              <input
                id="oldPrice"
                name="oldPrice"
                type="number"
                value={productDetails.oldPrice}
                onChange={handleDetails}
                placeholder="Old Price"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaTag className="text-gray-500 mr-2" /> Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={productDetails.quantity}
                onChange={handleDetails}
                placeholder="Number of products"
                className="mt-1 block w-full border-zinc-700 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="weights" className="block text-sm font-medium text-gray-700 flex items-center">
              <RiGalleryLine className="text-gray-500 mr-2"/> Weights
            </label>
            <div className="flex space-x-2">
              <input
                id="weights"
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight (e.g., 100g, 1kg)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                onClick={handleAddWeight}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaPlus className="mr-2" /> Add
              </button>
            </div>
            {weights.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {weights.map((w, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                    {w}
                    <button onClick={() => handleRemoveWeight(index)} className="ml-2 text-red-500">
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="mt-8 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default NewProduct



