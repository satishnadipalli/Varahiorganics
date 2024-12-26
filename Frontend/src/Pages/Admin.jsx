import React, { useEffect, useState } from "react";
import "./Admin.css";
import Loading from "../components/Loading/Loading";
import NewProduct from "../Dashboard/NewProduct";
import ShippingLabel from "../Dashboard/AllProductAdminDetails/UpdateProduct";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [currentUpdateProduct, setIsUpdateProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [filterMonth, setFilterMonth] = useState("");
  const [orderpending,setorderpending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://varahiorganics.onrender.com/getproducts`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.products) {
          setHomeProducts(data.products || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://varahiorganics.onrender.com/getorders`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          const pendings   = data.filter((ele)=>ele.orderStatus == "Pending")
          setorderpending(pendings)
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  const handleDeleteProduct = async (id) => {
    console.log("Deleting product:", id);
    const response = await fetch(`https://varahiorganics.onrender.com/deleteproduct/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setHomeProducts(homeProducts.filter((product) => product._id !== id));
      setShowDeleteModal(false);
      toast.success("Product deleted successfully!", {
        autoClose: 3000,
        backgroundColor: "red",
        theme: "colored",
      });
    } else {
      console.error("Failed to delete the product");
    }
  };

  if (!homeProducts || homeProducts.length <= 0) {
    return <Loading />;
  }

  const filterOrders = (orders, status, month) => {
    return orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      const isStatusMatch = status === 'all' || order.orderStatus === status;
      const isMonthMatch = !month || (orderDate.getMonth() + 1).toString() === month;
      return isStatusMatch && isMonthMatch;
    });
  };

  const deliveredOrders = filterOrders(orders, 'Delivered', filterMonth);
  const pendingOrders = filterOrders(orders, 'Pending', filterMonth);

  const months = [
    { value: "", label: "All Months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  return (
    <>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="add-product-btn" onClick={() => setIsAdd(true)}>
            Add Product
          </button>
        </div>

        <div className="tabs-container">
          <div className="tab-list">
            <button
              className={`tab ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`tab ${activeTab === "delivered" ? "active" : ""}`}
              onClick={() => setActiveTab("delivered")}
            >
              Delivered Orders
            </button>
            <button
              className={`tab ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Orders
            </button>
          </div>

          {(activeTab === "delivered" || activeTab === "pending") && (
            <div className="filter-container">
              <label htmlFor="month-filter">Filter by Month:</label>
              <select
                id="month-filter"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="month-filter"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={`tab-content ${activeTab === "products" ? "active" : ""}`}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {homeProducts.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <button
                        className="update-btn"
                        onClick={() => {
                          setIsUpdate(true);
                          setIsUpdateProduct(product);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => {
                          console.log("Delete button clicked");
                          setShowDeleteModal(true);
                          setDeleteProductId(product._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`tab-content ${activeTab === "delivered" ? "active" : ""}`}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {deliveredOrders.map((order) => (
                  <tr key={order._id} onClick={() => navigate(`/orderlist/${order._id}`)}>
                    <td>{order._id}</td>
                    <td>{order.customer.name}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`tab-content ${activeTab === "pending" ? "active" : ""}`}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {console.log(orderpending,"pendingorders")}
                {orderpending.map((order) => (
                  <tr key={order._id} onClick={() => navigate(`/orderlist/${order._id}`)}>
                    <td>{order._id}</td>
                    <td>{order.customer.name}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isAdd && (
          <div className="modal absolute top-0 left-0 w-full">
            <NewProduct setIsAdd={setIsAdd} />
          </div>
        )}

        {isUpdate && currentUpdateProduct && (
          <div className="modal bg-white absolute h-full min-h-[90vh] top-0 left-0 w-full">
            <ShippingLabel setIsUpdateForm={setIsUpdate} clickedProduct={currentUpdateProduct} />
          </div>
        )}
 
        {showDeleteModal && (
          <div className="modal-overlays">
            <div className="modal-content">
              <h2 className="modal-header">Are You Sure?</h2>
              <p className="modal-body">Do you really want to delete this product? This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  className="btn-confirm"
                  onClick={() => handleDeleteProduct(deleteProductId)}
                >
                  Yes, Delete
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Admin;


