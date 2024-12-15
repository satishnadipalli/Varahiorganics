import React, { useState } from 'react';
// import { Buy } from '../../Heroicons';
// import { useSelector } from 'react-redux';
// import { FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaEnvelope, FaPhone } from 'react-icons/fa';
// import { MdPayments } from "react-icons/md";
// import ClipLoader from "react-spinners/ClipLoader";

const BuyedProducts = () => {
  // const { userOrders,loginDetails } = useSelector(state => state.cart);
  // const [isLoading,setisLoading]  = useState(false);
  // const [productsBuyed, setProductsBuyed] = useState(userOrders.filter((ele) => ele.status === "success"));
  // console.log(productsBuyed,"Here are your products buyesd")

  // const proceedCardDetails = async(userId,orderId) =>{
  //   setisLoading(true)
  //   try {
  //     const response = await fetch("http://localhost:3000/paymentDetails",{
  //       method:"POST",
  //       headers : {
  //         "Content-Type" : "application/json",
  //         "Authorization" : `Bearer ${loginDetails?.token}`
  //       },
  //       body:JSON.stringify({orderId,userId})
  //     });

  //     if(response.ok){
  //       const data = await response.json();
  //       setisLoading("falsy");
      
  //     }
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    // <div className='min-h-screen p-5 bg-gradient-to-br from-purple-50 to-purple-100'>
    //   {
    //     productsBuyed.length === 0 ? 
    //     <div className='w-full flex flex-col justify-center items-center mt-10 min-h-screen'>
    //       <div className='h-14 w-14 rounded-full flex items-center justify-center border-2 border-black bg-blue-200'>
    //         <Buy/>
    //       </div>
    //       <span className='text-lg font-extrabold text-gray-900 mt-5'>No Products Purchased Yet</span>
    //     </div>
    //     :
    //     <div className="space-y-6">
    //       {productsBuyed.map((product, index) => (
            
    //         <div key={index} className='p-6 bg-white rounded-lg shadow-lg relative overflow-hidden'>
    //           <div className='absolute inset-0 opacity-10 bg-[url(/path/to/pattern.png)]'></div> {/* Subtle pattern */}
    //           <div className='flex items-center space-x-4 relative'>
    //             {console.log(product)}
    //             <img src={`http://localhost:3000/uploads/${product.producsId[0].image}`} alt="" className='h-24 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300'/>
    //             <div className="info flex-grow">
    //               <h3 className='text-2xl font-bold text-indigo-800'>{product.producsId[0].title}</h3>
    //               <p className='text-sm text-gray-500'>Product Id: {product.producsId[0]._id}</p>
    //               <p className='text-sm text-green-700 flex items-center'><FaCheckCircle className='mr-2' />In Stock</p>
    //               <p className='text-sm text-gray-600'>Eligible for Free Shipping</p>
    //               <p className='flex items-center mt-2 text-sm text-gray-700'>
    //                 <input type="checkbox" className='mr-2' />
    //                 <span className='hover:text-blue-500 transition-colors duration-200 cursor-pointer'>This is a gift <span className='underline ml-1'>Learn more</span></span>
    //               </p>
    //             </div>
    //             <div className='text-right space-y-2'>
    //               <p className='text-sm text-gray-800'><FaMapMarkerAlt className='inline-block mr-1'/> {product.deliverLocation}</p>
    //               <p className='text-sm text-gray-800'><FaCalendarAlt className='inline-block mr-1'/> Delivered on: {product.deliverTime}</p>
    //               <p className='text-sm text-gray-800'>Order Status: <span className='text-green-600'>{product.status}</span></p>
    //             </div>
    //           </div>
    //           <div className="mt-4 text-right cursor-pointer">
    //             <span className='text-lg font-bold text-blue-500'>${product.producsId[0].price}</span>
    //           </div>
    //           <div className="mt-4 flex space-x-4 text-gray-700 text-sm">
    //             <div className='flex items-center'><FaEnvelope className='mr-2 text-indigo-500'/> {product.email}</div>
    //             <div className='flex items-center'><FaPhone className='mr-2 text-green-500'/> {product.firstnumber}</div>
    //             <div className='flex items-center cursor-pointer z-10' onClick={()=>proceedCardDetails(product.userId,product._id)}>
    //               <MdPayments className='mr-2 text-yellow-500'/>
    //               { 
    //                !isLoading ? <span>Get Payment Details</span> :  (isLoading != "falsy" ? <ClipLoader size={15} color='blue'/> : <span>Details sent to your email</span>)
    //               }
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   }
    // </div>
    <div>
      buyed broducts
    </div>
  );
}

export default BuyedProducts;
