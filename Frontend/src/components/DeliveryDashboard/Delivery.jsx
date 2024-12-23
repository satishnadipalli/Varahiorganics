import React, { useEffect, useState, useCallback } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBox, FaTruck, FaCreditCard, FaChevronDown, FaChevronUp, FaEdit, FaPrint } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

const EnhancedDeliveryDashboard = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    customerInfo: true,
    orderSummary: true,
    productList: true,
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateOrderStatus = useCallback(async () => {
    console.log(id,status)
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://varahiorganics.onrender.com/updateorderstatus/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if(!response.ok) {

        console.log(response.json())
        throw new Error('Failed to update order status');
      }

      const data = await response.json();
      if (data.order) {

        setOrder(data.order);
        setEdit(false);
        window.scrollTo({behavior:"smooth",top:0})
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Failed to update order status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id, status]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const fetchOrder = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://varahiorganics.onrender.com/getorder/${id}`, { method: "GET" });
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      setOrder(data?.order);
      console.log("']]",data?.order?.orderStatus)
      setStatus(data?.order?.orderStatus);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);



  
  if(!order){
    return <Loading/>
  }

  if (error) return <div>Error: {error}</div>;
  if (!order) return <div>No order found</div>;
  

  return (
    <div className="enhanced-delivery-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Order Details</h1>
          <div className="order-id">Order ID: {order._id}</div>
        </div>
        <div className="header-actions">
          <button className="action-button edit-button" onClick={() => setEdit(!isEdit)}>
            <FaEdit /> {isEdit ? 'Cancel Edit' : 'Edit Order'}
          </button>
          <button className="action-button print-button" onClick={handlePrint} style={{marginTop:"20px"}}>
            <FaPrint /> Print
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <section className={`dashboard-section ${expandedSections.customerInfo ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('customerInfo')}>
            <h2>Customer Information</h2>
            {expandedSections.customerInfo ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.customerInfo && (
            <div className="section-content">
              <div className="info-item"><FaUser /> {order?.customer?.name}</div>
              <div className="info-item"><FaEnvelope /> {order?.customer?.email}</div>
              <div className="info-item"><FaPhone /> {order?.customer?.phone}</div>
              <div className="info-item">
                <FaMapMarkerAlt /> {`${order?.customer?.address?.street}, ${order?.customer?.address?.city}, ${order?.customer?.address?.state} ${order?.customer?.address?.zipCode}, ${order?.customer?.address?.country}`}
              </div>
            </div>
          )}
        </section>

        <section className={`dashboard-section ${expandedSections.orderSummary ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('orderSummary')}>
            <h2>Order Summary</h2>
            {expandedSections.orderSummary ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.orderSummary && (
            <div className="section-content">
              <div className="info-item"><FaBox /> Order Date: {new Date(order?.orderDate).toLocaleString()}</div>
              <div className="info-item"><FaTruck /> Estimated Delivery: {new Date(order?.estimatedDelivery)?.toLocaleString()}</div>
              <div className="info-item"><FaCreditCard /> Payment Status: {order?.paymentStatus}</div>
              <div className="info-item">Tracking Number: {order?.trackingNumber}</div>
              <div className="order-status">
                <label htmlFor="order-status">Order Status: </label>
                <select disabled={!isEdit} id="order-status" value={status} onChange={handleStatusChange}>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="total-amount"><strong>Total Amount:</strong> ₹{order.totalAmount}</div>
              {isEdit && (
                <button 
                  className="checkout" 
                  onClick={handleUpdateOrderStatus}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Save Order Details'}
                </button>
              )}
              {error && <div className="error-message">{error}</div>}
            </div>
          )}
        </section>

        <section className={`dashboard-section ${expandedSections.productList ? 'expanded' : ''}`}>
          <div className="section-header" onClick={() => toggleSection('productList')}>
            <h2>Ordered Products</h2>
            {expandedSections.productList ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.productList && (
            <div className="section-content">
              <div className="product-grid">
                {order?.products.length > 0 && order?.products?.map((product, index) => (
                  <div key={index} className="product-card">
                    <img src={product?.productId?.images?.[0]} alt={product?.productId?.name} className="product-image" />
                    <div className="product-details">
                      <h3>{product?.productId?.name}</h3>
                      <p>{product?.productId?.description}</p>
                      <div className="product-meta">
                        <span>Quantity: {product?.quantity}</span>
                        <span>Price: ₹{product?.price}</span>
                      </div>
                      <div className="product-total">
                        <span>Subtotal:</span>
                        <span>₹{(product?.quantity * product?.price)?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
      <style jsx>{`
        .enhanced-delivery-dashboard {
          font-family: 'Arial', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f7f7f7;
          border-radius: 10px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f1f1f1;
        }

        .header-content h1 {
          font-size: 2rem;
          color: #333;
        }

        .header-actions .action-button {
          padding: 8px 15px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
          margin-left: 10px;
          display:flex;
          align-items:center;
          gap:15px;
          
        }

        .header-actions .action-button:hover {
          opacity: 0.8;
        }

        .header-actions .edit-button {
          background-color: #3498db;
          color: white;
        }

        .header-actions .print-button {
          background-color: #27ae60;
          color: white;
        }

        .dashboard-content {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .dashboard-section {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .section-header {
          background-color: #ecf0f1;
          padding: 15px 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-header h2 {
          font-size: 1.25rem;
          color: #2c3e50;
        }

        .section-content {
          padding: 15px;
          color: #7f8c8d;
        }

        .info-item {
          margin-bottom: 10px;
          font-size: 1rem;
          display: flex;
          align-items: center;
        }

        .info-item svg {
          margin-right: 10px;
          color: #3498db;
        }

        .order-status {
          margin-top: 15px;
        }

        .order-status select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
        }

        .total-amount {
          margin-top: 15px;
          font-size: 1.2rem;
          color: #2c3e50;
        }

        .product-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .product-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 2px solid #f1f1f1;
        }

        .product-details {
          padding: 15px;
        }

        .product-details h3 {
          font-size: 1.2rem;
          color: #34495e;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          color: #7f8c8d;
        }

        .product-total {
          font-weight: bold;
          color: #2c3e50;
          margin-top: 10px;
        }

        .checkout {
          font-size: 14px;
          font-weight: 400;
          padding: 8px;
          margin-top: 30px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .checkout:hover {
          background-color: #2980b9;
        }

        .checkout:disabled {
          background-color: #bdc3c7;
          cursor: not-allowed;
        }

        .error-message {
          color: #e74c3c;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default EnhancedDeliveryDashboard;

