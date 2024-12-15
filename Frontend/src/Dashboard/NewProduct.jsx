// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addAdminProducts } from '../Redux/CartSlice';
// const NewProduct = ({setIsOpen,clickedProduct,SetIsLoading,setAllProducts}) => {
//   const {loginDetails,adminProducts} = useSelector(state=>state.cart)
//   const dispatch = useDispatch();
  
//   const [productDetails,setProductDetails] = useState({
//     title: "",
//     image: [],
//     categoery:"",
//     image_small: "",
//     attribute: "",
//     brand: "",
//     subCategoery:"",
//     description: "",
//     avgRating: 0,
//     ratings: 0,
//     price: '',
//     oldPrice: '',
//     badge: "'",
//     quantity:1
//   });

//   function handleDetails(event){
//     const {value,name} = event.target
//     setProductDetails((previousValue)=>{
//       return {
//         ...previousValue,
//         [name] : value
//       }
//     })
//   }

//   async function handleUpload(e) {
//     const selectedFile = e.target.files[0];

//     setProductDetails((previousValue)=>{
//       return{
//         ...previousValue,
//         image:[...previousValue.image,selectedFile]
//       }
//     })
//    } 

//   async function handleSubmit(event) {
  
//   try {
//     event.preventDefault();
//     const formData = new FormData();

//     formData.append('title', productDetails.title);
//     formData.append('categoery', productDetails.categoery);
//     formData.append('brand', productDetails.brand);
//     formData.append('description', productDetails.description);
//     formData.append('avgRating', productDetails.avgRating);
//     formData.append('ratings', productDetails.ratings);
//     formData.append('price', productDetails.price);
//     formData.append('oldPrice', productDetails.oldPrice);
//     formData.append('badge', productDetails.badge);
//     formData.append('quantity', productDetails.quantity);

//     // Append each image separately
//     for (let i = 0; i < productDetails.image.length; i++) {
//       formData.append('image', productDetails.image[i]);
//     }

//     console.log(formData,"here is your data");
    
//     const response = await fetch("http://localhost:3000/addProductToStore", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${loginDetails.token}`,
//       },
//       body: formData,
//     });

//     if (response.ok) {
//       setIsOpen(false);
//       const responseTwo = await fetch("http://localhost:3000/getallproducts",{
//         method:"GET",
//         headers:{
//           "Authorization" : `Bearer ${loginDetails.token}`
//         }
//       })
//       if(responseTwo.ok){
//         const {products} = await response.json()
//         setAllProducts(products)
//         dispatch(addAdminProducts(products));
//         SetIsLoading(false);
//       }
//     } else {
//       console.error(`Error: ${response.status} - ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error("An unexpected error occurred:", error);
//   }
//   console.log(productDetails)
// }

//   return (
//     <div className='flex items-center w-full justify-center pt-10 absolute  bg-white'>
//       <form onSubmit={(event)=>{handleSubmit(event)}} className="w-full max-w-lg">
//       <div className="flex flex-wrap -mx-3 mb-6">
//         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
//             Product Title
//           </label>
//           <input
//            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" 
//            type="text" 
//            placeholder="Jane"
//            name='title'
//            value={productDetails.title}
//            onChange={handleDetails}
//           />
//           <p className="text-red-500 text-xs italic">Please fill out this field.</p>
//         </div>
//         <div className="w-full md:w-1/2 px-3">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
//             Product Brand
//           </label>
//           <div className="relative">
//             <select
//              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//              id="grid-state"
//              onChange={handleDetails}
//              value={productDetails.brand}
//              name='brand'
//             >
//               <option>defalut</option>
//               <option>Apple</option>
//               <option>Lg</option>
//               <option>sony</option>
//               <option>Olivia</option>
//               <option >Rowdy</option>
//               <option >Stricker</option>
//               <option >Puma</option>
//               <option >Polo</option>
//               <option >Diesel</option>
//               <option >Ponds</option>
//               <option >Aula</option>
//               <option>Nike</option>
//               <option>Adidas</option>
//               <option>Amazon</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-wrap -mx-3 mb-6">
//         <div className="w-full px-3">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
//             Product Description
//           </label>
//           <input 
//            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//            id="" 
//            type="text" 
//            placeholder="description"
//            name='description'
//            value={productDetails.description}
//            onChange={handleDetails} 
//           />
//           <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
//         </div>
//       </div>
//       <div className="flex flex-wrap -mx-3 mb-6">
//         <div className="w-full px-3">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
//             Upload Product Image
//           </label>
//           <input 
//            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//            id ="" 
//            type="file" 
//            multiple
//            placeholder="upload Image" 
//            name='image'
//            onChange={handleUpload}
//           />
//           <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
//         </div>
//       </div>
//       <div className="flex flex-wrap -mx-3 mb-2">
//         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
//             Categoery
//           </label>
//           <div className="relative">
//             <select 
//              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//              id="grid-state"
//              name='categoery'
//              onChange={handleDetails}
//              value={productDetails.categoery}
//             >
//               <option>Amazon</option>
//               <option>Home</option>
//               <option>Mobiles</option>
//               <option>Fashion</option>
//               <option>Deals</option>
//               <option>Computers</option>
//               <option>Electronics</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
//             Badge
//           </label>
//           <div className="relative">
//             <select 
//              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//              id="grid-state"
//              value={productDetails.badge}
//              onChange={handleDetails}
//              name='badge'
//             >
//               <option>choice</option>
//               <option>limited</option>
//               <option>seller</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
//             Attribute keyword
//           </label>
//           <input 
//           className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//           id="grid-zip" 
//           type="text" 
//           placeholder="give a search keyword"
//           value={productDetails.attribute}
//           name='attribute'
//           onChange={handleDetails}
//         />
//         </div>
//       </div>
//       <div className="flex flex-wrap -mx-3 mt-8 mb-2">
//         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
//             Price
//           </label>
//           <input 
//           className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//           id="grid-zip" 
//           type="text" 
//           placeholder="Price of product"
//           value={productDetails.price}
//           name='price'
//           onChange={handleDetails}
//         />
//         </div>
//         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
//             Old Price
//           </label>
//           <input 
//           className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//           id="grid-zip" 
//           type="text" 
//           placeholder="Old Price of product"
//           value={productDetails.oldPrice}
//           name='oldPrice'
//           onChange={handleDetails}
//         />
//         </div>
//         <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//           <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
//             Number of products
//           </label>
//           <input 
//            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//            id="grid-zip" 
//            type="number" 
//            placeholder="select the products"
//            value={productDetails.quantity}
//            onChange={handleDetails}
//            name='quantity'
//           />
//         </div>
//       </div>
//       <div className="relative">
//         <select 
//           className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
//           id="grid-state"
//           name='subCategoery'
//           onChange={handleDetails}
//           value={productDetails.subCategoery}
//         >
//           <option>defalut</option>
//           <option>Women</option>
//           <option>Men</option>
//           <option>Children</option>
//           <option>Footwear</option>
//           <option>Gadgets</option>
//           <option>Electronics</option>
//           <option>Sound</option>
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//         </div>
//       </div>
//       <button type='submit' className="mt-10 mb-10 bg-blue-500 hover:bg-blue-700 text-gray-800 font-semibold py-2 w-full border border-gray-400 rounded shadow">
//         Add Product
//       </button>
//     </form>
//     </div>
//   )
// }

// export default NewProduct;



import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAdminProducts } from '../Redux/CartSlice';
import { FaFileUpload, FaTag, FaDollarSign, FaImage } from 'react-icons/fa';
import { AiOutlineFileText } from 'react-icons/ai';
import { RiGalleryLine } from 'react-icons/ri';

const NewProduct = ({ setIsOpen, clickedProduct, SetIsLoading, setAllProducts,adminProducts=[] }) => {
  // const { loginDetails, adminProducts } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
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

      const response = await fetch("http://localhost:3000/addProductToStore", {
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${loginDetails.token}`,
        // },
        body: formData,
      });

      if (response.ok) {
        setIsOpen(false);
        const responseTwo = await fetch("http://localhost:3000/getallproducts", {
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