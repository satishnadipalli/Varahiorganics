import React, { useEffect, useState } from 'react';
import './OrderSuccess.css';
import { useNavigate } from 'react-router-dom';

// interface OrderSuccessAnimationProps {
//   orderNumber: string;
//   total: number;
//   onAnimationComplete?: () => void;
// }

const OrderSuccessAnimation = ({ orderNumber, total, onAnimationComplete }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      if (onAnimationComplete) {
        onAnimationComplete();
        // navigate("/")
      }
    }, 5000); // Animation lasts for 5 seconds

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  if (!showAnimation) return null;

  return (
    <div className="order-success-overlay">
      <div className="order-success-container p-3">
        <div className="success-icon" >
          <img src="./orderanimation.gif"  style={{height:"150px"}} alt="" />
        </div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-message">Thank you for your purchase. Your order is being processed.</p>
        <p className=' text-sm font-semibold'>Our Team will contact you soon</p>
        {/* <div className="order-details">
          <p>Order #: <span>{orderNumber}</span></p>
          <p>Total: <span>₹{total?.toFixed(2)}</span></p>
        </div> */}
      </div>
    </div>
  );
};

export default OrderSuccessAnimation;

