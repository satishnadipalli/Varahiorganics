import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBox, FaTruck, FaCreditCard, FaChevronDown, FaChevronUp, FaEdit, FaPrint } from 'react-icons/fa';

const EnhancedDeliveryDashboard = () => {
  // Static order data
  const order = {
    _id: "675d5223e223150e0a084d58",
    customer: {
      name: "Satish Nadipalli",
      email: "satishnadipalli1@gmail.com",
      phone: "07993724192",
      address: {
        street: "Rajamundry",
        city: "Vintipalem",
        state: "Andhra Pradesh",
        zipCode: "531025",
        country: "India"
      }
    },
    products: [
      {
        name: "Coconut Oil",
        description: "Pure and natural coconut oil for cooking and beauty care.",
        price: 699,
        quantity: 2,
        image: "https://vamshifarms.com/cdn/shop/files/coconut_oil_image_2.jpg?v=1723485819&width=848"
      },
      {
        name: "Toor Dal",
        description: "High-quality yellow lentils for delicious and nutritious meals.",
        price: 120,
        quantity: 3,
        image: "https://vamshifarms.com/cdn/shop/files/ecommified_httpss.mj.run1YPvs8udvp4_toor_dal_yellow_pusles_in_a_81c0e10d-f0ed-4888-b86a-2168b1a0c6ad.png?v=1720156594&width=848"
      }
    ],
    totalAmount: 1868,
    paymentStatus: "Pending",
    orderStatus: "Processing",
    orderDate: "2024-12-14T09:38:43.283Z",
    estimatedDelivery: "2024-12-20T09:38:43.283Z",
    trackingNumber: "VFARM1234567890"
  };

  const [expandedSections, setExpandedSections] = useState({
    customerInfo: true,
    orderSummary: true,
    productList: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return '#ffa500';
      case 'processing': return '#3498db';
      case 'shipped': return '#2ecc71';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="enhanced-delivery-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Order Details</h1>
          <div className="order-id">Order ID: {order._id}</div>
        </div>
        <div className="header-actions">
          <button className="action-button edit-button">
            <FaEdit /> Edit Order
          </button>
          <button className="action-button print-button" onClick={handlePrint}>
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
              <div className="info-item"><FaUser /> <span>{order.customer.name}</span></div>
              <div className="info-item"><FaEnvelope /> <span>{order.customer.email}</span></div>
              <div className="info-item"><FaPhone /> <span>{order.customer.phone}</span></div>
              <div className="info-item">
                <FaMapMarkerAlt />
                <span>{`${order.customer.address.street}, ${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.zipCode}, ${order.customer.address.country}`}</span>
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
              <div className="info-item"><FaBox /> <span>Order Date: {formatDate(order.orderDate)}</span></div>
              <div className="info-item"><FaTruck /> <span>Estimated Delivery: {formatDate(order.estimatedDelivery)}</span></div>
              <div className="info-item"><FaCreditCard /> <span>Payment Status: {order.paymentStatus}</span></div>
              <div className="info-item"><span>Tracking Number: {order.trackingNumber}</span></div>
              <div className="order-status" style={{ backgroundColor: getStatusColor(order.orderStatus) }}>
                Order Status: {order.orderStatus}
              </div>
              <div className="total-amount">
                <strong>Total Amount:</strong> <span>${order.totalAmount.toFixed(2)}</span>
              </div>
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
                {order.products.map((product, index) => (
                  <div key={index} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-meta">
                        <span>Quantity: {product.quantity}</span>
                        <span>Price: ${product.price.toFixed(2)}</span>
                      </div>
                      <div className="product-total">
                        Subtotal: ${(product.quantity * product.price).toFixed(2)}
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
          font-family: 'Roboto', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f8f9fa;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e9ecef;
        }

        .header-content h1 {
          font-size: 2.5rem;
          color: #343a40;
          margin: 0;
        }

        .order-id {
          font-size: 1.2rem;
          color: #6c757d;
          margin-top: 0.5rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .edit-button {
          background-color: #007bff;
          color: white;
        }

        .print-button {
          background-color: #28a745;
          color: white;
        }

        .action-button:hover {
          opacity: 0.9;
        }

        .dashboard-content {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .dashboard-section {
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background-color: #f1f3f5;
          cursor: pointer;
        }

        .section-header h2 {
          font-size: 1.5rem;
          color: #495057;
          margin: 0;
        }

        .section-content {
          padding: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          font-size: 1rem;
          color: #495057;
        }

        .info-item svg {
          margin-right: 0.5rem;
          color: #6c757d;
        }

        .order-status {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          color: white;
          font-weight: bold;
          margin-top: 1rem;
        }

        .total-amount {
          margin-top: 1rem;
          font-size: 1.2rem;
          font-weight: bold;
          color: #343a40;
        }

        .product-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .product-card {
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .product-details {
          padding: 1rem;
        }

        .product-details h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          color: #343a40;
        }

        .product-details p {
          margin: 0 0 1rem 0;
          font-size: 0.9rem;
          color: #6c757d;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #495057;
          margin-bottom: 0.5rem;
        }

        .product-total {
          font-weight: bold;
          color: #343a40;
        }

        @media (max-width: 768px) {
          .enhanced-delivery-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            margin-top: 1rem;
          }

          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }

        @media print {
          .enhanced-delivery-dashboard {
            box-shadow: none;
            padding: 0;
          }

          .header-actions,
          .section-header svg {
            display: none;
          }

          .dashboard-section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedDeliveryDashboard;

