import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addOrders } from '../../Redux/CartSlice';
import { BigOrderIcon, OrderIcon } from '../../../Heroicons';
// import LoadingAnimation from '../../../loadingAnimation';
import ClipLoader from "react-spinners/ClipLoader";
import ShareDialog from './Dilogbox';
// Import your ShareDialog component

const Orders = ({ setComponent }) => {
  // const { loginDetails, userOrders, defaultLocation } = useSelector(state => state.cart);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, SetIsLoading] = useState(true);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();


  async function deleteOrder(id) {
    
  }

  function openShareDialog(product) {
    setCurrentProduct(product);
    setShowShareDialog(true);
  }

  function closeShareDialog() {
    setShowShareDialog(false);
    setCurrentProduct(null);
  }

  if (loading) {
    return (
      <div className='w-full min-h-screen p-8 '>
        Loading...
      </div>
    );
  }

  if (userOrders.length <= 0) {
    return (
      <div style={{ height: "80%" }} className='w-full flex items-center justify-center min-h-screen -mt-24 gap-4'>
        <div style={{ border: "2px solid black" }} className='h-16 w-16 rounded-full flex items-center justify-center'><BigOrderIcon /></div> <span className='text-xl font-semibold'>Orders not found</span>
      </div>
    );
  }

  return (
    <div className='w-full mt-16 min-h-screen'>
      {allProducts.length > 0 ? userOrders.map((order) => (
        <div key={order._id} className={`${order.isCanceled ? "bg-gray-100" : ""}`}>
          <ul>
            {order.producsId.map((productOrder, index) => {
              const product = allProducts.find((product) => product.productId === productOrder.productId);
              return (
                <li key={index}>
                  {product ? (
                    <div className='p-5 hover'>
                      <div className='w-full flex pb-5 '>
                        <div style={{ width: '15%' }} className='pl-2 flex items-center justify-center'>
                          <img src={"https://varahiorganics.onrender.com/uploads/" + product.image[0]} alt="" className=' h-24 m-auto' />
                        </div>
                        <div className="info pl-5" style={{ width: '60%' }}>
                          <span className='font-rr'>
                            {product.description}
                          </span>
                          <span className='block text-sm font-semibold text-green-700'>In stock</span>
                          <span className='text-sm font-semibold'>Eligible for free shipping</span>
                          <span className=' flex items-center mt-1'>
                            <input type="checkbox" className='mr-1' />
                            <span className='text-xs font-semibold'>This is a gift Learn more</span>
                          </span>
                        </div>
                        <div className="price" style={{ width: '20%' }}>
                          <span className=' float-right font-semibold'>${product.price} <span className='text-blue-400 ggg font-semibold text-xs hover:underline'></span></span>
                        </div>
                      </div>
                      <div className='flex'>
                        <div className='w-1/2 h-12 addressdiv ml-10 mb-5 rounded-md p-1 pl-4'>
                          <span className='text-sm space-x-7'><span className='font-semibold block '>Deliver Location: </span>{defaultLocation?.villageName + " "},{defaultLocation?.mandalName + " "},{defaultLocation?.pinCode + " "},{defaultLocation?.districtName + " "}, {defaultLocation?.stateName}</span>
                        </div>
                        <div className='w-1/2 h-12 addressdiv ml-10 mb-5 rounded-md p-1 pl-4'>
                          <table className='flex gap-6 text-sm items-center h-full'>
                            {!order.isCanceled ? <>
                              <thead>
                                <tr>
                                  <td> Order Status</td>
                                  <td className=' h-full bg-red-200 ml-3 px-3 py-1 rounded-md'>{order?.status}</td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td> Ordered On</td>
                                  <td>{order?.orderDate}</td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr>
                                  <td> Deliver On</td>
                                  <td>{order?.deliverTime}</td>
                                </tr>
                              </tbody>
                            </> :
                              <span className='bg-red-400 text-white p-2 block flex items-center gap-5'><ClipLoader size={18} color="blue" /> Your Order cancellation initialized this will take time</span>
                            }
                          </table>
                        </div>
                      </div>
                      {!order.isCanceled && (
                        <div className='w-full flex items-center justify-center gap-5 py-5'>
                          <button className='btn1' onClick={() => deleteOrder(order._id)}>Cancel Order</button>
                          <button className='btn1' onClick={() => openShareDialog(product)}>Share</button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      )) : null}

      {showShareDialog && currentProduct && (
        <ShareDialog product={currentProduct} onClose={closeShareDialog} />
      )}
    </div>
  );
};

export default Orders;
