// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import SubSaved from './SubSaved';
// import { BigSaved } from '../../Heroicons';
// import LoadingAnimation from '../../loadingAnimation';
// import { FaRegHeart } from 'react-icons/fa';

const SavedProducts = ({ id }) => {
  // const { loginDetails } = useSelector(state => state.cart);
  // const [savedProduct, setSavedProduct] = useState(null);
  // const [loading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (loginDetails) {
  //     async function fetchSavedData() {
  //       try {
  //         const response = await fetch("http://localhost:3000/getSavedProducts", {
  //           method: "GET",
  //           headers: {
  //             "Authorization": `Bearer ${loginDetails?.token}`
  //           }
  //         });
  //         if (response.ok) {
  //           const { SavedProducts } = await response.json();
  //           setSavedProduct(SavedProducts);
  //           setIsLoading(false);
  //         }
  //       } catch (error) {
  //         console.log("error while fetching the saved products", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }

  //     fetchSavedData();
  //   }
  // }, [id, loginDetails]);

  // if (loading) {
  //   return (
  //     <div className='w-full min-h-screen p-8 flex justify-center items-center'>
  //       <LoadingAnimation />
  //     </div>
  //   );
  // }

  return (
    <div className='w-full min-h-screen p-8 bg-gradient-to-br from-blue-50 to-white'>
      {/* <h1 className='text-3xl font-extrabold text-gray-900 mb-6'>Saved Products</h1>
      <p className='text-sm text-orange-600 font-semibold mb-8'>Items Saved For Later</p>
      <div className='mb-8'>
        <hr className='border-t-2 border-gray-300 shadow-lg rounded-full' />
      </div>
      <div className='flex flex-wrap gap-0'>
        {savedProduct?.length > 0 ? (
          savedProduct.map((element, index) => (
            <div key={index} className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4'>
              <SubSaved element={element} />
            </div>
          ))
        ) : (
          <div className='w-full flex-col flex justify-center items-center mt-20'>
            <div className='h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg border-2 border-yellow-400'>
              <BigSaved className='text-white text-3xl' />
            </div>
            <span className='text-xl font-bold text-gray-800 mt-5'>No Saved Items Yet</span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default SavedProducts;
