import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { FaTag, FaDollarSign, FaImage, FaListAlt, FaArrowCircleDown } from 'react-icons/fa'; // Icons for various fields
import { IntoMark } from '../../../Heroicons';

const ShippingLabel = ({ clickedProduct, setIsUpdateForm }) => {
  const [showLabel, setShowLabel] = useState(false);
  const [productDetails, setProductDetails] = useState({
    _id: clickedProduct?._id,
    name: clickedProduct?.name,
    image: clickedProduct?.image,
    subCategoery: clickedProduct?.subCategoery,
    category: clickedProduct?.categoery,
    image_small: clickedProduct?.image_small,
    attribute: clickedProduct?.attribute,
    brand: clickedProduct?.brand,
    description: clickedProduct?.description,
    avgRating: clickedProduct?.avgRating,
    ratings: clickedProduct?.ratings,
    price: clickedProduct?.price,
    oldPrice: clickedProduct?.oldPrice,
    badge: clickedProduct?.badge,
    quantity: clickedProduct?.quantity,
    weights:clickedProduct?.weights
  });

  function handleDetails(event) {
    const { value, name } = event.target;
    setProductDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      const response = await fetch(`https://varahiorganics.onrender.com/updateproduct/${clickedProduct?._id}`, {
        method: "PUT",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(productDetails)
      });

      if (response.ok) {
        setIsUpdateForm(false);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  useEffect(() => {
    setShowLabel(true);
  }, []);

  return (
    <div
      className={`flex p-5 h-full flex top-0 bg-white absolute justify-center w-full `}
    >
      <div className="w-1/2">
        <div style={{float:'right',cursor:"pointer"}} onClick={()=>setIsUpdateForm(false)}>
          <span ><IntoMark/></span>
        </div>
        <div className="mt-5 bg-white rounded-lg shadow-lg">
          <div className="flex">
            <h1 className="inline text-center text-2xl font-semibold leading-none pt-5 pl-6 mb-7">Update the Product</h1>
          </div>
          <div className="px-5 pb-5">

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                <FaTag className="inline-block mr-2" />
                Product name
              </label>
              <input
                onChange={handleDetails}
                value={productDetails.name}
                placeholder="Enter product name"
                name='name'
                className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                <FaTag className="inline-block mr-2" />
                Product Description
              </label>
              <input
                placeholder="Enter product description"
                onChange={handleDetails}
                value={productDetails.description}
                name="description"
                className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="flex mb-6">
              <div className="w-1/2 pr-2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  <FaTag className="inline-block mr-2" />
                  Product Brand
                </label>
                <select
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name='brand'
                  onChange={handleDetails}
                  value={productDetails.brand}
                >
                  <option value="">Select a brand</option>
                  <option>Amazon</option>
                  <option>Apple</option>
                  <option>LG</option>
                  <option>Sony</option>
                  <option>Nike</option>
                  <option>Adidas</option>
                </select>
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  <FaArrowCircleDown className="inline-block mr-2" />
                  Product Category
                </label>
                <select
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name='category'
                  onChange={handleDetails}
                  value={productDetails.category}
                >
                  <option value="">Select a category</option>
                  <option>Amazon</option>
                  <option>Home</option>
                  <option>Mobiles</option>
                  <option>Fashion</option>
                  <option>Deals</option>
                  <option>Computers</option>
                  <option>Electronics</option>
                </select>
              </div>
            </div>

            <div className="flex mb-6">
              <div className="w-1/2 pr-2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  <FaDollarSign className="inline-block mr-2" />
                  Product Price
                </label>
                <input
                  placeholder="Enter product price"
                  onChange={handleDetails}
                  value={productDetails.price}
                  name="price"
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  <FaDollarSign className="inline-block mr-2" />
                  Old Price
                </label>
                <input
                  placeholder="Enter old price"
                  onChange={handleDetails}
                  value={productDetails.oldPrice}
                  name='oldPrice'
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                <FaListAlt className="inline-block mr-2" />
                Attributes
              </label>
              <input
                placeholder="Enter key attributes"
                onChange={handleDetails}
                value={productDetails.attribute}
                name='attribute'
                className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="flex mb-6">
              <div className="w-1/2 pr-2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  <FaTag className="inline-block mr-2" />
                  Product Badge
                </label>
                <select
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name='badge'
                  onChange={handleDetails}
                  value={productDetails.badge}
                >
                  <option value="">Select a badge</option>
                  <option>Choice</option>
                  <option>Limited</option>
                  <option>Seller</option>
                </select>
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  <FaArrowCircleDown className="inline-block mr-2" />
                  Sub-Category
                </label>
                <select
                  className="block w-full bg-gray-100 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  name='subCategoery'
                  onChange={handleDetails}
                  value={productDetails.subCategoery}
                >
                  <option value="">Select a sub-category</option>
                  <option>Women</option>
                  <option>Men</option>
                  <option>Children</option>
                  <option>Footwear</option>
                  <option>Gadgets</option>
                  <option>Electronics</option>
                  <option>Sound</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingLabel;
