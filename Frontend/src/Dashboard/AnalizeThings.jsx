import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement // Register PointElement for Line charts
);

const AnalyzeThings = () => {
  // const { loginDetails } = useSelector(state => state.cart);
  const [allOrders, setAllOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('ordersByCustomer');

  // Fetch orders data
  useEffect(() => {
    async function fetchAllOrders() {
      try {
        const response = await fetch("https://varahiorganics.onrender.com/getallorders", {
          method: "GET",
          // headers: {
          //   "Authorization": `Bearer ${loginDetails?.token}`,
          //   "Content-Type": "application/json"
          // }
        });

        if (response.ok) {
          const data = await response.json();
          setAllOrders(data.allOrders);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllOrders();
  }, []);

  // Process Orders by Customer
  const processOrdersByCustomer = (orders) => {
    const customerCounts = {};
    orders.forEach(order => {
      const fullName = `${order.firstname} ${order.lastname}`;
      customerCounts[fullName] = (customerCounts[fullName] || 0) + 1;
    });
    return {
      labels: Object.keys(customerCounts),
      datasets: [
        {
          label: 'Orders by Customer',
          data: Object.values(customerCounts),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  // Process Orders by Delivery Date
  const processOrdersByDeliveryDate = (orders) => {
    const deliveryCounts = {};
    orders.forEach(order => {
      deliveryCounts[order.deliverTime] = (deliveryCounts[order.deliverTime] || 0) + 1;
    });
    return {
      labels: Object.keys(deliveryCounts),
      datasets: [
        {
          label: 'Orders by Delivery Date',
          data: Object.values(deliveryCounts),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  // Process Total Price Over Time
  const processTotalPriceOverTime = (orders) => {
    const totalPriceByDate = {};
    orders.forEach(order => {
      totalPriceByDate[order.orderDate] = (totalPriceByDate[order.orderDate] || 0) + order.totalPrice;
    });
    return {
      labels: Object.keys(totalPriceByDate),
      datasets: [
        {
          label: 'Total Price of Orders',
          data: Object.values(totalPriceByDate),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  // Process Canceled vs Active Orders
  const processCanceledVsActiveOrders = (orders) => {
    const canceledCount = orders.filter(order => order.isCanceled).length;
    const activeCount = orders.length - canceledCount;
    return {
      labels: ['Canceled', 'Active'],
      datasets: [
        {
          label: 'Order Status',
          data: [canceledCount, activeCount],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }
      ]
    };
  };

  // Generate chart data
  const ordersByCustomerData = processOrdersByCustomer(allOrders);
  const ordersByDeliveryDateData = processOrdersByDeliveryDate(allOrders);
  const totalPriceOverTimeData = processTotalPriceOverTime(allOrders);
  const canceledVsActiveOrdersData = processCanceledVsActiveOrders(allOrders);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="tabs">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'ordersByCustomer' ? 'active' : ''}`}
            onClick={() => setActiveTab('ordersByCustomer')}
          >
            Orders by Customer
          </button>
          <button
            className={`tab-button ${activeTab === 'ordersByDeliveryDate' ? 'active' : ''}`}
            onClick={() => setActiveTab('ordersByDeliveryDate')}
          >
            Orders by Delivery Date
          </button>
          <button
            className={`tab-button ${activeTab === 'totalPriceOverTime' ? 'active' : ''}`}
            onClick={() => setActiveTab('totalPriceOverTime')}
          >
            Total Price Over Time
          </button>
          <button
            className={`tab-button ${activeTab === 'canceledVsActiveOrders' ? 'active' : ''}`}
            onClick={() => setActiveTab('canceledVsActiveOrders')}
          >
            Canceled vs Active Orders
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'ordersByCustomer' && (
            <>
              <h2 className="text-2xl font-bold mb-4">Orders by Customer</h2>
              {ordersByCustomerData.labels.length > 0 ? (
                <Bar data={ordersByCustomerData} options={{ responsive: true }} />
              ) : <p>No data available</p>}
            </>
          )}
          {activeTab === 'ordersByDeliveryDate' && (
            <>
              <h2 className="text-2xl font-bold mb-4">Orders by Delivery Date</h2>
              {ordersByDeliveryDateData.labels.length > 0 ? (
                <Bar data={ordersByDeliveryDateData} options={{ responsive: true }} />
              ) : <p>No data available</p>}
            </>
          )}
          {activeTab === 'totalPriceOverTime' && (
            <>
              <h2 className="text-2xl font-bold mb-4">Total Price of Orders Over Time</h2>
              {totalPriceOverTimeData.labels.length > 0 ? (
                <Line data={totalPriceOverTimeData} options={{ responsive: true }} />
              ) : <p>No data available</p>}
            </>
          )}
          {activeTab === 'canceledVsActiveOrders' && (
            <>
              <h2 className="text-2xl font-bold mb-4">Canceled vs Active Orders</h2>
              {canceledVsActiveOrdersData.labels.length > 0 ? (
                <Pie data={canceledVsActiveOrdersData} options={{ responsive: true }} />
              ) : <p>No data available</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeThings;
