import React from 'react'

const SubHeader = () => {
  return (
    <div className="top-indicator">
    <div className="buttons-container">
        <span className="offer-text">🎉 Exclusivie Offers!</span>
        <button className="order-now-btn">Order Now</button>
    </div>
    <button className="close-btn" >
      &times;
    </button>
    </div>
  )
}

export default SubHeader
