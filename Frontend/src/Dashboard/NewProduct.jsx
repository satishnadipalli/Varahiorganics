


import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAdminProducts } from '../Redux/CartSlice';
import { FaFileUpload, FaTag, FaDollarSign, FaImage } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import { RiGalleryLine } from 'react-icons/ri';

const NewProduct = ({ setisadd, clickedProduct, SetIsLoading, setAllProducts,adminProducts=[] }) => {
  // const { loginDetails, adminProducts } = useSelector(state => state.cart);
  // const dispatch = useDispatch();
  
  const [productDetails, setProductDetails] = useState({
    title: "",
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
    badge: "'",
    quantity: 1
  });

  function handleDetails(event) {
    const { value, name } = event.target;
    setProductDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleUpload(e) {
    const selectedFile = e.target.files[0];

    setProductDetails(prev => ({
      ...prev,
      image: [...prev.image, selectedFile]
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();

      Object.keys(productDetails).forEach(key => {
        if (key !== 'image') {
          formData.append(key, productDetails[key]);
        }
      });

      productDetails.image.forEach(img => formData.append('image', img));

      const response = await fetch("https://varahiorganics.onrender.com/addProductToStore", {
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${loginDetails.token}`,
        // },
        body: formData,
      });

      if (response.ok) {
        setisadd(false);
        const responseTwo = await fetch("https://varahiorganics.onrender.com/getallproducts", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${loginDetails.token}`
          }
        });
        if (responseTwo.ok) {
          const { products } = await responseTwo.json();
          setAllProducts(products);
          // dispatch(addAdminProducts(products));
          SetIsLoading(false);
        }
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <div className='flex absolute w-full justify-center p-10 bg-gray-100'>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-8 rounded-lg ">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Product</h2>
        
        {/* Product Title */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
            <AiOutlineFileText className="text-gray-500 mr-2" /> Product Title
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter product title"
            name='title'
            value={productDetails.title}
            onChange={handleDetails}
          />
        </div>

        {/* Product Brand */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
            <FaTag className="text-gray-500 mr-2" /> Product Brand
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
            id="brand"
            name='brand'
            onChange={handleDetails}
            value={productDetails.brand}
          >
            <option value="">Select Brand</option>
            //               <option>defalut</option>
                 <option>Apple</option>
                 <option>Lg</option>
                 <option>sony</option>
                 <option>Olivia</option>
                 <option >Rowdy</option>
                 <option >Stricker</option>
                 <option >Puma</option>
                 <option >Polo</option>
                 <option >Diesel</option>
                 <option >Ponds</option>
                 <option >Aula</option>
                 <option>Nike</option>
                 <option>Adidas</option>
                 <option>Amazon</option>
          </select>
        </div>

        {/* Product Description */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
            <AiOutlineFileText className="text-gray-500 mr-2" /> Product Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter product description"
            name='description'
            value={productDetails.description}
            onChange={handleDetails}
          />
        </div>

        {/* Upload Product Image */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
            <FaImage className="text-gray-500 mr-2" /> Upload Product Image
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
            type="file"
            multiple
            onChange={handleUpload}
          />
        </div>

        {/* Category, Badge, Attribute, Price, Old Price, Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Category */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
              <RiGalleryLine className="text-gray-500 mr-2" /> Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
              id="category"
              name='category'
              onChange={handleDetails}
              value={productDetails.category}
            >
              <option value="">Select Category</option>
              {/* Add more options here */}
                <option>Amazon</option>
                 <option>Home</option>
                 <option>Mobiles</option>
                 <option>Fashion</option>
                 <option>Deals</option>
                 <option>Computers</option>
                 <option>Electronics</option>
              {/* ... */}
            </select>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
              <FaTag className="text-gray-500 mr-2" /> Badge
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
              id="badge"
              name='badge'
              onChange={handleDetails}
              value={productDetails.badge}
            >
              <option value="">Select Badge</option>
              <option>Choice</option>
              <option>Limited</option>
              <option>Seller</option>
            </select>
          </div>

          {/* Attribute */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
              <FaTag className="text-gray-500 mr-2" /> Attribute Keyword
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search keyword"
              name='attribute'
              value={productDetails.attribute}
              onChange={handleDetails}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
              <FaDollarSign className="text-gray-500 mr-2" /> Price
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Price"
              name='price'
              value={productDetails.price}
              onChange={handleDetails}
            />
          </div>

          {/* Old Price */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
              <FaDollarSign className="text-gray-500 mr-2" /> Old Price
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Old Price"
              name='oldPrice'
              value={productDetails.oldPrice}
              onChange={handleDetails}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
              <FaTag className="text-gray-500 mr-2" /> Quantity
            </label>
           

            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
              type="number"
              placeholder="Number of products"
              name='quantity'
              value={productDetails.quantity}
              onChange={handleDetails}
            />
          </div>
        </div>

        {/* Subcategory */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2 flex items-center">
            <RiGalleryLine className="text-gray-500 mr-2" /> Subcategory
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
            id="subCategory"
            name='subCategory'
            onChange={handleDetails}
            value={productDetails.subCategory}
          >
          <option>defalut</option>
          <option>Women</option>
          <option>Men</option>
          <option>Children</option>
          <option>Footwear</option>
          <option>Gadgets</option>
          <option>Electronics</option>
          <option>Sound</option>
          </select>
        </div>

        <button 
          type='submit' 
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default NewProduct;