import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('cancellationRequests');
  // const { loginDetails } = useSelector(state => state.cart);
  const [cancellations, setCancellations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState("");
  const [selectdel,setdel] = useState("");

  useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const response = await fetch("http://localhost:3000/getalldeliveryboys", {
          method: "GET",
          // headers: {
          //   "Authorization": `Bearer ${loginDetails.token}`,
          //   "Content-Type": "application/json"
          // }
        });

        if (response.ok) {
          const data = await response.json();
          setDeliveryBoys(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeliveryBoys();
  }, []);

  useEffect(() => {
    if (activeTab === 'cancellationRequests') {
      const fetchCancelOrders = async () => {
        try {
          const response = await fetch("http://localhost:3000/getDeleteInitializedOrders", {
            method: "GET",
            // headers: {
            //   "Authorization": `Bearer ${loginDetails.token}`,
            //   "Content-Type": "application/json"
            // }
          });

          if (response.ok) {
            const data = await response.json();
            setCancellations(data.initialized);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchCancelOrders();
    } else if (activeTab === 'userOrders' || activeTab === 'assignedOrders') {
      const fetchUserOrders = async () => {
        try {
          const response = await fetch("http://localhost:3000/getallorders", {
            method: "GET",
            // headers: {
            //   "Authorization": `Bearer ${loginDetails.token}`,
            //   "Content-Type": "application/json"
            // }
          });

          if (response.ok) {
            const data = await response.json();
            setOrders(data.allOrders.filter(order =>order.status === 'pending'));
            if (activeTab === 'assignedOrders') {
              setAssignedOrders(data.allOrders.filter(order => order.status === 'assigned'));
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserOrders();
    }
  }, [activeTab, loginDetails.token]);

  const deleteProduct = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/delelteOrderPermentaly/${orderId}`, {
        method: "DELETE",
        // headers: {
        //   "Authorization": `Bearer ${loginDetails.token}`,
        //   "Content-Type": "application/json"
        // }
      });

      if (response.ok) {
        const data = await response.json();
        setCancellations(data.initialized);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assignDeliveryBoy = async (orderId) => {
    console.log("iam geting ithe dkk",orderId,selectedDeliveryBoy);
    try {
      const response = await fetch(`http://localhost:3000/assignDelivery`, {
        method: "POST",
        // headers: {
        //   "Authorization": `Bearer ${loginDetails?.token}`,
        //   "Content-Type": "application/json"
        // },
        body: JSON.stringify({ deliveryBoyId: selectedDeliveryBoy,orderId })
      });

      if (response.ok) {
        const data = await response.json();
        // Update assigned orders after assigning delivery boy
        setOrders(data.allOrders.filter(order =>order.status === 'pending'));
        if (activeTab === 'assignedOrders') {
          setAssignedOrders(data.allOrders.filter(order => order.status === 'assigned'));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === 'cancellationRequests' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('cancellationRequests')}
          >
            Cancellation Requests
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === 'userOrders' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('userOrders')}
          >
            User Orders
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === 'assignedOrders' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('assignedOrders')}
          >
            Assigned User Orders
          </button>
        </div>

        {/* Tab Content */}
        <div className="transition-opacity duration-500">
          {activeTab === 'cancellationRequests' && (
            <div>
              <h2 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-4 border-indigo-500 pb-2">
                Order Cancellation Requests
              </h2>
              {cancellations?.length === 0 ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center bg-white shadow-lg rounded-lg p-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M19.07 4.93a10 10 0 10-14.14 14.14m2.83-2.83a5 5 0 117.07-7.07m0 0a5 5 0 007.07 7.07M12 12l4-4M12 12l-4-4" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800 mt-4">No Cancellation Requests</h3>
                    <p className="text-gray-600 mt-2">There are currently no cancellation requests. Please check back later.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivery Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cancellations?.map((request) => (
                        <tr key={request?._id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <img
                              src={`http://localhost:3000/uploads/${request?.producsId[0].image}`}
                              alt={request?.productName}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-300 mr-4"
                            />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{request?.producsId[0].title}</div>
                              <div className="text-sm text-gray-500">{request?.productName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request?.userName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request?.orderDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request?.deliverTime).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request?.totalPrice} $</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => deleteProduct(request?._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'userOrders' && (
            <div>
              <h2 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-4 border-indigo-500 pb-2">
                User Orders
              </h2>
              {orders.length === 0 ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center bg-white shadow-lg rounded-lg p-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M19.07 4.93a10 10 0 10-14.14 14.14m2.83-2.83a5 5 0 117.07-7.07m0 0a5 5 0 007.07 7.07M12 12l4-4M12 12l-4-4" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800 mt-4">No User Orders</h3>
                    <p className="text-gray-600 mt-2">There are currently no user orders. Please check back later.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivery Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assign Delivery Boy
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders?.map((order) => (
                        <tr key={order?._id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <img
                              src={`http://localhost:3000/uploads/${order?.producsId[0].image}`}
                              alt={order?.productName}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-300 mr-4"
                            />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{order?.producsId[0].title}</div>
                              <div className="text-sm text-gray-500">{order?.productName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order?.userName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order?.orderDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order?.deliverTime).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order?.totalPrice} $</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <select
                              onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
                              value={selectedDeliveryBoy._id}
                              className="p-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Delivery Boy</option>
                              {deliveryBoys?.map(boy => (
                                <option key={boy._id} value={boy._id}>{boy.firstname}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => assignDeliveryBoy(order?._id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'assignedOrders' && (
            <div>
              <h2 className="text-4xl font-extrabold text-gray-800 mb-10 border-b-4 border-indigo-500 pb-2">
                Assigned Orders
              </h2>
              {assignedOrders.length === 0 ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center bg-white shadow-lg rounded-lg p-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M19.07 4.93a10 10 0 10-14.14 14.14m2.83-2.83a5 5 0 117.07-7.07m0 0a5 5 0 007.07 7.07M12 12l4-4M12 12l-4-4" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800 mt-4">No Assigned Orders</h3>
                    <p className="text-gray-600 mt-2">There are currently no assigned orders. Please check back later.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivery Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivery Boy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assignedOrders.map((order) => (
                        <tr key={order?._id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <img
                              src={`http://localhost:3000/uploads/${order?.producsId[0].image}`}
                              alt={order?.productName}
                              className="w-16 h-16 object-cover rounded-lg border border-gray-300 mr-4"
                            />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{order?.producsId[0].title}</div>
                              <div className="text-sm text-gray-500">{order?.productName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order?.userName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order?.orderDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order?.deliverTime).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order?.totalPrice} $</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.deliveryboy || 'Not Assigned'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
