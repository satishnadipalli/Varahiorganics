import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Sample order data
const orders = [
  {
    id: '1',
    productImage: 'https://via.placeholder.com/60',
    orderedBy: 'Satish Nadipalli',
    phone: '07993724192',
    email: 'satishnadipalli1@gmail.com',
  },
  {
    id: '2',
    productImage: 'https://via.placeholder.com/60',
    orderedBy: 'John Doe',
    phone: '1234567890',
    email: 'john.doe@example.com',
  },
  // Add more orders as needed
];

const OrderList = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [orderlist,setorderslist] = useState([])

    useEffect(() => {
      // Function to update window width state
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      // Add resize event listener when component mounts
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/getorders`, {
            method: "GET",
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Orders:", data);
    
            // Filter out orders where status is "Delivered"
            const filteredOrders = data.filter(order => order.orderStatus !== "Delivered");
            setorderslist(filteredOrders);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchOrders();
    }, []);
    


      console.log(orderlist)


  return (
    <div className="order-list-container">
      <div className="order-list-table">
        <div className="order-list-header">
          <div>Image</div>
          <div>Product</div>
          <div style={{marginLeft:`${windowWidth < 700 && "80px"}`,whiteSpace:"nowrap"}} >Ordered By</div>
          {windowWidth > 700 &&
          <>
          <div>Phone</div>
          <div>Email</div>
          </>
          }
          {windowWidth > 700 &&
          <>
          <div>Actions</div>
          </>
        }
        </div>
        <div className="order-list-body">
          {orderlist.length>0 && 
        orderlist.map((order) => (
            <Link to={`/orderlist/${order?._id}`} style={{textDecoration:"none"}}>
                {console.log(order)}
                <div className="order-item" key={order.id}>
                    <div className="product-image">
                        <img src={"https://via.placeholder.com/60"} alt="Product" />
                    </div>
                    <div className="ordered-by">{order?.products.length >=2 ? "Multiple Products" : order?.products?.[0]?.productId?.name}</div>
                    
                    <div className="ordered-by">{order?.customer?.name}</div>
                    {windowWidth > 700 
                    &&
                    <>
                        <div className="phone">{order?.customer?.phone}</div>
                        <div className="email">{order?.customer?.email}</div>
                    </>
                        }
                    <div className="actions">
                        <a href={`/view-order/${order.id}`} className="view-order">View</a>
                        <a href={`tel:${order.phone}`} className="contact-customer">Contact</a>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .order-list-container {
          margin-top: 20px;
          padding: 20px;
          background-color: #f1f3f5;
          border-radius: 8px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .order-list-table {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width:90%;
          margin:auto;
        }

        .order-list-header {
          display: grid;
          grid-template-columns: 60px 1fr 1fr 1fr 1fr 1fr ;
        //   font-weight: bold;
          background-color: #007bff;
          color: #ffffff;
          padding: 10px;
          border-radius: 8px;
        }

        .order-list-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .order-item {
          display: grid;
          grid-template-columns: 60px 1fr 1fr 1fr 1fr 1fr ;
          align-items: center;
          background-color: #ffffff;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .order-item:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .product-image img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 50%;
        }

        .ordered-by, .phone, .email {
          font-size: 0.9rem;
          color: #495057;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .view-order, .contact-customer {
          text-decoration: none;
          padding: 8px 12px;
          background-color: #007bff;
          color: #ffffff;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .view-order:hover, .contact-customer:hover {
          background-color: #0056b3;
        }

        .contact-customer {
          background-color: #28a745;
        }

        .contact-customer:hover {
          background-color: #218838;
        }

        @media (max-width: 768px) {
          .order-list-header {
            grid-template-columns: 50px 1fr 1fr 1fr;
          }
            .order-list-table {

          width:100%;
          margin:auto;
        }

          .order-item {
            grid-template-columns: 50px 1fr 1fr 1fr;
          }

          .product-image img {
            width: 30px;
            height: 30px;
          }

          .view-order, .contact-customer {
            padding: 6px 10px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .order-list-header {
            grid-template-columns: 40px 1fr 1fr;
          }

          .order-item {
            grid-template-columns: 40px 1fr 1fr 1fr;
          }

          .product-image img {
            width: 25px;
            height: 25px;
          }

          .view-order, .contact-customer {
            padding: 5px 8px;
            font-size: 0.7rem;
          }
        }
          @media (max-width: 700px) {
      .order-list-header {
      grid-template-columns: 50px 1fr 1fr;
      }

      .order-item {
      grid-template-columns: 50px 1fr 1fr;
      }

      .product-image img {
      width: 30px;
      height: 30px;
      }

      .view-order, .contact-customer {
      padding: 6px 10px;
      font-size: 0.8rem;
      }

      /* Hide the email column for smaller screens */
      .email {
      display: none;
      }

      /* Adjust the grid columns to reflect the removal of the email column */
      .order-list-header {
      grid-template-columns: 50px 1fr 1fr 1fr; /* Remove the email column */
      }
      }

      `}</style>

    </div>
  );
};

export default OrderList;


