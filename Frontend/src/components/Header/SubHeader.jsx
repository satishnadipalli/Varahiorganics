import React from 'react';

const SubHeader = () => {
  const handleOrderNowClick = () => {
    // Define the phone number and pre-filled message
    const phoneNumber = '7036387998'; // Phone number in international format (no spaces, dashes)
    const initialMessage = 'I want to order products from Varahi Farms';

    // Encode the message for URL compatibility
    const encodedMessage = encodeURIComponent(initialMessage);

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirect the user to WhatsApp chat
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="top-indicator">
      <div className="buttons-container">
        <span className="offer-text">🎉 Order From Watsapp!</span>
        <button className="order-now-btn" onClick={handleOrderNowClick}>
          Order Now
        </button>
      </div>
      <button className="close-btn">&times;</button>
    </div>
  );
};

export default SubHeader;
